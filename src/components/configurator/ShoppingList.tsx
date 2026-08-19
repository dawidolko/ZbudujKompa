'use client';

import { useCallback, useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { CheckIcon, DownloadIcon, ExternalIcon } from '@/components/ui/Icon';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { formatPriceRange, selectionPrice } from '@/lib/parts';
import type { BuildSelection } from '@/lib/parts';
import { selectionParts } from '@/lib/parts/autopick';
import { buildQuery, partQuery, shopsFor } from '@/lib/shops';
import { site } from '@/lib/site';
import { cn, t } from '@/lib/utils';

/**
 * Shopping list for a configured build.
 *
 * On why these are search links rather than a basket: no Polish retailer
 * publishes a public product API, and a static site has no server to proxy one
 * through even if they did. A search deep link is the honest equivalent — it
 * genuinely opens the shop with the part entered, and it keeps working when a
 * retailer reorganises its catalogue, which a scraped product id would not.
 */
export function ShoppingList({ selection, locale }: { selection: BuildSelection; locale: Locale }) {
  const dict = getDictionary(locale);
  const [copied, setCopied] = useState(false);

  const parts = useMemo(() => selectionParts(selection), [selection]);
  const price = useMemo(() => selectionPrice(selection), [selection]);
  const availableShops = useMemo(() => shopsFor(locale), [locale]);

  /** The list as plain text, for pasting into a note or a message. */
  const asText = useMemo(() => {
    const lines = [
      dict.shopping.listTitle,
      '='.repeat(dict.shopping.listTitle.length),
      '',
      ...parts.map(
        (part) =>
          `- ${dict.configurator.category[part.category]}: ${part.brand} ${part.name}  (${formatPriceRange(part.price, locale)})`,
      ),
      '',
      `${dict.configurator.estimatedPrice}: ${formatPriceRange(price, locale)}`,
      '',
      dict.shopping.priceDisclaimer,
      site.url,
    ];
    return lines.join('\n');
  }, [parts, price, locale, dict]);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(asText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      /* Clipboard access can be refused. The download below always works, so
         the reader is not left without a way to keep the list. */
    }
  }, [asText]);

  const download = useCallback(() => {
    const blob = new Blob([asText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `zbudujkompa-${locale}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }, [asText, locale]);

  if (parts.length === 0) return null;

  return (
    <section className="rounded-lg border border-border-subtle bg-surface p-5 md:p-6">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-display text-lg font-bold text-text-primary">{dict.shopping.title}</h3>
        <p className="font-display text-lg font-bold text-accent-fg">
          {formatPriceRange(price, locale)}
        </p>
      </div>

      {/* ---- The parts, each with its own shop links ---- */}
      <ul className="divide-y divide-border-subtle">
        {parts.map((part) => (
          <li key={part.id} className="py-3 first:pt-0">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs font-bold tracking-wide text-text-muted uppercase">
                  {dict.configurator.category[part.category]}
                </p>
                <p className="font-semibold text-text-primary">
                  {part.brand} {part.name}
                </p>
                <p className="text-xs text-text-muted">{t(part.note, locale)}</p>
              </div>
              <Badge tone="neutral" className="shrink-0">
                {formatPriceRange(part.price, locale)}
              </Badge>
            </div>

            <ul className="mt-2 flex flex-wrap gap-1.5">
              {availableShops.map((shop) => (
                <li key={shop.id}>
                  <a
                    href={shop.search(partQuery(part))}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-1 rounded-xs border border-border-default px-2 py-1 text-xs text-text-secondary transition-colors hover:border-border-brand hover:text-text-primary focus-ring"
                  >
                    {shop.name}
                    <ExternalIcon className="size-3 shrink-0" aria-hidden="true" />
                    <span className="sr-only">
                      {dict.shopping.searchAt(shop.name, `${part.brand} ${part.name}`)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* ---- Whole-list actions ---- */}
      <div className="mt-5 flex flex-wrap gap-2 border-t border-border-subtle pt-4">
        <button
          type="button"
          onClick={copy}
          className={cn(
            'inline-flex h-11 items-center gap-2 rounded-sm border px-4 text-sm font-semibold transition-colors focus-ring',
            copied
              ? 'border-success text-success'
              : 'border-border-default text-text-primary hover:border-border-brand',
          )}
        >
          {copied ? <CheckIcon className="size-4" aria-hidden="true" /> : null}
          {copied ? dict.shopping.copied : dict.shopping.copy}
        </button>

        <button
          type="button"
          onClick={download}
          className="inline-flex h-11 items-center gap-2 rounded-sm border border-border-default px-4 text-sm font-semibold text-text-primary transition-colors hover:border-border-brand focus-ring"
        >
          <DownloadIcon className="size-4" aria-hidden="true" />
          {dict.shopping.download}
        </button>

        {availableShops.slice(0, 2).map((shop) => (
          <a
            key={shop.id}
            href={shop.search(buildQuery(parts))}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex h-11 items-center gap-2 rounded-sm bg-accent px-4 text-sm font-semibold tracking-wide text-text-on-brand uppercase transition-colors hover:bg-accent-hover focus-ring"
          >
            {dict.shopping.openAt(shop.name)}
            <ExternalIcon className="size-4" aria-hidden="true" />
            <span className="sr-only">({dict.common.externalLink})</span>
          </a>
        ))}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-text-muted">{dict.shopping.disclaimer}</p>
    </section>
  );
}
