import type { Psu } from './types.ts';

/**
 * Power supply catalogue.
 *
 * `warranty` is listed alongside the efficiency rating because it is the more
 * honest signal of the two. An 80 Plus badge describes efficiency and nothing
 * else — an unbranded unit can carry one and still be a poor choice — whereas
 * a manufacturer only offers ten years on a design they expect to survive it.
 *
 * `atx31` matters for a specific, current failure: modern graphics cards draw
 * brief spikes far above their rated power, and an older supply's protection
 * circuits read those as a fault and shut the machine down mid-game.
 */
export const psus: Psu[] = [
  {
    id: 'system-power-10-550',
    category: 'psu',
    name: 'System Power 10 550 W',
    brand: 'be quiet!',
    wattage: 550,
    efficiency: 'Bronze',
    modular: 'no',
    formFactor: 'ATX',
    atx31: true,
    warranty: 3,
    tier: 'budget',
    price: { min: 220, max: 300 },
    url: 'https://www.bequiet.com/en/powersupply',
    note: {
      pl: 'Najtańszy zasilacz, który można polecić bez zastrzeżeń. Kable nieodłączane, więc nadmiar trzeba gdzieś schować.',
      en: 'The cheapest supply that can be recommended without caveats. Non-modular, so the excess cable has to go somewhere.',
    },
  },
  {
    id: 'pure-power-12m-650',
    category: 'psu',
    name: 'Pure Power 12 M 650 W',
    brand: 'be quiet!',
    wattage: 650,
    efficiency: 'Gold',
    modular: 'full',
    formFactor: 'ATX',
    atx31: true,
    warranty: 10,
    tier: 'value',
    price: { min: 380, max: 480 },
    note: {
      pl: 'Dziesięcioletnia gwarancja i pełna modularność. Rozsądny wybór do zestawu ze średnią kartą graficzną.',
      en: 'A ten-year warranty and full modularity. A sensible choice for a build with a mid-range graphics card.',
    },
  },
  {
    id: 'pure-power-12m-750',
    category: 'psu',
    name: 'Pure Power 12 M 750 W',
    brand: 'be quiet!',
    wattage: 750,
    efficiency: 'Gold',
    modular: 'full',
    formFactor: 'ATX',
    atx31: true,
    warranty: 10,
    tier: 'midrange',
    price: { min: 450, max: 570 },
    note: {
      pl: '750 W z zapasem na skoki poboru współczesnych kart. Najczęściej wybierana moc do zestawów do 1440p.',
      en: '750 W with headroom for the transient spikes modern cards produce. The most commonly chosen wattage for 1440p builds.',
    },
  },
  {
    id: 'focus-gx-850',
    category: 'psu',
    name: 'Focus GX-850',
    brand: 'Seasonic',
    wattage: 850,
    efficiency: 'Gold',
    modular: 'full',
    formFactor: 'ATX',
    atx31: true,
    warranty: 10,
    tier: 'high',
    price: { min: 620, max: 780 },
    url: 'https://seasonic.com/wattage-calculator/',
    note: {
      pl: 'Bardzo dobra jednostka do mocnych zestawów. 850 W daje zapas przy jednoczesnym obciążeniu procesora i karty.',
      en: 'A very good unit for powerful builds. 850 W leaves headroom with the CPU and GPU both loaded.',
    },
  },
  {
    id: 'prime-tx-1000',
    category: 'psu',
    name: 'PRIME TX-1000',
    brand: 'Seasonic',
    wattage: 1000,
    efficiency: 'Titanium',
    modular: 'full',
    formFactor: 'ATX',
    atx31: true,
    warranty: 12,
    tier: 'flagship',
    price: { min: 1400, max: 1800 },
    note: {
      pl: 'Konieczny przy RTX 5090. Sprawność Titanium i dwunastoletnia gwarancja, ale cena odpowiada jakości.',
      en: 'Required for an RTX 5090. Titanium efficiency and a twelve-year warranty, though the price matches the quality.',
    },
  },
  {
    id: 'sf750',
    category: 'psu',
    name: 'SF750 SFX',
    brand: 'Corsair',
    wattage: 750,
    efficiency: 'Platinum',
    modular: 'full',
    formFactor: 'SFX',
    atx31: true,
    warranty: 7,
    tier: 'high',
    price: { min: 850, max: 1050 },
    note: {
      pl: 'Format SFX do obudów Mini-ITX. Zasilacze SFX są droższe od ATX o tej samej mocy — to koszt małych wymiarów.',
      en: 'The SFX form factor for Mini-ITX cases. SFX units cost more than ATX of the same wattage — that is the price of small.',
    },
  },
];
