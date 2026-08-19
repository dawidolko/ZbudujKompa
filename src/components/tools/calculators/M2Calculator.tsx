'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { m2SlotCheck } from '@/lib/calculators';
import { CalculatorShell, ResultRow, ResultValue, SelectField } from '../CalculatorShell';

/**
 * Whether an M.2 slot limits the drive in it.
 *
 * This exists because the mistake is silent: a board's second and third M.2
 * slots often run a lower PCIe generation or fewer lanes, and a fast drive in
 * one of them simply runs slower with nothing anywhere reporting why.
 */
export function M2Calculator({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const [driveGen, setDriveGen] = useState<'3' | '4' | '5'>('5');
  const [slotGen, setSlotGen] = useState<'3' | '4' | '5'>('4');
  const [lanes, setLanes] = useState<'2' | '4'>('4');

  const result = useMemo(
    () => m2SlotCheck(Number(driveGen) as 3 | 4 | 5, Number(slotGen) as 3 | 4 | 5, Number(lanes)),
    [driveGen, slotGen, lanes],
  );

  const gbs = (mbs: number) => `${(mbs / 1000).toFixed(2)} GB/s`;

  return (
    <CalculatorShell
      inputs={
        <>
          <SelectField
            label={dict.calc.m2.driveGen}
            value={driveGen}
            onChange={setDriveGen}
            options={[
              { value: '3', label: 'PCIe 3.0' },
              { value: '4', label: 'PCIe 4.0' },
              { value: '5', label: 'PCIe 5.0' },
            ]}
          />
          <SelectField
            label={dict.calc.m2.slotGen}
            value={slotGen}
            onChange={setSlotGen}
            options={[
              { value: '3', label: 'PCIe 3.0' },
              { value: '4', label: 'PCIe 4.0' },
              { value: '5', label: 'PCIe 5.0' },
            ]}
          />
          <SelectField
            label={dict.calc.m2.slotLanes}
            value={lanes}
            onChange={setLanes}
            options={[
              { value: '4', label: 'x4' },
              { value: '2', label: 'x2' },
            ]}
          />
        </>
      }
      result={
        <>
          <ResultValue label={dict.calc.m2.maxSpeed} value={gbs(result.maxSpeedMbs)} tone="plain" />
          <div className="mb-3">
            <Badge tone={result.limited ? 'warning' : 'success'}>
              {result.limited ? dict.calc.m2.limited : dict.calc.m2.notLimited}
            </Badge>
          </div>
          <ResultRow
            label={dict.calc.m2.drivePotential}
            value={gbs(result.drivePotentialMbs)}
            emphasis
          />
          {result.limited ? (
            <ResultRow
              label={dict.calc.upgrade.gain}
              value={`−${Math.round((1 - result.maxSpeedMbs / result.drivePotentialMbs) * 100)}%`}
            />
          ) : null}
        </>
      }
      explanation={dict.calc.m2.explanation}
    />
  );
}
