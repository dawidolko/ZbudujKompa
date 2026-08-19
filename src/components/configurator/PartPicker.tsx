'use client';

import { useId, useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { CheckIcon, ChevronDownIcon } from '@/components/ui/Icon';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { formatPriceRange, getPartsByCategory } from '@/lib/parts';
import type { Part, PartCategory, PriceTier } from '@/lib/parts';
import { cn, t } from '@/lib/utils';

/**
 * Picker for one component category.
 *
 * Rendered as a disclosure rather than a `<select>`: each option carries a
 * price band, a specification summary and a sentence of reasoning, and a native
 * select can show none of that. The trade-off is that every keyboard and
 * screen-reader behaviour a select gives for free has to be built here, which
 * is what the radio group below does — `role="radiogroup"` with real radio
 * inputs, so arrow keys and announcements work as they should.
 */
export function PartPicker({
  category,
  locale,
  selected,
  onSelect,
  /** Categories that are part of a conflict, so this picker can flag itself. */
  conflicting,
}: {
  category: PartCategory;
  locale: Locale;
  selected?: string;
  onSelect: (id: string | undefined) => void;
  conflicting?: boolean;
}) {
  const dict = getDictionary(locale);
  const groupId = useId();
  const [open, setOpen] = useState(false);
  const [tierFilter, setTierFilter] = useState<PriceTier | 'all'>('all');

  const parts = useMemo(() => getPartsByCategory(category), [category]);
  const visible = useMemo(
    () => (tierFilter === 'all' ? parts : parts.filter((part) => part.tier === tierFilter)),
    [parts, tierFilter],
  );

  const chosen = parts.find((part) => part.id === selected);

  /* Only the tiers actually present in this category are offered. Showing an
     empty "flagship" filter for storage would be a dead control. */
  const tiers = useMemo(() => Array.from(new Set(parts.map((part) => part.tier))), [parts]);

  return (
    <div
      className={cn(
        'rounded-lg border bg-surface transition-colors',
        conflicting ? 'border-danger' : 'border-border-subtle',
      )}
    >
      <div className="flex flex-wrap items-center gap-3 p-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold tracking-wide text-text-muted uppercase">
            {dict.configurator.category[category]}
          </p>
          <p className="mt-0.5 truncate font-semibold text-text-primary">
            {chosen ? `${chosen.brand} ${chosen.name}` : dict.configurator.notChosen}
          </p>
          {chosen ? (
            <p className="mt-0.5 text-xs text-text-muted">
              {formatPriceRange(chosen.price, locale)}
            </p>
          ) : null}
        </div>

        {chosen ? (
          <button
            type="button"
            onClick={() => onSelect(undefined)}
            className="rounded-sm px-2 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-bg-muted hover:text-text-primary focus-ring"
          >
            {dict.configurator.clear}
          </button>
        ) : null}

        <button
          type="button"
          aria-expanded={open}
          aria-controls={groupId}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 items-center gap-1.5 rounded-sm border border-border-default px-3 text-sm font-semibold text-text-primary transition-colors hover:border-border-brand focus-ring"
        >
          {chosen ? dict.configurator.change : dict.configurator.choose}
          <ChevronDownIcon className={cn('size-4 transition-transform', open && 'rotate-180')} />
        </button>
      </div>

      <div id={groupId} hidden={!open} className="border-t border-border-subtle p-4">
        {tiers.length > 1 ? (
          <div className="mb-4 flex flex-wrap gap-1.5">
            <FilterChip
              active={tierFilter === 'all'}
              onClick={() => setTierFilter('all')}
              label={dict.configurator.allTiers}
            />
            {tiers.map((tier) => (
              <FilterChip
                key={tier}
                active={tierFilter === tier}
                onClick={() => setTierFilter(tier)}
                label={dict.configurator.tier[tier]}
              />
            ))}
          </div>
        ) : null}

        <div
          role="radiogroup"
          aria-label={dict.configurator.category[category]}
          className="grid gap-2"
        >
          {visible.map((part) => (
            <PartOption
              key={part.id}
              part={part}
              locale={locale}
              name={groupId}
              checked={part.id === selected}
              onSelect={() => {
                onSelect(part.id);
                setOpen(false);
              }}
            />
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="text-sm text-text-secondary">{dict.configurator.noneInTier}</p>
        ) : null}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-xs border px-2.5 py-1 text-xs font-semibold transition-colors focus-ring',
        active
          ? 'border-border-brand bg-accent-subtle text-accent-fg'
          : 'border-border-default text-text-secondary hover:text-text-primary',
      )}
    >
      {label}
    </button>
  );
}

