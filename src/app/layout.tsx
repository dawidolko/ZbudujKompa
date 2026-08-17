import type { Metadata, Viewport } from 'next';
import { site } from '@/lib/site';
import { asset } from '@/lib/utils';
import { defaultLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n';

const dict = getDictionary(defaultLocale);

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: dict.meta.siteTitle,
    template: `%s — ${site.name}`,
  },
  description: dict.meta.siteDescription,
  applicationName: site.name,
  authors: [{ name: site.author, url: site.authorUrl }],
  creator: site.author,
  generator: 'Next.js',
  icons: {
    icon: [
      { url: asset('/favicon.svg'), type: 'image/svg+xml' },
      { url: asset('/favicon-96.png'), sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: asset('/apple-touch-icon.png'), sizes: '180x180' }],
  },
  manifest: asset('/site.webmanifest'),
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  /* Two entries so the browser chrome matches the page in either theme —
     a single value would leave the address bar mismatched in one of them. */
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0f13' },
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
};

/**
 * Root layout.
 *
 * It deliberately renders no <html> or <body> of its own: those belong to the
 * locale segment, which is the only place that knows the language and can put
 * the right value in the `lang` attribute of the served HTML. Every route
 * below this one supplies its own document shell.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
