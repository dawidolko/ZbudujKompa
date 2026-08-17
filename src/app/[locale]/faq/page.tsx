import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localeTags, type Locale } from '@/i18n/config';
import { faq } from '@/lib/knowledge';
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
    title: dict.faq.title,
    description: dict.faq.lead,
    alternates: {
      canonical: canonicalUrl(locale, '/faq'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/faq')]),
      ),
    },
  };
}

export default async function FaqPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  return (
    <>
      <Breadcrumbs locale={typedLocale} items={[{ label: dict.faq.title }]} />
      <PageHeader
        photo="memory-modules"
        locale={typedLocale}
        title={dict.faq.title}
        lead={dict.faq.lead}
      />

      <section className="container-page pb-14">
        <ul className="container-prose mx-0 space-y-3">
          {faq.map((entry) => (
            <li key={entry.id} id={entry.id} className="scroll-mt-24">
              {/* A native details/summary pair gives keyboard operation, the
                  correct expanded state and find-in-page support for free —
                  none of which a scripted accordion gets without extra work. */}
              <details className="rounded-md border border-border-subtle bg-surface">
                <summary className="cursor-pointer list-none px-4 py-4 font-semibold text-text-primary marker:content-none focus-ring">
                  {t(entry.question, typedLocale)}
                </summary>
                <div className="border-t border-border-subtle px-4 py-4 text-sm leading-relaxed text-text-secondary">
                  {t(entry.answer, typedLocale)}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          inLanguage: localeTags[typedLocale],
          url: absoluteLocaleUrl(typedLocale, '/faq'),
          mainEntity: faq.map((entry) => ({
            '@type': 'Question',
            name: t(entry.question, typedLocale),
            acceptedAnswer: {
              '@type': 'Answer',
              text: t(entry.answer, typedLocale),
            },
          })),
        }}
      />
    </>
  );
}
