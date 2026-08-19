import type { Localized } from '../types.ts';

/**
 * Component catalogue types.
 *
 * These describe real parts in enough detail to answer the questions the
 * configurator actually has to answer: does this fit, will it be enough, and
 * what does it cost. Anything that does not feed one of those decisions is
 * deliberately left out — a spec sheet nobody acts on is noise.
 */

/** Every category the configurator understands. */
export type PartCategory =
  'cpu' | 'motherboard' | 'ram' | 'gpu' | 'storage' | 'psu' | 'case' | 'cooler';

/**
 * Price band rather than a price.
 *
 * Hardware pricing moves weekly and a static site cannot track it. A band
 * survives that: "this is a mid-range card" stays true far longer than any
 * figure, and it is what a reader actually needs when budgeting.
 */
export type PriceTier = 'budget' | 'value' | 'midrange' | 'high' | 'flagship';

/** Approximate PLN range each tier represents, per category. */
export type PriceRange = { min: number; max: number };

/** Fields shared by every part. */
type PartBase = {
  id: string;
  /** Manufacturer and model. Brand names are never translated. */
  name: string;
  brand: string;
  tier: PriceTier;
  /** Indicative street price band in PLN, for budget planning only. */
  price: PriceRange;
  /** One sentence on who this part is for. */
  note: Localized;
  /** Manufacturer product page, so a reader can check the specification. */
  url?: string;
};

export type Cpu = PartBase & {
  category: 'cpu';
  socket: string;
  cores: number;
  threads: number;
  /** Sustained power draw under all-core load, in watts. Drives cooler sizing. */
  tdp: number;
  /** Peak boost draw, which is what the PSU has to survive. */
  peakPower: number;
  memory: ('ddr4' | 'ddr5')[];
  /** Whether the chip has usable graphics without a discrete card. */
  integratedGraphics: boolean;
  /** Relative gaming performance, 0-100, for the comparison bars. */
  gamingScore: number;
  /** Relative multi-threaded performance, 0-100. */
  multiScore: number;
  unlocked: boolean;
};

export type Motherboard = PartBase & {
  category: 'motherboard';
  socket: string;
  chipset: string;
  formFactor: 'ATX' | 'Micro-ATX' | 'Mini-ITX';
  memoryType: 'ddr4' | 'ddr5';
  memorySlots: number;
  m2Slots: number;
  /** Maximum sustained CPU power this board's VRM comfortably supports. */
  vrmRating: number;
  wifi: boolean;
};

export type Ram = PartBase & {
  category: 'ram';
  type: 'ddr4' | 'ddr5';
  /** Total capacity in GB across the kit. */
  capacity: number;
  modules: number;
  speed: number;
  casLatency: number;
  /** Module height in mm. Tall modules foul large air coolers. */
  height: number;
};

export type Gpu = PartBase & {
  category: 'gpu';
  vram: number;
  /** Board power in watts. */
  tdp: number;
  /** Manufacturer's recommended PSU wattage. */
  recommendedPsu: number;
  length: number;
  slots: number;
  /** Relative rasterisation performance, 0-100. */
  performanceScore: number;
  /** Resolution this card is sized for. */
  targetResolution: '1080p' | '1440p' | '4K';
};

export type Storage = PartBase & {
  category: 'storage';
  kind: 'nvme' | 'sata-ssd' | 'hdd';
  capacity: number;
  /** Sequential read in MB/s. */
  readSpeed: number;
  pcieGen?: 3 | 4 | 5;
  /** Endurance in terabytes written, where the manufacturer publishes it. */
  tbw?: number;
};

export type Psu = PartBase & {
  category: 'psu';
  wattage: number;
  efficiency: 'Bronze' | 'Gold' | 'Platinum' | 'Titanium';
  modular: 'no' | 'semi' | 'full';
  formFactor: 'ATX' | 'SFX';
  /** ATX 3.x compliance, which matters for modern GPU transient spikes. */
  atx31: boolean;
  /** Warranty in years — the most honest proxy for build quality. */
  warranty: number;
};

export type Case = PartBase & {
  category: 'case';
  formFactors: ('ATX' | 'Micro-ATX' | 'Mini-ITX')[];
  /** Maximum air cooler height in mm. */
  maxCoolerHeight: number;
  /** Maximum graphics card length in mm. */
  maxGpuLength: number;
  /** Radiator sizes the case can mount, in mm. */
  radiatorSupport: number[];
  psuFormFactor: 'ATX' | 'SFX';
  /** Internal volume in litres. */
  volume: number;
  driveBays: number;
};

export type Cooler = PartBase & {
  category: 'cooler';
  kind: 'air' | 'aio';
  /** Sockets this cooler ships mounting hardware for. */
  sockets: string[];
  /** Sustained wattage it can dissipate without becoming loud. */
  wattage: number;
  /** Height in mm for air coolers; radiator length for AiO. */
  height?: number;
  radiatorSize?: number;
  /** Noise under load, in dBA. */
  noise: number;
  /** Clearance under the cooler for memory, in mm. */
  ramClearance?: number;
};

export type Part = Cpu | Motherboard | Ram | Gpu | Storage | Psu | Case | Cooler;

/** A configuration in progress: one part per category, or none chosen yet. */
export type BuildSelection = Partial<Record<PartCategory, string>>;
