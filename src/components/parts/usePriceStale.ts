'use client';

import { useSyncExternalStore } from 'react';
import { builtAt, catalogueCheckedAt, isPriceStale } from '@/lib/parts';

/* A tab left open can cross the limit, so the answer is renewed on return. */
function subscribe(onChange: () => void): () => void {
  document.addEventListener('visibilitychange', onChange);
  return () => document.removeEventListener('visibilitychange', onChange);
}

/**
 * Whether a check date is too old for its price to be shown.
 *
 * The server snapshot is judged at build time and the browser snapshot against
 * the reader's clock, because a static page can be read long after it was built.
 */
export function usePriceStale(checkedAt: string = catalogueCheckedAt()): boolean {
  return useSyncExternalStore(
    subscribe,
    () => isPriceStale(checkedAt, Date.now()),
    () => isPriceStale(checkedAt, builtAt()),
  );
}
