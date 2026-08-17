import { cn } from '@/lib/utils';

/**
 * ZbudujKompa logo.
 *
 * The mark is a stylised CPU: a rounded square die with contact pins on each
 * edge and a cyan build-arrow rising through the middle — "build" plus
 * "computer" in one shape, which is what the name says.
 *
 * Drawn as inline SVG rather than loaded as a file so it inherits the current
 * text colour, needs no extra network request, and stays crisp at every size.
 * `currentColor` is what lets the same markup work in both themes.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn('shrink-0', className)}
      /* Decorative here: the wordmark next to it already carries the name, so
         announcing the logo again would just repeat it for screen readers. */
      aria-hidden="true"
      focusable="false"
    >
      {/* Contact pins on all four edges */}
      <g fill="currentColor" opacity="0.45">
        <rect x="10" y="1" width="2" height="4" rx="0.5" />
        <rect x="15" y="1" width="2" height="4" rx="0.5" />
        <rect x="20" y="1" width="2" height="4" rx="0.5" />
        <rect x="10" y="27" width="2" height="4" rx="0.5" />
        <rect x="15" y="27" width="2" height="4" rx="0.5" />
        <rect x="20" y="27" width="2" height="4" rx="0.5" />
        <rect x="1" y="10" width="4" height="2" rx="0.5" />
        <rect x="1" y="15" width="4" height="2" rx="0.5" />
        <rect x="1" y="20" width="4" height="2" rx="0.5" />
        <rect x="27" y="10" width="4" height="2" rx="0.5" />
        <rect x="27" y="15" width="4" height="2" rx="0.5" />
        <rect x="27" y="20" width="4" height="2" rx="0.5" />
      </g>

      {/* The die outline */}
      <rect
        x="5"
        y="5"
        width="22"
        height="22"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />

      {/* Build arrow — the only element that carries the brand colour, so the
          mark still reads correctly if it is ever rendered in one tone. */}
      <path
        d="M16 21.5V11.5M16 11.5L11.5 16M16 11.5L20.5 16"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Full lockup: mark plus wordmark.
 *
 * The name is split into two weights so "Zbuduj" reads as the verb and "Kompa"
 * as the object, which is how the name is meant to be parsed.
 */
export function Logo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className={cn('size-8', markClassName)} />
      <span className="font-display text-lg leading-none font-bold tracking-tight">
        <span className="text-text-primary">Zbuduj</span>
        <span className="text-accent-fg">Kompa</span>
      </span>
    </span>
  );
}
