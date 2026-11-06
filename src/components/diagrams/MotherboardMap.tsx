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
import { board, dimmSlots, rect, zones } from './boardLayout';
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
 * The spatial relationships a builder needs — memory to the right of the socket,
 * the primary PCIe slot nearest the CPU, the front panel block bottom right — are
 * genuinely where the drawing puts them, because `boardLayout` follows the
 * ATX specification.
 */
export function MotherboardMap({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const l = text.labels;

  return (
    <Diagram title={text.title} caption={text.caption}>
      <svg viewBox="0 0 520 420" className="h-auto w-full" role="img" aria-label={text.caption}>
        <rect {...rect(board)} rx="6" fill={fillSurface} stroke={stroke} strokeWidth="2" />

        <rect {...rect(zones.io)} rx="3" fill={fillMuted} stroke={strokeSubtle} />
        <text x="95" y="48" fill={textMuted} fontSize="12" textAnchor="middle">
          {l.io}
        </text>

        {/* The rectangle is sized for the longest label across both languages,
            so a translation cannot overflow its own shape. */}
        <rect {...rect(zones.eps)} rx="2" fill={fillMuted} stroke={accent} strokeWidth="2" />
        <text x="224" y="34" fill={textPrimary} fontSize="11" textAnchor="middle" fontWeight="600">
          {l.eps}
        </text>

        {/* The label sits above the heatsink rather than inside it: "Sekcja
            zasilania" would not fit within the shape at any readable size. */}
        <rect {...rect(zones.vrmSide)} rx="2" fill={fillMuted} stroke={strokeSubtle} />
        <rect {...rect(zones.vrmTop)} rx="2" fill={fillMuted} stroke={strokeSubtle} />
        <text x="146" y="78" fill={textMuted} fontSize="10" textAnchor="middle">
          {l.vrm}
        </text>

        <rect {...rect(zones.cpu)} rx="4" fill={fillMuted} stroke={accent} strokeWidth="2.5" />
        <rect {...rect(zones.cpuDie)} rx="2" fill={fillSurface} stroke={strokeSubtle} />
        <text x="261" y="118" fill={textPrimary} fontSize="12" textAnchor="middle" fontWeight="700">
          {l.cpu}
        </text>

        {/* Numbered, because the ordering is the point. */}
        {dimmSlots.map((slot, index) => {
          const populated = index === 1 || index === 3;
          return (
            <g key={slot.x}>
              <rect
                {...rect(slot)}
                rx="2"
                fill={populated ? accent : fillMuted}
                stroke={populated ? accent : strokeSubtle}
                strokeWidth={populated ? 2 : 1}
                opacity={populated ? 0.9 : 1}
              />
              <text x={slot.x + 6.5} y="194" fill={textMuted} fontSize="11" textAnchor="middle">
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

        <rect {...rect(zones.atx)} rx="2" fill={fillMuted} stroke={accent} strokeWidth="2" />
        <text x="459" y="162" fill={textPrimary} fontSize="11" textAnchor="middle" fontWeight="600">
          {l.atx}
        </text>

        <rect
          {...rect(zones.pcieMain)}
          rx="2"
          fill={accent}
          stroke={accent}
          strokeWidth="2"
          opacity="0.9"
        />
        <text x="210" y="230" fill={textPrimary} fontSize="12" textAnchor="middle" fontWeight="600">
          {l.pcie1}
        </text>

        <rect {...rect(zones.m2Top)} rx="2" fill={fillMuted} stroke={strokeSubtle} />
        <text x="150" y="190" fill={textMuted} fontSize="11" textAnchor="middle">
          {l.m2}
        </text>
        <rect {...rect(zones.m2Lower)} rx="2" fill={fillMuted} stroke={strokeSubtle} />

        <rect {...rect(zones.pcieShort)} rx="2" fill={fillMuted} stroke={strokeSubtle} />
        <text x="105" y="336" fill={textMuted} fontSize="11" textAnchor="middle">
          {l.pcie2}
        </text>
        <rect {...rect(zones.pcieLower)} rx="2" fill={fillMuted} stroke={strokeSubtle} />

        <rect {...rect(zones.sata)} rx="2" fill={fillMuted} stroke={strokeSubtle} />
        <text x="459" y="326" fill={textMuted} fontSize="11" textAnchor="middle">
          {l.sata}
        </text>

        <rect {...rect(zones.panel)} rx="2" fill={fillMuted} stroke={accent} strokeWidth="2" />
        <text x="432" y="360" fill={textPrimary} fontSize="11" textAnchor="middle" fontWeight="600">
          {l.panel}
        </text>
      </svg>
    </Diagram>
  );
}
