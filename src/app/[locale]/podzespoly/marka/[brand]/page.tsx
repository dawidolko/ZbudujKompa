import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader, SectionHeading } from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localeTags, type Locale } from '@/i18n/config';
import { categoryOrder, formatPriceRange, getBrands, getPartsByBrand } from '@/lib/parts';
import { absoluteLocaleUrl, canonicalUrl } from '@/lib/site';
import { slugify, t } from '@/lib/utils';

type Params = { locale: string; brand: string };

/**
 * One page per manufacturer.
 *
 * Brands are slugified rather than URL-encoded, for the same reason the tag
 * pages are: encoding a segment that Next also encodes produces a directory
 * whose name contains literal percent escapes, and correctly formed requests
 * then 404.
 */
export function generateStaticParams(): Params[] {
  return locales.flatMap((locale) =>
    getBrands().map(({ brand }) => ({ locale, brand: slugify(brand) })),
  );
}

function brandFromSlug(slug: string): string | undefined {
  return getBrands().find(({ brand }) => slugify(brand) === slug)?.brand;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, brand } = await params;
  if (!isLocale(locale)) return {};

  const name = brandFromSlug(brand);
  if (!name) return {};

  const dict = getDictionary(locale);

  return {
    title: name,
    description: dict.parts.brandLead(name),
    alternates: {
      canonical: canonicalUrl(locale, `/podzespoly/marka/${brand}`),
      languages: Object.fromEntries(
        locales.map((code) => [
          localeTags[code],
          absoluteLocaleUrl(code, `/podzespoly/marka/${brand}`),
        ]),
      ),
    },
  };
}

export default async function BrandPage({ params }: { params: Promise<Params> }) {
  const { locale, brand } = await params;
  if (!isLocale(locale)) notFound();

  const name = brandFromSlug(brand);
  if (!name) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);
  const parts = getPartsByBrand(name);

  /* Grouped by category, because a manufacturer making both boards and
     coolers is common and mixing them in one list helps nobody. */
  const byCategory = categoryOrder
    .map((category) => ({ category, items: parts.filter((part) => part.category === category) }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <Breadcrumbs
        locale={typedLocale}
        items={[{ href: '/podzespoly', label: dict.parts.title }, { label: name }]}
      />
      <PageHeader eyebrow={dict.parts.filterBrand} title={name} lead={dict.parts.brandLead(name)} />

      {byCategory.map((group) => (
        <section key={group.category} className="container-page pb-12">
          <SectionHeading
            title={dict.configurator.category[group.category]}
            id={`category-${group.category}`}
          />
          <ul className="grid gap-3 md:grid-cols-2">
            {group.items.map((part) => (
              <li key={part.id}>
                <article className="flex h-full flex-col rounded-lg border border-border-subtle bg-surface p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-display font-bold text-text-primary">{part.name}</h3>
                    <Badge tone="neutral">{dict.configurator.tier[part.tier]}</Badge>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-accent-fg">
                    {formatPriceRange(part.price, typedLocale)}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                    {t(part.note, typedLocale)}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
