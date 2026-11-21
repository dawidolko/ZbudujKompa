'use client';

import { useMemo, useState } from 'react';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import {
  buildPowerBreakdown,
  PART_POWER,
  PSU_EFFICIENCY,
  splitEnergyCost,
  TYPICAL_BUILD,
} from '@/lib/calculators';
import { cpus, gpus, psus } from '@/lib/parts';
import { chipsetClassOf, partLabel, type BuildParts } from '@/lib/parts/calculator-inputs';
import { electricityPrice } from '@/lib/energy-price';
import { clamp, formatPln } from '@/lib/utils';
import { LoadBuildButton, PartSelect, partOptions } from '../CataloguePicker';
import {
  CalculatorShell,
  NumberField,
  ResultRow,
  ResultValue,
  SelectField,
} from '../CalculatorShell';

/**
 * Running cost of a machine over a year.
 *
 * Idle and load are entered separately rather than as one average, because a
 * gaming machine idles for most of its life: costing every hour at peak draw
 * overstates the bill several times over, which is the flaw in most calculators
 * of this kind.
 *
 * The load can be filled from parts: the processor and card from the
 * catalogue, summed with the rest of the build exactly as the power supply
 * calculator itemises it. That is a full-load figure — games rarely hold every
 * part at its peak — so it stays editable. A catalogue power supply sets the
 * efficiency grade.
 */
