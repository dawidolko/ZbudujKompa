import type { Localized } from './types.ts';

/**
 * Recommended videos.
 *
 * Curated links rather than embedded players, and that is deliberate: an
 * embedded YouTube iframe loads Google's tracking scripts on every page view,
 * which a site with no analytics has no business doing on the reader's behalf.
 * A thumbnail and a link give the same access and leave the choice with them.
 *
 * Thumbnails come from YouTube's image host, which serves them without setting
 * cookies — unlike the player itself.
 */

export type VideoCategory = 'assembly' | 'cooling' | 'testing' | 'troubleshooting';

export type Video = {
  /** YouTube video id, which is also the thumbnail key. */
  id: string;
  channel: string;
  category: VideoCategory;
  title: Localized;
  /** Why this one is worth the reader's time, in a sentence. */
  note: Localized;
  /** Approximate length, so the reader can judge before clicking. */
  minutes: number;
  language: 'pl' | 'en';
};

export const videos: Video[] = [
  {
    id: 'v7MYOpFONCU',
    channel: 'Linus Tech Tips',
    category: 'assembly',
    minutes: 40,
    language: 'en',
    title: {
      pl: 'Składanie komputera krok po kroku',
      en: 'How to build a PC, step by step',
    },
    note: {
      pl: 'Najczęściej polecany materiał dla początkujących. Pokazuje cały montaż bez pomijania trudnych momentów.',
      en: 'The most widely recommended walkthrough for beginners. It shows the whole assembly without skipping the awkward parts.',
    },
  },
  {
    id: 'BL4DCEp7blY',
    channel: 'Gamers Nexus',
    category: 'cooling',
    minutes: 22,
    language: 'en',
    title: {
      pl: 'Jak nakładać pastę termoprzewodzącą — testy metod',
      en: 'Thermal paste application methods, tested',
    },
    note: {
      pl: 'Metodyczne porównanie sposobów nakładania pasty. Potwierdza, że różnice mieszczą się w granicach błędu pomiaru.',
      en: 'A methodical comparison of application patterns. It confirms the differences sit within measurement error.',
    },
  },
  {
    id: 'yAiPGNjxsvY',
    channel: 'Hardware Unboxed',
    category: 'testing',
    minutes: 18,
    language: 'en',
    title: {
      pl: 'Ile VRAM naprawdę potrzeba',
      en: 'How much VRAM do you actually need',
    },
    note: {
      pl: 'Pomiary zamiast spekulacji. Pokazuje, jak brak pamięci objawia się przycięciami, a nie spadkiem średniej.',
      en: 'Measurement rather than speculation. It shows how running short manifests as stutter, not as a lower average.',
    },
  },
  {
    id: 'sMBUiLIDCbA',
    channel: 'Gamers Nexus',
    category: 'cooling',
    minutes: 26,
    language: 'en',
    title: {
      pl: 'Przepływ powietrza w obudowie — co faktycznie działa',
      en: 'Case airflow — what actually works',
    },
    note: {
      pl: 'Testy układów wentylatorów zamiast teorii. Dobre uzupełnienie naszego poradnika o cichym komputerze.',
      en: 'Tested fan configurations rather than theory. A good companion to our guide on building quietly.',
    },
  },
  {
    id: 'YQMBDdCLLLo',
    channel: 'JayzTwoCents',
    category: 'troubleshooting',
    minutes: 15,
    language: 'en',
    title: {
      pl: 'Komputer nie startuje — diagnostyka krok po kroku',
      en: 'PC will not boot — step-by-step diagnosis',
    },
    note: {
      pl: 'Uporządkowana lista przyczyn od najczęstszych. Pokrywa się z naszym poradnikiem diagnostycznym.',
      en: 'An ordered list of causes, commonest first. It lines up with our own troubleshooting guide.',
    },
  },
  {
    id: 'Q0KMOZUJjeQ',
    channel: 'Gamers Nexus',
    category: 'testing',
    minutes: 30,
    language: 'en',
    title: {
      pl: 'Jak testujemy chłodzenia — metodyka',
      en: 'How we test coolers — the methodology',
    },
    note: {
      pl: 'Wyjaśnia, dlaczego porównuje się delta-T nad temperaturą otoczenia, a nie wartości bezwzględne.',
      en: 'Explains why coolers are compared on delta-T over ambient rather than on absolute temperatures.',
    },
  },
];

/** The thumbnail URL for a video. */
export function videoThumbnail(id: string): string {
  /* hqdefault exists for every video, where maxresdefault does not — a missing
     maxres yields a grey placeholder image rather than a 404, which is harder
     to notice and worse to look at. */
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function videoUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function videosByCategory(category: VideoCategory): Video[] {
  return videos.filter((video) => video.category === category);
}
