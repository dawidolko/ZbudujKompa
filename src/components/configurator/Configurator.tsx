'use client';

import { useCallback, useMemo, useState } from 'react';
import { AlertIcon, CheckIcon, InfoIcon } from '@/components/ui/Icon';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { categoryOrder, checkCompatibility, formatPriceRange, selectionPrice } from '@/lib/parts';
import type { BuildSelection, PartCategory } from '@/lib/parts';
import { cn } from '@/lib/utils';
import { PartPicker } from './PartPicker';

/**
 * Build configurator.
 *
 * Every check re-runs on each change rather than behind a submit button, so a
 * conflict surfaces the moment it is created — at the point the reader can still
 * see which choice caused it. Waiting for a submit would report the same problem
 * several decisions later, when the cause is no longer obvious.
 *
 * Results are announced through an aria-live region: the verdict changes without
 * any focus movement, which would otherwise leave a screen-reader user unaware
 * that anything happened.
 */
export function Configurator({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [selection, setSelection] = useState<BuildSelection>({});

  const select = useCallback((category: PartCategory, id: string | undefined) => {
    setSelection((current) => {
      const next = { ...current };
      if (id) next[category] = id;
      else delete next[category];
      return next;
    });
  }, []);

  const report = useMemo(() => checkCompatibility(selection), [selection]);
  const price = useMemo(() => selectionPrice(selection), [selection]);
  const chosenCount = Object.keys(selection).length;

  /* Categories touched by a hard error, so the offending pickers can flag
     themselves rather than leaving the reader to match a message to a control. */
  const conflicting = useMemo(() => {
    const set = new Set<string>();
    for (const issue of report.issues) {
      if (issue.level === 'error') issue.categories.forEach((category) => set.add(category));
    }
    return set;
  }, [report]);

  const errors = report.issues.filter((issue) => issue.level === 'error');
  const warnings = report.issues.filter((issue) => issue.level === 'warning');
  const passes = report.issues.filter((issue) => issue.level === 'ok');

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
      {/* ---- Pickers ---- */}
      <div className="grid gap-3">
        {categoryOrder.map((category) => (
          <PartPicker
            key={category}
            category={category}
            locale={locale}
            selected={selection[category]}
            onSelect={(id) => select(category, id)}
            conflicting={conflicting.has(category)}
          />
        ))}

        {chosenCount > 0 ? (
          <button
            type="button"
            onClick={() => setSelection({})}
            className="justify-self-start rounded-sm border border-border-default px-4 py-2 text-sm font-semibold text-text-secondary transition-colors hover:border-border-brand hover:text-text-primary focus-ring"
          >
            {dict.configurator.reset}
          </button>
        ) : null}
      </div>

      {/* ---- Summary, sticky beside the pickers on wide screens ---- */}
      <aside className="lg:sticky lg:top-24">
        <div className="rounded-lg border border-border-subtle bg-bg-subtle p-5">
          <h3 className="font-display text-sm font-bold tracking-wide text-text-primary uppercase">
            {dict.configurator.summary}
          </h3>

          <div aria-live="polite">
            {chosenCount === 0 ? (
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {dict.configurator.empty}
              </p>
            ) : (
              <>
                <dl className="mt-4 space-y-3 border-b border-border-subtle pb-4">
                  <div>
                    <dt className="text-xs tracking-wide text-text-muted uppercase">
                      {dict.configurator.estimatedPrice}
                    </dt>
                    <dd className="font-display mt-0.5 text-xl font-bold text-text-primary">
                      {formatPriceRange(price, locale)}
                    </dd>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <dt className="text-xs tracking-wide text-text-muted uppercase">
                        {dict.configurator.powerDraw}
                      </dt>
                      <dd className="mt-0.5 font-semibold text-text-primary">
                        {report.power.estimated} W
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs tracking-wide text-text-muted uppercase">
                        {dict.configurator.suggestedPsu}
                      </dt>
                      <dd className="mt-0.5 font-semibold text-accent-fg">
                        {report.power.recommended} W
                      </dd>
                    </div>
                  </div>
                </dl>

                <p
                  className={cn(
                    'mt-4 flex items-center gap-2 text-sm font-bold',
                    report.buildable ? 'text-success' : 'text-danger',
                  )}
                >
                  {report.buildable ? (
                    <CheckIcon className="size-5 shrink-0" aria-hidden="true" />
                  ) : (
                    <AlertIcon className="size-5 shrink-0" aria-hidden="true" />
                  )}
                  {report.buildable ? dict.configurator.compatible : dict.configurator.incompatible}
                </p>

                {errors.length > 0 ? (
                  <IssueList issues={errors} level="error" locale={locale} />
                ) : null}
                {warnings.length > 0 ? (
                  <IssueList issues={warnings} level="warning" locale={locale} />
                ) : null}
                {passes.length > 0 ? (
                  <IssueList issues={passes} level="ok" locale={locale} />
                ) : null}
              </>
            )}
          </div>

          <p className="mt-5 border-t border-border-subtle pt-4 text-xs leading-relaxed text-text-muted">
            {dict.configurator.priceNote}
          </p>
        </div>
      </aside>
    </div>
  );
}

/**
 * A group of findings at one severity.
 *
 * Each carries an icon and sits under a text heading naming the severity, so
 * the level is never conveyed by colour alone (WCAG 1.4.1).
 */
function IssueList({
  issues,
  level,
  locale,
}: {
  issues: { level: string; message: { pl: string; en: string } }[];
  level: 'error' | 'warning' | 'ok';
  locale: Locale;
}) {
  const dict = getDictionary(locale);

  const heading = {
    error: dict.configurator.problems,
    warning: dict.configurator.worthKnowing,
    ok: dict.configurator.checksPassed,
  }[level];

  const Icon = level === 'ok' ? CheckIcon : level === 'warning' ? InfoIcon : AlertIcon;
  const tone =
    level === 'ok' ? 'text-success' : level === 'warning' ? 'text-warning' : 'text-danger';

  return (
    <section className="mt-4">
      <h4 className="mb-2 text-xs font-bold tracking-wide text-text-muted uppercase">{heading}</h4>
      <ul className="space-y-2">
        {issues.map((issue, index) => (
          <li key={index} className="flex gap-2 text-xs leading-relaxed">
            <Icon className={cn('mt-0.5 size-3.5 shrink-0', tone)} aria-hidden="true" />
            <span className="text-text-secondary">{issue.message[locale]}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
