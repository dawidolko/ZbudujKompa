'use client';

import { useDeferredValue, useId, useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { ExternalIcon, SearchIcon } from '@/components/ui/Icon';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { allParts, categoryOrder, formatPriceRange, priceTiers } from '@/lib/parts';
import type { Part, PartCategory, PriceTier } from '@/lib/parts';
import { cn, t } from '@/lib/utils';

type Sort = 'name' | 'price-asc' | 'price-desc';

/**
 * Filterable catalogue of every component.
 *
 * The whole list is filtered in the browser rather than paginated, because the
 * catalogue is small enough that a reader benefits more from seeing everything
 * at once than from clicking through pages.
 *
 * `useDeferredValue` keeps typing responsive: React renders the filtered list at
 * a lower priority, so the input never lags behind keystrokes.
 */
export function PartBrowser({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const searchId = useId();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<PartCategory | 'all'>('all');
  const [tier, setTier] = useState<PriceTier | 'all'>('all');
  const [sort, setSort] = useState<Sort>('name');

  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase();

    const filtered = allParts.filter((part) => {
      if (category !== 'all' && part.category !== category) return false;
      if (tier !== 'all' && part.tier !== tier) return false;
      if (!needle) return true;
      return (
        part.name.toLowerCase().includes(needle) ||
        part.brand.toLowerCase().includes(needle) ||
        t(part.note, locale).toLowerCase().includes(needle)
      );
    });

    /* Sorting by the lower bound of the band rather than a midpoint: it is the
       number a reader compares when asking "what can I afford". */
    return [...filtered].sort((a, b) => {
      if (sort === 'price-asc') return a.price.min - b.price.min;
      if (sort === 'price-desc') return b.price.min - a.price.min;
      return `${a.brand} ${a.name}`.localeCompare(`${b.brand} ${b.name}`, locale);
    });
  }, [deferredQuery, category, tier, sort, locale]);

  return (
    <div>
      {/* ---- Filters ---- */}
      <div className="mb-6 grid gap-4 rounded-lg border border-border-subtle bg-surface p-4 md:p-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <label
              htmlFor={searchId}
              className="mb-1.5 block text-sm font-semibold text-text-primary"
            >
              {dict.glossary.searchLabel}
            </label>
            <div className="relative">
              <SearchIcon
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-muted"
                aria-hidden="true"
              />
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={dict.glossary.searchPlaceholder}
                className="h-11 w-full rounded-sm border border-border-default bg-bg-base pr-3 pl-9 text-sm text-text-primary placeholder:text-text-muted focus-ring"
              />
            </div>
          </div>

          <Select
            label={dict.parts.filterCategory}
            value={category}
            onChange={(value) => setCategory(value as PartCategory | 'all')}
            options={[
              { value: 'all', label: dict.parts.all },
              ...categoryOrder.map((item) => ({
                value: item,
                label: dict.configurator.category[item],
              })),
            ]}
          />

          <Select
            label={dict.parts.filterTier}
            value={tier}
            onChange={(value) => setTier(value as PriceTier | 'all')}
            options={[
              { value: 'all', label: dict.parts.all },
              ...priceTiers.map((item) => ({
                value: item,
                label: dict.configurator.tier[item],
              })),
            ]}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-4">
          {/* Announced, because the count changes with no focus movement. */}
          <p aria-live="polite" className="text-sm text-text-muted">
            {dict.parts.resultCount(results.length)}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-xs tracking-wide text-text-muted uppercase">
              {dict.parts.sortBy}
            </span>
            {(
              [
                ['name', dict.parts.sortName],
                ['price-asc', dict.parts.sortPriceAsc],
                ['price-desc', dict.parts.sortPriceDesc],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setSort(value)}
                aria-pressed={sort === value}
                className={cn(
                  'rounded-xs border px-2.5 py-1 text-xs font-semibold transition-colors focus-ring',
                  sort === value
                    ? 'border-border-brand bg-accent-subtle text-accent-fg'
                    : 'border-border-default text-text-secondary hover:text-text-primary',
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Results ---- */}
      {results.length === 0 ? (
        <p className="text-sm text-text-secondary">{dict.parts.noResults}</p>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {results.map((part) => (
            <li key={part.id}>
              <PartCard part={part} locale={locale} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-text-primary">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-sm border border-border-default bg-bg-base px-3 text-sm text-text-primary focus-ring"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function PartCard({ part, locale }: { part: Part; locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <article className="hover-lift flex h-full flex-col rounded-lg border border-border-subtle bg-surface p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-bold tracking-wide text-text-muted uppercase">
            {dict.configurator.category[part.category]}
          </p>
          <h3 className="font-display mt-0.5 font-bold text-text-primary">
            {part.brand} {part.name}
          </h3>
        </div>
        <Badge tone="brand">{dict.configurator.tier[part.tier]}</Badge>
      </div>

      <p className="font-display mt-2 text-lg font-bold text-accent-fg">
        {formatPriceRange(part.price, locale)}
      </p>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
        {t(part.note, locale)}
      </p>

      {/* A visual bar for the categories that have a comparable score. Bars
          are paired with the number, because a bar alone cannot be read out. */}
      {part.category === 'gpu' ? (
        <ScoreBar label={dict.parts.performance} value={part.performanceScore} />
      ) : null}
      {part.category === 'cpu' ? (
        <ScoreBar label={dict.parts.performance} value={part.gamingScore} />
      ) : null}

      {part.url ? (
        <a
          href={part.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="mt-3 inline-flex items-center gap-1.5 self-start rounded-xs text-xs font-semibold text-text-brand underline underline-offset-2 focus-ring"
        >
          {dict.common.learnMore}
          <ExternalIcon className="size-3" aria-hidden="true" />
          <span className="sr-only">({dict.common.externalLink})</span>
        </a>
      ) : null}
    </article>
  );
}

/**
 * A relative performance bar.
 *
 * The numeric value sits beside the bar rather than being implied by its width,
 * so the information survives for anyone who cannot see the graphic.
 */
function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="mt-3">
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-text-muted">{label}</span>
        <span className="font-semibold text-text-primary">{value}/100</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-bg-muted">
        <div
          className="animate-grow-bar h-full rounded-full bg-accent"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
