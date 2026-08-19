'use client';

import { useMemo, useState } from 'react';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { airflowDeltaT, fanAtSpeed } from '@/lib/calculators';
import { CalculatorShell, NumberField, ResultRow, ResultValue } from '../CalculatorShell';

/**
 * What happens when a fan runs slower.
 *
 * This is the most useful relationship in building a quiet machine, and it is
 * counter-intuitive: airflow falls in proportion to speed, but noise falls with
 * the fifth power of it. Dropping to 70 per cent speed costs 30 per cent of the
 * airflow and buys about 8 dB — a change that is clearly audible where the
 * airflow loss usually is not.
 */
export function FanCalculator({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const [ratedRpm, setRatedRpm] = useState(1500);
  const [ratedCfm, setRatedCfm] = useState(60);
  const [ratedNoise, setRatedNoise] = useState(30);
  const [targetRpm, setTargetRpm] = useState(1050);
  const [heatLoad, setHeatLoad] = useState(400);

  const result = useMemo(() => {
    const at = fanAtSpeed(ratedRpm, ratedCfm, ratedNoise, targetRpm);
    return {
      ...at,
      percentSpeed: Math.round((targetRpm / ratedRpm) * 100),
      noiseDrop: ratedNoise - at.noise,
      /* Three intake fans is the common case, so the temperature rise is shown
         for the whole set rather than for one fan in isolation. */
      deltaT: airflowDeltaT(heatLoad, at.cfm * 3),
    };
  }, [ratedRpm, ratedCfm, ratedNoise, targetRpm, heatLoad]);

  return (
    <CalculatorShell
      inputs={
        <>
          <NumberField
            label={dict.calc.fan.ratedRpm}
            unit="RPM"
            value={ratedRpm}
            onChange={setRatedRpm}
            min={400}
            max={3000}
            step={50}
          />
          <NumberField
            label={dict.calc.fan.ratedCfm}
            unit="CFM"
            value={ratedCfm}
            onChange={setRatedCfm}
            min={20}
            max={150}
            step={1}
          />
          <NumberField
            label={dict.calc.fan.ratedNoise}
            unit="dBA"
            value={ratedNoise}
            onChange={setRatedNoise}
            min={15}
            max={50}
            step={0.5}
          />
          <NumberField
            label={dict.calc.fan.targetRpm}
            unit="RPM"
            value={targetRpm}
            onChange={setTargetRpm}
            min={200}
            max={3000}
            step={50}
            hint={dict.calc.fan.targetHint}
          />
          <NumberField
            label={dict.calc.fan.heatLoad}
            unit="W"
            value={heatLoad}
            onChange={setHeatLoad}
            min={100}
            max={1200}
            step={10}
            hint={dict.calc.fan.heatHint}
          />
        </>
      }
      result={
        <>
          <ResultValue
            label={dict.calc.fan.atSpeed(result.percentSpeed)}
            value={result.noise.toFixed(1)}
            unit="dBA"
          />
          <ResultRow
            label={dict.calc.fan.noiseDrop}
            value={`−${result.noiseDrop.toFixed(1)} dBA`}
            emphasis
          />
          <ResultRow label={dict.calc.fan.airflow} value={`${result.cfm.toFixed(1)} CFM`} />
          <ResultRow
            label={dict.calc.fan.airflowLoss}
            value={`−${(100 - result.percentSpeed).toFixed(0)}%`}
          />
          <ResultRow
            label={dict.calc.fan.power}
            value={`${(result.relativePower * 100).toFixed(0)}%`}
          />
          <ResultRow
            label={dict.calc.fan.caseRise}
            value={Number.isFinite(result.deltaT) ? `+${result.deltaT.toFixed(1)} °C` : '—'}
          />
        </>
      }
      explanation={dict.calc.fan.explanation}
    />
  );
}
