import type { ChipsetClass, COOLER_RESISTANCE } from '../calculators.ts';
import type {
  BuildSelection,
  Case,
  Cooler,
  Cpu,
  Gpu,
  Motherboard,
  Psu,
  Ram,
  Storage,
} from './types.ts';
import { resolveSelection } from './selection.ts';

/**
 * Turning catalogue parts into calculator inputs.
 *
 * The calculators take plain numbers so they keep working for a part that is
 * not in the catalogue. This module is the one place that knows how a real
 * part maps onto those numbers — which power figure a CPU contributes, which
 * class a cooler belongs to — so every calculator reads a part the same way
 * and the mapping can be tested without a browser.
 */

/** A selection resolved into typed parts, one per category. */
export type BuildParts = {
  cpu?: Cpu;
  motherboard?: Motherboard;
  ram?: Ram;
  gpu?: Gpu;
  storage?: Storage;
  psu?: Psu;
  case?: Case;
  cooler?: Cooler;
};

/** Resolves a configurator selection into parts the calculators can read. */
export function buildParts(selection: BuildSelection): BuildParts {
  const resolved = resolveSelection(selection);
  const parts: BuildParts = {};
  if (resolved.cpu?.category === 'cpu') parts.cpu = resolved.cpu;
  if (resolved.motherboard?.category === 'motherboard') parts.motherboard = resolved.motherboard;
  if (resolved.ram?.category === 'ram') parts.ram = resolved.ram;
  if (resolved.gpu?.category === 'gpu') parts.gpu = resolved.gpu;
  if (resolved.storage?.category === 'storage') parts.storage = resolved.storage;
  if (resolved.psu?.category === 'psu') parts.psu = resolved.psu;
  if (resolved.case?.category === 'case') parts.case = resolved.case;
  if (resolved.cooler?.category === 'cooler') parts.cooler = resolved.cooler;
  return parts;
}

/**
 * The chipset class of a board, for the power budget.
 *
 * X670, X670E and X870E carry two chipset dies, everything else one; Intel
 * and AMD differ in what one die draws.
 */
export function chipsetClassOf(board: Motherboard): ChipsetClass {
  if (/^X(670|670E|870E)$/.test(board.chipset)) return 'amd-dual';
  return board.socket.startsWith('am') ? 'amd' : 'intel';
}

/**
 * The cooler class the thermal calculator uses for a catalogue cooler.
 *
 * AiO coolers go by radiator size, air coolers by their design. A low-profile
 * cooler has no class of its own, so it is placed with the boxed coolers —
 * the conservative choice, since a top-down cooler with one fan sits far
 * closer to a stock cooler than to a tower.
 */
export function thermalCoolerClass(cooler: Cooler): keyof typeof COOLER_RESISTANCE {
  if (cooler.kind === 'aio') return (cooler.radiatorSize ?? 240) >= 360 ? 'aio360' : 'aio240';
  switch (cooler.design) {
    case 'dual-tower':
      return 'dualTower';
    case 'single-tower':
      return 'singleTower';
    default:
      return 'boxed';
  }
}

/**
 * The first slot on a board that runs a drive of this generation at full
 * speed — at least its generation, on four lanes — or -1 when none does.
 */
export function bestM2Slot(board: Motherboard, driveGen: 3 | 4 | 5): number {
  return board.m2.findIndex((slot) => slot.gen >= driveGen && slot.lanes === 4);
}

/** A readable option label for any part: brand and model. */
export function partLabel(part: { brand: string; name: string }): string {
  return part.name.startsWith(part.brand) ? part.name : `${part.brand} ${part.name}`;
}
