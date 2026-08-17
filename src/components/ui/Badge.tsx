import { cn } from '@/lib/utils';

type Tone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'amd' | 'intel';

/**
 * Every tone pairs a tinted background with a text colour measured against
 * that background rather than against the page. The vendor tones use a
 * transparent tint of the brand colour so they stay legible in both themes
 * without a second set of tokens.
 */
const tones: Record<Tone, string> = {
  neutral: 'bg-bg-muted text-text-secondary',
  brand: 'bg-accent-subtle text-accent-fg',
  success: 'bg-success/12 text-success',
  warning: 'bg-warning/12 text-warning',
  danger: 'bg-danger/12 text-danger',
  info: 'bg-info/12 text-info',
  amd: 'bg-vendor-amd/12 text-vendor-amd',
  intel: 'bg-vendor-intel/12 text-vendor-intel',
};

export function Badge({
  tone = 'neutral',
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-xs px-2 py-0.5',
        'text-[0.6875rem] font-bold tracking-wide uppercase',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
