'use client';

import { useMemo, useState } from 'react';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { memoryBandwidth, memoryLatencyNs } from '@/lib/calculators';
import {
  CalculatorShell,
  NumberField,
  ResultRow,
  ResultValue,
  SelectField,
} from '../CalculatorShell';

/**
 * True memory latency, and what dual channel is worth.
 *
 * The question this answers is the one that trips people up when moving to
 * DDR5: a CL30 kit sounds slower than a CL16 one, but the clock is running far
 * faster, and only nanoseconds make the two comparable. Showing both kits'
 * figures side by side is the point of the tool.
 */
export function MemoryCalculator({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const [speed, setSpeed] = useState(6000);
  const [cas, setCas] = useState(30);
  const [channels, setChannels] = useState<'1' | '2'>('2');

  const { latency, bandwidth, singleChannel, comparison } = useMemo(() => {
    const ns = memoryLatencyNs(speed, cas);
    return {
      latency: ns,
      bandwidth: memoryBandwidth(speed, Number(channels)),
      singleChannel: memoryBandwidth(speed, 1),
      /* A familiar reference point, so the number means something: this is the
         kit most often recommended for Ryzen. */
      comparison: memoryLatencyNs(6000, 30),
    };
  }, [speed, cas, channels]);

  const verdict =
    latency < 9
      ? dict.calc.memory.verdictExcellent
      : latency < 11
        ? dict.calc.memory.verdictGood
        : latency < 13
          ? dict.calc.memory.verdictOk
          : dict.calc.memory.verdictSlow;

  return (
    <CalculatorShell
      inputs={
        <>
          <NumberField
            label={dict.calc.memory.speed}
            unit="MT/s"
            value={speed}
            onChange={setSpeed}
            min={2133}
            max={9000}
            step={100}
            hint={dict.calc.memory.speedHint}
          />
          <NumberField
            label={dict.calc.memory.cas}
            unit="CL"
            value={cas}
            onChange={setCas}
            min={10}
            max={54}
          />
          <SelectField
            label={dict.calc.memory.channels}
            value={channels}
            onChange={setChannels}
            options={[
              { value: '2', label: dict.calc.memory.dual },
              { value: '1', label: dict.calc.memory.single },
            ]}
            hint={dict.calc.memory.channelsHint}
          />
        </>
      }
      result={
        <>
          <ResultValue label={dict.calc.memory.latency} value={latency.toFixed(2)} unit="ns" />
          <ResultRow label={dict.calc.memory.verdict} value={verdict} emphasis />
          <ResultRow label={dict.calc.memory.bandwidth} value={`${bandwidth.toFixed(1)} GB/s`} />
          {channels === '2' ? (
            <ResultRow
              label={dict.calc.memory.lostSingle}
              value={`${singleChannel.toFixed(1)} GB/s (−50%)`}
            />
          ) : null}
          <ResultRow
            label={dict.calc.memory.vsReference}
            value={
              latency <= comparison
                ? dict.calc.memory.fasterThan((comparison - latency).toFixed(2))
                : dict.calc.memory.slowerThan((latency - comparison).toFixed(2))
            }
          />
        </>
      }
      explanation={dict.calc.memory.explanation}
    />
  );
}
