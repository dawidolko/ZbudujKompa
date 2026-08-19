import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader } from '@/components/layout/PageHeader';
import { Configurator } from '@/components/configurator/Configurator';
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
    title: dict.configurator.title,
    description: dict.configurator.lead,
    alternates: {
      canonical: canonicalUrl(locale, '/konfigurator'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/konfigurator')]),
      ),
    },
  };
}

export default async function ConfiguratorPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  return (
    <>
      <Breadcrumbs
        locale={typedLocale}
        items={[
          { href: '/konfigurator', label: dict.tools.title },
          { label: dict.configurator.title },
        ]}
      />
      <PageHeader
        photo="motherboard-closeup"
        locale={typedLocale}
        eyebrow={dict.tools.title}
        title={dict.configurator.title}
        lead={dict.configurator.lead}
      />

      <section className="container-page pb-16">
        <Configurator locale={typedLocale} />
      </section>
    </>
  );
}
