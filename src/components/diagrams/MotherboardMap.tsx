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
    title: 'Rozmieszczenie elementów na płycie ATX',
    caption:
      'Widok z góry na typową płytę ATX. Od góry po lewej: gniazdo EPS 8-pin zasilające procesor. Na środku gniazdo procesora, otoczone sekcją zasilania z radiatorami. Po prawej cztery sloty pamięci — dwa moduły montuje się w drugim i czwartym, licząc od procesora. Po prawej krawędzi gniazdo ATX 24-pin. Poniżej gniazda PCIe: najdłuższy górny prowadzi bezpośrednio do procesora i jest przeznaczony na kartę graficzną. Między slotami PCIe znajdują się gniazda M.2 na dyski NVMe. W prawym dolnym rogu blok pinów panelu przedniego.',
    labels: {
      eps: 'EPS 8-pin',
      cpu: 'Gniazdo CPU',
      vrm: 'Sekcja zasilania',
      ram: 'Sloty pamięci',
      ramHint: 'użyj 2 i 4',
      atx: 'ATX 24-pin',
      pcie1: 'PCIe x16 — karta graficzna',
      pcie2: 'PCIe x1',
      m2: 'M.2 (NVMe)',
      panel: 'Panel przedni',
      io: 'Złącza tylne',
      sata: 'SATA',
    },
  },
  en: {
    title: 'Component layout on an ATX motherboard',
    caption:
      'Top-down view of a typical ATX board. Top left: the 8-pin EPS connector that powers the CPU. In the centre, the CPU socket surrounded by the power delivery section and its heatsinks. To the right, four memory slots — with two modules, fit them in the second and fourth counting from the CPU. Along the right edge, the 24-pin ATX connector. Below are the PCIe slots: the long top one is wired directly to the CPU and takes the graphics card. Between the PCIe slots sit the M.2 sockets for NVMe drives. The front panel pin block is in the bottom right corner.',
    labels: {
      eps: 'EPS 8-pin',
      cpu: 'CPU socket',
      vrm: 'Power delivery',
      ram: 'Memory slots',
      ramHint: 'use 2 and 4',
      atx: 'ATX 24-pin',
      pcie1: 'PCIe x16 — graphics card',
      pcie2: 'PCIe x1',
      m2: 'M.2 (NVMe)',
      panel: 'Front panel',
      io: 'Rear I/O',
      sata: 'SATA',
    },
  },
};

/**
 * Annotated map of an ATX motherboard.
 *
 * Proportions follow the real 305 x 244 mm ATX specification, so the spatial
 * relationships a builder needs — memory to the right of the socket, the
 * primary PCIe slot nearest the CPU, the front panel block bottom right — are
 * genuinely where the drawing puts them.
 */
