'use client';

import { useMemo, useState } from 'react';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { driveLifespanYears, itemsThatFit, usableCapacity } from '@/lib/calculators';
import { CalculatorShell, NumberField, ResultRow, ResultValue } from '../CalculatorShell';

/**
 * What actually fits on a drive, and how long it lasts.
 *
 * The headline answer is the usable capacity, because "where did my 70 GB go"
 * is one of the most common questions about a new drive — and the answer is
 * arithmetic, not a fault. Manufacturers count a gigabyte as 1,000,000,000
 * bytes while the operating system divides by 1024 three times.
 */
export function StorageCalculator({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const [capacity, setCapacity] = useState(2000);
  const [gameSize, setGameSize] = useState(120);
  const [dailyWrites, setDailyWrites] = useState(30);
  const [tbw, setTbw] = useState(1200);

  const result = useMemo(() => {
    const usable = usableCapacity(capacity);
    return {
      usable,
      lost: capacity - usable,
      games: itemsThatFit(capacity, gameSize),
      /* Typical figures for a 24-megapixel raw file and an hour of 4K footage
         at 60 Mbps, so the abstract capacity maps onto something familiar. */
      photos: itemsThatFit(capacity, 0.03),
      videoHours: Math.floor(itemsThatFit(capacity, 27) * 1),
      lifespan: driveLifespanYears(tbw, dailyWrites),
    };
  }, [capacity, gameSize, dailyWrites, tbw]);

  return (
    <CalculatorShell
      inputs={
        <>
          <NumberField
            label={dict.calc.storage.capacity}
            unit="GB"
            value={capacity}
            onChange={setCapacity}
            min={250}
            max={8000}
            step={250}
            hint={dict.calc.storage.capacityHint}
          />
          <NumberField
            label={dict.calc.storage.gameSize}
            unit="GB"
            value={gameSize}
            onChange={setGameSize}
            min={10}
            max={300}
            step={5}
            hint={dict.calc.storage.gameHint}
          />
          <NumberField
            label={dict.calc.storage.tbw}
            unit="TBW"
            value={tbw}
            onChange={setTbw}
            min={100}
            max={5000}
            step={100}
            hint={dict.calc.storage.tbwHint}
          />
          <NumberField
            label={dict.calc.storage.dailyWrites}
            unit="GB"
            value={dailyWrites}
            onChange={setDailyWrites}
            min={1}
            max={500}
            step={1}
          />
        </>
      }
      result={
        <>
          <ResultValue
            label={dict.calc.storage.usable}
            value={result.usable.toFixed(1)}
            unit="GiB"
          />
          <ResultRow
            label={dict.calc.storage.difference}
            value={`−${result.lost.toFixed(0)} GB (${((result.lost / capacity) * 100).toFixed(1)}%)`}
            emphasis
          />
          <ResultRow label={dict.calc.storage.games} value={String(result.games)} />
          <ResultRow
            label={dict.calc.storage.photos}
            value={`~${Math.round(result.photos / 1000)}k`}
          />
          <ResultRow
            label={dict.calc.storage.video}
            value={dict.calc.storage.hours(result.videoHours)}
          />
          <ResultRow
            label={dict.calc.storage.lifespan}
            value={
              Number.isFinite(result.lifespan)
                ? dict.calc.storage.years(Math.round(result.lifespan))
                : '—'
            }
          />
        </>
      }
      explanation={dict.calc.storage.explanation}
    />
  );
}
