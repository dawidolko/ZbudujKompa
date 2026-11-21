'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { checkClearance } from '@/lib/calculators';
import { cases, coolers, gpus } from '@/lib/parts';
import { partLabel } from '@/lib/parts/calculator-inputs';
import { LoadBuildButton, PartSelect, partOptions } from '../CataloguePicker';
import {
  CalculatorShell,
  NumberField,
  ResultRow,
  ResultValue,
  SelectField,
} from '../CalculatorShell';

/* Air coolers only: an AiO's height is not what limits it in a case. */
const airCoolers = coolers.filter((cooler) => cooler.kind === 'air' && cooler.height);

/**
 * Whether parts physically fit together.
 *
 * The gap this fills: case specifications list maximum card length and maximum
 * cooler height as separate figures, so it is entirely possible to buy a card
 * and a radiator that each fit and together do not. A front-mounted radiator
 * takes its thickness plus its fans out of the length available for the card,
 * and no spec sheet mentions the interaction.
 *
 * The case, card and air cooler can be picked from the catalogue, which fills
 * the four dimensions from their specifications. AiO coolers are left out of
 * the cooler list on purpose: their height is not the constraint — the
 * radiator is, and the radiator option covers it.
 */

export function ClearanceCalculator({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const [maxGpuLength, setMaxGpuLength] = useState(330);
  const [maxCoolerHeight, setMaxCoolerHeight] = useState(170);
  const [gpuLength, setGpuLength] = useState(304);
  const [coolerHeight, setCoolerHeight] = useState(160);
  const [radiator, setRadiator] = useState<'none' | 'front'>('none');
  const [caseId, setCaseId] = useState('');
  const [gpuId, setGpuId] = useState('');
  const [coolerId, setCoolerId] = useState('');

  const pickCase = (id: string) => {
    setCaseId(id);
    const part = cases.find((item) => item.id === id);
    if (!part) return;
    setMaxGpuLength(part.maxGpuLength);
    setMaxCoolerHeight(part.maxCoolerHeight);
  };
  const pickGpu = (id: string) => {
    setGpuId(id);
    const part = gpus.find((item) => item.id === id);
    if (part) setGpuLength(part.length);
  };
  const pickCooler = (id: string) => {
    setCoolerId(id);
    const part = airCoolers.find((item) => item.id === id);
    if (part?.height) setCoolerHeight(part.height);
  };

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
          <LoadBuildButton
            locale={locale}
            uses={['case', 'gpu', 'cooler']}
            onLoad={(parts) => {
              const used: string[] = [];
              if (parts.case) {
                pickCase(parts.case.id);
                used.push(partLabel(parts.case));
              }
              if (parts.gpu) {
                pickGpu(parts.gpu.id);
                used.push(partLabel(parts.gpu));
              }
              /* An AiO has no height that matters here; its radiator does,
                 and where it sits is the reader's choice, not the build's. */
              if (parts.cooler?.kind === 'air') {
                pickCooler(parts.cooler.id);
                used.push(partLabel(parts.cooler));
              }
              return used;
            }}
          />
          <PartSelect
            label={dict.configurator.category.case}
            value={caseId}
            onChange={(id) => (id ? pickCase(id) : setCaseId(''))}
            options={partOptions(cases, (part) => part.brand)}
            manualLabel={dict.calc.picker.manual}
          />
          <NumberField
            label={dict.calc.clearance.maxGpu}
            unit="mm"
            value={maxGpuLength}
            onChange={(value) => {
              setMaxGpuLength(value);
              setCaseId('');
            }}
            min={150}
            max={500}
            step={5}
            hint={dict.calc.clearance.fromSpec}
          />
          <NumberField
            label={dict.calc.clearance.maxCooler}
            unit="mm"
            value={maxCoolerHeight}
            onChange={(value) => {
              setMaxCoolerHeight(value);
              setCaseId('');
            }}
            min={50}
            max={200}
            step={5}
            hint={dict.calc.clearance.fromSpec}
          />
          <PartSelect
            label={dict.configurator.category.gpu}
            value={gpuId}
            onChange={(id) => (id ? pickGpu(id) : setGpuId(''))}
            options={partOptions(
              gpus,
              (part) => part.brand,
              (part) => `${part.length} mm`,
            )}
            manualLabel={dict.calc.picker.manual}
          />
          <NumberField
            label={dict.calc.clearance.gpuLength}
            unit="mm"
            value={gpuLength}
            onChange={(value) => {
              setGpuLength(value);
              setGpuId('');
            }}
            min={150}
            max={450}
            step={2}
          />
          <PartSelect
            label={dict.calc.clearance.airCooler}
            value={coolerId}
            onChange={(id) => (id ? pickCooler(id) : setCoolerId(''))}
            options={partOptions(
              airCoolers,
              (part) => part.brand,
              (part) => `${part.height} mm`,
            )}
            manualLabel={dict.calc.picker.manual}
            hint={dict.calc.clearance.airCoolerHint}
          />
          <NumberField
            label={dict.calc.clearance.coolerHeight}
            unit="mm"
            value={coolerHeight}
            onChange={(value) => {
              setCoolerHeight(value);
              setCoolerId('');
            }}
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
