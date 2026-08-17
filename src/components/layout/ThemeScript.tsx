'use client';

import { useEffect } from 'react';
import { readStoredPreference, resolveTheme, THEME_STORAGE_KEY } from '@/lib/theme';

/**
 * Keeps `data-theme` on <html> correct after client-side navigation.
 *
 * Why this is needed on top of the blocking init script
 * ----------------------------------------------------
 * Each locale renders its own <html>, but Next.js still treats a link between
 * them as a client-side navigation. The new document's <head> script therefore
 * never executes, and React reconciles the <html> element against markup that
 * has no `data-theme` attribute — so the attribute is simply dropped and the
 * page falls back to the light default. That is the mechanism behind the
 * reported "switching language resets the site to day mode" bug; the stored
 * preference was correct all along, nothing was left to re-apply it.
 *
 * This component re-applies the resolved theme on every mount, which covers
 * the soft-navigation case. The blocking script in <head> is still required
 * and still does the important half of the job: it paints the correct theme on
 * a cold load before the first frame, which an effect — running after
 * hydration — cannot do without a visible flash.
 */
export function ThemeScript() {
  useEffect(() => {
    const root = document.documentElement;

    function apply() {
      const theme = resolveTheme(readStoredPreference());
      /* Only touch the DOM when it actually disagrees, so we do not trigger
         the MutationObserver in ThemeToggle on every navigation. */
      if (root.getAttribute('data-theme') !== theme) {
        root.setAttribute('data-theme', theme);
      }
      if (root.style.colorScheme !== theme) {
        root.style.colorScheme = theme;
      }
    }

    apply();

    /* Keep the theme in step across tabs: a change made in one tab should be
       reflected in the others rather than leaving them inconsistent. */
    function onStorage(event: StorageEvent) {
      if (event.key === THEME_STORAGE_KEY) apply();
    }

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  });

  return null;
}
