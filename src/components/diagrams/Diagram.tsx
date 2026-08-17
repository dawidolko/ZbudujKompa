import { cn } from '@/lib/utils';

/**
 * Wrapper for the technical diagrams.
 *
 * Every diagram is authored as inline SVG rather than shipped as an image, for
 * three reasons that matter here: it inherits the theme tokens so it stays
 * legible in light and dark, it weighs a few kilobytes instead of a few
 * hundred, and its labels are real text — searchable, translatable and
 * readable by a screen reader.
 *
 * The figure is exposed as a labelled group with a caption, so assistive
 * technology announces what the drawing shows rather than skipping it. The
 * caption is not decoration: for a reader who cannot see the diagram it is the
 * content, so it always describes the arrangement in words.
 */
export function Diagram({
  title,
  caption,
  children,
  className,
}: {
  title: string;
  caption: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        'my-6 overflow-hidden rounded-lg border border-border-subtle bg-surface',
        className,
      )}
    >
      {/* The drawing scrolls inside its own box on narrow screens so the page
          body never scrolls sideways. */}
      <div className="overflow-x-auto p-4 md:p-6">
        <div className="min-w-[20rem]">{children}</div>
      </div>
      <figcaption className="border-t border-border-subtle bg-bg-subtle px-4 py-3 text-xs leading-relaxed text-text-secondary">
        <span className="font-semibold text-text-primary">{title}.</span> {caption}
      </figcaption>
    </figure>
  );
}

/* Shared drawing tokens. Colours reference the CSS custom properties, so a
   diagram repaints with the theme instead of being baked to one palette. */
export const stroke = 'var(--border-strong)';
export const strokeSubtle = 'var(--border-default)';
export const fillSurface = 'var(--surface)';
export const fillMuted = 'var(--bg-muted)';
export const accent = 'var(--accent)';
export const textPrimary = 'var(--text-primary)';
export const textMuted = 'var(--text-muted)';
