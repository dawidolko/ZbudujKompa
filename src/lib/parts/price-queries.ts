/**
 * How each part is searched for.
 *
 * `q` is the text sent to a shop search and to the price refresh. `must` and
 * `not` decide whether an offer's title really is this part: every `must` entry
 * has to appear, as a whole token, and no `not` entry may. An array inside `must`
 * means any one of those spellings is enough. Whole tokens are what keep a
 * Ryzen 5 7600X out of a search for the 7600.
 */
export type PriceQuery = {
  q: string;
  must: (string | string[])[];
  not?: string[];
};

const mhz = (speed: number) => [`${speed}`, `${speed}MHz`, `${speed}MT/s`];
const cl = (latency: number) => [`CL${latency}`, `C${latency}`];
const tb = (size: number) => [`${size} TB`, `${size * 1000} GB`];

export const priceQueries: Record<string, PriceQuery> = {
  /* ---------------------------------------------------------------- CPUs --- */
  'ryzen-5-7600': { q: 'AMD Ryzen 5 7600', must: ['Ryzen 5', '7600'] },
  'ryzen-7-7800x3d': { q: 'AMD Ryzen 7 7800X3D', must: ['7800X3D'] },
  'ryzen-7-9700x': { q: 'AMD Ryzen 7 9700X', must: ['9700X'] },
  'ryzen-9-9950x': { q: 'AMD Ryzen 9 9950X', must: ['9950X'] },
  'ryzen-7-8700g': { q: 'AMD Ryzen 7 8700G', must: ['8700G'] },
  'ryzen-5-5600': { q: 'AMD Ryzen 5 5600', must: ['Ryzen 5', '5600'] },
  'ryzen-7-5800x3d': { q: 'AMD Ryzen 7 5800X3D', must: ['5800X3D'] },
  'core-ultra-5-245k': { q: 'Intel Core Ultra 5 245K', must: ['Ultra 5', '245K'] },
  'core-ultra-7-265k': { q: 'Intel Core Ultra 7 265K', must: ['Ultra 7', '265K'] },
  'core-i5-14400f': { q: 'Intel Core i5-14400F', must: ['14400F'] },
  'core-i5-14600k': { q: 'Intel Core i5-14600K', must: ['14600K'] },
  'ryzen-5-9600x': { q: 'AMD Ryzen 5 9600X', must: ['9600X'] },
  'ryzen-9-7900x3d': { q: 'AMD Ryzen 9 7900X3D', must: ['7900X3D'] },
  'ryzen-9-9950x3d': { q: 'AMD Ryzen 9 9950X3D', must: ['9950X3D'] },
  'ryzen-5-5500': { q: 'AMD Ryzen 5 5500', must: ['Ryzen 5', '5500'] },
  'ryzen-7-5700x': { q: 'AMD Ryzen 7 5700X', must: ['5700X'] },
  'core-ultra-9-285k': { q: 'Intel Core Ultra 9 285K', must: ['Ultra 9', '285K'] },
  'core-i7-14700k': { q: 'Intel Core i7-14700K', must: ['14700K'] },
  'core-i3-14100f': { q: 'Intel Core i3-14100F', must: ['14100F'] },

  /* -------------------------------------------------------- Motherboards --- */
  'b650m-pro-rs': { q: 'ASRock B650M Pro RS', must: ['B650M', 'Pro RS'], not: ['WiFi'] },
  'tuf-b650-plus-wifi': {
    q: 'ASUS TUF Gaming B650-PLUS WiFi',
    must: ['TUF', 'B650 PLUS', 'WiFi'],
  },
  'x870e-tomahawk': { q: 'MSI MAG X870E TOMAHAWK WIFI', must: ['X870E', 'TOMAHAWK'], not: ['MAX'] },
  'b650i-lightning': { q: 'ASRock B650I Lightning WiFi', must: ['B650I', 'Lightning'] },
  'b550-a-pro': { q: 'MSI B550-A PRO', must: ['B550 A', 'PRO'] },
  'z890-tomahawk': { q: 'MSI MAG Z890 TOMAHAWK WIFI', must: ['Z890', 'TOMAHAWK'] },
  'b860m-pro': { q: 'MSI PRO B860M-A WIFI', must: ['B860M A', 'WIFI'], not: ['DDR4'] },
  'prime-b760m-a': {
    q: 'ASUS PRIME B760M-A',
    must: ['PRIME', 'B760M A'],
    not: ['WIFI', 'D4', 'II'],
  },
  'b760m-ddr4': { q: 'MSI PRO B760M-P DDR4', must: ['B760M P', 'DDR4'] },
  'x670e-hero': { q: 'ASUS ROG Crosshair X670E Hero', must: ['Crosshair', 'X670E', 'Hero'] },
  'b850-tomahawk': { q: 'MSI MAG B850 TOMAHAWK WIFI', must: ['B850', 'TOMAHAWK'], not: ['MAX'] },
  'a620m-hdv': { q: 'ASRock A620M-HDV/M.2', must: ['A620M HDV'] },
  'z890-aorus-elite': {
    q: 'Gigabyte Z890 AORUS ELITE WIFI7',
    must: ['Z890', 'AORUS ELITE', 'WIFI7'],
    not: ['PLUS', 'ICE'],
  },

  /* -------------------------------------------------------------- Memory --- */
  'flare-x5-32-6000': {
    q: 'G.Skill Flare X5 32GB DDR5-6000 CL30',
    must: ['Flare X5', '32GB', mhz(6000), cl(30)],
  },
  'fury-beast-32-6000': {
    q: 'Kingston Fury Beast 32GB DDR5-6000 CL36',
    must: ['Fury Beast', '32GB', mhz(6000), cl(36)],
    not: ['DDR4'],
  },
  'vengeance-64-6000': {
    q: 'Corsair Vengeance 64GB DDR5-6000 CL30',
    must: ['Vengeance', '64GB', mhz(6000), cl(30)],
  },
  'fury-beast-16-5600': {
    q: 'Kingston Fury Beast 16GB DDR5-5600 CL36',
    must: ['Fury Beast', '16GB', mhz(5600), cl(36)],
    not: ['DDR4'],
  },
  'lowprofile-32-6000': {
    q: 'Corsair Vengeance Low Profile 32GB DDR5-6000',
    must: ['Vengeance', 'Low Profile', '32GB', mhz(6000)],
  },
  'fury-beast-16-3200': {
    q: 'Kingston Fury Beast 16GB DDR4-3200 CL16',
    must: ['Fury Beast', '16GB', 'DDR4', mhz(3200), cl(16)],
  },
  'vengeance-32-3600': {
    q: 'Corsair Vengeance LPX 32GB DDR4-3600 CL18',
    must: ['Vengeance LPX', '32GB', mhz(3600), cl(18)],
  },
  'trident-z5-32-6400': {
    q: 'G.Skill Trident Z5 Neo 32GB DDR5-6400 CL32',
    must: ['Trident Z5', 'Neo', '32GB', mhz(6400), cl(32)],
  },
  'fury-renegade-64-6000': {
    q: 'Kingston Fury Renegade 64GB DDR5-6000 CL32',
    must: ['Fury Renegade', '64GB', mhz(6000), cl(32)],
  },
  'crucial-32-5600': {
    q: 'Crucial Pro 32GB DDR5-5600 CL46',
    must: ['Crucial', 'Pro', '32GB', mhz(5600)],
  },

  /* ------------------------------------------------------ Graphics cards --- */
  'rtx-5090': { q: 'GeForce RTX 5090', must: ['RTX 5090'], not: ['5090 D'] },
  'rtx-5080': { q: 'GeForce RTX 5080', must: ['RTX 5080'], not: ['SUPER'] },
  'rtx-5070-ti': { q: 'GeForce RTX 5070 Ti', must: ['RTX 5070 Ti'], not: ['SUPER'] },
  'rtx-5070': { q: 'GeForce RTX 5070 12GB', must: ['RTX 5070'], not: ['Ti', 'SUPER'] },
  'rx-9070-xt': { q: 'Radeon RX 9070 XT', must: ['RX 9070 XT'] },
  'rtx-5060-ti': { q: 'GeForce RTX 5060 Ti 16GB', must: ['RTX 5060 Ti', '16GB'] },
  'rx-9060-xt': { q: 'Radeon RX 9060 XT 16GB', must: ['RX 9060 XT', '16GB'] },
  'rtx-5060': { q: 'GeForce RTX 5060 8GB', must: ['RTX 5060'], not: ['Ti'] },
  'rx-7600': { q: 'Radeon RX 7600 8GB', must: ['RX 7600'], not: ['XT'] },
  'rtx-5070-ti-super': { q: 'GeForce RTX 5070 Ti SUPER', must: ['RTX 5070 Ti SUPER'] },
  'rx-9070': { q: 'Radeon RX 9070 16GB', must: ['RX 9070'], not: ['XT', 'GRE'] },
  'rtx-5080-super': { q: 'GeForce RTX 5080 SUPER', must: ['RTX 5080 SUPER'] },
  'rtx-5050': { q: 'GeForce RTX 5050', must: ['RTX 5050'] },
  'arc-b580': { q: 'Intel Arc B580', must: ['Arc', 'B580'] },

  /* ------------------------------------------------------------- Storage --- */
  'nv3-1tb': { q: 'Kingston NV3 1TB', must: ['NV3', tb(1)] },
  '990-evo-plus-2tb': { q: 'Samsung 990 EVO Plus 2TB', must: ['990 EVO Plus', tb(2)] },
  '990-pro-2tb': { q: 'Samsung 990 PRO 2TB', must: ['990 PRO', tb(2)], not: ['Heatsink'] },
  'wd-blue-4tb-hdd': { q: 'WD Blue 4TB WD40EZAX', must: ['Blue', tb(4)], not: ['SSD', 'NVMe'] },
  't705-2tb': { q: 'Crucial T705 2TB', must: ['T705', tb(2)] },
  'nv3-2tb': { q: 'Kingston NV3 2TB', must: ['NV3', tb(2)] },
  'sn850x-4tb': { q: 'SN850X 4TB', must: ['SN850X', tb(4)], not: ['Heatsink'] },
  'ironwolf-8tb': { q: 'Seagate IronWolf 8TB', must: ['IronWolf', tb(8)], not: ['Pro'] },

  /* ------------------------------------------------------- Power supplies --- */
  'system-power-10-550': {
    q: 'be quiet! System Power 10 550W',
    must: ['System Power 10', '550W'],
  },
  'pure-power-12m-650': { q: 'be quiet! Pure Power 12 M 650W', must: ['Pure Power 12 M', '650W'] },
  'pure-power-12m-750': { q: 'be quiet! Pure Power 12 M 750W', must: ['Pure Power 12 M', '750W'] },
  'focus-gx-850': { q: 'Seasonic Focus GX-850', must: ['Focus', 'GX', '850W'] },
  'prime-tx-1000': { q: 'Seasonic PRIME TX-1000', must: ['PRIME', 'TX', '1000W'] },
  sf750: { q: 'Corsair SF750', must: ['Corsair', ['SF750', 'SF 750W', 'SF-750']] },
  rm850x: { q: 'Corsair RM850x', must: ['RM850x'], not: ['SHIFT'] },
  'mpg-a1000g': { q: 'MSI MPG A1000G PCIE5', must: ['A1000G'] },
  sf850l: { q: 'Corsair SF850L', must: ['SF850L'] },
  'system-power-11-750': {
    q: 'be quiet! System Power 11 750W',
    must: ['System Power 11', '750W'],
  },

  /* --------------------------------------------------------------- Cases --- */
  'focus-2': { q: 'Fractal Design Focus 2', must: ['Fractal', 'Focus 2'] },
  north: { q: 'Fractal Design North', must: ['Fractal', 'North'], not: ['XL'] },
  'define-7': {
    q: 'Fractal Design Define 7',
    must: ['Fractal', 'Define 7'],
    not: ['Compact', 'Nano', 'Mini', 'XL'],
  },
  terra: { q: 'Fractal Design Terra', must: ['Fractal', 'Terra'] },
  'node-304': { q: 'Fractal Design Node 304', must: ['Fractal', 'Node 304'] },
  'lancool-216': { q: 'Lian Li Lancool 216', must: ['Lancool 216'] },
  'pop-air': {
    q: 'Fractal Design Pop Air',
    must: ['Fractal', 'Pop Air'],
    not: ['Mini', 'XL', 'Pop 2'],
  },
  'o11-dynamic-evo': { q: 'Lian Li O11 Dynamic EVO', must: ['O11', 'EVO'], not: ['XL', 'RGB'] },
  'meshify-2-compact': {
    q: 'Fractal Design Meshify 2 Compact',
    must: ['Meshify 2 Compact'],
    not: ['Lite'],
  },
  'ncase-m1': { q: 'NCASE M1 V6.1', must: ['NCASE', 'M1'] },

  /* ------------------------------------------------------------- Coolers --- */
  'assassin-x-120': { q: 'Thermalright Assassin X 120 R SE', must: ['Assassin X 120'] },
  'peerless-assassin-120': {
    q: 'Thermalright Peerless Assassin 120 SE',
    must: ['Peerless Assassin 120 SE'],
  },
  'nh-d15-g2': { q: 'Noctua NH-D15 G2', must: ['NH D15 G2'] },
  'nh-l12s': { q: 'Noctua NH-L12S', must: ['NH L12S'] },
  'liquid-freezer-iii-240': {
    q: 'Arctic Liquid Freezer III 240',
    must: ['Liquid Freezer III 240'],
    not: ['Pro'],
  },
  'liquid-freezer-iii-360': {
    q: 'Arctic Liquid Freezer III 360',
    must: ['Liquid Freezer III 360'],
    not: ['Pro'],
  },
  'phantom-spirit-120': {
    q: 'Thermalright Phantom Spirit 120 SE',
    must: ['Phantom Spirit 120 SE'],
  },
  'nh-u12a': { q: 'Noctua NH-U12A', must: ['NH U12A'] },
  ak620: { q: 'DeepCool AK620 Digital', must: ['AK620 Digital'], not: ['Pro', 'SE'] },
  'kraken-360': { q: 'NZXT Kraken 360 RGB', must: ['Kraken 360 RGB'], not: ['Elite', 'Plus'] },
  'liquid-freezer-iii-420': {
    q: 'Arctic Liquid Freezer III 420',
    must: ['Liquid Freezer III 420'],
    not: ['Pro'],
  },
  'stock-wraith': { q: 'AMD Wraith Stealth', must: ['Wraith Stealth'] },
};
