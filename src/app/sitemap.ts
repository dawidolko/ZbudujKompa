import type { MetadataRoute } from 'next';
import { locales, localeTags } from '@/i18n/config';
import { allContentRoutes } from '@/lib/navigation';
import { absoluteLocaleUrl } from '@/lib/site';

/* Required under `output: 'export'` — the sitemap is generated once at build
   time rather than served by a running route handler. */
export const dynamic = 'force-static';

/**
 * Sitemap.
 *
 * Routes come from `allContentRoutes`, the same list that builds the
 * navigation, so a new page cannot appear in the menu while being missing from
 * the sitemap.
 *
 * Every entry carries `alternates.languages`, which is how hreflang is
 * expressed in a sitemap. Without it each language variant looks like an
 * unrelated page and search engines may treat one as a duplicate of the other.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = allContentRoutes();

  /* A fixed date rather than `new Date()`. Stamping the build time would mark
     every page as modified on every deploy, which trains crawlers to ignore
     the field. This is bumped when the content actually changes. */
  const lastModified = new Date('2026-08-01');

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: absoluteLocaleUrl(locale, route),
      lastModified,
      changeFrequency: 'monthly' as const,
      /* The home page outranks section indexes, which outrank leaf pages. */
      priority: route === '/' ? 1 : route.split('/').filter(Boolean).length === 1 ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, route)]),
        ),
      },
    })),
  );
}
