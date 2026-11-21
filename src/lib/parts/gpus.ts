import type { Gpu } from './types.ts';
import { priceOf, tierOf } from './pricing.ts';

/**
 * Graphics card catalogue.
 *
 * `recommendedPsu` is the manufacturer's own figure rather than something
 * derived from board power. That is deliberate: modern cards draw brief
 * transient spikes well above their rated wattage, and the vendor number
 * already accounts for them where a simple sum would not.
 *
 * `length` and `slots` exist because they are the two specifications that
 * actually stop a build — a card that does not physically fit the case is a
 * problem no amount of performance makes up for. Where the vendor sells its
 * own card (NVIDIA Founders Edition, AMD reference RX 7600, Intel Arc B580
 * Limited Edition) the figures are that card's; otherwise they are a typical
 * partner model, and the specific model's page is the one to check.
 *
 * `power` is copied from the vendor's own specification page, linked in
 * `source`: NVIDIA's "Supplementary Power Connectors", AMD's "Additional
 * Power Connector" and Intel's reference-card "Power Connectors". AMD sells
 * no reference RX 9000 card, so a partner model can differ — some RX 9070 XT
 * designs use three 8-pin plugs or a 12V-2x6 — and the figure here is the
 * one AMD specifies.
 */
export const gpus: Gpu[] = [
  {
    id: 'rtx-5090',
    category: 'gpu',
    name: 'GeForce RTX 5090',
    brand: 'NVIDIA',
    tier: tierOf('rtx-5090'),
    price: priceOf('rtx-5090'),
    vram: 32,
    tdp: 575,
    recommendedPsu: 1000,
    power: {
      connector: '12v-2x6',
      pcie8pin: 4,
      cableRating: 600,
      source: 'https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/',
    },
    length: 304,
    slots: 2,
    performanceScore: 100,
    targetResolution: '4K',
    url: 'https://www.nvidia.com/en-eu/geforce/graphics-cards/',
    note: {
      pl: 'Najszybsza karta na rynku i wybór do 4K z ray tracingiem przy wysokiej liczbie klatek. NVIDIA zaleca zasilacz 1000 W. Wymiary dotyczą wersji Founders Edition (304 mm, dwa sloty) — karty partnerów bywają dłuższe i grubsze, więc sprawdź konkretny model.',
      en: 'The fastest card available and the pick for 4K with ray tracing at high frame rates. NVIDIA recommends a 1000 W supply. The dimensions are the Founders Edition (304 mm, two slots) — partner cards are often longer and thicker, so check the specific model.',
    },
  },
  {
    id: 'rtx-5080',
    category: 'gpu',
    name: 'GeForce RTX 5080',
    brand: 'NVIDIA',
    tier: tierOf('rtx-5080'),
    price: priceOf('rtx-5080'),
    vram: 16,
    tdp: 360,
    recommendedPsu: 850,
    power: {
      connector: '12v-2x6',
      pcie8pin: 3,
      cableRating: 450,
      source: 'https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5080/',
    },
    length: 304,
    slots: 2,
    performanceScore: 82,
    targetResolution: '4K',
    note: {
      pl: 'Karta pod 4K bez ekstremalnych ustawień. 16 GB pamięci wystarcza dziś wszędzie, ale przy najnowszych tytułach z ray tracingiem bywa ciasno.',
      en: 'Sized for 4K short of extreme settings. Its 16 GB is enough everywhere today, though the newest ray-traced titles can push against it.',
    },
  },
  {
    id: 'rtx-5070-ti',
    category: 'gpu',
    name: 'GeForce RTX 5070 Ti',
    brand: 'NVIDIA',
    tier: tierOf('rtx-5070-ti'),
    price: priceOf('rtx-5070-ti'),
    vram: 16,
    tdp: 300,
    recommendedPsu: 750,
    power: {
      connector: '12v-2x6',
      pcie8pin: 2,
      cableRating: 300,
      source: 'https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5070-family/',
    },
    length: 300,
    slots: 3,
    performanceScore: 70,
    targetResolution: '1440p',
    note: {
      pl: 'Najrozsądniejszy punkt dla 1440p przy wysokim odświeżaniu. 16 GB pamięci daje zapas na kolejne lata i na render 3D.',
      en: 'The most sensible point for high-refresh 1440p. Its 16 GB leaves headroom for the coming years and for 3D rendering.',
    },
  },
  {
    id: 'rtx-5070',
    category: 'gpu',
    name: 'GeForce RTX 5070',
    brand: 'NVIDIA',
    tier: tierOf('rtx-5070'),
    price: priceOf('rtx-5070'),
    vram: 12,
    tdp: 250,
    recommendedPsu: 650,
    power: {
      connector: '12v-2x6',
      pcie8pin: 2,
      cableRating: 300,
      source: 'https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5070-family/',
    },
    length: 242,
    slots: 2,
    performanceScore: 58,
    targetResolution: '1440p',
    note: {
      pl: 'Dobra karta do 1440p z zapasem na skalowanie obrazu. Dwa sloty i krótsza płytka ułatwiają montaż w mniejszych obudowach.',
      en: 'A good 1440p card with headroom for upscaling. Two slots and a shorter board make it easier to fit in smaller cases.',
    },
  },
  {
    id: 'rx-9070-xt',
    category: 'gpu',
    name: 'Radeon RX 9070 XT',
    brand: 'AMD',
    tier: tierOf('rx-9070-xt'),
    price: priceOf('rx-9070-xt'),
    vram: 16,
    tdp: 304,
    recommendedPsu: 750,
    power: {
      connector: '8pin',
      pcie8pin: 2,
      source:
        'https://www.amd.com/en/products/graphics/desktops/radeon/9000-series/amd-radeon-rx-9070xt.html',
    },
    length: 287,
    slots: 3,
    performanceScore: 66,
    targetResolution: '1440p',
    url: 'https://www.amd.com/en/products/graphics/desktops/radeon.html',
    note: {
      pl: 'Mocna alternatywa dla 5070 Ti, zwykle tańsza przy podobnej wydajności w rasteryzacji. Słabsza w ray tracingu.',
      en: 'A strong alternative to the 5070 Ti, usually cheaper for similar rasterisation performance. Weaker in ray tracing.',
    },
  },
  {
    id: 'rtx-5060-ti',
    category: 'gpu',
    name: 'GeForce RTX 5060 Ti 16GB',
    brand: 'NVIDIA',
    tier: tierOf('rtx-5060-ti'),
    price: priceOf('rtx-5060-ti'),
    vram: 16,
    tdp: 180,
    recommendedPsu: 600,
    power: {
      connector: '8pin',
      pcie8pin: 1,
      cableRating: 300,
      source: 'https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5060-family/',
    },
    length: 242,
    slots: 2,
    performanceScore: 44,
    targetResolution: '1440p',
    note: {
      pl: 'Wersja 16 GB jest wyraźnie lepszym wyborem niż 8 GB — różnica w cenie zwraca się w nowszych grach, które przekraczają 8 GB. Karta korzysta z interfejsu PCIe 5.0 x8, więc na płycie z PCIe 3.0 traci część przepustowości.',
      en: 'The 16 GB version is clearly the better buy over the 8 GB — the price difference pays off in newer games that exceed 8 GB. It uses a PCIe 5.0 x8 interface, so it loses some bandwidth on a PCIe 3.0 board.',
    },
  },
  {
    id: 'rx-9060-xt',
    category: 'gpu',
    name: 'Radeon RX 9060 XT 16GB',
    brand: 'AMD',
    tier: tierOf('rx-9060-xt'),
    price: priceOf('rx-9060-xt'),
    vram: 16,
    tdp: 160,
    recommendedPsu: 450,
    power: {
      connector: '8pin',
      pcie8pin: 1,
      source:
        'https://www.amd.com/en/products/graphics/desktops/radeon/9000-series/amd-radeon-rx-9060xt.html',
    },
    length: 250,
    slots: 2,
    performanceScore: 41,
    targetResolution: '1080p',
    note: {
      pl: 'Dobry stosunek pamięci do ceny. 16 GB w tej półce to rzadkość i realna przewaga w nowszych tytułach. Pełne 16 linii PCIe 5.0 sprawia, że dobrze znosi też starsze płyty z PCIe 3.0.',
      en: 'A good memory-to-price ratio. 16 GB at this tier is rare and a genuine advantage in newer titles. A full sixteen PCIe 5.0 lanes mean it copes well with older PCIe 3.0 boards too.',
    },
  },
  {
    id: 'rtx-5060',
    category: 'gpu',
    name: 'GeForce RTX 5060',
    brand: 'NVIDIA',
    tier: tierOf('rtx-5060'),
    price: priceOf('rtx-5060'),
    vram: 8,
    tdp: 145,
    recommendedPsu: 550,
    power: {
      connector: '8pin',
      pcie8pin: 1,
      cableRating: 300,
      source: 'https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5060-family/',
    },
    length: 200,
    slots: 2,
    performanceScore: 34,
    targetResolution: '1080p',
    note: {
      pl: 'Sensowna do 1080p, ale 8 GB pamięci to dziś minimum i w części nowych gier trzeba będzie zejść z ustawieniami tekstur. Interfejs PCIe 5.0 x8 oznacza, że na płycie z PCIe 3.0 braki pamięci odczuwa się mocniej.',
      en: 'Sensible for 1080p, but 8 GB is the bare minimum today and some new games will need their texture settings lowered. Its PCIe 5.0 x8 interface means running short of memory hurts more on a PCIe 3.0 board.',
    },
  },
  {
    id: 'rx-7600',
    category: 'gpu',
    name: 'Radeon RX 7600',
    brand: 'AMD',
    tier: tierOf('rx-7600'),
    price: priceOf('rx-7600'),
    vram: 8,
    tdp: 165,
    recommendedPsu: 550,
    power: {
      connector: '8pin',
      pcie8pin: 1,
      source:
        'https://www.amd.com/en/products/graphics/desktops/radeon/7000-series/amd-radeon-rx-7600.html',
    },
    length: 204,
    slots: 2,
    performanceScore: 28,
    targetResolution: '1080p',
    note: {
      pl: 'Najtańsze rozsądne wejście w granie w 1080p. Do wyższych rozdzielczości zdecydowanie za słaba. Korzysta tylko z ośmiu linii PCIe 4.0, więc na płycie z PCIe 3.0 traci część przepustowości.',
      en: 'The cheapest reasonable entry into 1080p gaming. Decidedly not enough for higher resolutions. It uses only eight PCIe 4.0 lanes, so it loses some bandwidth on a PCIe 3.0 board.',
    },
  },
  {
    id: 'rx-9070',
    category: 'gpu',
    name: 'Radeon RX 9070',
    brand: 'AMD',
    tier: tierOf('rx-9070'),
    price: priceOf('rx-9070'),
    vram: 16,
    tdp: 220,
    recommendedPsu: 650,
    power: {
      connector: '8pin',
      pcie8pin: 2,
      source:
        'https://www.amd.com/en/products/graphics/desktops/radeon/9000-series/amd-radeon-rx-9070.html',
    },
    length: 270,
    slots: 2,
    performanceScore: 56,
    targetResolution: '1440p',
    note: {
      pl: '16 GB w średniej półce i niski pobór mocy. Dobra propozycja do 1440p, jeśli ray tracing nie jest priorytetem.',
      en: '16 GB in the mid-range at low power draw. A good 1440p proposition if ray tracing is not a priority.',
    },
  },
  {
    id: 'rtx-5050',
    category: 'gpu',
    name: 'GeForce RTX 5050',
    brand: 'NVIDIA',
    tier: tierOf('rtx-5050'),
    price: priceOf('rtx-5050'),
    vram: 8,
    tdp: 130,
    recommendedPsu: 550,
    power: {
      connector: '8pin',
      pcie8pin: 1,
      cableRating: 300,
      source: 'https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5050/',
    },
    length: 200,
    slots: 2,
    performanceScore: 26,
    targetResolution: '1080p',
    note: {
      pl: 'Najtańsza karta z aktualnej generacji NVIDII. Do e-sportu w 1080p w porządku, do nowych tytułów AAA już z trudem. Interfejs PCIe 5.0 x8 — na płycie z PCIe 3.0 traci część przepustowości.',
      en: "The cheapest card in NVIDIA's current generation. Fine for esports at 1080p, a struggle for new AAA titles. Its PCIe 5.0 x8 interface loses some bandwidth on a PCIe 3.0 board.",
    },
  },
  {
    id: 'arc-b580',
    category: 'gpu',
    name: 'Arc B580',
    brand: 'Intel',
    tier: tierOf('arc-b580'),
    price: priceOf('arc-b580'),
    vram: 12,
    tdp: 190,
    recommendedPsu: 600,
    power: {
      connector: '8pin',
      pcie8pin: 1,
      source:
        'https://www.intel.com/content/www/us/en/products/sku/241598/intel-arc-b580-graphics/specifications.html',
    },
    length: 272,
    slots: 2,
    performanceScore: 32,
    targetResolution: '1080p',
    url: 'https://www.intel.com/content/www/us/en/products/details/discrete-gpus/arc.html',
    note: {
      pl: '12 GB pamięci w budżetowej półce, co jest tu rzadkością. Sterowniki wyraźnie dojrzały, ale w starszych tytułach wciąż bywają nierówne. Wymaga włączonego Resizable BAR i najlepiej czuje się z nowszym procesorem — ze starszym i słabszym sterownik obciąża CPU bardziej niż u konkurencji. Interfejs PCIe 4.0 x8.',
      en: "12 GB of memory at a budget price, which is rare here. The drivers have matured considerably, though older titles can still be uneven. It needs Resizable BAR enabled and is happiest with a recent processor — with an older, weaker CPU its driver overhead is higher than its rivals'. PCIe 4.0 x8 interface.",
    },
  },
];
