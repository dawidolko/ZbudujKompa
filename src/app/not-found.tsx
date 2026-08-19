import Link from 'next/link';
import type { Metadata } from 'next';
import './globals.css';
import { themeInitScript } from '@/lib/theme';
import { a11yInitScript } from '@/lib/accessibility';
import { getDictionary } from '@/i18n';
import { defaultLocale, localePath, localeTags } from '@/i18n/config';

const dict = getDictionary(defaultLocale);

export const metadata: Metadata = {
  title: dict.common.notFoundTitle,
  robots: { index: false, follow: true },
};

/**
 * Global 404 page.
 *
 * It sits outside the locale segments and so carries its own document shell,
 * falling back to the default language — the visitor reached a URL matching no
 * route, so there is no locale in the path to read.
 *
 * The illustration is an idle fan and a dead diagnostic LED, which fits the
 * subject and, more usefully, reads as "nothing here" rather than as an error
 * the visitor caused.
 */
export default function NotFound() {
  return (
    <html lang={localeTags[defaultLocale]} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: a11yInitScript }} />
      </head>
      <body>
        <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
          {/* Layered backdrop, matching the heroes elsewhere on the site. */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="bg-accent-glow absolute inset-0 opacity-60" />
            <div className="bg-circuit-traces animate-drift absolute inset-0" />
          </div>

          <div className="relative">
            {/* Decorative: the heading below carries the meaning, so a screen
                reader gains nothing from the drawing. */}
            <svg
              viewBox="0 0 200 120"
              className="mx-auto h-32 w-52 text-accent"
              aria-hidden="true"
              fill="none"
            >
              {/* Case outline */}
              <rect
                x="46"
                y="8"
                width="108"
                height="104"
                rx="6"
                stroke="var(--border-strong)"
                strokeWidth="2"
              />

              {/* A fan turning slowly — the machine has power but nothing to show */}
              <g className="animate-spin-slow" style={{ transformOrigin: '100px 52px' }}>
                <circle
                  cx="100"
                  cy="52"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.4"
                />
                <path
                  d="M100 48c0-7 2-13 7-13s6 6 0 10M104 52c7 0 13 2 13 7s-6 6-10 0M100 56c0 7-2 13-7 13s-6-6 0-10M96 52c-7 0-13-2-13-7s6-6 10 0"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="100" cy="52" r="4" fill="currentColor" />
              </g>

              {/* Diagnostic LEDs: three lit, the fourth dark — the missing page */}
              {[0, 1, 2].map((index) => (
                <circle
                  key={index}
                  cx={70 + index * 14}
                  cy="96"
                  r="3"
                  fill="currentColor"
                  className="animate-trace-pulse"
                  style={{ animationDelay: `${index * 0.3}s` }}
                />
              ))}
              <circle cx="112" cy="96" r="3" fill="var(--border-default)" />
            </svg>

            <p className="font-display mt-4 text-6xl font-extrabold text-accent-fg">404</p>
            <h1 className="font-display mt-2 text-2xl font-bold text-text-primary">
              {dict.common.notFoundTitle}
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
              {dict.common.notFoundLead}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href={localePath(defaultLocale)}
                className="inline-flex h-11 items-center rounded-sm bg-accent px-6 text-sm font-semibold tracking-wide text-text-on-brand uppercase transition-colors hover:bg-accent-hover focus-ring"
              >
                {dict.common.notFoundAction}
              </Link>
              <Link
                href={localePath(defaultLocale, '/mapa-serwisu')}
                className="inline-flex h-11 items-center rounded-sm border border-border-default px-6 text-sm font-semibold text-text-primary transition-colors hover:border-border-brand focus-ring"
              >
                {dict.sitemap.title}
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
