/*
 * Price data and the refresh logic. Pure logic, so no browser or network.
 *
 * The SerpApi fixture is hand-written to the provider's documented shape. These
 * tests prove the parsing against that shape, not against the real API.
 */
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  bandFromResponse,
  bandsDiffer,
  extractOffers,
  isNewPolishOffer,
  matchesPart,
  median,
  rejectOutliers,
  renderPricesModule,
} from '../scripts/lib/price-matching.mjs';
import { allParts } from '../src/lib/parts/selection.ts';
import { autoPick } from '../src/lib/parts/autopick.ts';
import { priceQueries } from '../src/lib/parts/price-queries.ts';
import { priceRecords } from '../src/lib/parts/prices.ts';
import { catalogueCheckedAt, isPriceStale, priceOf, sumPrices } from '../src/lib/parts/pricing.ts';

const here = dirname(fileURLToPath(import.meta.url));

let passed = 0;
let failed = 0;

function report(condition, ok, bad) {
  if (condition) {
    passed += 1;
    console.log(`  ok   ${ok}`);
  } else {
    failed += 1;
    console.log(`  FAIL ${bad}`);
  }
}

const sample = JSON.parse(
  readFileSync(join(here, 'fixtures/serpapi-google-shopping.sample.json'), 'utf8'),
);

console.log('\nThe data module');

const ids = allParts.map((part) => part.id);
report(
  ids.every((id) => priceRecords[id]),
  'every catalogue part has a price record',
  'a catalogue part has no price record',
);
report(
  ids.every((id) => priceQueries[id]),
  'every catalogue part has a search query',
  'a catalogue part has no search query',
);

const records = Object.entries(priceRecords);
report(
  records.every(([, r]) => r.min === null || (r.min >= 0 && r.max >= r.min)),
  'every band runs upwards',
  'a band has max below min',
);
report(
  records.every(([, r]) => /^\d{4}-\d{2}-\d{2}$/.test(r.checkedAt)),
  'every record has a calendar date',
  'a record has a malformed date',
);
report(
  records.every(
    ([, r]) => r.sources.length > 0 && r.sources.every((s) => s.url.startsWith('https://')),
  ),
  'every record names at least one https source',
  'a record has no usable source',
);
report(
  records.every(
    ([, r]) => (r.min === null) === (r.max === null) && (r.min === null) === Boolean(r.reason),
  ),
  'a missing price always comes with a reason',
  'a record mixes a price with a reason, or has neither',
);

console.log('\nParts without a price');

const unavailable = allParts.filter((part) => part.price.unavailable);
report(unavailable.length > 0, 'some parts are flagged', 'no part is flagged as unavailable');
report(
  sumPrices([{ min: 100, max: 200 }, priceOf(unavailable[0].id)]).unpriced === 1,
  'a total counts the part it could not include',
  'a total lost track of an unpriced part',
);
report(
  sumPrices([priceOf(unavailable[0].id)]).unavailable === true,
  'a total of nothing but unpriced parts is not a zero',
  'a total of unpriced parts reads as free',
);

const picks = Array.from({ length: 300 }, (_, seed) =>
  autoPick({ budget: 3000 + seed * 90, purpose: 'gaming', seed: seed + 1 }),
);
report(
  picks.every((pick) => pick.price.unpriced === 0),
  'the automatic build never picks a part without a price',
  'the automatic build picked an unpriced part',
);

console.log('\nThe age warning');

const day = 86_400_000;
const checked = Date.parse('2026-11-06T00:00:00Z');
report(
  !isPriceStale('2026-11-06', checked + 45 * day),
  '45 days old is still fresh',
  '45 days old was reported stale',
);
report(
  isPriceStale('2026-11-06', checked + 46 * day),
  '46 days old is stale',
  '46 days old was reported fresh',
);
report(
  catalogueCheckedAt() ===
    records
      .map(([, r]) => r)
      .filter((r) => r.min !== null && !r.manual)
      .map((r) => r.checkedAt)
      .sort()[0],
  'the catalogue date is the oldest automated one',
  'the catalogue date is not the oldest',
);

console.log('\nReading a response');

const offers = extractOffers(sample);
report(
  offers.length === 10,
  'keeps złoty prices and drops the rest',
  `expected 10 offers, got ${offers.length}`,
);
report(
  !offers.some((offer) => offer.source === 'Foreign Shop'),
  'a dollar price is refused even though its number looks valid',
  'a dollar price was read as złoty',
);
report(
  extractOffers({}).length === 0 && extractOffers(null).length === 0,
  'a response with no results gives no offers',
  'an empty response threw or invented offers',
);

