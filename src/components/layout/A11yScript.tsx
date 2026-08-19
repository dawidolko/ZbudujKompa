'use client';

import { useEffect } from 'react';
import { A11Y_STORAGE_KEY, applyA11ySettings, readA11ySettings } from '@/lib/accessibility';

/**
 * Reapplies accessibility preferences after client-side navigation.
 *
 * Same reasoning as ThemeScript: each locale renders its own <html>, Next
 * treats the link between them as a soft navigation, and React reconciles the
 * root element against markup carrying none of these attributes — dropping
 * them. The blocking head script covers the cold load; this covers the rest.
 */
export function A11yScript() {
  useEffect(() => {
    applyA11ySettings(readA11ySettings());

    /* Keep tabs in step: a reader who enlarges the text in one tab expects the
       others to follow rather than staying inconsistent. */
    function onStorage(event: StorageEvent) {
      if (event.key === A11Y_STORAGE_KEY) applyA11ySettings(readA11ySettings());
    }

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  });

  return null;
}
