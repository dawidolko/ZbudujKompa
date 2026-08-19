'use client';

import { useMemo, useState } from 'react';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { combineDecibels, perceivedLoudnessRatio } from '@/lib/calculators';
import { CalculatorShell, NumberField, ResultRow, ResultValue } from '../CalculatorShell';

/**
 * Combined noise level of several fans.
 *
 * This exists because decibel addition is the most widely misunderstood figure
 * in fan selection: people assume two 30 dBA fans give 60 dBA, when the answer
 * is 33. The calculator shows the arithmetic alongside the result so the reader
 * takes away the rule rather than just the number.
 */
export function NoiseCalculator({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const [fanCount, setFanCount] = useState(3);
  const [fanNoise, setFanNoise] = useState(28);
  const [pumpNoise, setPumpNoise] = useState(0);

  const { total, singleFan, doubled } = useMemo(() => {
    const sources = Array<number>(fanCount).fill(fanNoise);
    if (pumpNoise > 0) sources.push(pumpNoise);
    return {
      total: combineDecibels(sources),
      singleFan: fanNoise,
      doubled: combineDecibels(Array<number>(fanCount * 2).fill(fanNoise)),
    };
  }, [fanCount, fanNoise, pumpNoise]);

  /* A rough, honest description of what the level sounds like. Decibels mean
     nothing to most readers without a familiar comparison. */
  const reference =
    total < 25
      ? dict.calc.noise.refWhisper
      : total < 32
        ? dict.calc.noise.refQuietRoom
        : total < 40
          ? dict.calc.noise.refLibrary
          : total < 48
            ? dict.calc.noise.refConversation
            : dict.calc.noise.refLoud;

  return (
    <CalculatorShell
      inputs={
        <>
          <NumberField
            label={dict.calc.noise.fanCount}
            value={fanCount}
            onChange={setFanCount}
            min={1}
            max={12}
          />
          <NumberField
            label={dict.calc.noise.fanNoise}
            unit="dBA"
            value={fanNoise}
            onChange={setFanNoise}
            min={10}
            max={50}
            step={0.5}
            hint={dict.calc.noise.fanHint}
          />
          <NumberField
            label={dict.calc.noise.pumpNoise}
            unit="dBA"
            value={pumpNoise}
            onChange={setPumpNoise}
            min={0}
            max={45}
            step={0.5}
            hint={dict.calc.noise.pumpHint}
          />
        </>
      }
      result={
        <>
          <ResultValue label={dict.calc.noise.total} value={total.toFixed(1)} unit="dBA" />
          <ResultRow label={dict.calc.noise.sounds} value={reference} emphasis />
          <ResultRow
            label={dict.calc.noise.vsOne}
            value={`+${(total - singleFan).toFixed(1)} dBA`}
          />
          <ResultRow
            label={dict.calc.noise.ifDoubled}
            value={`${doubled.toFixed(1)} dBA (+${(doubled - total).toFixed(1)})`}
          />
          <ResultRow
            label={dict.calc.noise.perceived}
            value={dict.calc.noise.timesLouder(perceivedLoudnessRatio(singleFan, total).toFixed(2))}
          />
        </>
      }
      explanation={dict.calc.noise.explanation}
    />
  );
}
