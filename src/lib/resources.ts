import type { Localized } from './types';

/**
 * External resources.
 *
 * Official manufacturer documentation, support tools and reputable independent
 * testing, grouped so a reader can go from a guide straight to the primary
 * source. Everything here points at a first-party page or a well-established
 * independent outlet — no affiliate links, no resellers, no aggregators that
 * wrap someone else's content in advertising.
 *
 * Links rot. Each entry records what it is for, so a dead link can be replaced
 * with the current equivalent rather than silently dropped.
 */

export type ResourceCategory =
  | 'cpu'
  | 'motherboard'
  | 'gpu'
  | 'cooling'
  | 'memory'
  | 'psu'
  | 'case'
  | 'storage'
  | 'os'
  | 'tools'
  | 'testing';

export type Resource = {
  /** Organisation or publication name. Not translated. */
  name: string;
  url: string;
  category: ResourceCategory;
  /** What this link is actually good for. */
  note: Localized;
  /** Marks first-party documentation, which outranks everything else. */
  official?: boolean;
};

export const resources: Resource[] = [
  /* ------------------------------------------------------------- CPUs --- */
  {
    name: 'AMD — Processor Specifications',
    url: 'https://www.amd.com/en/products/specifications/processors',
    category: 'cpu',
    official: true,
    note: {
      pl: 'Oficjalna baza specyfikacji wszystkich procesorów AMD: podstawka, TDP, obsługiwana pamięć, liczba linii PCIe. Pierwsze miejsce, w które warto zajrzeć przy weryfikacji parametrów.',
      en: "AMD's official specification database for every processor: socket, TDP, supported memory, PCIe lane count. The first place to check any parameter.",
    },
  },
  {
    name: 'Intel ARK',
    url: 'https://ark.intel.com/',
    category: 'cpu',
    official: true,
    note: {
      pl: 'Odpowiednik bazy AMD po stronie Intela. Pozwala porównać kilka procesorów obok siebie i sprawdzić zgodność z chipsetem.',
      en: "Intel's equivalent database. It compares several processors side by side and confirms chipset compatibility.",
    },
  },
  {
    name: 'AMD — Socket AM5 Overview',
    url: 'https://www.amd.com/en/products/processors/desktops/ryzen.html',
    category: 'cpu',
    official: true,
    note: {
      pl: 'Strona produktowa procesorów Ryzen wraz z informacjami o platformie AM5 i deklarowanym okresie wsparcia.',
      en: 'The Ryzen product page, including AM5 platform information and the stated support window.',
    },
  },

  /* ------------------------------------------------------ Motherboards --- */
  {
    name: 'ASUS — Support and Manuals',
    url: 'https://www.asus.com/support/',
    category: 'motherboard',
    official: true,
    note: {
      pl: 'Instrukcje płyt głównych, listy zgodności procesorów (CPU support list) i aktualizacje BIOS. Instrukcja płyty zawiera dokładny schemat pinów panelu przedniego.',
      en: 'Motherboard manuals, CPU support lists and BIOS updates. The manual contains the exact front panel pin diagram for your board.',
    },
  },
  {
    name: 'MSI — Support',
    url: 'https://www.msi.com/support',
    category: 'motherboard',
    official: true,
    note: {
      pl: 'Sterowniki, BIOS i listy zgodności pamięci (QVL) dla płyt MSI.',
      en: 'Drivers, BIOS and memory compatibility lists (QVL) for MSI boards.',
    },
  },
  {
    name: 'Gigabyte — Support',
    url: 'https://www.gigabyte.com/Support',
    category: 'motherboard',
    official: true,
    note: {
      pl: 'Dokumentacja i aktualizacje dla płyt Gigabyte i Aorus.',
      en: 'Documentation and updates for Gigabyte and Aorus boards.',
    },
  },
  {
    name: 'ASRock — Support',
    url: 'https://www.asrock.com/support/',
    category: 'motherboard',
    official: true,
    note: {
      pl: 'Instrukcje i BIOS dla płyt ASRock, w tym szeroka oferta Mini-ITX.',
      en: 'Manuals and BIOS for ASRock boards, including their wide Mini-ITX range.',
    },
  },

  /* ---------------------------------------------------------- Cooling --- */
  {
    name: 'Noctua — Compatibility Centre',
    url: 'https://noctua.at/en/products/cpu-cooler-retail',
    category: 'cooling',
    official: true,
    note: {
      pl: 'Wyszukiwarka zgodności chłodzeń z podstawkami i pamięcią. Podaje też wysokość chłodzenia, którą trzeba zestawić ze specyfikacją obudowy.',
      en: 'Compatibility finder for sockets and memory clearance. It also lists cooler height, which you match against the case specification.',
    },
  },
  {
    name: 'be quiet! — Cooler Compatibility',
    url: 'https://www.bequiet.com/en/cpucooler',
    category: 'cooling',
    official: true,
    note: {
      pl: 'Katalog chłodzeń z filtrem podstawki i deklarowaną wydajnością w watach.',
      en: 'Cooler catalogue with a socket filter and rated wattage figures.',
    },
  },
  {
    name: 'Arctic — Cooling',
    url: 'https://www.arctic.de/en/Cooling/CPU-Cooler',
    category: 'cooling',
    official: true,
    note: {
      pl: 'Chłodzenia powietrzne i wodne AiO wraz z pełną specyfikacją mocowań.',
      en: 'Air and AiO liquid coolers with full mounting specifications.',
    },
  },
  {
    name: 'Thermalright',
    url: 'https://www.thermalright.com/',
    category: 'cooling',
    official: true,
    note: {
      pl: 'Producent chłodzeń o wysokim stosunku wydajności do ceny, w tym popularnej serii Peerless Assassin.',
      en: 'Cooler manufacturer with strong performance per złoty, including the popular Peerless Assassin range.',
    },
  },

  /* ----------------------------------------------------------- Memory --- */
  {
    name: 'Kingston — Memory Search',
    url: 'https://www.kingston.com/en/memory/search',
    category: 'memory',
    official: true,
    note: {
      pl: 'Wyszukiwarka pamięci zgodnej z konkretną płytą główną. Przydatna, gdy nie masz pewności co do generacji DDR.',
      en: 'Finds memory compatible with a specific motherboard. Useful when you are unsure which DDR generation a board takes.',
    },
  },
  {
    name: 'G.Skill — Configurator',
    url: 'https://www.gskill.com/qvl',
    category: 'memory',
    official: true,
    note: {
      pl: 'Listy zgodności (QVL) modułów G.Skill z płytami głównymi, z podziałem na platformy AMD i Intel.',
      en: 'QVL compatibility lists for G.Skill kits by motherboard, split by AMD and Intel platform.',
    },
  },
  {
    name: 'Corsair — Memory Finder',
    url: 'https://www.corsair.com/memory-finder',
    category: 'memory',
    official: true,
    note: {
      pl: 'Dobór pamięci pod konkretny model płyty głównej.',
      en: 'Memory selection for a specific motherboard model.',
    },
  },

  /* ------------------------------------------------------------- GPUs --- */
  {
    name: 'NVIDIA — GeForce Graphics Cards',
    url: 'https://www.nvidia.com/en-eu/geforce/graphics-cards/',
    category: 'gpu',
    official: true,
    note: {
      pl: 'Specyfikacje kart GeForce: zalecana moc zasilacza, wymagane złącza zasilania i wymiary referencyjne.',
      en: 'GeForce specifications: recommended PSU wattage, required power connectors and reference dimensions.',
    },
  },
  {
    name: 'AMD — Radeon Graphics',
    url: 'https://www.amd.com/en/products/graphics/desktops/radeon.html',
    category: 'gpu',
    official: true,
    note: {
      pl: 'Specyfikacje kart Radeon wraz z wymaganiami dotyczącymi zasilania.',
      en: 'Radeon specifications, including power requirements.',
    },
  },
  {
    name: 'TechPowerUp — GPU Database',
    url: 'https://www.techpowerup.com/gpudb/',
    category: 'gpu',
    official: false,
    note: {
      pl: 'Niezależna baza wszystkich kart graficznych: pobór mocy, wymiary, liczba slotów, wymagane złącza. Najpełniejsze źródło do sprawdzenia, czy karta zmieści się w obudowie.',
      en: 'Independent database of every graphics card: power draw, dimensions, slot count, required connectors. The most complete source for checking whether a card fits a case.',
    },
  },

  /* ------------------------------------------------------ Power supply --- */
  {
    name: 'Seasonic — Wattage Calculator',
    url: 'https://seasonic.com/wattage-calculator/',
    category: 'psu',
    official: true,
    note: {
      pl: 'Kalkulator mocy zasilacza od producenta jednostek. Dobra weryfikacja własnych obliczeń.',
      en: 'A PSU wattage calculator from a supply manufacturer. A useful cross-check against your own arithmetic.',
    },
  },
  {
    name: 'Cybenetics — PSU Database',
    url: 'https://www.cybenetics.com/index.php?option=power-supplies',
    category: 'psu',
    official: false,
    note: {
      pl: 'Niezależne laboratorium mierzące sprawność i poziom hałasu zasilaczy. Certyfikaty Cybenetics mówią o jednostce więcej niż samo 80 Plus, bo obejmują też hałas.',
      en: 'An independent laboratory measuring PSU efficiency and noise. Cybenetics ratings say more about a unit than 80 Plus alone, because they cover noise as well.',
    },
  },
  {
    name: 'be quiet! — Power Supplies',
    url: 'https://www.bequiet.com/en/powersupply',
    category: 'psu',
    official: true,
    note: {
      pl: 'Zasilacze z pełną specyfikacją okablowania i zgodności ze standardem ATX 3.1.',
      en: 'Power supplies with full cable specifications and ATX 3.1 conformance details.',
    },
  },

  /* ------------------------------------------------------------ Cases --- */
  {
    name: 'Fractal Design',
    url: 'https://www.fractal-design.com/products/cases/',
    category: 'case',
    official: true,
    note: {
      pl: 'Obudowy z dokładnie podanymi limitami: maksymalna wysokość chłodzenia, długość karty graficznej i obsługiwane rozmiary chłodnic.',
      en: 'Cases with precisely stated limits: maximum cooler height, graphics card length and supported radiator sizes.',
    },
  },
  {
    name: 'Lian Li',
    url: 'https://lian-li.com/product-category/pc-cases/',
    category: 'case',
    official: true,
    note: {
      pl: 'Obudowy ATX i Mini-ITX z pełnymi rysunkami technicznymi i wymiarami.',
      en: 'ATX and Mini-ITX cases with complete technical drawings and dimensions.',
    },
  },

  /* ---------------------------------------------------------- Storage --- */
  {
    name: 'Samsung — SSD',
    url: 'https://semiconductor.samsung.com/consumer-storage/internal-ssd/',
    category: 'storage',
    official: true,
    note: {
      pl: 'Dyski NVMe i SATA wraz z narzędziem Samsung Magician do aktualizacji firmware.',
      en: 'NVMe and SATA drives, plus the Samsung Magician tool for firmware updates.',
    },
  },
  {
    name: 'Crucial — System Scanner',
    url: 'https://www.crucial.com/store/systemscanner',
    category: 'storage',
    official: true,
    note: {
      pl: 'Skaner wykrywający, jaka pamięć i jakie dyski pasują do istniejącego komputera. Przydatny przy modernizacji.',
      en: 'A scanner that detects which memory and drives fit an existing computer. Useful when upgrading.',
    },
  },

  /* ------------------------------------------------------ Operating system --- */
  {
    name: 'Microsoft — Windows 11 Download',
    url: 'https://www.microsoft.com/software-download/windows11',
    category: 'os',
    official: true,
    note: {
      pl: 'Oficjalne narzędzie Media Creation Tool i obrazy ISO. Pobieraj wyłącznie stąd — nośniki z innych źródeł bywają zmodyfikowane.',
      en: 'The official Media Creation Tool and ISO images. Download only from here — media from other sources is sometimes modified.',
    },
  },
  {
    name: 'Microsoft — Windows 11 System Requirements',
    url: 'https://www.microsoft.com/windows/windows-11-specifications',
    category: 'os',
    official: true,
    note: {
      pl: 'Wymagania Windows 11, w tym TPM 2.0 i Secure Boot, które trzeba włączyć w BIOS-ie przed instalacją.',
      en: 'Windows 11 requirements, including the TPM 2.0 and Secure Boot settings you enable in the BIOS before installing.',
    },
  },
  {
    name: 'Rufus',
    url: 'https://rufus.ie/',
    category: 'os',
    official: true,
    note: {
      pl: 'Narzędzie do tworzenia nośników instalacyjnych USB. Pozwala też przygotować nośnik Windows 11 z pominięciem wymogu TPM i konta Microsoft.',
      en: 'A tool for creating bootable USB installers. It can also prepare Windows 11 media that bypasses the TPM requirement and the Microsoft account prompt.',
    },
  },
  {
    name: 'Ventoy',
    url: 'https://www.ventoy.net/',
    category: 'os',
    official: true,
    note: {
      pl: 'Pozwala trzymać kilka obrazów ISO na jednym pendrive i wybierać je przy starcie. Wygodne, gdy testujesz różne systemy.',
      en: 'Keeps several ISO images on one USB stick and lets you pick at boot. Convenient when trying different systems.',
    },
  },
  {
    name: 'Ubuntu',
    url: 'https://ubuntu.com/download/desktop',
    category: 'os',
    official: true,
    note: {
      pl: 'Najpopularniejsza dystrybucja Linuksa dla początkujących, z pełnym wsparciem sprzętowym większości podzespołów.',
      en: 'The most common Linux distribution for newcomers, with broad hardware support out of the box.',
    },
  },
  {
    name: 'Fedora Workstation',
    url: 'https://fedoraproject.org/workstation/',
    category: 'os',
    official: true,
    note: {
      pl: 'Dystrybucja z nowszymi wersjami jądra, co bywa istotne przy bardzo świeżym sprzęcie.',
      en: 'A distribution with newer kernels, which matters with very recent hardware.',
    },
  },

  /* ------------------------------------------------------------ Tools --- */
  {
    name: 'CPU-Z',
    url: 'https://www.cpuid.com/softwares/cpu-z.html',
    category: 'tools',
    official: true,
    note: {
      pl: 'Pokazuje faktyczne taktowania procesora i pamięci. Pierwsze narzędzie do sprawdzenia, czy profil EXPO lub XMP faktycznie działa.',
      en: 'Shows the real CPU and memory clocks. The first tool for confirming an EXPO or XMP profile actually took effect.',
    },
  },
  {
    name: 'HWiNFO',
    url: 'https://www.hwinfo.com/',
    category: 'tools',
    official: true,
    note: {
      pl: 'Szczegółowy podgląd temperatur, napięć i obrotów wentylatorów. Najlepsze narzędzie do diagnozy przegrzewania.',
      en: 'Detailed temperature, voltage and fan speed monitoring. The best tool for diagnosing thermal problems.',
    },
  },
  {
    name: 'MemTest86',
    url: 'https://www.memtest86.com/',
    category: 'tools',
    official: true,
    note: {
      pl: 'Test pamięci uruchamiany z pendrive, poza systemem. Obowiązkowy, gdy komputer losowo się zawiesza lub restartuje.',
      en: 'A memory test that runs from a USB stick, outside the operating system. Essential when a machine hangs or reboots at random.',
    },
  },
  {
    name: 'Cinebench',
    url: 'https://www.maxon.net/en/cinebench',
    category: 'tools',
    official: true,
    note: {
      pl: 'Test obciążeniowy procesora. Pozwala sprawdzić, czy chłodzenie utrzymuje taktowania przy pełnym obciążeniu wszystkich rdzeni.',
      en: 'A CPU stress test. Use it to check whether the cooler holds clocks under sustained all-core load.',
    },
  },
  {
    name: 'CrystalDiskInfo',
    url: 'https://crystalmark.info/en/software/crystaldiskinfo/',
    category: 'tools',
    official: true,
    note: {
      pl: 'Odczyt parametrów SMART dysków — stan zdrowia, temperatura, liczba zapisanych danych.',
      en: 'Reads drive SMART data — health, temperature and total bytes written.',
    },
  },

  /* ---------------------------------------------------------- Testing --- */
  {
    name: 'Gamers Nexus',
    url: 'https://gamersnexus.net/',
    category: 'testing',
    official: false,
    note: {
      pl: 'Niezależne, metodyczne testy chłodzeń, obudów i zasilaczy. Publikują pełną metodykę, więc wyniki da się zweryfikować.',
      en: 'Independent, methodical testing of coolers, cases and power supplies. They publish their methodology, so results can be checked.',
    },
  },
  {
    name: "Tom's Hardware",
    url: 'https://www.tomshardware.com/',
    category: 'testing',
    official: false,
    note: {
      pl: 'Recenzje podzespołów i poradniki zakupowe aktualizowane wraz z premierami.',
      en: 'Component reviews and buying guides, updated as new parts launch.',
    },
  },
  {
    name: 'TechPowerUp',
    url: 'https://www.techpowerup.com/review/',
    category: 'testing',
    official: false,
    note: {
      pl: 'Szczegółowe testy kart graficznych i zasilaczy, z pomiarami poboru mocy i poziomu hałasu.',
      en: 'Detailed graphics card and PSU reviews, with power draw and noise measurements.',
    },
  },
];

export function getResourcesByCategory(category: ResourceCategory): Resource[] {
  return resources.filter((resource) => resource.category === category);
}

/** Categories that actually have entries, in a sensible reading order. */
export const resourceCategoryOrder: ResourceCategory[] = [
  'cpu',
  'motherboard',
  'memory',
  'gpu',
  'cooling',
  'psu',
  'case',
  'storage',
  'os',
  'tools',
  'testing',
];
