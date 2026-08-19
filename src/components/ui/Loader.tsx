import { cn } from '@/lib/utils';

/**
 * Loading indicators drawn on the site's own subject matter.
 *
 * All are inline SVG that inherit the theme, and all are marked
 * `role="status"` with a text label, so a screen reader announces that
 * something is loading rather than encountering a decorative graphic and
 * silence. Every animation sits behind `prefers-reduced-motion` in the
 * stylesheet, so a static shape remains for readers who asked for less motion.
 */

/** A spinning fan, for general waiting. */
export function FanLoader({ label, className }: { label: string; className?: string }) {
  return (
    <div role="status" className={cn('inline-flex items-center gap-3', className)}>
      <svg viewBox="0 0 48 48" className="size-8 text-accent" aria-hidden="true" fill="none">
        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" opacity="0.25" />
        <g className="animate-spin-slow" style={{ transformOrigin: '24px 24px' }}>
          <path
            d="M24 21c0-5 1.5-9 5-9s4 4 0 7M27 24c5 0 9 1.5 9 5s-4 4-7 0M24 27c0 5-1.5 9-5 9s-4-4 0-7M21 24c-5 0-9-1.5-9-5s4-4 7 0"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="24" r="3" fill="currentColor" />
        </g>
      </svg>
      <span className="text-sm text-text-secondary">{label}</span>
    </div>
  );
}

/**
 * A progress bar with a scanning highlight, for indeterminate waits.
 *
 * Deliberately not given `aria-valuenow`: the wait has no known length, and
 * inventing a percentage would tell a screen reader something untrue.
 */
export function ScanLoader({ label, className }: { label: string; className?: string }) {
  return (
    <div role="status" className={cn('w-full', className)}>
      <div className="relative h-1.5 overflow-hidden rounded-full bg-bg-muted">
        <div className="animate-scan absolute inset-x-0 h-full bg-gradient-to-r from-transparent via-accent to-transparent" />
      </div>
      <p className="mt-2 text-sm text-text-secondary">{label}</p>
    </div>
  );
}

/**
 * A circuit trace whose junction dots pulse in sequence.
 *
 * Used where a wait is expected to be short — the sequence reads as progress
 * without implying a measurable proportion.
 */
export function CircuitLoader({ label, className }: { label: string; className?: string }) {
  return (
    <div role="status" className={cn('inline-flex flex-col items-center gap-3', className)}>
      <svg viewBox="0 0 120 40" className="h-10 w-30 text-accent" aria-hidden="true" fill="none">
        <path
          d="M4 20h20l8-8h16l8 8h20l8 8h28"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.3"
        />
        {[4, 32, 60, 88, 116].map((cx, index) => (
          <circle
            key={cx}
            cx={cx}
            cy={index % 2 === 0 ? 20 : 12}
            r="3.5"
            fill="currentColor"
            className="animate-trace-pulse"
            /* Staggered so the pulse travels along the trace rather than every
               dot flashing together. */
            style={{ animationDelay: `${index * 0.18}s` }}
          />
        ))}
      </svg>
      <span className="text-sm text-text-secondary">{label}</span>
    </div>
  );
}

/**
 * A placeholder block for content still arriving.
 *
 * Hidden from assistive technology: a screen reader gains nothing from a grey
 * rectangle, and the surrounding region already carries a live status.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('animate-pulse rounded-md bg-bg-muted', className)} />
  );
}
