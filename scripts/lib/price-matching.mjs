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
const WHOLE_MACHINES = [
  'komputer',
  'laptop',
  'notebook',
  'desktop',
  'workstation',
  'stacja robocza',
];

/*
 * Words that put an offer in another category. A gaming PC listed as "Ryzen 7
 * 7800X3D RTX 5070 32GB 1TB" names no machine at all, so a processor title that
 * also names a graphics card, a drive or an operating system is a whole computer
 * or a bundle, never the processor on its own. "Radeon" alone is left out because
 * a Ryzen with integrated graphics carries it in its name.
 */
export const CATEGORY_NOT = {
  cpu: ['RTX', 'GTX', 'GeForce', 'RX', 'SSD', 'HDD', 'NVMe', 'Windows', 'płyta', 'zestaw'],
  gpu: ['Ryzen', 'Core i3', 'Core i5', 'Core i7', 'Core i9', 'Core Ultra', 'SSD', 'Windows'],
  motherboard: ['RTX', 'GeForce', 'zestaw'],
  psu: ['obudowa', 'RTX', 'GeForce'],
  case: ['zasilacz', 'RTX', 'GeForce', 'Ryzen'],
  cooler: ['Ryzen', 'Core i5', 'Core i7', 'Core Ultra'],
};

/*
 * How far one run may move a price that was already confirmed. A part does not
 * get 40 % dearer or 30 % cheaper in the two weeks between runs, so a band
 * outside these limits is a wrong match: a whole computer, a bundle, a second-
 * hand listing or another model. The part keeps its previous record, date
 * included, and the run log names it so a person can check it by hand.
 */
const MAX_STEP_UP = 1.4;
const MAX_STEP_DOWN = 0.7;

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
 * Google marks second-hand listings with `second_hand_condition`, which is a
 * surer sign than any word in the title, so those are dropped here. The link
 * falls back to `link` when a result carries no `product_link`.
 */
export function extractOffers(response) {
  const results = Array.isArray(response?.shopping_results) ? response.shopping_results : [];
  return results.flatMap((result) => {
    const price = result?.extracted_price;
    const label = String(result?.price ?? '');
    if (typeof price !== 'number' || !Number.isFinite(price) || price <= 0) return [];
    if (!/zł|pln/i.test(label)) return [];
    if (result.second_hand_condition) return [];
    return [
      {
        title: String(result.title ?? ''),
        price,
        source: String(result.source ?? ''),
        url: String(result.product_link ?? result.link ?? ''),
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
 *
 * Every record needs at least one https source, so when no offer carries a
 * usable link the band points at the Google Shopping search it came from.
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
    .filter((offer) => /^https:\/\//.test(offer.url))
    .slice(0, 3)
    .map((offer) => ({ label: offer.source || 'Google Shopping', url: offer.url }));
  if (sources.length === 0) sources.push(shoppingSearch(query.q));

  return { min: Math.round(Math.min(...prices)), max: Math.round(typical), sources };
}

/* The Polish Google Shopping search for a query, used as a source of last resort. */
export function shoppingSearch(q) {
  const url = new URL('https://www.google.pl/search');
  url.search = new URLSearchParams({ tbm: 'shop', hl: 'pl', gl: 'pl', q: q ?? '' }).toString();
  return { label: 'Google Shopping', url: url.toString() };
}

/*
 * Why a new band cannot follow the previous record, or null when it may. Both
 * ends are checked: the low end guards against a single bad offer, the typical
 * price against a whole set of wrong matches. A previous figure of zero (a part
 * that comes free in the box) gives nothing to compare with on that end.
 */
export function implausibleStep(previous, band) {
  if (previous.min === null || previous.max === null) return null;
  const ends = [
    ['low end', previous.min, band.min],
    ['typical price', previous.max, band.max],
  ];
  for (const [name, before, after] of ends) {
    if (before <= 0) continue;
    const ratio = after / before;
    if (ratio > MAX_STEP_UP || ratio < MAX_STEP_DOWN) {
      return `${name} ${before} -> ${after} zł (x${ratio.toFixed(2)})`;
    }
  }
  return null;
}

/* True when a refresh changed a number, which is what is worth a commit. */
export function bandsDiffer(previous, next) {
  return previous.min !== next.min || previous.max !== next.max;
}

/*
 * Applies a run to the records. `outcomes` holds one { id, band } per part the
 * run got an answer for, with a null band where too few offers survived: that
 * part keeps its record, date included, so it ages out rather than being
 * refreshed on no evidence. A band that moves a confirmed price too far is held
 * the same way and listed in `held`. A part with no price comes back on a band,
 * and the tier follows the new typical price through `tierFor`.
 */
export function mergeRefresh(records, outcomes, { today, tierFor }) {
  const next = structuredClone(records);
  const summary = {
    refreshed: 0,
    pricedRefreshed: 0,
    changed: [],
    restored: [],
    retiered: [],
    held: [],
  };

  for (const { id, band } of outcomes) {
    if (!band) continue;
    const previous = records[id];
    const jump = implausibleStep(previous, band);
    if (jump) {
      summary.held.push(`${id}: ${jump}`);
      continue;
    }
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
