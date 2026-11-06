import { priceRecords } from './prices.ts';
import type { PriceRecord, UnavailableReason } from './price-types.ts';
import type { PriceRange, PriceTotal } from './types.ts';

/** Past this many days a check is too old to be trusted without a warning. */
export const PRICE_STALE_DAYS = 45;

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
  const { min, max } = priceRecord(id);
  return min === null ? { min: 0, max: 0, unavailable: true } : { min, max };
}

/** Why a part has no price, or undefined when it has one. */
export function unavailableReason(id: string): UnavailableReason | undefined {
  return priceRecord(id).reason;
}

/**
 * Adds up price bands.
 *
 * Parts without a price are counted rather than silently dropped, so a total can
 * say it is incomplete instead of looking cheaper than the build really is.
 */
export function sumPrices(ranges: PriceRange[]): PriceTotal {
  let min = 0;
  let max = 0;
  let unpriced = 0;
  for (const range of ranges) {
    if (range.unavailable) {
      unpriced += 1;
    } else {
      min += range.min;
      max += range.max;
    }
  }
  const nothingPriced = unpriced > 0 && unpriced === ranges.length;
  return { min, max, unpriced, ...(nothingPriced ? { unavailable: true } : {}) };
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

/** Whether a check date is older than the warning threshold. */
export function isPriceStale(checkedAt: string, now: number): boolean {
  return now - Date.parse(`${checkedAt}T00:00:00Z`) > PRICE_STALE_DAYS * DAY_MS;
}
