import type { PartCategory, PriceTier } from './types.ts';

/**
 * Where each price tier ends, per category, as a typical price in PLN.
 *
 * A tier compares a part with others in its category, so the limits differ from
 * one category to the next. Flagship has no limit. `prices.ts` stores each
 * part's tier, and the price refresh moves it with `tierAfter`.
 */
const tierLimits: Record<PartCategory, [number, number, number, number]> = {
  cpu: [790, 1000, 1400, 2000],
  motherboard: [600, 900, 1250, 2200],
  ram: [2000, 3400, 3600, 7500],
  gpu: [2500, 3200, 4399, 7000],
  storage: [700, 1300, 1800, 2600],
  psu: [400, 670, 1000, 1500],
  case: [400, 550, 750, 1300],
  cooler: [150, 220, 450, 1000],
};

const order: PriceTier[] = ['budget', 'value', 'midrange', 'high', 'flagship'];

/* A price this close to the edge of its band stays put, so a tier does not flip
   back and forth on an ordinary monthly swing. */
const TOLERANCE = 0.1;

/** The tier a typical price falls into. */
export function tierForPrice(category: PartCategory, price: number): PriceTier {
  const index = tierLimits[category].findIndex((limit) => price <= limit);
  return order[index === -1 ? order.length - 1 : index]!;
}

/** The tier a part should hold at a new typical price. It moves only on leaving its band. */
export function tierAfter(category: PartCategory, current: PriceTier, price: number): PriceTier {
  const limits = tierLimits[category];
  const index = order.indexOf(current);
  const low = index === 0 ? 0 : limits[index - 1]!;
  const high = limits[index] ?? Infinity;
  const inside = price >= low * (1 - TOLERANCE) && price <= high * (1 + TOLERANCE);
  return inside ? current : tierForPrice(category, price);
}
