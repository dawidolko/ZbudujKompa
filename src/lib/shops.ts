import type { Locale } from '@/i18n/config';
import type { Part } from './parts/types.ts';

/**
 * Retailer links.
 *
 * A deliberate design note, because it constrains everything here: none of the
 * Polish retailers publish a public product API, and Amazon's requires an
 * approved affiliate account. A static site could not call them from the
 * browser in any case — there is no CORS access and no server to proxy through.
 *
 * What does work, and what this builds, is a search deep link: a URL that opens
 * the retailer with the part name already entered. That is a real, working
 * route to buying the component, and it keeps working when a shop redesigns its
 * catalogue — which a scraped product id would not.
 *
 * No link here is an affiliate link, and the site earns nothing from them.
 */

export type Shop = {
  id: string;
  name: string;
  /** Which markets the shop serves, so irrelevant ones can be hidden. */
  locales: Locale[];
  /** Builds a search URL for a query. */
  search: (query: string) => string;
  /** Roughly what the shop is good for, shown beside the link. */
  note: Record<Locale, string>;
};

export const shops: Shop[] = [
  {
    id: 'xkom',
    name: 'x-kom',
    locales: ['pl'],
    search: (query) => `https://www.x-kom.pl/szukaj?q=${encodeURIComponent(query)}`,
    note: {
      pl: 'Duży wybór podzespołów, sklepy stacjonarne w większych miastach.',
      en: 'A wide component range, with physical stores in larger Polish cities.',
    },
  },
  {
    id: 'morele',
    name: 'Morele',
    locales: ['pl'],
    search: (query) =>
      `https://www.morele.net/wyszukiwarka/0/0/,,,,,,,,0,,,,/1/?q=${encodeURIComponent(query)}`,
    note: {
      pl: 'Zwykle konkurencyjne ceny, częste promocje na zestawy.',
      en: 'Usually competitive pricing, with frequent bundle promotions.',
    },
  },
  {
    id: 'proline',
    name: 'Proline',
    locales: ['pl'],
    search: (query) => `https://www.proline.pl/szukaj?text=${encodeURIComponent(query)}`,
    note: {
      pl: 'Sklep skierowany do składających komputery, dobra dostępność części.',
      en: 'A shop aimed at builders, with good parts availability.',
    },
  },
  {
    id: 'ceneo',
    name: 'Ceneo',
    locales: ['pl'],
    search: (query) => `https://www.ceneo.pl/;szukaj-${encodeURIComponent(query)}`,
    note: {
      pl: 'Porównywarka cen — pokazuje tę samą część w wielu sklepach naraz.',
      en: 'A price comparison site — it shows the same part across many shops at once.',
    },
  },
  {
    id: 'amazon',
    name: 'Amazon',
    locales: ['pl', 'en'],
    search: (query) => `https://www.amazon.pl/s?k=${encodeURIComponent(query)}`,
    note: {
      pl: 'Międzynarodowa dostępność, przydatne przy częściach trudno dostępnych w Polsce.',
      en: 'International availability, useful for parts hard to find locally.',
    },
  },
  {
    id: 'pcpartpicker',
    name: 'PCPartPicker',
    locales: ['pl', 'en'],
    search: (query) => `https://pcpartpicker.com/search/?q=${encodeURIComponent(query)}`,
    note: {
      pl: 'Baza podzespołów z historią cen i sprawdzaniem zgodności.',
      en: 'A component database with price history and compatibility checking.',
    },
  },
];

/** Shops relevant to a locale. */
export function shopsFor(locale: Locale): Shop[] {
  return shops.filter((shop) => shop.locales.includes(locale));
}

/**
 * The search query for a part.
 *
 * Brand and model together, because a model name alone is ambiguous across
 * manufacturers — several vendors sell something called "Pro B650M".
 */
export function partQuery(part: Part): string {
  return `${part.brand} ${part.name}`;
}
