import type { Locale } from '@/i18n/config';
import { localeTags } from '@/i18n/config';
import type { Localized } from './types';

/** Prefix for static assets — required when publishing under a sub-path. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Resolves a path inside public/ against the configured base path. */
export function asset(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}

/** Joins CSS class names, dropping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Picks the value for the active locale out of a localized field. */
export function t<T>(field: Localized<T>, locale: Locale): T {
  return field[locale];
}

/**
 * Formatters are cached per locale. Constructing an Intl formatter is
 * comparatively expensive and listing pages format dozens of values.
 *
 * Every amount on the site is a Polish retail price in złoty, VAT included, and
 * is never converted: Polish shows "1499 zł", English shows "PLN 1,499", so an
 * English reader cannot mistake it for euros or pounds.
 */
const moneyFormatters = new Map<Locale, Intl.NumberFormat>();

function moneyFormatter(locale: Locale): Intl.NumberFormat {
  let formatter = moneyFormatters.get(locale);
  if (!formatter) {
    formatter = new Intl.NumberFormat(localeTags[locale], {
      style: 'currency',
      currency: 'PLN',
      currencyDisplay: locale === 'pl' ? 'symbol' : 'code',
      maximumFractionDigits: 0,
    });
    moneyFormatters.set(locale, formatter);
  }
  return formatter;
}

/** Formats an amount in whole złoty, e.g. 1499 -> "1499 zł" / "PLN 1,499". */
export function formatPln(amount: number, locale: Locale): string {
  return moneyFormatter(locale).format(amount);
}

/** Formats a date for the active locale. */
export function formatDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleDateString(localeTags[locale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Formats a stored calendar day, e.g. "2026-11-06" -> "6 listopada 2026".
 *
 * UTC, because the value is a day rather than a moment: read in a local zone it
 * would land on the day before for anyone west of Greenwich, and differ between
 * the exported page and the browser that hydrates it. British English keeps the
 * day first, where a bare "en" tag would write "November 6, 2026".
 */
export function formatCalendarDate(day: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'pl' ? 'pl-PL' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(Date.parse(`${day}T00:00:00Z`));
}

/**
 * Turns arbitrary text into a URL-safe, anchor-safe slug.
 *
 * Polish diacritics are transliterated rather than stripped, so "chłodzenie"
 * becomes "chlodzenie" instead of "chodzenie" — dropping the letter entirely
 * would produce a different word.
 */
const DIACRITICS: Record<string, string> = {
  ą: 'a',
  ć: 'c',
  ę: 'e',
  ł: 'l',
  ń: 'n',
  ó: 'o',
  ś: 's',
  ź: 'z',
  ż: 'z',
};

export function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[ąćęłńóśźż]/g, (char) => DIACRITICS[char] ?? char)
      .normalize('NFD')
      // Strip the combining marks that NFD split off, written as escapes so the
      // range stays readable rather than being invisible characters in source.
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  );
}

/** Clamps a number into an inclusive range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
