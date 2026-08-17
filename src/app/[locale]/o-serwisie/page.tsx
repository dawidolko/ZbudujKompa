import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader } from '@/components/layout/PageHeader';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localeTags, type Locale } from '@/i18n/config';
import { builds } from '@/lib/builds';
import { guides } from '@/lib/guides';
import { sockets } from '@/lib/sockets';
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
    title: dict.about.title,
    description: dict.about.lead,
    alternates: {
      canonical: canonicalUrl(locale, '/o-serwisie'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/o-serwisie')]),
      ),
    },
  };
}

/**
 * About page.
 *
 * Content is written inline rather than pulled from a data module: it is
 * prose that exists once, on one page, and moving it into a dictionary would
 * add indirection without adding reuse.
 */
const content = {
  pl: [
    {
      heading: 'Po co to powstało',
      body: [
        'Większość poradników o składaniu komputera dzieli się na dwie grupy: albo są listą zakupów bez uzasadnienia, albo dyskusją na forum, w której trzeba przeczytać czterdzieści postów, żeby dowiedzieć się, że pamięć wkłada się w sloty drugi i czwarty.',
        'Ten serwis próbuje trafić pomiędzy: podać konkretną odpowiedź, a obok niej powód, dla którego jest właśnie taka. Powód jest ważniejszy od odpowiedzi, bo sprzęt się zmienia, a sposób myślenia o doborze części zostaje.',
      ],
    },
    {
      heading: 'Skąd biorą się dane',
      body: [
        'Specyfikacje podstawek i chipsetów pochodzą z publicznej dokumentacji producentów. Zakresy wydajności chłodzenia to realistyczne widełki dla całej klasy konstrukcji, a nie liczby z materiałów marketingowych pojedynczego produktu.',
        'Ceny są orientacyjne i każda ma przy sobie datę sprawdzenia. Cena bez daty jest gorsza niż brak ceny, bo po cichu się dezaktualizuje, a czytelnik nie ma jak tego zauważyć.',
        'Opinie społeczności są cytowane wraz ze źródłem i datą zebrania. Nie są zweryfikowanymi recenzjami — to pojedyncze głosy z publicznych forów i tak należy je traktować.',
      ],
    },
    {
      heading: 'Na czym to stoi',
      body: [
        'Serwis jest w pełni statyczny: Next.js 16 z eksportem do plików, React 19 i Tailwind CSS 4. Nie ma backendu, bazy danych ani analityki śledzącej. Całość hostuje GitHub Pages.',
        'Asystent w prawym dolnym rogu działa lokalnie, na wbudowanej bazie wiedzy — nie wysyła zapytań na zewnątrz, chyba że właściciel wdrożenia świadomie skonfiguruje zewnętrzne API.',
        'Kod jest otwarty. Jeśli znajdziesz błąd merytoryczny, zgłoszenie na GitHubie jest najszybszą drogą do jego poprawienia.',
      ],
    },
  ],
  en: [
    {
      heading: 'Why this exists',
      body: [
        'Most PC building guides fall into one of two groups: a shopping list with no reasoning, or a forum thread where you read forty posts to learn that memory goes in the second and fourth slots.',
        'This site tries to sit between the two: give a specific answer, and next to it the reason it is that answer. The reason matters more than the answer, because hardware changes while the way you think about choosing parts does not.',
      ],
    },
    {
      heading: 'Where the data comes from',
      body: [
        'Socket and chipset specifications come from published vendor documentation. Cooling performance ranges are realistic bands for a whole class of design, not headline figures from one product page.',
        'Prices are indicative and each carries the date it was checked. A price without a date is worse than no price at all — it goes stale quietly and the reader has no way to tell.',
        'Community opinions are quoted with their source and collection date. They are not verified reviews; they are individual voices from public forums and should be read as such.',
      ],
    },
    {
      heading: 'How it is built',
      body: [
        'The site is fully static: Next.js 16 exported to files, React 19 and Tailwind CSS 4. There is no backend, no database and no tracking analytics. GitHub Pages serves the whole thing.',
        'The assistant in the bottom-right corner runs locally against a built-in knowledge base — it sends nothing outward unless whoever deploys the site deliberately configures an external API.',
        'The code is open source. If you find a factual error, an issue on GitHub is the fastest route to getting it corrected.',
      ],
    },
  ],
};

export default async function AboutPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  return (
    <>
      <Breadcrumbs locale={typedLocale} items={[{ label: dict.about.title }]} />
      <PageHeader title={dict.about.title} lead={dict.about.lead} />

      <section className="container-page pb-12">
        <dl className="grid gap-px overflow-hidden rounded-lg border border-border-subtle bg-border-subtle sm:grid-cols-3">
          {[
            { term: dict.home.statsSockets, value: sockets.length },
            { term: dict.home.statsGuides, value: guides.length },
            { term: dict.home.statsBuilds, value: builds.length },
          ].map((stat) => (
            <div key={stat.term} className="bg-surface p-4">
              <dt className="text-xs tracking-wide text-text-muted uppercase">{stat.term}</dt>
              <dd className="font-display mt-1 text-2xl font-extrabold text-text-primary">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="container-page pb-14">
        <div className="container-prose mx-0 prose-guide">
          {content[typedLocale].map((block) => (
            <section key={block.heading}>
              <h2>{block.heading}</h2>
              {block.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </section>
          ))}

          <h2>{dict.contact.repositoryLabel}</h2>
          <p>
            <a href={site.repository} target="_blank" rel="noopener noreferrer">
              {site.repository}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
