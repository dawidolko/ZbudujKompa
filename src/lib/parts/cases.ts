import type { Case } from './types.ts';

/**
 * Case catalogue.
 *
 * `maxCoolerHeight` and `maxGpuLength` are the two figures that decide whether
 * a build physically goes together, and they are the two most often skipped.
 * Everything else about a case is preference; these two are pass or fail.
 *
 * `volume` is included because it is the honest way to describe "small". A case
 * can be short and deep or tall and narrow, and litres compares them directly
 * where three separate dimensions do not.
 */
export const cases: Case[] = [
  {
    id: 'focus-2',
    category: 'case',
    name: 'Focus 2',
    brand: 'Fractal Design',
    formFactors: ['ATX', 'Micro-ATX', 'Mini-ITX'],
    maxCoolerHeight: 170,
    maxGpuLength: 330,
    radiatorSupport: [240, 280],
    psuFormFactor: 'ATX',
    volume: 45,
    driveBays: 4,
    tier: 'budget',
    price: { min: 250, max: 330 },
    url: 'https://www.fractal-design.com/products/cases/',
    note: {
      pl: 'Dobry przepływ powietrza i sensowne prowadzenie kabli w niskiej cenie. Przy pierwszym składaniu to realna różnica.',
      en: 'Good airflow and sensible cable routing at a low price. On a first build that makes a genuine difference.',
    },
  },
  {
    id: 'north',
    category: 'case',
    name: 'North',
    brand: 'Fractal Design',
    formFactors: ['ATX', 'Micro-ATX', 'Mini-ITX'],
    maxCoolerHeight: 170,
    maxGpuLength: 355,
    radiatorSupport: [240, 280, 360],
    psuFormFactor: 'ATX',
    volume: 47,
    driveBays: 4,
    tier: 'midrange',
    price: { min: 550, max: 700 },
    note: {
      pl: 'Dobry przepływ powietrza w obudowie, która nie wygląda jak sprzęt gamingowy. Front z drewna zamiast szkła i podświetlenia.',
      en: 'Good airflow in a case that does not look like gaming hardware. A wooden front instead of glass and lighting.',
    },
  },
  {
    id: 'define-7',
    category: 'case',
    name: 'Define 7',
    brand: 'Fractal Design',
    formFactors: ['ATX', 'Micro-ATX', 'Mini-ITX'],
    maxCoolerHeight: 185,
    maxGpuLength: 315,
    radiatorSupport: [240, 280, 360, 420],
    psuFormFactor: 'ATX',
    volume: 60,
    driveBays: 14,
    tier: 'high',
    price: { min: 800, max: 1000 },
    note: {
      pl: 'Wyciszona obudowa mieszcząca do czternastu dysków. Najlepszy wybór pod serwer domowy stojący w mieszkaniu.',
      en: 'A sound-dampened case holding up to fourteen drives. The best choice for a home server living in a flat.',
    },
  },
  {
    id: 'terra',
    category: 'case',
    name: 'Terra',
    brand: 'Fractal Design',
    formFactors: ['Mini-ITX'],
    maxCoolerHeight: 77,
    maxGpuLength: 322,
    radiatorSupport: [],
    psuFormFactor: 'SFX',
    volume: 11,
    driveBays: 2,
    tier: 'high',
    price: { min: 750, max: 950 },
    note: {
      pl: 'Poniżej 11 litrów przy zachowaniu miejsca na kartę dwuslotową. Chłodzenie wyłącznie niskoprofilowe — maksymalnie 77 mm.',
      en: 'Under 11 litres while still fitting a two-slot card. Low-profile cooling only — 77 mm maximum.',
    },
  },
  {
    id: 'node-304',
    category: 'case',
    name: 'Node 304',
    brand: 'Fractal Design',
    formFactors: ['Mini-ITX'],
    maxCoolerHeight: 165,
    maxGpuLength: 310,
    radiatorSupport: [240],
    psuFormFactor: 'ATX',
    volume: 19,
    driveBays: 6,
    tier: 'value',
    price: { min: 400, max: 520 },
    note: {
      pl: 'Kompaktowa obudowa mieszcząca sześć dysków i zwykły zasilacz ATX — rzadkie połączenie w tym formacie.',
      en: 'A compact case that holds six drives and a standard ATX supply — a rare combination in this form factor.',
    },
  },
  {
    id: 'lancool-216',
    category: 'case',
    name: 'Lancool 216',
    brand: 'Lian Li',
    formFactors: ['ATX', 'Micro-ATX', 'Mini-ITX'],
    maxCoolerHeight: 180,
    maxGpuLength: 392,
    radiatorSupport: [240, 280, 360],
    psuFormFactor: 'ATX',
    volume: 55,
    driveBays: 4,
    tier: 'midrange',
    price: { min: 480, max: 620 },
    url: 'https://lian-li.com/product-category/pc-cases/',
    note: {
      pl: 'Dwa wentylatory 160 mm z przodu w zestawie. Mieści najdłuższe karty graficzne, łącznie z RTX 5090.',
      en: 'Two 160 mm front fans included. It fits the longest graphics cards, the RTX 5090 among them.',
    },
  },
];
