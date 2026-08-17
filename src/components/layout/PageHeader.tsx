import type { Locale } from '@/i18n/config';
import { Photo } from '@/components/ui/Photo';
import { cn } from '@/lib/utils';

/**
 * Page hero.
 *
 * Every content page opens with this, so the h1, the lead and the spacing stay
 * identical across the site rather than being re-specified per page and
 * drifting apart.
 *
 * The backdrop is built from three stacked layers, matching the home page:
 * a photograph held far back, a soft accent glow, and the circuit pattern.
 * Passing `photo` opts a page into the imagery; without it the header falls
 * back to the pattern alone, which is what pages with no fitting photograph
 * should use rather than a loosely related stock image.
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
  /** Photograph slug for the backdrop. Requires `locale`. */
  photo?: string;
  locale?: Locale;
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden border-b border-border-subtle',
        /* Top padding is generous because the breadcrumb trail overlaps into
           this block. The bottom margin separates the hero from the first
           section, which would otherwise start flush against the border. */
        'mb-10 pt-16 pb-12 md:mb-14 md:pt-20 md:pb-16',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {photo && locale ? (
          <Photo
            slug={photo}
            locale={locale}
            /* Held at low opacity: this is a backdrop behind body text, and
               the text has to keep its contrast ratio against it. */
            className="absolute inset-0 h-full opacity-[0.10]"
            ratio="auto"
            sizes="100vw"
            imgClassName="object-cover"
          />
        ) : null}
        <div className="bg-accent-glow absolute inset-0 opacity-70" />
        <div className="bg-circuit-grid absolute inset-0" />
      </div>

      <div className="container-page relative">
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
