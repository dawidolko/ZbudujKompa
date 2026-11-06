import Link from 'next/link';
import { getDictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';
import { absoluteLocaleUrl } from '@/lib/site';
import { JsonLd } from '@/components/seo/JsonLd';

export type Crumb = {
  /** Path relative to the locale segment. Omitted on the current page. */
  href?: string;
  label: string;
};

/**
 * Breadcrumb trail.
 *
 * Emits BreadcrumbList structured data alongside the visible markup, so search
 * results show the hierarchy rather than a bare URL. The final crumb is plain
 * text with aria-current, since linking to the page you are already on is
 * noise for anyone navigating by keyboard or screen reader.
 */
export function Breadcrumbs({ locale, items }: { locale: Locale; items: Crumb[] }) {
  const dict = getDictionary(locale);

  const trail: Crumb[] = [{ href: '/', label: dict.nav.home }, ...items];

  return (
    <>
      {/* On the same board as the PageHeader below it, so the two read as one
          block with the path printed along its top edge. */}
      <nav aria-label={dict.nav.breadcrumb} className="mask">
        <ol className="container-page flex flex-wrap items-center gap-x-1.5 gap-y-1 pt-4 font-mono text-xs">
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1;

            return (
              <li
                key={`${crumb.href ?? 'current'}-${crumb.label}`}
                className="flex items-center gap-1.5"
              >
                {index > 0 ? (
                  <span aria-hidden="true" className="text-text-muted">
                    /
                  </span>
                ) : null}

                {isLast || !crumb.href ? (
                  <span aria-current="page" className="text-text-primary">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={localePath(locale, crumb.href)}
                    className="inline-flex min-h-6 items-center rounded-xs text-text-secondary underline-offset-2 transition-colors hover:text-text-brand hover:underline focus-ring"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: trail.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.label,
            ...(crumb.href ? { item: absoluteLocaleUrl(locale, crumb.href) } : {}),
          })),
        }}
      />
    </>
  );
}
