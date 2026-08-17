import type { Socket, Vendor } from './types';

/**
 * CPU platform catalogue.
 *
 * Each socket generates its own page, plus entries in the platform comparison
 * and the compatibility checker. Specifications are the publicly documented
 * ones; the `verdict` fields deliberately say when a platform is no longer the
 * right thing to buy, because a catalogue that recommends everything equally
 * helps nobody.
 */
export const sockets: Socket[] = [
  /* ---------------------------------------------------------------- AMD --- */
  {
    slug: 'am5',
    vendor: 'amd',
    name: 'AM5',
    launched: 2022,
    supportedUntil: 2027,
    memory: ['ddr5'],
    pcie: 'PCIe 5.0',
    coolerMount: 'AM5 / AM4 compatible',
    status: 'current',
    tagline: {
      pl: 'Aktualna platforma AMD z długim wsparciem',
      en: "AMD's current platform with a long support window",
    },
    description: {
      pl: 'AM5 to obecna podstawa desktopów AMD. Obsługuje wyłącznie pamięć DDR5 i linie PCIe 5.0, a AMD publicznie zadeklarowało wsparcie dla tej podstawki co najmniej do 2027 roku. W praktyce oznacza to, że płytę kupioną dziś da się zwykle zaktualizować o nowszy procesor bez wymiany reszty zestawu — czego AM4 dowiodło przez sześć lat.\n\nUkład chłodzenia pozostał zgodny z AM4, więc większość chłodzeń z poprzedniej generacji przykręcisz bez kupowania nowego mocowania. To rzadka i realna oszczędność przy przesiadce.',
      en: "AM5 is AMD's current desktop foundation. It takes DDR5 memory only and exposes PCIe 5.0 lanes, and AMD has publicly committed to supporting the socket through at least 2027. In practice that means a board bought today can usually take a newer CPU later without replacing the rest of the system — exactly what AM4 delivered over six years.\n\nThe cooler mounting pattern carries over from AM4, so most previous-generation coolers bolt straight on without a new bracket. That is a rare and genuinely useful saving when upgrading.",
    },
    verdict: {
      pl: 'Domyślny wybór dla nowego zestawu AMD. Kupuj, jeśli budujesz od zera i chcesz mieć ścieżkę modernizacji.',
      en: 'The default choice for a new AMD build. Pick it if you are starting fresh and want an upgrade path.',
    },
    chipsets: [
      {
        name: 'X870E',
        overclocking: 'full',
        tier: 'flagship',
        note: {
          pl: 'Najwięcej linii PCIe i portów USB4. Sensowne tylko przy wielu dyskach NVMe i kartach rozszerzeń.',
          en: 'The most PCIe lanes and USB4 ports. Only worth it with several NVMe drives and add-in cards.',
        },
      },
      {
        name: 'X670E',
        overclocking: 'full',
        tier: 'flagship',
        note: {
          pl: 'Poprzedni flagowiec, często tańszy od X870E przy zbliżonej funkcjonalności.',
          en: 'The previous flagship, often cheaper than X870E for broadly similar capability.',
        },
      },
      {
        name: 'B850',
        overclocking: 'full',
        tier: 'mainstream',
        note: {
          pl: 'Najrozsądniejszy stosunek ceny do możliwości. Pełne OC procesora i pamięci.',
          en: 'The most sensible balance of price and capability. Full CPU and memory overclocking.',
        },
      },
      {
        name: 'B650',
        overclocking: 'full',
        tier: 'mainstream',
        note: {
          pl: 'Sprawdzony średniak. Do zestawu bez ekstremalnego OC w zupełności wystarczy.',
          en: 'A proven mid-range option. Ample for any build that is not chasing extreme overclocks.',
        },
      },
      {
        name: 'A620',
        overclocking: 'memory',
        tier: 'budget',
        note: {
          pl: 'Najtańsze wejście w AM5. Ograniczone sekcje zasilania — unikaj przy procesorach 105 W i wyżej.',
          en: 'The cheapest way onto AM5. Limited power delivery — avoid with 105 W and higher CPUs.',
        },
      },
    ],
  },
  {
    slug: 'am4',
    vendor: 'amd',
    name: 'AM4',
    launched: 2016,
    supportedUntil: 2025,
    memory: ['ddr4'],
    pcie: 'PCIe 4.0',
    coolerMount: 'AM4',
    status: 'mature',
    tagline: {
      pl: 'Dojrzała, tania platforma z ogromnym wyborem części',
      en: 'A mature, inexpensive platform with a huge parts pool',
    },
    description: {
      pl: 'AM4 przez sześć lat był podstawą desktopów AMD i doczekał się pięciu generacji procesorów. Dziś jego atutem jest cena: płyty, pamięć DDR4 i procesory z drugiej ręki są znacznie tańsze niż odpowiedniki na AM5, a różnica w wydajności w grach bywa mniejsza, niż sugerują same numery generacji.\n\nOgraniczeniem jest brak ścieżki rozwoju. Kupując AM4 dzisiaj, kupujesz zestaw domknięty — kolejny procesor będzie już wymagał wymiany płyty i pamięci.',
      en: "AM4 was AMD's desktop foundation for six years and saw five CPU generations. Its remaining strength is price: boards, DDR4 memory and second-hand CPUs cost far less than their AM5 equivalents, and the gaming performance gap is often narrower than the generation numbers suggest.\n\nThe limitation is that it goes nowhere. Buying AM4 today means buying a closed system — the next CPU upgrade will also mean a new board and new memory.",
    },
    verdict: {
      pl: 'Kupuj tylko przy ostrym budżecie lub gdy masz już części DDR4. Do nowego zestawu z myślą o przyszłości wybierz AM5.',
      en: 'Only worth it on a tight budget or if you already own DDR4 parts. For a future-proof new build, choose AM5.',
    },
    chipsets: [
      {
        name: 'X570',
        overclocking: 'full',
        tier: 'flagship',
        note: {
          pl: 'Jedyny chipset AM4 z PCIe 4.0 na wszystkich liniach. Część płyt ma aktywne chłodzenie mostka.',
          en: 'The only AM4 chipset with PCIe 4.0 throughout. Some boards use an actively cooled chipset fan.',
        },
      },
      {
        name: 'B550',
        overclocking: 'full',
        tier: 'mainstream',
        note: {
          pl: 'Najlepszy wybór na AM4: PCIe 4.0 dla karty i głównego NVMe, bez wentylatora na mostku.',
          en: 'The sweet spot on AM4: PCIe 4.0 for the GPU and primary NVMe, with no chipset fan.',
        },
      },
      {
        name: 'B450',
        overclocking: 'full',
        tier: 'budget',
        note: {
          pl: 'Tani i powszechny, ale tylko PCIe 3.0. Przy nowszych procesorach sprawdź aktualizację BIOS-u.',
          en: 'Cheap and common, but PCIe 3.0 only. Check the BIOS version before pairing it with a newer CPU.',
        },
      },
      {
        name: 'A520',
        overclocking: 'none',
        tier: 'budget',
        note: {
          pl: 'Bez podkręcania procesora. Sensowny wyłącznie w najtańszych zestawach biurowych.',
          en: 'No CPU overclocking. Only sensible in the cheapest office-grade builds.',
        },
      },
    ],
  },
  /* -------------------------------------------------------------- Intel --- */
  {
    slug: 'lga1851',
    vendor: 'intel',
    name: 'LGA1851',
    launched: 2024,
    memory: ['ddr5'],
    pcie: 'PCIe 5.0',
    coolerMount: 'LGA1700 / LGA1851 compatible',
    status: 'current',
    tagline: {
      pl: 'Aktualna podstawka Intela pod Core Ultra',
      en: "Intel's current socket for Core Ultra",
    },
    description: {
      pl: 'LGA1851 to obecna podstawka Intela, wprowadzona wraz z procesorami Core Ultra serii 200. Obsługuje wyłącznie DDR5 i PCIe 5.0, a układ otworów montażowych pozostał zgodny z LGA1700 — chłodzenia z poprzedniej generacji pasują bez adaptera.\n\nMocną stroną platformy jest wbudowany NPU do zadań AI oraz wyraźnie niższy pobór mocy w spoczynku niż u poprzednika. Słabszą — węższa oferta procesorów niż na dojrzałym LGA1700 i krótsza jak dotąd historia aktualizacji BIOS-u.',
      en: "LGA1851 is Intel's current socket, introduced with the Core Ultra 200 series. It supports DDR5 and PCIe 5.0 only, and the mounting hole pattern carries over from LGA1700, so previous-generation coolers fit without an adapter.\n\nIts strengths are an on-package NPU for AI workloads and noticeably lower idle power draw than its predecessor. Its weaknesses are a narrower CPU line-up than the mature LGA1700 and, so far, a shorter BIOS track record.",
    },
    verdict: {
      pl: 'Wybieraj przy nowym zestawie Intela, zwłaszcza jeśli zależy ci na niskim poborze mocy w spoczynku.',
      en: 'The one to pick for a new Intel build, particularly if low idle power matters to you.',
    },
    chipsets: [
      {
        name: 'Z890',
        overclocking: 'full',
        tier: 'flagship',
        note: {
          pl: 'Pełne OC pamięci i procesora, najwięcej linii PCIe 5.0 i portów Thunderbolt 4.',
          en: 'Full CPU and memory overclocking, the most PCIe 5.0 lanes and Thunderbolt 4 ports.',
        },
      },
      {
        name: 'B860',
        overclocking: 'memory',
        tier: 'mainstream',
        note: {
          pl: 'Podkręcanie pamięci bez OC procesora. Rozsądny wybór do większości zestawów.',
          en: 'Memory overclocking without CPU overclocking. A sensible pick for most builds.',
        },
      },
      {
        name: 'H810',
        overclocking: 'none',
        tier: 'budget',
        note: {
          pl: 'Podstawowa funkcjonalność, ograniczona liczba linii. Do biura i prostych zestawów.',
          en: 'Baseline capability with limited lanes. For office and simple builds.',
        },
      },
    ],
  },
  {
    slug: 'lga1700',
    vendor: 'intel',
    name: 'LGA1700',
    launched: 2021,
    supportedUntil: 2024,
    memory: ['ddr4', 'ddr5'],
    pcie: 'PCIe 5.0',
    coolerMount: 'LGA1700',
    status: 'mature',
    tagline: {
      pl: 'Dojrzała platforma z wyborem między DDR4 a DDR5',
      en: 'A mature platform that offers both DDR4 and DDR5',
    },
    description: {
      pl: 'LGA1700 obsłużył trzy generacje procesorów Intela i jest dziś najlepiej przetestowaną platformą tego producenta. Jej cechą wyróżniającą jest wybór pamięci: część płyt przyjmuje DDR4, część DDR5, co pozwala przenieść istniejące moduły do nowszego zestawu i wyraźnie obniżyć koszt.\n\nUwaga praktyczna: żadna płyta nie obsługuje obu typów naraz. Typ pamięci wybierasz w momencie zakupu płyty i później nie da się go zmienić bez jej wymiany.',
      en: "LGA1700 carried three generations of Intel CPUs and is today Intel's most thoroughly tested platform. Its distinguishing feature is the memory choice: some boards take DDR4 and others DDR5, which lets you carry existing modules into a newer build and cut the cost noticeably.\n\nOne practical caveat: no board supports both types at once. You choose the memory type when you buy the board, and changing it later means replacing the board.",
    },
    verdict: {
      pl: 'Dobra okazja, jeśli masz DDR4 lub trafisz na przecenioną płytę. Przy zakupie wszystkiego od nowa LGA1851 daje dłuższą perspektywę.',
      en: 'A good deal if you already own DDR4 or find a discounted board. Buying everything new, LGA1851 offers a longer horizon.',
    },
    chipsets: [
      {
        name: 'Z790',
        overclocking: 'full',
        tier: 'flagship',
        note: {
          pl: 'Pełne OC, dużo linii PCIe. Sprawdź, czy wersja płyty przyjmuje DDR4 czy DDR5.',
          en: 'Full overclocking and plenty of PCIe lanes. Check whether the board revision takes DDR4 or DDR5.',
        },
      },
      {
        name: 'B760',
        overclocking: 'memory',
        tier: 'mainstream',
        note: {
          pl: 'Najpopularniejszy wybór na tej podstawce. Dobre zasilanie w rozsądnej cenie.',
          en: 'The most popular choice on this socket. Solid power delivery at a reasonable price.',
        },
      },
      {
        name: 'H610',
        overclocking: 'none',
        tier: 'budget',
        note: {
          pl: 'Minimum funkcjonalności, często tylko dwa sloty pamięci. Do najtańszych zestawów.',
          en: 'Bare-minimum capability, often with only two memory slots. For the cheapest builds.',
        },
      },
    ],
  },
  {
    slug: 'lga1200',
    vendor: 'intel',
    name: 'LGA1200',
    launched: 2020,
    supportedUntil: 2021,
    memory: ['ddr4'],
    pcie: 'PCIe 4.0',
    coolerMount: 'LGA115x',
    status: 'legacy',
    tagline: {
      pl: 'Platforma wycofana — tylko modernizacja istniejącego zestawu',
      en: 'A retired platform — for upgrading an existing system only',
    },
    description: {
      pl: 'LGA1200 obsłużył dwie generacje procesorów Intela i został zastąpiony przez LGA1700. Nie powstają na niego nowe procesory, a płyty dostępne są głównie z drugiej ręki.\n\nStrona ta istnieje dla osób, które mają już taki zestaw i zastanawiają się nad ostatnią modernizacją w jego ramach — wymiana procesora na mocniejszy model z tej samej podstawki bywa sensowna, zakup całej platformy od zera już nie.',
      en: 'LGA1200 carried two generations of Intel CPUs before being replaced by LGA1700. No new processors are being made for it, and boards are mostly available second-hand.\n\nThis page exists for people who already own such a system and are weighing one last upgrade within it — moving to a stronger CPU on the same socket can make sense, whereas buying the whole platform from scratch does not.',
    },
    verdict: {
      pl: 'Nie kupuj od zera. Sensowny wyłącznie jako ostatni krok modernizacji istniejącego komputera.',
      en: 'Do not buy from scratch. Only sensible as a final upgrade step within an existing machine.',
    },
    chipsets: [
      {
        name: 'Z590',
        overclocking: 'full',
        tier: 'flagship',
        note: {
          pl: 'Pełne OC i PCIe 4.0 przy procesorach 11. generacji.',
          en: 'Full overclocking and PCIe 4.0 with 11th-generation CPUs.',
        },
      },
      {
        name: 'B560',
        overclocking: 'memory',
        tier: 'mainstream',
        note: {
          pl: 'Podkręcanie pamięci, bez OC procesora. Najczęstszy wybór w tej generacji.',
          en: 'Memory overclocking without CPU overclocking. The most common choice in this generation.',
        },
      },
    ],
  },
];

/** Every socket for a vendor, newest platform first. */
export function getSocketsByVendor(vendor: Vendor): Socket[] {
  return sockets.filter((socket) => socket.vendor === vendor);
}

export function getSocket(slug: string): Socket | undefined {
  return sockets.find((socket) => socket.slug === slug);
}

/** Sockets still worth buying into, used to keep recommendations honest. */
export function getCurrentSockets(): Socket[] {
  return sockets.filter((socket) => socket.status === 'current');
}
