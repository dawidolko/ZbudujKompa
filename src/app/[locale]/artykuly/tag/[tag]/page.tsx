import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader } from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { LinkCard } from '@/components/ui/Card';
import { getDictionary } from '@/i18n';
import { isLocale, localePath, locales, localeTags, type Locale } from '@/i18n/config';
import { articleReadingTime, getArticlesByTag, getTags } from '@/lib/blog';
import { absoluteLocaleUrl, canonicalUrl } from '@/lib/site';
import { formatDate, slugify, t } from '@/lib/utils';

/**
 * Recovers the original tag from its slug.
 *
 * Slugifying is lossy — diacritics are folded and spaces become hyphens — so
 * the way back is to slugify every known tag and find the one that matches,
 * rather than trying to reverse the transformation.
 */
function tagFromSlug(slug: string): string | undefined {
  return getTags().find(({ tag }) => slugify(tag) === slug)?.tag;
}

type Params = { locale: string; tag: string };

/**
 * One page per tag, per locale.
 *
 * Tags are slugified rather than URL-encoded. Encoding them here produced a
 * directory literally named "pami%C4%99%C4%87", because Next.js encodes the
 * segment again on top — so a browser requesting the correctly encoded URL got
 * a 404. A plain ASCII slug avoids the double encoding entirely and gives a
 * more readable URL.
 */
export function generateStaticParams(): Params[] {
  return locales.flatMap((locale) => getTags().map(({ tag }) => ({ locale, tag: slugify(tag) })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, tag } = await params;
  if (!isLocale(locale)) return {};

  const decoded = tagFromSlug(tag);
  if (!decoded) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.blog.taggedWith(decoded),
    description: dict.blog.tagLead(decoded),
    alternates: {
      canonical: canonicalUrl(locale, `/artykuly/tag/${slugify(decoded)}`),
      languages: Object.fromEntries(
        locales.map((code) => [
          localeTags[code],
          absoluteLocaleUrl(code, `/artykuly/tag/${slugify(decoded)}`),
        ]),
      ),
    },
    /* Tag pages are thin aggregations of content indexed elsewhere, so they
       are followed but not indexed themselves. */
    robots: { index: false, follow: true },
  };
}

export default async function TagPage({ params }: { params: Promise<Params> }) {
  const { locale, tag } = await params;
  if (!isLocale(locale)) notFound();

  const decoded = tagFromSlug(tag);
  if (!decoded) notFound();
  const matching = getArticlesByTag(decoded);
  if (matching.length === 0) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  return (
    <>
      <Breadcrumbs
        locale={typedLocale}
        items={[{ href: '/artykuly', label: dict.blog.title }, { label: decoded }]}
      />
      <PageHeader
        eyebrow={dict.blog.tags}
        title={dict.blog.taggedWith(decoded)}
        lead={dict.blog.tagLead(decoded)}
      />

      <section className="container-page pb-14">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {matching.map((article) => (
            <li key={article.slug} className="flex">
              <LinkCard
                className="w-full"
                href={localePath(typedLocale, `/artykuly/${article.slug}`)}
                eyebrow={
                  <>
                    <Badge tone="neutral">{dict.blog.category[article.category]}</Badge>
                    <span className="text-xs text-text-muted">
                      {formatDate(article.published, typedLocale)}
                    </span>
                  </>
                }
                title={t(article.title, typedLocale)}
                description={t(article.summary, typedLocale)}
                footer={
                  <p className="text-xs text-text-muted">
                    {dict.blog.readingTime(articleReadingTime(article, typedLocale))}
                  </p>
                }
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
