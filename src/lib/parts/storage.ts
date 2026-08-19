import type { Storage } from './types.ts';

/**
 * Storage catalogue.
 *
 * PCIe generation is recorded because it decides which M.2 slot a drive should
 * go in, not because the speed difference is felt: a Gen 5 drive in a Gen 4
 * slot works fine and simply runs at Gen 4 speeds. Beyond about 3 GB/s the
 * difference stops being noticeable in games and desktop use anyway — sustained
 * write speed and endurance matter far more for real work.
 */
export const storage: Storage[] = [
  {
    id: 'nv3-1tb',
    category: 'storage',
    name: 'NV3 1 TB',
    brand: 'Kingston',
    kind: 'nvme',
    capacity: 1000,
    readSpeed: 6000,
    pcieGen: 4,
    tbw: 320,
    tier: 'budget',
    price: { min: 200, max: 280 },
    note: {
      pl: '1 TB to praktyczne minimum — dwie duże gry potrafią zająć połowę tej przestrzeni.',
      en: '1 TB is the practical minimum — two large games can fill half of it.',
    },
  },
  {
    id: '990-evo-plus-2tb',
    category: 'storage',
    name: '990 EVO Plus 2 TB',
    brand: 'Samsung',
    kind: 'nvme',
    capacity: 2000,
    readSpeed: 7250,
    pcieGen: 4,
    tbw: 1200,
    tier: 'midrange',
    price: { min: 480, max: 620 },
    url: 'https://semiconductor.samsung.com/consumer-storage/internal-ssd/',
    note: {
      pl: '2 TB pozwala trzymać bibliotekę gier bez ciągłego odinstalowywania. Najrozsądniejsza pojemność na dziś.',
      en: '2 TB is enough to keep a game library without constantly uninstalling. The most sensible capacity today.',
    },
  },
  {
    id: '990-pro-2tb',
    category: 'storage',
    name: '990 PRO 2 TB',
    brand: 'Samsung',
    kind: 'nvme',
    capacity: 2000,
    readSpeed: 7450,
    pcieGen: 4,
    tbw: 1200,
    tier: 'high',
    price: { min: 650, max: 850 },
    note: {
      pl: 'Wysoka prędkość zapisu ciągłego ma znaczenie przy pracy na dużych plikach wideo. Do grania to nadpłata.',
      en: 'High sustained write speed matters when working with large video files. For gaming it is overpaying.',
    },
  },
  {
    id: 'wd-blue-4tb-hdd',
    category: 'storage',
    name: 'Blue 4 TB HDD',
    brand: 'Western Digital',
    kind: 'hdd',
    capacity: 4000,
    readSpeed: 180,
    tier: 'value',
    price: { min: 380, max: 480 },
    note: {
      pl: 'Talerzowy dysk do archiwum i kopii zapasowych. Nie instaluj na nim systemu — różnica w płynności jest ogromna.',
      en: 'A spinning drive for archives and backups. Do not install the system on it — the responsiveness difference is enormous.',
    },
  },
];
