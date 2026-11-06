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
 * one search per part and waits between searches to stay under the hourly limit.
 *
 * A part keeps its previous record when too few offers match it. A part with no
 * price gets one back when enough reliable offers return, and a part's tier
 * follows its price. A run that fails for most parts writes nothing and exits
 * with an error; one that stops late keeps what it found and still exits with
 * an error, so the workflow fails either way.
 */
import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as sleep } from 'node:timers/promises';
import {
  bandFromResponse,
  bandsDiffer,
  MIN_OFFERS,
  mergeRefresh,
  refusalReason,
  renderPricesModule,
  RESTORE_MIN_OFFERS,
} from './lib/price-matching.mjs';
import { priceQueries } from '../src/lib/parts/price-queries.ts';
import { tierAfter } from '../src/lib/parts/price-tiers.ts';
import { priceRecords } from '../src/lib/parts/prices.ts';
import { allParts } from '../src/lib/parts/selection.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT = join(ROOT, 'src/lib/parts/prices.ts');
const ENDPOINT = process.env.SERPAPI_ENDPOINT ?? 'https://serpapi.com/search';

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
const categoryOf = new Map(allParts.map((part) => [part.id, part.category]));

/* Priced parts first, so a quota that runs out costs the restorations rather
   than the prices the site is showing. */
const queue = Object.entries(priceRecords)
  .filter(([id, record]) => !record.manual && priceQueries[id])
  .sort(([, a], [, b]) => Number(a.min === null) - Number(b.min === null));
const pricedQueued = queue.filter(([, record]) => record.min !== null).length;

console.log(`Searching ${queue.length} parts, ${pricedQueued} of them priced.`);

const outcomes = [];
let stoppedBy = null;

for (const [index, [id, record]] of queue.entries()) {
  if (index > 0) await sleep(DELAY_MS);

  let response;
  try {
    response = await search(priceQueries[id].q);
  } catch (error) {
    /* Usually the key or the quota, which the next search would hit as well. */
    stoppedBy = `Stopped at ${id}: ${error.message}`;
    console.error(stoppedBy);
    break;
  }

  const restoring = record.min === null;
  const band = bandFromResponse(
    response,
    priceQueries[id],
    restoring ? RESTORE_MIN_OFFERS : MIN_OFFERS,
  );
  if (!band) console.log(`  ${id}: too few matching offers, keeping ${record.checkedAt}`);
  else if (restoring) console.log(`  ${id}: price restored at ${band.min}-${band.max}`);
  else if (bandsDiffer(record, band)) {
    console.log(`  ${id}: ${record.min}-${record.max} -> ${band.min}-${band.max}`);
  }
  outcomes.push({ id, band });
}

const run = mergeRefresh(priceRecords, outcomes, {
  today,
  tierFor: (id, tier, price) => tierAfter(categoryOf.get(id), tier, price),
});

console.log(
  `${run.pricedRefreshed} of ${pricedQueued} priced parts refreshed, ${run.changed.length} changed, ` +
    `${run.restored.length} restored, ${run.retiered.length} moved tier.`,
);
for (const move of run.retiered) console.log(`  tier ${move}`);

/* A failed run writes nothing: the file keeps its good data, and the failure
   reaches the workflow through the exit code. */
const refusal = refusalReason({ ...run, pricedQueued });
if (refusal) {
  console.error(`::error::Prices left unchanged. ${refusal}${stoppedBy ? ` ${stoppedBy}` : ''}`);
  process.exit(1);
}

/* The date has moved even where no number did. Skipping the write would leave
   a confirmed price to expire. */
await writeFile(OUTPUT, renderPricesModule(run.next));

/* Most of the catalogue made it, so that is kept, but the run still reports the
   failure instead of passing for a complete one. */
if (stoppedBy) {
  console.error(`::error::The refresh stopped early. ${stoppedBy}`);
  process.exitCode = 1;
}
