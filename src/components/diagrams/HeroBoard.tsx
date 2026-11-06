import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { localePath } from '@/i18n/config';
import { board, dimmSlots, rect, zones, type Box } from './boardLayout';

/**
 * The board on the home page.
 *
 * The drawing and the edge connector under it are one device: each gold finger
 * is a link, and a trace runs from it to the part it is about. Hovering or
 * focusing either end lights the whole net, which the stylesheet does with
 * `:has()`, so none of this needs a script.
 *
 * The fingers are the real links. The drawing is hidden from assistive
 * technology, and its pointer targets repeat those links with `tabIndex={-1}`,
 * so nothing is announced twice or reached twice by keyboard.
 *
 * Designators are universal, which is why the drawing carries no translated text.
 */

export type Net = 'cooling' | 'cpu' | 'storage' | 'gpu' | 'memory' | 'case' | 'psu';

/* The board drawing is placed in the right part of a 1320 x 600 sheet. */
const SCALE = 1.38;
const OFFSET_X = 596;
const OFFSET_Y = 8;

const traces: Record<Net, string[]> = {
  cooling: ['M94 600V556L110 540H566L590 516V160L612 138H750'],
  cpu: ['M283 600V572L299 556H582L606 532V256L628 234H915L927 222'],
  storage: ['M471 600V586L485 572H600L620 552V305L640 285H679'],
  gpu: ['M660 600V362L675 347H679'],
  memory: ['M849 600V314L881 282H1154V256', 'M1063 282V256', 'M1093 282V256', 'M1124 282V256'],
  case: ['M1037 600V554L1061 530H1137'],
  psu: ['M1226 600V596L1296 526V236L1278 218H1240L1229 209'],
};

/* Fine traces with no destination of their own, for the density of a real board:
   the memory bus, the graphics lanes and the rear I/O. */
const fineTraces = [
  'M904 96H1040',
  'M904 104H1040',
  'M904 112H1040',
  'M904 120H1040',
  'M904 128H1040',
  'M904 136H1040',
  'M904 144H1040',
  'M904 152H1040',
  'M904 160H1040',
  'M904 168H1040',
  'M930 224V300L950 320V334',
  'M940 224V296L960 316V334',
  'M950 224V292L970 312V334',
  'M960 224V288L980 308V334',
  'M970 224V284L990 304V334',
  'M830 104H860',
  'M830 112H860',
  'M830 120H860',
  'M1211 362H1160L1140 382V470',
  'M1211 374H1168L1150 392V470',
  'M1211 386H1176L1160 402V470',
  'M660 70H804',
  'M660 58H780L800 38H860',
  'M24 24H300L320 44V60',
  'M24 34H240',
  'M1300 24H900',
  'M1300 34H940',
];

const mountHoles = [
  [34, 34],
  [214, 34],
  [486, 34],
  [34, 214],
  [486, 214],
  [34, 386],
  [214, 386],
  [486, 386],
];

function Part({ box, rx = 2, metal = false }: { box: Box; rx?: number; metal?: boolean }) {
  return <rect {...rect(box)} rx={rx} className={metal ? 'bd-metal' : 'bd-part'} />;
}

function Label({ x, y, children, end }: { x: number; y: number; children: string; end?: boolean }) {
  return (
    <text x={x} y={y} className="bd-text" textAnchor={end ? 'end' : 'middle'}>
      {children}
    </text>
  );
}

/* A pointer target that repeats a finger's link. */
function Hit({ href, net, children }: { href: string; net: Net; children: React.ReactNode }) {
  return (
    <Link href={href} tabIndex={-1} prefetch={false} className={`bd-hit net-${net}`}>
      {children}
    </Link>
  );
}

