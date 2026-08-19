import type { Ram } from './types.ts';

/**
 * Memory catalogue.
 *
 * Every kit here is two modules rather than one or four, and that is a
 * recommendation rather than an accident: two modules populate both channels,
 * which is worth 10 to 20 per cent of frame rate, while four sticks often stop
 * a controller holding its rated profile.
 *
 * `height` is included because it is the specification that causes physical
 * conflicts: tall heat spreaders foul large air coolers, and the two are
 * frequently bought without checking one against the other.
 */
export const ramKits: Ram[] = [
  /* --------------------------------------------------------------- DDR5 --- */
  {
    id: 'flare-x5-32-6000',
    category: 'ram',
    name: 'Flare X5 32 GB (2×16) DDR5-6000 CL30',
    brand: 'G.Skill',
    type: 'ddr5',
    capacity: 32,
    modules: 2,
    speed: 6000,
    casLatency: 30,
    height: 33,
    tier: 'midrange',
    price: { min: 420, max: 560 },
    url: 'https://www.gskill.com/qvl',
    note: {
      pl: 'DDR5-6000 CL30 to punkt, w którym Ryzen pracuje najefektywniej — powyżej kontroler przechodzi w tryb dzielony i wydajność spada.',
      en: 'DDR5-6000 CL30 is where Ryzen runs most efficiently — above it the controller drops into a divided mode and performance falls.',
    },
  },
  {
    id: 'fury-beast-32-6000',
    category: 'ram',
    name: 'Fury Beast 32 GB (2×16) DDR5-6000 CL36',
    brand: 'Kingston',
    type: 'ddr5',
    capacity: 32,
    modules: 2,
    speed: 6000,
    casLatency: 36,
    height: 35,
    tier: 'value',
    price: { min: 350, max: 470 },
    url: 'https://www.kingston.com/en/memory/search',
    note: {
      pl: 'Tańsza alternatywa o nieco wyższych opóźnieniach. Różnica w grach jest w granicach kilku procent.',
      en: 'A cheaper alternative with slightly higher latency. The difference in games is within a few per cent.',
    },
  },
  {
    id: 'vengeance-64-6000',
    category: 'ram',
    name: 'Vengeance 64 GB (2×32) DDR5-6000 CL30',
    brand: 'Corsair',
    type: 'ddr5',
    capacity: 64,
    modules: 2,
    speed: 6000,
    casLatency: 30,
    height: 34,
    tier: 'high',
    price: { min: 850, max: 1150 },
    url: 'https://www.corsair.com/memory-finder',
    note: {
      pl: '64 GB to próg, powyżej którego montaż 4K i render przestają korzystać z pliku wymiany. Do grania to nadmiar.',
      en: '64 GB is the threshold above which 4K editing and rendering stop hitting the swap file. For gaming it is excess.',
    },
  },
  {
    id: 'fury-beast-16-5600',
    category: 'ram',
    name: 'Fury Beast 16 GB (2×8) DDR5-5600 CL36',
    brand: 'Kingston',
    type: 'ddr5',
    capacity: 16,
    modules: 2,
    speed: 5600,
    casLatency: 36,
    height: 35,
    tier: 'budget',
    price: { min: 200, max: 280 },
    note: {
      pl: '16 GB to dziś praktyczne minimum. Wystarczy do grania, ale przy przeglądarce w tle bywa ciasno.',
      en: '16 GB is the practical minimum today. Enough for gaming, though it gets tight with a browser open alongside.',
    },
  },
  {
    id: 'lowprofile-32-6000',
    category: 'ram',
    name: 'Vengeance LPX Low Profile 32 GB (2×16) DDR5-6000',
    brand: 'Corsair',
    type: 'ddr5',
    capacity: 32,
    modules: 2,
    speed: 6000,
    casLatency: 36,
    height: 22,
    tier: 'midrange',
    price: { min: 400, max: 540 },
    note: {
      pl: 'Niskie moduły bez wysokich radiatorów — konieczne pod dużymi wieżami powietrznymi i w obudowach Mini-ITX.',
      en: 'Low-profile modules without tall heat spreaders — necessary under large air towers and in Mini-ITX cases.',
    },
  },
  /* --------------------------------------------------------------- DDR4 --- */
  {
    id: 'fury-beast-16-3200',
    category: 'ram',
    name: 'Fury Beast 16 GB (2×8) DDR4-3200 CL16',
    brand: 'Kingston',
    type: 'ddr4',
    capacity: 16,
    modules: 2,
    speed: 3200,
    casLatency: 16,
    height: 35,
    tier: 'budget',
    price: { min: 170, max: 250 },
    note: {
      pl: 'DDR4-3200 CL16 to najlepszy punkt cenowy dla Ryzenów na AM4 — szybsze moduły dają już niewiele.',
      en: 'DDR4-3200 CL16 is the sweet spot for Ryzen on AM4 — faster kits add very little beyond it.',
    },
  },
  {
    id: 'vengeance-32-3600',
    category: 'ram',
    name: 'Vengeance LPX 32 GB (2×16) DDR4-3600 CL18',
    brand: 'Corsair',
    type: 'ddr4',
    capacity: 32,
    modules: 2,
    speed: 3600,
    casLatency: 18,
    height: 34,
    tier: 'value',
    price: { min: 300, max: 400 },
    note: {
      pl: 'Rozsądne 32 GB na DDR4. Przy AM4 warto sprawdzić, czy płyta utrzyma 3600 MHz stabilnie.',
      en: 'A sensible 32 GB on DDR4. On AM4 it is worth checking the board holds 3600 MHz stably.',
    },
  },
];
