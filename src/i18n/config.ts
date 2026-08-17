/** Supported locales. English is the default and lives at /en/. */
export const locales = ['en', 'pl'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** Native language names, used in the language switcher. */
export const localeNames: Record<Locale, string> = {
  en: 'English',
  pl: 'Polski',
};

/** BCP 47 tags for the `lang` attribute and `Intl` formatters. */
export const localeTags: Record<Locale, string> = {
  en: 'en',
  pl: 'pl-PL',
};

/** Open Graph locale identifiers. */
export const ogLocales: Record<Locale, string> = {
  en: 'en_US',
  pl: 'pl_PL',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Builds a locale-prefixed path. Every route lives under a locale segment,
 * so links never have to special-case the default language.
 */
export function localePath(locale: Locale, path = '/'): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const clean = normalized === '/' ? '' : normalized.replace(/\/$/, '');
  return `/${locale}${clean}/`;
}

/**
 * Swaps the locale segment of a pathname, keeping the rest intact.
 * Used by the language switcher to stay on the same page across languages.
 */
export function switchLocaleInPath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0]!)) {
    segments[0] = nextLocale;
    return `/${segments.join('/')}/`;
  }
  return localePath(nextLocale, pathname);
}
