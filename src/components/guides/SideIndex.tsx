'use client';

import { useEffect, useId, useState } from 'react';
import { ChevronDownIcon } from '@/components/ui/Icon';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

/**
 * The side index of a document.
 *
 * It stays beside the text and marks the section being read. On a narrow screen
 * it folds into a single control above the text. The list is in the served HTML,
 * and folding only applies once scripts run, so it is never out of reach.
 */
export function SideIndex({
  headingId,
  items,
  numbered = false,
  locale,
  children,
}: {
  headingId: string;
  items: { id: string; title: string }[];
  numbered?: boolean;
  locale: Locale;
  children?: React.ReactNode;
}) {
  const dict = getDictionary(locale);
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((target): target is HTMLElement => target !== null);

    /* A band across the upper part of the screen: whichever section crosses it
       is the one being read. */
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-20% 0px -70% 0px' },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [items]);

  const List = numbered ? 'ol' : 'ul';

  return (
    <nav aria-labelledby={headingId} className="side-index">
      <h2 id={headingId} className="spec-label mb-2 hidden lg:block">
        {dict.nav.onThisPage}
      </h2>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-11 w-full items-center justify-between gap-3 border border-border-default bg-surface px-3 text-sm font-semibold text-text-primary focus-ring lg:hidden"
      >
        {dict.nav.onThisPage}
        <ChevronDownIcon className={cn('size-4 transition-transform', open && 'rotate-180')} />
      </button>

      <List
        id={listId}
        data-open={open}
        className="side-index-list mt-2 max-h-[calc(100dvh-14rem)] overflow-y-auto lg:mt-0"
      >
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              aria-current={active === item.id ? 'true' : undefined}
              className="flex gap-2 border-l-2 border-border-subtle py-1.5 pl-3 text-sm text-text-secondary transition-colors hover:border-border-brand hover:text-text-primary focus-ring-inset"
            >
              {numbered ? (
                <span className="spec-label w-5 shrink-0 pt-0.5" aria-hidden="true">
                  {index + 1}
                </span>
              ) : null}
              <span className="min-w-0">{item.title}</span>
            </a>
          </li>
        ))}
      </List>
      {children}
    </nav>
  );
}
