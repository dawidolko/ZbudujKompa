'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { MoonIcon, SunIcon } from '@/components/ui/Icon';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { applyTheme, readAppliedTheme, THEME_STORAGE_KEY, type Theme } from '@/lib/theme';
import { cn } from '@/lib/utils';

/**
 * Subscribes to the theme.
 *
 * The theme lives outside React — it is an attribute on <html> written by the
 * blocking init script before hydration. Reading it through
 * useSyncExternalStore keeps a single source of truth: no duplicated state, no
 * setState-in-an-effect, and no window where React believes one thing while
 * the document shows another.
 */
function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  /* A change in the OS setting only moves the page when the visitor has not
     made an explicit choice of their own. */
  const media = matchMedia('(prefers-color-scheme: dark)');
  const onMediaChange = (event: MediaQueryListEvent) => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      return;
    }
    if (stored === 'light' || stored === 'dark') return;
    applyTheme(event.matches ? 'dark' : 'light');
  };
  media.addEventListener('change', onMediaChange);

  return () => {
    observer.disconnect();
    media.removeEventListener('change', onMediaChange);
  };
}

/**
 * There is no DOM during prerender. Returning 'light' matches what the static
 * HTML contains, so the server and the first client render agree and React
 * does not report a hydration mismatch; the store corrects it immediately
 * afterwards if the real theme differs.
 */
const getServerSnapshot = (): Theme => 'light';

export function ThemeToggle({ locale, className }: { locale: Locale; className?: string }) {
  const dict = getDictionary(locale);
  const theme = useSyncExternalStore(subscribe, readAppliedTheme, getServerSnapshot);

  const toggle = useCallback(() => {
    applyTheme(readAppliedTheme() === 'dark' ? 'light' : 'dark');
  }, []);

  const label = theme === 'dark' ? dict.theme.toLight : dict.theme.toDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      /* The button reports the state it controls, so a screen reader announces
         "dark mode, pressed" rather than leaving the current theme implicit. */
      aria-pressed={theme === 'dark'}
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-sm text-text-secondary',
        'transition-colors hover:bg-bg-muted hover:text-text-primary focus-ring',
        className,
      )}
    >
      {theme === 'light' ? (
        <MoonIcon className="size-5" aria-hidden />
      ) : (
        <SunIcon className="size-5" aria-hidden />
      )}
    </button>
  );
}
