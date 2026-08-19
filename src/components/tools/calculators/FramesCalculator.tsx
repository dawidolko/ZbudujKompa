'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { displayedFrames, frameTime } from '@/lib/calculators';
import { CalculatorShell, NumberField, ResultRow, ResultValue } from '../CalculatorShell';

/**
 * How a frame rate and a refresh rate fit together.
 *
 * The useful case is the mismatch in either direction: a fast panel fed too
 * few frames is money that should have gone on the card, and a card producing
 * far more frames than the panel can show is the reverse. Both are common and
 * neither is obvious from the specifications.
 */
export function FramesCalculator({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const [rendered, setRendered] = useState(140);
  const [refresh, setRefresh] = useState(144);

  const result = useMemo(() => displayedFrames(rendered, refresh), [rendered, refresh]);

  const verdict =
    result.utilisation < 70
      ? { text: dict.calc.frames.verdictUnder, tone: 'warning' as const }
      : result.wasted > refresh * 0.5
        ? { text: dict.calc.frames.verdictOver, tone: 'neutral' as const }
        : { text: dict.calc.frames.verdictMatched, tone: 'success' as const };

  return (
    <CalculatorShell
      inputs={
        <>
          <NumberField
            label={dict.calc.frames.rendered}
            unit="fps"
            value={rendered}
            onChange={setRendered}
            min={20}
            max={600}
            step={5}
          />
          <NumberField
            label={dict.calc.frames.refresh}
            unit="Hz"
            value={refresh}
            onChange={setRefresh}
            min={60}
            max={540}
            step={10}
          />
        </>
      }
      result={
        <>
          <ResultValue label={dict.calc.frames.shown} value={result.shown} unit="fps" />
          <div className="mb-3">
            <Badge tone={verdict.tone}>{verdict.text}</Badge>
          </div>
          <ResultRow
            label={dict.calc.frames.utilisation}
            value={`${Math.round(result.utilisation)}%`}
            emphasis
          />
          <ResultRow label={dict.calc.frames.wasted} value={`${result.wasted} fps`} />
          <ResultRow
            label={dict.calc.frames.frameTime}
            value={`${frameTime(result.shown).toFixed(1)} ms`}
          />
        </>
      }
      explanation={dict.calc.frames.explanation}
    />
  );
}
