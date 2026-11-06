import { cn } from '@/lib/utils';

/**
 * A bill of materials: quantity, item, note.
 *
 * Rendered as a description list rather than styled divs, so the relationship
 * between each number and its label survives for a screen reader.
 */
export function StatBand({
  stats,
  className,
}: {
  stats: { value: string | number; label: string; note?: string }[];
  className?: string;
}) {
  return (
    <dl className={cn('bom-list', className)}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-4 border-b border-border-subtle py-3 md:grid-cols-[5.5rem_minmax(0,12rem)_minmax(0,1fr)] md:items-baseline"
        >
          <dd className="font-display row-span-2 text-2xl font-semibold text-accent-fg md:row-span-1">
            {stat.value}
          </dd>
          <dt className="order-first col-start-2 font-semibold text-text-primary md:order-none md:col-start-auto">
            {stat.label}
          </dt>
          {stat.note ? (
            <dd className="col-start-2 text-sm text-text-secondary md:col-start-auto">
              {stat.note}
            </dd>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
