import Link from 'next/link';
import type { Metadata } from 'next';
import './globals.css';
import { themeInitScript } from '@/lib/theme';
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
 * It sits outside the locale segments, so it carries its own document shell
 * and falls back to the default language — the visitor has landed on a URL
 * that matched no route, so there is no locale to read from the path.
 */
export default function NotFound() {
  return (
    <html lang={localeTags[defaultLocale]} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <main className="container-page flex min-h-dvh flex-col items-center justify-center gap-5 py-20 text-center">
          <p className="font-display text-6xl font-extrabold text-accent-fg">404</p>
          <h1 className="font-display text-2xl font-bold text-text-primary">
            {dict.common.notFoundTitle}
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-text-secondary">
            {dict.common.notFoundLead}
          </p>
          <Link
            href={localePath(defaultLocale)}
            className="inline-flex h-11 items-center rounded-sm bg-accent px-6 text-sm font-semibold tracking-wide text-text-on-brand uppercase transition-colors hover:bg-accent-hover focus-ring"
          >
            {dict.common.notFoundAction}
          </Link>
        </main>
      </body>
    </html>
  );
}
