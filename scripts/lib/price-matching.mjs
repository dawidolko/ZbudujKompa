/*
 * Pure logic for the price refresh: reading a SerpApi Google Shopping
 * response, deciding which offers are really the part, and turning what is left
 * into a price band. Nothing here touches the network or the disk, so all of it
 * can be tested against a sample response.
 */

/* An offer needs at least this many siblings before a band is trusted. */
export const MIN_OFFERS = 3;

/* Bringing back a part with no price takes more evidence than updating one. */
export const RESTORE_MIN_OFFERS = 5;

/* Below this share of priced parts refreshed, a run has failed and writes nothing. */
const MIN_REFRESHED_SHARE = 0.5;

/* Offers this far from the median are treated as a wrong match or a mistake. */
const OUTLIER_LOW = 0.6;
const OUTLIER_HIGH = 1.6;

/* Second-hand or damaged stock, which would drag a retail band down. */
const CONDITION_WORDS = [
  'używan',
  'uzywan',
  'outlet',
  'odnawian',
  'refurb',
  'renewed',
  'poleasing',
  'powystawow',
  'open box',
  'uszkodz',
  'ze zwrotu',
];

/* Whole machines, whose titles list parts they merely contain. */
const WHOLE_MACHINES = ['komputer', 'laptop', 'notebook', 'desktop'];

/* Marketplaces that ship from abroad, so the price is not a Polish shelf price. */
const FOREIGN_MARKETPLACES = ['ebay', 'aliexpress', 'temu', 'alibaba', 'wish'];

/*
 * Matches a term as a whole token, so that "7600" does not accept "7600X" and
 * "5070" does not accept "15070". Case is ignored, and spaces inside a term
 * match any run of spaces or hyphens.
 */
function hasTerm(title, term) {
  const pattern = term
    .split(/\s+/)
    .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('[\\s-]*');
  return new RegExp(`(?<![a-z0-9])${pattern}(?![a-z0-9])`, 'i').test(title);
}

/*
 * Every `must` entry present and no `not` term present. An entry that is an
 * array is satisfied by any one of its spellings. Whole computers are refused
 * for every part, because their titles name the components inside them.
 */
export function matchesPart(title, { must = [], not = [] }) {
  const present = (entry) =>
    Array.isArray(entry) ? entry.some((term) => hasTerm(title, term)) : hasTerm(title, entry);
  return must.every(present) && ![...not, ...WHOLE_MACHINES].some((term) => hasTerm(title, term));
}

/*
 * Reads the offers out of a response. The price has to be stated in złoty:
 * `extracted_price` is a bare number, so it says nothing about the currency.
 */
export function extractOffers(response) {
  const results = Array.isArray(response?.shopping_results) ? response.shopping_results : [];
  return results.flatMap((result) => {
    const price = result?.extracted_price;
    const label = String(result?.price ?? '');
    if (typeof price !== 'number' || !Number.isFinite(price) || price <= 0) return [];
    if (!/zł|pln/i.test(label)) return [];
    return [
      {
        title: String(result.title ?? ''),
        price,
        source: String(result.source ?? ''),
        url: String(result.product_link ?? ''),
      },
    ];
  });
}

/* Offers from a Polish retail listing in new condition. */
export function isNewPolishOffer(offer) {
  const title = offer.title.toLowerCase();
  const source = offer.source.toLowerCase();
  if (CONDITION_WORDS.some((word) => title.includes(word))) return false;
  return !FOREIGN_MARKETPLACES.some((name) => source.includes(name));
}

/*
 * The middle value. With an even count this takes the lower of the two middle
 * values rather than averaging them, so a band only ever holds a price that a
 * shop actually displayed.
 */
export function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor((sorted.length - 1) / 2)];
}

/* Drops offers far from the median of the set. */
export function rejectOutliers(offers) {
  if (offers.length === 0) return [];
  const middle = median(offers.map((offer) => offer.price));
  return offers.filter(
    (offer) => offer.price >= middle * OUTLIER_LOW && offer.price <= middle * OUTLIER_HIGH,
  );
}

