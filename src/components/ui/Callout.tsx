import { cn } from '@/lib/utils';
import { AlertIcon, CheckIcon, InfoIcon } from './Icon';

type Tone = 'info' | 'warning' | 'success';

const tones: Record<Tone, { wrapper: string; icon: string }> = {
  info: { wrapper: 'border-info/35 bg-info/8', icon: 'text-info' },
  warning: { wrapper: 'border-warning/40 bg-warning/8', icon: 'text-warning' },
  success: { wrapper: 'border-success/35 bg-success/8', icon: 'text-success' },
};

const icons: Record<Tone, typeof InfoIcon> = {
  info: InfoIcon,
  warning: AlertIcon,
  success: CheckIcon,
};

/**
 * A highlighted aside — used for the warnings inside guide steps.
 *
 * The tone is carried by a visible text label as well as by colour, because
 * colour alone is not an acceptable way to convey meaning (WCAG 1.4.1). The
 * icon is decorative; the label is what actually communicates the severity.
 */
export function Callout({
  tone = 'info',
  label,
  children,
  className,
}: {
  tone?: Tone;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  const Icon = icons[tone];

  return (
    <aside className={cn('rounded-md border p-4', tones[tone].wrapper, className)}>
      <p
        className={cn(
          'mb-1.5 flex items-center gap-2 text-xs font-bold tracking-wide uppercase',
          tones[tone].icon,
        )}
      >
        <Icon className="size-4" />
        {label}
      </p>
      <div className="text-sm leading-relaxed text-text-secondary">{children}</div>
    </aside>
  );
}
