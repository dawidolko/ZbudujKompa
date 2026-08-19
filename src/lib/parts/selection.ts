import type { Part, PartCategory, BuildSelection } from './types.ts';
import { cpus } from './cpus.ts';
import { gpus } from './gpus.ts';
import { motherboards } from './motherboards.ts';
import { ramKits } from './ram.ts';
import { psus } from './psus.ts';
import { cases } from './cases.ts';
import { coolers } from './coolers.ts';
import { storage } from './storage.ts';

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
export function selectionPrice(selection: BuildSelection): { min: number; max: number } {
  let min = 0;
  let max = 0;
  for (const part of Object.values(resolveSelection(selection))) {
    min += part.price.min;
    max += part.price.max;
  }
  return { min, max };
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
  let watts = 90;

  if (parts.cpu?.category === 'cpu') watts += parts.cpu.peakPower;
  if (parts.gpu?.category === 'gpu') watts += parts.gpu.tdp;

  return watts;
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
