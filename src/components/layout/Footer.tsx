import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { ExternalIcon } from '@/components/ui/Icon';
import type { Dictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';
import { footerNavigation } from '@/lib/navigation';
import { site } from '@/lib/site';
import { t } from '@/lib/utils';

/**
 * The title block of the sheet.
 *
 * An engineering drawing closes with a ruled block saying what it is and who
 * drew it, so the site does the same: one grid of cells, with the links filed
 * into it.
 */
export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mask mt-20">
      <div className="ruler" aria-hidden="true" />

      <div className="container-page py-8 md:py-10">
        <div className="grid border border-border-default lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
          <div className="border-b border-border-default p-4 lg:border-r lg:border-b-0">
            <Logo />
            <p className="mt-3 text-sm text-text-secondary">{dict.meta.siteDescription}</p>
          </div>

          <nav aria-label={dict.nav.footerNavigation}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4">
              {footerNavigation.map((group) => (
                <div
                  key={t(group.label, locale)}
                  className="border-b border-border-default p-4 last:border-b-0 sm:border-r sm:[&:nth-child(even)]:border-r-0 lg:border-b-0 lg:[&:nth-child(even)]:border-r lg:last:border-r-0"
                >
                  <h2 className="spec-label mb-2 text-text-primary">{t(group.label, locale)}</h2>
                  <ul>
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={localePath(locale, link.href)}
                          className="inline-flex min-h-7 items-center rounded-xs text-sm text-text-secondary transition-colors hover:text-text-brand focus-ring"
                        >
                          {t(link.label, locale)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div className="grid border-x border-b border-border-default sm:grid-cols-3">
          <p className="spec-label border-b border-border-default p-4 sm:border-r sm:border-b-0">
            © {year} {site.name}
          </p>
          <p className="border-b border-border-default p-4 sm:border-r sm:border-b-0">
            <a
              href={site.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="spec-label inline-flex min-h-6 items-center gap-1.5 rounded-xs transition-colors hover:text-text-brand focus-ring"
            >
              {site.author}
              <ExternalIcon className="size-3.5" />
              {/* The visible icon signals the new tab to sighted users; this
                  text carries the same information to screen readers. */}
              <span className="sr-only">({dict.common.externalLink})</span>
            </a>
          </p>
          <p className="p-4">
            <a
              href={site.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="spec-label inline-flex min-h-6 items-center gap-1.5 rounded-xs transition-colors hover:text-text-brand focus-ring"
            >
              GitHub
              <ExternalIcon className="size-3.5" />
              <span className="sr-only">({dict.common.externalLink})</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
