import type { Localized } from './types';
import { sockets } from './sockets';
import { coolingProfiles } from './cooling';
import { builds } from './builds';
import { guides } from './guides';
import { articles } from './blog';
import { categoryOrder, getBrands } from './parts';
import { slugify } from './utils';

/**
 * Site navigation.
 *
 * Derived from the data modules rather than hand-listed, so a new socket,
 * cooler class, build or guide appears in the menu, the sitemap and the static
 * params of its route without three separate edits that can drift apart.
 */

export type NavLink = {
  /** Path relative to the locale segment, e.g. "/platformy/am5". */
  href: string;
  label: Localized;
  description?: Localized;
};

export type NavSection = {
  id: string;
  label: Localized;
  href: string;
  /** Rendered as a mega-menu column when present. */
  children?: NavLink[];
};

/** Every platform page, grouped by vendor. */
const platformLinks: NavLink[] = sockets.map((socket) => ({
  href: `/platformy/${socket.slug}`,
  label: {
    pl: `${socket.name} (${socket.vendor === 'amd' ? 'AMD' : 'Intel'})`,
    en: `${socket.name} (${socket.vendor === 'amd' ? 'AMD' : 'Intel'})`,
  },
  description: socket.tagline,
}));

const coolingLinks: NavLink[] = coolingProfiles.map((profile) => ({
  href: `/chlodzenie/${profile.slug}`,
  label: profile.name,
  description: profile.tagline,
}));

const buildLinks: NavLink[] = builds.map((build) => ({
  href: `/zestawy/${build.slug}`,
  label: build.name,
  description: build.tagline,
}));

const guideLinks: NavLink[] = guides.map((guide) => ({
  href: `/poradniki/${guide.slug}`,
  label: guide.title,
  description: guide.summary,
}));

/** Recent articles, plus a link to each category that has any. */
const articleLinks: NavLink[] = [
  {
    href: '/artykuly',
    label: { pl: 'Wszystkie artykuły', en: 'All articles' },
    description: {
      pl: 'Analizy, porady i wyjaśnienia',
      en: 'Analysis, advice and explainers',
    },
  },
  ...articles.slice(0, 6).map((article) => ({
    href: `/artykuly/${article.slug}`,
    label: article.title,
    description: article.summary,
  })),
];

export const navigation: NavSection[] = [
  {
    id: 'platforms',
    href: '/platformy',
    label: { pl: 'Platformy', en: 'Platforms' },
    children: [
      {
        href: '/platformy',
        label: { pl: 'Porównanie platform', en: 'Platform comparison' },
        description: {
          pl: 'AMD i Intel obok siebie',
          en: 'AMD and Intel side by side',
        },
      },
      ...platformLinks,
    ],
  },
  {
    id: 'cooling',
    href: '/chlodzenie',
    label: { pl: 'Chłodzenie', en: 'Cooling' },
    children: [
      {
        href: '/chlodzenie',
        label: { pl: 'Wszystkie typy chłodzenia', en: 'All cooling types' },
        description: {
          pl: 'Powietrze, AiO i obieg custom',
          en: 'Air, AiO and custom loops',
        },
      },
      ...coolingLinks,
    ],
  },
  {
    id: 'builds',
    href: '/zestawy',
    label: { pl: 'Zestawy', en: 'Builds' },
    children: [
      {
        href: '/zestawy',
        label: { pl: 'Wszystkie zestawy', en: 'All builds' },
        description: {
          pl: 'Gotowe listy zakupowe',
          en: 'Ready-made shopping lists',
        },
      },
      ...buildLinks,
    ],
  },
  {
    id: 'guides',
    href: '/poradniki',
    label: { pl: 'Poradniki', en: 'Guides' },
    children: [
      {
        href: '/poradniki',
        label: { pl: 'Wszystkie poradniki', en: 'All guides' },
        description: {
          pl: 'Od montażu po diagnostykę',
          en: 'From assembly to diagnostics',
        },
      },
      ...guideLinks,
    ],
  },
  {
    id: 'articles',
    href: '/artykuly',
    label: { pl: 'Artykuły', en: 'Articles' },
    children: articleLinks,
  },
  {
    id: 'tools',
    href: '/narzedzia',
    label: { pl: 'Narzędzia', en: 'Tools' },
    children: [
      {
        href: '/konfigurator',
        label: { pl: 'Konfigurator zestawu', en: 'Build configurator' },
        description: {
          pl: 'Dobierz podzespoły i sprawdź, czy do siebie pasują',
          en: 'Pick your parts and check they work together',
        },
      },
      {
        href: '/kalkulatory',
        label: { pl: 'Kalkulatory', en: 'Calculators' },
        description: {
          pl: 'Dziesięć przeliczników do planowania zestawu',
          en: 'Ten calculators for planning a build',
        },
      },
      {
        href: '/porownanie',
        label: { pl: 'Porównywarka', en: 'Comparison' },
        description: {
          pl: 'Zestaw podzespoły obok siebie',
          en: 'Put components side by side',
        },
      },
      {
        href: '/podzespoly',
        label: { pl: 'Przeglądarka podzespołów', en: 'Component browser' },
        description: {
          pl: 'Katalog części z filtrami i przedziałami cenowymi',
          en: 'The parts catalogue with filters and price ranges',
        },
      },
      {
        href: '/narzedzia/kompatybilnosc',
        label: { pl: 'Sprawdzarka zgodności', en: 'Compatibility checker' },
        description: {
          pl: 'Sprawdź, czy części do siebie pasują',
          en: 'Check whether your parts fit together',
        },
      },
      {
        href: '/narzedzia/zasilacz',
        label: { pl: 'Kalkulator zasilacza', en: 'PSU calculator' },
        description: {
          pl: 'Dobierz moc z właściwym zapasem',
          en: 'Size the wattage with the right headroom',
        },
      },
      {
        href: '/slownik',
        label: { pl: 'Słownik pojęć', en: 'Glossary' },
        description: {
          pl: 'Terminy wyjaśnione po ludzku',
          en: 'Terms explained in plain language',
        },
      },
      {
        href: '/zrodla',
        label: { pl: 'Źródła i linki', en: 'Sources and links' },
        description: {
          pl: 'Dokumentacja producentów i niezależne testy',
          en: 'Manufacturer documentation and independent testing',
        },
      },
      {
        href: '/faq',
        label: { pl: 'Najczęstsze pytania', en: 'Frequently asked questions' },
        description: {
          pl: 'Odpowiedzi na pytania, które padają najczęściej',
          en: 'Answers to the questions that come up most',
        },
      },
    ],
  },
];

