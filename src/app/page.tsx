import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { themeInitScript } from '@/lib/theme';
import { defaultLocale, locales, localePath, localeNames, localeTags } from '@/i18n/config';
import { defaultCanonicalUrl, site } from '@/lib/site';
import { asset } from '@/lib/utils';

export const metadata: Metadata = {
  title: site.name,
  alternates: { canonical: defaultCanonicalUrl('/') },
  /* The root is only a redirect stop; the localized pages carry the content
     that should be indexed. */
  robots: { index: false, follow: true },
};

const target = asset(localePath(defaultLocale));

/**
 * Root entry point.
 *
 * A static export has no server to issue a 3xx, so the redirect happens inside
 * the document: a meta refresh covers crawlers and visitors without
 * JavaScript, while the inline script makes it instant and uses `replace` so
 * the root does not become a back-button trap. The visible links are the
 * fallback if both are blocked.
 */
export default function RootPage() {
  return (
    /* This page sits outside the locale segments, so it carries its own
       document shell. It is language-neutral by design — the visitor has not
       chosen one yet — so `lang` falls back to the default locale. */
    <html lang={localeTags[defaultLocale]} suppressHydrationWarning>
      <head>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `location.replace(${JSON.stringify(target)})`,
          }}
        />
      </head>
      <body>
        <main className="container-page flex min-h-dvh flex-col items-center justify-center gap-6 py-20 text-center">
          <h1 className="font-display text-2xl font-extrabold tracking-tight">{site.name}</h1>
          <p className="text-sm text-text-secondary">Choose your language · Wybierz język</p>
          <nav aria-label="Language">
            <ul className="flex gap-3">
              {locales.map((locale) => (
                <li key={locale}>
                  <Link
                    href={localePath(locale)}
                    hrefLang={locale}
                    className="inline-flex h-11 items-center rounded-sm border border-border-default px-6 text-sm font-semibold tracking-wide text-text-primary uppercase transition-colors hover:border-border-brand hover:text-text-brand focus-ring"
                  >
                    {localeNames[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </main>
      </body>
    </html>
  );
}
