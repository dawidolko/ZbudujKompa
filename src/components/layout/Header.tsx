'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Logo } from '@/components/brand/Logo';
import { ChevronDownIcon, CloseIcon, MenuIcon } from '@/components/ui/Icon';
import { getDictionary } from '@/i18n';
import { localePath, type Locale } from '@/i18n/config';
import { navigation } from '@/lib/navigation';
import { cn, t } from '@/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

/**
 * Site header with a disclosure-based mega menu.
 *
 * Keyboard and screen-reader behaviour, which is most of the work here:
 *   - Each top-level item is a button with aria-expanded and aria-controls,
 *     so the relationship between trigger and panel is programmatic rather
 *     than only visual.
 *   - Escape closes the open panel and returns focus to its trigger, so focus
 *     never lands somewhere the user cannot see.
 *   - A pointerdown listener outside the header closes the panel, but it is
 *     deliberately not a focusout handler: closing on focusout would fight
 *     with the links inside the panel.
 *   - The mobile panel sets aria-modal and traps nothing — it is a disclosure,
 *     not a dialog, so the page behind it stays reachable by scroll.
 */
export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const pathname = usePathname();
  const headerId = useId();

  const [menuState, setMenuState] = useState<{
    section: string | null;
    mobile: boolean;
    /* The pathname the state belongs to. Comparing it against the current
       pathname is what closes the menus on navigation. */
    path: string;
  }>({ section: null, mobile: false, path: pathname });

  const headerRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());

  /* Any navigation closes the menus, otherwise the panel would stay open over
     the page the visitor just moved to.

     This is derived during render rather than reset inside an effect: an
     effect would render the stale open panel first and only then close it,
     producing a visible flicker and an extra render pass. Comparing the stored
     pathname is the documented way to adjust state when a prop changes. */
  const stale = menuState.path !== pathname;
  const openSection = stale ? null : menuState.section;
  const mobileOpen = stale ? false : menuState.mobile;

  const closeAll = useCallback(() => {
    setMenuState({ section: null, mobile: false, path: pathname });
  }, [pathname]);

  const setOpenSection = useCallback(
    (section: string | null) => {
      setMenuState({ section, mobile: false, path: pathname });
    },
    [pathname],
  );

  const setMobileOpen = useCallback(
    (open: boolean) => {
      setMenuState({ section: null, mobile: open, path: pathname });
    },
    [pathname],
  );

  /* Escape closes the open panel and hands focus back to the trigger that
     opened it — otherwise focus would be left on a hidden element. */
  useEffect(() => {
    if (!openSection && !mobileOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      if (openSection) {
        triggerRefs.current.get(openSection)?.focus();
      }
      closeAll();
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [openSection, mobileOpen, closeAll]);

  /* A click anywhere outside the header dismisses the panel. */
  useEffect(() => {
    if (!openSection) return;

    function onPointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenSection(null);
      }
    }

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [openSection, setOpenSection]);

  const isCurrent = (href: string) => pathname.startsWith(localePath(locale, href).slice(0, -1));

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b-2 border-border-strong bg-bg-base"
    >
      {/* A strip of ruled cells, flush to both edges, like the head of a drawing. */}
      <div className="flex h-14 items-stretch">
        <Link
          href={localePath(locale)}
          className="mask flex shrink-0 items-center px-4 focus-ring-inset"
          aria-label={`ZbudujKompa — ${dict.nav.home}`}
        >
          <Logo />
        </Link>

        {/* ---- Desktop navigation ---- */}
        <nav aria-label={dict.nav.mainNavigation} className="hidden min-w-0 flex-1 lg:block">
          <ul className="flex h-full items-stretch">
            {navigation.map((section) => {
              const panelId = `${headerId}-${section.id}`;
              const expanded = openSection === section.id;
              const current = isCurrent(section.href);

              return (
                <li
                  key={section.id}
                  className="flex border-r border-border-subtle"
                  /* Hover opens the panel, which is what a pointer user
                     expects from a menu bar. It is only an enhancement: the
                     link works on click and the button works on keyboard, so
                     nothing here depends on hovering. */
                  onMouseEnter={() => setOpenSection(section.id)}
                  onMouseLeave={() => setOpenSection(null)}
                >
                  <div
                    className={cn(
                      'flex items-stretch transition-colors',
                      current
                        ? 'text-text-primary shadow-[inset_0_-3px_0_var(--accent-fg)]'
                        : 'text-text-secondary hover:bg-bg-muted hover:text-text-primary',
                      expanded && 'bg-bg-muted text-text-primary',
                    )}
                  >
                    {/* The section label is a real link, so the overview page
                        is reachable in one click instead of only through the
                        panel — the top level was previously a dead end. */}
                    <Link
                      href={localePath(locale, section.href)}
                      aria-current={current ? 'page' : undefined}
                      className="inline-flex items-center pr-0.5 pl-3.5 text-sm font-semibold focus-ring-inset xl:pl-4"
                    >
                      {t(section.label, locale)}
                    </Link>

                    {/* Expanding is a separate control from navigating: one
                        button that did both could not be operated by keyboard
                        without choosing which action to sacrifice. */}
                    <button
                      type="button"
                      ref={(node) => {
                        if (node) triggerRefs.current.set(section.id, node);
                        else triggerRefs.current.delete(section.id);
                      }}
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      aria-label={`${t(section.label, locale)} — ${
                        expanded ? dict.nav.closeMenu : dict.nav.openMenu
                      }`}
                      onClick={() => setOpenSection(expanded ? null : section.id)}
                      className="inline-flex items-center pr-2.5 pl-0.5 focus-ring-inset"
                    >
                      <ChevronDownIcon
                        className={cn('size-4 transition-transform', expanded && 'rotate-180')}
                      />
                    </button>
                  </div>

                  <div
                    id={panelId}
                    /* `hidden` rather than a CSS-only hide: it keeps the links
                       out of the tab order and out of the accessibility tree
                       while the panel is closed. */
                    hidden={!expanded}
                    className={cn(
                      /* A full sheet under the strip, anchored to the header
                         rather than to its item. It sits flush against the strip:
                         a gap would drop the hover as the pointer crossed it. */
                      'absolute inset-x-0 top-full border-y-2 border-border-strong bg-surface-raised shadow-lg',
                      'max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain',
                    )}
                  >
                    <ul className="container-page grid gap-x-8 py-4 lg:grid-cols-3">
                      {section.children?.map((link) => (
                        <li key={link.href} className="border-b border-border-subtle">
                          <Link
                            href={localePath(locale, link.href)}
                            className="block py-2.5 transition-colors hover:bg-bg-muted focus-ring-inset"
                          >
                            <span className="block text-sm font-bold text-text-primary">
                              {t(link.label, locale)}
                            </span>
                            {link.description ? (
                              <span className="mt-0.5 block text-xs text-text-muted">
                                {t(link.description, locale)}
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-stretch border-l border-border-subtle">
          <LanguageSwitcher locale={locale} />
          <ThemeToggle locale={locale} className="border-l border-border-subtle" />

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls={`${headerId}-mobile`}
            aria-label={mobileOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex w-12 items-center justify-center border-l border-border-subtle text-text-secondary transition-colors hover:bg-bg-muted hover:text-text-primary focus-ring-inset lg:hidden"
          >
            {mobileOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      {/* ---- Mobile navigation ---- */}
      <div
        id={`${headerId}-mobile`}
        hidden={!mobileOpen}
        className="max-h-[calc(100dvh-3.75rem)] overflow-y-auto border-t border-border-strong bg-bg-base lg:hidden"
      >
        <nav aria-label={dict.nav.mainNavigation} className="container-page py-4">
          <ul className="flex flex-col gap-5">
            {navigation.map((section) => (
              <li key={section.id}>
                <p className="spec-label mb-1.5">{t(section.label, locale)}</p>
                <ul className="flex flex-col border-l-2 border-border-default">
                  {section.children?.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={localePath(locale, link.href)}
                        className="block py-2.5 pl-3 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary focus-ring"
                      >
                        {t(link.label, locale)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