/*
 * Turns a response into a band for one part, or null when too few offers
 * survive. A null keeps the previous record rather than publishing a guess.
 * The band runs from the lowest credible offer to the median, which is the same
 * meaning the hand-checked figures have: lowest sensible and typical.
 */
export function bandFromResponse(response, query, minOffers = MIN_OFFERS) {
  const matching = extractOffers(response)
    .filter(isNewPolishOffer)
    .filter((offer) => matchesPart(offer.title, query));
  const offers = rejectOutliers(matching);
  if (offers.length < minOffers) return null;

  const prices = offers.map((offer) => offer.price);
  const typical = median(prices);
  const sources = [...offers]
    .sort((a, b) => Math.abs(a.price - typical) - Math.abs(b.price - typical))
    .filter((offer) => offer.url)
    .slice(0, 3)
    .map((offer) => ({ label: offer.source || 'Google Shopping', url: offer.url }));

  return { min: Math.round(Math.min(...prices)), max: Math.round(typical), sources };
}

/* True when a refresh changed a number, which is what is worth a commit. */
export function bandsDiffer(previous, next) {
  return previous.min !== next.min || previous.max !== next.max;
}

/*
 * Applies a run to the records. `outcomes` holds one { id, band } per part the
 * run got an answer for, with a null band where too few offers survived: that
 * part keeps its record, date included, so it ages out rather than being
 * refreshed on no evidence. A part with no price comes back on a band, and the
 * tier follows the new typical price through `tierFor`.
 */
export function mergeRefresh(records, outcomes, { today, tierFor }) {
  const next = structuredClone(records);
  const summary = { refreshed: 0, pricedRefreshed: 0, changed: [], restored: [], retiered: [] };

  for (const { id, band } of outcomes) {
    if (!band) continue;
    const previous = records[id];
    const restored = previous.min === null;
    const tier = previous.tier ? tierFor(id, previous.tier, band.max) : undefined;

    next[id] = {
      min: band.min,
      max: band.max,
      ...(tier ? { tier } : {}),
      checkedAt: today,
      sources: band.sources,
    };

    summary.refreshed += 1;
    if (restored) summary.restored.push(id);
    else {
      summary.pricedRefreshed += 1;
      if (bandsDiffer(previous, band)) summary.changed.push(id);
    }
    if (tier && tier !== previous.tier) summary.retiered.push(`${id}: ${previous.tier} -> ${tier}`);
  }

  return { next, ...summary };
}

/*
 * Why a run must not be written, or null when it may. A key that stopped working
 * or a shop feed that broke shows up as most parts failing, and that run says
 * nothing about the prices it missed, so all of it is thrown away.
 */
export function refusalReason({ refreshed, pricedRefreshed, pricedQueued }) {
  if (refreshed === 0) return 'Nothing could be refreshed.';
  if (pricedRefreshed < pricedQueued * MIN_REFRESHED_SHARE) {
    return `Only ${pricedRefreshed} of ${pricedQueued} priced parts were refreshed.`;
  }
  return null;
}

/* Writes the data module. Prettier tidies the layout in the workflow. */
export function renderPricesModule(records) {
  const entries = Object.entries(records)
    .map(([id, record]) => `  ${JSON.stringify(id)}: ${JSON.stringify(record, null, 2)},`)
    .join('\n');

  return `import type { PriceRecord } from './price-types.ts';

/**
 * Price data for the catalogue, and the only place a price is written down.
 *
 * Generated: scripts/update-prices.mjs rewrites this file, so an edit by hand
 * has to keep this shape.
 *
 * \`min\` is the lowest sensible new retail price and \`max\` the typical price at
 * a mainstream shop, both in PLN. \`min\` and \`max\` are null when no credible
 * Polish price was found, and \`reason\` then says why. \`tier\` is where the part
 * sits in its category, and follows the price. Records marked \`manual\` are not
 * touched by the automated refresh.
 */
export const priceRecords: Record<string, PriceRecord> = {
${entries}
};
`;
}
