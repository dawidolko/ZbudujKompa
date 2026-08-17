import { en, type Dictionary } from './dictionaries/en';
import { pl } from './dictionaries/pl';
import type { Locale } from './config';

const dictionaries: Record<Locale, Dictionary> = { en, pl };

/**
 * Returns the dictionary for a locale. Dictionaries are plain objects bundled
 * at build time — there is no server to fetch them from in a static export.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
export * from './config';