console.log('\nMatching a title to a part');

const ryzen = priceQueries['ryzen-5-7600'];
report(
  matchesPart('Procesor AMD Ryzen 5 7600 BOX', ryzen),
  'accepts the exact model',
  'rejected the exact model',
);
report(!matchesPart('AMD Ryzen 5 7600X BOX', ryzen), 'refuses the X variant', 'accepted a 7600X');
report(
  !matchesPart('Komputer Ryzen 5 7600 RTX 5060', ryzen),
  'refuses a whole computer',
  'accepted a whole computer',
);

const rtx = priceQueries['rtx-5070'];
report(matchesPart('MSI GeForce RTX 5070 12GB', rtx), 'accepts the RTX 5070', 'rejected a 5070');
report(
  matchesPart('Gigabyte RTX5070 Eagle', rtx),
  'accepts RTX5070 written solid',
  'rejected RTX5070',
);
report(!matchesPart('MSI GeForce RTX 5070 Ti 16GB', rtx), 'refuses the 5070 Ti', 'accepted a Ti');

const ram = priceQueries['flare-x5-32-6000'];
report(
  matchesPart('G.Skill Flare X5 32GB (2x16GB) DDR5-6000 CL30', ram) &&
    matchesPart('G.SKILL 32GB 6000MHz C30 Flare X5 AMD EXPO', ram),
  'accepts both ways of writing speed and latency',
  'rejected a valid memory title',
);
report(
  !matchesPart('G.Skill Flare X5 32GB DDR5-6000 CL32', ram),
  'refuses a slower memory timing',
  'accepted the wrong timing',
);

report(
  !isNewPolishOffer({ title: 'AMD Ryzen 5 7600 używany', source: 'Allegro' }) &&
    !isNewPolishOffer({ title: 'AMD Ryzen 5 7600', source: 'AliExpress' }) &&
    isNewPolishOffer({ title: 'AMD Ryzen 5 7600', source: 'x-kom.pl' }),
  'refuses used stock and foreign marketplaces',
  'let used or foreign stock through',
);

console.log('\nBuilding a band');

report(median([1, 2, 3]) === 2, 'the median of an odd set', 'wrong odd median');
report(
  median([1, 2, 3, 4]) === 2,
  'an even median stays on a real price',
  'an even median produced a price no shop showed',
);
report(
  rejectOutliers([{ price: 100 }, { price: 110 }, { price: 120 }, { price: 900 }, { price: 10 }])
    .length === 3,
  'drops figures far from the median',
  'kept an outlier',
);

const band = bandFromResponse(sample, ryzen);
report(band?.min === 699, 'the lowest credible offer is the low end', `min was ${band?.min}`);
report(band?.max === 795, 'the median offer is the typical price', `max was ${band?.max}`);
report(
  band?.sources.length > 0 && band.sources.every((source) => source.url.startsWith('https://')),
  'the band keeps links to its sources',
  'the band has no sources',
);
report(
  bandFromResponse({ shopping_results: sample.shopping_results.slice(0, 2) }, ryzen) === null,
  'too few offers give no band rather than a guess',
  'a band was built from too few offers',
);

report(
  !bandsDiffer({ min: 1, max: 2 }, { min: 1, max: 2 }) &&
    bandsDiffer({ min: 1, max: 2 }, { min: 1, max: 3 }),
  'only a changed number counts as a change',
  'change detection is wrong',
);

const rendered = renderPricesModule({
  a: { min: 1, max: 2, checkedAt: '2026-11-06', sources: [{ label: 'x', url: 'https://x.pl' }] },
});
report(
  rendered.includes('export const priceRecords') && rendered.includes('"checkedAt": "2026-11-06"'),
  'the module renders with its export',
  'the rendered module is missing its export',
);

console.log('\nRunning without a key');

const run = spawnSync(
  process.execPath,
  [
    '--experimental-strip-types',
    '--disable-warning=ExperimentalWarning',
    'scripts/update-prices.mjs',
  ],
  {
    cwd: join(here, '..'),
    encoding: 'utf8',
    env: Object.fromEntries(Object.entries(process.env).filter(([k]) => k !== 'SERPAPI_KEY')),
  },
);
report(
  run.status === 0 && run.stdout.includes('SERPAPI_KEY is not set'),
  'the script exits cleanly and says why',
  `exit ${run.status}: ${run.stderr}`,
);

console.log(`\n${passed}/${passed + failed} passed`);
process.exit(failed > 0 ? 1 : 0);
