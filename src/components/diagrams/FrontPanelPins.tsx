import {
  Diagram,
  accent,
  fillMuted,
  fillSurface,
  stroke,
  strokeSubtle,
  textMuted,
  textPrimary,
} from './Diagram';
import type { Locale } from '@/i18n/config';

const copy = {
  pl: {
    title: 'Blok pinów panelu przedniego',
    caption:
      'Standardowy układ 9 pinów. Górny rząd, od lewej: dioda zasilania plus, dioda zasilania minus, dioda dysku plus, dioda dysku minus. Dolny rząd: przycisk zasilania (dwa piny), przycisk reset (dwa piny). Diody mają biegunowość — kabel z kolorowym przewodem to plus. Przyciski biegunowości nie mają, więc można je wpiąć w dowolną stronę. Brakujący pin w prawym górnym rogu to klucz, który pokazuje właściwą orientację.',
    polarity: 'Diody: biegunowość ma znaczenie',
    noPolarity: 'Przyciski: dowolna strona',
    labels: {
      powerLed: 'POWER LED',
      hddLed: 'HDD LED',
      powerSw: 'POWER SW',
      resetSw: 'RESET SW',
      plus: '+',
      minus: '−',
      key: 'klucz',
    },
  },
  en: {
    title: 'Front panel pin block',
    caption:
      'The standard 9-pin arrangement. Top row, left to right: power LED positive, power LED negative, drive LED positive, drive LED negative. Bottom row: power button (two pins), reset button (two pins). LEDs are polarised — the lead with the coloured wire is positive. The buttons are not polarised, so either orientation works. The missing pin in the top right corner is the key that shows the correct orientation.',
    polarity: 'LEDs: polarity matters',
    noPolarity: 'Buttons: either way round',
    labels: {
      powerLed: 'POWER LED',
      hddLed: 'HDD LED',
      powerSw: 'POWER SW',
      resetSw: 'RESET SW',
      plus: '+',
      minus: '−',
      key: 'key',
    },
  },
};

/**
 * The front panel header, drawn pin by pin.
 *
 * This is the step people get wrong most often, and no amount of prose
 * substitutes for seeing which pin is which. The layout is the near-universal
 * Intel front panel standard that virtually every consumer board follows.
 */
export function FrontPanelPins({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const l = text.labels;

  const pin = (x: number, y: number, filled: boolean) => (
    <circle
      cx={x}
      cy={y}
      r="7"
      fill={filled ? accent : fillMuted}
      stroke={filled ? accent : strokeSubtle}
      strokeWidth="1.5"
    />
  );

  return (
    <Diagram title={text.title} caption={text.caption}>
      <svg viewBox="0 0 420 230" className="h-auto w-full" role="img" aria-label={text.caption}>
        {/* Header housing */}
        <rect
          x="60"
          y="70"
          width="300"
          height="76"
          rx="4"
          fill={fillSurface}
          stroke={stroke}
          strokeWidth="2"
        />

        {/* Top row: LEDs, which are polarised */}
        {[0, 1, 2, 3].map((index) => (
          <g key={`top-${index}`}>{pin(90 + index * 60, 92, true)}</g>
        ))}
        {/* The ninth position is empty — this gap is the orientation key */}
        <rect
          x="325"
          y="82"
          width="20"
          height="20"
          rx="2"
          fill={fillMuted}
          stroke={strokeSubtle}
          strokeDasharray="3 2"
        />
        <text x="335" y="66" fill={textMuted} fontSize="10" textAnchor="middle">
          {l.key}
        </text>

        {/* Bottom row: buttons, not polarised */}
        {[0, 1, 2, 3].map((index) => (
          <g key={`bottom-${index}`}>{pin(90 + index * 60, 124, false)}</g>
        ))}
        {pin(335, 124, false)}

        {/* Polarity marks on the LED pins */}
        <text x="90" y="60" fill={accent} fontSize="14" textAnchor="middle" fontWeight="700">
          {l.plus}
        </text>
        <text x="150" y="60" fill={textMuted} fontSize="14" textAnchor="middle" fontWeight="700">
          {l.minus}
        </text>
        <text x="210" y="60" fill={accent} fontSize="14" textAnchor="middle" fontWeight="700">
          {l.plus}
        </text>
        <text x="270" y="60" fill={textMuted} fontSize="14" textAnchor="middle" fontWeight="700">
          {l.minus}
        </text>

        {/* Group brackets and labels */}
        <path
          d="M78 160 L78 168 L162 168 L162 160"
          fill="none"
          stroke={strokeSubtle}
          strokeWidth="1.5"
        />
        <text x="120" y="184" fill={textPrimary} fontSize="11" textAnchor="middle" fontWeight="600">
          {l.powerLed}
        </text>

        <path
          d="M198 160 L198 168 L282 168 L282 160"
          fill="none"
          stroke={strokeSubtle}
          strokeWidth="1.5"
        />
        <text x="240" y="184" fill={textPrimary} fontSize="11" textAnchor="middle" fontWeight="600">
          {l.hddLed}
        </text>

        <path
          d="M78 40 L78 32 L162 32 L162 40"
          fill="none"
          stroke={strokeSubtle}
          strokeWidth="1.5"
        />
        <text x="120" y="24" fill={textPrimary} fontSize="11" textAnchor="middle" fontWeight="600">
          {l.powerSw}
        </text>

        <path
          d="M198 40 L198 32 L282 32 L282 40"
          fill="none"
          stroke={strokeSubtle}
          strokeWidth="1.5"
        />
        <text x="240" y="24" fill={textPrimary} fontSize="11" textAnchor="middle" fontWeight="600">
          {l.resetSw}
        </text>

        {/* Legend, so the colour coding is explained rather than assumed */}
        <circle cx="76" cy="210" r="6" fill={accent} />
        <text x="88" y="214" fill={textMuted} fontSize="11">
          {text.polarity}
        </text>
        <circle cx="256" cy="210" r="6" fill={fillMuted} stroke={strokeSubtle} strokeWidth="1.5" />
        <text x="268" y="214" fill={textMuted} fontSize="11">
          {text.noPolarity}
        </text>
      </svg>
    </Diagram>
  );
}
