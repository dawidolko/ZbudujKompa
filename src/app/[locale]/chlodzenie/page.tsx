import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { LinkCard } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader } from '@/components/layout/PageHeader';
import { getDictionary } from '@/i18n';
import { isLocale, localePath, locales, localeTags, type Locale } from '@/i18n/config';
import { coolingProfiles } from '@/lib/cooling';
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
    title: dict.cooling.title,
    description: dict.cooling.lead,
    alternates: {
      canonical: canonicalUrl(locale, '/chlodzenie'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/chlodzenie')]),
      ),
    },
  };
}

export default async function CoolingPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  const typeLabel = {
    air: dict.cooling.typeAir,
    aio: dict.cooling.typeAio,
    'custom-loop': dict.cooling.typeCustom,
  };

  return (
    <>
      <Breadcrumbs locale={typedLocale} items={[{ label: dict.cooling.title }]} />
      <PageHeader
        photo="cooling-fans"
        locale={typedLocale}
        title={dict.cooling.title}
        lead={dict.cooling.lead}
      />

      {/* ---- Comparison table ---- */}
      <section className="container-page pb-12">
        <div className="overflow-x-auto rounded-lg border border-border-subtle">
          <table className="w-full min-w-[46rem] border-collapse text-sm">
            <caption className="sr-only">{dict.cooling.lead}</caption>
            <thead>
              <tr className="border-b border-border-subtle bg-bg-muted text-left">
                <th scope="col" className="px-4 py-3 font-semibold text-text-primary">
                  {dict.cooling.type}
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-text-primary">
                  {dict.cooling.wattage}
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-text-primary">
                  {dict.cooling.noise}
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-text-primary">
                  {dict.cooling.price}
                </th>
              </tr>
            </thead>
            <tbody>
              {coolingProfiles.map((profile) => (
                <tr
                  key={profile.slug}
                  className="border-b border-border-subtle last:border-0 even:bg-bg-subtle"
                >
                  <th scope="row" className="px-4 py-3 text-left">
                    <span className="block font-bold text-text-primary">
                      {t(profile.name, typedLocale)}
                    </span>
                    <Badge tone="neutral" className="mt-1">
                      {typeLabel[profile.type]}
                    </Badge>
                  </th>
                  <td className="px-4 py-3 text-text-secondary">
                    {profile.wattage.min}–{profile.wattage.max} W
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {profile.noise.min}–{profile.noise.max} dBA
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {formatPrice(profile.price.min * 100, typedLocale)} –{' '}
                    {formatPrice(profile.price.max * 100, typedLocale)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---- Cards ---- */}
      <section className="container-page pb-14">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coolingProfiles.map((profile) => (
            <li key={profile.slug} className="flex">
              <LinkCard
                className="w-full"
                href={localePath(typedLocale, `/chlodzenie/${profile.slug}`)}
                eyebrow={<Badge tone="brand">{typeLabel[profile.type]}</Badge>}
                title={t(profile.name, typedLocale)}
                description={t(profile.tagline, typedLocale)}
                footer={
                  <p className="text-xs text-text-muted">
                    {profile.wattage.min}–{profile.wattage.max} W · {profile.noise.min}–
                    {profile.noise.max} dBA
                  </p>
                }
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
