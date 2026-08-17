import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader } from '@/components/layout/PageHeader';
import { CompatibilityChecker } from '@/components/tools/CompatibilityChecker';
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
    title: dict.tools.compatibility.title,
    description: dict.tools.compatibility.lead,
    alternates: {
      canonical: canonicalUrl(locale, '/narzedzia/kompatybilnosc'),
      languages: Object.fromEntries(
        locales.map((code) => [
          localeTags[code],
          absoluteLocaleUrl(code, '/narzedzia/kompatybilnosc'),
        ]),
      ),
    },
  };
}

export default async function CompatibilityPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  return (
    <>
      <Breadcrumbs
        locale={typedLocale}
        items={[
          { href: '/narzedzia/kompatybilnosc', label: dict.tools.title },
          { label: dict.tools.compatibility.title },
        ]}
      />
      <PageHeader
        eyebrow={dict.tools.title}
        title={dict.tools.compatibility.title}
        lead={dict.tools.compatibility.lead}
      />

      <section className="container-page pb-14">
        <CompatibilityChecker locale={typedLocale} />
      </section>
    </>
  );
}
