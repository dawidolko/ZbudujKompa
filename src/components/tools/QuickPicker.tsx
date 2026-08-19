'use client';

import { useId, useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { ArrowRightIcon, CheckIcon } from '@/components/ui/Icon';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { localePath } from '@/i18n/config';
import { cpus, gpus, coolers, formatPriceRange } from '@/lib/parts';
import { cn, t } from '@/lib/utils';
import Link from 'next/link';

/**
 * A short questionnaire that recommends a starting point.
 *
 * Three questions rather than a full configurator, because someone who does not
 * yet know what they want cannot answer eight. It produces a suggestion and a
 * route into the detailed tools, not a finished build — the aim is to get an
 * undecided reader unstuck rather than to replace the configurator.
 */

type UseCase = 'gaming-1080p' | 'gaming-1440p' | 'gaming-4k' | 'work' | 'office';
type Budget = 'low' | 'medium' | 'high';
type Priority = 'quiet' | 'performance' | 'small';

export function QuickPicker({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const groupId = useId();

  const [useCase, setUseCase] = useState<UseCase>('gaming-1440p');
  const [budget, setBudget] = useState<Budget>('medium');
  const [priority, setPriority] = useState<Priority>('performance');

  const suggestion = useMemo(() => suggest(useCase, budget, priority), [useCase, budget, priority]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
      <div className="space-y-5 rounded-lg border border-border-subtle bg-surface p-5 md:p-6">
        <ChoiceGroup
          name={`${groupId}-use`}
          legend={dict.quickPicker.useCase}
          value={useCase}
          onChange={(value) => setUseCase(value as UseCase)}
          options={[
            { value: 'gaming-1080p', label: dict.quickPicker.gaming1080 },
            { value: 'gaming-1440p', label: dict.quickPicker.gaming1440 },
            { value: 'gaming-4k', label: dict.quickPicker.gaming4k },
            { value: 'work', label: dict.quickPicker.work },
            { value: 'office', label: dict.quickPicker.office },
          ]}
        />

        <ChoiceGroup
          name={`${groupId}-budget`}
          legend={dict.quickPicker.budget}
          value={budget}
          onChange={(value) => setBudget(value as Budget)}
          options={[
            { value: 'low', label: dict.quickPicker.budgetLow },
            { value: 'medium', label: dict.quickPicker.budgetMedium },
            { value: 'high', label: dict.quickPicker.budgetHigh },
          ]}
        />

        <ChoiceGroup
          name={`${groupId}-priority`}
          legend={dict.quickPicker.priority}
          value={priority}
          onChange={(value) => setPriority(value as Priority)}
          options={[
            { value: 'performance', label: dict.quickPicker.priorityPerformance },
            { value: 'quiet', label: dict.quickPicker.priorityQuiet },
            { value: 'small', label: dict.quickPicker.prioritySmall },
          ]}
        />
      </div>

      <aside className="rounded-lg border border-border-subtle bg-bg-subtle p-5 lg:sticky lg:top-24">
        <h3 className="font-display text-sm font-bold tracking-wide text-text-primary uppercase">
          {dict.quickPicker.suggestion}
        </h3>

        {/* Announced, because the suggestion changes with no focus movement. */}
        <div aria-live="polite" className="mt-4 space-y-4">
          <p className="text-sm leading-relaxed text-text-secondary">
            {t(suggestion.reasoning, locale)}
          </p>

          <ul className="space-y-2 border-t border-border-subtle pt-4">
            {suggestion.parts.map((part) => (
              <li key={part.id} className="flex items-start gap-2">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-text-primary">
                    {part.brand} {part.name}
                  </span>
                  <span className="text-xs text-text-muted">
                    {formatPriceRange(part.price, locale)}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <p className="flex flex-wrap gap-2 border-t border-border-subtle pt-4">
            <Badge tone="brand">{dict.quickPicker.total}</Badge>
            <span className="font-display font-bold text-text-primary">
              {formatPriceRange(
                suggestion.parts.reduce(
                  (total, part) => ({
                    min: total.min + part.price.min,
                    max: total.max + part.price.max,
                  }),
                  { min: 0, max: 0 },
                ),
                locale,
              )}
            </span>
          </p>
        </div>

        <Link
          href={localePath(locale, '/konfigurator')}
          className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-sm bg-accent px-4 text-sm font-semibold tracking-wide text-text-on-brand uppercase transition-colors hover:bg-accent-hover focus-ring"
        >
          {dict.quickPicker.openConfigurator}
          <ArrowRightIcon className="size-4" aria-hidden="true" />
        </Link>
      </aside>
    </div>
  );
}

/**
 * A radio group rendered as chips.
 *
 * Real radio inputs under the styling, so arrow-key navigation and screen
 * reader announcements work without being reimplemented.
 */
function ChoiceGroup({
  name,
  legend,
  value,
  onChange,
  options,
}: {
  name: string;
  legend: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-text-primary">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <label
              key={option.value}
              className={cn(
                'inline-flex cursor-pointer items-center rounded-sm border px-3 py-2 text-sm font-medium transition-colors',
                'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--focus-ring)]',
                active
                  ? 'border-border-brand bg-accent-subtle text-accent-fg'
                  : 'border-border-default text-text-secondary hover:text-text-primary',
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={active}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/**
 * Maps the three answers onto a starting configuration.
 *
 * Rules rather than a scoring model, because the reasoning has to be
 * explainable — a reader deserves to know why they were shown this, and a
 * weighted score cannot tell them.
 */
function suggest(useCase: UseCase, budget: Budget, priority: Priority) {
  const gpuByUse: Record<UseCase, string> = {
    'gaming-1080p': budget === 'low' ? 'rx-7600' : 'rtx-5060-ti',
    'gaming-1440p':
      budget === 'low' ? 'rx-9060-xt' : budget === 'high' ? 'rtx-5080' : 'rtx-5070-ti',
    'gaming-4k': budget === 'high' ? 'rtx-5090' : 'rtx-5080',
    work: budget === 'high' ? 'rtx-5080' : 'rtx-5070',
    office: '',
  };

  const cpuByUse: Record<UseCase, string> = {
    'gaming-1080p': budget === 'low' ? 'ryzen-5-5600' : 'ryzen-5-7600',
    'gaming-1440p': 'ryzen-7-7800x3d',
    'gaming-4k': 'ryzen-7-7800x3d',
    work: budget === 'high' ? 'ryzen-9-9950x' : 'core-ultra-7-265k',
    office: 'ryzen-7-8700g',
  };

  /* Cooler selection, in strict order of precedence.
  
     A small case comes first and overrides everything else: it is a physical
     constraint, not a preference. A 155 mm tower in an 11-litre case does not
     fit, so no other consideration can outrank it. Only then does the quiet
     preference apply, and only then the low-power office default. */
  let coolerId: string;
  if (priority === 'small') {
    coolerId = 'nh-l12s';
  } else if (priority === 'quiet') {
    coolerId = 'liquid-freezer-iii-360';
  } else if (useCase === 'office') {
    coolerId = 'assassin-x-120';
  } else {
    coolerId = 'peerless-assassin-120';
  }

  const cpu = cpus.find((item) => item.id === cpuByUse[useCase]);
  const gpu = gpus.find((item) => item.id === gpuByUse[useCase]);
  const cooler = coolers.find((item) => item.id === coolerId);

  /* An office build has no discrete card, so `gpu` is deliberately undefined
     there and filtered out rather than substituted with something unwanted. */
  const parts = [cpu, gpu, cooler].filter(Boolean) as {
    id: string;
    brand: string;
    name: string;
    price: { min: number; max: number };
  }[];

  return { parts, reasoning: buildReasoning(useCase, budget, priority) };
}

function buildReasoning(useCase: UseCase, budget: Budget, priority: Priority) {
  const useCaseText = {
    'gaming-1080p': {
      pl: 'Do 1080p wąskim gardłem jest zwykle procesor, więc karta średniej klasy w zupełności wystarczy.',
      en: 'At 1080p the processor is usually the bottleneck, so a mid-range card is entirely enough.',
    },
    'gaming-1440p': {
      pl: 'W 1440p karta graficzna decyduje o liczbie klatek najbardziej, a procesor z 3D V-Cache daje przewagę w grach.',
      en: 'At 1440p the graphics card determines frame rate most, and a 3D V-Cache processor leads in games.',
    },
    'gaming-4k': {
      pl: 'W 4K wszystko zależy od karty graficznej — procesor przestaje mieć większe znaczenie.',
      en: 'At 4K everything rests on the graphics card — the processor largely stops mattering.',
    },
    work: {
      pl: 'Do renderowania i kompilacji liczy się liczba rdzeni, a nie wydajność w grach.',
      en: 'For rendering and compiling, core count matters rather than gaming performance.',
    },
    office: {
      pl: 'Do pracy biurowej grafika zintegrowana wystarczy — osobna karta byłaby wydatkiem bez pokrycia.',
      en: 'For office work integrated graphics are enough — a discrete card would be spending with nothing to show.',
    },
  }[useCase];

  const priorityText = {
    quiet: {
      pl: ' Pod kątem ciszy dobrane jest chłodzenie z dużym zapasem, które nigdy nie musi się rozkręcić.',
      en: ' For quiet running the cooler is sized with generous headroom, so it never has to spin up.',
    },
    small: {
      pl: ' Pod małą obudowę dobrane jest chłodzenie niskoprofilowe — wieża się tam nie zmieści.',
      en: ' For a small case the cooler is low-profile — a tower will not fit there.',
    },
    performance: { pl: '', en: '' },
  }[priority];

  const budgetText = {
    low: {
      pl: ' Przy ograniczonym budżecie warto skupić wydatki na karcie graficznej i nie ciąć zasilacza.',
      en: ' On a limited budget, concentrate spending on the graphics card and do not cut the power supply.',
    },
    medium: { pl: '', en: '' },
    high: { pl: '', en: '' },
  }[budget];

  return {
    pl: useCaseText.pl + priorityText.pl + budgetText.pl,
    en: useCaseText.en + priorityText.en + budgetText.en,
  };
}
