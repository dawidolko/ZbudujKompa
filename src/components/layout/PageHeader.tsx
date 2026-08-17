import { cn } from '@/lib/utils';

/**
 * Standard page heading block.
 *
 * Every content page opens with this, so the h1, the lead paragraph and the
 * spacing below them stay identical across the site instead of being
 * re-specified on each page and drifting apart.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  meta,
  className,
}: {
  eyebrow?: React.ReactNode;
  title: string;
  lead?: string;
  /** Badges or metadata rendered under the lead. */
  meta?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('container-page pt-8 pb-10 md:pt-12 md:pb-14', className)}>
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="mb-3 text-xs font-bold tracking-[0.12em] text-accent-fg uppercase">
            {eyebrow}
          </p>
        ) : null}

        <h1 className="font-display text-3xl leading-tight font-extrabold text-text-primary md:text-4xl lg:text-5xl">
          {title}
        </h1>

        {lead ? (
          <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">{lead}</p>
        ) : null}

        {meta ? <div className="mt-5 flex flex-wrap items-center gap-2">{meta}</div> : null}
      </div>
    </div>
  );
}

/** Section heading used inside a page, below the h1. */
export function SectionHeading({
  title,
  lead,
  action,
  id,
  className,
}: {
  title: string;
  lead?: string;
  action?: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div className="max-w-2xl">
        <h2
          id={id}
          className="font-display text-2xl leading-tight font-bold text-text-primary md:text-3xl"
        >
          {title}
        </h2>
        {lead ? <p className="mt-2 text-sm leading-relaxed text-text-secondary">{lead}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
