import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader } from '@/components/layout/PageHeader';
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
    title: dict.accessibility.title,
    description: dict.accessibility.lead,
    alternates: {
      canonical: canonicalUrl(locale, '/dostepnosc'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/dostepnosc')]),
      ),
    },
  };
}

/**
 * Accessibility statement.
 *
 * It names the known gaps as well as the measures taken. A statement that
 * claims full conformance with no exceptions is rarely true, and it gives
 * someone who hits a barrier no route to report it.
 */
const content = {
  pl: {
    measures: {
      heading: 'Co zostało zrobione',
      items: [
        'Wszystkie pary tekst–tło spełniają WCAG 2.2 AA: co najmniej 4,5:1 dla tekstu zwykłego i 3:1 dla dużego tekstu oraz elementów interfejsu. Zmierzone wartości są zapisane w komentarzach przy definicjach kolorów.',
        'Cały serwis obsługuje się z klawiatury. Fokus jest zawsze widoczny, ma kontrast co najmniej 3:1 wobec sąsiadujących kolorów i nie znika za żadnym elementem.',
        'Kolor nigdy nie jest jedynym nośnikiem informacji. Każdy komunikat o stanie ma obok ikonę i podpis tekstowy.',
        'Struktura nagłówków jest hierarchiczna, każda strona ma dokładnie jeden nagłówek pierwszego poziomu, a punkty orientacyjne są opisane.',
        'Ustawienie „ogranicz ruch” w systemie wyłącza animacje i płynne przewijanie. Tryb wysokiego kontrastu wzmacnia obramowania i przygaszony tekst.',
        'Elementy klikalne mają co najmniej 44 na 44 piksele, z wyjątkiem kontrolek, dla których obok istnieje odpowiednik pełnowymiarowy.',
        'Wybrany motyw jasny lub ciemny nie zmienia się przy przełączeniu języka — jest zapisywany i odtwarzany przed pierwszym wyrenderowaniem strony.',
      ],
    },
    gaps: {
      heading: 'Znane ograniczenia',
      items: [
        'Tabele porównawcze przewijają się poziomo na wąskich ekranach. Przewijanie odbywa się w obrębie samej tabeli, ale odczyt na małym telefonie pozostaje niewygodny.',
        'Asystent w prawym dolnym rogu nie przechwytuje fokusu na stałe, ponieważ nie jest oknem modalnym. Klawisz Escape zawsze go zamyka i zwraca fokus do przycisku otwierającego.',
      ],
    },
    feedback: {
      heading: 'Zgłaszanie problemów',
      body: 'Jeśli napotkasz barierę, napisz na podany niżej adres albo załóż zgłoszenie w repozytorium. Opis tego, co dokładnie nie zadziałało, jest najbardziej pomocny.',
    },
  },
  en: {
    measures: {
      heading: 'What has been done',
      items: [
        'Every text and background pair meets WCAG 2.2 AA: at least 4.5:1 for normal text and 3:1 for large text and UI components. The measured ratios are recorded in comments beside the colour definitions.',
        'The whole site is operable by keyboard. Focus is always visible, has at least 3:1 contrast against adjacent colours, and is never hidden behind another element.',
        'Colour is never the only carrier of meaning. Every status message pairs a colour with an icon and a text label.',
        'Heading structure is hierarchical, each page has exactly one first-level heading, and landmarks are labelled.',
        'The "reduce motion" system setting disables animation and smooth scrolling. Increased-contrast mode strengthens borders and dimmed text.',
        'Interactive targets are at least 44 by 44 pixels, except for controls that have a full-size equivalent alongside them.',
        'The chosen light or dark theme does not change when switching language — it is persisted and reapplied before the page first renders.',
      ],
    },
    gaps: {
      heading: 'Known limitations',
      items: [
        'Comparison tables scroll horizontally on narrow screens. The scrolling is contained within the table itself, but reading them on a small phone remains awkward.',
        'The assistant in the bottom-right corner does not permanently trap focus, because it is not a modal dialog. Escape always closes it and returns focus to the button that opened it.',
      ],
    },
    feedback: {
      heading: 'Reporting a problem',
      body: 'If you hit a barrier, please write to the address below or open an issue in the repository. A description of exactly what did not work is the most useful thing you can send.',
    },
  },
};

export default async function AccessibilityPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);
  const text = content[typedLocale];

  return (
    <>
      <Breadcrumbs locale={typedLocale} items={[{ label: dict.accessibility.title }]} />
      <PageHeader
        photo="memory-modules"
        locale={typedLocale}
        title={dict.accessibility.title}
        lead={dict.accessibility.lead}
      />

      <section className="container-page pb-14">
        <div className="container-prose mx-0 prose-guide">
          <h2>{text.measures.heading}</h2>
          <ul>
            {text.measures.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2>{text.gaps.heading}</h2>
          <ul>
            {text.gaps.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2>{text.feedback.heading}</h2>
          <p>{text.feedback.body}</p>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </section>
    </>
  );
}
