import Link from 'next/link';
import { ChevronRightIcon } from '@/components/ui/Icon';
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
      {/* Negative bottom margin pulls the following PageHeader up so its
          backdrop starts behind this trail rather than below it — otherwise the
          hero reads as a detached band with the breadcrumb floating above. */}
      <nav
        aria-label={dict.nav.breadcrumb}
        className="container-page relative z-10 -mb-11 pt-6 md:-mb-14"
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-sm">
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1;

            return (
              <li
                key={`${crumb.href ?? 'current'}-${crumb.label}`}
                className="flex items-center gap-1.5"
              >
                {index > 0 ? (
                  <ChevronRightIcon className="size-3.5 shrink-0 text-text-muted" />
                ) : null}

                {isLast || !crumb.href ? (
                  <span aria-current="page" className="font-medium text-text-primary">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={localePath(locale, crumb.href)}
                    className="rounded-xs text-text-secondary transition-colors hover:text-text-brand focus-ring"
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
