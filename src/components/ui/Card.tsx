import Link from 'next/link';
import { cn } from '@/lib/utils';

/** Plain surface container used for grouping related content. */
export function Card({
  className,
  children,
  as: Tag = 'div',
}: {
  className?: string;
  children: React.ReactNode;
  as?: 'div' | 'article' | 'section' | 'li';
}) {
  return <Tag className={cn('footprint p-5 md:p-6', className)}>{children}</Tag>;
}

/**
 * A card whose whole area is clickable.
 *
 * The anchor wraps only the title, and a pseudo-element stretches it over the
 * card. That keeps the accessible name to the title alone — a link wrapping
 * the entire card would be announced as one enormous run-on label — while the
 * pointer target stays the full card. The focus ring is moved onto the card
 * with focus-within so keyboard users see the same boundary a mouse user hits.
 */
export function LinkCard({
  href,
  title,
  description,
  eyebrow,
  footer,
  className,
}: {
  href: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        'footprint group relative isolate flex flex-col gap-2 p-5',
        'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--focus-ring)]',
        className,
      )}
    >
      {eyebrow ? <div className="flex flex-wrap items-center gap-2">{eyebrow}</div> : null}

      <h3 className="text-lg leading-snug h-sans text-text-primary">
        <Link
          href={href}
          /* The stretched pseudo-element covers the card; the card is the
             containing block because it sets `isolate`. */
          className="after:absolute after:inset-0 after:content-[''] focus:outline-none"
        >
          {title}
        </Link>
      </h3>

      {description ? (
        <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
      ) : null}

      {footer ? <div className="mt-auto pt-3">{footer}</div> : null}
    </article>
  );
}
