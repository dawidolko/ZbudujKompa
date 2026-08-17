import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Callout } from '@/components/ui/Callout';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader, SectionHeading } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { getDictionary } from '@/i18n';
import { isLocale, localePath, locales, localeTags, type Locale } from '@/i18n/config';
import { builds, getBuild } from '@/lib/builds';
import { getSocket } from '@/lib/sockets';
import { getOpinionsFor } from '@/lib/knowledge';
import { absoluteLocaleUrl, canonicalUrl } from '@/lib/site';
import { t } from '@/lib/utils';

type Params = { locale: string; slug: string };

export function generateStaticParams(): Params[] {
  return locales.flatMap((locale) => builds.map((build) => ({ locale, slug: build.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const build = getBuild(slug);
  if (!build) return {};

  const title = t(build.name, locale);
  const description = t(build.tagline, locale);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(locale, `/zestawy/${slug}`),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, `/zestawy/${slug}`)]),
      ),
    },
    openGraph: { title, description, type: 'article' },
  };
}

export default async function BuildPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const build = getBuild(slug);
  if (!build) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  const socket = getSocket(build.socketSlug);
  const buildOpinions = getOpinionsFor(build.slug);

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
          { href: '/zestawy', label: dict.builds.title },
          { label: t(build.name, typedLocale) },
        ]}
      />

      <PageHeader
        photo="cables-tidy"
        locale={typedLocale}
        eyebrow={build.vendor === 'amd' ? 'AMD' : 'Intel'}
        title={t(build.name, typedLocale)}
        lead={t(build.description, typedLocale)}
        meta={
          <>
            <Badge tone={build.vendor === 'amd' ? 'amd' : 'intel'}>
              {build.vendor === 'amd' ? 'AMD' : 'Intel'}
            </Badge>
            <Badge tone="neutral">{difficultyLabel[build.difficulty]}</Badge>
            {socket ? <Badge tone="brand">{socket.name}</Badge> : null}
          </>
        }
      />

      {/* ---- Summary ---- */}
      <section className="container-page pb-12">
        <dl className="grid gap-px overflow-hidden rounded-lg border border-border-subtle bg-border-subtle sm:grid-cols-3">
          <div className="bg-surface p-4">
            <dt className="text-xs tracking-wide text-text-muted uppercase">
              {dict.platform.socket}
            </dt>
            <dd className="mt-1 font-display text-2xl font-extrabold text-text-primary">
              {socket?.name ?? '—'}
            </dd>
          </div>
          <div className="bg-surface p-4">
            <dt className="text-xs tracking-wide text-text-muted uppercase">
              {dict.builds.useCase}
            </dt>
            <dd className="mt-1 text-sm font-medium text-text-secondary">
              {t(build.useCase, typedLocale)}
            </dd>
          </div>
          <div className="bg-surface p-4">
            <dt className="text-xs tracking-wide text-text-muted uppercase">
              {dict.builds.difficulty}
            </dt>
            <dd className="mt-1 text-sm font-medium text-text-secondary">
              {difficultyLabel[build.difficulty]}
            </dd>
          </div>
        </dl>

        <div className="container-prose mx-0 mt-6">
          <Callout tone="info" label={dict.builds.expectation}>
            {t(build.expectation, typedLocale)}
          </Callout>
        </div>
      </section>

      {/* ---- Parts list ---- */}
      <section className="container-page pb-12">
        <SectionHeading title={dict.builds.parts} id="parts" />

        <div className="overflow-x-auto rounded-lg border border-border-subtle">
          <table className="w-full min-w-[48rem] border-collapse text-sm">
            <caption className="sr-only">
              {dict.builds.parts} — {t(build.name, typedLocale)}
            </caption>
            <thead>
              <tr className="border-b border-border-subtle bg-bg-muted text-left">
                <th scope="col" className="px-4 py-3 font-semibold text-text-primary">
                  {dict.builds.component}
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-text-primary">
                  {dict.builds.part}
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-text-primary">
                  {dict.builds.why}
                </th>
              </tr>
            </thead>
            <tbody>
              {build.parts.map((part) => (
                <tr
                  key={`${part.kind}-${part.name}`}
                  className="border-b border-border-subtle last:border-0 even:bg-bg-subtle"
                >
                  <th
                    scope="row"
                    className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-text-muted uppercase"
                  >
                    {dict.builds.kind[part.kind]}
                  </th>
                  <td className="px-4 py-3 font-medium text-text-primary">{part.name}</td>
                  <td className="px-4 py-3 text-text-secondary">
                    {t(part.rationale, typedLocale)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---- Platform cross-link ---- */}
      {socket ? (
        <section className="container-page pb-12">
          <div className="rounded-lg border border-border-subtle bg-surface p-5">
            <h2 className="font-display text-lg font-bold text-text-primary">
              {dict.platform.socket}: {socket.name}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {t(socket.verdict, typedLocale)}
            </p>
            <Link
              href={localePath(typedLocale, `/platformy/${socket.slug}`)}
              className="mt-3 inline-flex rounded-xs text-sm font-semibold text-text-brand underline underline-offset-2 focus-ring"
            >
              {dict.common.learnMore}
            </Link>
          </div>
        </section>
      ) : null}

      {/* ---- Opinions ---- */}
      {buildOpinions.length > 0 ? (
        <section className="container-page pb-14">
          <SectionHeading title={dict.opinions.title} id="opinions" />
          <ul className="grid gap-4 md:grid-cols-2">
            {buildOpinions.map((opinion) => (
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
          '@type': 'ItemList',
          name: t(build.name, typedLocale),
          description: t(build.tagline, typedLocale),
          url: absoluteLocaleUrl(typedLocale, `/zestawy/${build.slug}`),
          numberOfItems: build.parts.length,
          itemListElement: build.parts.map((part, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: part.name,
          })),
        }}
      />
    </>
  );
}
