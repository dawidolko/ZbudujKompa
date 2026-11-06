'use client';

import { useSyncExternalStore } from 'react';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { catalogueCheckedAt, isPriceStale } from '@/lib/parts';
import { cn, formatCalendarDate } from '@/lib/utils';

/* The clock never notifies anyone, so there is nothing to subscribe to. */
const subscribe = () => () => {};

/**
 * The date prices were checked, and a warning once that date is too old.
 *
 * The page is exported at build time, so the age can only be judged in the
 * reader's browser: a value computed during the build would be frozen on the
 * day of the deploy. The server snapshot is "not stale", which keeps the markup
 * identical on hydration, and the warning appears straight after it.
 */
export function PriceChecked({
  locale,
  checkedAt = catalogueCheckedAt(),
  className,
}: {
  locale: Locale;
  checkedAt?: string;
  className?: string;
}) {
  const dict = getDictionary(locale);
  const stale = useSyncExternalStore(
    subscribe,
    () => isPriceStale(checkedAt, Date.now()),
    () => false,
  );

  const date = formatCalendarDate(checkedAt, locale);

  return (
    <p
      data-price-checked={stale ? 'stale' : 'fresh'}
      className={cn(
        'text-xs leading-relaxed',
        stale ? 'font-semibold text-text-primary' : 'text-text-muted',
        className,
      )}
    >
      {stale ? dict.prices.stale(date) : dict.prices.checked(date)}
    </p>
  );
}
