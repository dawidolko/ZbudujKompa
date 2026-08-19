import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader, SectionHeading } from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { getDictionary } from '@/i18n';
import { isLocale, localePath, locales, localeTags, type Locale } from '@/i18n/config';
import { navigation } from '@/lib/navigation';
import { guides, readingTime } from '@/lib/guides';
import { glossary, faq } from '@/lib/knowledge';
import { articles } from '@/lib/blog';
import { categoryOrder, getBrands } from '@/lib/parts';
import { videos } from '@/lib/videos';
import { absoluteLocaleUrl, canonicalUrl } from '@/lib/site';
import { slugify, t } from '@/lib/utils';

type Params = { locale: string };

export function generateStaticParams(): Params[] {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.sitemap.title,
    description: dict.sitemap.lead,
    alternates: {
      canonical: canonicalUrl(locale, '/mapa-serwisu'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/mapa-serwisu')]),
      ),
    },
  };
}

/**
 * Human-readable site map.
 *
 * Distinct from `sitemap.xml`, which exists for crawlers: this page is for a
 * reader who wants to see the whole site at once rather than discover it a
 * menu at a time. It is generated from the same navigation data as the header,
 * so it cannot fall out of step with what the menu offers.
 */
export default async function SiteMapPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  return (
    <>
      <Breadcrumbs locale={typedLocale} items={[{ label: dict.sitemap.title }]} />
      <PageHeader
        photo="workstation"
        locale={typedLocale}
        title={dict.sitemap.title}
        lead={dict.sitemap.lead}
      />

      <section className="container-page pb-14">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {navigation.map((section) => (
            <nav key={section.id} aria-labelledby={`sitemap-${section.id}`}>
              <h2
                id={`sitemap-${section.id}`}
                className="font-display mb-3 border-b border-border-subtle pb-2 text-lg font-bold text-text-primary"
              >
                <Link
                  href={localePath(typedLocale, section.href)}
                  className="rounded-xs transition-colors hover:text-text-brand focus-ring"
                >
                  {t(section.label, typedLocale)}
                </Link>
              </h2>

              <ul className="space-y-1.5">
                {section.children?.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={localePath(typedLocale, link.href)}
                      className="rounded-xs text-sm text-text-secondary transition-colors hover:text-text-brand focus-ring"
                    >
                      {t(link.label, typedLocale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Pages that sit outside the main navigation sections. */}
          <nav aria-labelledby="sitemap-info">
            <h2
              id="sitemap-info"
              className="font-display mb-3 border-b border-border-subtle pb-2 text-lg font-bold text-text-primary"
            >
              {dict.sitemap.other}
            </h2>
            <ul className="space-y-1.5">
              {[
                { href: '/', label: dict.nav.home },
                { href: '/artykuly', label: dict.blog.title },
                { href: '/filmy', label: dict.widgets.videosTitle },
                { href: '/kalkulatory', label: dict.calc.title },
                { href: '/konfigurator', label: dict.configurator.title },
                { href: '/porownanie', label: dict.comparison.title },
                { href: '/podzespoly', label: dict.parts.title },
                { href: '/o-serwisie', label: dict.about.title },
                { href: '/zrodla', label: dict.resources.title },
                { href: '/kontakt', label: dict.contact.title },
                { href: '/dostepnosc', label: dict.accessibility.title },
                { href: '/mapa-serwisu', label: dict.sitemap.title },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={localePath(typedLocale, link.href)}
                    className="rounded-xs text-sm text-text-secondary transition-colors hover:text-text-brand focus-ring"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* ---- Component categories and brands ---- */}
      <section className="container-page pb-14">
        <SectionHeading title={dict.parts.browseBy} id="parts-index" />
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-xs font-bold tracking-wide text-text-muted uppercase">
              {dict.parts.filterCategory}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {categoryOrder.map((category) => (
                <li key={category}>
                  <Link
                    href={localePath(typedLocale, `/podzespoly/${category}`)}
                    className="inline-flex rounded-sm border border-border-default px-3 py-1.5 text-sm text-text-secondary transition-colors hover:border-border-brand hover:text-text-primary focus-ring"
                  >
                    {dict.configurator.category[category]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-xs font-bold tracking-wide text-text-muted uppercase">
              {dict.parts.filterBrand}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {getBrands().map(({ brand }) => (
                <li key={brand}>
                  <Link
                    href={localePath(typedLocale, `/podzespoly/marka/${slugify(brand)}`)}
                    className="inline-flex rounded-sm border border-border-default px-3 py-1.5 text-sm text-text-secondary transition-colors hover:border-border-brand hover:text-text-primary focus-ring"
                  >
                    {brand}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---- Articles ---- */}
      <section className="container-page pb-14">
        <SectionHeading title={dict.blog.title} id="all-articles" />
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={localePath(typedLocale, `/artykuly/${article.slug}`)}
                className="flex items-start justify-between gap-3 rounded-md border border-border-subtle bg-surface px-4 py-3 transition-colors hover:border-border-brand focus-ring"
              >
                <span className="text-sm font-medium text-text-primary">
                  {t(article.title, typedLocale)}
                </span>
                <Badge tone="neutral" className="shrink-0">
                  {dict.blog.category[article.category]}
                </Badge>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- Every guide, with its length, so the depth is visible up front ---- */}
      <section className="container-page pb-14">
        <SectionHeading title={dict.guides.allGuides} id="all-guides" />
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={localePath(typedLocale, `/poradniki/${guide.slug}`)}
                className="flex items-start justify-between gap-3 rounded-md border border-border-subtle bg-surface px-4 py-3 transition-colors hover:border-border-brand focus-ring"
              >
                <span className="text-sm font-medium text-text-primary">
                  {t(guide.title, typedLocale)}
                </span>
                <Badge tone="neutral" className="shrink-0">
                  {dict.guides.readingTime(readingTime(guide, typedLocale))}
                </Badge>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- Counts, so the reader can gauge the size of each reference section ---- */}
      <section className="container-page pb-14">
        <dl className="grid gap-px overflow-hidden rounded-lg border border-border-subtle bg-border-subtle sm:grid-cols-3 lg:grid-cols-5">
          {[
            { term: dict.guides.title, value: guides.length, href: '/poradniki' },
            { term: dict.glossary.title, value: glossary.length, href: '/slownik' },
            { term: dict.faq.title, value: faq.length, href: '/faq' },
            { term: dict.blog.title, value: articles.length, href: '/artykuly' },
            { term: dict.widgets.videosTitle, value: videos.length, href: '/filmy' },
          ].map((item) => (
            <div key={item.term} className="bg-surface p-4">
              <dt className="text-xs tracking-wide text-text-muted uppercase">
                <Link
                  href={localePath(typedLocale, item.href)}
                  className="rounded-xs transition-colors hover:text-text-brand focus-ring"
                >
                  {item.term}
                </Link>
              </dt>
              <dd className="font-display mt-1 text-2xl font-extrabold text-text-primary">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
