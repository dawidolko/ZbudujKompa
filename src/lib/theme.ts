/**
 * Theme handling.
 *
 * Why this is more than a class toggle
 * ------------------------------------
 * Each locale renders its own <html> element, because the `lang` attribute has
 * to be correct in the served HTML. Switching language therefore replaces the
 * whole document rather than re-rendering a React tree, and any theme state
 * held only in memory is destroyed by that navigation.
 *
 * The previous implementation stored the theme only when the visitor pressed
 * the toggle. Someone browsing in dark mode purely because their system is
 * dark had nothing in storage, so after the language switch the init script
 * fell back to `prefers-color-scheme` — and every intermediate state (an
 * explicit light choice on a dark system, most visibly) was lost, which is the
 * reported "language switch resets the site to day mode" bug.
 *
 * The fix has two halves, and both are needed:
 *   1. `resolveTheme` always returns a concrete 'light' | 'dark', and the
 *      resolved value is written to storage on the first visit as well as on
 *      every toggle. There is no state that exists only in memory.
 *   2. The theme is expressed as `data-theme` on <html>, and the CSS treats
 *      that attribute as authoritative over `prefers-color-scheme`. The
 *      attribute is set by a blocking script in <head>, so the correct theme
 *      is in place before the first paint of the new document.
 */

export const THEME_STORAGE_KEY = 'zbudujkompa-theme';

/** A concrete theme that can be painted. */
export type Theme = 'light' | 'dark';

/**
 * What the visitor chose. 'system' means "keep following the OS", which is the
 * default until they express a preference.
 */
export type ThemePreference = Theme | 'system';

export const themePreferences: readonly ThemePreference[] = ['light', 'dark', 'system'] as const;

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === 'light' || value === 'dark' || value === 'system';
}

/**
 * Script injected into <head> and executed synchronously, before the browser
 * paints anything.
 *
 * It runs on every document, which is exactly what makes the language switch
 * safe: the new document reads the same persisted preference and paints the
 * same theme the visitor was already looking at.
 *
 * Kept as a hand-written string rather than a bundled module because it has to
 * execute before any JavaScript chunk is fetched — a deferred script would run
 * after first paint and reintroduce the flash it exists to prevent.
 */
export const themeInitScript = `
(function () {
  var KEY = ${JSON.stringify(THEME_STORAGE_KEY)};
  var root = document.documentElement;
  var stored = null;

  try {
    stored = localStorage.getItem(KEY);
  } catch (e) {
    /* Storage can throw in private mode or when cookies are blocked. The
       visitor still gets a correct theme, it just will not outlive the tab. */
  }

  var prefersDark =
    typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches;

  var theme;
  if (stored === 'light' || stored === 'dark') {
    theme = stored;
  } else {
    theme = prefersDark ? 'dark' : 'light';
    /* Persist the resolved value on the very first visit too. Without this,
       a visitor who never touches the toggle has nothing stored, and any
       later navigation has to guess again. */
    try {
      if (stored !== 'system') localStorage.setItem(KEY, theme);
    } catch (e) {}
  }

  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;

  /* Scroll-reveal animations start their elements transparent, which would
     leave the page blank if scripting were unavailable. The class is added
     here — in a script that only runs when scripting works — so the reveal
     styles apply only when something exists to undo them. */
  root.classList.add('js');
})();
`.trim();

/** Reads the stored preference. Returns 'system' when nothing is stored. */
export function readStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isThemePreference(stored) ? stored : 'system';
  } catch {
    return 'system';
  }
}

/** Resolves a preference against the OS setting into a paintable theme. */
export function resolveTheme(preference: ThemePreference): Theme {
  if (preference === 'light' || preference === 'dark') return preference;
  return typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Applies a theme to the document and persists it.
 *
 * `colorScheme` is set alongside the attribute so that form controls,
 * scrollbars and other user-agent widgets follow the theme as well — CSS
 * alone would leave them light on a dark page.
 */
export function applyTheme(preference: ThemePreference): Theme {
  const theme = resolveTheme(preference);
  const root = document.documentElement;

  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference === 'system' ? theme : preference);
  } catch {
    // No storage access — the choice applies to this session only.
  }

  return theme;
}

/** Reads the theme currently painted, straight from the DOM. */
export function readAppliedTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}
