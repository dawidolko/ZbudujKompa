import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Callout } from '@/components/ui/Callout';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader, SectionHeading } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { CheckIcon, AlertIcon } from '@/components/ui/Icon';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localeTags, type Locale } from '@/i18n/config';
import { coolingProfiles, getCoolingProfile } from '@/lib/cooling';
import { getOpinionsFor } from '@/lib/knowledge';
import { absoluteLocaleUrl, canonicalUrl } from '@/lib/site';
import { formatPrice, t } from '@/lib/utils';

type Params = { locale: string; slug: string };

export function generateStaticParams(): Params[] {
  return locales.flatMap((locale) =>
    coolingProfiles.map((profile) => ({ locale, slug: profile.slug })),
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const profile = getCoolingProfile(slug);
  if (!profile) return {};

  const title = t(profile.name, locale);
  const description = t(profile.tagline, locale);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(locale, `/chlodzenie/${slug}`),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, `/chlodzenie/${slug}`)]),
      ),
    },
    openGraph: { title, description, type: 'article' },
  };
}

export default async function CoolingDetailPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const profile = getCoolingProfile(slug);
  if (!profile) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);
  const profileOpinions = getOpinionsFor(profile.slug);

  const typeLabel = {
    air: dict.cooling.typeAir,
    aio: dict.cooling.typeAio,
    'custom-loop': dict.cooling.typeCustom,
  };

  return (
    <>
      <Breadcrumbs
        locale={typedLocale}
        items={[
          { href: '/chlodzenie', label: dict.cooling.title },
          { label: t(profile.name, typedLocale) },
        ]}
      />

      <PageHeader
        photo="cooling-fans"
        locale={typedLocale}
        eyebrow={typeLabel[profile.type]}
        title={t(profile.name, typedLocale)}
        lead={t(profile.tagline, typedLocale)}
        meta={<Badge tone="brand">{typeLabel[profile.type]}</Badge>}
      />

      {/* ---- Key figures ---- */}
      <section className="container-page pb-12">
        <dl className="grid gap-px overflow-hidden rounded-lg border border-border-subtle bg-border-subtle sm:grid-cols-3">
          <div className="bg-surface p-4">
            <dt className="text-xs tracking-wide text-text-muted uppercase">
              {dict.cooling.wattage}
            </dt>
            <dd className="mt-1 font-display text-xl font-bold text-text-primary">
              {profile.wattage.min}–{profile.wattage.max} W
            </dd>
          </div>
          <div className="bg-surface p-4">
            <dt className="text-xs tracking-wide text-text-muted uppercase">
              {dict.cooling.noise}
            </dt>
            <dd className="mt-1 font-display text-xl font-bold text-text-primary">
              {profile.noise.min}–{profile.noise.max} dBA
            </dd>
          </div>
          <div className="bg-surface p-4">
            <dt className="text-xs tracking-wide text-text-muted uppercase">
              {dict.cooling.price}
            </dt>
            <dd className="mt-1 font-display text-xl font-bold text-text-primary">
              {formatPrice(profile.price.min * 100, typedLocale)} –{' '}
              {formatPrice(profile.price.max * 100, typedLocale)}
            </dd>
          </div>
        </dl>
      </section>

      {/* ---- Description ---- */}
      <section className="container-page pb-12">
        <div className="container-prose mx-0 prose-guide">
          {t(profile.description, typedLocale)
            .split('\n\n')
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>
      </section>

      {/* ---- Pros and cons ---- */}
      <section className="container-page pb-12">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border-subtle bg-surface p-5">
            <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-text-primary">
              <CheckIcon className="size-5 text-success" aria-hidden="true" />
              {dict.cooling.pros}
            </h2>
            <ul className="space-y-2">
              {t(profile.pros, typedLocale).map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-relaxed text-text-secondary">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border-subtle bg-surface p-5">
            <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-text-primary">
              <AlertIcon className="size-5 text-warning" aria-hidden="true" />
              {dict.cooling.cons}
            </h2>
            <ul className="space-y-2">
              {t(profile.cons, typedLocale).map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-relaxed text-text-secondary">
                  <AlertIcon className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container-prose mx-0 mt-6">
          <Callout tone="info" label={dict.cooling.bestFor}>
            {t(profile.bestFor, typedLocale)}
          </Callout>
        </div>
      </section>

      {/* ---- Opinions ---- */}
      {profileOpinions.length > 0 ? (
        <section className="container-page pb-14">
          <SectionHeading title={dict.opinions.title} id="opinions" />
          <ul className="grid gap-4 md:grid-cols-2">
            {profileOpinions.map((opinion) => (
              <li key={opinion.id}>
                <figure className="h-full rounded-lg border border-border-subtle bg-surface p-5">
                  <blockquote className="text-sm leading-relaxed text-text-secondary">
                    <p>„{t(opinion.quote, typedLocale)}”</p>
                  </blockquote>
                  <figcaption className="mt-4 border-t border-border-subtle pt-3 text-xs text-text-muted">
                    <span className="font-semibold text-text-secondary">{opinion.author}</span>
                    {' · '}
                    <a
                      href={opinion.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="rounded-xs underline underline-offset-2 hover:text-text-brand focus-ring"
                    >
                      {opinion.source}
                    </a>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: t(profile.name, typedLocale),
          description: t(profile.tagline, typedLocale),
          inLanguage: localeTags[typedLocale],
          url: absoluteLocaleUrl(typedLocale, `/chlodzenie/${profile.slug}`),
        }}
      />
    </>
  );
}
