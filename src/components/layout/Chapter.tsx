import { cn } from '@/lib/utils';

/**
 * A chapter of the home page: the number and title held in the margin, the
 * content beside them, as a manual lays out its sections.
 */
export function Chapter({
  id,
  number,
  title,
  lead,
  action,
  aside,
  children,
  className,
}: {
  id: string;
  /** The chapter's place in the sequence. */
  number: number;
  title: string;
  lead?: string;
  action?: React.ReactNode;
  /** Sits under the title in the margin, such as a figure. */
  aside?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section aria-labelledby={id} className={cn('container-page', className)}>
      <div className="chapter">
        <div className="chapter-head">
          <p className="spec-label flex items-center gap-2" aria-hidden="true">
            <span className="via" />
            {number}
          </p>
          <h2 id={id} className="font-display mt-3 text-2xl font-semibold text-text-primary">
            {title}
          </h2>
          {lead ? <p className="mt-3 text-sm text-text-secondary">{lead}</p> : null}
          {action ? <div className="mt-4">{action}</div> : null}
          {aside ? <div className="mt-6 hidden lg:block">{aside}</div> : null}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
