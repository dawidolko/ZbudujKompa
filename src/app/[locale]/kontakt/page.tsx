import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader } from '@/components/layout/PageHeader';
import { ExternalIcon } from '@/components/ui/Icon';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localeTags, type Locale } from '@/i18n/config';
import { absoluteLocaleUrl, canonicalUrl, site } from '@/lib/site';

type Params = { locale: string };

export function generateStaticParams(): Params[] {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.contact.title,
    description: dict.contact.lead,
    alternates: {
      canonical: canonicalUrl(locale, '/kontakt'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/kontakt')]),
      ),
    },
  };
}

/**
 * Contact page.
 *
 * Deliberately no contact form: a static export has no server to receive a
 * submission, and a form that silently discards what someone typed is worse
 * than no form. Direct email and the issue tracker both work, and both let
 * the sender keep a copy of what they sent.
 */
export default async function ContactPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  const channels = [
    {
      label: dict.contact.emailLabel,
      value: site.email,
      href: `mailto:${site.email}`,
      external: false,
    },
    {
      label: dict.contact.repositoryLabel,
      value: site.repository.replace('https://', ''),
      href: site.repository,
      external: true,
    },
  ];

  return (
    <>
      <Breadcrumbs locale={typedLocale} items={[{ label: dict.contact.title }]} />
      <PageHeader
        photo="workstation"
        locale={typedLocale}
        title={dict.contact.title}
        lead={dict.contact.lead}
      />

      <section className="container-page pb-14">
        <ul className="grid max-w-3xl gap-4 sm:grid-cols-2">
          {channels.map((channel) => (
            <li key={channel.label}>
              <div className="h-full rounded-lg border border-border-subtle bg-surface p-5">
                <h2 className="text-xs font-bold tracking-wide text-text-muted uppercase">
                  {channel.label}
                </h2>
                <p className="mt-2 break-words">
                  <a
                    href={channel.href}
                    {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="inline-flex items-center gap-1.5 rounded-xs font-medium text-text-brand underline underline-offset-2 focus-ring"
                  >
                    {channel.value}
                    {channel.external ? (
                      <>
                        <ExternalIcon className="size-3.5 shrink-0" aria-hidden="true" />
                        <span className="sr-only">({dict.common.externalLink})</span>
                      </>
                    ) : null}
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-text-secondary">
          {dict.contact.repositoryText}
        </p>
      </section>
    </>
  );
}
