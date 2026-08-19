import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader, SectionHeading } from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { LinkCard } from '@/components/ui/Card';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/motion/Reveal';
import { getDictionary } from '@/i18n';
import { isLocale, localePath, locales, localeTags, type Locale } from '@/i18n/config';
import { articles, articleCategoryOrder, articleReadingTime, getTags } from '@/lib/blog';
import { absoluteLocaleUrl, canonicalUrl } from '@/lib/site';
import { formatDate, slugify, t } from '@/lib/utils';

type Params = { locale: string };

export function generateStaticParams(): Params[] {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.blog.title,
    description: dict.blog.lead,
    alternates: {
      canonical: canonicalUrl(locale, '/artykuly'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/artykuly')]),
      ),
    },
  };
}

export default async function ArticlesPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  const [featured, ...rest] = articles;
  const tags = getTags();

  return (
    <>
      <Breadcrumbs locale={typedLocale} items={[{ label: dict.blog.title }]} />
      <PageHeader
        photo="workstation"
        locale={typedLocale}
        title={dict.blog.title}
        lead={dict.blog.lead}
      />

      {/* ---- Lead article ---- */}
      {featured ? (
        <section className="container-page pb-12">
          <Reveal>
            <Link
              href={localePath(typedLocale, `/artykuly/${featured.slug}`)}
              className="hover-lift group grid overflow-hidden rounded-lg border border-border-subtle bg-surface focus-ring md:grid-cols-2"
            >
              {featured.photo ? (
                <Photo
                  slug={featured.photo}
                  locale={typedLocale}
                  ratio="16/10"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : null}
              <div className="flex flex-col justify-center p-6 md:p-8">
                <span className="flex flex-wrap items-center gap-2">
                  <Badge tone="brand">{dict.blog.category[featured.category]}</Badge>
                  <span className="text-xs text-text-muted">
                    {formatDate(featured.published, typedLocale)}
                  </span>
                </span>
                <h2 className="font-display mt-3 text-2xl leading-tight font-bold text-text-primary md:text-3xl">
                  {t(featured.title, typedLocale)}
                </h2>
                <p className="mt-3 leading-relaxed text-text-secondary">
                  {t(featured.summary, typedLocale)}
                </p>
                <p className="mt-4 text-xs text-text-muted">
                  {dict.blog.readingTime(articleReadingTime(featured, typedLocale))}
                </p>
              </div>
            </Link>
          </Reveal>
        </section>
      ) : null}

      {/* ---- Tag index ---- */}
      <section className="container-page pb-12">
        <SectionHeading title={dict.blog.topics} id="topics" />
        <ul className="flex flex-wrap gap-2">
          {tags.map((entry) => (
            <li key={entry.tag}>
              <Link
                href={localePath(typedLocale, `/artykuly/tag/${slugify(entry.tag)}`)}
                className="inline-flex items-center gap-1.5 rounded-sm border border-border-default px-3 py-1.5 text-sm text-text-secondary transition-colors hover:border-border-brand hover:text-text-primary focus-ring"
              >
                {entry.tag}
                <span className="text-xs text-text-muted">{entry.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- Everything else, grouped by category ---- */}
      {articleCategoryOrder.map((category) => {
        const inCategory = rest.filter((article) => article.category === category);
        if (inCategory.length === 0) return null;

        return (
          <section key={category} className="container-page pb-12">
            <SectionHeading title={dict.blog.category[category]} id={`category-${category}`} />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {inCategory.map((article, index) => (
                <Reveal
                  as="li"
                  key={article.slug}
                  delay={((index % 3) + 1) as 1 | 2 | 3}
                  className="flex"
                >
                  <LinkCard
                    className="w-full"
                    href={localePath(typedLocale, `/artykuly/${article.slug}`)}
                    eyebrow={
                      <>
                        <Badge tone="neutral">
                          {dict.blog.readingTime(articleReadingTime(article, typedLocale))}
                        </Badge>
                        <span className="text-xs text-text-muted">
                          {formatDate(article.published, typedLocale)}
                        </span>
                      </>
                    }
                    title={t(article.title, typedLocale)}
                    description={t(article.summary, typedLocale)}
                  />
                </Reveal>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
