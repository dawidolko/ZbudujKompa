'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { upgradeValue } from '@/lib/calculators';
import { cpus, gpus } from '@/lib/parts';
import { CalculatorShell, ResultRow, ResultValue, SelectField } from '../CalculatorShell';

/**
 * Whether an upgrade is worth its price.
 *
 * The threshold matters more than the arithmetic: below roughly 15 per cent a
 * difference is rarely perceptible in use, so an upgrade under that is money
 * spent on a number rather than on an experience. Saying so plainly is more
 * useful than reporting a gain of any size as progress.
 */
export function UpgradeCalculator({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const [kind, setKind] = useState<'gpu' | 'cpu'>('gpu');
  const [fromId, setFromId] = useState('rtx-5060');
  const [toId, setToId] = useState('rtx-5070-ti');

  const pool = kind === 'gpu' ? gpus : cpus;

  const result = useMemo(() => {
    const from = pool.find((part) => part.id === fromId);
    const to = pool.find((part) => part.id === toId);
    if (!from || !to) return null;

    const score = (part: (typeof pool)[number]) =>
      part.category === 'gpu' ? part.performanceScore : part.gamingScore;

    /* The cost is the new part's midpoint, not the difference between them:
       what matters is what leaves your pocket, and the old part's value is
       recovered only if you actually sell it. */
    const cost = (to.price.min + to.price.max) / 2;

    return { from, to, cost, ...upgradeValue(score(from), score(to), cost) };
  }, [pool, fromId, toId]);

  if (!result) return null;

  return (
    <CalculatorShell
      inputs={
        <>
          <SelectField
            label={dict.calc.upgrade.what}
            value={kind}
            onChange={(value) => {
              setKind(value);
              /* Switching category invalidates both selections, so they are
                 reset to that category's first entries rather than left
                 pointing at parts that no longer exist in the pool. */
              const next = value === 'gpu' ? gpus : cpus;
              setFromId(next[0]!.id);
              setToId(next[Math.min(2, next.length - 1)]!.id);
            }}
            options={[
              { value: 'gpu', label: dict.configurator.category.gpu },
              { value: 'cpu', label: dict.configurator.category.cpu },
            ]}
          />
          <SelectField
            label={dict.calc.upgrade.from}
            value={fromId}
            onChange={setFromId}
            options={pool.map((part) => ({ value: part.id, label: `${part.brand} ${part.name}` }))}
          />
          <SelectField
            label={dict.calc.upgrade.to}
            value={toId}
            onChange={setToId}
            options={pool.map((part) => ({ value: part.id, label: `${part.brand} ${part.name}` }))}
          />
        </>
      }
      result={
        <>
          <ResultValue
            label={dict.calc.upgrade.gain}
            value={`${result.gainPercent > 0 ? '+' : ''}${Math.round(result.gainPercent)}%`}
          />
          <div className="mb-3">
            <Badge tone={result.worthwhile ? 'success' : 'warning'}>
              {result.worthwhile ? dict.calc.upgrade.worth : dict.calc.upgrade.notWorth}
            </Badge>
          </div>
          <ResultRow label={dict.calc.upgrade.cost} value={`~${Math.round(result.cost)} zł`} />
          <ResultRow
            label={dict.calc.upgrade.perHundred}
            value={`${result.pointsPerHundred.toFixed(2)} pkt`}
            emphasis
          />
        </>
      }
      explanation={dict.calc.upgrade.explanation}
    />
  );
}
