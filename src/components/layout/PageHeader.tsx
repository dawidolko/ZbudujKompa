import type { Locale } from '@/i18n/config';
import { Photo } from '@/components/ui/Photo';
import { cn } from '@/lib/utils';

/**
 * The head of a page, printed on the board.
 *
 * Every content page opens with this, so the h1, the lead and the spacing stay
 * identical across the site. `photo` adds a plate beside the title on a wide
 * screen; a narrow one has no room for it, and the image is then never fetched.
 * Its subject is decoration here, so it is hidden from assistive technology.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  meta,
  className,
  photo,
  locale,
}: {
  eyebrow?: React.ReactNode;
  title: string;
  lead?: string;
  /** Badges or metadata rendered under the lead. */
  meta?: React.ReactNode;
  className?: string;
  /** Photograph slug for the plate. Requires `locale`. */
  photo?: string;
  locale?: Locale;
}) {
  return (
    <div className={cn('mask mb-10 md:mb-14', className)}>
      <div className="container-page grid gap-10 pt-6 pb-8 md:pt-8 md:pb-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end">
        <div className="max-w-3xl">
          {eyebrow ? <p className="spec-label mb-2 text-accent-fg">{eyebrow}</p> : null}

          <h1 className="font-display text-3xl font-semibold text-text-primary lg:text-4xl">
            {title}
          </h1>

          {lead ? <p className="mt-4 text-text-secondary md:text-lg">{lead}</p> : null}

          {meta ? <div className="mt-4 flex flex-wrap items-center gap-2">{meta}</div> : null}
        </div>

        {photo && locale ? (
          <div className="plate hidden lg:block" aria-hidden="true">
            <Photo
              slug={photo}
              locale={locale}
              ratio="16/10"
              sizes="19rem"
              className="bg-transparent"
            />
          </div>
        ) : null}
      </div>
      <div className="ruler" aria-hidden="true" />
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
    <div className={cn('mb-6', className)}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="via" aria-hidden="true" />
        <h2 id={id} className="font-display text-xl font-semibold text-text-primary md:text-2xl">
          {title}
        </h2>
        <span className="hidden h-px flex-1 bg-border-default sm:block" aria-hidden="true" />
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {lead ? <p className="mt-2 max-w-2xl text-sm text-text-secondary">{lead}</p> : null}
    </div>
  );
}
