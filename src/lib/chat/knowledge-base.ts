import type { Locale } from '@/i18n/config';
import type { Localized } from '../types';

/**
 * Knowledge base for the offline build assistant.
 *
 * Each entry pairs a set of trigger keywords with an answer and links into the
 * site. Matching is done locally so the assistant works with no network, no
 * API key and no per-message cost — which is what a fully static site can
 * actually promise.
 *
 * Keywords are listed per language because the site is bilingual and a Polish
 * question should not be matched by an English keyword that happens to share a
 * substring.
 */
export type KnowledgeEntry = {
  id: string;
  /** Lower-case trigger terms, matched as whole words where possible. */
  keywords: Localized<string[]>;
  answer: Localized<string>;
  /** Pages the reader should go to next. */
  links?: { href: string; label: Localized }[];
};

export const knowledgeBase: KnowledgeEntry[] = [
  {
    /* People greet an assistant before asking anything — answering "I do not
       know" to "hello" makes it look broken before it has been given a real
       question. This entry steers the conversation instead. */
    id: 'greeting',
    keywords: {
      pl: ['czesc', 'cześć', 'hej', 'witam', 'dzien dobry', 'dzień dobry', 'siema', 'halo'],
      en: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'greetings'],
    },
    answer: {
      pl: 'Cześć. Odpowiadam na pytania o składanie komputera — podstawki i platformy, chłodzenie, pamięć, zasilacze, montaż i problemy przy pierwszym uruchomieniu. Zapytaj konkretnie, a wskażę ci też właściwą stronę.',
      en: 'Hello. I answer questions about building a PC — sockets and platforms, cooling, memory, power supplies, assembly and first-boot problems. Ask something specific and I will point you at the right page too.',
    },
    links: [
      {
        href: '/poradniki/assembly-step-by-step',
        label: { pl: 'Składanie krok po kroku', en: 'Building step by step' },
      },
      { href: '/faq', label: { pl: 'Częste pytania', en: 'Common questions' } },
    ],
  },
  {
    id: 'socket-choice',
    keywords: {
      pl: ['podstawka', 'socket', 'am5', 'am4', 'lga', 'platforma', 'gniazdo', 'plyta glowna'],
      en: ['socket', 'am5', 'am4', 'lga', 'platform', 'motherboard socket'],
    },
    answer: {
      pl: 'Podstawka decyduje o chipsecie, generacji pamięci i mocowaniu chłodzenia — to pierwsza realna decyzja przy składaniu. Do nowego zestawu AMD wybierz AM5 (wsparcie zadeklarowane do 2027 roku), a do Intela LGA1851. AM4 i LGA1700 mają sens tylko przy ostrym budżecie albo gdy masz już pamięć DDR4.',
      en: 'The socket determines the chipset, memory generation and cooler mounting — it is the first real decision in a build. For a new AMD system choose AM5 (support committed through 2027), and for Intel choose LGA1851. AM4 and LGA1700 only make sense on a tight budget or if you already own DDR4.',
    },
    links: [
      { href: '/platformy', label: { pl: 'Porównanie platform', en: 'Platform comparison' } },
      { href: '/platformy/am5', label: { pl: 'AM5', en: 'AM5' } },
      { href: '/platformy/lga1851', label: { pl: 'LGA1851', en: 'LGA1851' } },
    ],
  },
  {
    id: 'cooling-choice',
    keywords: {
      pl: [
        'chłodzenie',
        'chlodzenie',
        'wodne',
        'powietrzne',
        'aio',
        'wiatrak',
        'wentylator',
        'temperatura',
        'powietrze',
        'woda',
      ],
      en: ['cooling', 'cooler', 'liquid', 'air', 'aio', 'radiator', 'temperature', 'thermal'],
    },
    answer: {
      pl: 'Zacznij od poboru mocy procesora i dodaj około 15 procent zapasu. Do 150 W wystarczy dobra pojedyncza wieża powietrzna. Między 150 a 250 W sensowna jest podwójna wieża albo chłodnica 240 mm. Powyżej 250 W rozważ 360 mm. Chłodzenie powietrzne jest tańsze i nie ma pompy, która mogłaby się zużyć.',
      en: 'Start from the CPU power draw and add roughly 15 per cent of headroom. Up to 150 W a good single air tower is enough. Between 150 and 250 W, a dual tower or a 240 mm radiator makes sense. Above 250 W consider 360 mm. Air cooling is cheaper and has no pump to wear out.',
    },
    links: [
      { href: '/chlodzenie', label: { pl: 'Wszystkie typy chłodzenia', en: 'All cooling types' } },
      {
        href: '/poradniki/choosing-cooling',
        label: { pl: 'Jak wybrać chłodzenie', en: 'How to choose a cooler' },
      },
    ],
  },
  {
    id: 'memory',
    keywords: {
      pl: ['ram', 'pamięć', 'pamiec', 'ddr4', 'ddr5', 'expo', 'xmp', 'dual channel', 'gigabajt'],
      en: ['ram', 'memory', 'ddr4', 'ddr5', 'expo', 'xmp', 'dual channel', 'gigabyte'],
    },
    answer: {
      pl: '16 GB to dziś praktyczne minimum do grania, 32 GB to rozsądny standard. Zawsze montuj dwa moduły zamiast jednego — tryb dwukanałowy daje realny wzrost wydajności. Moduły wkładaj w sloty drugi i czwarty od procesora. Po złożeniu koniecznie włącz profil EXPO (AMD) lub XMP (Intel) w BIOS-ie, inaczej pamięć pracuje znacznie wolniej niż deklaruje opakowanie.',
      en: '16 GB is the practical minimum for gaming today and 32 GB is a sensible standard. Always fit two modules rather than one — dual channel gives a real performance gain. Use the second and fourth slots from the CPU. Once built, enable the EXPO (AMD) or XMP (Intel) profile in the BIOS, or the memory will run far slower than the box claims.',
    },
    links: [
      {
        href: '/poradniki/first-boot-and-bios',
        label: { pl: 'Pierwsze uruchomienie i BIOS', en: 'First boot and BIOS' },
      },
      { href: '/slownik', label: { pl: 'Słownik pojęć', en: 'Glossary' } },
    ],
  },
  {
    id: 'psu',
    keywords: {
      pl: ['zasilacz', 'psu', 'wat', 'moc', 'watt', 'zasilanie'],
      en: ['psu', 'power supply', 'watt', 'wattage', 'power'],
    },
    answer: {
      pl: 'Zsumuj pobór procesora i karty graficznej, dodaj około 150 W na resztę, a do wyniku dołóż 30 procent zapasu. W praktyce: średnia karta to 650–750 W, mocna karta to 850–1000 W. Na zasilaczu nie oszczędzaj — to jedyny podzespół, którego awaria potrafi uszkodzić pozostałe. Kieruj się długością gwarancji.',
      en: 'Add the CPU and GPU draw together, add roughly 150 W for everything else, then add 30 per cent of headroom. In practice: a mid-range card wants 650–750 W and a high-end card 850–1000 W. Do not economise here — the PSU is the only component whose failure can damage the others. Use the warranty length as your guide.',
    },
    links: [
      { href: '/narzedzia/zasilacz', label: { pl: 'Kalkulator zasilacza', en: 'PSU calculator' } },
      {
        href: '/poradniki/choosing-psu',
        label: { pl: 'Dobór zasilacza', en: 'Choosing a power supply' },
      },
    ],
  },
  {
    id: 'wont-start',
    keywords: {
      pl: [
        'nie startuje',
        'nie uruchamia',
        'nie działa',
        'czarny ekran',
        'brak obrazu',
        'post',
        'problem',
      ],
      en: [
        'wont start',
        'will not start',
        'no display',
        'black screen',
        'no post',
        'not booting',
        'problem',
      ],
    },
    answer: {
      pl: 'Sprawdź trzy rzeczy w tej kolejności: czy monitor jest podłączony do karty graficznej, a nie do płyty głównej; czy pamięć jest dociśnięta aż do kliknięcia zatrzasków; czy podłączony jest 8-pinowy kabel EPS przy procesorze. Te trzy przyczyny pokrywają większość zgłoszeń. Jeśli płyta ma diody diagnostyczne, świecąca wskaże etap, na którym start się zatrzymał.',
      en: 'Check three things in this order: that the monitor is plugged into the graphics card rather than the motherboard; that the memory is pressed in until the clips click; and that the 8-pin EPS cable near the CPU is connected. Those three cover most reports. If your board has diagnostic LEDs, the lit one shows where startup stopped.',
    },
    links: [
      {
        href: '/poradniki/troubleshooting-no-post',
        label: { pl: 'Diagnostyka startu', en: 'Startup diagnostics' },
      },
    ],
  },
  {
    id: 'thermal-paste',
    keywords: {
      pl: ['pasta', 'termopasta', 'termoprzewodzaca', 'smarowanie', 'nalozyc'],
      en: ['paste', 'thermal paste', 'compound', 'tim'],
    },
    answer: {
      pl: 'Kropla wielkości ziarna grochu na środku pokrywy procesora — nacisk chłodzenia rozprowadzi ją sam. Metoda nakładania ma znaczenie marginalne: testy pokazują różnice rzędu jednego do dwóch stopni. Nie nakładaj pasty, jeśli chłodzenie ma ją już fabrycznie na podstawie. Za mało pasty szkodzi wyraźnie bardziej niż za dużo.',
      en: 'A pea-sized dot in the centre of the CPU lid — the cooler pressure spreads it for you. The application method barely matters: testing shows differences of one to two degrees. Do not add paste if the cooler already has some pre-applied. Too little is markedly worse than too much.',
    },
    links: [
      {
        href: '/poradniki/thermal-paste',
        label: { pl: 'Pasta termoprzewodząca', en: 'Thermal paste' },
      },
    ],
  },
  {
    id: 'first-build',
    keywords: {
      pl: [
        'pierwszy raz',
        'jak złożyć',
        'jak zlozyc',
        'montaż',
        'montaz',
        'składanie',
        'skladanie',
        'instrukcja',
        'krok po kroku',
      ],
      en: ['first build', 'how to build', 'assembly', 'step by step', 'instructions', 'beginner'],
    },
    answer: {
      pl: 'Pierwsze składanie zajmuje zwykle od dwóch do czterech godzin. Kolejność, która oszczędza najwięcej cofania się: procesor, pamięć i dysk NVMe montuj przy płycie leżącej poza obudową, potem chłodzenie, dopiero potem płytę wkręć do obudowy. Każdy element pasuje tylko w jedną stronę, więc trwałe uszkodzenie czegoś przez pomyłkę jest naprawdę trudne.',
      en: 'A first build usually takes two to four hours. The order that saves the most backtracking: fit the CPU, memory and NVMe drive while the board is still outside the case, then the cooler, and only then screw the board in. Every part fits one way only, so damaging something by mistake is genuinely hard.',
    },
    links: [
      {
        href: '/poradniki/assembly-step-by-step',
        label: { pl: 'Składanie krok po kroku', en: 'Building step by step' },
      },
      { href: '/zestawy', label: { pl: 'Gotowe zestawy', en: 'Reference builds' } },
    ],
  },
  {
    id: 'amd-vs-intel',
    keywords: {
      pl: [
        'amd czy intel',
        'intel czy amd',
        'ryzen',
        'core ultra',
        'który procesor',
        'jaki procesor',
      ],
      en: ['amd or intel', 'intel or amd', 'ryzen', 'core ultra', 'which cpu', 'what cpu'],
    },
    answer: {
      pl: 'Oba producenci mają dziś dobre procesory i sama wydajność rzadko rozstrzyga. Praktyczne kryterium to platforma: AM5 ma zadeklarowane wsparcie do 2027 roku, więc później wymienisz sam procesor. Intel nadrabia w zadaniach wielowątkowych i poborze mocy w spoczynku. Do samego grania procesory AMD z pamięcią 3D V-Cache mają wyraźną przewagę.',
      en: 'Both vendors make good processors today and raw performance rarely settles it. The practical criterion is the platform: AM5 has committed support through 2027, so you can swap only the CPU later. Intel leads in multi-threaded work and idle power. For gaming specifically, AMD parts with 3D V-Cache hold a clear advantage.',
    },
    links: [
      { href: '/platformy', label: { pl: 'Porównanie platform', en: 'Platform comparison' } },
      { href: '/faq', label: { pl: 'Częste pytania', en: 'Frequently asked questions' } },
    ],
  },
  {
    id: 'budget',
    keywords: {
      pl: ['budzet', 'kosztuje', 'koszt', 'cena', 'tanio', 'najtanszy', 'za ile', 'wydac'],
      /* "how much" is deliberately absent: it opens "how much RAM", "how much
         wattage" and "how much thermal paste" just as often as it opens a
         question about money, and it pulled those to this entry. The
         money-specific terms below carry the intent on their own. */
      en: ['budget', 'how much money', 'price', 'cost', 'cheap', 'cheapest', 'affordable', 'spend'],
    },
    answer: {
      pl: 'W zestawie do grania karta graficzna decyduje o liczbie klatek najbardziej i zwykle powinna pochłonąć 35–45 procent budżetu. Nie tnij natomiast zasilacza ani chłodzenia — te podzespoły przetrwają kilka kolejnych zestawów. Mamy cztery gotowe listy zakupowe w różnych budżetach, każda z uzasadnieniem doboru części.',
      en: 'In a gaming build the graphics card determines frame rate more than anything else and should usually take 35–45 per cent of the budget. Do not cut the power supply or cooler, though — those carry over into several later builds. We have four ready-made shopping lists at different budgets, each with the reasoning for every part.',
    },
    links: [{ href: '/zestawy', label: { pl: 'Gotowe zestawy', en: 'Reference builds' } }],
  },
  {
    id: 'compatibility',
    keywords: {
      pl: ['pasuje', 'kompatybilność', 'kompatybilnosc', 'zgodność', 'zgodnosc', 'czy zadziała'],
      en: ['compatible', 'compatibility', 'will it fit', 'does it work with', 'fitment'],
    },
    answer: {
      pl: 'Trzy rzeczy sprawdza się najczęściej: czy procesor pasuje do podstawki płyty, czy pamięć jest właściwej generacji (DDR4 i DDR5 nie są zamienne) i czy chłodzenie mieści się w obudowie. Tę ostatnią pozycję sprawdź w specyfikacji obudowy — maksymalna wysokość chłodzenia jest tam zawsze podana. Mamy do tego sprawdzarkę.',
      en: 'Three things get checked most often: whether the CPU matches the board socket, whether the memory is the right generation (DDR4 and DDR5 are not interchangeable), and whether the cooler fits the case. For the last one, check the case specification — maximum cooler height is always listed. We have a checker for this.',
    },
    links: [
      {
        href: '/narzedzia/kompatybilnosc',
        label: { pl: 'Sprawdzarka zgodności', en: 'Compatibility checker' },
      },
    ],
  },
];

