import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

/**
 * Every size keeps the control at least 44px tall at `md` and above, which is
 * the WCAG 2.2 target-size minimum (2.5.8). The `sm` variant is 36px and is
 * only used where an equivalent full-size control exists nearby, which is the
 * exception the success criterion allows.
 */
const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-xs gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-13 px-7 text-base gap-2.5',
};

const variants: Record<Variant, string> = {
  /* Dark ink on the cyan fill: white on this hue is only 2.3:1, whereas
     graphite-950 on brand-500 measures 7.15:1. */
  primary: 'bg-accent text-text-on-brand hover:bg-accent-hover active:bg-accent-active shadow-xs',
  secondary:
    'border border-border-default text-text-primary hover:border-border-brand hover:text-text-brand bg-surface',
  ghost: 'text-text-secondary hover:bg-bg-muted hover:text-text-primary',
  danger: 'border border-danger text-danger hover:bg-danger hover:text-text-inverse',
};

const base =
  'inline-flex items-center justify-center rounded-sm font-semibold uppercase tracking-wide ' +
  'transition-colors focus-ring disabled:pointer-events-none disabled:opacity-50 ' +
  'whitespace-nowrap';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={cn(base, sizes[size], variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}

type ButtonLinkProps = CommonProps & {
  href: string;
  /** Set for links leaving the site — adds the security-relevant rel values. */
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

/**
 * A link styled as a button.
 *
 * Kept separate from `Button` rather than merged behind an `as` prop: a link
 * navigates and a button acts, and conflating them tends to produce anchors
 * without an href or buttons that should have been links. Anything that
 * navigates belongs here.
 */
export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  external,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(base, sizes[size], variants[variant], className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        /* noopener blocks the new page from reaching back through
           window.opener; noreferrer additionally withholds the referrer. */
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
