import type { Localized } from '../types.ts';

/**
 * Editorial content: articles and news.
 *
 * Kept separate from the guides because they age differently. A guide on
 * seating memory is true indefinitely; an article about this year's platform
 * pricing is stale within months. Modelling them as one type would mean either
 * treating evergreen content as perishable or the reverse.
 */

export type ArticleCategory = 'news' | 'analysis' | 'buying' | 'testing' | 'opinion' | 'explainer';

/** One block of article content. Articles are structured, not raw HTML. */
export type ArticleBlock =
  | { type: 'paragraph'; text: Localized }
  | { type: 'heading'; text: Localized; id: string }
  | { type: 'list'; items: Localized<string[]>; ordered?: boolean }
  | { type: 'quote'; text: Localized; attribution?: string; source?: string }
  | { type: 'callout'; tone: 'info' | 'warning' | 'success'; label: Localized; text: Localized }
  | { type: 'table'; caption: Localized; headers: Localized<string[]>; rows: Localized<string[]>[] }
  | { type: 'photo'; slug: string; caption?: Localized }
  | { type: 'keyFigure'; value: string; label: Localized; note?: Localized };

export type Article = {
  slug: string;
  category: ArticleCategory;
  title: Localized;
  /** One-sentence summary, used in listings and metadata. */
  summary: Localized;
  /** ISO date of publication. */
  published: string;
  /** ISO date of the last substantive revision, when there has been one. */
  updated?: string;
  /** Marks a piece as time-sensitive, so the reader is told it may have aged. */
  perishable?: boolean;
  author: string;
  body: ArticleBlock[];
  /** Slugs of related articles and guides. */
  related?: string[];
  /** Free-text tags for the topic index. */
  tags: string[];
  /** Hero photograph slug. */
  photo?: string;
};
