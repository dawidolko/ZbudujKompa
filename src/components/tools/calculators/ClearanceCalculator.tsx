'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { checkClearance } from '@/lib/calculators';
import {
  CalculatorShell,
  NumberField,
  ResultRow,
  ResultValue,
  SelectField,
} from '../CalculatorShell';

/**
 * Whether parts physically fit together.
 *
 * The gap this fills: case specifications list maximum card length and maximum
 * cooler height as separate figures, so it is entirely possible to buy a card
 * and a radiator that each fit and together do not. A front-mounted radiator
 * takes its thickness plus its fans out of the length available for the card,
 * and no spec sheet mentions the interaction.
 */
export function ClearanceCalculator({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const [maxGpuLength, setMaxGpuLength] = useState(330);
  const [maxCoolerHeight, setMaxCoolerHeight] = useState(170);
  const [gpuLength, setGpuLength] = useState(304);
  const [coolerHeight, setCoolerHeight] = useState(160);
  const [radiator, setRadiator] = useState<'none' | 'front'>('none');

  const result = useMemo(
    () =>
      checkClearance({
        maxGpuLength,
        maxCoolerHeight,
        gpuLength,
        coolerHeight,
        frontRadiator: radiator === 'front',
      }),
    [maxGpuLength, maxCoolerHeight, gpuLength, coolerHeight, radiator],
  );

  const everythingFits = result.gpuFits && result.coolerFits;

  return (
    <CalculatorShell
      inputs={
        <>
          <NumberField
            label={dict.calc.clearance.maxGpu}
            unit="mm"
            value={maxGpuLength}
            onChange={setMaxGpuLength}
            min={150}
            max={500}
            step={5}
            hint={dict.calc.clearance.fromSpec}
          />
          <NumberField
            label={dict.calc.clearance.maxCooler}
            unit="mm"
            value={maxCoolerHeight}
            onChange={setMaxCoolerHeight}
            min={50}
            max={200}
            step={5}
            hint={dict.calc.clearance.fromSpec}
          />
          <NumberField
            label={dict.calc.clearance.gpuLength}
            unit="mm"
            value={gpuLength}
            onChange={setGpuLength}
            min={150}
            max={450}
            step={2}
          />
          <NumberField
            label={dict.calc.clearance.coolerHeight}
            unit="mm"
            value={coolerHeight}
            onChange={setCoolerHeight}
            min={40}
            max={190}
            step={1}
          />
          <SelectField
            label={dict.calc.clearance.radiator}
            value={radiator}
            onChange={setRadiator}
            options={[
              { value: 'none', label: dict.calc.clearance.noRadiator },
              { value: 'front', label: dict.calc.clearance.frontRadiator },
            ]}
            hint={dict.calc.clearance.radiatorHint}
          />
        </>
      }
      result={
        <>
          <ResultValue
            label={dict.calc.clearance.verdict}
            value={everythingFits ? dict.calc.clearance.fits : dict.calc.clearance.doesNotFit}
            tone="plain"
          />
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge tone={result.gpuFits ? 'success' : 'danger'}>
              {dict.configurator.category.gpu}
            </Badge>
            <Badge tone={result.coolerFits ? 'success' : 'danger'}>
              {dict.configurator.category.cooler}
            </Badge>
          </div>

          {radiator === 'front' ? (
            <ResultRow
              label={dict.calc.clearance.effectiveLimit}
              value={`${result.effectiveGpuLimit} mm`}
              emphasis
            />
          ) : null}
          <ResultRow
            label={dict.calc.clearance.gpuMargin}
            value={`${result.gpuMargin > 0 ? '+' : ''}${result.gpuMargin} mm`}
          />
          <ResultRow
            label={dict.calc.clearance.coolerMargin}
            value={`${result.coolerMargin > 0 ? '+' : ''}${result.coolerMargin} mm`}
          />
        </>
      }
      explanation={dict.calc.clearance.explanation}
    />
  );
}
