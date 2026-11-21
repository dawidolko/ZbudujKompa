import type { Part, PartCategory, BuildSelection, PriceTotal } from './types.ts';
import { sumPrices } from './pricing.ts';
import { cpus } from './cpus.ts';
import { gpus } from './gpus.ts';
import { motherboards } from './motherboards.ts';
import { ramKits } from './ram.ts';
import { psus } from './psus.ts';
import { cases } from './cases.ts';
import { coolers } from './coolers.ts';
import { storage } from './storage.ts';
import { buildPowerBreakdown, TYPICAL_BUILD, type ChipsetClass } from '../calculators.ts';

/**
 * The catalogue and the helpers that read a selection out of it.
 *
 * Separate from `index.ts` so the compatibility engine can import it without
 * going through the barrel — the barrel re-exports the engine, and importing it
 * back would form a cycle.
 */
export const allParts: Part[] = [
  ...cpus,
  ...motherboards,
  ...ramKits,
  ...gpus,
  ...storage,
  ...psus,
  ...cases,
  ...coolers,
];

const partsById = new Map(allParts.map((part) => [part.id, part]));

export function getPart(id: string): Part | undefined {
  return partsById.get(id);
}

export function getPartsByCategory(category: PartCategory): Part[] {
  return allParts.filter((part) => part.category === category);
}

/** Resolves a selection of ids into the parts themselves. */
export function resolveSelection(selection: BuildSelection): Partial<Record<PartCategory, Part>> {
  const resolved: Partial<Record<PartCategory, Part>> = {};
  for (const [category, id] of Object.entries(selection)) {
    if (!id) continue;
    const part = partsById.get(id);
    if (part) resolved[category as PartCategory] = part;
  }
  return resolved;
}

/** Sums the price bands of a selection into a total range. */
export function selectionPrice(selection: BuildSelection): PriceTotal {
  return sumPrices(Object.values(resolveSelection(selection)).map((part) => part.price));
}

/**
 * Sums the power a selection draws.
 *
 * The CPU contributes its peak rather than its TDP, because the supply has to
 * survive the peak. Everything else — board, memory, drives, fans — is covered
 * by a flat allowance: measuring each would add precision the reader cannot
 * act on, since the result is rounded up to a real supply wattage anyway.
 */
export function selectionPower(selection: BuildSelection): number {
  const parts = resolveSelection(selection);
  const cpu = parts.cpu?.category === 'cpu' ? parts.cpu : undefined;
  const gpu = parts.gpu?.category === 'gpu' ? parts.gpu : undefined;
  const board = parts.motherboard?.category === 'motherboard' ? parts.motherboard : undefined;
  const drive = parts.storage?.category === 'storage' ? parts.storage : undefined;

  /* The same item-by-item sum as the power supply calculator, so the
     configurator and the calculator never disagree about one build. What the
     selection does not name comes from the typical build. */
  let chipset: ChipsetClass = TYPICAL_BUILD.chipset;
  if (board) {
    chipset = /^X(670|670E|870E)$/.test(board.chipset)
      ? 'amd-dual'
      : board.socket.startsWith('am')
        ? 'amd'
        : 'intel';
  }

  const { total } = buildPowerBreakdown({
    ...TYPICAL_BUILD,
    cpuWatts: cpu?.peakPower ?? 0,
    gpuWatts: gpu?.tdp ?? 0,
    chipset,
    mainDriveWatts: drive?.power ?? TYPICAL_BUILD.mainDriveWatts,
  });
  return Math.ceil(total);
}

/** Every brand in the catalogue, with how many parts each has. */
export function getBrands(): { brand: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const part of allParts) {
    counts.set(part.brand, (counts.get(part.brand) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([brand, count]) => ({ brand, count }))
    .sort((a, b) => b.count - a.count || a.brand.localeCompare(b.brand));
}

export function getPartsByBrand(brand: string): Part[] {
  return allParts.filter((part) => part.brand === brand);
}
