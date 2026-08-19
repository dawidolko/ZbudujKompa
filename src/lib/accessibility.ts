/**
 * Accessibility preferences.
 *
 * A user-facing panel of display adjustments, separate from the theme toggle.
 * These are stored and reapplied on every page, including across the full
 * document swap the language switcher performs — the same problem the theme
 * had, solved the same way.
 *
 * Everything here is expressed as a data attribute on <html> plus CSS. Nothing
 * rewrites the DOM, so no adjustment can break the page structure or interfere
 * with a screen reader's view of it.
 */

export const A11Y_STORAGE_KEY = 'zbudujkompa-a11y';

/** Font scale steps, as multipliers of the base size. */
export const FONT_STEPS = [0.9, 1, 1.15, 1.3, 1.5] as const;
export const DEFAULT_FONT_STEP = 1;

/**
 * The visual filters.
 *
 * Mutually exclusive by design: greyscale, high contrast and negative all
 * transform the whole palette, and combining them produces something no one
 * asked for. The panel enforces that by treating them as one setting.
 */
export type VisualFilter = 'none' | 'grayscale' | 'high-contrast' | 'negative' | 'light';

export type A11ySettings = {
  /** Index into FONT_STEPS. */
  fontStep: number;
  filter: VisualFilter;
  /** Underline every link, not only on hover — WCAG 1.4.1 as a preference. */
  underlineLinks: boolean;
  /** Switch to a face tuned for dyslexia and low vision. */
  readableFont: boolean;
};

export const defaultA11ySettings: A11ySettings = {
  fontStep: DEFAULT_FONT_STEP,
  filter: 'none',
  underlineLinks: false,
  readableFont: false,
};

/** Narrows unknown parsed JSON into settings, falling back per field. */
export function parseSettings(value: unknown): A11ySettings {
  if (typeof value !== 'object' || value === null) return defaultA11ySettings;
  const raw = value as Partial<Record<keyof A11ySettings, unknown>>;

  const step = typeof raw.fontStep === 'number' ? raw.fontStep : DEFAULT_FONT_STEP;
  const filter = raw.filter;

  return {
    /* Clamped rather than trusted: a stored index from an older version with
       more steps would otherwise index past the end of the array. */
    fontStep: Math.min(Math.max(Math.round(step), 0), FONT_STEPS.length - 1),
    filter:
      filter === 'grayscale' ||
      filter === 'high-contrast' ||
      filter === 'negative' ||
      filter === 'light'
        ? filter
        : 'none',
    underlineLinks: raw.underlineLinks === true,
    readableFont: raw.readableFont === true,
  };
}

/** Writes the settings onto <html> as attributes and a font-scale variable. */
export function applyA11ySettings(settings: A11ySettings): void {
  const root = document.documentElement;

  root.style.setProperty('--font-scale', String(FONT_STEPS[settings.fontStep] ?? 1));

  /* Attributes rather than classes: they read as state in devtools, and a
     single attribute cannot accumulate stale values the way a class list can. */
  if (settings.filter === 'none') root.removeAttribute('data-a11y-filter');
  else root.setAttribute('data-a11y-filter', settings.filter);

  root.toggleAttribute('data-a11y-underline', settings.underlineLinks);
  root.toggleAttribute('data-a11y-readable', settings.readableFont);

  try {
    localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    /* Private mode or blocked storage: the settings still apply to this page,
       they simply will not outlive it. */
  }
}

export function readA11ySettings(): A11ySettings {
  try {
    const stored = localStorage.getItem(A11Y_STORAGE_KEY);
    return stored ? parseSettings(JSON.parse(stored)) : defaultA11ySettings;
  } catch {
    return defaultA11ySettings;
  }
}

/**
 * Script injected into <head> and run before first paint.
 *
 * Without this the page renders at the default size and then jumps to the
 * chosen one — which is worst for exactly the readers who need the setting.
 */
export const a11yInitScript = `
(function () {
  var KEY = ${JSON.stringify(A11Y_STORAGE_KEY)};
  var STEPS = ${JSON.stringify(FONT_STEPS)};
  var root = document.documentElement;
  var s;

  try { s = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) {}
  if (!s || typeof s !== 'object') return;

  var step = typeof s.fontStep === 'number' ? Math.min(Math.max(Math.round(s.fontStep), 0), STEPS.length - 1) : 1;
  root.style.setProperty('--font-scale', String(STEPS[step]));

  if (s.filter && s.filter !== 'none') root.setAttribute('data-a11y-filter', s.filter);
  if (s.underlineLinks === true) root.setAttribute('data-a11y-underline', '');
  if (s.readableFont === true) root.setAttribute('data-a11y-readable', '');
})();
`.trim();