/**
 * Scores a question against one entry.
 *
 * A whole-word match earns a flat bonus plus the term length; a bare substring
 * earns only the length. That ordering matters: "dual channel" appearing in a
 * question says far more about intent than "ram" does, while "ram" inside
 * "program" should say nothing at all.
 */
function scoreEntry(entry: KnowledgeEntry, question: string, locale: Locale): number {
  /* Both sides go through the same normalisation, so diacritics, casing and
     punctuation cannot cause a mismatch between them. */
  const normalized = normalise(question);
  let score = 0;

  for (const keyword of entry.keywords[locale]) {
    const term = normalise(keyword);
    if (!term) continue;

    /* Whole-word match on a stem, allowing an inflected ending.

       Polish inflects heavily and the endings are long: "podstawka" becomes
       "podstawkę", "pasta" becomes "pastę", "kosztuje" from "koszt". Matching
       on the stem — the keyword minus its own ending — with up to four
       trailing letters covers the real cases.

       The prefix boundary stays strict. That asymmetry is the whole point:
       allowing letters before the term is what would let "ram" match inside
       "program", which is exactly the false positive to avoid. */
    const stem = stemFor(term);
    if (new RegExp(`(?:^| )${escapeRegExp(stem)}\\p{L}{0,4}(?: |$)`, 'u').test(normalized)) {
      score += WHOLE_WORD_SCORE + term.length;
      continue;
    }

    /* Substring match anywhere, worth much less: it is weak evidence, so it
       contributes but rarely clears the threshold on its own. */
    if (normalized.includes(term)) {
      score += term.length;
    }
  }

  return score;
}

