import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { LinkCard } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader, SectionHeading } from '@/components/layout/PageHeader';
import { getDictionary } from '@/i18n';
import { isLocale, localePath, locales, localeTags, type Locale } from '@/i18n/config';
import { guides, readingTime } from '@/lib/guides';
import type { GuideCategory } from '@/lib/types';
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
    title: dict.guides.title,
    description: dict.guides.lead,
    alternates: {
      canonical: canonicalUrl(locale, '/poradniki'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/poradniki')]),
      ),
    },
  };
}

export default async function GuidesPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  /* Group by category, keeping only the categories that actually have guides
     so the page never renders an empty heading. */
  const categories = Array.from(new Set(guides.map((guide) => guide.category))) as GuideCategory[];

  return (
    <>
      <Breadcrumbs locale={typedLocale} items={[{ label: dict.guides.title }]} />
      <PageHeader title={dict.guides.title} lead={dict.guides.lead} />

      {categories.map((category) => {
        const categoryGuides = guides.filter((guide) => guide.category === category);

        return (
          <section key={category} className="container-page pb-12">
            <SectionHeading title={dict.guides.category[category]} id={`category-${category}`} />

            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoryGuides.map((guide) => (
                <li key={guide.slug} className="flex">
                  <LinkCard
                    className="w-full"
                    href={localePath(typedLocale, `/poradniki/${guide.slug}`)}
                    eyebrow={
                      <Badge tone="neutral">
                        {dict.guides.readingTime(readingTime(guide, typedLocale))}
                      </Badge>
                    }
                    title={t(guide.title, typedLocale)}
                    description={t(guide.summary, typedLocale)}
                    footer={
                      <p className="text-xs text-text-muted">
                        {guide.steps.length} {dict.guides.steps.toLowerCase()}
                      </p>
                    }
                  />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
