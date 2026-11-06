import { cn } from '@/lib/utils';
import { AlertIcon, CheckIcon, InfoIcon } from './Icon';

type Tone = 'info' | 'warning' | 'success';

const tones: Record<Tone, { wrapper: string; icon: string }> = {
  info: { wrapper: 'border-info', icon: 'text-info' },
  warning: { wrapper: 'border-warning', icon: 'text-warning' },
  success: { wrapper: 'border-success', icon: 'text-success' },
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
    <div role="note" className={cn('border-l-4 py-1 pl-4', tones[tone].wrapper, className)}>
      <p
        className={cn(
          'mb-1 flex items-center gap-2 font-mono text-xs font-semibold',
          tones[tone].icon,
        )}
      >
        <Icon className="size-4" />
        {label}
      </p>
      <div className="text-sm text-text-secondary">{children}</div>
    </div>
  );
}