export function EnergyCostCalculator({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const [idleWatts, setIdleWatts] = useState(60);
  const [loadWatts, setLoadWatts] = useState(400);
  const [loadHours, setLoadHours] = useState(3);
  const [idleHours, setIdleHours] = useState(5);
  const [price, setPrice] = useState(Math.round(electricityPrice.pricePerKwh * 100) / 100);
  const [grade, setGrade] = useState<keyof typeof PSU_EFFICIENCY>('Gold');
  const [cpuId, setCpuId] = useState('');
  const [gpuId, setGpuId] = useState('');
  const [psuId, setPsuId] = useState('');

  /* Recomputes the load from whichever of the processor and card are
     picked, with the rest of the build taken from the loaded build when
     there is one and from the typical build otherwise. */
  const fillLoad = (nextCpuId: string, nextGpuId: string, build: BuildParts = {}) => {
    const cpu = cpus.find((item) => item.id === nextCpuId);
    const gpu = gpus.find((item) => item.id === nextGpuId);
    if (!cpu && !gpu) return;
    const breakdown = buildPowerBreakdown({
      ...TYPICAL_BUILD,
      cpuWatts: cpu?.peakPower ?? 0,
      gpuWatts: gpu?.tdp ?? 0,
      ...(build.motherboard ? { chipset: chipsetClassOf(build.motherboard) } : {}),
      ...(build.ram ? { ramModules: build.ram.modules } : {}),
      ...(build.storage ? { mainDriveWatts: build.storage.power ?? PART_POWER.nvme } : {}),
      ...(build.cooler ? { pumps: build.cooler.kind === 'aio' ? 1 : 0 } : {}),
    });
    setLoadWatts(clamp(Math.ceil(breakdown.total), 100, 1200));
  };
  const pickPsu = (id: string) => {
    setPsuId(id);
    const part = psus.find((item) => item.id === id);
    if (part) setGrade(part.efficiency);
  };

  const result = useMemo(
    () => splitEnergyCost(idleWatts, loadWatts, loadHours, idleHours, price, PSU_EFFICIENCY[grade]),
    [idleWatts, loadWatts, loadHours, idleHours, price, grade],
  );

  const money = (value: number) => formatPln(value, locale);
  const rate = price.toLocaleString(locale === 'pl' ? 'pl-PL' : 'en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <CalculatorShell
      inputs={
        <>
          <LoadBuildButton
            locale={locale}
            uses={['cpu', 'gpu', 'psu']}
            onLoad={(parts) => {
              const used: string[] = [];
              if (parts.cpu) {
                setCpuId(parts.cpu.id);
                used.push(partLabel(parts.cpu));
              }
              if (parts.gpu) {
                setGpuId(parts.gpu.id);
                used.push(partLabel(parts.gpu));
              }
              fillLoad(parts.cpu?.id ?? cpuId, parts.gpu?.id ?? gpuId, parts);
              if (parts.psu) {
                pickPsu(parts.psu.id);
                used.push(partLabel(parts.psu));
              }
              return used;
            }}
          />
          <PartSelect
            label={dict.configurator.category.cpu}
            value={cpuId}
            onChange={(id) => {
              setCpuId(id);
              fillLoad(id, gpuId);
            }}
            options={partOptions(
              cpus,
              (part) => part.socket.toUpperCase(),
              (part) => `${part.peakPower} W`,
            )}
            manualLabel={dict.calc.picker.manual}
          />
          <PartSelect
            label={dict.configurator.category.gpu}
            value={gpuId}
            onChange={(id) => {
              setGpuId(id);
              fillLoad(cpuId, id);
            }}
            options={partOptions(
              gpus,
              (part) => part.brand,
              (part) => `${part.tdp} W`,
            )}
            manualLabel={dict.calc.energy.noGpu}
            hint={dict.calc.energy.fromPartsHint}
          />
          <NumberField
            label={dict.calc.energy.idleWatts}
            unit="W"
            value={idleWatts}
            onChange={setIdleWatts}
            min={20}
            max={300}
            step={5}
            hint={dict.calc.energy.idleHint}
          />
          <NumberField
            label={dict.calc.energy.loadWatts}
            unit="W"
            value={loadWatts}
            onChange={(value) => {
              setLoadWatts(value);
              setCpuId('');
              setGpuId('');
            }}
            min={100}
            max={1200}
            step={10}
          />
          <NumberField
            label={dict.calc.energy.loadHours}
            unit="h"
            value={loadHours}
            onChange={setLoadHours}
            min={0}
            max={24}
            step={0.5}
          />
          <NumberField
            label={dict.calc.energy.idleHours}
            unit="h"
            value={idleHours}
            onChange={setIdleHours}
            min={0}
            max={24}
            step={0.5}
          />
          <NumberField
            label={dict.calc.energy.price}
            unit={dict.calc.energy.priceUnit}
            value={price}
            onChange={setPrice}
            min={0.1}
            max={3}
            step={0.05}
            hint={dict.calc.energy.priceHint(
              electricityPrice.pricePerKwh.toLocaleString(locale === 'pl' ? 'pl-PL' : 'en-GB', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
              electricityPrice.period,
              electricityPrice.provisional,
            )}
          />
          <PartSelect
            label={dict.calc.energy.psuModel}
            value={psuId}
            onChange={(id) => (id ? pickPsu(id) : setPsuId(''))}
            options={partOptions(
              psus,
              (part) => part.brand,
              (part) => `${part.wattage} W, 80 Plus ${part.efficiency}`,
            )}
            manualLabel={dict.calc.picker.manual}
          />
          <SelectField
            label={dict.calc.energy.efficiency}
            value={grade}
            onChange={(value) => {
              setGrade(value);
              setPsuId('');
            }}
            options={(Object.keys(PSU_EFFICIENCY) as (keyof typeof PSU_EFFICIENCY)[]).map(
              (key) => ({ value: key, label: `80 Plus ${key} (${PSU_EFFICIENCY[key] * 100}%)` }),
            )}
            hint={dict.calc.energy.efficiencyHint}
          />
        </>
      }
      result={
        <>
          <ResultValue label={dict.calc.energy.yearlyCost} value={money(result.cost)} />
          <ResultRow label={dict.calc.energy.monthly} value={money(result.cost / 12)} emphasis />
          <ResultRow
            label={dict.calc.energy.consumption}
            value={`${Math.round(result.totalKwh)} kWh`}
          />
          <ResultRow
            label={dict.calc.energy.atTheWall}
            value={`${Math.round(result.wallLoad)} W`}
          />
          <ResultRow
            label={dict.calc.energy.fromIdle}
            value={`${Math.round(result.idleKwh)} kWh (${Math.round((result.idleKwh / result.totalKwh) * 100)}%)`}
          />
          <ResultRow
            label={dict.calc.energy.fromLoad}
            value={`${Math.round(result.loadKwh)} kWh (${Math.round((result.loadKwh / result.totalKwh) * 100)}%)`}
          />
          <ResultRow
            label={dict.calc.energy.working}
            value={`${Math.round(result.totalKwh)} kWh × ${rate} ${dict.calc.energy.priceUnit} ≈ ${money(result.cost)}`}
          />
        </>
      }
      explanation={dict.calc.energy.explanation}
    />
  );
}
