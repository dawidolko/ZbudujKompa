import type { Article, ArticleCategory } from './types.ts';
import { articles2026 } from './articles-2026.ts';
import { newsArticles } from './articles-news.ts';

export * from './types.ts';

/**
 * The full article list, newest first.
 *
 * Sorted once at module load rather than per page: the list is small and never
 * changes at runtime, so sorting on every render would be pure waste.
 */
export const articles: Article[] = [...articles2026, ...newsArticles].sort((a, b) =>
  b.published.localeCompare(a.published),
);

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return articles.filter((article) => article.category === category);
}

export function getArticlesByTag(tag: string): Article[] {
  return articles.filter((article) => article.tags.includes(tag));
}

/** Every tag that appears, with how many articles carry it. */
export function getTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const article of articles) {
    for (const tag of article.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** Categories that actually have articles, in reading order. */
export const articleCategoryOrder: ArticleCategory[] = [
  'news',
  'analysis',
  'buying',
  'explainer',
  'testing',
  'opinion',
];

/**
 * Reading time in minutes.
 *
 * Counts only prose blocks: a reader skims a table rather than reading it word
 * by word, so including them would overstate the time.
 */
export function articleReadingTime(article: Article, locale: 'pl' | 'en'): number {
  let words = 0;
  for (const block of article.body) {
    if (block.type === 'paragraph' || block.type === 'quote') {
      words += block.text[locale].split(/\s+/).length;
    } else if (block.type === 'list') {
      words += block.items[locale].join(' ').split(/\s+/).length;
    } else if (block.type === 'callout') {
      words += block.text[locale].split(/\s+/).length;
    }
  }
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * How stale a perishable article is.
 *
 * Returned as months so the renderer can warn the reader rather than
 * presenting a two-year-old market snapshot as current.
 */
export function monthsOld(article: Article, now: Date): number {
  const published = new Date(article.updated ?? article.published);
  const months =
    (now.getFullYear() - published.getFullYear()) * 12 + (now.getMonth() - published.getMonth());
  return Math.max(0, months);
}
