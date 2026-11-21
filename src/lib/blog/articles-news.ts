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
    updated: '2026-11-21',
    perishable: true,
    author: 'Dawid Olko',
    tags: ['amd', 'am5', 'platformy'],
    related: ['ile-naprawde-potrzeba-vram'],
    title: {
      pl: 'AMD przedłuża wsparcie AM5 do 2029 roku',
      en: 'AMD extends AM5 support through 2029',
    },
    summary: {
      pl: 'Producent wydłużył deklarowane życie podstawki o dwa lata. Co to znaczy w praktyce dla kogoś, kto składa zestaw dzisiaj.',
      en: 'The manufacturer has added two years to its commitment to the socket. What that means in practice for someone building today.',
    },
    body: [
      {
        type: 'paragraph',
        text: {
          pl: 'Na Computeksie pod koniec maja 2026 roku AMD przedłużyło deklarację wsparcia podstawki AM5 do 2029 roku — dwa lata dłużej niż wcześniej zapowiadany rok 2027. Dla osoby planującej zakup ma to konkretne znaczenie.',
          en: 'At Computex at the end of May 2026, AMD extended its support commitment for the AM5 socket through 2029 — two years beyond the 2027 it had promised before. For someone planning a purchase this has concrete implications.',
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
      {
        type: 'callout',
        tone: 'info',
        label: { pl: 'Aktualizacja: 21 listopada 2026', en: 'Update: 21 November 2026' },
        text: {
          pl: 'Deklaracja wsparcia AM5 do 2029 roku obowiązuje, a dokumentacja producenta potwierdza, że kolejna generacja Ryzenów (Zen 6) trafi na tę podstawkę. Procesory te nie są jeszcze w sprzedaży — doniesienia wskazują na 2027 rok. Po stronie Intela LGA1851 dostał w marcu 2026 odświeżenie Core Ultra 200S Plus, które ma być ostatnią generacją na tej podstawce.',
          en: 'The commitment to support AM5 through 2029 stands, and AMD's documentation confirms that the next Ryzen generation (Zen 6) will use the socket. Those processors are not on sale yet — reporting points to 2027. On the Intel side, LGA1851 received the Core Ultra 200S Plus refresh in March 2026, which is expected to be the last generation for that socket.',
        },
      },
    ],
  },
  {
    slug: 'ceny-pamieci-rosna',
    category: 'news',
    published: '2026-07-08',
    updated: '2026-11-21',
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
          pl: 'Zapotrzebowanie na pamięć ze strony infrastruktury AI przełożyło się na ceny modułów konsumenckich. Popularny zestaw 32 GB DDR5-6000 kosztuje dziś o kilkadziesiąt procent więcej niż jeszcze kilka miesięcy temu.',
          en: 'Memory demand from AI infrastructure has fed through into consumer module prices. A popular 32 GB DDR5-6000 kit now costs tens of per cent more than it did only a few months ago.',
        },
      },
      {
        type: 'paragraph',
        text: {
          pl: 'Praktyczny wniosek jest niewdzięczny: nie da się przewidzieć, kiedy ceny wrócą. Jeśli składasz zestaw teraz, kup pamięć teraz — czekanie na spadek jest zakładem, nie strategią. Jeśli masz działający komputer, rozbudowa pamięci to akurat ten moment, żeby ją odłożyć.',
          en: 'The practical conclusion is unsatisfying: there is no way to predict when prices return. If you are building now, buy the memory now — waiting for a fall is a bet, not a strategy. If you have a working machine, a memory upgrade is precisely the thing to postpone.',
        },
      },
      {
        type: 'callout',
        tone: 'warning',
        label: { pl: 'Aktualizacja: 21 listopada 2026', en: 'Update: 21 November 2026' },
        text: {
          pl: 'Wzrosty okazały się znacznie większe niż w lipcu: według danych Ceneo, które w listopadzie przeanalizował PurePC, pamięć DDR5 zdrożała w ciągu roku o ponad 300 procent. DDR4 też podrożała, ale mniej. Jeśli masz działające moduły DDR4, płyta AM4 albo LGA1700 w wersji DDR4 pozwoli je zachować — to dziś znacznie mocniejszy argument niż jeszcze rok temu.',
          en: 'The rises turned out far larger than in July: according to Ceneo data analysed by PurePC in November, DDR5 prices rose by more than 300 per cent in a year. DDR4 went up too, but by less. If you have working DDR4 modules, an AM4 board or a DDR4 version of an LGA1700 board lets you keep them — a much stronger argument today than it was a year ago.',
        },
      },
    ],
  },
  {
    slug: 'nowy-standard-zasilaczy',
    category: 'news',
    published: '2026-06-02',
    updated: '2026-11-21',
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
          pl: 'Realna zmiana dotyczy złącza. 12V-2x6 zastępuje 12VHPWR wersją ze skróconymi stykami sygnałowymi przy niezmienionym rozkładzie pinów, więc kable obu standardów są zamienne. Efekt jest taki, że przy niedociśniętej wtyczce styki sygnałowe rozłączają się pierwsze i karta nie pobiera pełnej mocy przez częściowy styk — a to właśnie ten mechanizm odpowiadał za przypadki przegrzewania złącz.',
          en: 'The real change is the connector. 12V-2x6 replaces 12VHPWR with a version that has shortened sense pins and an unchanged pin-out, so cables for the two are interchangeable. The effect is that with a partially seated plug the sense pins disconnect first and the card does not draw full power through incomplete contact — and it was exactly that mechanism behind the reports of connectors overheating.',
        },
      },
      {
        type: 'callout',
        tone: 'warning',
        label: { pl: 'Nadal obowiązuje', en: 'Still applies' },
        text: {
          pl: 'Bez względu na standard, wtyczkę trzeba wcisnąć do końca aż do kliknięcia i sprawdzić, czy jest równo osadzona na całej szerokości. Unikaj też ostrego zginania kabla tuż przy wtyczce. Nowe złącze zmniejsza skutki błędu, ale go nie eliminuje.',
          en: 'Whatever the standard, the plug has to be pushed fully home until it clicks, and checked for even seating across its whole width. Avoid sharp bends in the cable right next to the plug, too. The new connector reduces the consequences of a mistake but does not remove it.',
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
