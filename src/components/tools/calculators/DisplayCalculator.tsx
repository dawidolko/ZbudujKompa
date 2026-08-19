'use client';

import { useMemo, useState } from 'react';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { pixelsPerInch, retinaDistance, screenDimensions } from '@/lib/calculators';
import {
  CalculatorShell,
  NumberField,
  ResultRow,
  ResultValue,
  SelectField,
} from '../CalculatorShell';

const RESOLUTIONS = {
  '1920x1080': { width: 1920, height: 1080, label: '1920 × 1080 (Full HD)' },
  '2560x1440': { width: 2560, height: 1440, label: '2560 × 1440 (QHD)' },
  '3440x1440': { width: 3440, height: 1440, label: '3440 × 1440 (UWQHD)' },
  '3840x2160': { width: 3840, height: 2160, label: '3840 × 2160 (4K)' },
  '5120x1440': { width: 5120, height: 1440, label: '5120 × 1440 (DQHD)' },
} as const;

type ResolutionKey = keyof typeof RESOLUTIONS;

/**
 * Pixel density and physical size of a monitor.
 *
 * Monitors are sold by diagonal, but what decides whether one fits a desk is
 * its width, and what decides how sharp it looks is its pixel density. Both
 * follow from the diagonal and the resolution, and neither is printed on the
 * box.
 */
export function DisplayCalculator({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const [diagonal, setDiagonal] = useState(27);
  const [resolution, setResolution] = useState<ResolutionKey>('2560x1440');

  const { ppi, dimensions, distance } = useMemo(() => {
    const { width, height } = RESOLUTIONS[resolution];
    const density = pixelsPerInch(width, height, diagonal);
    return {
      ppi: density,
      /* The aspect ratio is taken from the resolution itself rather than
         assumed, so ultrawide panels report their true width. */
      dimensions: screenDimensions(diagonal, width, height),
      distance: retinaDistance(density),
    };
  }, [diagonal, resolution]);

  const sharpness =
    ppi < 90
      ? dict.calc.display.sharpLow
      : ppi < 110
        ? dict.calc.display.sharpOk
        : ppi < 140
          ? dict.calc.display.sharpGood
          : dict.calc.display.sharpExcellent;

  const cm = (inches: number) => `${(inches * 2.54).toFixed(1)} cm`;

  return (
    <CalculatorShell
      inputs={
        <>
          <NumberField
            label={dict.calc.display.diagonal}
            unit={'"'}
            value={diagonal}
            onChange={setDiagonal}
            min={13}
            max={57}
            step={0.5}
          />
          <SelectField
            label={dict.calc.display.resolution}
            value={resolution}
            onChange={setResolution}
            options={Object.entries(RESOLUTIONS).map(([value, data]) => ({
              value: value as ResolutionKey,
              label: data.label,
            }))}
          />
        </>
      }
      result={
        <>
          <ResultValue label={dict.calc.display.density} value={ppi.toFixed(1)} unit="PPI" />
          <ResultRow label={dict.calc.display.sharpness} value={sharpness} emphasis />
          <ResultRow label={dict.calc.display.width} value={cm(dimensions.width)} />
          <ResultRow label={dict.calc.display.height} value={cm(dimensions.height)} />
          <ResultRow label={dict.calc.display.retinaDistance} value={cm(distance)} />
        </>
      }
      explanation={dict.calc.display.explanation}
    />
  );
}
