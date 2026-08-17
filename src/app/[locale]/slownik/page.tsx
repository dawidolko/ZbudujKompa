import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader } from '@/components/layout/PageHeader';
import { GlossarySearch } from '@/components/glossary/GlossarySearch';
import { JsonLd } from '@/components/seo/JsonLd';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localeTags, type Locale } from '@/i18n/config';
import { glossary } from '@/lib/knowledge';
import { absoluteLocaleUrl, canonicalUrl } from '@/lib/site';
import { t } from '@/lib/utils';

type Params = { locale: string };

export function generateStaticParams(): Params[] {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.glossary.title,
    description: dict.glossary.lead,
    alternates: {
      canonical: canonicalUrl(locale, '/slownik'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/slownik')]),
      ),
    },
  };
}

export default async function GlossaryPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  return (
    <>
      <Breadcrumbs locale={typedLocale} items={[{ label: dict.glossary.title }]} />
      <PageHeader title={dict.glossary.title} lead={dict.glossary.lead} />

      <section className="container-page pb-14">
        <GlossarySearch locale={typedLocale} />
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'DefinedTermSet',
          name: dict.glossary.title,
          inLanguage: localeTags[typedLocale],
          url: absoluteLocaleUrl(typedLocale, '/slownik'),
          hasDefinedTerm: glossary.map((entry) => ({
            '@type': 'DefinedTerm',
            name: entry.term,
            description: t(entry.definition, typedLocale),
          })),
        }}
      />
    </>
  );
}
