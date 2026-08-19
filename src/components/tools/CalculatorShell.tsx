'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils';

/**
 * Shared layout and controls for the calculators.
 *
 * Every calculator on the site is the same shape — inputs on the left, a live
 * result panel on the right — so the layout, the announcement behaviour and
 * the input styling live here rather than being rebuilt each time and drifting
 * apart.
 *
 * All of them compute continuously rather than behind a submit button: the
 * result changes as the reader adjusts a figure, which is what makes the
 * relationship between input and output visible.
 */
export function CalculatorShell({
  inputs,
  result,
  explanation,
  className,
}: {
  inputs: React.ReactNode;
  result: React.ReactNode;
  /** The reasoning behind the number, always shown rather than hidden. */
  explanation?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start', className)}>
      <div className="space-y-5 rounded-lg border border-border-subtle bg-surface p-5 md:p-6">
        {inputs}
      </div>

      <aside className="rounded-lg border border-border-subtle bg-bg-subtle p-5 lg:sticky lg:top-24">
        {/* The result changes with no focus movement, so it is announced. */}
        <div aria-live="polite">{result}</div>

        {explanation ? (
          <div className="mt-5 border-t border-border-subtle pt-4 text-xs leading-relaxed text-text-secondary">
            {explanation}
          </div>
        ) : null}
      </aside>
    </div>
  );
}

/**
 * A labelled number input paired with a slider.
 *
 * Both controls are bound to the same value so a reader can drag for a rough
 * figure or type for an exact one. The slider carries `aria-hidden` because it
 * duplicates the number field: exposing both would make a screen reader
 * announce every value twice.
 */
export function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  hint,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  hint?: string;
}) {
  const id = useId();
  const hintId = `${id}-hint`;

  const clamp = (next: number) => Math.min(Math.max(next, min), max);

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-text-primary">
        {label}
        {unit ? <span className="ml-1 font-normal text-text-muted">({unit})</span> : null}
      </label>

      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(clamp(Number(event.target.value)))}
          tabIndex={-1}
          aria-hidden="true"
          className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-bg-muted accent-[var(--accent)]"
        />
        <input
          id={id}
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(clamp(Number(event.target.value) || min))}
          aria-describedby={hint ? hintId : undefined}
          className="h-10 w-24 rounded-sm border border-border-default bg-bg-base px-2 text-right text-sm text-text-primary focus-ring"
        />
      </div>

      {hint ? (
        <p id={hintId} className="mt-1 text-xs text-text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** A labelled select for a small, fixed set of choices. */
export function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
  hint,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  hint?: string;
}) {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-text-primary">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        aria-describedby={hint ? hintId : undefined}
        className="h-11 w-full rounded-sm border border-border-default bg-bg-base px-3 text-sm text-text-primary focus-ring"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint ? (
        <p id={hintId} className="mt-1 text-xs text-text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** The headline figure a calculator produces. */
export function ResultValue({
  label,
  value,
  unit,
  tone = 'accent',
}: {
  label: string;
  value: string | number;
  unit?: string;
  tone?: 'accent' | 'plain';
}) {
  return (
    <div className="mb-4 last:mb-0">
      <p className="text-xs tracking-wide text-text-muted uppercase">{label}</p>
      <p
        className={cn(
          'font-display mt-0.5 text-3xl font-extrabold',
          tone === 'accent' ? 'text-accent-fg' : 'text-text-primary',
        )}
      >
        {value}
        {unit ? <span className="ml-1 text-lg font-bold">{unit}</span> : null}
      </p>
    </div>
  );
}

/** A secondary figure, shown beneath the headline. */
export function ResultRow({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-t border-border-subtle py-2 text-sm first:border-t-0">
      <span className="text-text-muted">{label}</span>
      <span
        className={cn(
          'text-right',
          emphasis ? 'font-bold text-text-primary' : 'text-text-secondary',
        )}
      >
        {value}
      </span>
    </div>
  );
}
