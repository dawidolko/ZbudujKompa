import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

import Link from 'next/link';
import { PartBrowser } from '@/components/configurator/PartBrowser';
import { PageHeader, SectionHeading } from '@/components/layout/PageHeader';
import { categoryOrder, getBrands } from '@/lib/parts';
import { slugify } from '@/lib/utils';
import { getDictionary } from '@/i18n';
import { isLocale, localePath, locales, localeTags, type Locale } from '@/i18n/config';
import { absoluteLocaleUrl, canonicalUrl } from '@/lib/site';

type Params = { locale: string };

export function generateStaticParams(): Params[] {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.parts.title,
    description: dict.parts.lead,
    alternates: {
      canonical: canonicalUrl(locale, '/podzespoly'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/podzespoly')]),
      ),
    },
  };
}

export default async function PartsPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  return (
    <>
      <Breadcrumbs locale={typedLocale} items={[{ label: dict.parts.title }]} />
      <PageHeader
        photo="gpu-card"
        locale={typedLocale}
        title={dict.parts.title}
        lead={dict.parts.lead}
      />

      {/* Direct routes into the catalogue, for readers who already know what
          they are after and do not need the filters. */}
      <section className="container-page pb-10">
        <SectionHeading title={dict.parts.browseBy} id="browse" />
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
              {getBrands().map(({ brand, count }) => (
                <li key={brand}>
                  <Link
                    href={localePath(typedLocale, `/podzespoly/marka/${slugify(brand)}`)}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-border-default px-3 py-1.5 text-sm text-text-secondary transition-colors hover:border-border-brand hover:text-text-primary focus-ring"
                  >
                    {brand}
                    <span className="text-xs text-text-muted">{count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-page pb-16">
        <PartBrowser locale={typedLocale} />
      </section>
    </>
  );
}
