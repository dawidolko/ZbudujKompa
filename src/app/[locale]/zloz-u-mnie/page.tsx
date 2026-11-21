import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Chapter } from '@/components/layout/Chapter';
import { PageHeader } from '@/components/layout/PageHeader';
import { ButtonLink } from '@/components/ui/Button';
import { ExternalIcon } from '@/components/ui/Icon';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localeTags, type Locale } from '@/i18n/config';
import {
  absoluteLocaleUrl,
  canonicalUrl,
  contact,
  ogImage,
  seoDescription,
  seoTitle,
} from '@/lib/site';

type Params = { locale: string };

const path = '/zloz-u-mnie';

export function generateStaticParams(): Params[] {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: seoTitle(dict.services.title, locale),
    description: seoDescription(dict.services.lead),
    alternates: {
      canonical: canonicalUrl(locale, path),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, path)]),
      ),
    },
    openGraph: { url: absoluteLocaleUrl(locale, path), images: [ogImage] },
  };
}

/**
 * Help building a computer, in person.
 *
 * The rest of the site exists so a reader can do this alone, and the page says
 * so first. It describes help, not a deal: there is deliberately no price, no
 * quote and no scope negotiation here, only what the owner can help with, how
 * it goes, an honest note that he is a private person who sells nothing, and
 * how to reach him. No phone number, by request.
 *
 * It uses the site's own parts — numbered chapters, footprints and a
 * procedure — rather than a colour of its own, so it reads as one more page of
 * the manual.
 */
export default async function BuildHelpPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);
  const copy = dict.services;

  const channels = [
    {
      label: copy.emailLabel,
      value: contact.email,
      href: `mailto:${contact.email}`,
      external: false,
    },
    {
      label: copy.workstationLabel,
      value: contact.workstation.replace('https://', ''),
      href: contact.workstation,
      external: true,
    },
    {
      label: copy.portfolioLabel,
      value: contact.portfolio.replace('https://', ''),
      href: contact.portfolio,
      external: true,
    },
    {
      label: copy.instagramLabel,
      value: contact.instagramHandle,
      href: contact.instagram,
      external: true,
    },
    {
      label: copy.facebookLabel,
      value: contact.facebook.replace('https://www.', ''),
      href: contact.facebook,
      external: true,
    },
  ];

  return (
    <>
      <Breadcrumbs locale={typedLocale} items={[{ label: copy.title }]} />
      <PageHeader photo="cables-tidy" locale={typedLocale} title={copy.title} lead={copy.lead} />

      {/* ---- What this is ---- */}
      <section aria-labelledby="intro" className="container-page pb-4">
        <div className="max-w-3xl">
          <h2 id="intro" className="font-display text-xl font-semibold text-text-primary">
            {copy.introTitle}
          </h2>
          <p className="mt-3 leading-relaxed text-text-secondary">{copy.introBody}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${contact.email}`} className="max-w-full whitespace-normal">
              {copy.ctaPrimary}
            </ButtonLink>
            <ButtonLink
              href={contact.workstation}
              external
              variant="secondary"
              className="max-w-full whitespace-normal"
            >
              {copy.ctaSecondary}
              <ExternalIcon className="size-4 shrink-0" aria-hidden="true" />
              <span className="sr-only">({dict.common.externalLink})</span>
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ---- What I can help with ----
           Footprints rather than a list of links: these are things to ask
           about, not pages to open. */}
      <Chapter
        id="help"
        number={1}
        title={copy.helpTitle}
        lead={copy.helpLead}
        className="[&_.chapter]:mt-8"
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {copy.help.map((item, index) => (
            <li key={item.title} className="footprint p-5">
              <p className="spec-label" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-1 h-sans text-lg text-text-primary">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.body}</p>
            </li>
          ))}
        </ul>
      </Chapter>

      {/* ---- How it works ----
           A procedure, as in the guides. No step is about money: the help
           ends wherever the reader wants to carry on alone. */}
      <Chapter id="steps" number={2} title={copy.stepsTitle} lead={copy.stepsLead}>
        <ol className="procedure">
          {copy.steps.map((step, index) => (
            <li key={step.title} className="step pb-8 last:pb-0">
              <span className="step-pad" aria-hidden="true">
                {index + 1}
              </span>
              <div className="min-w-0 pt-1.5 md:pt-2.5">
                <p className="spec-label">{dict.guides.stepOf(index + 1, copy.steps.length)}</p>
                <h3 className="mt-1 h-sans text-lg text-text-primary">{step.title}</h3>
                <p className="mt-1.5 max-w-[42rem] text-sm leading-relaxed text-text-secondary">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Chapter>

      {/* ---- Said before someone writes rather than after ---- */}
      <Chapter id="before" number={3} title={copy.honestTitle}>
        <div className="footprint max-w-[42rem] p-5 md:p-6">
          <p className="leading-relaxed text-text-secondary">{copy.honestBody}</p>
        </div>
      </Chapter>

      {/* ---- Contact ---- */}
      <Chapter
        id="get-in-touch"
        number={4}
        title={copy.contactTitle}
        lead={copy.contactLead}
        className="pb-6"
      >
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {channels.map((channel) => (
            <li key={channel.label} className="footprint p-5">
              <h3 className="spec-label">{channel.label}</h3>
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
            </li>
          ))}
        </ul>
      </Chapter>
    </>
  );
}
