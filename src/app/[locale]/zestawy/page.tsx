import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { LinkCard } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader } from '@/components/layout/PageHeader';
import { getDictionary } from '@/i18n';
import { isLocale, localePath, locales, localeTags, type Locale } from '@/i18n/config';
import { builds, buildTotal } from '@/lib/builds';
import { absoluteLocaleUrl, canonicalUrl } from '@/lib/site';
import { formatPrice, t } from '@/lib/utils';

type Params = { locale: string };

export function generateStaticParams(): Params[] {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.builds.title,
    description: dict.builds.lead,
    alternates: {
      canonical: canonicalUrl(locale, '/zestawy'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/zestawy')]),
      ),
    },
  };
}

export default async function BuildsPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  const difficultyLabel = {
    beginner: dict.builds.difficultyBeginner,
    intermediate: dict.builds.difficultyIntermediate,
    advanced: dict.builds.difficultyAdvanced,
  };

  return (
    <>
      <Breadcrumbs locale={typedLocale} items={[{ label: dict.builds.title }]} />
      <PageHeader title={dict.builds.title} lead={dict.builds.lead} />

      <section className="container-page pb-14">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {builds.map((build) => (
            <li key={build.slug} className="flex">
              <LinkCard
                className="w-full"
                href={localePath(typedLocale, `/zestawy/${build.slug}`)}
                eyebrow={
                  <>
                    <Badge tone={build.vendor === 'amd' ? 'amd' : 'intel'}>
                      {build.vendor === 'amd' ? 'AMD' : 'Intel'}
                    </Badge>
                    <Badge tone="neutral">{difficultyLabel[build.difficulty]}</Badge>
                  </>
                }
                title={t(build.name, typedLocale)}
                description={t(build.tagline, typedLocale)}
                footer={
                  <>
                    <p className="font-display text-xl font-bold text-text-primary">
                      {formatPrice(buildTotal(build), typedLocale)}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">{t(build.useCase, typedLocale)}</p>
                  </>
                }
              />
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-text-muted">
          {dict.builds.priceNote}
        </p>
      </section>
    </>
  );
}
