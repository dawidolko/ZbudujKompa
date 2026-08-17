import type { Locale } from '@/i18n/config';

/** A string that exists in every supported locale. */
export type Localized<T = string> = Record<Locale, T>;

/* =============================================================================
   Platforms and sockets
   ============================================================================= */

/** CPU vendor. Drives platform grouping across the whole site. */
export type Vendor = 'amd' | 'intel';

/**
 * A CPU socket, which is the anchor most build decisions hang off: it fixes
 * the chipset family, the memory generation and the cooler mounting pattern.
 */
export type Socket = {
  slug: string;
  vendor: Vendor;
  /** Marketing name, e.g. "AM5" or "LGA1851". Not translated. */
  name: string;
  /** Launch year of the socket. */
  launched: number;
  /** Vendor's stated support horizon, when one has been announced. */
  supportedUntil?: number;
  /** Memory generations the socket accepts. */
  memory: ('ddr4' | 'ddr5')[];
  /** PCIe generation available from the CPU on this socket. */
  pcie: string;
  /** Cooler mounting standard, which decides bracket compatibility. */
  coolerMount: string;
  tagline: Localized;
  description: Localized;
  /** Short, honest guidance on who this platform is still right for. */
  verdict: Localized;
  chipsets: Chipset[];
  /** Whether the socket is still receiving new CPU releases. */
  status: 'current' | 'mature' | 'legacy';
};

/** A chipset within a socket family. */
export type Chipset = {
  name: string;
  /** Overclocking support: full, memory-only, or none. */
  overclocking: 'full' | 'memory' | 'none';
  tier: 'flagship' | 'mainstream' | 'budget';
  note: Localized;
};

/* =============================================================================
   Cooling
   ============================================================================= */

export type CoolingType = 'air' | 'aio' | 'custom-loop';

export type CoolingProfile = {
  slug: string;
  type: CoolingType;
  name: Localized;
  tagline: Localized;
  description: Localized;
  /** Thermal headroom this class of cooler realistically handles, in watts. */
  wattage: { min: number; max: number };
  /** Typical noise level under load, in dBA. */
  noise: { min: number; max: number };
  /** Approximate price band in PLN. */
  price: { min: number; max: number };
  pros: Localized<string[]>;
  cons: Localized<string[]>;
  /** Who should pick this, stated plainly. */
  bestFor: Localized;
};

/* =============================================================================
   Components and builds
   ============================================================================= */

export type ComponentKind =
  'cpu' | 'motherboard' | 'ram' | 'gpu' | 'storage' | 'psu' | 'case' | 'cooler';

/**
 * A part in a reference build.
 *
 * Deliberately carries no price. Hardware pricing moves weekly, and a figure
 * baked into a static build goes stale without any signal to the reader — the
 * rationale for choosing the part is what stays true.
 */
export type BuildPart = {
  kind: ComponentKind;
  /** Manufacturer and model. Brand names are not translated. */
  name: string;
  /** Why this specific part, in one or two sentences. */
  rationale: Localized;
};

/** A complete reference build at a given budget. */
export type Build = {
  slug: string;
  name: Localized;
  tagline: Localized;
  description: Localized;
  /** Total indicative cost in grosz, derived from the parts. */
  vendor: Vendor;
  socketSlug: string;
  /** Intended use, e.g. 1440p gaming or video editing. */
  useCase: Localized;
  /** Realistic performance expectation, stated without hype. */
  expectation: Localized;
  parts: BuildPart[];
  difficulty: Difficulty;
};

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

/* =============================================================================
   Guides
   ============================================================================= */

export type GuideCategory =
  'basics' | 'assembly' | 'cooling' | 'platform' | 'software' | 'troubleshooting' | 'optimisation';

/** One step of a step-by-step assembly guide. */
export type GuideStep = {
  /** Stable anchor id, used by the table of contents and deep links. */
  id: string;
  title: Localized;
  body: Localized<string[]>;
  /** Practical warning shown in a highlighted callout. */
  warning?: Localized;
  /** Time this step usually takes, in minutes. */
  minutes?: number;
  /** Tools needed beyond a screwdriver. */
  tools?: Localized<string[]>;
};

export type Guide = {
  slug: string;
  category: GuideCategory;
  title: Localized;
  summary: Localized;
  /** Reading time in minutes, computed from the body at build time. */
  difficulty: Difficulty;
  updated: string;
  steps: GuideStep[];
  /** Slugs of related guides, rendered as cross-links at the end. */
  related: string[];
};

/* =============================================================================
   Glossary, FAQ and community opinions
   ============================================================================= */

export type GlossaryTerm = {
  slug: string;
  term: string;
  definition: Localized;
  category: GuideCategory;
};

export type FaqEntry = {
  id: string;
  question: Localized;
  answer: Localized;
};

/**
 * A community opinion.
 *
 * These are stored in the repository rather than fetched, and each one records
 * where it came from and when it was collected, so a reader can judge how much
 * weight to give it and check the original.
 */
export type Opinion = {
  id: string;
  /** Display name or handle of the author. */
  author: string;
  /** Where it was published, e.g. "r/buildapc". */
  source: string;
  sourceUrl: string;
  /** ISO date the opinion was collected. */
  collectedOn: string;
  /** Rating out of 5, when the source provided one. */
  rating?: number;
  quote: Localized;
  /** What the opinion is about — a socket slug, cooling slug, or build slug. */
  subject: string;
};
