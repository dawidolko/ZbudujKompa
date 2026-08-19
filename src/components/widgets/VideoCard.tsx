import { Badge } from '@/components/ui/Badge';
import { ExternalIcon } from '@/components/ui/Icon';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import type { Video } from '@/lib/videos';
import { videoThumbnail, videoUrl } from '@/lib/videos';
import { asset, cn, t } from '@/lib/utils';

/**
 * A linked video.
 *
 * A link with a thumbnail rather than an embedded player: embedding loads
 * Google's tracking on every page view, and the thumbnail is served from this
 * site so nothing reaches a third party until the reader chooses to go.
 *
 * The play mark is decorative — the accessible name comes from the title and
 * the channel, which is what a screen reader user needs to decide.
 */
export function VideoCard({
  video,
  locale,
  className,
}: {
  video: Video;
  locale: Locale;
  className?: string;
}) {
  const dict = getDictionary(locale);

  return (
    <article
      className={cn(
        'hover-lift group relative isolate flex flex-col overflow-hidden rounded-lg border border-border-subtle bg-surface',
        'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--focus-ring)]',
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden bg-bg-muted">
        <img
          src={asset(videoThumbnail(video.id))}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/10"
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-accent text-text-on-brand shadow-lg">
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 size-5">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="neutral">{video.channel}</Badge>
          <Badge tone="neutral">{dict.widgets.videoLength(video.minutes)}</Badge>
          <Badge tone={video.language === locale ? 'brand' : 'neutral'}>
            {video.language.toUpperCase()}
          </Badge>
          {video.dated ? <Badge tone="warning">{dict.widgets.videoDated}</Badge> : null}
        </div>

        <h3 className="font-display mt-2 leading-snug font-bold text-text-primary">
          <a
            href={videoUrl(video.id)}
            target="_blank"
            rel="noopener noreferrer nofollow"
            /* The stretched pseudo-element makes the whole card clickable while
               the accessible name stays the title alone. */
            className="after:absolute after:inset-0 after:content-[''] focus:outline-none"
          >
            {video.title}
            <span className="sr-only"> — {dict.widgets.watchOn(video.channel)}</span>
          </a>
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
          {t(video.note, locale)}
        </p>

        <span
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-fg"
          aria-hidden="true"
        >
          YouTube
          <ExternalIcon className="size-3" />
        </span>
      </div>
    </article>
  );
}
