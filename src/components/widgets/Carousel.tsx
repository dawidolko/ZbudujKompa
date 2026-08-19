'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ChevronRightIcon } from '@/components/ui/Icon';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

/**
 * A horizontally scrolling row with arrow controls.
 *
 * Built on native overflow scrolling rather than a transform-based track, which
 * buys a lot for free: touch swiping, trackpad scrolling, keyboard scrolling
 * and the browser's own scroll-into-view for focused children all work without
 * being reimplemented. CSS scroll snapping makes a swipe land on a card.
 *
 * The arrows are an addition for pointer users, not the mechanism — they are
 * hidden from assistive technology because the row is already reachable by
 * keyboard and by screen-reader navigation.
 */
export function Carousel({
  label,
  children,
  locale,
  className,
}: {
  /** Names the region, so it is announced as more than "list". */
  label: string;
  children: React.ReactNode;
  locale: Locale;
  className?: string;
}) {
  const dict = getDictionary(locale);
  const regionId = useId();
  const trackRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  /* The arrows disable at each end rather than wrapping, because a row that
     silently jumps back to the start is disorienting. */
  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanScrollLeft(track.scrollLeft > 8);
    setCanScrollRight(track.scrollLeft + track.clientWidth < track.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateArrows();
    track.addEventListener('scroll', updateArrows, { passive: true });

    /* The row's scrollable width changes when the viewport does, so the arrow
       state has to follow it rather than being computed once. */
    const observer = new ResizeObserver(updateArrows);
    observer.observe(track);

    return () => {
      track.removeEventListener('scroll', updateArrows);
      observer.disconnect();
    };
  }, [updateArrows]);

  const scrollBy = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    /* Roughly one card, judged from the track width rather than a fixed
       figure, so it adapts to however many cards are visible. */
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' });
  }, []);

  return (
    <section aria-labelledby={regionId} className={cn('relative', className)}>
      <h3 id={regionId} className="sr-only">
        {label}
      </h3>

      <div
        ref={trackRef}
        /* Focusable and labelled, so a keyboard user can scroll it with the
           arrow keys — a scrollable region that cannot be focused is
           unreachable without a pointer. */
        tabIndex={0}
        role="group"
        aria-label={label}
        className="snap-row no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 focus-ring md:mx-0 md:px-0"
      >
        {children}
      </div>

      {/* Pointer-only affordance; the row itself is already operable. */}
      <div className="pointer-events-none absolute -top-12 right-0 hidden gap-1 md:flex">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          disabled={!canScrollLeft}
          aria-hidden="true"
          tabIndex={-1}
          className="pointer-events-auto inline-flex size-9 items-center justify-center rounded-sm border border-border-default text-text-secondary transition-colors hover:border-border-brand hover:text-text-primary disabled:opacity-30"
        >
          <ChevronRightIcon className="size-4 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          disabled={!canScrollRight}
          aria-hidden="true"
          tabIndex={-1}
          className="pointer-events-auto inline-flex size-9 items-center justify-center rounded-sm border border-border-default text-text-secondary transition-colors hover:border-border-brand hover:text-text-primary disabled:opacity-30"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>

      <p className="mt-2 text-xs text-text-muted md:hidden">{dict.widgets.swipeHint}</p>
    </section>
  );
}
