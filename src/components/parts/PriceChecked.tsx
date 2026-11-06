'use client';

import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { catalogueCheckedAt } from '@/lib/parts';
import { cn, formatCalendarDate } from '@/lib/utils';
import { usePriceStale } from './usePriceStale';

/** The date prices were checked, and why they are hidden once it is too old. */
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
  const stale = usePriceStale(checkedAt);

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
