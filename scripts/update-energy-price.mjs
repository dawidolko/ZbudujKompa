#!/usr/bin/env node
/*
 * Refreshes the electricity price behind the running-cost calculator from
 * Eurostat, which needs no key. Runs from .github/workflows/update-prices.yml.
 *
 * The file only changes when Eurostat publishes a new figure, so a run with
 * nothing new commits nothing. Any failure leaves the file as it was and exits
 * with an error, so the workflow reports it.
 */
import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EUROSTAT_URL, latestPrice, renderEnergyModule } from './lib/energy-price.mjs';

const OUTPUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src/lib/energy-price.ts');
const ENDPOINT = process.env.EUROSTAT_ENDPOINT ?? EUROSTAT_URL;

let latest = null;
try {
  const response = await fetch(ENDPOINT, { signal: AbortSignal.timeout(60_000) });
  if (!response.ok) throw new Error(`Eurostat answered ${response.status}`);
  latest = latestPrice(await response.json());
} catch (error) {
  console.error(`::error::Electricity price left unchanged. ${error.message}`);
  process.exit(1);
}

if (!latest) {
  console.error('::error::Electricity price left unchanged. Eurostat returned no usable figure.');
  process.exit(1);
}

await writeFile(OUTPUT, renderEnergyModule(latest));
console.log(
  `Electricity price ${latest.pricePerKwh} zł/kWh for ${latest.period}` +
    `${latest.provisional ? ' (provisional)' : ''}, published ${latest.published}.`,
);
