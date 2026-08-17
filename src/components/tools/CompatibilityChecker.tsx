'use client';

import { useId, useMemo, useState } from 'react';
import { AlertIcon, CheckIcon } from '@/components/ui/Icon';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { coolingProfiles } from '@/lib/cooling';
import { sockets } from '@/lib/sockets';
import { cn, clamp, t } from '@/lib/utils';

/**
 * Compatibility checker.
 *
 * Answers the three questions that actually cause returns: does the memory
 * generation match the socket, is the cooler rated for the CPU, and does the
 * platform still have a future. It deliberately reports *why* something fails
 * rather than only that it does, because "incompatible" without a reason sends
 * the reader straight back to a forum.
 *
 * Results are announced through aria-live, and every result also carries an
 * icon plus a text label — never colour alone (WCAG 1.4.1).
 */
type Finding = {
  level: 'ok' | 'warning' | 'error';
  message: string;
};

export function CompatibilityChecker({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const fieldId = useId();

  const [socketSlug, setSocketSlug] = useState(sockets[0]!.slug);
  const [coolingSlug, setCoolingSlug] = useState(coolingProfiles[0]!.slug);
  const [memory, setMemory] = useState<'ddr4' | 'ddr5'>('ddr5');
  const [cpuWatts, setCpuWatts] = useState(120);

  const findings = useMemo<Finding[]>(() => {
    const socket = sockets.find((item) => item.slug === socketSlug);
    const cooling = coolingProfiles.find((item) => item.slug === coolingSlug);
    if (!socket || !cooling) return [];

    const results: Finding[] = [];

    /* --- Memory generation --- */
    if (socket.memory.includes(memory)) {
      results.push({
        level: 'ok',
        message:
          locale === 'pl'
            ? `Podstawka ${socket.name} obsługuje pamięć ${memory.toUpperCase()}.`
            : `Socket ${socket.name} supports ${memory.toUpperCase()} memory.`,
      });
    } else {
      results.push({
        level: 'error',
        message:
          locale === 'pl'
            ? `Podstawka ${socket.name} nie obsługuje pamięci ${memory.toUpperCase()} — przyjmuje wyłącznie ${socket.memory.map((m) => m.toUpperCase()).join(' lub ')}.`
            : `Socket ${socket.name} does not support ${memory.toUpperCase()} — it takes ${socket.memory.map((m) => m.toUpperCase()).join(' or ')} only.`,
      });
    }

    /* A board that offers both never offers both at once, and choosing the
       wrong revision is a mistake that cannot be undone without a new board. */
    if (socket.memory.length > 1) {
      results.push({
        level: 'warning',
        message:
          locale === 'pl'
            ? 'Ta podstawka występuje w wersjach DDR4 i DDR5, ale żadna płyta nie obsługuje obu naraz. Typ pamięci wybierasz przy zakupie płyty.'
            : 'This socket exists in DDR4 and DDR5 variants, but no board supports both at once. The memory type is fixed when you buy the board.',
      });
    }

    /* --- Cooling capacity --- */
    if (cooling.wattage.max >= cpuWatts + 15) {
      results.push({
        level: 'ok',
        message:
          locale === 'pl'
            ? `${t(cooling.name, locale)} odprowadza do ${cooling.wattage.max} W, co wystarcza dla procesora ${cpuWatts} W z zapasem.`
            : `${t(cooling.name, locale)} handles up to ${cooling.wattage.max} W, which covers a ${cpuWatts} W CPU with headroom.`,
      });
    } else if (cooling.wattage.max >= cpuWatts) {
      results.push({
        level: 'warning',
        message:
          locale === 'pl'
            ? `${t(cooling.name, locale)} zmieści się w ${cpuWatts} W, ale bez zapasu. Chłodzenie pracujące na granicy możliwości jest głośne.`
            : `${t(cooling.name, locale)} covers ${cpuWatts} W, but with no margin. A cooler running at its limit is a loud cooler.`,
      });
    } else {
      results.push({
        level: 'error',
        message:
          locale === 'pl'
            ? `${t(cooling.name, locale)} odprowadza maksymalnie ${cooling.wattage.max} W — za mało dla procesora ${cpuWatts} W. Procesor będzie obniżał taktowania.`
            : `${t(cooling.name, locale)} handles at most ${cooling.wattage.max} W — not enough for a ${cpuWatts} W CPU. The processor will throttle.`,
      });
    }

    /* --- Platform longevity --- */
    if (socket.status === 'legacy') {
      results.push({
        level: 'warning',
        message:
          locale === 'pl'
            ? `${socket.name} jest platformą wycofaną — nie powstają na nią nowe procesory. Sensowna tylko przy modernizacji istniejącego zestawu.`
            : `${socket.name} is a retired platform — no new CPUs are made for it. Only sensible when upgrading an existing system.`,
      });
    }

    /* --- Cooler mounting --- */
    results.push({
      level: 'ok',
      message:
        locale === 'pl'
          ? `Mocowanie chłodzenia: ${socket.coolerMount}. Sprawdź, czy zestaw montażowy chłodzenia obejmuje ten standard.`
          : `Cooler mounting: ${socket.coolerMount}. Check that the cooler's mounting kit covers this standard.`,
    });

    return results;
  }, [socketSlug, coolingSlug, memory, cpuWatts, locale]);

  const hasError = findings.some((finding) => finding.level === 'error');

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      {/* ---- Inputs ---- */}
      <div className="space-y-5 rounded-lg border border-border-subtle bg-surface p-5 md:p-6">
        <div>
          <label
            htmlFor={`${fieldId}-socket`}
            className="mb-1.5 block text-sm font-semibold text-text-primary"
          >
            {dict.tools.compatibility.selectSocket}
          </label>
          <select
            id={`${fieldId}-socket`}
            value={socketSlug}
            onChange={(event) => setSocketSlug(event.target.value)}
            className="h-11 w-full rounded-sm border border-border-default bg-bg-base px-3 text-sm text-text-primary focus-ring"
          >
            {sockets.map((socket) => (
              <option key={socket.slug} value={socket.slug}>
                {socket.name} ({socket.vendor === 'amd' ? 'AMD' : 'Intel'})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={`${fieldId}-cooling`}
            className="mb-1.5 block text-sm font-semibold text-text-primary"
          >
            {dict.tools.compatibility.selectCooling}
          </label>
          <select
            id={`${fieldId}-cooling`}
            value={coolingSlug}
            onChange={(event) => setCoolingSlug(event.target.value)}
            className="h-11 w-full rounded-sm border border-border-default bg-bg-base px-3 text-sm text-text-primary focus-ring"
          >
            {coolingProfiles.map((profile) => (
              <option key={profile.slug} value={profile.slug}>
                {t(profile.name, locale)}
              </option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className="mb-1.5 text-sm font-semibold text-text-primary">
            {dict.tools.compatibility.selectMemory}
          </legend>
          <div className="flex gap-2">
            {(['ddr4', 'ddr5'] as const).map((option) => (
              <label
                key={option}
                className={cn(
                  'inline-flex h-11 flex-1 cursor-pointer items-center justify-center rounded-sm border text-sm font-semibold transition-colors',
                  'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--focus-ring)]',
                  memory === option
                    ? 'border-border-brand bg-accent-subtle text-accent-fg'
                    : 'border-border-default text-text-secondary hover:text-text-primary',
                )}
              >
                <input
                  type="radio"
                  name={`${fieldId}-memory`}
                  value={option}
                  checked={memory === option}
                  onChange={() => setMemory(option)}
                  className="sr-only"
                />
                {option.toUpperCase()}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label
            htmlFor={`${fieldId}-watts`}
            className="mb-1.5 block text-sm font-semibold text-text-primary"
          >
            {dict.tools.compatibility.cpuWattage}
          </label>
          <div className="flex items-center gap-3">
            <input
              id={`${fieldId}-watts`}
              type="range"
              min={35}
              max={350}
              step={5}
              value={cpuWatts}
              onChange={(event) => setCpuWatts(Number(event.target.value))}
              className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-bg-muted accent-[var(--accent)] focus-ring"
            />
            <input
              type="number"
              min={35}
              max={350}
              value={cpuWatts}
              onChange={(event) => setCpuWatts(clamp(Number(event.target.value) || 35, 35, 350))}
              aria-label={dict.tools.compatibility.cpuWattage}
              className="h-10 w-20 rounded-sm border border-border-default bg-bg-base px-2 text-right text-sm text-text-primary focus-ring"
            />
          </div>
        </div>
      </div>

      {/* ---- Result ---- */}
      <div className="rounded-lg border border-border-subtle bg-bg-subtle p-5 md:p-6">
        <h3 className="font-display mb-4 text-sm font-bold tracking-wide text-text-primary uppercase">
          {dict.tools.compatibility.resultTitle}
        </h3>

        <div aria-live="polite">
          <p
            className={cn(
              'mb-4 flex items-center gap-2 text-sm font-bold',
              hasError ? 'text-danger' : 'text-success',
            )}
          >
            {hasError ? (
              <AlertIcon className="size-5 shrink-0" aria-hidden="true" />
            ) : (
              <CheckIcon className="size-5 shrink-0" aria-hidden="true" />
            )}
            {hasError ? dict.tools.compatibility.incompatible : dict.tools.compatibility.compatible}
          </p>

          <ul className="space-y-3">
            {findings.map((finding, index) => (
              <li key={index} className="flex gap-2 text-sm leading-relaxed">
                {finding.level === 'ok' ? (
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                ) : (
                  <AlertIcon
                    className={cn(
                      'mt-0.5 size-4 shrink-0',
                      finding.level === 'error' ? 'text-danger' : 'text-warning',
                    )}
                    aria-hidden="true"
                  />
                )}
                <span className="text-text-secondary">{finding.message}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
