'use client';

import { useDeferredValue, useId, useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { SearchIcon } from '@/components/ui/Icon';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { glossary } from '@/lib/knowledge';
import { t } from '@/lib/utils';

/**
 * Filterable glossary.
 *
 * The full list is rendered server-side and filtered here, so the terms are in
 * the HTML for search engines and for anyone without JavaScript — the filter
 * is an enhancement rather than the only way to reach the content.
 *
 * `useDeferredValue` keeps typing responsive: React renders the filtered list
 * at a lower priority, so the input never lags behind the keystrokes even as
 * the list re-renders.
 */
export function GlossarySearch({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const inputId = useId();

  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase();
    if (!needle) return glossary;

    return glossary.filter((entry) => {
      const term = entry.term.toLowerCase();
      const definition = t(entry.definition, locale).toLowerCase();
      return term.includes(needle) || definition.includes(needle);
    });
  }, [deferredQuery, locale]);

  return (
    <div>
      <div className="mb-6 max-w-md">
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-semibold text-text-primary">
          {dict.glossary.searchLabel}
        </label>
        <div className="relative">
          <SearchIcon
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-muted"
            aria-hidden="true"
          />
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dict.glossary.searchPlaceholder}
            className="h-11 w-full rounded-sm border border-border-default bg-bg-base pr-3 pl-9 text-sm text-text-primary placeholder:text-text-muted focus-ring"
          />
        </div>
      </div>

      {/* The count is announced so a screen reader learns how the filter
          changed the list without having to walk through it. */}
      <p aria-live="polite" className="mb-4 text-sm text-text-muted">
        {dict.glossary.resultCount(results.length)}
      </p>

      {results.length === 0 ? (
        <p className="text-sm text-text-secondary">{dict.glossary.noResults}</p>
      ) : (
        <dl className="grid gap-4 md:grid-cols-2">
          {results.map((entry) => (
            <div
              key={entry.slug}
              id={entry.slug}
              className="scroll-mt-24 rounded-lg border border-border-subtle bg-surface p-5"
            >
              <dt className="mb-2 flex flex-wrap items-center gap-2">
                <span className="font-display text-lg font-bold text-text-primary">
                  {entry.term}
                </span>
                <Badge tone="neutral">{dict.guides.category[entry.category]}</Badge>
              </dt>
              <dd className="text-sm leading-relaxed text-text-secondary">
                {t(entry.definition, locale)}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
