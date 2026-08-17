import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import '../globals.css';
import { themeInitScript } from '@/lib/theme';
import { ThemeScript } from '@/components/layout/ThemeScript';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { JsonLd } from '@/components/seo/JsonLd';
import { site, absoluteLocaleUrl, absoluteUrl, canonicalUrl } from '@/lib/site';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localeTags, ogLocales, type Locale } from '@/i18n/config';

/* Fonts are self-hosted by next/font: no request to Google, and the metrics
   are inlined so swapping in the real face causes no layout shift. */
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  weight: ['600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const fontVariables = `${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`;

type LayoutParams = { locale: string };

export function generateStaticParams(): LayoutParams[] {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LayoutParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: {
      default: dict.meta.siteTitle,
      template: `%s — ${site.name}`,
    },
    description: dict.meta.siteDescription,
    keywords: [...dict.meta.keywords],
    alternates: {
      canonical: canonicalUrl(locale, '/'),
      languages: {
        ...Object.fromEntries(
          locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/')]),
        ),
        /* x-default tells search engines which variant to serve when none of
           the visitor's languages match one we publish. */
        'x-default': absoluteLocaleUrl('en', '/'),
      },
    },
    openGraph: {
      type: 'website',
      locale: ogLocales[locale],
      alternateLocale: locales.filter((code) => code !== locale).map((code) => ogLocales[code]),
      siteName: site.name,
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
      url: absoluteLocaleUrl(locale, '/'),
      images: [
        {
          url: absoluteUrl('/og-default.png'),
          width: 1200,
          height: 630,
          alt: dict.meta.siteTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
      images: [absoluteUrl('/og-default.png')],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  };
}

/**
 * Locale segment layout.
 *
 * The document shell lives here rather than in the root layout, because this
 * is the only place that knows the active locale and can therefore put the
 * right value into the `lang` attribute of the served HTML. Setting it
 * client-side would leave crawlers and assistive technology reading the page
 * in the wrong language.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<LayoutParams>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  return (
    <html lang={localeTags[typedLocale]} className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Runs before first paint and sets data-theme on <html>. It is what
            keeps the chosen theme stable across the full document swap the
            language switcher performs. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        {/* Re-applies the theme after a client-side navigation, which is where
            the <head> script above does not run. */}
        <ThemeScript />

        <a href="#main-content" className="skip-link">
          {dict.nav.skipToContent}
        </a>

        <Header locale={typedLocale} />

        <main id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </main>

        <Footer locale={typedLocale} dict={dict} />
        <ChatWidget locale={typedLocale} />

        {/* Site-level identity, emitted once rather than per page. */}
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: site.name,
            url: absoluteLocaleUrl(typedLocale, '/'),
            inLanguage: localeTags[typedLocale],
            description: dict.meta.siteDescription,
            publisher: {
              '@type': 'Person',
              name: site.author,
              url: site.authorUrl,
            },
          }}
        />
      </body>
    </html>
  );
}
