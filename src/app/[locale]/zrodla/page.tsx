import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader, SectionHeading } from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { ExternalIcon } from '@/components/ui/Icon';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localeTags, type Locale } from '@/i18n/config';
import { getResourcesByCategory, resourceCategoryOrder } from '@/lib/resources';
import { absoluteLocaleUrl, canonicalUrl } from '@/lib/site';
import { t } from '@/lib/utils';

type Params = { locale: string };

export function generateStaticParams(): Params[] {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.resources.title,
    description: dict.resources.lead,
    alternates: {
      canonical: canonicalUrl(locale, '/zrodla'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/zrodla')]),
      ),
    },
  };
}

/**
 * External resources, grouped by component type.
 *
 * Every link is first-party documentation or well-established independent
 * testing. Links carry rel="nofollow" alongside the usual security values:
 * these are references for the reader, and this page should not read as an
 * attempt to pass ranking signal around.
 */
export default async function ResourcesPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  return (
    <>
      <Breadcrumbs locale={typedLocale} items={[{ label: dict.resources.title }]} />
      <PageHeader
        photo="gpu-card"
        locale={typedLocale}
        title={dict.resources.title}
        lead={dict.resources.lead}
      />

      {resourceCategoryOrder.map((category) => {
        const items = getResourcesByCategory(category);
        if (items.length === 0) return null;

        return (
          <section key={category} className="container-page pb-12">
            <SectionHeading
              title={dict.resources.category[category]}
              id={`resources-${category}`}
            />

            <ul className="grid gap-3 md:grid-cols-2">
              {items.map((resource) => (
                <li key={resource.url}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex h-full flex-col gap-2 rounded-lg border border-border-subtle bg-surface p-4 transition-colors hover:border-border-brand focus-ring"
                  >
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-text-primary">{resource.name}</span>
                      {resource.official ? (
                        <Badge tone="brand">{dict.resources.official}</Badge>
                      ) : (
                        <Badge tone="neutral">{dict.resources.independent}</Badge>
                      )}
                      <ExternalIcon
                        className="size-3.5 shrink-0 text-text-muted"
                        aria-hidden="true"
                      />
                      <span className="sr-only">({dict.common.externalLink})</span>
                    </span>
                    <span className="text-sm leading-relaxed text-text-secondary">
                      {t(resource.note, typedLocale)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section className="container-page pb-14">
        <p className="max-w-3xl text-xs leading-relaxed text-text-muted">
          {dict.resources.disclaimer}
        </p>
      </section>
    </>
  );
}
