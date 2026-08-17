import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Callout } from '@/components/ui/Callout';
import { LinkCard } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader, SectionHeading } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { getDictionary } from '@/i18n';
import { isLocale, localePath, locales, localeTags, type Locale } from '@/i18n/config';
import { getSocket, sockets } from '@/lib/sockets';
import { builds } from '@/lib/builds';
import { getOpinionsFor } from '@/lib/knowledge';
import { absoluteLocaleUrl, canonicalUrl } from '@/lib/site';
import { t } from '@/lib/utils';

type Params = { locale: string; slug: string };

/** One page per socket per locale — the full matrix is generated at build. */
export function generateStaticParams(): Params[] {
  return locales.flatMap((locale) => sockets.map((socket) => ({ locale, slug: socket.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const socket = getSocket(slug);
  if (!socket) return {};

  const title = `${socket.name} — ${socket.vendor === 'amd' ? 'AMD' : 'Intel'}`;
  const description = t(socket.tagline, locale);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(locale, `/platformy/${slug}`),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, `/platformy/${slug}`)]),
      ),
    },
    openGraph: { title, description, type: 'article' },
  };
}

export default async function SocketPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const socket = getSocket(slug);
  if (!socket) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  const relatedBuilds = builds.filter((build) => build.socketSlug === socket.slug);
  const socketOpinions = getOpinionsFor(socket.slug);

  const overclockingLabel = {
    full: dict.platform.ocFull,
    memory: dict.platform.ocMemory,
    none: dict.platform.ocNone,
  };

  const tierLabel = {
    flagship: dict.platform.tierFlagship,
    mainstream: dict.platform.tierMainstream,
    budget: dict.platform.tierBudget,
  };

  return (
    <>
      <Breadcrumbs
        locale={typedLocale}
        items={[{ href: '/platformy', label: dict.platform.title }, { label: socket.name }]}
      />

      <PageHeader
        eyebrow={socket.vendor === 'amd' ? 'AMD' : 'Intel'}
        title={socket.name}
        lead={t(socket.tagline, typedLocale)}
        meta={
          <>
            <Badge tone={socket.vendor === 'amd' ? 'amd' : 'intel'}>
              {socket.vendor === 'amd' ? 'AMD' : 'Intel'}
            </Badge>
            <Badge
              tone={
                socket.status === 'current'
                  ? 'success'
                  : socket.status === 'mature'
                    ? 'neutral'
                    : 'warning'
              }
            >
              {socket.status === 'current'
                ? dict.platform.statusCurrent
                : socket.status === 'mature'
                  ? dict.platform.statusMature
                  : dict.platform.statusLegacy}
            </Badge>
          </>
        }
      />

      {/* ---- Specification ---- */}
      <section className="container-page pb-12">
        <dl className="grid gap-px overflow-hidden rounded-lg border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-3">
          {[
            { term: dict.platform.launched, value: String(socket.launched) },
            {
              term: dict.platform.supportedUntil,
              value: socket.supportedUntil ? String(socket.supportedUntil) : '—',
            },
            {
              term: dict.platform.memory,
              value: socket.memory.map((m) => m.toUpperCase()).join(' / '),
            },
            { term: dict.platform.pcie, value: socket.pcie },
            { term: dict.platform.coolerMount, value: socket.coolerMount },
            { term: dict.platform.chipsets, value: String(socket.chipsets.length) },
          ].map((item) => (
            <div key={item.term} className="bg-surface p-4">
              <dt className="text-xs tracking-wide text-text-muted uppercase">{item.term}</dt>
              <dd className="mt-1 font-display text-lg font-bold text-text-primary">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---- Description ---- */}
      <section className="container-page pb-12">
        <div className="container-prose mx-0 prose-guide">
          {t(socket.description, typedLocale)
            .split('\n\n')
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>

        <div className="container-prose mx-0 mt-6">
          <Callout tone="info" label={dict.platform.verdict}>
            {t(socket.verdict, typedLocale)}
          </Callout>
        </div>
      </section>

      {/* ---- Chipsets ---- */}
      <section className="container-page pb-14">
        <SectionHeading title={dict.platform.chipsets} id="chipsets" />

        {/* The table scrolls inside its own container so the page body never
            scrolls sideways on a narrow screen. */}
        <div className="overflow-x-auto rounded-lg border border-border-subtle">
          <table className="w-full min-w-[40rem] border-collapse text-sm">
            <caption className="sr-only">
              {dict.platform.chipsets} — {socket.name}
            </caption>
            <thead>
              <tr className="border-b border-border-subtle bg-bg-muted text-left">
                <th scope="col" className="px-4 py-3 font-semibold text-text-primary">
                  {dict.platform.chipset}
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-text-primary">
                  {dict.platform.tier}
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-text-primary">
                  {dict.platform.overclocking}
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-text-primary">
                  {dict.common.readMore}
                </th>
              </tr>
            </thead>
            <tbody>
              {socket.chipsets.map((chipset) => (
                <tr
                  key={chipset.name}
                  className="border-b border-border-subtle last:border-0 even:bg-bg-subtle"
                >
                  <th scope="row" className="px-4 py-3 text-left font-bold text-text-primary">
                    {chipset.name}
                  </th>
                  <td className="px-4 py-3">
                    <Badge tone={chipset.tier === 'flagship' ? 'brand' : 'neutral'}>
                      {tierLabel[chipset.tier]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {overclockingLabel[chipset.overclocking]}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{t(chipset.note, typedLocale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---- Related builds ---- */}
      {relatedBuilds.length > 0 ? (
        <section className="container-page pb-14">
          <SectionHeading title={dict.platform.relatedBuilds} id="related-builds" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedBuilds.map((build) => (
              <li key={build.slug} className="flex">
                <LinkCard
                  className="w-full"
                  href={localePath(typedLocale, `/zestawy/${build.slug}`)}
                  title={t(build.name, typedLocale)}
                  description={t(build.tagline, typedLocale)}
                  footer={
                    <p className="text-xs text-text-muted">{t(build.useCase, typedLocale)}</p>
                  }
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* ---- Opinions ---- */}
      {socketOpinions.length > 0 ? (
        <section className="container-page pb-14">
          <SectionHeading title={dict.opinions.title} id="opinions" />
          <ul className="grid gap-4 md:grid-cols-2">
            {socketOpinions.map((opinion) => (
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
          headline: `${socket.name} — ${socket.vendor === 'amd' ? 'AMD' : 'Intel'}`,
          description: t(socket.tagline, typedLocale),
          inLanguage: localeTags[typedLocale],
          url: absoluteLocaleUrl(typedLocale, `/platformy/${socket.slug}`),
        }}
      />
    </>
  );
}
