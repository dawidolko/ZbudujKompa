import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader, SectionHeading } from '@/components/layout/PageHeader';
import { ComparisonTable } from '@/components/configurator/ComparisonTable';
import { Badge } from '@/components/ui/Badge';
import { ExternalIcon } from '@/components/ui/Icon';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localeTags, type Locale } from '@/i18n/config';
import { categoryOrder, formatPriceRange, getPartsByCategory, priceTiers } from '@/lib/parts';
import type { PartCategory } from '@/lib/parts';
import { absoluteLocaleUrl, canonicalUrl } from '@/lib/site';
import { t } from '@/lib/utils';

type Params = { locale: string; category: string };

/**
 * One page per component category.
 *
 * These exist because the browser page filters everything at once, which is
 * right when you are exploring but wrong when you already know you want a
 * cooler — a dedicated page can be linked to, indexed, and grouped by price
 * tier rather than presented as one flat list.
 */
export function generateStaticParams(): Params[] {
  return locales.flatMap((locale) => categoryOrder.map((category) => ({ locale, category })));
}

function isCategory(value: string): value is PartCategory {
  return (categoryOrder as string[]).includes(value);
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isLocale(locale) || !isCategory(category)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.configurator.category[category],
    description: dict.parts.categoryLead(dict.configurator.category[category]),
    alternates: {
      canonical: canonicalUrl(locale, `/podzespoly/${category}`),
      languages: Object.fromEntries(
        locales.map((code) => [
          localeTags[code],
          absoluteLocaleUrl(code, `/podzespoly/${category}`),
        ]),
      ),
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { locale, category } = await params;
  if (!isLocale(locale) || !isCategory(category)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);
  const parts = getPartsByCategory(category);

  /* Grouped by price tier rather than listed flat: a reader arrives with a
     budget in mind far more often than with a brand in mind. */
  const byTier = priceTiers
    .map((tier) => ({ tier, items: parts.filter((part) => part.tier === tier) }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <Breadcrumbs
        locale={typedLocale}
        items={[
          { href: '/podzespoly', label: dict.parts.title },
          { label: dict.configurator.category[category] },
        ]}
      />
      <PageHeader
        photo={
          category === 'gpu'
            ? 'gpu-card'
            : category === 'cooler'
              ? 'cooling-fans'
              : category === 'ram'
                ? 'memory-modules'
                : 'motherboard-closeup'
        }
        locale={typedLocale}
        eyebrow={dict.parts.title}
        title={dict.configurator.category[category]}
        lead={dict.parts.categoryLead(dict.configurator.category[category])}
      />

      {byTier.map((group) => (
        <section key={group.tier} className="container-page pb-12">
          <SectionHeading title={dict.configurator.tier[group.tier]} id={`tier-${group.tier}`} />
          <ul className="grid gap-3 md:grid-cols-2">
            {group.items.map((part) => (
              <li key={part.id}>
                <article className="hover-lift flex h-full flex-col rounded-lg border border-border-subtle bg-surface p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-display font-bold text-text-primary">
                      {part.brand} {part.name}
                    </h3>
                    <Badge tone="brand">{formatPriceRange(part.price, typedLocale)}</Badge>
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                    {t(part.note, typedLocale)}
                  </p>
                  {part.url ? (
                    <a
                      href={part.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="mt-3 inline-flex items-center gap-1.5 self-start rounded-xs text-xs font-semibold text-text-brand underline underline-offset-2 focus-ring"
                    >
                      {dict.common.learnMore}
                      <ExternalIcon className="size-3" aria-hidden="true" />
                      <span className="sr-only">({dict.common.externalLink})</span>
                    </a>
                  ) : null}
                </article>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="container-page pb-14">
        <SectionHeading title={dict.comparison.title} id="compare" />
        {/* Opened on the first two parts of the category, so the table is
            useful before the reader selects anything — an empty comparison
            invites them to leave rather than to compare. */}
        <ComparisonTable
          category={category}
          locale={typedLocale}
          initial={parts.slice(0, 2).map((part) => part.id)}
        />
      </section>
    </>
  );
}
