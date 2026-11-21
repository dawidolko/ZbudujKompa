'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { localePath } from '@/i18n/config';
import { buildParts, partLabel, type BuildParts } from '@/lib/parts/calculator-inputs';
import { readSavedBuild } from '@/lib/parts/saved-build';

/**
 * Catalogue pickers shared by the calculators.
 *
 * A calculator asks for numbers — watts, millimetres, a CAS latency — and
 * most readers know a part's name, not its specification. These controls let
 * them pick the part instead and fill the numbers from the catalogue, while
 * the numbers stay editable and the first option keeps manual entry for a
 * part the catalogue does not list.
 *
 * Both are native controls on purpose: a `<select>` with option groups is
 * keyboard- and screen-reader-accessible everywhere, and on a phone it opens
 * the platform's own picker, which beats any custom list at 390 px.
 */

export type PartOption = { value: string; label: string; group?: string };

/** Builds options from parts, grouped by a key such as brand or socket. */
export function partOptions<T extends { id: string; brand: string; name: string }>(
  parts: readonly T[],
  group?: (part: T) => string,
  extra?: (part: T) => string,
): PartOption[] {
  return parts.map((part) => ({
    value: part.id,
    label: extra ? `${partLabel(part)} — ${extra(part)}` : partLabel(part),
    group: group?.(part),
  }));
}

/**
 * A part picker whose empty value means "not on the list, entered by hand".
 *
 * Choosing a part calls `onChange` with its id; the calculator fills its own
 * fields from it. Editing one of those fields afterwards is expected to set
 * the picker back to manual, so it never claims a part the figures no longer
 * describe.
 */
export function PartSelect({
  label,
  value,
  onChange,
  options,
  manualLabel,
  hint,
}: {
  label: string;
  value: string;
  onChange: (id: string) => void;
  options: PartOption[];
  /** Overrides the default "not on the list" wording for the empty option. */
  manualLabel?: string;
  hint?: string;
}) {
  const id = useId();
  const hintId = `${id}-hint`;
  const groups: { name: string | undefined; options: PartOption[] }[] = [];
  for (const option of options) {
    const last = groups.at(-1);
    if (last && last.name === option.group) last.options.push(option);
    else groups.push({ name: option.group, options: [option] });
  }

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-text-primary">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby={hint ? hintId : undefined}
        className="h-11 w-full min-w-0 rounded-sm border border-border-default bg-bg-base px-3 text-sm text-text-primary focus-ring"
      >
        <option value="">{manualLabel ?? '—'}</option>
        {groups.map((group, index) =>
          group.name ? (
            <optgroup key={`${group.name}-${index}`} label={group.name}>
              {group.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </optgroup>
          ) : (
            group.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          ),
        )}
      </select>
      {hint ? (
        <p id={hintId} className="mt-1 text-xs text-text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/**
 * "Load my build from the configurator".
 *
 * Reads the build only when pressed, never on render, so the static page and
 * the hydrated one match and a reader who never used the configurator sees no
 * difference. The outcome is announced in a status region, because the
 * fields change without any focus movement.
 */
export function LoadBuildButton({
  locale,
  onLoad,
  uses,
}: {
  locale: Locale;
  /** Receives the parts; returns the names it actually used, for the announcement. */
  onLoad: (parts: BuildParts) => string[];
  /** Categories this calculator reads, so an irrelevant build reports nothing to load. */
  uses: (keyof BuildParts)[];
}) {
  const dict = getDictionary(locale);
  const [status, setStatus] = useState<{ kind: 'loaded' | 'empty'; text: string } | null>(null);

  const load = () => {
    const saved = readSavedBuild();
    const parts = saved ? buildParts(saved) : {};
    if (!uses.some((category) => parts[category])) {
      setStatus({ kind: 'empty', text: dict.calc.picker.noBuild });
      return;
    }
    const names = onLoad(parts);
    setStatus({ kind: 'loaded', text: dict.calc.picker.loaded(names.join(', ')) });
  };

  return (
    <div className="border-l-4 border-border-brand bg-accent-subtle p-3">
      <button
        type="button"
        onClick={load}
        className="inline-flex min-h-11 items-center rounded-sm border border-border-brand bg-bg-base px-3 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-muted focus-ring"
      >
        {dict.calc.picker.loadBuild}
      </button>
      <p className="mt-2 text-xs text-text-secondary">{dict.calc.picker.loadBuildHint}</p>
      <p role="status" className="mt-1 text-xs text-text-primary empty:hidden">
        {status?.text}
        {status?.kind === 'empty' ? (
          <>
            {' '}
            <Link href={localePath(locale, '/konfigurator')} className="underline focus-ring">
              {dict.calc.picker.openConfigurator}
            </Link>
          </>
        ) : null}
      </p>
    </div>
  );
}
