import type { PartCategory } from '@/lib/parts';

/**
 * The geometry of an ATX motherboard, in the 520 x 420 drawing units of the
 * diagram.
 *
 * Proportions follow the real 305 x 244 mm specification. The annotated diagram,
 * the board on the home page and the configurator's status board all draw from
 * this one table, so they cannot disagree about where anything is.
 */
export type Box = { x: number; y: number; width: number; height: number };

export const board: Box = { x: 10, y: 10, width: 500, height: 400 };

export const zones = {
  io: { x: 20, y: 20, width: 150, height: 46 },
  eps: { x: 188, y: 18, width: 72, height: 24 },
  vrmSide: { x: 188, y: 52, width: 20, height: 96 },
  vrmTop: { x: 112, y: 86, width: 68, height: 16 },
  cpu: { x: 218, y: 70, width: 86, height: 86 },
  cpuDie: { x: 234, y: 86, width: 54, height: 54 },
  atx: { x: 446, y: 70, width: 26, height: 76 },
  m2Top: { x: 60, y: 196, width: 180, height: 10 },
  pcieMain: { x: 60, y: 238, width: 300, height: 16 },
  m2Lower: { x: 60, y: 276, width: 180, height: 10 },
  pcieShort: { x: 60, y: 306, width: 90, height: 14 },
  pcieLower: { x: 60, y: 348, width: 300, height: 16 },
  sata: { x: 446, y: 250, width: 26, height: 60 },
  panel: { x: 392, y: 366, width: 80, height: 24 },
} satisfies Record<string, Box>;

/* Memory slots, counted from the CPU. Two modules go in the second and fourth. */
export const dimmSlots: Box[] = [0, 1, 2, 3].map((index) => ({
  x: 332 + index * 22,
  y: 60,
  width: 13,
  height: 120,
}));

/** Reference designators for each part of a build, as a board would print them. */
export const categoryRefs: Record<PartCategory, string> = {
  cpu: 'U1',
  motherboard: 'MB1',
  ram: 'DIMM',
  gpu: 'PCIE1',
  storage: 'M2_1',
  cooler: 'FAN1',
  psu: 'J1',
  case: 'JFP1',
};

/** Spreads a box into the attributes of an SVG rect. */
export const rect = ({ x, y, width, height }: Box) => ({ x, y, width, height });
