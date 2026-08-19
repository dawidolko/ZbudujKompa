import type { Cooler } from './types.ts';

/**
 * Cooler catalogue.
 *
 * `wattage` is the sustained heat this cooler removes while staying reasonably
 * quiet, not an absolute ceiling. That distinction matters: almost any cooler
 * will keep almost any CPU below its thermal limit if you let the fan scream,
 * so a number that ignores noise describes a machine nobody wants to sit next
 * to.
 *
 * `ramClearance` is recorded for air coolers because a large tower overhanging
 * the first memory slot is one of the most common physical conflicts in a
 * build, and it is invisible until the parts are in your hands.
 */
export const coolers: Cooler[] = [
  {
    id: 'assassin-x-120',
    category: 'cooler',
    name: 'Assassin X 120 R SE',
    brand: 'Thermalright',
    kind: 'air',
    sockets: ['am4', 'am5', 'lga1700', 'lga1851'],
    wattage: 130,
    height: 155,
    noise: 28,
    ramClearance: 38,
    tier: 'budget',
    price: { min: 70, max: 110 },
    url: 'https://www.thermalright.com/',
    note: {
      pl: 'Tańsze i cichsze od chłodzenia z zestawu, a montaż zajmuje kilka minut. Do procesorów 65 W w zupełności wystarczy.',
      en: 'Cheaper and quieter than a boxed cooler, and it fits in minutes. Entirely sufficient for 65 W processors.',
    },
  },
  {
    id: 'peerless-assassin-120',
    category: 'cooler',
    name: 'Peerless Assassin 120 SE',
    brand: 'Thermalright',
    kind: 'air',
    sockets: ['am4', 'am5', 'lga1700', 'lga1851'],
    wattage: 220,
    height: 155,
    noise: 31,
    ramClearance: 43,
    tier: 'value',
    price: { min: 140, max: 200 },
    note: {
      pl: 'Podwójna wieża dorównująca chłodnicom 240 mm za ułamek ceny. Najlepszy stosunek wydajności do ceny na rynku.',
      en: 'A dual tower matching 240 mm liquid coolers for a fraction of the price. The best performance per złoty available.',
    },
  },
  {
    id: 'nh-d15-g2',
    category: 'cooler',
    name: 'NH-D15 G2',
    brand: 'Noctua',
    kind: 'air',
    sockets: ['am5', 'lga1700', 'lga1851'],
    wattage: 280,
    height: 168,
    noise: 30,
    ramClearance: 32,
    tier: 'high',
    price: { min: 650, max: 800 },
    url: 'https://noctua.at/en/products/cpu-cooler-retail',
    note: {
      pl: 'Najmocniejsze chłodzenie powietrzne na rynku. Waży 1,5 kg i zasłania pierwszy slot pamięci — sprawdź wysokość modułów.',
      en: 'The strongest air cooler available. It weighs 1.5 kg and overhangs the first memory slot — check your module height.',
    },
  },
  {
    id: 'nh-l12s',
    category: 'cooler',
    name: 'NH-L12S',
    brand: 'Noctua',
    kind: 'air',
    sockets: ['am4', 'am5', 'lga1700', 'lga1851'],
    wattage: 95,
    height: 70,
    noise: 26,
    ramClearance: 48,
    tier: 'midrange',
    price: { min: 300, max: 380 },
    note: {
      pl: 'Niskoprofilowe chłodzenie zaprojektowane pod obudowy, w których wieża się nie mieści. 70 mm wysokości.',
      en: 'A low-profile cooler designed for cases where a tower will not fit. 70 mm tall.',
    },
  },
  {
    id: 'liquid-freezer-iii-240',
    category: 'cooler',
    name: 'Liquid Freezer III 240',
    brand: 'Arctic',
    kind: 'aio',
    sockets: ['am4', 'am5', 'lga1700', 'lga1851'],
    wattage: 250,
    radiatorSize: 240,
    noise: 32,
    tier: 'midrange',
    price: { min: 320, max: 420 },
    url: 'https://www.arctic.de/en/Cooling/CPU-Cooler',
    note: {
      pl: 'Chłodnica 240 mm w rozsądnej cenie. Uwalnia miejsce wokół gniazda procesora i wyrzuca ciepło poza obudowę.',
      en: 'A 240 mm radiator at a sensible price. It frees the space around the socket and exhausts heat outside the case.',
    },
  },
  {
    id: 'liquid-freezer-iii-360',
    category: 'cooler',
    name: 'Liquid Freezer III 360',
    brand: 'Arctic',
    kind: 'aio',
    sockets: ['am4', 'am5', 'lga1700', 'lga1851'],
    wattage: 350,
    radiatorSize: 360,
    noise: 34,
    tier: 'high',
    price: { min: 420, max: 550 },
    note: {
      pl: 'Chłodnica 360 mm utrzymuje taktowania przy godzinach obciążenia wszystkich rdzeni. Wymaga obudowy z miejscem na 360 mm.',
      en: 'A 360 mm radiator holds clocks through hours of all-core load. It needs a case with room for 360 mm.',
    },
  },
];
