import type { Locale } from '@/i18n/config';
import { defaultLocale, localePath } from '@/i18n/config';

/** Site-wide constants — one source of truth for SEO and contact details. */
export const site = {
  name: 'ZbudujKompa',
  shortName: 'ZbudujKompa',
  /** Production address — matches the CNAME file used by GitHub Pages. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zbudujkompa.dawidolko.pl',
  email: 'kontakt@zbudujkompa.pl',
  /** Repository, linked from the footer and the humans-readable metadata. */
  repository: 'https://github.com/dawidolko/ZbudujKompa',
  author: 'Dawid Olko',
  authorUrl: 'https://dawidolko.pl',
  locale: 'pl-PL',
} as const;

/** Builds an absolute URL — required in Open Graph tags and structured data. */
export function absoluteUrl(path = '/'): string {
  const base = site.url.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

/** Absolute URL for a locale-prefixed route. */
export function absoluteLocaleUrl(locale: Locale, path = '/'): string {
  return absoluteUrl(localePath(locale, path));
}

/**
 * Canonical URL of a localized page.
 *
 * Each language variant is canonical to itself. Pointing every locale at the
 * default one would tell search engines the other language is a duplicate and
 * keep it out of the index — the opposite of what hreflang is for.
 */
export function canonicalUrl(locale: Locale, path = '/'): string {
  return absoluteLocaleUrl(locale, path);
}

/** Canonical URL for pages outside the locale segments (e.g. the root). */
export function defaultCanonicalUrl(path = '/'): string {
  return absoluteLocaleUrl(defaultLocale, path);
}
