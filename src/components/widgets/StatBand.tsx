import { cn } from '@/lib/utils';

/**
 * A row of headline figures.
 *
 * Rendered as a description list rather than styled divs, so the relationship
 * between each number and its label survives for a screen reader — a grid of
 * bare numbers reads as noise.
 */
export function StatBand({
  stats,
  className,
}: {
  stats: { value: string | number; label: string; note?: string }[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        'grid gap-px overflow-hidden rounded-lg border border-border-subtle bg-border-subtle',
        'sm:grid-cols-2 lg:grid-cols-4',
        className,
      )}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="bg-surface p-5">
          <dt className="text-xs tracking-wide text-text-muted uppercase">{stat.label}</dt>
          <dd>
            <span className="font-display mt-1 block text-3xl font-extrabold text-accent-fg">
              {stat.value}
            </span>
            {stat.note ? (
              <span className="mt-1 block text-xs leading-relaxed text-text-secondary">
                {stat.note}
              </span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
