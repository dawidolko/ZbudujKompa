import { board, dimmSlots, rect, zones, type Box } from '@/components/diagrams/boardLayout';
import type { BuildSelection, PartCategory } from '@/lib/parts';

/**
 * The build as a board: each part chosen fills its place.
 *
 * A picture of the list beside it, so it is hidden from assistive technology.
 */
export function BuildBoard({ selection }: { selection: BuildSelection }) {
  const filled = (category: PartCategory) => Boolean(selection[category]);
  const part = (box: Box, on: boolean, rx = 1) => (
    <rect
      {...rect(box)}
      rx={rx}
      fill={on ? 'var(--mask-copper)' : 'var(--color-mask-800)'}
      stroke={on ? 'var(--mask-copper)' : 'var(--color-silk-300)'}
    />
  );

  return (
    <svg viewBox="0 0 520 420" className="block h-auto w-full" aria-hidden="true" focusable="false">
      <rect
        {...rect(board)}
        rx="3"
        fill="none"
        stroke={filled('motherboard') ? 'var(--mask-copper)' : 'var(--color-silk-300)'}
        strokeWidth={filled('motherboard') ? 3 : 1}
        strokeDasharray={filled('motherboard') ? undefined : '6 4'}
      />
      {part(zones.io, false)}
      {part(zones.vrmSide, false)}
      {part(zones.vrmTop, false)}
      {part(zones.cpu, filled('cpu'), 3)}
      {filled('cooler') ? (
        <circle cx="261" cy="113" r="30" fill="none" stroke="var(--mask)" strokeWidth="4" />
      ) : null}
      {dimmSlots.map((slot, index) => (
        <g key={slot.x}>{part(slot, filled('ram') && (index === 1 || index === 3))}</g>
      ))}
      {part(zones.eps, filled('psu'))}
      {part(zones.atx, filled('psu'))}
      {part(zones.m2Top, filled('storage'))}
      {part(zones.pcieMain, filled('gpu'))}
      {part(zones.m2Lower, false)}
      {part(zones.pcieShort, false)}
      {part(zones.pcieLower, false)}
      {part(zones.sata, false)}
      {part(zones.panel, filled('case'))}
    </svg>
  );
}
