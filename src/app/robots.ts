import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * Robots directives.
 *
 * Every page on this site is reference content meant to be indexed, so there
 * is nothing to disallow. The sitemap pointer is the part that matters: it is
 * how a crawler discovers the bilingual route set and the hreflang links
 * between the two language variants.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
