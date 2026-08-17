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
    title: 'Przepływ powietrza w obudowie',
    caption:
      'Widok z boku. Chłodne powietrze wchodzi z przodu i od dołu, gorące wychodzi tyłem i górą — zgodnie z tym, że ciepłe powietrze samo unosi się do góry. Zasilacz zasysa własne powietrze spodem obudowy i wyrzuca je bezpośrednio na zewnątrz, więc nie miesza się z resztą. Celem jest lekka nadwyżka wdmuchiwania nad wydmuchiwaniem: w obudowie panuje wtedy niewielkie nadciśnienie i kurz wchodzi filtrami zamiast każdą szczeliną.',
    intake: 'wlot',
    exhaust: 'wylot',
    labels: {
      front: 'Przód',
      rear: 'Tył',
      psu: 'Zasilacz',
      gpu: 'Karta graficzna',
      cpu: 'Chłodzenie CPU',
      filter: 'filtr',
      positive: 'Lekkie nadciśnienie: kurz wchodzi filtrami',
    },
  },
  en: {
    title: 'Case airflow',
    caption:
      'Side view. Cool air enters at the front and bottom, hot air leaves at the rear and top — following the fact that warm air rises on its own. The power supply draws its own air from beneath the case and exhausts it straight outside, so it never mixes with the rest. The aim is slightly more intake than exhaust: the case then sits at mild positive pressure and dust enters through the filters rather than through every seam.',
    intake: 'intake',
    exhaust: 'exhaust',
    labels: {
      front: 'Front',
      rear: 'Rear',
      psu: 'Power supply',
      gpu: 'Graphics card',
      cpu: 'CPU cooler',
      filter: 'filter',
      positive: 'Mild positive pressure: dust enters through filters',
    },
  },
};

/**
 * Case airflow, drawn as a side elevation.
 *
 * Airflow is a spatial idea, and prose describing "front intake, rear exhaust"
 * conveys far less than one picture of where the air actually goes. Arrow
 * direction carries the meaning; the labels repeat it in words so the diagram
 * is not the only channel.
 */
export function AirflowDiagram({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const l = text.labels;

  /* Intake arrows point inward, exhaust arrows outward. Both use the accent
     colour with a text label rather than relying on colour alone. */
  const arrow = (x1: number, y1: number, x2: number, y2: number, key: string) => (
    <g key={key}>
      <defs>
        <marker id={`head-${key}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill={accent} />
        </marker>
      </defs>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={accent}
        strokeWidth="2.5"
        markerEnd={`url(#head-${key})`}
      />
    </g>
  );

  return (
    <Diagram title={text.title} caption={text.caption}>
      <svg viewBox="0 0 480 320" className="h-auto w-full" role="img" aria-label={text.caption}>
        {/* Case shell */}
        <rect
          x="90"
          y="40"
          width="300"
          height="240"
          rx="6"
          fill={fillSurface}
          stroke={stroke}
          strokeWidth="2"
        />

        {/* Power supply chamber, separated from the main volume */}
        <rect
          x="98"
          y="230"
          width="120"
          height="42"
          rx="3"
          fill={fillMuted}
          stroke={strokeSubtle}
        />
        <text x="158" y="256" fill={textPrimary} fontSize="11" textAnchor="middle" fontWeight="600">
          {l.psu}
        </text>

        {/* Graphics card */}
        <rect
          x="150"
          y="176"
          width="180"
          height="26"
          rx="3"
          fill={fillMuted}
          stroke={strokeSubtle}
        />
        <text x="240" y="193" fill={textPrimary} fontSize="11" textAnchor="middle">
          {l.gpu}
        </text>

        {/* CPU cooler tower */}
        <rect x="236" y="86" width="60" height="72" rx="3" fill={fillMuted} stroke={strokeSubtle} />
        <text x="266" y="126" fill={textPrimary} fontSize="10" textAnchor="middle">
          {l.cpu}
        </text>

        {/* Front intake fans */}
        <circle cx="112" cy="88" r="18" fill="none" stroke={strokeSubtle} strokeWidth="2" />
        <circle cx="112" cy="140" r="18" fill="none" stroke={strokeSubtle} strokeWidth="2" />

        {/* Rear and top exhaust fans */}
        <circle cx="368" cy="88" r="18" fill="none" stroke={strokeSubtle} strokeWidth="2" />
        <circle cx="250" cy="58" r="16" fill="none" stroke={strokeSubtle} strokeWidth="2" />

        {/* Intake arrows: front and bottom */}
        {arrow(40, 88, 86, 88, 'in1')}
        {arrow(40, 140, 86, 140, 'in2')}
        {arrow(158, 300, 158, 276, 'in3')}

        {/* Exhaust arrows: rear and top */}
        {arrow(394, 88, 440, 88, 'out1')}
        {arrow(250, 36, 250, 12, 'out2')}
        {arrow(222, 251, 264, 251, 'out3')}

        {/* Direction labels */}
        <text x="42" y="76" fill={accent} fontSize="11" fontWeight="600">
          {text.intake}
        </text>
        <text x="396" y="76" fill={accent} fontSize="11" fontWeight="600">
          {text.exhaust}
        </text>
        <text x="252" y="28" fill={accent} fontSize="11" fontWeight="600">
          {text.exhaust}
        </text>

        {/* Orientation and dust filter */}
        <text x="66" y="300" fill={textMuted} fontSize="11" textAnchor="middle">
          {l.front}
        </text>
        <text x="414" y="300" fill={textMuted} fontSize="11" textAnchor="middle">
          {l.rear}
        </text>
        <line
          x1="98"
          y1="278"
          x2="218"
          y2="278"
          stroke={strokeSubtle}
          strokeWidth="3"
          strokeDasharray="4 3"
        />
        <text x="158" y="292" fill={textMuted} fontSize="10" textAnchor="middle">
          {l.filter}
        </text>

        {/* The takeaway, stated on the drawing itself */}
        <text x="240" y="20" fill={textMuted} fontSize="11" textAnchor="middle">
          {l.positive}
        </text>
      </svg>
    </Diagram>
  );
}
