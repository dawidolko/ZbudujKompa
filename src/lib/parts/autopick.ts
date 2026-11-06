import type { BuildSelection, Part, PartCategory, PriceTotal } from './types.ts';
import { allParts, selectionPrice } from './selection.ts';
import { checkCompatibility } from './compatibility.ts';

/**
 * Automatic build selection.
 *
 * "Random" would be the easy reading of a surprise-me button, and it would be
 * the wrong one: a random selection is usually incompatible, and showing
 * someone a broken build helps nobody. What this does instead is pick randomly
 * *among the parts that work together* — the order is randomised, the
 * constraints are not.
 *
 * The result is a different sensible build each time rather than a different
 * arbitrary one.
 */

export type AutoPickOptions = {
  /** Rough budget in złoty. The result aims under it without going far below. */
  budget: number;
  /** What the machine is for, which steers the split between parts. */
  purpose: 'gaming' | 'work' | 'office' | 'compact';
  /** Optional seed, so a result can be reproduced. */
  seed?: number;
};

/**
 * A small deterministic generator.
 *
 * `Math.random` cannot be seeded, and a reproducible result matters here: it
 * is what lets a chosen build be shared or re-derived rather than being lost
 * the moment the page reloads.
 */
function makeRandom(seed: number): () => number {
  let state = seed >>> 0 || 1;
  return () => {
    /* xorshift32 — short, fast, and far better distributed than the
       sin-based tricks that circulate for this purpose. */
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 4294967296;
  };
}

/** Shuffles a copy of a list using the supplied generator. */
function shuffle<T>(items: T[], random: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

/**
 * How much of the budget each purpose spends on each category.
 *
 * Memory takes far more than it used to: since the 2026 DRAM shortage a 32 GB
 * DDR5 kit costs about as much as a mid-range graphics card. These shares follow
 * the checked prices in `prices.ts`, so a large market move has to be reflected
 * here as well.
 */
const BUDGET_SPLIT: Record<AutoPickOptions['purpose'], Partial<Record<PartCategory, number>>> = {
  /* A gaming build concentrates on the graphics card, which determines frame
     rate more than anything else. */
  gaming: {
    gpu: 0.34,
    cpu: 0.14,
    motherboard: 0.08,
    ram: 0.2,
    storage: 0.09,
    psu: 0.06,
    case: 0.06,
    cooler: 0.03,
  },
  /* Work loads scale with cores and memory rather than with the card. */
  work: {
    cpu: 0.24,
    gpu: 0.2,
    motherboard: 0.09,
    ram: 0.26,
    storage: 0.09,
    psu: 0.05,
    case: 0.04,
    cooler: 0.03,
  },
  /* An office machine has no discrete card at all; the share is redistributed. */
  office: {
    cpu: 0.27,
    motherboard: 0.13,
    ram: 0.26,
    storage: 0.15,
    psu: 0.08,
    case: 0.08,
    cooler: 0.03,
  },
  /* A compact build pays a premium for small parts — SFX supplies above all. */
  compact: {
    gpu: 0.3,
    cpu: 0.14,
    motherboard: 0.09,
    ram: 0.19,
    storage: 0.09,
    psu: 0.09,
    case: 0.07,
    cooler: 0.03,
  },
};

/** Categories chosen in order, so earlier choices constrain later ones. */
const PICK_ORDER: PartCategory[] = [
  'cpu',
  'motherboard',
  'ram',
  'gpu',
  'cooler',
  'case',
  'psu',
  'storage',
];

/**
 * Builds a complete, compatible selection.
 *
 * Each category is filled by taking the candidates that keep the build valid,
 * preferring those near the budgeted share, and choosing randomly among the
 * closest few. Picking strictly the nearest would make the button
 * deterministic; picking uniformly would ignore the budget.
 */
export function autoPick(options: AutoPickOptions): {
  selection: BuildSelection;
  price: PriceTotal;
  seed: number;
} {
  const seed = options.seed ?? Math.floor(Math.random() * 2 ** 31);
  const random = makeRandom(seed);
  const split = BUDGET_SPLIT[options.purpose];

  const selection: BuildSelection = {};

  /* Each target comes from what is left rather than from the whole budget, so
     a part that lands above its share is paid for by the ones chosen after it.
     With independent targets every overrun simply adds up. */
  let remaining = options.budget;
  let shareLeft = Object.values(split).reduce((sum, share) => sum + share, 0);

  for (const category of PICK_ORDER) {
    const share = split[category];
    /* No share means the purpose does not use this category — an office build
       skips the graphics card entirely rather than buying the cheapest one. */
    if (share === undefined) continue;

    const target = Math.max(0, remaining) * (share / shareLeft);
    shareLeft -= share;

    const candidates = allParts.filter((part) => {
      if (part.category !== category) return false;
      /* A part nobody can buy is no help in a build, and without a price it
         cannot be placed against the budget either. */
      if (part.price.unavailable) return false;
      /* Only parts that keep the build valid are considered, which is what
         makes the result compatible by construction rather than by luck. */
      const trial = { ...selection, [category]: part.id };
      return checkCompatibility(trial).buildable;
    });

    if (candidates.length === 0) continue;

    /* Distance from the budgeted share, using the midpoint of each band. */
    const scored = candidates
      .map((part) => ({ part, distance: Math.abs((part.price.min + part.price.max) / 2 - target) }))
      .sort((a, b) => a.distance - b.distance);

    /* Choose among the three closest. Enough variety that the button gives a
       different answer each press, little enough that it stays near budget. */
    const pool = scored.slice(0, Math.min(3, scored.length)).map((entry) => entry.part);
    const chosen = shuffle(pool, random)[0];
    if (chosen) {
      selection[category] = chosen.id;
      remaining -= (chosen.price.min + chosen.price.max) / 2;
    }
  }

  return { selection, price: selectionPrice(selection), seed };
}

/** The parts of a selection, in the order the configurator displays them. */
export function selectionParts(selection: BuildSelection): Part[] {
  return PICK_ORDER.map((category) => selection[category])
    .filter((id): id is string => Boolean(id))
    .map((id) => allParts.find((part) => part.id === id))
    .filter((part): part is Part => Boolean(part));
}
