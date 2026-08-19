import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader } from '@/components/layout/PageHeader';
import { CheckIcon, ExternalIcon } from '@/components/ui/Icon';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localeTags, type Locale } from '@/i18n/config';
import { absoluteLocaleUrl, canonicalUrl, contact } from '@/lib/site';

type Params = { locale: string };

export function generateStaticParams(): Params[] {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.services.title,
    description: dict.services.lead,
    alternates: {
      canonical: canonicalUrl(locale, '/zloz-u-mnie'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/zloz-u-mnie')]),
      ),
    },
  };
}

/**
 * The one commercial page on an otherwise non-commercial site.
 *
 * It is deliberately kept honest about its own limits: the rest of the site
 * exists so a reader can do this themselves, and saying so here costs nothing
 * and makes the offer more credible rather than less. No phone number, by
 * request — email and social reach the same person and can be withdrawn.
 *
 * The amber accent marks it as a different kind of page from the reference
 * content, without introducing a colour that sits outside the palette.
 */
export default async function ServicesPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  const channels = [
    {
      label: dict.services.emailLabel,
      value: contact.email,
      href: `mailto:${contact.email}`,
      external: false,
    },
    {
      label: dict.services.workstationLabel,
      value: contact.workstation.replace('https://', ''),
      href: contact.workstation,
      external: true,
    },
    {
      label: dict.services.portfolioLabel,
      value: contact.portfolio.replace('https://', ''),
      href: contact.portfolio,
      external: true,
    },
    {
      label: dict.services.instagramLabel,
      value: contact.instagramHandle,
      href: contact.instagram,
      external: true,
    },
    {
      label: dict.services.facebookLabel,
      value: contact.facebook.replace('https://www.', ''),
      href: contact.facebook,
      external: true,
    },
  ];

  return (
    <>
      <Breadcrumbs locale={typedLocale} items={[{ label: dict.services.title }]} />
      <PageHeader
        photo="workstation"
        locale={typedLocale}
        title={dict.services.title}
        lead={dict.services.lead}
        eyebrow={dict.services.badge}
      />

      {/* ---- What this is ---- */}
      <section className="container-page pb-12">
        <div className="max-w-3xl rounded-lg border border-service-border bg-service-subtle p-6 md:p-7">
          <h2 className="font-display text-xl font-bold text-text-primary">
            {dict.services.introTitle}
          </h2>
          <p className="mt-3 leading-relaxed text-text-secondary">{dict.services.introBody}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex h-11 items-center gap-2 rounded-sm bg-service px-5 text-sm font-semibold tracking-wide text-service-on uppercase transition-colors hover:bg-service-hover focus-ring"
            >
              {dict.services.ctaPrimary}
            </a>
            <a
              href={contact.workstation}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-sm border border-service-border px-5 text-sm font-semibold tracking-wide text-service-fg uppercase transition-colors hover:bg-service-subtle focus-ring"
            >
              {dict.services.ctaSecondary}
              <ExternalIcon className="size-4 shrink-0" aria-hidden="true" />
              <span className="sr-only">({dict.common.externalLink})</span>
            </a>
          </div>
        </div>
      </section>

      {/* ---- What I can do ---- */}
      <section className="container-page pb-14">
        <h2 className="font-display text-2xl font-bold text-text-primary">
          {dict.services.offerTitle}
        </h2>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {dict.services.offer.map((item) => (
            <li
              key={item.title}
              className="rounded-lg border border-border-subtle bg-surface p-5 transition-colors hover:border-service-border"
            >
              <h3 className="flex items-start gap-2 font-semibold text-text-primary">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-service-fg" aria-hidden="true" />
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- How it works ---- */}
      <section className="border-y border-border-subtle bg-bg-subtle">
        <div className="container-page py-14">
          <h2 className="font-display text-2xl font-bold text-text-primary">
            {dict.services.howTitle}
          </h2>
          <ol className="mt-6 grid gap-5 md:grid-cols-4">
            {dict.services.how.map((step, index) => (
              <li key={step.title} className="relative">
                <span
                  className="inline-flex size-9 items-center justify-center rounded-full bg-service text-sm font-bold text-service-on"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <h3 className="mt-3 font-semibold text-text-primary">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- The caveats, stated before someone writes rather than after ---- */}
      <section className="container-page py-14">
        <div className="max-w-3xl rounded-lg border border-border-default bg-surface p-6">
          <h2 className="font-display text-xl font-bold text-text-primary">
            {dict.services.honestTitle}
          </h2>
          <p className="mt-3 leading-relaxed text-text-secondary">{dict.services.honestBody}</p>
        </div>
      </section>

      {/* ---- Contact ---- */}
      <section className="container-page pb-16">
        <h2 className="font-display text-2xl font-bold text-text-primary">
          {dict.services.contactTitle}
        </h2>
        <p className="mt-2 text-text-secondary">{dict.services.contactLead}</p>

        <ul className="mt-5 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => (
            <li key={channel.label}>
              <div className="h-full rounded-lg border border-border-subtle bg-surface p-5">
                <h3 className="text-xs font-bold tracking-wide text-text-muted uppercase">
                  {channel.label}
                </h3>
                <p className="mt-2 break-words">
                  <a
                    href={channel.href}
                    {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="inline-flex items-center gap-1.5 rounded-xs font-medium text-service-fg underline underline-offset-2 focus-ring"
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
      </section>
    </>
  );
}
