import type { BuildSelection, PartCategory } from './types.ts';
import { getPart } from './selection.ts';

/**
 * The last build put together in the configurator, kept on this device.
 *
 * The configurator holds its selection in component state, which the
 * calculators on other pages cannot see. Writing the same selection to
 * localStorage lets a calculator load it instead of the reader picking every
 * part a second time. Nothing leaves the browser, and every access is guarded
 * because storage can be blocked or full.
 */
export const BUILD_STORAGE_KEY = 'zbudujkompa:build';

/** Stores a selection; an empty one removes the saved build. */
export function saveBuild(selection: BuildSelection): void {
  try {
    if (Object.keys(selection).length === 0) localStorage.removeItem(BUILD_STORAGE_KEY);
    else localStorage.setItem(BUILD_STORAGE_KEY, JSON.stringify(selection));
  } catch {
    /* Storage unavailable: the calculators simply have nothing to load. */
  }
}

/**
 * Reads the saved selection back, keeping only ids that still exist in the
 * catalogue under the category they were saved for — a part removed since
 * the build was made is dropped rather than breaking the calculator.
 */
export function readSavedBuild(): BuildSelection | null {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(BUILD_STORAGE_KEY);
  } catch {
    return null;
  }
  return parseSavedBuild(raw);
}

/** The validation half of `readSavedBuild`, separate so it can be tested. */
export function parseSavedBuild(raw: string | null): BuildSelection | null {
  if (!raw) return null;
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;

  const selection: BuildSelection = {};
  for (const [category, id] of Object.entries(data as Record<string, unknown>)) {
    if (typeof id !== 'string') continue;
    const part = getPart(id);
    if (part && part.category === category) selection[category as PartCategory] = id;
  }
  return Object.keys(selection).length > 0 ? selection : null;
}
