import type { Locale } from '@/i18n/config';
import type { PartCategory, PriceRange, PriceTier } from './types.ts';
import { cpus } from './cpus.ts';
import { gpus } from './gpus.ts';
import { motherboards } from './motherboards.ts';
import { ramKits } from './ram.ts';
import { psus } from './psus.ts';
import { cases } from './cases.ts';
import { coolers } from './coolers.ts';
import { storage } from './storage.ts';

export * from './types.ts';
export * from './selection.ts';
export * from './compatibility.ts';
export * from './pricing.ts';
export type { UnavailableReason } from './price-types.ts';
export { cpus, gpus, motherboards, ramKits, psus, cases, coolers, storage };

/** Display order and labels for the price tiers. */
export const priceTiers: PriceTier[] = ['budget', 'value', 'midrange', 'high', 'flagship'];

/**
 * Categories in build order.
 *
 * This is the order the configurator presents, and it follows the order the
 * decisions actually constrain each other: the CPU fixes the socket, the socket
 * fixes the board, the board fixes the memory type, and only then do the parts
 * that merely have to fit come into play.
 */
export const categoryOrder: PartCategory[] = [
  'cpu',
  'motherboard',
  'ram',
  'gpu',
  'storage',
  'cooler',
  'psu',
  'case',
];

/**
 * Formats a price band for display, e.g. "420 – 560 zł", or one figure when both
 * ends are equal. A part with no price says so rather than showing a zero.
 */
export function formatPriceRange(range: PriceRange, locale: Locale): string {
  if (range.unavailable) return locale === 'pl' ? 'Brak ceny' : 'No price';
  const format = new Intl.NumberFormat(locale === 'pl' ? 'pl-PL' : 'en-GB', {
    maximumFractionDigits: 0,
  });
  if (range.min === range.max) return `${format.format(range.min)} zł`;
  return `${format.format(range.min)} – ${format.format(range.max)} zł`;
}