/**
 * Flat bonus for matching a whole word.
 *
 * Term length alone was the original scoring rule, and it had a fatal flaw: a
 * three-letter keyword like "ram" could never reach the threshold no matter how
 * exactly it matched, so "Ile RAM-u potrzebuję?" — one of the suggested
 * questions — returned "I do not know". A flat bonus makes a genuine word match
 * count for something regardless of how short the word is, with length still
 * breaking ties in favour of the more specific term.
 */
const WHOLE_WORD_SCORE = 8;

/**
 * Normalises text for matching: lower case, Polish diacritics folded, and
 * punctuation reduced to spaces.
 *
 * Folding diacritics means someone typing "pamiec" without diacritics — which
 * is extremely common — matches "pamięć". Punctuation becoming a space is what
 * lets a trailing question mark or a hyphen in "RAM-u" stop blocking a match.
 */
const DIACRITIC_FOLD: Record<string, string> = {
  ą: 'a',
  ć: 'c',
  ę: 'e',
  ł: 'l',
  ń: 'n',
  ó: 'o',
  ś: 's',
  ź: 'z',
  ż: 'z',
};

function normalise(value: string): string {
  return value
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (char) => DIACRITIC_FOLD[char] ?? char)
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

/**
 * Trims a likely inflectional ending off a keyword, leaving a stem to match on.
 *
 * Crude by design: a real stemmer is far more machinery than a keyword matcher
 * needs, and the failure mode of over-trimming is a slightly looser match, not
 * a wrong answer — the threshold still has to be cleared.
 *
 * Short words are left alone. Trimming "ram" or "psu" would leave a fragment
 * that matches almost anything.
 */
function stemFor(term: string): string {
  if (term.length <= 5 || term.includes(' ')) return term;
  return term.replace(/(?:ami|ach|om|ie|y|a|e|i|u|o)$/u, '');
}

/** Escapes a term for safe use inside a constructed regular expression. */
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Finds the best matching entry, or null when nothing clears the threshold.
 *
 * The threshold exists so an unrelated question gets an honest "I do not know"
 * rather than whichever entry happened to share three letters with it.
 */
export function findAnswer(question: string, locale: Locale): KnowledgeEntry | null {
  const MINIMUM_SCORE = 6;

  let best: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    const score = scoreEntry(entry, question, locale);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore >= MINIMUM_SCORE ? best : null;
}

/** Starter questions offered before the visitor has typed anything. */
export const suggestedQuestions: Localized<string[]> = {
  pl: [
    'Którą podstawkę wybrać?',
    'Powietrze czy woda?',
    'Ile RAM-u potrzebuję?',
    'Komputer nie startuje',
  ],
  en: [
    'Which socket should I choose?',
    'Air or liquid cooling?',
    'How much RAM do I need?',
    'My PC will not start',
  ],
};
