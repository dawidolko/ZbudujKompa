import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader, SectionHeading } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/motion/Reveal';
import { EnergyCostCalculator } from '@/components/tools/calculators/EnergyCost';
import { NoiseCalculator } from '@/components/tools/calculators/NoiseCalculator';
import { DisplayCalculator } from '@/components/tools/calculators/DisplayCalculator';
import { MemoryCalculator } from '@/components/tools/calculators/MemoryCalculator';
import { StorageCalculator } from '@/components/tools/calculators/StorageCalculator';
import { FanCalculator } from '@/components/tools/calculators/FanCalculator';
import { CableCalculator } from '@/components/tools/calculators/CableCalculator';
import { ClearanceCalculator } from '@/components/tools/calculators/ClearanceCalculator';
import { BottleneckCalculator } from '@/components/tools/calculators/BottleneckCalculator';
import { PsuCalculator } from '@/components/tools/PsuCalculator';
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
    title: dict.calc.title,
    description: dict.calc.lead,
    alternates: {
      canonical: canonicalUrl(locale, '/kalkulatory'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/kalkulatory')]),
      ),
    },
  };
}

/**
 * All calculators on one page.
 *
 * Kept together rather than split across nine routes: they answer questions
 * that arise at the same moment — while planning a build — and a reader
 * checking the power draw usually wants the running cost straight afterwards.
 * Each is anchored so it can still be linked to directly.
 */
export default async function CalculatorsPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  const sections = [
    {
      id: 'zasilacz',
      title: dict.tools.psu.title,
      lead: dict.tools.psu.lead,
      render: <PsuCalculator locale={typedLocale} />,
    },
    {
      id: 'zgodnosc',
      title: dict.calc.clearance.title,
      lead: dict.calc.clearance.lead,
      render: <ClearanceCalculator locale={typedLocale} />,
    },
    {
      id: 'prad',
      title: dict.calc.energy.title,
      lead: dict.calc.energy.lead,
      render: <EnergyCostCalculator locale={typedLocale} />,
    },
    {
      id: 'halas',
      title: dict.calc.noise.title,
      lead: dict.calc.noise.lead,
      render: <NoiseCalculator locale={typedLocale} />,
    },
    {
      id: 'wentylatory',
      title: dict.calc.fan.title,
      lead: dict.calc.fan.lead,
      render: <FanCalculator locale={typedLocale} />,
    },
    {
      id: 'monitor',
      title: dict.calc.display.title,
      lead: dict.calc.display.lead,
      render: <DisplayCalculator locale={typedLocale} />,
    },
    {
      id: 'kabel',
      title: dict.calc.cable.title,
      lead: dict.calc.cable.lead,
      render: <CableCalculator locale={typedLocale} />,
    },
    {
      id: 'pamiec',
      title: dict.calc.memory.title,
      lead: dict.calc.memory.lead,
      render: <MemoryCalculator locale={typedLocale} />,
    },
    {
      id: 'dysk',
      title: dict.calc.storage.title,
      lead: dict.calc.storage.lead,
      render: <StorageCalculator locale={typedLocale} />,
    },
    {
      id: 'balans',
      title: dict.calc.bottleneck.title,
      lead: dict.calc.bottleneck.lead,
      render: <BottleneckCalculator locale={typedLocale} />,
    },
  ];

  return (
    <>
      <Breadcrumbs
        locale={typedLocale}
        items={[{ href: '/kalkulatory', label: dict.tools.title }, { label: dict.calc.title }]}
      />
      <PageHeader
        photo="motherboard-closeup"
        locale={typedLocale}
        eyebrow={dict.tools.title}
        title={dict.calc.title}
        lead={dict.calc.lead}
      />

      {/* Jump list, so a reader arriving for one calculator can reach it
          without scrolling past the other nine. */}
      <nav aria-label={dict.nav.onThisPage} className="container-page mb-12">
        <ul className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="inline-flex rounded-sm border border-border-default px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-border-brand hover:text-text-primary focus-ring"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={
            index % 2 === 1
              ? 'relative scroll-mt-24 border-y border-border-subtle bg-bg-subtle'
              : 'scroll-mt-24'
          }
        >
          {index % 2 === 1 ? (
            <div
              className="bg-dots pointer-events-none absolute inset-0 opacity-40"
              aria-hidden="true"
            />
          ) : null}
          <div className="container-page relative py-14">
            <SectionHeading title={section.title} lead={section.lead} />
            <Reveal>{section.render}</Reveal>
          </div>
        </section>
      ))}
    </>
  );
}
