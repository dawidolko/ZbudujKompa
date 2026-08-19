'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { sizePowerSupply } from '@/lib/calculators';
import {
  CalculatorShell,
  NumberField,
  ResultRow,
  ResultValue,
  SelectField,
} from './CalculatorShell';

/**
 * Power supply sizing.
 *
 * The distinguishing feature against most calculators of this kind is that it
 * asks whether the supply meets ATX 3.x, because that single answer changes
 * the recommendation substantially. Modern graphics cards spike far above
 * their rated power for under a millisecond; a compliant supply is required to
 * ride that out, an older one is not — and the protection trips on the spike
 * rather than on the average.
 */
export function PsuCalculator({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const [cpuWatts, setCpuWatts] = useState(120);
  const [gpuWatts, setGpuWatts] = useState(250);
  const [otherWatts, setOtherWatts] = useState(90);
  const [standard, setStandard] = useState<'atx3' | 'atx2'>('atx3');

  const result = useMemo(
    () =>
      sizePowerSupply({
        cpuPeakWatts: cpuWatts,
        gpuWatts,
        otherWatts,
        atx3x: standard === 'atx3',
      }),
    [cpuWatts, gpuWatts, otherWatts, standard],
  );

  return (
    <CalculatorShell
      inputs={
        <>
          <NumberField
            label={dict.tools.psu.cpuWatts}
            unit="W"
            value={cpuWatts}
            onChange={setCpuWatts}
            min={35}
            max={400}
            step={5}
            hint={dict.tools.psu.cpuHint}
          />
          <NumberField
            label={dict.tools.psu.gpuWatts}
            unit="W"
            value={gpuWatts}
            onChange={setGpuWatts}
            min={0}
            max={700}
            step={5}
          />
          <NumberField
            label={dict.tools.psu.otherWatts}
            unit="W"
            value={otherWatts}
            onChange={setOtherWatts}
            min={40}
            max={300}
            step={10}
            hint={dict.tools.psu.otherHint}
          />
          <SelectField
            label={dict.tools.psu.standard}
            value={standard}
            onChange={setStandard}
            options={[
              { value: 'atx3', label: dict.tools.psu.atx3 },
              { value: 'atx2', label: dict.tools.psu.atx2 },
            ]}
            hint={dict.tools.psu.standardHint}
          />
        </>
      }
      result={
        <>
          <ResultValue label={dict.tools.psu.recommended} value={result.recommended} unit="W" />
          {result.reason === 'transient' ? (
            <div className="mb-3">
              <Badge tone="warning">{dict.tools.psu.raisedForTransients}</Badge>
            </div>
          ) : null}
          <ResultRow label={dict.tools.psu.estimated} value={`${result.estimated} W`} emphasis />
          <ResultRow label={dict.tools.psu.transientPeak} value={`~${result.transientPeak} W`} />
          <ResultRow
            label={dict.tools.psu.loadAtRecommended}
            value={`${Math.round((result.estimated / result.recommended) * 100)}%`}
          />
        </>
      }
      explanation={dict.tools.psu.explanation}
    />
  );
}
