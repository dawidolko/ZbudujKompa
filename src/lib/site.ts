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

/**
 * Where to reach the person behind the site, for the build-service page.
 *
 * Separate from `site` above, which is about the site itself: this is personal
 * contact detail, and keeping the two apart makes it obvious which is which.
 * No phone number by choice — email and social reach the same person without
 * publishing a number that cannot be unpublished.
 */
export const contact = {
  email: 'dawid_olko@outlook.com',
  portfolio: 'https://dawidolko.pl',
  workstation: 'https://workstation.dawidolko.pl',
  instagram: 'https://instagram.com/dawid_olko',
  instagramHandle: '@dawid_olko',
  facebook: 'https://www.facebook.com/olkodawid/',
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

/** The shared social card. The file is 1200x630, the size Open Graph consumers expect. */
export const ogImage = {
  url: absoluteUrl('/og-default.png'),
  width: 1200,
  height: 630,
  alt: site.name,
};

const titleHints: Record<Locale, string> = {
  pl: 'poradnik składania PC',
  en: 'PC building guide',
};

/**
 * Builds a <title> that stays within the 30-60 characters shown in search results.
 * Short names get a descriptive middle part so they are not reported as thin titles.
 */
export function seoTitle(label: string, locale: Locale): { absolute: string } {
  const plain = `${label} — ${site.name}`;
  if (plain.length < 30) return { absolute: `${label} — ${titleHints[locale]} — ${site.name}` };
  return { absolute: plain.length > 60 ? label : plain };
}

/**
 * Keeps a meta description within 70-160 characters: long text is cut at a sentence
 * end, and text that is too short is followed by the extra sentence given for the page.
 */
export function seoDescription(text: string, extra = ''): string {
  const clean = text.trim().replace(/([^.!?])$/, '$1.');
  if (clean.length > 160) {
    const sentences = clean.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [clean];
    let result = '';
    for (const sentence of sentences) {
      if ((result + sentence).trim().length > 160) break;
      result += sentence;
    }
    return result.trim().length >= 70
      ? result.trim()
      : `${clean.slice(0, 157).replace(/\s+\S*$/, '')}...`;
  }
  if (clean.length >= 70 || !extra) return clean;
  return seoDescription(`${clean} ${extra}`);
}
