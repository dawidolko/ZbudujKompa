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
 * Where a part sits in its category's price range.
 *
 * Tiers compare parts within one category. `prices.ts` stores them, and the
 * price refresh moves a part whose price leaves the limits in `price-tiers.ts`.
 */
export type PriceTier = 'budget' | 'value' | 'midrange' | 'high' | 'flagship';

/**
 * A price band in PLN.
 *
 * The site has no server and no shop feed, so a band cannot be live. It runs
 * from the lowest sensible new price to the typical price at a mainstream shop
 * on the day in `prices.ts`, which is what the interface shows beside it. The
 * figures come from `prices.ts` alone; `scripts/update-prices.mjs` can refresh
 * them once a SerpApi key is configured.
 *
 * `unavailable` marks a part with no credible price. Its `min` and `max` are
 * zero only to keep the shape, so anything that sums or compares has to check
 * the flag first. `checkedAt` is what decides whether the band may be shown.
 */
export type PriceRange = { min: number; max: number; unavailable?: boolean; checkedAt?: string };

/** A sum of bands, with how many parts could not be included in it. */
export type PriceTotal = PriceRange & { unpriced: number };

/** Fields shared by every part. */
type PartBase = {
  id: string;
  /** Manufacturer and model. Brand names are never translated. */
  name: string;
  brand: string;
  tier: PriceTier;
  /** Checked Polish retail band in PLN, read from `prices.ts`. */
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

/** One M.2 storage slot: the link it runs at and where its lanes come from. */
export type M2Slot = {
  /** The label printed on the board and in the manual, e.g. "M.2_1". */
  label: string;
  gen: 3 | 4 | 5;
  lanes: 2 | 4;
  wiredTo: 'cpu' | 'chipset';
  /** Lane sharing or another caveat the manufacturer lists for this slot. */
  note?: Localized;
};

export type Motherboard = PartBase & {
  category: 'motherboard';
  socket: string;
  chipset: string;
  formFactor: 'ATX' | 'Micro-ATX' | 'Mini-ITX';
  memoryType: 'ddr4' | 'ddr5';
  memorySlots: number;
  m2Slots: number;
  /** Every M.2 storage slot, fastest first, from the manufacturer's page. */
  m2: M2Slot[];
  /** 4-pin fan and pump headers in total (CPU, CPU_OPT, pump and system). */
  fanHeaders: number;
  /** Manufacturer specification page the slot and header figures come from. */
  specSource: string;
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

/**
 * The power connectors a graphics card needs.
 *
 * Wattage alone does not tell you which cables a supply must have, so this
 * is recorded as the vendor states it rather than derived from board power.
 */
export type GpuPower = {
  /** The socket on the card: the 16-pin 12V-2x6, or classic 8-pin PCIe. */
  connector: '12v-2x6' | '8pin';
  /**
   * 8-pin PCIe cables needed: the card's own sockets, or for a 12V-2x6 card
   * the inputs of the adapter in the box.
   */
  pcie8pin: number;
  /**
   * Minimum rating of a native 12V-2x6 cable, in watts, where the vendor
   * lists one. On an 8-pin card it is the 16-pin alternative NVIDIA accepts.
   */
  cableRating?: number;
  /** Vendor specification page the figures were read from. */
  source: string;
};

export type Gpu = PartBase & {
  category: 'gpu';
  vram: number;
  /** Board power in watts. */
  tdp: number;
  /** Manufacturer's recommended PSU wattage. */
  recommendedPsu: number;
  /** Power connectors the vendor specifies for the card. */
  power: GpuPower;
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
  /**
   * Highest published power draw in watts (maximum, or average active where
   * that is all the datasheet gives). Absent where the maker publishes none,
   * in which case the PSU calculator falls back to a generic figure.
   */
  power?: number;
  /** Where `power` comes from. */
  powerSource?: string;
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
  /**
   * Physical design of an air cooler. The thermal calculator maps it onto a
   * cooler class, because a single and a dual tower differ far more than
   * their wattage ratings suggest.
   */
  design?: 'boxed' | 'low-profile' | 'single-tower' | 'dual-tower';
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
