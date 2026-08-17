import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Callout } from '@/components/ui/Callout';
import { LinkCard } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader, SectionHeading } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { ClockIcon, WrenchIcon } from '@/components/ui/Icon';
import { GuideChecklist } from '@/components/guides/GuideChecklist';
import { StepDiagram } from '@/components/diagrams';
import { getDictionary } from '@/i18n';
import { isLocale, localePath, locales, localeTags, type Locale } from '@/i18n/config';
import { getGuide, guides, readingTime } from '@/lib/guides';
import { getOpinionsFor } from '@/lib/knowledge';
import { absoluteLocaleUrl, canonicalUrl } from '@/lib/site';
import { formatDate, t } from '@/lib/utils';

type Params = { locale: string; slug: string };

export function generateStaticParams(): Params[] {
  return locales.flatMap((locale) => guides.map((guide) => ({ locale, slug: guide.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const guide = getGuide(slug);
  if (!guide) return {};

  const title = t(guide.title, locale);
  const description = t(guide.summary, locale);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(locale, `/poradniki/${slug}`),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, `/poradniki/${slug}`)]),
      ),
    },
    openGraph: {
      title,
      description,
      type: 'article',
      modifiedTime: guide.updated,
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const guide = getGuide(slug);
  if (!guide) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  const related = guide.related
    .map((relatedSlug) => getGuide(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const guideOpinions = getOpinionsFor(guide.slug);
  const totalMinutes = guide.steps.reduce((sum, step) => sum + (step.minutes ?? 0), 0);

  const difficultyLabel = {
    beginner: dict.builds.difficultyBeginner,
    intermediate: dict.builds.difficultyIntermediate,
    advanced: dict.builds.difficultyAdvanced,
  };

  return (
    <>
      <Breadcrumbs
        locale={typedLocale}
        items={[
          { href: '/poradniki', label: dict.guides.title },
          { label: t(guide.title, typedLocale) },
        ]}
      />

      <PageHeader
        eyebrow={dict.guides.category[guide.category]}
        title={t(guide.title, typedLocale)}
        lead={t(guide.summary, typedLocale)}
        meta={
          <>
            <Badge tone="neutral">{dict.guides.readingTime(readingTime(guide, typedLocale))}</Badge>
            <Badge tone="neutral">{difficultyLabel[guide.difficulty]}</Badge>
            {totalMinutes > 0 ? (
              <Badge tone="brand">{dict.guides.minutes(totalMinutes)}</Badge>
            ) : null}
            <span className="text-xs text-text-muted">
              {dict.guides.updated(formatDate(guide.updated, typedLocale))}
            </span>
          </>
        }
      />

      <div className="container-page grid gap-10 pb-14 lg:grid-cols-[16rem_minmax(0,1fr)]">
        {/* ---- Table of contents ----
            Sticky on wide screens, and a plain list on narrow ones where there
            is no room to keep it beside the text. */}
        <nav aria-labelledby="toc-heading" className="lg:sticky lg:top-24 lg:self-start">
          <h2
            id="toc-heading"
            className="mb-3 text-xs font-bold tracking-wide text-text-muted uppercase"
          >
            {dict.nav.onThisPage}
          </h2>
          <ol className="space-y-1 border-l border-border-subtle">
            {guide.steps.map((step, index) => (
              <li key={step.id}>
                <a
                  href={`#${step.id}`}
                  className="block rounded-xs py-1.5 pl-3 text-sm text-text-secondary transition-colors hover:text-text-brand focus-ring"
                >
                  <span className="text-text-muted">{index + 1}.</span> {t(step.title, typedLocale)}
                </a>
              </li>
            ))}
          </ol>

          <div className="mt-6">
            <GuideChecklist guide={guide} locale={typedLocale} />
          </div>
        </nav>

        {/* ---- Steps ---- */}
        <div className="min-w-0">
          <ol className="space-y-10">
            {guide.steps.map((step, index) => (
              <li key={step.id} id={step.id} className="scroll-mt-24">
                <article>
                  <p className="mb-1.5 text-xs font-bold tracking-wide text-accent-fg uppercase">
                    {dict.guides.stepOf(index + 1, guide.steps.length)}
                  </p>

                  <h2 className="font-display text-2xl leading-tight font-bold text-text-primary">
                    {t(step.title, typedLocale)}
                  </h2>

                  {step.minutes || step.tools ? (
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-text-muted">
                      {step.minutes ? (
                        <span className="inline-flex items-center gap-1.5">
                          <ClockIcon className="size-4" aria-hidden="true" />
                          {dict.guides.minutes(step.minutes)}
                        </span>
                      ) : null}
                      {step.tools ? (
                        <span className="inline-flex items-center gap-1.5">
                          <WrenchIcon className="size-4" aria-hidden="true" />
                          {dict.guides.toolsNeeded}: {t(step.tools, typedLocale).join(', ')}
                        </span>
                      ) : null}
                    </div>
                  ) : null}

                  <div className="prose-guide mt-4 max-w-[46rem]">
                    {t(step.body, typedLocale).map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="max-w-[46rem]">
                    <StepDiagram guideSlug={guide.slug} stepId={step.id} locale={typedLocale} />
                  </div>

                  {step.warning ? (
                    <div className="mt-4 max-w-[46rem]">
                      <Callout tone="warning" label={dict.guides.warning}>
                        {t(step.warning, typedLocale)}
                      </Callout>
                    </div>
                  ) : null}
                </article>
              </li>
            ))}
          </ol>

          {/* ---- Opinions ---- */}
          {guideOpinions.length > 0 ? (
            <section className="mt-14">
              <SectionHeading title={dict.opinions.title} id="opinions" />
              <ul className="grid gap-4 md:grid-cols-2">
                {guideOpinions.map((opinion) => (
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

          {/* ---- Related guides ---- */}
          {related.length > 0 ? (
            <section className="mt-14">
              <SectionHeading title={dict.guides.related} id="related" />
              <ul className="grid gap-4 sm:grid-cols-2">
                {related.map((relatedGuide) => (
                  <li key={relatedGuide.slug} className="flex">
                    <LinkCard
                      className="w-full"
                      href={localePath(typedLocale, `/poradniki/${relatedGuide.slug}`)}
                      title={t(relatedGuide.title, typedLocale)}
                      description={t(relatedGuide.summary, typedLocale)}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <p className="mt-10">
            <Link
              href={localePath(typedLocale, '/poradniki')}
              className="rounded-xs text-sm font-semibold text-text-brand underline underline-offset-2 focus-ring"
            >
              {dict.common.backTo(dict.guides.title)}
            </Link>
          </p>
        </div>
      </div>

      {/* HowTo describes an ordered procedure, which is exactly what a guide
          is, and lets search engines surface the individual steps. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: t(guide.title, typedLocale),
          description: t(guide.summary, typedLocale),
          inLanguage: localeTags[typedLocale],
          url: absoluteLocaleUrl(typedLocale, `/poradniki/${guide.slug}`),
          dateModified: guide.updated,
          ...(totalMinutes > 0 ? { totalTime: `PT${totalMinutes}M` } : {}),
          step: guide.steps.map((step, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: t(step.title, typedLocale),
            text: t(step.body, typedLocale).join(' '),
            url: `${absoluteLocaleUrl(typedLocale, `/poradniki/${guide.slug}`)}#${step.id}`,
          })),
        }}
      />
    </>
  );
}
