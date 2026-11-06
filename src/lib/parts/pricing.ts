import { priceRecords } from './prices.ts';
import type { PriceRecord, UnavailableReason } from './price-types.ts';
import type { PriceRange, PriceTotal } from './types.ts';

/** Past this many days a price is hidden, and the reader is sent to live offers. */
export const PRICE_STALE_DAYS = 45;

/**
 * The moment this site was built, as written by next.config.ts.
 *
 * The static HTML is judged against this rather than the clock, so a server
 * render and the hydration that follows it always agree. Outside a build there
 * is no such moment, and the present is the honest answer.
 */
export const builtAt = (): number => Number(process.env.NEXT_PUBLIC_BUILT_AT) || Date.now();

const DAY_MS = 24 * 60 * 60 * 1000;

/** The stored record for a part or a cooling class. */
export function priceRecord(id: string): PriceRecord {
  const record = priceRecords[id];
  if (!record) throw new Error(`No price record for "${id}"`);
  return record;
}

/**
 * The price band of a part.
 *
 * A part with no price is flagged rather than given a zero, because a zero would
 * read as "free" to every sum and sort downstream.
 */
export function priceOf(id: string): PriceRange {
  const { min, max, checkedAt } = priceRecord(id);
  return min === null ? { min: 0, max: 0, unavailable: true } : { min, max, checkedAt };
}

/** Why a part has no price, or undefined when it has one. */
export function unavailableReason(id: string): UnavailableReason | undefined {
  return priceRecord(id).reason;
}

/**
 * Adds up price bands.
 *
 * Parts without a price are counted rather than silently dropped, so a total can
 * say it is incomplete instead of looking cheaper than the build really is. The
 * total carries the oldest date among its parts, so one stale part stops the
 * whole sum from being shown.
 */
export function sumPrices(ranges: PriceRange[]): PriceTotal {
  let min = 0;
  let max = 0;
  let unpriced = 0;
  let oldest: string | undefined;
  for (const range of ranges) {
    if (range.unavailable) {
      unpriced += 1;
    } else {
      min += range.min;
      max += range.max;
      if (range.checkedAt && (!oldest || range.checkedAt < oldest)) oldest = range.checkedAt;
    }
  }
  const nothingPriced = unpriced > 0 && unpriced === ranges.length;
  return {
    min,
    max,
    unpriced,
    ...(oldest ? { checkedAt: oldest } : {}),
    ...(nothingPriced ? { unavailable: true } : {}),
  };
}

/**
 * The check date to show for the catalogue as a whole.
 *
 * The oldest one, so the page can never claim more freshness than its weakest
 * figure has. Unpriced parts show no figure, and manual records are outside the
 * automated refresh, so neither holds the date back.
 */
export function catalogueCheckedAt(): string {
  const dates = Object.values(priceRecords)
    .filter((record) => record.min !== null && !record.manual)
    .map((record) => record.checkedAt)
    .sort();
  const oldest = dates[0];
  if (!oldest) throw new Error('The catalogue has no priced parts');
  return oldest;
}

/** Whether a check date is too old for its price to be shown. */
export function isPriceStale(checkedAt: string, now: number): boolean {
  return now - Date.parse(`${checkedAt}T00:00:00Z`) > PRICE_STALE_DAYS * DAY_MS;
}

/**
 * Hides expired prices before the first paint.
 *
 * Static HTML keeps the figures it was built with, and React only corrects them
 * once it has hydrated. This runs in the head, ahead of any figure, so an expired
 * price never reaches the screen, not even for that moment.
 */
export function priceAgeScript(): string {
  const dates = [...new Set(Object.values(priceRecords).map((record) => record.checkedAt))];
  return `(function () {
  var dates = ${JSON.stringify(dates)};
  var limit = ${PRICE_STALE_DAYS * DAY_MS};
  var now = Date.now();
  var rules = dates
    .filter(function (date) { return now - Date.parse(date + 'T00:00:00Z') > limit; })
    .map(function (date) { return '[data-price-date="' + date + '"]{display:none!important}'; });
  if (rules.length === 0) return;
  var style = document.createElement('style');
  style.textContent = rules.join('');
  document.head.appendChild(style);
})();`;
}
