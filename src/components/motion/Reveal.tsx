'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Reveals its children as they scroll into view.
 *
 * Three properties make this safe rather than decorative-but-harmful:
 *
 *   1. The content is in the HTML and readable before any script runs. The
 *      animation only adds a class; it never gates rendering.
 *   2. `prefers-reduced-motion` is checked before observing at all, so a
 *      visitor who has asked for less motion gets the content shown outright
 *      rather than animated quickly.
 *   3. The observer disconnects after firing. A reveal that re-triggers every
 *      time an element re-enters the viewport turns scrolling back up into a
 *      flicker show.
 */
export function Reveal({
  children,
  className,
  /** Stagger index, 1–6. Later items in a grid animate slightly after earlier ones. */
  delay,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: 'div' | 'section' | 'li' | 'article';
}) {
  /* Typed as the base element because `as` may render a div, section, li or
     article, and the ref has to satisfy all of them. */
  const ref = useRef<HTMLElement>(null);
  const setRef = (node: HTMLElement | null) => {
    ref.current = node;
  };

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    /* Honour the motion preference before doing any work: show the content and
       stop, rather than running a fast animation nobody asked for. */
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          /* One-shot: once revealed, an element stays revealed. */
          observer.unobserve(entry.target);
        }
      },
      /* A negative bottom margin delays the trigger until the element is
         genuinely on screen rather than firing at the very edge. */
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={setRef} className={cn('reveal', delay && `reveal-delay-${delay}`, className)}>
      {children}
    </Tag>
  );
}
