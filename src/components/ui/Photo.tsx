import { getPhoto } from '@/lib/photos';
import type { Locale } from '@/i18n/config';
import { asset, cn, t } from '@/lib/utils';

const WIDTHS = [400, 800, 1200, 1600] as const;

/**
 * Renders a photograph with responsive sources.
 *
 * Written as a plain `<picture>` rather than `next/image`, because under
 * `output: 'export'` the Next optimiser does not run — `next/image` would add
 * a wrapper and a client component while serving the same static files these
 * `<source>` elements point at directly.
 *
 * Format order matters: AVIF is offered first because it is roughly half the
 * size of WebP at matching quality, and browsers take the first type they
 * understand.
 */
export function Photo({
  slug,
  locale,
  className,
  imgClassName,
  /** Marks the one image likely to be the largest contentful paint. */
  priority = false,
  /** Tells the browser how wide the image will render, so it picks sensibly. */
  sizes = '100vw',
  /** Aspect ratio applied to the frame, e.g. "16/9". */
  ratio = '16/9',
}: {
  slug: string;
  locale: Locale;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  ratio?: string;
}) {
  const photo = getPhoto(slug);
  if (!photo) return null;

  const srcSet = (extension: 'avif' | 'webp') =>
    WIDTHS.map((width) => `${asset(`/photos/${slug}-${width}.${extension}`)} ${width}w`).join(', ');

  return (
    <div
      className={cn('relative overflow-hidden bg-bg-muted', className)}
      /* The ratio is set on the frame so the space is reserved before the
         image arrives — without it the page reflows as each photo loads. */
      style={{ aspectRatio: ratio }}
    >
      <picture>
        <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
        <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
        <img
          src={asset(`/photos/${slug}-1200.webp`)}
          alt={t(photo.alt, locale)}
          /* The hero loads eagerly and is fetched at high priority; everything
             below the fold waits until it is near the viewport. */
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
          className={cn('size-full object-cover', imgClassName)}
        />
      </picture>
    </div>
  );
}

/**
 * A photograph with its photographer credited beneath.
 *
 * Used where the image is content in its own right rather than decoration.
 */
export function PhotoFigure({
  slug,
  locale,
  caption,
  className,
  ratio,
  sizes,
}: {
  slug: string;
  locale: Locale;
  caption?: string;
  className?: string;
  ratio?: string;
  sizes?: string;
}) {
  const photo = getPhoto(slug);
  if (!photo) return null;

  return (
    <figure className={cn('overflow-hidden rounded-lg border border-border-subtle', className)}>
      <Photo slug={slug} locale={locale} ratio={ratio} sizes={sizes} />
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-border-subtle bg-bg-subtle px-4 py-2.5 text-xs text-text-muted">
        {caption ? <span className="text-text-secondary">{caption}</span> : <span />}
        <a
          href={photo.authorUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="rounded-xs underline underline-offset-2 transition-colors hover:text-text-brand focus-ring"
        >
          {photo.author} / Unsplash
        </a>
      </figcaption>
    </figure>
  );
}
