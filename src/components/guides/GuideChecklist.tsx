'use client';

import { useCallback, useState } from 'react';
import { DownloadIcon } from '@/components/ui/Icon';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { site } from '@/lib/site';
import type { Guide } from '@/lib/types';
import { t } from '@/lib/utils';

/**
 * Offers the guide as a downloadable plain-text checklist.
 *
 * The file is built in the browser from data already on the page and handed
 * over as a blob, so there is nothing to fetch and no server involved — which
 * is the only option on a static host anyway.
 *
 * The object URL is revoked after the click. Without that, every download
 * would leak a blob that lives until the tab closes.
 */
export function GuideChecklist({ guide, locale }: { guide: Guide; locale: Locale }) {
  const dict = getDictionary(locale);
  const [busy, setBusy] = useState(false);

  const download = useCallback(() => {
    setBusy(true);

    const lines: string[] = [
      t(guide.title, locale).toUpperCase(),
      '='.repeat(t(guide.title, locale).length),
      '',
      t(guide.summary, locale),
      '',
    ];

    guide.steps.forEach((step, index) => {
      lines.push(`[ ] ${index + 1}. ${t(step.title, locale)}`);
      t(step.body, locale).forEach((paragraph) => {
        lines.push(`       ${paragraph}`);
      });
      if (step.warning) {
        lines.push(`       ! ${dict.guides.warning.toUpperCase()}: ${t(step.warning, locale)}`);
      }
      lines.push('');
    });

    lines.push('---', `${site.name} — ${site.url}`);

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${guide.slug}-${locale}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);
    setBusy(false);
  }, [dict.guides.warning, guide, locale]);

  return (
    <div>
      <button
        type="button"
        onClick={download}
        disabled={busy}
        className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-sm border border-border-default px-4 text-xs font-semibold tracking-wide text-text-primary uppercase transition-colors hover:border-border-brand hover:text-text-brand focus-ring disabled:opacity-50"
      >
        <DownloadIcon className="size-4" aria-hidden="true" />
        {dict.guides.downloadChecklist}
      </button>
      <p className="mt-2 text-xs leading-snug text-text-muted">
        {dict.guides.downloadChecklistHint}
      </p>
    </div>
  );
}
