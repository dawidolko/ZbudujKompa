import type { Article } from './types.ts';

/**
 * News and shorter pieces.
 *
 * Every item here is marked perishable, because news is by nature a snapshot.
 * The renderer uses that flag to show the reader how old a piece is rather
 * than presenting it as current indefinitely.
 */
export const newsArticles: Article[] = [
  {
    slug: 'am5-wsparcie-przedluzone',
    category: 'news',
    published: '2026-08-05',
    perishable: true,
    author: 'Dawid Olko',
    tags: ['amd', 'am5', 'platformy'],
    related: ['ile-naprawde-potrzeba-vram'],
    title: {
      pl: 'AMD potwierdza wsparcie AM5 poza rok 2027',
      en: 'AMD confirms AM5 support beyond 2027',
    },
    summary: {
      pl: 'Producent ponownie zadeklarował długie życie podstawki. Co to znaczy w praktyce dla kogoś, kto składa zestaw dzisiaj.',
      en: 'The manufacturer has restated its commitment to the socket. What that means in practice for someone building today.',
    },
    body: [
      {
        type: 'paragraph',
        text: {
          pl: 'Deklaracja o wsparciu podstawki AM5 do co najmniej 2027 roku została powtórzona, a wypowiedzi przedstawicieli sugerują, że okres może być dłuższy. Dla osoby planującej zakup ma to konkretne znaczenie.',
          en: 'The commitment to supporting AM5 through at least 2027 has been restated, and comments from company representatives suggest the window may be longer. For someone planning a purchase this has concrete implications.',
        },
      },
      {
        type: 'paragraph',
        text: {
          pl: 'Warto jednak zachować proporcje. AM4 rzeczywiście przeżył sześć lat i pięć generacji procesorów, ale nie każda płyta z początku tego okresu obsługiwała najnowsze układy — część wymagała aktualizacji BIOS-u, a najtańsze modele nigdy nie dostały wsparcia dla najmocniejszych procesorów.',
          en: 'It is worth keeping this in proportion, though. AM4 did last six years and five processor generations, but not every board from the start of that period supported the newest chips — some needed a BIOS update, and the cheapest models never gained support for the fastest processors.',
        },
      },
      {
        type: 'callout',
        tone: 'info',
        label: { pl: 'Co z tego wynika', en: 'What follows from this' },
        text: {
          pl: 'Deklaracja wsparcia dotyczy podstawki, nie konkretnej płyty. Jeśli liczysz na wymianę procesora za trzy lata, kup płytę z sensownym zasilaniem i aktywnie wspieranym chipsetem, a nie najtańszą dostępną.',
          en: 'A support commitment covers the socket, not a specific board. If you are counting on swapping the processor in three years, buy a board with sensible power delivery and an actively supported chipset rather than the cheapest available.',
        },
      },
    ],
  },
  {
    slug: 'ceny-pamieci-rosna',
    category: 'news',
    published: '2026-07-08',
    perishable: true,
    author: 'Dawid Olko',
    tags: ['pamięć', 'ceny', 'rynek'],
    title: {
      pl: 'Ceny pamięci DDR5 rosną — co robić',
      en: 'DDR5 prices are rising — what to do',
    },
    summary: {
      pl: 'Popyt ze strony centrów danych podniósł ceny modułów. Krótka analiza tego, czy warto kupować teraz czy czekać.',
      en: 'Data centre demand has pushed module prices up. A short look at whether to buy now or wait.',
    },
    body: [
      {
        type: 'paragraph',
        text: {
          pl: 'Zapotrzebowanie na pamięć ze strony infrastruktury AI przełożyło się na ceny modułów konsumenckich. Zestaw 32 GB DDR5-6000, który jeszcze niedawno kosztował około 400 złotych, bywa dziś o kilkadziesiąt procent droższy.',
          en: 'Memory demand from AI infrastructure has fed through into consumer module prices. A 32 GB DDR5-6000 kit that recently cost around 400 złoty can now be tens of per cent more.',
        },
      },
      {
        type: 'paragraph',
        text: {
          pl: 'Praktyczny wniosek jest niewdzięczny: nie da się przewidzieć, kiedy ceny wrócą. Jeśli składasz zestaw teraz, kup pamięć teraz — czekanie na spadek jest zakładem, nie strategią. Jeśli masz działający komputer, rozbudowa pamięci to akurat ten moment, żeby ją odłożyć.',
          en: 'The practical conclusion is unsatisfying: there is no way to predict when prices return. If you are building now, buy the memory now — waiting for a fall is a bet, not a strategy. If you have a working machine, a memory upgrade is precisely the thing to postpone.',
        },
      },
    ],
  },
  {
    slug: 'nowy-standard-zasilaczy',
    category: 'news',
    published: '2026-06-02',
    perishable: true,
    author: 'Dawid Olko',
    tags: ['zasilacze', 'atx', 'standardy'],
    title: {
      pl: 'ATX 3.1 i złącze 12V-2x6 — co się zmieniło',
      en: 'ATX 3.1 and the 12V-2x6 connector — what changed',
    },
    summary: {
      pl: 'Nowy standard nie zwiększa tolerancji na skoki poboru, wbrew powszechnemu przekonaniu. Zmienia natomiast samo złącze, i to jest istotne.',
      en: 'The new standard does not raise transient tolerance, contrary to common belief. It does change the connector itself, and that matters.',
    },
    body: [
      {
        type: 'paragraph',
        text: {
          pl: 'Wokół ATX 3.1 narosło nieporozumienie: standard nie podnosi wymagań co do znoszenia chwilowych skoków poboru. Te są identyczne jak w ATX 3.0 — 200 procent mocy znamionowej przez 100 mikrosekund, 180 procent przez milisekundę.',
          en: 'A misunderstanding has grown around ATX 3.1: the standard does not raise the requirements for surviving transient spikes. Those are identical to ATX 3.0 — 200 per cent of rated power for 100 microseconds, 180 per cent for a millisecond.',
        },
      },
      {
        type: 'paragraph',
        text: {
          pl: 'Realna zmiana dotyczy złącza. 12V-2x6 zastępuje 12VHPWR skróconymi stykami sygnałowymi i lepszym zatrzaskiem. Efekt jest taki, że niedociśnięta wtyczka nie dostaje zasilania zamiast pobierać prąd przez częściowy styk — a to właśnie ten mechanizm odpowiadał za przypadki przegrzewania złącz.',
          en: 'The real change is the connector. 12V-2x6 replaces 12VHPWR with shortened sense pins and better latching. The effect is that a partially seated plug receives no power rather than drawing current through incomplete contact — and it was exactly that mechanism behind the reports of connectors overheating.',
        },
      },
      {
        type: 'callout',
        tone: 'warning',
        label: { pl: 'Nadal obowiązuje', en: 'Still applies' },
        text: {
          pl: 'Bez względu na standard, wtyczkę trzeba wcisnąć do końca aż do kliknięcia i sprawdzić, czy jest równo osadzona na całej szerokości. Nowe złącze zmniejsza skutki błędu, ale go nie eliminuje.',
          en: 'Whatever the standard, the plug has to be pushed fully home until it clicks, and checked for even seating across its whole width. The new connector reduces the consequences of a mistake but does not remove it.',
        },
      },
    ],
  },
  {
    slug: 'pierwszy-zestaw-najczestsze-bledy',
    category: 'explainer',
    published: '2026-03-19',
    author: 'Dawid Olko',
    photo: 'cables-tidy',
    tags: ['montaż', 'początkujący', 'błędy'],
    related: ['jak-czytac-testy-wydajnosci'],
    title: {
      pl: 'Siedem błędów przy pierwszym składaniu',
      en: 'Seven mistakes people make on a first build',
    },
    summary: {
      pl: 'Zebrane z setek zgłoszeń „nie startuje". Wszystkie są odwracalne, a większość zajmuje minutę.',
      en: 'Collected from hundreds of "it will not start" reports. All are reversible, and most take a minute to fix.',
    },
    body: [
      {
        type: 'paragraph',
        text: {
          pl: 'Pierwsze składanie kończy się problemem częściej niż powinno, ale lista przyczyn jest krótka i powtarzalna. Oto siedem, które pokrywają większość przypadków.',
          en: 'A first build runs into trouble more often than it should, but the list of causes is short and repetitive. Here are seven that cover most cases.',
        },
      },
      {
        type: 'list',
        ordered: true,
        items: {
          pl: [
            'Monitor podłączony do płyty głównej zamiast do karty graficznej. Numer jeden na liście, bez konkurencji.',
            'Pamięć w slotach pierwszym i drugim zamiast w drugim i czwartym — działa, ale traci połowę przepustowości.',
            'Moduł pamięci niedociśnięty do kliknięcia. Objawia się brakiem obrazu przy pierwszym starcie.',
            'Niepodłączony kabel EPS przy procesorze. Bez niego wiele płyt nie daje żadnej reakcji.',
            'Zapomniana osłona wejść-wyjść — jedyny element, którego nie da się dołożyć bez wykręcenia płyty.',
            'Kołek dystansowy pod miejscem bez otworu montażowego, zwierający płytę.',
            'Niewłączony profil EXPO lub XMP — pamięć działa, ale znacznie wolniej niż deklaruje opakowanie.',
          ],
          en: [
            'The monitor plugged into the motherboard rather than the graphics card. Number one on the list, uncontested.',
            'Memory in the first and second slots rather than the second and fourth — it works, but loses half the bandwidth.',
            'A memory module not pressed in until it clicks. This shows up as no display on first boot.',
            'The EPS cable near the processor left unconnected. Without it many boards give no reaction at all.',
            'A forgotten I/O shield — the one part that cannot be added without unscrewing the board again.',
            'A standoff under a spot with no mounting hole, shorting the board.',
            'The EXPO or XMP profile left off — the memory works, but far slower than the box claims.',
          ],
        },
      },
      {
        type: 'callout',
        tone: 'success',
        label: { pl: 'Dobra wiadomość', en: 'The good news' },
        text: {
          pl: 'Żaden z tych błędów niczego nie niszczy. Każdy da się cofnąć, a sześć z siedmiu zajmuje mniej niż minutę.',
          en: 'None of these mistakes damages anything. Every one is reversible, and six of the seven take under a minute.',
        },
      },
    ],
  },
];
