import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HeroBoard, type Net } from '@/components/diagrams/HeroBoard';
import { Chapter } from '@/components/layout/Chapter';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LinkCard } from '@/components/ui/Card';
import { JsonLd } from '@/components/seo/JsonLd';
import { ChevronDownIcon, StarIcon } from '@/components/ui/Icon';
import { Photo, PhotoFigure } from '@/components/ui/Photo';
import { QuickPicker } from '@/components/tools/QuickPicker';
import { Carousel } from '@/components/widgets/Carousel';
import { VideoCard } from '@/components/widgets/VideoCard';
import { videosForLocale } from '@/lib/videos';
import { StatBand } from '@/components/widgets/StatBand';
import { articleReadingTime, articles } from '@/lib/blog';
import { allParts } from '@/lib/parts';
import { formatDate } from '@/lib/utils';
import { getDictionary } from '@/i18n';
import { isLocale, localePath, locales, type Locale } from '@/i18n/config';
import { sockets } from '@/lib/sockets';
import { coolingProfiles } from '@/lib/cooling';
import { builds } from '@/lib/builds';
import { guides } from '@/lib/guides';
import { faq, opinions } from '@/lib/knowledge';
import { t } from '@/lib/utils';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/* Where each net on the board leads, in the order the fingers sit on its edge. */
const netHrefs: Record<Net, string> = {
  cooling: '/chlodzenie',
  cpu: '/platformy',
  storage: '/podzespoly/storage',
  gpu: '/podzespoly/gpu',
  memory: '/podzespoly/ram',
  case: '/podzespoly/case',
  psu: '/narzedzia/zasilacz',
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  const featuredGuides = guides.slice(0, 4);
  const featuredOpinions = opinions.slice(0, 3);

  const fingers: { net: Net; ref: string; label: string }[] = [
    { net: 'cooling', ref: 'VRM1', label: dict.cooling.title },
    { net: 'cpu', ref: 'U1', label: dict.home.heroSecondary },
    { net: 'storage', ref: 'M2_1', label: dict.configurator.category.storage },
    { net: 'gpu', ref: 'PCIE1', label: dict.configurator.category.gpu },
    { net: 'memory', ref: 'DIMM', label: dict.configurator.category.ram },
    { net: 'case', ref: 'JFP1', label: dict.configurator.category.case },
    { net: 'psu', ref: 'J1', label: dict.configurator.category.psu },
  ];

  /* A shared axis, so the classes can be compared at a glance. */
  const coolingScale = Math.max(...coolingProfiles.map((profile) => profile.wattage.max));

  return (
    <>
      {/* ---- The board ----
           The page opens on a drawing of the thing being built. Its edge
           connector is the way into the site: every finger is a link, and a
           trace runs from it to the part it is about. */}
      <section className="mask hero-board">
        <div className="container-page">
          <div className="hero-stage">
            <div className="hero-copy">
              <h1 className="hero-title">{dict.home.heroTitle}</h1>
              <p className="mt-4 max-w-xl text-text-secondary lg:text-lg">{dict.home.heroLead}</p>

              <div className="mt-6">
                <ButtonLink
                  href={localePath(typedLocale, '/poradniki/assembly-step-by-step')}
                  size="lg"
                  className="max-w-full whitespace-normal"
                >
                  {dict.home.heroPrimary}
                </ButtonLink>
              </div>

              <p className="spec-label mt-6">{dict.home.heroEyebrow}</p>
              <dl className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1">
                {[
                  { value: sockets.length, label: dict.home.statsSockets },
                  { value: guides.length, label: dict.home.statsGuides },
                  { value: builds.length, label: dict.home.statsBuilds },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-baseline gap-1.5">
                    <dd className="font-mono text-sm font-semibold text-accent-fg">{stat.value}</dd>
                    <dt className="text-sm text-text-secondary">{stat.label}</dt>
                  </div>
                ))}
              </dl>
            </div>

            <div className="hero-crop">
              <HeroBoard locale={typedLocale} hrefs={netHrefs} />
            </div>
          </div>

          <ul className="fingers">
            {fingers.map((finger) => (
              <li key={finger.net}>
                <Link
                  href={localePath(typedLocale, netHrefs[finger.net])}
                  prefetch={false}
                  data-net={finger.net}
                  className="finger focus-ring-inset"
                >
                  <span className="spec-label">{finger.ref}</span>
                  {finger.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Where to start ----
           First, because an undecided reader is the one most likely to bounce,
           and three questions is a lower barrier than a configurator. */}
      <Chapter
        id="start"
        number={1}
        title={dict.quickPicker.title}
        lead={dict.quickPicker.lead}
        className="[&_.chapter]:border-t-0"
      >
        <QuickPicker locale={typedLocale} />
      </Chapter>

      {/* ---- Platforms ---- */}
      <Chapter
        id="platforms"
        number={2}
        title={dict.home.platformsTitle}
        lead={dict.home.platformsLead}
        action={
          <ButtonLink href={localePath(typedLocale, '/platformy')} variant="secondary" size="sm">
            {dict.common.viewAll}
          </ButtonLink>
        }
        aside={
          <div className="plate" aria-hidden="true">
            <Photo
              slug="cpu-in-hand"
              locale={typedLocale}
              ratio="16/10"
              sizes="19rem"
              className="bg-transparent"
            />
          </div>
        }
      >
        <ul className="bom-list">
          {sockets.map((socket) => (
            <li key={socket.slug} className="bom-row">
              <div className="grid gap-x-6 gap-y-1.5 py-4 pl-3 md:grid-cols-[9rem_minmax(0,1fr)_auto] md:items-baseline">
                <h3 className="font-display text-lg font-semibold text-text-primary">
                  <Link
                    href={localePath(typedLocale, `/platformy/${socket.slug}`)}
                    className="after:absolute after:inset-0 after:content-[''] focus:outline-none"
                  >
                    {socket.name}
                  </Link>
                </h3>
                <p className="text-sm text-text-secondary">{t(socket.tagline, typedLocale)}</p>
                <div className="flex flex-wrap items-center gap-2 md:justify-end">
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
                </div>
                <dl className="spec-label flex flex-wrap gap-x-4 md:col-start-2">
                  <div className="flex gap-1">
                    <dt>{dict.platform.memory}:</dt>
                    <dd className="text-text-secondary">
                      {socket.memory.map((m) => m.toUpperCase()).join(' / ')}
                    </dd>
                  </div>
                  <div className="flex gap-1">
                    <dt className="sr-only">PCIe:</dt>
                    <dd className="text-text-secondary">{socket.pcie}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </Chapter>

      {/* ---- Cooling ----
           A range plot rather than a set of cards: what separates the classes
           is how much heat each handles, so that is what the layout shows. */}
      <Chapter
        id="cooling"
        number={3}
        title={dict.home.coolingTitle}
        lead={dict.home.coolingLead}
        action={
          <ButtonLink href={localePath(typedLocale, '/chlodzenie')} variant="secondary" size="sm">
            {dict.common.viewAll}
          </ButtonLink>
        }
        aside={
          <div className="plate" aria-hidden="true">
            <Photo
              slug="cooling-fans"
              locale={typedLocale}
              ratio="16/10"
              sizes="19rem"
              className="bg-transparent"
            />
          </div>
        }
      >
        <ul className="bom-list">
          {coolingProfiles.map((profile) => (
            <li key={profile.slug} className="bom-row">
              <div className="py-3.5 pl-3">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="h-sans text-text-primary">
                    <Link
                      href={localePath(typedLocale, `/chlodzenie/${profile.slug}`)}
                      className="after:absolute after:inset-0 after:content-[''] focus:outline-none"
                    >
                      {t(profile.name, typedLocale)}
                    </Link>
                  </h3>
                  <dl className="spec-label flex gap-4">
                    <div className="flex gap-1">
                      <dt className="sr-only">{dict.cooling.wattage}:</dt>
                      <dd className="text-text-secondary">
                        {profile.wattage.min}–{profile.wattage.max} W
                      </dd>
                    </div>
                    <div className="flex gap-1">
                      <dt className="sr-only">{dict.cooling.noise}:</dt>
                      <dd className="text-text-secondary">
                        {profile.noise.min}–{profile.noise.max} dBA
                      </dd>
                    </div>
                  </dl>
                </div>
                <p className="mt-0.5 text-sm text-text-secondary">
                  {t(profile.tagline, typedLocale)}
                </p>
                {/* The figures above carry the values, so the bar is decoration. */}
                <div className="relative mt-2 h-1.5 bg-bg-muted" aria-hidden="true">
                  <div
                    className="absolute inset-y-0 bg-accent-fg"
                    style={{
                      left: `${(profile.wattage.min / coolingScale) * 100}%`,
                      right: `${100 - (profile.wattage.max / coolingScale) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Chapter>

      {/* ---- Builds ---- */}
      <Chapter
        id="builds"
        number={4}
        title={dict.home.buildsTitle}
        lead={dict.home.buildsLead}
        action={
          <ButtonLink href={localePath(typedLocale, '/zestawy')} variant="secondary" size="sm">
            {dict.common.viewAll}
          </ButtonLink>
        }
      >
        <ul className="grid gap-3 sm:grid-cols-2">
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
                    <span className="spec-label">{build.slug}</span>
                  </>
                }
                title={t(build.name, typedLocale)}
                description={t(build.tagline, typedLocale)}
                footer={<p className="text-xs text-text-muted">{t(build.useCase, typedLocale)}</p>}
              />
            </li>
          ))}
        </ul>
      </Chapter>

      {/* ---- Guides ---- */}
      <Chapter
        id="guides"
        number={5}
        title={dict.home.guidesTitle}
        lead={dict.home.guidesLead}
        action={
          <ButtonLink href={localePath(typedLocale, '/poradniki')} variant="secondary" size="sm">
            {dict.common.viewAll}
          </ButtonLink>
        }
        aside={
          <div className="plate" aria-hidden="true">
            <Photo
              slug="cables-tidy"
              locale={typedLocale}
              ratio="16/10"
              sizes="19rem"
              className="bg-transparent"
            />
          </div>
        }
      >
        <ul className="bom-list">
          {featuredGuides.map((guide) => (
            <li key={guide.slug} className="bom-row">
              <div className="py-4 pl-3">
                <Badge tone="neutral">{dict.guides.category[guide.category]}</Badge>
                <h3 className="mt-1.5 text-lg h-sans text-text-primary">
                  <Link
                    href={localePath(typedLocale, `/poradniki/${guide.slug}`)}
                    className="after:absolute after:inset-0 after:content-[''] focus:outline-none"
                  >
                    {t(guide.title, typedLocale)}
                  </Link>
                </h3>
                <p className="mt-0.5 text-sm text-text-secondary">
                  {t(guide.summary, typedLocale)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Chapter>

      {/* ---- What the site holds ----
           Concrete counts rather than claims, so the scale is verifiable
           rather than asserted. Printed on the board, as a parts list would be. */}
      <div className="mask">
        <Chapter
          id="library"
          number={6}
          title={dict.home.libraryTitle}
          lead={dict.home.libraryLead}
          className="[&_.chapter]:border-t-0 [&_.via]:bg-transparent"
        >
          <StatBand
            stats={[
              {
                value: allParts.length,
                label: dict.parts.title,
                note: dict.home.statParts,
              },
              {
                value: guides.length,
                label: dict.guides.title,
                note: dict.home.statGuides,
              },
              {
                value: articles.length,
                label: dict.blog.title,
                note: dict.home.statArticles,
              },
              {
                value: 14,
                label: dict.calc.title,
                note: dict.home.statCalculators,
              },
            ]}
          />
        </Chapter>
      </div>

      {/* ---- Recent articles, as a scrolling row ---- */}
      <Chapter
        id="latest"
        number={7}
        title={dict.widgets.latestTitle}
        lead={dict.widgets.latestLead}
        action={
          <ButtonLink href={localePath(typedLocale, '/artykuly')} variant="secondary" size="sm">
            {dict.common.viewAll}
          </ButtonLink>
        }
        className="[&_.chapter]:border-t-0"
      >
        <Carousel label={dict.widgets.latestTitle} locale={typedLocale}>
          {articles.slice(0, 6).map((article) => (
            <Link
              key={article.slug}
              href={localePath(typedLocale, `/artykuly/${article.slug}`)}
              className="footprint group flex w-72 shrink-0 flex-col overflow-hidden focus-ring"
            >
              {article.photo ? (
                <span className="block bg-[var(--color-mask-600)] [&_img]:mix-blend-luminosity">
                  <Photo
                    slug={article.photo}
                    locale={typedLocale}
                    ratio="16/9"
                    sizes="18rem"
                    className="bg-transparent"
                  />
                </span>
              ) : null}
              <span className="flex flex-1 flex-col p-4">
                <span className="flex flex-wrap items-center gap-2">
                  <Badge tone="brand">{dict.blog.category[article.category]}</Badge>
                  <span className="spec-label">{formatDate(article.published, typedLocale)}</span>
                </span>
                <span className="mt-2 block font-bold text-text-primary">
                  {t(article.title, typedLocale)}
                </span>
                <span className="mt-1 line-clamp-3 text-sm text-text-secondary">
                  {t(article.summary, typedLocale)}
                </span>
                <span className="spec-label mt-auto pt-3">
                  {dict.blog.readingTime(articleReadingTime(article, typedLocale))}
                </span>
              </span>
            </Link>
          ))}
        </Carousel>
      </Chapter>

      {/* ---- Recommended videos ----
           Placed after the written content, since this site is the reference
           and these are a companion to it rather than a replacement. */}
      <Chapter
        id="videos"
        number={8}
        title={dict.widgets.videosTitle}
        lead={dict.widgets.videosLead}
        action={
          <ButtonLink href={localePath(typedLocale, '/filmy')} variant="secondary" size="sm">
            {dict.common.viewAll}
          </ButtonLink>
        }
      >
        <Carousel label={dict.widgets.videosTitle} locale={typedLocale}>
          {videosForLocale(typedLocale)
            .slice(0, 6)
            .map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                locale={typedLocale}
                className="w-72 shrink-0"
              />
            ))}
        </Carousel>
        <p className="mt-4 max-w-3xl text-xs text-text-muted">{dict.widgets.videoNote}</p>
      </Chapter>

      {/* ---- Finished machine ----
           The one full-width picture, and the thing all of it is aimed at
           producing. */}
      <section className="container-page pt-6 pb-2">
        <PhotoFigure
          slug="workstation"
          locale={typedLocale}
          ratio="21/9"
          sizes="100vw"
          caption={dict.home.finishedCaption}
        />
      </section>

      {/* ---- Opinions ---- */}
      <Chapter
        id="opinions"
        number={9}
        title={dict.home.opinionsTitle}
        lead={dict.home.opinionsLead}
        className="[&_.chapter]:mt-8"
      >
        <ul className="bom-list">
          {featuredOpinions.map((opinion) => (
            <li key={opinion.id} className="border-b border-border-subtle py-5">
              <figure>
                {opinion.rating ? (
                  <p className="mb-2 flex items-center gap-0.5 text-accent-fg">
                    {/* The rating is spelled out for screen readers; the stars
                        are decorative because colour and shape alone are not a
                        reliable way to convey a value. */}
                    <span className="sr-only">{dict.opinions.rating(opinion.rating)}</span>
                    {Array.from({ length: opinion.rating }).map((_, index) => (
                      <StarIcon key={index} className="size-3.5" />
                    ))}
                  </p>
                ) : null}

                <blockquote className="max-w-3xl text-text-primary">
                  <p>„{t(opinion.quote, typedLocale)}”</p>
                </blockquote>

                <figcaption className="spec-label mt-2 flex flex-wrap gap-x-3">
                  <span className="text-text-secondary">{opinion.author}</span>
                  <a
                    href={opinion.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="rounded-xs underline underline-offset-2 transition-colors hover:text-text-brand focus-ring"
                  >
                    {opinion.source}
                  </a>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <p className="mt-4 max-w-3xl text-xs text-text-muted">{dict.opinions.disclaimer}</p>
      </Chapter>

      {/* ---- FAQ ---- */}
      <Chapter
        id="faq"
        number={10}
        title={dict.home.faqTitle}
        action={
          <ButtonLink href={localePath(typedLocale, '/faq')} variant="secondary" size="sm">
            {dict.common.viewAll}
          </ButtonLink>
        }
      >
        <ul className="bom-list">
          {faq.slice(0, 5).map((entry) => (
            <li key={entry.id} className="border-b border-border-subtle">
              {/* A native details element gives keyboard operation, the
                  correct expanded state and find-in-page support with no
                  JavaScript at all. */}
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-3.5 font-semibold text-text-primary marker:content-none focus-ring">
                  {t(entry.question, typedLocale)}
                  <ChevronDownIcon
                    className="mt-1 size-4 shrink-0 text-accent-fg transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="max-w-3xl pb-4 text-sm text-text-secondary">
                  {t(entry.answer, typedLocale)}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </Chapter>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
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
