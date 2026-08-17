import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LinkCard } from '@/components/ui/Card';
import { SectionHeading } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { ArrowRightIcon, StarIcon } from '@/components/ui/Icon';
import { Photo, PhotoFigure } from '@/components/ui/Photo';
import { Reveal } from '@/components/motion/Reveal';
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

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  const featuredGuides = guides.slice(0, 4);
  const featuredOpinions = opinions.slice(0, 3);

  return (
    <>
      {/* ---- Hero ---- */}
      <section className="relative overflow-hidden border-b border-border-subtle">
        {/* Three stacked layers build the depth: a photograph held well back so
            it never competes with the text, a soft accent glow, and the circuit
            trace pattern drifting slowly across the top. */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <Photo
            slug="hero-workbench"
            locale={typedLocale}
            priority
            sizes="100vw"
            ratio="auto"
            className="absolute inset-0 h-full opacity-[0.14]"
            imgClassName="object-cover"
          />
          <div className="bg-accent-glow absolute inset-0" />
          <div className="bg-circuit-traces animate-drift absolute inset-0" />
        </div>

        <div className="container-page relative py-16 md:py-24 lg:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-bold tracking-[0.14em] text-accent-fg uppercase">
              {dict.home.heroEyebrow}
            </p>
            <h1 className="font-display text-4xl leading-[1.05] font-extrabold text-text-primary md:text-6xl lg:text-7xl">
              {dict.home.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              {dict.home.heroLead}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href={localePath(typedLocale, '/poradniki/assembly-step-by-step')}
                size="lg"
              >
                {dict.home.heroPrimary}
              </ButtonLink>
              <ButtonLink
                href={localePath(typedLocale, '/platformy')}
                variant="secondary"
                size="lg"
              >
                {dict.home.heroSecondary}
              </ButtonLink>
            </div>

            <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              {[
                { value: sockets.length, label: dict.home.statsSockets },
                { value: guides.length, label: dict.home.statsGuides },
                { value: builds.length, label: dict.home.statsBuilds },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="font-display block text-3xl font-extrabold text-text-primary">
                      {stat.value}
                    </span>
                    <span className="text-xs tracking-wide text-text-muted uppercase">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---- What the site covers ----
           A visual break between the hero and the card grids, and the one
           place on the home page where photographs carry real weight rather
           than sitting behind text. */}
      <section className="container-page py-16 md:py-20">
        <ul className="grid gap-5 md:grid-cols-3">
          {(
            [
              { slug: 'cpu-in-hand', href: '/platformy', label: dict.platform.title, delay: 1 },
              { slug: 'cooling-fans', href: '/chlodzenie', label: dict.cooling.title, delay: 2 },
              { slug: 'cables-tidy', href: '/poradniki', label: dict.guides.title, delay: 3 },
            ] as const
          ).map((item) => (
            <Reveal as="li" key={item.slug} delay={item.delay}>
              <Link
                href={localePath(typedLocale, item.href)}
                className="hover-lift group block overflow-hidden rounded-lg border border-border-subtle bg-surface focus-ring"
              >
                <Photo
                  slug={item.slug}
                  locale={typedLocale}
                  ratio="16/10"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="font-display flex items-center justify-between gap-2 px-5 py-4 text-lg font-bold text-text-primary">
                  {item.label}
                  <ArrowRightIcon
                    className="size-5 text-accent-fg transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ---- Platforms ---- */}
      <section className="container-page py-16 md:py-20">
        <SectionHeading
          title={dict.home.platformsTitle}
          lead={dict.home.platformsLead}
          action={
            <ButtonLink href={localePath(typedLocale, '/platformy')} variant="secondary" size="sm">
              {dict.common.viewAll}
            </ButtonLink>
          }
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sockets.map((socket) => (
            <li key={socket.slug} className="flex">
              <LinkCard
                className="w-full"
                href={localePath(typedLocale, `/platformy/${socket.slug}`)}
                eyebrow={
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
                title={socket.name}
                description={t(socket.tagline, typedLocale)}
                footer={
                  <dl className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted">
                    <div className="flex gap-1">
                      <dt>{dict.platform.memory}:</dt>
                      <dd className="font-medium text-text-secondary">
                        {socket.memory.map((m) => m.toUpperCase()).join(' / ')}
                      </dd>
                    </div>
                    <div className="flex gap-1">
                      <dt>PCIe:</dt>
                      <dd className="font-medium text-text-secondary">{socket.pcie}</dd>
                    </div>
                  </dl>
                }
              />
            </li>
          ))}
        </ul>
      </section>

      {/* ---- Cooling ---- */}
      <section className="relative border-y border-border-subtle bg-bg-subtle">
        <div
          className="bg-dots pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
        />

        <div className="container-page relative py-16 md:py-20">
          <SectionHeading
            title={dict.home.coolingTitle}
            lead={dict.home.coolingLead}
            action={
              <ButtonLink
                href={localePath(typedLocale, '/chlodzenie')}
                variant="secondary"
                size="sm"
              >
                {dict.common.viewAll}
              </ButtonLink>
            }
          />

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coolingProfiles.map((profile) => (
              <li key={profile.slug} className="flex">
                <LinkCard
                  className="w-full"
                  href={localePath(typedLocale, `/chlodzenie/${profile.slug}`)}
                  eyebrow={
                    <Badge tone="brand">
                      {profile.type === 'air'
                        ? dict.cooling.typeAir
                        : profile.type === 'aio'
                          ? dict.cooling.typeAio
                          : dict.cooling.typeCustom}
                    </Badge>
                  }
                  title={t(profile.name, typedLocale)}
                  description={t(profile.tagline, typedLocale)}
                  footer={
                    <dl className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted">
                      <div className="flex gap-1">
                        <dt>{dict.cooling.wattage}:</dt>
                        <dd className="font-medium text-text-secondary">
                          {profile.wattage.min}–{profile.wattage.max} W
                        </dd>
                      </div>
                      <div className="flex gap-1">
                        <dt>{dict.cooling.noise}:</dt>
                        <dd className="font-medium text-text-secondary">
                          {profile.noise.min}–{profile.noise.max} dBA
                        </dd>
                      </div>
                    </dl>
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Builds ---- */}
      <section className="container-page py-16 md:py-20">
        <SectionHeading
          title={dict.home.buildsTitle}
          lead={dict.home.buildsLead}
          action={
            <ButtonLink href={localePath(typedLocale, '/zestawy')} variant="secondary" size="sm">
              {dict.common.viewAll}
            </ButtonLink>
          }
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {builds.map((build) => (
            <li key={build.slug} className="flex">
              <LinkCard
                className="w-full"
                href={localePath(typedLocale, `/zestawy/${build.slug}`)}
                eyebrow={
                  <Badge tone={build.vendor === 'amd' ? 'amd' : 'intel'}>
                    {build.vendor === 'amd' ? 'AMD' : 'Intel'}
                  </Badge>
                }
                title={t(build.name, typedLocale)}
                description={t(build.tagline, typedLocale)}
                footer={<p className="text-xs text-text-muted">{t(build.useCase, typedLocale)}</p>}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* ---- Guides ---- */}
      <section className="border-y border-border-subtle bg-bg-subtle">
        <div className="container-page py-16 md:py-20">
          <SectionHeading
            title={dict.home.guidesTitle}
            lead={dict.home.guidesLead}
            action={
              <ButtonLink
                href={localePath(typedLocale, '/poradniki')}
                variant="secondary"
                size="sm"
              >
                {dict.common.viewAll}
              </ButtonLink>
            }
          />

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredGuides.map((guide) => (
              <li key={guide.slug} className="flex">
                <LinkCard
                  className="w-full"
                  href={localePath(typedLocale, `/poradniki/${guide.slug}`)}
                  eyebrow={<Badge tone="neutral">{dict.guides.category[guide.category]}</Badge>}
                  title={t(guide.title, typedLocale)}
                  description={t(guide.summary, typedLocale)}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Finished machine ----
           Closes the page on the thing all of it is aimed at producing. */}
      <section className="container-page pb-4">
        <Reveal>
          <PhotoFigure
            slug="workstation"
            locale={typedLocale}
            ratio="21/9"
            sizes="100vw"
            caption={dict.home.finishedCaption}
          />
        </Reveal>
      </section>

      {/* ---- Opinions ---- */}
      <section className="container-page py-16 md:py-20">
        <SectionHeading title={dict.home.opinionsTitle} lead={dict.home.opinionsLead} />

        <ul className="grid gap-4 md:grid-cols-3">
          {featuredOpinions.map((opinion) => (
            <li key={opinion.id}>
              <figure className="flex h-full flex-col rounded-lg border border-border-subtle bg-surface p-5">
                {opinion.rating ? (
                  <p className="mb-3 flex items-center gap-0.5 text-accent-fg">
                    {/* The rating is spelled out for screen readers; the stars
                        are decorative because colour and shape alone are not a
                        reliable way to convey a value. */}
                    <span className="sr-only">{dict.opinions.rating(opinion.rating)}</span>
                    {Array.from({ length: opinion.rating }).map((_, index) => (
                      <StarIcon key={index} className="size-4" />
                    ))}
                  </p>
                ) : null}

                <blockquote className="flex-1 text-sm leading-relaxed text-text-secondary">
                  <p>„{t(opinion.quote, typedLocale)}”</p>
                </blockquote>

                <figcaption className="mt-4 border-t border-border-subtle pt-3 text-xs text-text-muted">
                  <span className="font-semibold text-text-secondary">{opinion.author}</span>
                  {' · '}
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

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-text-muted">
          {dict.opinions.disclaimer}
        </p>
      </section>

      {/* ---- FAQ ---- */}
      <section className="border-t border-border-subtle bg-bg-subtle">
        <div className="container-page py-16 md:py-20">
          <SectionHeading
            title={dict.home.faqTitle}
            action={
              <ButtonLink href={localePath(typedLocale, '/faq')} variant="secondary" size="sm">
                {dict.common.viewAll}
              </ButtonLink>
            }
          />

          <ul className="container-prose mx-0 space-y-3">
            {faq.slice(0, 5).map((entry) => (
              <li key={entry.id}>
                {/* A native details element gives keyboard operation, the
                    correct expanded state and find-in-page support with no
                    JavaScript at all. */}
                <details className="group rounded-md border border-border-subtle bg-surface">
                  <summary className="cursor-pointer list-none px-4 py-3.5 text-sm font-semibold text-text-primary marker:content-none focus-ring">
                    {t(entry.question, typedLocale)}
                  </summary>
                  <div className="border-t border-border-subtle px-4 py-3.5 text-sm leading-relaxed text-text-secondary">
                    {t(entry.answer, typedLocale)}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
