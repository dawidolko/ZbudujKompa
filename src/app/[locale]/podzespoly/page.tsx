import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader } from '@/components/layout/PageHeader';
import { PartBrowser } from '@/components/configurator/PartBrowser';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localeTags, type Locale } from '@/i18n/config';
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

      <section className="container-page pb-16">
        <PartBrowser locale={typedLocale} />
      </section>
    </>
  );
}
