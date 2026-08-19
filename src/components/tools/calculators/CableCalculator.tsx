'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { checkDisplayLink, displayBandwidth, DISPLAY_INTERFACES } from '@/lib/calculators';
import {
  CalculatorShell,
  NumberField,
  ResultRow,
  ResultValue,
  SelectField,
} from '../CalculatorShell';

const MODES = {
  '1920x1080': { width: 1920, height: 1080, label: '1920 × 1080' },
  '2560x1440': { width: 2560, height: 1440, label: '2560 × 1440' },
  '3440x1440': { width: 3440, height: 1440, label: '3440 × 1440' },
  '3840x2160': { width: 3840, height: 2160, label: '3840 × 2160 (4K)' },
} as const;

type ModeKey = keyof typeof MODES;
type InterfaceKey = keyof typeof DISPLAY_INTERFACES;

/**
 * Whether a cable carries a given display mode.
 *
 * This answers a question people hit constantly and cannot answer from the box:
 * a monitor advertises 4K at 144 Hz, a card has DisplayPort 1.4, and it does
 * not work at full quality without compression. The reason is that the
 * headline signalling rate is not the payload rate, and the difference decides
 * the outcome.
 */
export function CableCalculator({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const [mode, setMode] = useState<ModeKey>('3840x2160');
  const [refresh, setRefresh] = useState(144);
  const [depth, setDepth] = useState<'8' | '10'>('8');
  const [link, setLink] = useState<InterfaceKey>('dp-1.4');

  const result = useMemo(() => {
    const { width, height } = MODES[mode];
    const required = displayBandwidth(width, height, refresh, Number(depth));
    const target = DISPLAY_INTERFACES[link];
    return { required, target, ...checkDisplayLink(required, target.effective) };
  }, [mode, refresh, depth, link]);

  /* Three outcomes rather than two: fitting outright, fitting with compression,
     and not fitting at all are genuinely different answers for the reader. */
  const verdict = result.fits
    ? { text: dict.calc.cable.fits, tone: 'success' as const }
    : result.withDsc
      ? { text: dict.calc.cable.needsDsc, tone: 'warning' as const }
      : { text: dict.calc.cable.tooMuch, tone: 'danger' as const };

  return (
    <CalculatorShell
      inputs={
        <>
          <SelectField
            label={dict.calc.cable.resolution}
            value={mode}
            onChange={setMode}
            options={Object.entries(MODES).map(([value, data]) => ({
              value: value as ModeKey,
              label: data.label,
            }))}
          />
          <NumberField
            label={dict.calc.cable.refresh}
            unit="Hz"
            value={refresh}
            onChange={setRefresh}
            min={30}
            max={540}
            step={10}
          />
          <SelectField
            label={dict.calc.cable.depth}
            value={depth}
            onChange={setDepth}
            options={[
              { value: '8', label: dict.calc.cable.depth8 },
              { value: '10', label: dict.calc.cable.depth10 },
            ]}
            hint={dict.calc.cable.depthHint}
          />
          <SelectField
            label={dict.calc.cable.interface}
            value={link}
            onChange={setLink}
            options={Object.entries(DISPLAY_INTERFACES).map(([value, data]) => ({
              value: value as InterfaceKey,
              label: `${data.label} — ${data.effective} Gbps`,
            }))}
          />
        </>
      }
      result={
        <>
          <ResultValue
            label={dict.calc.cable.required}
            value={result.required.toFixed(1)}
            unit="Gbps"
          />
          <div className="mb-3">
            <Badge tone={verdict.tone}>{verdict.text}</Badge>
          </div>
          <ResultRow label={dict.calc.cable.available} value={`${result.target.effective} Gbps`} />
          <ResultRow
            label={dict.calc.cable.utilisation}
            value={`${Math.round(result.ratioNeeded * 100)}%`}
            emphasis
          />
          {!result.fits && result.withDsc ? (
            <ResultRow
              label={dict.calc.cable.compression}
              value={`${result.ratioNeeded.toFixed(2)}:1`}
            />
          ) : null}
        </>
      }
      explanation={dict.calc.cable.explanation}
    />
  );
}