/** Flat list of every content route, used by the sitemap and the search index. */
export function allContentRoutes(): string[] {
  return [
    '/',
    '/platformy',
    ...sockets.map((socket) => `/platformy/${socket.slug}`),
    '/chlodzenie',
    ...coolingProfiles.map((profile) => `/chlodzenie/${profile.slug}`),
    '/zestawy',
    ...builds.map((build) => `/zestawy/${build.slug}`),
    '/artykuly',
    '/filmy',
    ...articles.map((article) => `/artykuly/${article.slug}`),
    '/poradniki',
    ...guides.map((guide) => `/poradniki/${guide.slug}`),
    '/konfigurator',
    '/podzespoly',
    ...categoryOrder.map((category) => `/podzespoly/${category}`),
    ...getBrands().map(({ brand }) => `/podzespoly/marka/${slugify(brand)}`),
    '/porownanie',
    '/kalkulatory',
    '/narzedzia/kompatybilnosc',
    '/narzedzia/zasilacz',
    '/slownik',
    '/faq',
    '/zrodla',
    '/mapa-serwisu',
    '/o-serwisie',
    '/kontakt',
    '/zloz-u-mnie',
  ];
}

/** Footer link groups. Kept separate because the footer is not a mega-menu. */
export const footerNavigation: { label: Localized; links: NavLink[] }[] = [
  {
    label: { pl: 'Platformy', en: 'Platforms' },
    links: platformLinks,
  },
  {
    label: { pl: 'Chłodzenie', en: 'Cooling' },
    links: coolingLinks,
  },
  {
    label: { pl: 'Poradniki', en: 'Guides' },
    links: guideLinks.slice(0, 6),
  },
  {
    label: { pl: 'Usługi', en: 'Services' },
    links: [{ href: '/zloz-u-mnie', label: { pl: 'Złóż komputer u mnie', en: 'Build it for me' } }],
  },
  {
    label: { pl: 'Serwis', en: 'Site' },
    links: [
      { href: '/o-serwisie', label: { pl: 'O serwisie', en: 'About' } },
      { href: '/slownik', label: { pl: 'Słownik', en: 'Glossary' } },
      { href: '/faq', label: { pl: 'FAQ', en: 'FAQ' } },
      { href: '/zrodla', label: { pl: 'Źródła', en: 'Sources' } },
      { href: '/mapa-serwisu', label: { pl: 'Mapa serwisu', en: 'Site map' } },
      { href: '/kontakt', label: { pl: 'Kontakt', en: 'Contact' } },
      { href: '/dostepnosc', label: { pl: 'Dostępność', en: 'Accessibility' } },
    ],
  },
];
