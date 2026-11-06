'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/i18n';
import { locales, localeNames, switchLocaleInPath, type Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

/**
 * Language switcher.
 *
 * Renders real links rather than a scripted control, so the alternate language
 * is crawlable and works without JavaScript. Each link points at the same page
 * in the other locale by swapping only the locale segment of the path.
 */
export function LanguageSwitcher({ locale, className }: { locale: Locale; className?: string }) {
  const dict = getDictionary(locale);
  const pathname = usePathname();

  return (
    <div className={cn('flex items-stretch', className)}>
      <span className="sr-only" id="language-switcher-label">
        {dict.language.label}
      </span>
      <ul className="flex items-stretch" aria-labelledby="language-switcher-label">
        {locales.map((code) => {
          const isActive = code === locale;
          return (
            <li key={code} className="flex">
              <Link
                href={switchLocaleInPath(pathname, code)}
                hrefLang={code}
                aria-current={isActive ? 'true' : undefined}
                aria-label={
                  isActive
                    ? undefined
                    : `${code.toUpperCase()}: ${dict.language.switchTo(localeNames[code])}`
                }
                className={cn(
                  'flex items-center px-3 font-mono text-xs font-semibold uppercase transition-colors focus-ring-inset',
                  isActive
                    ? 'bg-accent text-text-on-brand'
                    : 'text-text-secondary hover:bg-bg-muted hover:text-text-primary',
                )}
              >
                {code}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
