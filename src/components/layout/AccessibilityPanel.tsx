'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { CloseIcon } from '@/components/ui/Icon';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import {
  applyA11ySettings,
  defaultA11ySettings,
  FONT_STEPS,
  readA11ySettings,
  type A11ySettings,
  type VisualFilter,
} from '@/lib/accessibility';
import { cn } from '@/lib/utils';

/**
 * Accessibility preferences panel.
 *
 * Docked to the left edge, deliberately opposite the chat launcher so the two
 * never overlap on a narrow screen.
 *
 * The panel itself has to be usable by the people it serves, which drives most
 * of what follows: it is a labelled dialog, focus moves into it on open and
 * back to the launcher on close, Escape dismisses it, and every control is a
 * real button or checkbox rather than a styled div. Each change is announced
 * so a screen reader user knows the setting took effect.
 */
export function AccessibilityPanel({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const panelId = useId();

  const [open, setOpen] = useState(false);
  /* Initialised lazily from storage rather than set in an effect. The
     initialiser runs during the first client render, so there is no second
     render pass and no flash of the default values — and the blocking head
     script has already applied them to the document by then anyway.

     The guard is required because the initialiser also runs during prerender,
     where there is no localStorage; returning the defaults there keeps the
     server and first client render in agreement. */
  const [settings, setSettings] = useState<A11ySettings>(() =>
    typeof window === 'undefined' ? defaultA11ySettings : readA11ySettings(),
  );
  const [announcement, setAnnouncement] = useState('');

  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const firstControlRef = useRef<HTMLButtonElement>(null);

  const update = useCallback((next: Partial<A11ySettings>, message: string) => {
    setSettings((current) => {
      const merged = { ...current, ...next };
      applyA11ySettings(merged);
      return merged;
    });
    setAnnouncement(message);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  useEffect(() => {
    if (open) firstControlRef.current?.focus();
  }, [open]);

  /* Escape closes; Tab cycles within the panel so focus cannot wander behind
     an open dialog. */
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.stopPropagation();
        close();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input, a[href]',
      );
      if (focusable.length === 0) return;

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, close]);

  const scale = FONT_STEPS[settings.fontStep] ?? 1;

  const filters: { value: VisualFilter; label: string }[] = [
    { value: 'grayscale', label: dict.a11yPanel.grayscale },
    { value: 'high-contrast', label: dict.a11yPanel.highContrast },
    { value: 'negative', label: dict.a11yPanel.negative },
    { value: 'light', label: dict.a11yPanel.lightBackground },
  ];

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={panelId}
        hidden={open}
        className={cn(
          'fixed bottom-4 left-4 z-50 inline-flex size-12 items-center justify-center',
          'rounded-full border border-border-default bg-surface-raised text-text-primary shadow-lg',
          'transition-transform hover:scale-105 focus-ring md:bottom-6 md:left-6',
        )}
      >
        <AccessibilityIcon className="size-6" />
        <span className="sr-only">{dict.a11yPanel.open}</span>
      </button>

      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="false"
        aria-label={dict.a11yPanel.title}
        hidden={!open}
        className={cn(
          'fixed bottom-0 left-0 z-50 flex max-h-[min(36rem,100dvh)] w-full flex-col overflow-y-auto',
          'border border-border-default bg-surface-raised shadow-lg',
          'md:bottom-6 md:left-6 md:w-80 md:rounded-lg',
        )}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-border-subtle bg-surface-raised px-4 py-3">
          <h2 className="font-display text-sm font-bold text-text-primary">
            {dict.a11yPanel.title}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label={dict.a11yPanel.close}
            className="inline-flex size-9 items-center justify-center rounded-sm text-text-secondary transition-colors hover:bg-bg-muted hover:text-text-primary focus-ring"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        <div className="space-y-5 p-4">
          {/* ---- Text size ---- */}
          <section>
            <h3 className="mb-2 text-xs font-bold tracking-wide text-text-muted uppercase">
              {dict.a11yPanel.textSize}
            </h3>
            <div className="flex items-center gap-2">
              <button
                ref={firstControlRef}
                type="button"
                onClick={() =>
                  update(
                    { fontStep: Math.max(0, settings.fontStep - 1) },
                    dict.a11yPanel.sizeAnnounce(
                      Math.round((FONT_STEPS[Math.max(0, settings.fontStep - 1)] ?? 1) * 100),
                    ),
                  )
                }
                disabled={settings.fontStep === 0}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-sm border border-border-default text-lg font-bold text-text-primary transition-colors hover:border-border-brand focus-ring disabled:opacity-40"
              >
                A<span className="text-xs">−</span>
                <span className="sr-only">{dict.a11yPanel.decrease}</span>
              </button>

              <output className="min-w-14 text-center text-sm font-semibold text-text-secondary">
                {Math.round(scale * 100)}%
              </output>

              <button
                type="button"
                onClick={() =>
                  update(
                    { fontStep: Math.min(FONT_STEPS.length - 1, settings.fontStep + 1) },
                    dict.a11yPanel.sizeAnnounce(
                      Math.round(
                        (FONT_STEPS[Math.min(FONT_STEPS.length - 1, settings.fontStep + 1)] ?? 1) *
                          100,
                      ),
                    ),
                  )
                }
                disabled={settings.fontStep === FONT_STEPS.length - 1}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-sm border border-border-default text-lg font-bold text-text-primary transition-colors hover:border-border-brand focus-ring disabled:opacity-40"
              >
                A<span className="text-xs">+</span>
                <span className="sr-only">{dict.a11yPanel.increase}</span>
              </button>
            </div>
          </section>

          {/* ---- Visual filters ----
              Rendered as toggle buttons rather than a radio group because
              pressing the active one turns it off, which a radio cannot do. */}
          <section>
            <h3 className="mb-2 text-xs font-bold tracking-wide text-text-muted uppercase">
              {dict.a11yPanel.contrast}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {filters.map((filter) => {
                const active = settings.filter === filter.value;
                return (
                  <button
                    key={filter.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      update(
                        { filter: active ? 'none' : filter.value },
                        active
                          ? dict.a11yPanel.filterOff(filter.label)
                          : dict.a11yPanel.filterOn(filter.label),
                      )
                    }
                    className={cn(
                      'inline-flex min-h-11 items-center justify-center rounded-sm border px-2 py-2 text-xs font-semibold transition-colors focus-ring',
                      active
                        ? 'border-border-brand bg-accent-subtle text-accent-fg'
                        : 'border-border-default text-text-secondary hover:text-text-primary',
                    )}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* ---- Reading aids ---- */}
          <section>
            <h3 className="mb-2 text-xs font-bold tracking-wide text-text-muted uppercase">
              {dict.a11yPanel.reading}
            </h3>
            <div className="space-y-2">
              <Toggle
                label={dict.a11yPanel.underlineLinks}
                checked={settings.underlineLinks}
                onChange={(value) =>
                  update(
                    { underlineLinks: value },
                    value
                      ? dict.a11yPanel.filterOn(dict.a11yPanel.underlineLinks)
                      : dict.a11yPanel.filterOff(dict.a11yPanel.underlineLinks),
                  )
                }
              />
              <Toggle
                label={dict.a11yPanel.readableFont}
                checked={settings.readableFont}
                onChange={(value) =>
                  update(
                    { readableFont: value },
                    value
                      ? dict.a11yPanel.filterOn(dict.a11yPanel.readableFont)
                      : dict.a11yPanel.filterOff(dict.a11yPanel.readableFont),
                  )
                }
              />
            </div>
          </section>

          <button
            type="button"
            onClick={() => {
              setSettings(defaultA11ySettings);
              applyA11ySettings(defaultA11ySettings);
              setAnnouncement(dict.a11yPanel.resetAnnounce);
            }}
            className="inline-flex h-11 w-full items-center justify-center rounded-sm border border-border-default text-sm font-semibold text-text-secondary transition-colors hover:border-border-brand hover:text-text-primary focus-ring"
          >
            {dict.a11yPanel.reset}
          </button>

          <p className="text-xs leading-relaxed text-text-muted">{dict.a11yPanel.note}</p>
        </div>
      </div>

      {/* Changes happen without focus moving, so each one is announced.
          The region lives outside the panel so it is still read when the panel
          is closed by a control inside it. */}
      <div role="status" aria-live="polite" className="sr-only">
        {announcement}
      </div>
    </>
  );
}

/** A labelled switch built on a real checkbox, so it is operable and announced. */
function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label
      className={cn(
        'flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-sm border px-3 py-2 text-sm transition-colors',
        'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--focus-ring)]',
        checked
          ? 'border-border-brand bg-accent-subtle text-accent-fg'
          : 'border-border-default text-text-secondary hover:text-text-primary',
      )}
    >
      <span className="font-medium">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          'relative h-5 w-9 shrink-0 rounded-full transition-colors',
          checked ? 'bg-accent' : 'bg-bg-muted',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 size-4 rounded-full bg-surface transition-all',
            checked ? 'left-[1.125rem]' : 'left-0.5',
          )}
        />
      </span>
    </label>
  );
}

/** The universal accessibility mark. */
function AccessibilityIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="12" cy="4" r="2" />
      <path d="M19 8.5a1 1 0 0 0-1.2-.98l-4.3.86a7.5 7.5 0 0 1-3 0l-4.3-.86A1 1 0 0 0 5 8.5a1 1 0 0 0 .8 1.18L9.5 10.4v2.3l-1.9 6.1a1 1 0 0 0 1.9.6l1.6-5.1h1.8l1.6 5.1a1 1 0 0 0 1.9-.6l-1.9-6.1v-2.3l3.7-.72A1 1 0 0 0 19 8.5z" />
    </svg>
  );
}
