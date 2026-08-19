'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { CloseIcon } from '@/components/ui/Icon';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { formatPriceRange, getPartsByCategory } from '@/lib/parts';
import type { Part, PartCategory } from '@/lib/parts';
import { cn, t } from '@/lib/utils';

/** How many parts can be compared at once before the table stops being readable. */
const MAX_COMPARE = 3;

/**
 * Side-by-side comparison for one category.
 *
 * Capped at three columns: beyond that the table needs horizontal scrolling on
 * most screens, and comparing things you cannot see at the same time defeats
 * the point of a comparison.
 *
 * Rows are chosen per category rather than shared, because the figures that
 * decide a graphics card and a power supply have almost nothing in common, and
 * a shared schema would be mostly empty cells.
 */
export function ComparisonTable({
  category,
  locale,
  initial = [],
}: {
  category: PartCategory;
  locale: Locale;
  /** Part ids to pre-select, so a page can open on a useful comparison. */
  initial?: string[];
}) {
  const dict = getDictionary(locale);
  const parts = useMemo(() => getPartsByCategory(category), [category]);

  const [selected, setSelected] = useState<string[]>(() => initial.slice(0, MAX_COMPARE));

  const chosen = useMemo(
    () => selected.map((id) => parts.find((part) => part.id === id)).filter(Boolean) as Part[],
    [selected, parts],
  );

  const toggle = (id: string) => {
    setSelected((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= MAX_COMPARE) return current;
      return [...current, id];
    });
  };

  const rows = useMemo(() => comparisonRows(chosen, locale, dict), [chosen, locale, dict]);

  return (
    <div>
      {/* ---- Choose what to compare ---- */}
      <fieldset className="mb-5">
        <legend className="mb-2 text-sm font-semibold text-text-primary">
          {dict.comparison.pick(MAX_COMPARE)}
        </legend>
        <div className="flex flex-wrap gap-2">
          {parts.map((part) => {
            const active = selected.includes(part.id);
            const full = !active && selected.length >= MAX_COMPARE;
            return (
              <label
                key={part.id}
                className={cn(
                  'inline-flex cursor-pointer items-center gap-2 rounded-sm border px-3 py-2 text-sm transition-colors',
                  'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--focus-ring)]',
                  active
                    ? 'border-border-brand bg-accent-subtle text-accent-fg'
                    : full
                      ? 'cursor-not-allowed border-border-subtle text-text-muted'
                      : 'border-border-default text-text-secondary hover:text-text-primary',
                )}
              >
                <input
                  type="checkbox"
                  checked={active}
                  disabled={full}
                  onChange={() => toggle(part.id)}
                  className="sr-only"
                />
                {part.brand} {part.name}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* ---- The table ---- */}
      {chosen.length === 0 ? (
        <p className="text-sm text-text-secondary">{dict.comparison.empty}</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border-subtle">
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <caption className="sr-only">
              {dict.comparison.title} — {dict.configurator.category[category]}
            </caption>
            <thead>
              <tr className="border-b border-border-subtle bg-bg-muted text-left">
                <th scope="col" className="px-4 py-3 font-semibold text-text-primary">
                  {dict.comparison.property}
                </th>
                {chosen.map((part) => (
                  <th key={part.id} scope="col" className="px-4 py-3 align-top">
                    <span className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-text-primary">
                        {part.brand} {part.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggle(part.id)}
                        aria-label={dict.comparison.remove(`${part.brand} ${part.name}`)}
                        className="shrink-0 rounded-xs p-0.5 text-text-muted transition-colors hover:text-text-primary focus-ring"
                      >
                        <CloseIcon className="size-4" />
                      </button>
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-border-subtle last:border-0 even:bg-bg-subtle"
                >
                  <th scope="row" className="px-4 py-3 text-left font-medium text-text-secondary">
                    {row.label}
                  </th>
                  {row.values.map((value, index) => (
                    <td key={index} className="px-4 py-3 text-text-primary">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

type Row = { label: string; values: React.ReactNode[] };

/**
 * Builds the comparison rows for whichever category is being compared.
 *
 * Price and tier are shared because they apply to everything; the rest is
 * per-category, so each table shows the figures that actually distinguish the
 * parts in it.
 */
function comparisonRows(
  parts: Part[],
  locale: Locale,
  dict: ReturnType<typeof getDictionary>,
): Row[] {
  if (parts.length === 0) return [];

  const rows: Row[] = [
    {
      label: dict.comparison.price,
      values: parts.map((part) => formatPriceRange(part.price, locale)),
    },
    {
      label: dict.comparison.tier,
      values: parts.map((part) => (
        <Badge key={part.id} tone="brand">
          {dict.configurator.tier[part.tier]}
        </Badge>
      )),
    },
  ];

  const category = parts[0]!.category;

  if (category === 'cpu') {
    const cpus = parts as Extract<Part, { category: 'cpu' }>[];
    rows.push(
      { label: dict.comparison.cores, values: cpus.map((p) => `${p.cores} / ${p.threads}`) },
      { label: dict.comparison.socket, values: cpus.map((p) => p.socket.toUpperCase()) },
      { label: dict.comparison.tdp, values: cpus.map((p) => `${p.tdp} W`) },
      { label: dict.comparison.peak, values: cpus.map((p) => `${p.peakPower} W`) },
      { label: dict.comparison.gaming, values: cpus.map((p) => `${p.gamingScore}/100`) },
      { label: dict.comparison.multi, values: cpus.map((p) => `${p.multiScore}/100`) },
      {
        label: dict.comparison.igpu,
        values: cpus.map((p) => (p.integratedGraphics ? dict.comparison.yes : dict.comparison.no)),
      },
    );
  }

  if (category === 'gpu') {
    const gpus = parts as Extract<Part, { category: 'gpu' }>[];
    rows.push(
      { label: dict.comparison.vram, values: gpus.map((p) => `${p.vram} GB`) },
      { label: dict.comparison.tdp, values: gpus.map((p) => `${p.tdp} W`) },
      { label: dict.comparison.psuNeeded, values: gpus.map((p) => `${p.recommendedPsu} W`) },
      { label: dict.comparison.length, values: gpus.map((p) => `${p.length} mm`) },
      { label: dict.comparison.slots, values: gpus.map((p) => String(p.slots)) },
      { label: dict.comparison.performance, values: gpus.map((p) => `${p.performanceScore}/100`) },
      { label: dict.comparison.resolution, values: gpus.map((p) => p.targetResolution) },
    );
  }

  if (category === 'cooler') {
    const coolers = parts as Extract<Part, { category: 'cooler' }>[];
    rows.push(
      { label: dict.comparison.coolingType, values: coolers.map((p) => p.kind.toUpperCase()) },
      { label: dict.comparison.capacity, values: coolers.map((p) => `${p.wattage} W`) },
      { label: dict.comparison.noise, values: coolers.map((p) => `${p.noise} dBA`) },
      {
        label: dict.comparison.height,
        values: coolers.map((p) => (p.height ? `${p.height} mm` : `${p.radiatorSize} mm`)),
      },
    );
  }

  if (category === 'psu') {
    const psus = parts as Extract<Part, { category: 'psu' }>[];
    rows.push(
      { label: dict.comparison.wattage, values: psus.map((p) => `${p.wattage} W`) },
      { label: dict.comparison.efficiency, values: psus.map((p) => `80+ ${p.efficiency}`) },
      { label: dict.comparison.modular, values: psus.map((p) => p.modular) },
      { label: dict.comparison.warranty, values: psus.map((p) => `${p.warranty}`) },
    );
  }

  if (category === 'case') {
    const cases = parts as Extract<Part, { category: 'case' }>[];
    rows.push(
      { label: dict.comparison.volume, values: cases.map((p) => `${p.volume} l`) },
      { label: dict.comparison.maxGpu, values: cases.map((p) => `${p.maxGpuLength} mm`) },
      { label: dict.comparison.maxCooler, values: cases.map((p) => `${p.maxCoolerHeight} mm`) },
      { label: dict.comparison.drives, values: cases.map((p) => String(p.driveBays)) },
    );
  }

  if (category === 'ram') {
    const kits = parts as Extract<Part, { category: 'ram' }>[];
    rows.push(
      { label: dict.comparison.capacity, values: kits.map((p) => `${p.capacity} GB`) },
      {
        label: dict.comparison.speed,
        values: kits.map((p) => `${p.type.toUpperCase()}-${p.speed}`),
      },
      { label: dict.comparison.latency, values: kits.map((p) => `CL${p.casLatency}`) },
      { label: dict.comparison.height, values: kits.map((p) => `${p.height} mm`) },
    );
  }

  rows.push({
    label: dict.comparison.note,
    values: parts.map((part) => (
      <span key={part.id} className="text-xs leading-relaxed text-text-secondary">
        {t(part.note, locale)}
      </span>
    )),
  });

  return rows;
}
