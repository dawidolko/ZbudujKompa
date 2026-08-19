import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader, SectionHeading } from '@/components/layout/PageHeader';
import { ComparisonTable } from '@/components/configurator/ComparisonTable';
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
    title: dict.comparison.title,
    description: dict.comparison.lead,
    alternates: {
      canonical: canonicalUrl(locale, '/porownanie'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/porownanie')]),
      ),
    },
  };
}

/**
 * Comparison page.
 *
 * One table per category, each opening on a pre-selected pair that represents a
 * decision people actually face — the two mid-range cards, air against liquid —
 * so the page is useful before the reader has chosen anything.
 */
export default async function ComparisonPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  const sections = [
    { category: 'cpu' as const, initial: ['ryzen-7-7800x3d', 'core-ultra-7-265k'] },
    { category: 'gpu' as const, initial: ['rtx-5070-ti', 'rx-9070-xt'] },
    { category: 'cooler' as const, initial: ['peerless-assassin-120', 'liquid-freezer-iii-240'] },
    { category: 'psu' as const, initial: ['pure-power-12m-750', 'focus-gx-850'] },
    { category: 'case' as const, initial: ['north', 'terra'] },
    { category: 'ram' as const, initial: ['flare-x5-32-6000', 'fury-beast-32-6000'] },
  ];

  return (
    <>
      <Breadcrumbs locale={typedLocale} items={[{ label: dict.comparison.title }]} />
      <PageHeader
        photo="cpu-in-hand"
        locale={typedLocale}
        title={dict.comparison.title}
        lead={dict.comparison.lead}
      />

      {sections.map((section) => (
        <section key={section.category} className="container-page pb-14">
          <SectionHeading
            title={dict.configurator.category[section.category]}
            id={`compare-${section.category}`}
          />
          <ComparisonTable
            category={section.category}
            locale={typedLocale}
            initial={section.initial}
          />
        </section>
      ))}
    </>
  );
}
