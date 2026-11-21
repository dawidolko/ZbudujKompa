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
    supportedUntil: 2029,
    memory: ['ddr5'],
    pcie: 'PCIe 5.0',
    coolerMount: 'AM5 / AM4 compatible',
    status: 'current',
    tagline: {
      pl: 'Aktualna platforma AMD z długim wsparciem',
      en: "AMD's current platform with a long support window",
    },
    description: {
      pl: 'AM5 to obecna podstawa desktopów AMD. Obsługuje wyłącznie pamięć DDR5 i linie PCIe 5.0, a AMD na Computeksie w maju 2026 roku przedłużyło deklarację wsparcia tej podstawki do 2029 roku. Na AM5 pracują Ryzeny 7000, 8000G i 9000, a według dokumentacji AMD trafią na nią także procesory Zen 6 — w listopadzie 2026 jeszcze niewydane, według doniesień spodziewane w 2027 roku. W praktyce płytę kupioną dziś da się zwykle zaktualizować o nowszy procesor bez wymiany reszty zestawu — czego AM4 dowiodło przez sześć lat.\n\nUkład chłodzenia pozostał zgodny z AM4, więc większość chłodzeń z poprzedniej generacji przykręcisz bez kupowania nowego mocowania. To rzadka i realna oszczędność przy przesiadce.\n\nDwie praktyczne uwagi na 2026 rok. Pamięć DDR5 zdrożała w ciągu roku o ponad 300 procent, więc w budżecie zestawu AM5 to dziś jedna z największych pozycji — sprawdź jej cenę, zanim wybierzesz platformę. Płyty B650 i X670 z pierwszych partii mogą wymagać aktualizacji BIOS-u, zanim uruchomią Ryzena 9000; najwygodniej, gdy płyta ma przycisk BIOS Flashback, który pozwala wgrać BIOS bez procesora.',
      en: "AM5 is AMD's current desktop foundation. It takes DDR5 memory only and exposes PCIe 5.0 lanes, and at Computex in May 2026 AMD extended its support commitment for the socket through 2029. It runs Ryzen 7000, 8000G and 9000, and AMD's documentation confirms that Zen 6 processors are coming to it as well — still unreleased in November 2026, and expected in 2027 according to reports. In practice a board bought today can usually take a newer CPU later without replacing the rest of the system — exactly what AM4 delivered over six years.\n\nThe cooler mounting pattern carries over from AM4, so most previous-generation coolers bolt straight on without a new bracket. That is a rare and genuinely useful saving when upgrading.\n\nTwo practical notes for 2026. DDR5 memory rose by more than 300 per cent in a year, so it is now one of the largest items in an AM5 budget — check its price before choosing the platform. Early B650 and X670 boards may need a BIOS update before they will start a Ryzen 9000; it is easiest when the board has a BIOS Flashback button, which flashes the BIOS without a CPU fitted.",
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
        name: 'X870',
        overclocking: 'full',
        tier: 'flagship',
        note: {
          pl: 'USB4 obowiązkowo oraz PCIe 5.0 dla karty i dysku, przy mniejszej liczbie linii niż X870E.',
          en: 'USB4 as standard and PCIe 5.0 for the graphics card and a drive, with fewer lanes than X870E.',
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
          pl: 'Najrozsądniejszy stosunek ceny do możliwości. Pełne OC procesora i pamięci, obowiązkowe złącze M.2 PCIe 5.0; slot karty to PCIe 4.0 lub 5.0 zależnie od płyty.',
          en: 'The most sensible balance of price and capability. Full CPU and memory overclocking and a mandatory PCIe 5.0 M.2 slot; the graphics slot is PCIe 4.0 or 5.0 depending on the board.',
        },
      },
      {
        name: 'B650',
        overclocking: 'full',
        tier: 'mainstream',
        note: {
          pl: 'Sprawdzony średniak. Do zestawu bez ekstremalnego OC w zupełności wystarczy. Slot karty to PCIe 4.0 (5.0 tylko w B650E), co dla dzisiejszych kart nie stanowi ograniczenia.',
          en: 'A proven mid-range option. Ample for any build that is not chasing extreme overclocks. The graphics slot is PCIe 4.0 (5.0 only on B650E), which does not hold back current cards.',
        },
      },
      {
        name: 'A620',
        overclocking: 'memory',
        tier: 'budget',
        note: {
          pl: 'Najtańsze wejście w AM5. Tylko PCIe 4.0 i ograniczone sekcje zasilania — unikaj przy procesorach 105 W i wyżej.',
          en: 'The cheapest way onto AM5. PCIe 4.0 only and limited power delivery — avoid with 105 W and higher CPUs.',
        },
      },
    ],
  },
  {
    slug: 'am4',
    vendor: 'amd',
    name: 'AM4',
    launched: 2016,
    memory: ['ddr4'],
    pcie: 'PCIe 4.0',
    coolerMount: 'AM4',
    status: 'mature',
    tagline: {
      pl: 'Dojrzała, tania platforma z ogromnym wyborem części',
      en: 'A mature, inexpensive platform with a huge parts pool',
    },
    description: {
      pl: 'AM4 przez sześć lat był podstawą desktopów AMD i doczekał się pięciu generacji procesorów. Dziś jego atutem jest cena: płyty, pamięć DDR4 i procesory z drugiej ręki są znacznie tańsze niż odpowiedniki na AM5, a różnica w wydajności w grach bywa mniejsza, niż sugerują same numery generacji.\n\nOgraniczeniem jest brak ścieżki rozwoju. Kupując AM4 dzisiaj, kupujesz zestaw domknięty — kolejny procesor będzie już wymagał wymiany płyty i pamięci.\n\nBudowa na AM4 w 2026 roku: najmocniejsze procesory to Ryzeny 5000, a PCIe 4.0 działa tylko na płytach B550 i X570 z Ryzenami 3000 i 5000 — poza APU (modele G), Ryzenami 5 5500 i 7 5700 oraz serią Ryzen 4000, które mają PCIe 3.0. Płyty B450 i A520 też mają PCIe 3.0, co mocniej odczuwają karty z interfejsem x8, takie jak RTX 5060, RTX 5060 Ti i RX 7600 — zwłaszcza wersje z 8 GB pamięci. Starsze płyty przed montażem Ryzena 5000 potrzebują aktualizacji BIOS-u. Przy obecnych cenach DDR5 przeniesienie posiadanych modułów DDR4 to najmocniejszy argument za tą platformą.',
      en: "AM4 was AMD's desktop foundation for six years and saw five CPU generations. Its remaining strength is price: boards, DDR4 memory and second-hand CPUs cost far less than their AM5 equivalents, and the gaming performance gap is often narrower than the generation numbers suggest.\n\nThe limitation is that it goes nowhere. Buying AM4 today means buying a closed system — the next CPU upgrade will also mean a new board and new memory.\n\nBuilding on AM4 in 2026: the strongest CPUs are the Ryzen 5000 series, and PCIe 4.0 works only on B550 and X570 boards with Ryzen 3000 and 5000 CPUs — except the APUs (G models), the Ryzen 5 5500 and Ryzen 7 5700 and the Ryzen 4000 series, which are PCIe 3.0. B450 and A520 boards are PCIe 3.0 too, which hurts cards with an x8 interface such as the RTX 5060, RTX 5060 Ti and RX 7600 more — especially the 8 GB versions. Older boards need a BIOS update before taking a Ryzen 5000. At current DDR5 prices, carrying over DDR4 modules you already own is the strongest argument for this platform.",
    },
    verdict: {
      pl: 'Kupuj przy ostrym budżecie lub gdy masz już pamięć DDR4 — przy cenach DDR5 z 2026 roku to realna oszczędność. Do nowego zestawu z myślą o przyszłości wybierz AM5.',
      en: 'Worth it on a tight budget or if you already own DDR4 — at 2026 DDR5 prices that is a real saving. For a future-proof new build, choose AM5.',
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
      pl: 'LGA1851 to obecna podstawka Intela, wprowadzona w 2024 roku wraz z procesorami Core Ultra serii 200S, a w marcu 2026 odświeżona serią Core Ultra 200S Plus (Core Ultra 5 250K Plus i Core Ultra 7 270K Plus, z oficjalną obsługą DDR5-7200). Intel deklaruje zgodność z każdą płytą z chipsetem serii 800, ale płyta wyprodukowana przed premierą może najpierw wymagać aktualizacji BIOS-u — sprawdź listę obsługiwanych procesorów na stronie producenta. Obsługuje wyłącznie DDR5 i PCIe 5.0, a układ otworów montażowych pozostał zgodny z LGA1700 — chłodzenia z poprzedniej generacji pasują bez adaptera.\n\nMocną stroną platformy jest wbudowany NPU do zadań AI oraz wyraźnie niższy pobór mocy w spoczynku niż u poprzednika. Słabszą — węższa oferta procesorów niż na dojrzałym LGA1700 i brak ścieżki rozwoju: seria Plus jest według doniesień ostatnią na tej podstawce, a następna generacja Intela (Core Ultra 400, Nova Lake) ma przejść na nową podstawkę LGA1954. W listopadzie 2026 te procesory nie są jeszcze w sprzedaży; doniesienia wskazują na początek 2027 roku.',
      en: "LGA1851 is Intel's current socket, introduced in 2024 with the Core Ultra 200S series and refreshed in March 2026 with the Core Ultra 200S Plus series (Core Ultra 5 250K Plus and Core Ultra 7 270K Plus, with official DDR5-7200 support). Intel states they work on every 800-series board, but a board made before the launch may first need a BIOS update — check the CPU support list on the maker's site. It supports DDR5 and PCIe 5.0 only, and the mounting hole pattern carries over from LGA1700, so previous-generation coolers fit without an adapter.\n\nIts strengths are an on-package NPU for AI workloads and noticeably lower idle power draw than its predecessor. Its weaknesses are a narrower CPU line-up than the mature LGA1700 and no upgrade path: the Plus series is reported to be the last on this socket, and Intel's next generation (Core Ultra 400, Nova Lake) is due to move to a new LGA1954 socket. In November 2026 those processors are not on sale yet; reports point to early 2027.",
    },
    verdict: {
      pl: 'Wybieraj przy nowym zestawie Intela, zwłaszcza jeśli zależy ci na niskim poborze mocy w spoczynku. Kupuj procesor, który wystarczy na lata — wymiany na nowszą generację w tej samej płycie raczej nie będzie.',
      en: 'The one to pick for a new Intel build, particularly if low idle power matters to you. Buy a CPU that will last — a newer generation on the same board is unlikely.',
    },
    chipsets: [
      {
        name: 'Z890',
        overclocking: 'full',
        tier: 'flagship',
        note: {
          pl: 'Pełne OC pamięci i procesora oraz najwięcej linii PCIe i portów USB z chipsetu.',
          en: 'Full CPU and memory overclocking, and the most chipset PCIe lanes and USB ports.',
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
    memory: ['ddr4', 'ddr5'],
    pcie: 'PCIe 5.0',
    coolerMount: 'LGA1700',
    status: 'mature',
    tagline: {
      pl: 'Dojrzała platforma z wyborem między DDR4 a DDR5',
      en: 'A mature platform that offers both DDR4 and DDR5',
    },
    description: {
      pl: 'LGA1700 obsłużył trzy generacje procesorów Intela i jest dziś najlepiej przetestowaną platformą tego producenta. Jej cechą wyróżniającą jest wybór pamięci: część płyt przyjmuje DDR4, część DDR5, co pozwala przenieść istniejące moduły do nowszego zestawu i wyraźnie obniżyć koszt.\n\nUwaga praktyczna: żadna płyta nie obsługuje obu typów naraz. Typ pamięci wybierasz w momencie zakupu płyty i później nie da się go zmienić bez jej wymiany.\n\nWażne przy procesorach 13. i 14. generacji (zwłaszcza Core i7 i i9): z powodu znanej niestabilności Intel wydał poprawiony mikrokod. Zanim zainstalujesz system, wgraj BIOS z mikrokodem 0x12F lub nowszym. Intel wydłużył też o dwa lata gwarancję na objęte problemem procesory w wersji BOX.',
      en: "LGA1700 carried three generations of Intel CPUs and is today Intel's most thoroughly tested platform. Its distinguishing feature is the memory choice: some boards take DDR4 and others DDR5, which lets you carry existing modules into a newer build and cut the cost noticeably.\n\nOne practical caveat: no board supports both types at once. You choose the memory type when you buy the board, and changing it later means replacing the board.\n\nImportant with 13th and 14th gen processors (especially Core i7 and i9): Intel issued corrected microcode for a known instability. Before installing the system, flash a BIOS with microcode 0x12F or newer. Intel also extended the warranty on affected boxed processors by two years.",
    },
    verdict: {
      pl: 'Dobra okazja, jeśli masz DDR4 lub trafisz na przecenioną płytę — przy cenach DDR5 z 2026 roku płyta DDR4 to najtańszy sposób na nowy zestaw Intela. Żadna z obecnych podstawek Intela nie ma już przed sobą nowej generacji procesorów, więc LGA1851 wygrywa poborem mocy i nowszymi funkcjami, a nie perspektywą rozbudowy.',
      en: 'A good deal if you already own DDR4 or find a discounted board — at 2026 DDR5 prices a DDR4 board is the cheapest way into a new Intel build. Neither current Intel socket has another CPU generation ahead of it, so LGA1851 wins on power draw and newer features rather than on upgrade prospects.',
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
