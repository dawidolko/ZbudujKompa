#!/usr/bin/env node
/*
 * Refreshes the catalogue prices from Google Shopping results through SerpApi.
 *
 * Runs from .github/workflows/update-prices.yml. Without a SERPAPI_KEY it prints
 * a note and exits cleanly, so the workflow stays green until a key is added.
 *
 * Run it with: node --experimental-strip-types scripts/update-prices.mjs
 *
 * The free plan allows 250 searches a month and 50 an hour, so the script spends
 * one search per priced part and waits between searches to stay under the hourly
 * limit. A part keeps its previous record when too few offers match it, and the
 * file is only rewritten when at least one number changed.
 */
import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as sleep } from 'node:timers/promises';
import { bandFromResponse, bandsDiffer, renderPricesModule } from './lib/price-matching.mjs';
import { priceQueries } from '../src/lib/parts/price-queries.ts';
import { priceRecords } from '../src/lib/parts/prices.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT = join(ROOT, 'src/lib/parts/prices.ts');
const ENDPOINT = 'https://serpapi.com/search';

/* 75 seconds a search is 48 an hour, just inside the free plan's limit of 50. */
const DELAY_MS = Number(process.env.PRICE_DELAY_MS ?? 75_000);
const TIMEOUT_MS = 60_000;

const apiKey = process.env.SERPAPI_KEY;

if (!apiKey) {
  console.log('SERPAPI_KEY is not set, so prices were not refreshed.');
  process.exit(0);
}

/* Fetches one search. The key stays out of every log line and error message. */
async function search(query) {
  const url = new URL(ENDPOINT);
  url.search = new URLSearchParams({
    engine: 'google_shopping',
    q: query,
    google_domain: 'google.pl',
    gl: 'pl',
    hl: 'pl',
    location: 'Warsaw,Masovian Voivodeship,Poland',
    api_key: apiKey,
  }).toString();

  const response = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(`SerpApi answered ${response.status}: ${body?.error ?? 'no detail'}`);
  }
  return body;
}

const today = new Date().toISOString().slice(0, 10);
const queue = Object.entries(priceRecords).filter(
  ([id, record]) => record.min !== null && !record.manual && priceQueries[id],
);

console.log(`Refreshing ${queue.length} parts.`);

const next = structuredClone(priceRecords);
let changed = 0;
let refreshed = 0;

for (const [index, [id, record]] of queue.entries()) {
  if (index > 0) await sleep(DELAY_MS);

  let response;
  try {
    response = await search(priceQueries[id].q);
  } catch (error) {
    /* Usually the key or the quota, which the next search would hit as well.
       What has been fetched so far is still worth keeping. */
    console.error(`Stopping at ${id}: ${error.message}`);
    break;
  }

  const band = bandFromResponse(response, priceQueries[id]);
  if (!band) {
    console.log(`  ${id}: too few matching offers, keeping ${record.checkedAt}`);
    continue;
  }

  refreshed += 1;
  if (bandsDiffer(record, band)) {
    changed += 1;
    console.log(`  ${id}: ${record.min}-${record.max} -> ${band.min}-${band.max}`);
  }
  next[id] = { min: band.min, max: band.max, checkedAt: today, sources: band.sources };
}

console.log(`${refreshed} of ${queue.length} refreshed, ${changed} changed.`);

if (refreshed === 0) {
  console.error('Nothing could be refreshed, so this needs a look.');
  process.exit(1);
}

if (changed === 0) {
  console.log('No value changed, leaving the file alone.');
  process.exit(0);
}

await writeFile(OUTPUT, renderPricesModule(next));
