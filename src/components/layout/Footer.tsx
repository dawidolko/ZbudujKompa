import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { ExternalIcon } from '@/components/ui/Icon';
import type { Dictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';
import { footerNavigation } from '@/lib/navigation';
import { site } from '@/lib/site';
import { t } from '@/lib/utils';

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border-subtle bg-bg-subtle">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-secondary">
              {dict.meta.siteDescription}
            </p>
          </div>

          <nav aria-label={dict.nav.footerNavigation} className="lg:col-span-4">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {footerNavigation.map((group) => (
                <div key={t(group.label, locale)}>
                  <h2 className="mb-3 text-xs font-bold tracking-wide text-text-primary uppercase">
                    {t(group.label, locale)}
                  </h2>
                  <ul className="flex flex-col gap-2">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={localePath(locale, link.href)}
                          className="rounded-xs text-sm text-text-secondary transition-colors hover:text-text-brand focus-ring"
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

        <div className="mt-10 flex flex-col gap-3 border-t border-border-subtle pt-6 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <p className="flex items-center gap-4">
            <a
              href={site.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xs transition-colors hover:text-text-brand focus-ring"
            >
              GitHub
              <ExternalIcon className="size-3.5" />
              {/* The visible icon signals the new tab to sighted users; this
                  text carries the same information to screen readers. */}
              <span className="sr-only">({dict.common.externalLink})</span>
            </a>
            <a
              href={site.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xs transition-colors hover:text-text-brand focus-ring"
            >
              {site.author}
              <ExternalIcon className="size-3.5" />
              <span className="sr-only">({dict.common.externalLink})</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