export function MotherboardMap({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const l = text.labels;

  return (
    <Diagram title={text.title} caption={text.caption}>
      <svg viewBox="0 0 520 420" className="h-auto w-full" role="img" aria-label={text.caption}>
        {/* Board outline */}
        <rect
          x="10"
          y="10"
          width="500"
          height="400"
          rx="6"
          fill={fillSurface}
          stroke={stroke}
          strokeWidth="2"
        />

        {/* Rear I/O shroud */}
        <rect x="20" y="20" width="150" height="46" rx="3" fill={fillMuted} stroke={strokeSubtle} />
        <text x="95" y="48" fill={textMuted} fontSize="12" textAnchor="middle">
          {l.io}
        </text>

        {/* EPS connector. The rectangle is sized for the longest label across
            both languages, so a translation cannot overflow its own shape. */}
        <rect
          x="188"
          y="18"
          width="72"
          height="24"
          rx="2"
          fill={fillMuted}
          stroke={accent}
          strokeWidth="2"
        />
        <text x="224" y="34" fill={textPrimary} fontSize="11" textAnchor="middle" fontWeight="600">
          {l.eps}
        </text>

        {/* VRM heatsinks. The label sits above the heatsink rather than inside
            it — "Sekcja zasilania" is far longer than "Power delivery" and
            would not fit within the shape at any readable size. */}
        <rect x="188" y="52" width="20" height="96" rx="2" fill={fillMuted} stroke={strokeSubtle} />
        <rect x="112" y="86" width="68" height="16" rx="2" fill={fillMuted} stroke={strokeSubtle} />
        <text x="146" y="78" fill={textMuted} fontSize="10" textAnchor="middle">
          {l.vrm}
        </text>

        {/* CPU socket */}
        <rect
          x="218"
          y="70"
          width="86"
          height="86"
          rx="4"
          fill={fillMuted}
          stroke={accent}
          strokeWidth="2.5"
        />
        <rect
          x="234"
          y="86"
          width="54"
          height="54"
          rx="2"
          fill={fillSurface}
          stroke={strokeSubtle}
        />
        <text x="261" y="118" fill={textPrimary} fontSize="12" textAnchor="middle" fontWeight="700">
          {l.cpu}
        </text>

        {/* Memory slots — numbered, because the ordering is the point */}
        {[0, 1, 2, 3].map((index) => {
          const x = 332 + index * 22;
          const populated = index === 1 || index === 3;
          return (
            <g key={index}>
              <rect
                x={x}
                y="60"
                width="13"
                height="120"
                rx="2"
                fill={populated ? accent : fillMuted}
                stroke={populated ? accent : strokeSubtle}
                strokeWidth={populated ? 2 : 1}
                opacity={populated ? 0.9 : 1}
              />
              <text x={x + 6.5} y="194" fill={textMuted} fontSize="11" textAnchor="middle">
                {index + 1}
              </text>
            </g>
          );
        })}
        <text x="376" y="48" fill={textPrimary} fontSize="12" textAnchor="middle" fontWeight="600">
          {l.ram}
        </text>
        <text x="376" y="212" fill={accent} fontSize="11" textAnchor="middle" fontWeight="600">
          {l.ramHint}
        </text>

        {/* ATX 24-pin */}
        <rect
          x="446"
          y="70"
          width="26"
          height="76"
          rx="2"
          fill={fillMuted}
          stroke={accent}
          strokeWidth="2"
        />
        <text x="459" y="162" fill={textPrimary} fontSize="11" textAnchor="middle" fontWeight="600">
          {l.atx}
        </text>

        {/* Primary PCIe x16 */}
        <rect
          x="60"
          y="238"
          width="300"
          height="16"
          rx="2"
          fill={accent}
          stroke={accent}
          strokeWidth="2"
          opacity="0.9"
        />
        <text x="210" y="230" fill={textPrimary} fontSize="12" textAnchor="middle" fontWeight="600">
          {l.pcie1}
        </text>

        {/* M.2 slots */}
        <rect
          x="60"
          y="196"
          width="180"
          height="10"
          rx="2"
          fill={fillMuted}
          stroke={strokeSubtle}
        />
        <text x="150" y="190" fill={textMuted} fontSize="11" textAnchor="middle">
          {l.m2}
        </text>
        <rect
          x="60"
          y="276"
          width="180"
          height="10"
          rx="2"
          fill={fillMuted}
          stroke={strokeSubtle}
        />

        {/* Secondary PCIe */}
        <rect x="60" y="306" width="90" height="14" rx="2" fill={fillMuted} stroke={strokeSubtle} />
        <text x="105" y="336" fill={textMuted} fontSize="11" textAnchor="middle">
          {l.pcie2}
        </text>
        <rect
          x="60"
          y="348"
          width="300"
          height="16"
          rx="2"
          fill={fillMuted}
          stroke={strokeSubtle}
        />

        {/* SATA ports */}
        <rect
          x="446"
          y="250"
          width="26"
          height="60"
          rx="2"
          fill={fillMuted}
          stroke={strokeSubtle}
        />
        <text x="459" y="326" fill={textMuted} fontSize="11" textAnchor="middle">
          {l.sata}
        </text>

        {/* Front panel header */}
        <rect
          x="392"
          y="366"
          width="80"
          height="24"
          rx="2"
          fill={fillMuted}
          stroke={accent}
          strokeWidth="2"
        />
        <text x="432" y="360" fill={textPrimary} fontSize="11" textAnchor="middle" fontWeight="600">
          {l.panel}
        </text>
      </svg>
    </Diagram>
  );
}
