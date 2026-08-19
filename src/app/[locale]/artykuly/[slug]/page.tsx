import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader, SectionHeading } from '@/components/layout/PageHeader';
import { ArticleBody } from '@/components/blog/ArticleBody';
import { Badge } from '@/components/ui/Badge';
import { Callout } from '@/components/ui/Callout';
import { LinkCard } from '@/components/ui/Card';
import { JsonLd } from '@/components/seo/JsonLd';
import { getDictionary } from '@/i18n';
import { isLocale, localePath, locales, localeTags, type Locale } from '@/i18n/config';
import { articleReadingTime, articles, getArticle, monthsOld } from '@/lib/blog';
import { getGuide } from '@/lib/guides';
import { absoluteLocaleUrl, canonicalUrl, site } from '@/lib/site';
import { formatDate, slugify, t } from '@/lib/utils';

type Params = { locale: string; slug: string };

export function generateStaticParams(): Params[] {
  return locales.flatMap((locale) => articles.map((article) => ({ locale, slug: article.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const article = getArticle(slug);
  if (!article) return {};

  const title = t(article.title, locale);
  const description = t(article.summary, locale);

  return {
    title,
    description,
    keywords: article.tags,
    alternates: {
      canonical: canonicalUrl(locale, `/artykuly/${slug}`),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, `/artykuly/${slug}`)]),
      ),
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: article.published,
      modifiedTime: article.updated,
      authors: [article.author],
    },
  };
}

/** Anything older than this is flagged to the reader as possibly stale. */
const STALE_AFTER_MONTHS = 12;

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const article = getArticle(slug);
  if (!article) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  /* A fixed date rather than `new Date()`: the age is computed at build time,
     and using the current clock would make every build produce different HTML
     for the same content. */
  const age = monthsOld(article, new Date('2026-08-19'));
  const stale = article.perishable && age >= STALE_AFTER_MONTHS;

  /* Related entries may be articles or guides, so both are resolved. */
  const related = (article.related ?? [])
    .map((relatedSlug) => {
      const relatedArticle = getArticle(relatedSlug);
      if (relatedArticle) {
        return {
          href: `/artykuly/${relatedArticle.slug}`,
          title: t(relatedArticle.title, typedLocale),
          summary: t(relatedArticle.summary, typedLocale),
        };
      }
      const guide = getGuide(relatedSlug);
      if (guide) {
        return {
          href: `/poradniki/${guide.slug}`,
          title: t(guide.title, typedLocale),
          summary: t(guide.summary, typedLocale),
        };
      }
      return null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  /* Headings become an on-page table of contents, collected from the typed
     blocks rather than by parsing rendered markup. */
  const headings = article.body.filter((block) => block.type === 'heading');

  return (
    <>
      <Breadcrumbs
        locale={typedLocale}
        items={[
          { href: '/artykuly', label: dict.blog.title },
          { label: t(article.title, typedLocale) },
        ]}
      />

      <PageHeader
        photo={article.photo}
        locale={typedLocale}
        eyebrow={dict.blog.category[article.category]}
        title={t(article.title, typedLocale)}
        lead={t(article.summary, typedLocale)}
        meta={
          <>
            <Badge tone="neutral">
              {dict.blog.readingTime(articleReadingTime(article, typedLocale))}
            </Badge>
            <span className="text-xs text-text-muted">
              {dict.blog.publishedOn(formatDate(article.published, typedLocale))}
            </span>
            {article.updated ? (
              <span className="text-xs text-text-muted">
                {dict.blog.updatedOn(formatDate(article.updated, typedLocale))}
              </span>
            ) : null}
            <span className="text-xs text-text-muted">{article.author}</span>
          </>
        }
      />

      <div className="container-page grid gap-10 pb-14 lg:grid-cols-[16rem_minmax(0,1fr)]">
        {/* ---- Table of contents and tags ---- */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          {headings.length > 1 ? (
            <nav aria-labelledby="article-toc" className="mb-8">
              <h2
                id="article-toc"
                className="mb-3 text-xs font-bold tracking-wide text-text-muted uppercase"
              >
                {dict.nav.onThisPage}
              </h2>
              <ol className="space-y-1 border-l border-border-subtle">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className="block rounded-xs py-1.5 pl-3 text-sm text-text-secondary transition-colors hover:text-text-brand focus-ring"
                    >
                      {t(heading.text, typedLocale)}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <div>
            <h2 className="mb-2 text-xs font-bold tracking-wide text-text-muted uppercase">
              {dict.blog.tags}
            </h2>
            <ul className="flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={localePath(typedLocale, `/artykuly/tag/${slugify(tag)}`)}
                    className="inline-flex rounded-xs border border-border-default px-2 py-1 text-xs text-text-secondary transition-colors hover:border-border-brand hover:text-text-primary focus-ring"
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* ---- The article ---- */}
        <div className="min-w-0">
          {stale ? (
            <div className="mb-6 max-w-[46rem]">
              <Callout tone="warning" label={dict.blog.staleLabel}>
                {dict.blog.staleNote(age)}
              </Callout>
            </div>
          ) : null}

          <ArticleBody blocks={article.body} locale={typedLocale} />

          {related.length > 0 ? (
            <section className="mt-14">
              <SectionHeading title={dict.blog.related} id="related" />
              <ul className="grid gap-4 sm:grid-cols-2">
                {related.map((entry) => (
                  <li key={entry.href} className="flex">
                    <LinkCard
                      className="w-full"
                      href={localePath(typedLocale, entry.href)}
                      title={entry.title}
                      description={entry.summary}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <p className="mt-10">
            <Link
              href={localePath(typedLocale, '/artykuly')}
              className="rounded-xs text-sm font-semibold text-text-brand underline underline-offset-2 focus-ring"
            >
              {dict.common.backTo(dict.blog.title)}
            </Link>
          </p>
        </div>
      </div>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: t(article.title, typedLocale),
          description: t(article.summary, typedLocale),
          inLanguage: localeTags[typedLocale],
          url: absoluteLocaleUrl(typedLocale, `/artykuly/${article.slug}`),
          datePublished: article.published,
          ...(article.updated ? { dateModified: article.updated } : {}),
          keywords: article.tags.join(', '),
          author: { '@type': 'Person', name: article.author, url: site.authorUrl },
          publisher: { '@type': 'Person', name: site.author, url: site.authorUrl },
        }}
      />
    </>
  );
}
