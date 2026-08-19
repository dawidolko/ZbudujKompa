'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { estimateBottleneck } from '@/lib/calculators';
import { cpus, gpus } from '@/lib/parts';
import { CalculatorShell, ResultRow, ResultValue, SelectField } from '../CalculatorShell';

/**
 * Which component limits a pairing.
 *
 * Presented as a direction and a rough magnitude, never as a precise
 * percentage. Bottleneck percentages are the running joke of this category
 * because they imply a precision that does not exist: the answer depends on the
 * specific game, its settings and the scene. What is genuinely useful is the
 * direction — and the fact that it changes with resolution, which is why the
 * same pair can be CPU-limited at 1080p and balanced at 4K.
 */
export function BottleneckCalculator({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const [cpuId, setCpuId] = useState('ryzen-5-7600');
  const [gpuId, setGpuId] = useState('rtx-5080');
  const [resolution, setResolution] = useState<'1080p' | '1440p' | '4K'>('1080p');

  const result = useMemo(() => {
    const cpu = cpus.find((item) => item.id === cpuId);
    const gpu = gpus.find((item) => item.id === gpuId);
    if (!cpu || !gpu) return null;

    /* Every resolution is computed, so the reader can see the pairing shift
       rather than having to change the control to discover it. */
    return {
      cpu,
      gpu,
      current: estimateBottleneck(cpu.gamingScore, gpu.performanceScore, resolution),
      all: (['1080p', '1440p', '4K'] as const).map((res) => ({
        res,
        ...estimateBottleneck(cpu.gamingScore, gpu.performanceScore, res),
      })),
    };
  }, [cpuId, gpuId, resolution]);

  if (!result) return null;

  const label = {
    cpu: dict.calc.bottleneck.cpuLimited,
    gpu: dict.calc.bottleneck.gpuLimited,
    balanced: dict.calc.bottleneck.balanced,
  }[result.current.limitedBy];

  const tone =
    result.current.limitedBy === 'balanced'
      ? ('success' as const)
      : result.current.severity > 30
        ? ('warning' as const)
        : ('neutral' as const);

  return (
    <CalculatorShell
      inputs={
        <>
          <SelectField
            label={dict.configurator.category.cpu}
            value={cpuId}
            onChange={setCpuId}
            options={cpus.map((cpu) => ({ value: cpu.id, label: `${cpu.brand} ${cpu.name}` }))}
          />
          <SelectField
            label={dict.configurator.category.gpu}
            value={gpuId}
            onChange={setGpuId}
            options={gpus.map((gpu) => ({ value: gpu.id, label: `${gpu.brand} ${gpu.name}` }))}
          />
          <SelectField
            label={dict.calc.bottleneck.resolution}
            value={resolution}
            onChange={setResolution}
            options={[
              { value: '1080p', label: '1080p' },
              { value: '1440p', label: '1440p' },
              { value: '4K', label: '4K' },
            ]}
          />
        </>
      }
      result={
        <>
          <ResultValue
            label={dict.calc.bottleneck.atResolution(resolution)}
            value={label}
            tone="plain"
          />
          <div className="mb-3">
            <Badge tone={tone}>
              {result.current.limitedBy === 'balanced'
                ? dict.calc.bottleneck.wellMatched
                : dict.calc.bottleneck.difference(result.current.severity)}
            </Badge>
          </div>

          {/* Every resolution at once, because the shift between them is the
              genuinely useful part of the answer. */}
          {result.all.map((entry) => (
            <ResultRow
              key={entry.res}
              label={entry.res}
              value={
                entry.limitedBy === 'balanced'
                  ? dict.calc.bottleneck.balanced
                  : `${entry.limitedBy === 'cpu' ? dict.calc.bottleneck.cpuShort : dict.calc.bottleneck.gpuShort} (${entry.severity}%)`
              }
              emphasis={entry.res === resolution}
            />
          ))}
        </>
      }
      explanation={dict.calc.bottleneck.explanation}
    />
  );
}
