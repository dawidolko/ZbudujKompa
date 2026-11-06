import { ExternalIcon } from '@/components/ui/Icon';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { unavailableReason } from '@/lib/parts';
import type { Part } from '@/lib/parts';
import { partQuery, priceShops } from '@/lib/shops';
import { cn } from '@/lib/utils';

/**
 * Links that open the current search for a part at the price sites.
 *
 * This is the live price on a static site: the page cannot read a shop, but it
 * can put the reader on the shop's own results in one click. None of the links
 * carry an affiliate tag.
 *
 * Each link is `relative` so its screen-reader text stays inside it. Absolutely
 * positioned text with no positioned ancestor escapes a scrolling table and
 * widens the whole page on a phone.
 */
export function PriceLinks({
  query,
  name,
  locale,
  className,
  bare = false,
}: {
  /** The text entered into each site's search. */
  query: string;
  /** The part's name, for the link's accessible label. */
  name: string;
  locale: Locale;
  className?: string;
  /** Leaves out the label where a table row already provides one. */
  bare?: boolean;
}) {
  const dict = getDictionary(locale);

  return (
    <div className={cn('flex flex-wrap items-center gap-x-2 gap-y-1.5', className)}>
      {bare ? null : <span className="text-xs text-text-muted">{dict.prices.liveLabel}</span>}
      <ul className="flex flex-wrap gap-1.5">
        {priceShops().map((shop) => (
          <li key={shop.id}>
            <a
              href={shop.search(query)}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex min-h-6 items-center gap-1 rounded-xs border border-border-default px-2 py-0.5 text-xs text-text-secondary transition-colors hover:border-border-brand hover:text-text-primary focus-ring"
            >
              {shop.name}
              <ExternalIcon className="size-3 shrink-0" aria-hidden="true" />
              <span className="sr-only">{dict.prices.linkLabel(shop.name, name)}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Why a part has no price, plus the live links, for a catalogue card. */
export function PartPriceDetails({
  part,
  locale,
  className,
}: {
  part: Part;
  locale: Locale;
  className?: string;
}) {
  const dict = getDictionary(locale);
  const reason = unavailableReason(part.id);

  return (
    <div className={cn('space-y-1.5', className)}>
      {reason ? <p className="text-xs text-text-secondary">{dict.prices.reason[reason]}</p> : null}
      <PriceLinks query={partQuery(part)} name={`${part.brand} ${part.name}`} locale={locale} />
    </div>
  );
}
