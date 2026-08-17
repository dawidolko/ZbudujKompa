import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader } from '@/components/layout/PageHeader';
import { PsuCalculator } from '@/components/tools/PsuCalculator';
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
    title: dict.tools.psu.title,
    description: dict.tools.psu.lead,
    alternates: {
      canonical: canonicalUrl(locale, '/narzedzia/zasilacz'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/narzedzia/zasilacz')]),
      ),
    },
  };
}

export default async function PsuPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  return (
    <>
      <Breadcrumbs
        locale={typedLocale}
        items={[
          { href: '/narzedzia/zasilacz', label: dict.tools.title },
          { label: dict.tools.psu.title },
        ]}
      />
      <PageHeader
        photo="cables-tidy"
        locale={typedLocale}
        eyebrow={dict.tools.title}
        title={dict.tools.psu.title}
        lead={dict.tools.psu.lead}
      />

      <section className="container-page pb-14">
        <PsuCalculator locale={typedLocale} />
      </section>
    </>
  );
}
