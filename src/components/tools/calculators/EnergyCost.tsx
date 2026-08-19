'use client';

import { useMemo, useState } from 'react';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { localeTags } from '@/i18n/config';
import { PSU_EFFICIENCY, splitEnergyCost } from '@/lib/calculators';
import {
  CalculatorShell,
  NumberField,
  ResultRow,
  ResultValue,
  SelectField,
} from '../CalculatorShell';

/**
 * Running cost of a machine over a year.
 *
 * Idle and load are entered separately rather than as one average, because a
 * gaming machine idles for most of its life: costing every hour at peak draw
 * overstates the bill several times over, which is the flaw in most calculators
 * of this kind.
 */
export function EnergyCostCalculator({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const [idleWatts, setIdleWatts] = useState(60);
  const [loadWatts, setLoadWatts] = useState(400);
  const [loadHours, setLoadHours] = useState(3);
  const [idleHours, setIdleHours] = useState(5);
  const [price, setPrice] = useState(1.0);
  const [grade, setGrade] = useState<keyof typeof PSU_EFFICIENCY>('Gold');

  const result = useMemo(
    () => splitEnergyCost(idleWatts, loadWatts, loadHours, idleHours, price, PSU_EFFICIENCY[grade]),
    [idleWatts, loadWatts, loadHours, idleHours, price, grade],
  );

  const money = (value: number) =>
    new Intl.NumberFormat(localeTags[locale], {
      style: 'currency',
      currency: 'PLN',
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <CalculatorShell
      inputs={
        <>
          <NumberField
            label={dict.calc.energy.idleWatts}
            unit="W"
            value={idleWatts}
            onChange={setIdleWatts}
            min={20}
            max={300}
            step={5}
            hint={dict.calc.energy.idleHint}
          />
          <NumberField
            label={dict.calc.energy.loadWatts}
            unit="W"
            value={loadWatts}
            onChange={setLoadWatts}
            min={100}
            max={1200}
            step={10}
          />
          <NumberField
            label={dict.calc.energy.loadHours}
            unit="h"
            value={loadHours}
            onChange={setLoadHours}
            min={0}
            max={24}
            step={0.5}
          />
          <NumberField
            label={dict.calc.energy.idleHours}
            unit="h"
            value={idleHours}
            onChange={setIdleHours}
            min={0}
            max={24}
            step={0.5}
          />
          <NumberField
            label={dict.calc.energy.price}
            unit="zł/kWh"
            value={price}
            onChange={setPrice}
            min={0.1}
            max={3}
            step={0.05}
            hint={dict.calc.energy.priceHint}
          />
          <SelectField
            label={dict.calc.energy.efficiency}
            value={grade}
            onChange={setGrade}
            options={(Object.keys(PSU_EFFICIENCY) as (keyof typeof PSU_EFFICIENCY)[]).map(
              (key) => ({ value: key, label: `80 Plus ${key} (${PSU_EFFICIENCY[key] * 100}%)` }),
            )}
            hint={dict.calc.energy.efficiencyHint}
          />
        </>
      }
      result={
        <>
          <ResultValue label={dict.calc.energy.yearlyCost} value={money(result.cost)} />
          <ResultRow label={dict.calc.energy.monthly} value={money(result.cost / 12)} emphasis />
          <ResultRow
            label={dict.calc.energy.consumption}
            value={`${Math.round(result.totalKwh)} kWh`}
          />
          <ResultRow
            label={dict.calc.energy.atTheWall}
            value={`${Math.round(result.wallLoad)} W`}
          />
          <ResultRow
            label={dict.calc.energy.fromIdle}
            value={`${Math.round(result.idleKwh)} kWh (${Math.round((result.idleKwh / result.totalKwh) * 100)}%)`}
          />
          <ResultRow
            label={dict.calc.energy.fromLoad}
            value={`${Math.round(result.loadKwh)} kWh (${Math.round((result.loadKwh / result.totalKwh) * 100)}%)`}
          />
        </>
      }
      explanation={dict.calc.energy.explanation}
    />
  );
}
