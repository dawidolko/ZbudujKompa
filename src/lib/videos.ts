import type { Localized } from './types.ts';

/**
 * Recommended videos.
 *
 * Every id here was verified against YouTube's oEmbed endpoint, which returns
 * the real title and channel — a check worth doing, because a plausible-looking
 * eleven-character id is very easy to produce and impossible to spot as wrong
 * by reading it.
 *
 * Linked rather than embedded, deliberately: an embedded player loads Google's
 * tracking on every page view, which a site carrying no analytics has no
 * business doing on the reader's behalf. Thumbnails are served from this site,
 * so nothing here reaches a third party until the reader chooses to go.
 */

export type VideoCategory = 'assembly' | 'cooling' | 'testing' | 'troubleshooting' | 'components';

export type Video = {
  /** YouTube id, verified to resolve. */
  id: string;
  /** Channel name exactly as YouTube reports it. */
  channel: string;
  category: VideoCategory;
  /** Title as published, not translated — it is the title of a real video. */
  title: string;
  /** Why it is worth the reader's time. */
  note: Localized;
  minutes: number;
  language: 'pl' | 'en';
  /** Set where a video is sound on fundamentals but dated on specifics. */
  dated?: boolean;
};

export const videos: Video[] = [
  /* ---------------------------------------------------------- Polish --- */
  {
    id: 'UcH6IsPT0r4',
    channel: 'x-kom',
    category: 'assembly',
    title: 'Jak złożyć komputer w 2026? Poradnik krok po kroku',
    minutes: 80,
    language: 'pl',
    note: {
      pl: 'Najbardziej aktualny polski poradnik montażu. Długi, ale pokazuje cały proces bez pomijania trudnych momentów.',
      en: 'The most current Polish assembly walkthrough. Long, but it shows the whole process without skipping the awkward parts.',
    },
  },
  {
    id: 'LuHaIzY6lOo',
    channel: 'Tek Testers',
    category: 'assembly',
    title: 'Jak złożyć komputer — poradnik krok po kroku 2026',
    minutes: 15,
    language: 'pl',
    note: {
      pl: 'Zwięzła wersja tego samego materiału. Dobra, jeśli chcesz przypomnieć sobie kolejność przed samym montażem.',
      en: 'A concise version of the same material. Good for refreshing the order of operations just before you start.',
    },
  },
  {
    id: '3LcPBP2UwwE',
    channel: 'moreleTV',
    category: 'assembly',
    title: 'Jak złożyć komputer? Montaż PC: poradnik krok po kroku',
    minutes: 11,
    language: 'pl',
    note: {
      pl: 'Krótki przegląd całego montażu. Przydatny jako pierwsze zapoznanie się z tematem.',
      en: 'A short overview of the whole build. Useful as a first look at what is involved.',
    },
  },
  {
    id: 'JH_0zafA8qQ',
    channel: 'Komputronik',
    category: 'assembly',
    title: 'Jak samodzielnie złożyć komputer — poradnik krok po kroku',
    minutes: 27,
    language: 'pl',
    note: {
      pl: 'Spokojne tempo i dużo zbliżeń na złącza — dobre uzupełnienie naszych diagramów.',
      en: 'A measured pace with plenty of close-ups on connectors — a good companion to our diagrams.',
    },
  },
  {
    id: 'Tc5MjD0RsZA',
    channel: 'benchmarkpl',
    category: 'assembly',
    title: 'Jak złożyć samemu komputer, krok po kroku',
    minutes: 28,
    language: 'pl',
    note: {
      pl: 'Materiał od redakcji testującej sprzęt, z komentarzem o tym, na co uważać przy doborze części.',
      en: 'From a hardware testing outlet, with commentary on what to watch for when choosing parts.',
    },
  },
  /* --------------------------------------------------------- English --- */
  {
    id: 'oc0yMoNMwek',
    channel: 'Gamers Nexus',
    category: 'assembly',
    title: 'How to Build a Gaming Computer: DIY Gaming PC Step-By-Step Tutorial',
    minutes: 14,
    language: 'en',
    note: {
      pl: 'Zwięzły montaż od kanału, który publikuje swoją metodykę testów. Bez zbędnego wypełniacza.',
      en: 'A concise build from a channel that publishes its testing methodology. No filler.',
    },
  },
  {
    id: 'v7MYOpFONCU',
    channel: 'Linus Tech Tips',
    category: 'assembly',
    title: 'First Person View PC BUILD Guide (POV)',
    minutes: 40,
    language: 'en',
    note: {
      pl: 'Nagranie z perspektywy pierwszej osoby — najbliżej tego, co sam zobaczysz nad obudową.',
      en: "Filmed from the builder's point of view — the closest thing to what you will actually see over the case.",
    },
  },
  {
    id: 'xnIz4yUiH2U',
    channel: 'Gamers Nexus',
    category: 'cooling',
    title: 'Everything to Know About Thermal Paste',
    minutes: 11,
    language: 'en',
    note: {
      pl: 'Testy zamiast opinii. Potwierdza, że metoda nakładania pasty mieści się w granicach błędu pomiaru.',
      en: 'Testing rather than opinion. It confirms application method sits within measurement error.',
    },
  },
  {
    id: 'JQtyxRtsqvA',
    channel: 'Gamers Nexus',
    category: 'cooling',
    title: 'Fan Testing, 3 Years Later: Airflow Case Mesh vs. Noctua NF-A12',
    minutes: 45,
    language: 'en',
    note: {
      pl: 'Pomiary przepływu przez siatkę i filtry — pokazuje, o ile realny przepływ odbiega od wartości nominalnych.',
      en: 'Measured airflow through mesh and filters — it shows how far real flow falls below the rated figures.',
    },
  },
  {
    id: 'ePZCHQ--UJM',
    channel: 'Gamers Nexus',
    category: 'testing',
    title: 'What is "Delta T over Ambient"?',
    minutes: 12,
    language: 'en',
    note: {
      pl: 'Wyjaśnia, dlaczego chłodzenia porównuje się wzrostem nad temperaturą otoczenia, a nie wartością bezwzględną.',
      en: 'Explains why coolers are compared on the rise over ambient rather than on an absolute reading.',
    },
  },
  {
    id: 'fmTOJP4KOyk',
    channel: 'Gamers Nexus',
    category: 'testing',
    title: 'Why Most Cooler Tests Are Flawed: CPU Cooler Testing Methodology',
    minutes: 34,
    language: 'en',
    note: {
      pl: 'Pokazuje, jak łatwo źle przeprowadzić test chłodzenia — przydatne przy ocenianiu recenzji, które czytasz.',
      en: 'Shows how easily a cooler test goes wrong — useful for judging the reviews you read.',
    },
  },
  {
    id: 'dx4En-2PzOU',
    channel: 'Hardware Unboxed',
    category: 'components',
    title: 'How Much VRAM Do Gamers Need? 8GB, 12GB, 16GB or MORE?',
    minutes: 19,
    language: 'en',
    note: {
      pl: 'Pomiary zamiast spekulacji. Dobre uzupełnienie naszego artykułu o zapotrzebowaniu na pamięć karty.',
      en: 'Measurement rather than speculation. A good companion to our article on graphics memory demand.',
    },
  },
  {
    id: 'dhMYmEu8gks',
    channel: 'Hardware Unboxed',
    category: 'components',
    title: '4x4GB vs. 2x8GB: Intel & AMD Dual-Channel Gaming Benchmark',
    minutes: 10,
    language: 'en',
    dated: true,
    note: {
      pl: 'Starszy materiał, ale zasada się nie zmieniła: dwa moduły zamiast czterech to pewniejszy profil pamięci.',
      en: 'An older piece, but the principle has not changed: two modules rather than four holds a memory profile more reliably.',
    },
  },
  {
    id: 'lqThn3C-zg4',
    channel: 'Techquickie',
    category: 'components',
    title: 'Choosing the Right PC Power Supply (PSU) as Fast As Possible',
    minutes: 5,
    language: 'en',
    dated: true,
    note: {
      pl: 'Krótkie wprowadzenie do doboru zasilacza. Uwaga: sprzed standardu ATX 3.x, więc o skokach poboru nie mówi.',
      en: 'A short introduction to choosing a supply. Note it predates ATX 3.x, so it does not cover transient spikes.',
    },
  },
  {
    id: 'vWjMt8GMsX8',
    channel: 'JayzTwoCents',
    category: 'troubleshooting',
    title: 'Troubleshooting a PC that REFUSES to POST',
    minutes: 18,
    language: 'en',
    note: {
      pl: 'Diagnostyka na żywo, z pokazaniem kolejności sprawdzania. Pokrywa się z naszym poradnikiem.',
      en: 'Live diagnosis showing the order to check things in. It lines up with our own guide.',
    },
  },
];

/** Locally hosted thumbnail, so nothing loads from a third party unbidden. */
export function videoThumbnail(id: string): string {
  return `/videos/${id}.jpg`;
}

export function videoUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function videosByCategory(category: VideoCategory): Video[] {
  return videos.filter((video) => video.category === category);
}

/** Videos in the reader's language first, then the rest. */
export function videosForLocale(locale: 'pl' | 'en'): Video[] {
  return [...videos].sort((a, b) => {
    if (a.language === b.language) return 0;
    return a.language === locale ? -1 : 1;
  });
}
