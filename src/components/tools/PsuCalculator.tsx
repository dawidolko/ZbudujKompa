'use client';

import { useId, useMemo, useState } from 'react';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { clamp } from '@/lib/utils';

/**
 * Power supply calculator.
 *
 * Computes live rather than behind a submit button, so the recommendation
 * updates as the reader adjusts a figure. The result is announced through an
 * aria-live region because a value that changes without any visible focus
 * movement is otherwise silent to a screen reader.
 *
 * The 30 per cent margin is applied for two reasons, both stated in the
 * explanatory text rather than left as a magic number: efficiency peaks near
 * half load, and modern graphics cards draw brief transient spikes well above
 * their nominal rating.
 */
const HEADROOM = 1.3;

/** Common retail wattages — the result is rounded up to the next real unit. */
const SUPPLY_STEPS = [450, 550, 650, 750, 850, 1000, 1200, 1500];

export function PsuCalculator({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const fieldId = useId();

  const [cpu, setCpu] = useState(120);
  const [gpu, setGpu] = useState(250);
  const [other, setOther] = useState(150);

  const { estimated, recommended } = useMemo(() => {
    const total = cpu + gpu + other;
    const withHeadroom = Math.ceil(total * HEADROOM);
    const step = SUPPLY_STEPS.find((value) => value >= withHeadroom) ?? SUPPLY_STEPS.at(-1)!;
    return { estimated: total, recommended: step };
  }, [cpu, gpu, other]);

  const fields = [
    {
      id: `${fieldId}-cpu`,
      label: dict.tools.psu.cpuWatts,
      value: cpu,
      set: setCpu,
      max: 400,
    },
    {
      id: `${fieldId}-gpu`,
      label: dict.tools.psu.gpuWatts,
      value: gpu,
      set: setGpu,
      max: 700,
    },
    {
      id: `${fieldId}-other`,
      label: dict.tools.psu.otherWatts,
      value: other,
      set: setOther,
      max: 400,
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="space-y-5 rounded-lg border border-border-subtle bg-surface p-5 md:p-6">
        {fields.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="mb-1.5 block text-sm font-semibold text-text-primary"
            >
              {field.label}
            </label>
            <div className="flex items-center gap-3">
              {/* The range and the number field are bound to the same state, so
                  the reader can drag or type — whichever suits them. */}
              <input
                id={field.id}
                type="range"
                min={0}
                max={field.max}
                step={5}
                value={field.value}
                onChange={(event) => field.set(Number(event.target.value))}
                className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-bg-muted accent-[var(--accent)] focus-ring"
              />
              <input
                type="number"
                min={0}
                max={field.max}
                value={field.value}
                onChange={(event) =>
                  field.set(clamp(Number(event.target.value) || 0, 0, field.max))
                }
                aria-label={field.label}
                className="h-10 w-20 rounded-sm border border-border-default bg-bg-base px-2 text-right text-sm text-text-primary focus-ring"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-border-subtle bg-bg-subtle p-5 md:p-6">
        <div aria-live="polite">
          <p className="text-xs tracking-wide text-text-muted uppercase">
            {dict.tools.psu.estimated}
          </p>
          <p className="font-display mt-1 text-2xl font-bold text-text-primary">{estimated} W</p>

          <p className="mt-5 text-xs tracking-wide text-text-muted uppercase">
            {dict.tools.psu.recommended}
          </p>
          <p className="font-display mt-1 text-4xl font-extrabold text-accent-fg">
            {recommended} W
          </p>
        </div>

        <p className="mt-5 border-t border-border-subtle pt-4 text-xs leading-relaxed text-text-secondary">
          {dict.tools.psu.explanation}
        </p>
      </div>
    </div>
  );
}
