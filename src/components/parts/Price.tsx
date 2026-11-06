'use client';

import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { catalogueCheckedAt, formatPriceRange } from '@/lib/parts';
import type { PriceRange } from '@/lib/parts';
import { cn } from '@/lib/utils';
import { PriceLinks } from './PriceLinks';
import { usePriceStale } from './usePriceStale';

/**
 * A price, or a way to find the current one.
 *
 * Every figure on the site goes through here, so a price past its age limit
 * cannot be shown by accident. Once expired, the figure leaves the page and the
 * reader gets the live offers instead. Pass `query` wherever a single search can
 * stand in for the figure; a total of many parts has none, and relies on the
 * links beside each of its parts.
 *
 * The expired state renders block content, so a parent has to allow it.
 */
export function Price({
  range,
  locale,
  query,
  name,
  className,
}: {
  range: PriceRange;
  locale: Locale;
  /** The text entered into each price site's search once the figure expires. */
  query?: string;
  /** The part's name, for the accessible label of those links. */
  name?: string;
  className?: string;
}) {
  const dict = getDictionary(locale);
  const checkedAt = range.checkedAt ?? catalogueCheckedAt();
  const stale = usePriceStale(checkedAt);

  if (range.unavailable) {
    return <span className={className}>{formatPriceRange(range, locale)}</span>;
  }

  if (stale) {
    return (
      <div data-price-state="expired" className="min-w-0">
        <p className="text-sm font-semibold text-text-primary">{dict.prices.checkCurrent}</p>
        {query ? (
          <PriceLinks query={query} name={name ?? query} locale={locale} className="mt-1" bare />
        ) : null}
      </div>
    );
  }

  return (
    <span data-price-date={checkedAt} className={cn('whitespace-nowrap', className)}>
      {formatPriceRange(range, locale)}
    </span>
  );
}