/**
 * One selectable part.
 *
 * The radio input is visually hidden rather than replaced, so the control keeps
 * native keyboard behaviour — arrow keys move within the group — while the
 * label carries the design. `focus-within` moves the ring onto the card so a
 * keyboard user sees the same boundary a pointer user hits.
 */
function PartOption({
  part,
  locale,
  name,
  checked,
  onSelect,
}: {
  part: Part;
  locale: Locale;
  name: string;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      className={cn(
        'flex cursor-pointer gap-3 rounded-md border p-3 transition-colors',
        'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--focus-ring)]',
        checked
          ? 'border-border-brand bg-accent-subtle'
          : 'border-border-subtle hover:border-border-default',
      )}
    >
      <input type="radio" name={name} checked={checked} onChange={onSelect} className="sr-only" />

      <span
        aria-hidden="true"
        className={cn(
          'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border',
          checked ? 'border-accent bg-accent' : 'border-border-default',
        )}
      >
        {checked ? <CheckIcon className="size-3 text-text-on-brand" /> : null}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="font-semibold text-text-primary">
            {part.brand} {part.name}
          </span>
          <span className="text-xs font-medium text-accent-fg">
            {formatPriceRange(part.price, locale)}
          </span>
        </span>

        <span className="mt-1 block text-xs leading-relaxed text-text-secondary">
          {t(part.note, locale)}
        </span>

        <span className="mt-2 flex flex-wrap gap-1.5">
          <PartSpecs part={part} />
        </span>
      </span>
    </label>
  );
}

/**
 * Key specifications as badges.
 *
 * Each category shows the two or three figures that actually drive a decision
 * in that category — core count for a CPU, length for a graphics card — rather
 * than a uniform row of fields that would be padding for most parts.
 */
function PartSpecs({ part }: { part: Part }) {
  switch (part.category) {
    case 'cpu':
      return (
        <>
          <Badge tone="neutral">
            {part.cores}C / {part.threads}T
          </Badge>
          <Badge tone="neutral">{part.tdp} W TDP</Badge>
          <Badge tone={part.brand === 'AMD' ? 'amd' : 'intel'}>{part.socket.toUpperCase()}</Badge>
        </>
      );
    case 'motherboard':
      return (
        <>
          <Badge tone="neutral">{part.chipset}</Badge>
          <Badge tone="neutral">{part.formFactor}</Badge>
          <Badge tone="neutral">{part.memoryType.toUpperCase()}</Badge>
        </>
      );
    case 'ram':
      return (
        <>
          <Badge tone="neutral">{part.capacity} GB</Badge>
          <Badge tone="neutral">
            {part.type.toUpperCase()}-{part.speed}
          </Badge>
          <Badge tone="neutral">CL{part.casLatency}</Badge>
        </>
      );
    case 'gpu':
      return (
        <>
          <Badge tone="neutral">{part.vram} GB</Badge>
          <Badge tone="neutral">{part.tdp} W</Badge>
          <Badge tone="neutral">{part.length} mm</Badge>
        </>
      );
    case 'storage':
      return (
        <>
          <Badge tone="neutral">
            {part.capacity >= 1000 ? `${part.capacity / 1000} TB` : `${part.capacity} GB`}
          </Badge>
          <Badge tone="neutral">{part.kind.toUpperCase()}</Badge>
        </>
      );
    case 'psu':
      return (
        <>
          <Badge tone="neutral">{part.wattage} W</Badge>
          <Badge tone="neutral">80+ {part.efficiency}</Badge>
          <Badge tone="neutral">{part.warranty} lat</Badge>
        </>
      );
    case 'case':
      return (
        <>
          <Badge tone="neutral">{part.volume} l</Badge>
          <Badge tone="neutral">GPU {part.maxGpuLength} mm</Badge>
          <Badge tone="neutral">CPU {part.maxCoolerHeight} mm</Badge>
        </>
      );
    case 'cooler':
      return (
        <>
          <Badge tone="neutral">{part.wattage} W</Badge>
          <Badge tone="neutral">{part.noise} dBA</Badge>
          {part.height ? <Badge tone="neutral">{part.height} mm</Badge> : null}
          {part.radiatorSize ? <Badge tone="neutral">{part.radiatorSize} mm</Badge> : null}
        </>
      );
  }
}