export function HeroBoard({ locale, hrefs }: { locale: Locale; hrefs: Record<Net, string> }) {
  const to = (net: Net) => localePath(locale, hrefs[net]);

  return (
    <svg
      viewBox="0 0 1320 600"
      className="hero-drawing"
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      <defs>
        <pattern id="lga" width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="0.9" fill="var(--color-silk-300)" />
        </pattern>
      </defs>

      {fineTraces.map((d) => (
        <path key={d} d={d} className="bd-faint" />
      ))}

      {(Object.entries(traces) as [Net, string[]][]).map(([net, paths], index) => (
        <g key={net} className={`net-${net}`}>
          {paths.map((d, pathIndex) => (
            <path
              key={d}
              d={d}
              pathLength={1}
              className={`bd-trace bd-route bd-route-${Math.min(index, 6)}`}
              style={pathIndex > 0 ? { animationDelay: '900ms' } : undefined}
            />
          ))}
        </g>
      ))}

      <g transform={`translate(${OFFSET_X} ${OFFSET_Y}) scale(${SCALE})`}>
        {/* The silkscreen outline of the ATX board, with its two real dimensions. */}
        <rect {...rect(board)} rx="3" className="bd-dim" strokeDasharray="6 4" />
        <path d="M10 2H510M10 -1V5M510 -1V5" className="bd-dim" />
        <Label x={260} y={0}>
          305 mm
        </Label>
        <path d="M514 10V410M511 10H517M511 410H517" className="bd-dim" />
        <text
          x="516"
          y="214"
          className="bd-text"
          textAnchor="middle"
          transform="rotate(90 516 214)"
        >
          244 mm
        </text>

        {mountHoles.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="5" fill="var(--color-mask-800)" className="bd-dim" />
            <circle cx={x} cy={y} r="2" fill="var(--mask)" />
          </g>
        ))}

        <Part box={zones.io} />
        <Label x={95} y={46}>
          I/O
        </Label>

        <Part box={zones.eps} />
        <Label x={224} y={33}>
          J2
        </Label>

        <Hit href={to('cooling')} net="cooling">
          <Part box={zones.vrmSide} />
          <Part box={zones.vrmTop} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
            <path key={index} d={`M${118 + index * 8} 88V100`} className="bd-dim" />
          ))}
          <Label x={146} y={82}>
            VRM1
          </Label>
        </Hit>

        <Hit href={to('cpu')} net="cpu">
          <Part box={zones.cpu} rx={3} />
          <rect {...rect(zones.cpuDie)} fill="url(#lga)" className="bd-dim" />
          <path d="M218 80L228 70" className="bd-dim" />
          <rect x="248" y="104" width="26" height="16" fill="var(--color-mask-800)" />
          <Label x={261} y={115}>
            U1
          </Label>
        </Hit>

        <Hit href={to('memory')} net="memory">
          {dimmSlots.map((slot, index) => (
            <g key={slot.x}>
              <Part box={slot} />
              {index === 1 || index === 3 ? (
                <rect
                  x={slot.x + 3}
                  y={slot.y + 4}
                  width={slot.width - 6}
                  height={slot.height - 8}
                  className="bd-metal"
                />
              ) : null}
            </g>
          ))}
          <Label x={376} y={52}>
            DIMM A1-B2
          </Label>
        </Hit>

        <Hit href={to('psu')} net="psu">
          <Part box={zones.atx} />
          {Array.from({ length: 12 }, (_, row) =>
            [0, 1].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={450 + col * 10}
                y={74 + row * 6}
                width="7"
                height="4"
                className="bd-metal"
              />
            )),
          )}
          <Label x={459} y={60}>
            J1 ATX24
          </Label>
        </Hit>

        <Hit href={to('gpu')} net="gpu">
          <Part box={zones.pcieMain} />
          <rect x="66" y="243" width="288" height="6" className="bd-metal" />
          <Label x={210} y={232}>
            PCIE1 x16
          </Label>
        </Hit>

        <Hit href={to('storage')} net="storage">
          <Part box={zones.m2Top} />
          <rect x="64" y="199" width="172" height="4" className="bd-metal" />
          <Label x={150} y={190}>
            M2_1
          </Label>
        </Hit>

        <Part box={zones.m2Lower} />
        <Label x={150} y={272}>
          M2_2
        </Label>
        <Part box={zones.pcieShort} />
        <Label x={105} y={334}>
          PCIE2 x1
        </Label>
        <Part box={zones.pcieLower} />
        <Label x={210} y={378}>
          PCIE3 x4
        </Label>
        <Part box={zones.sata} />
        <Label x={459} y={324}>
          SATA
        </Label>

        <Hit href={to('case')} net="case">
          <Part box={zones.panel} />
          {Array.from({ length: 9 }, (_, index) => (
            <circle key={index} cx={402 + index * 7.5} cy="378" r="2" className="bd-metal" />
          ))}
          <Label x={432} y={360}>
            JFP1
          </Label>
        </Hit>
      </g>

      {/* Fiducials: the marks an assembly machine aligns a board by. */}
      {[
        [572, 34],
        [1296, 576],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="9" className="bd-dim" />
          <circle cx={x} cy={y} r="3.5" className="bd-metal" />
        </g>
      ))}
    </svg>
  );
}
