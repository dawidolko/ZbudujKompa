'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { CASE_AIRFLOW_RISE, COOLER_RESISTANCE, estimateLoadTemp } from '@/lib/calculators';
import { coolers, cpus } from '@/lib/parts';
import { partLabel, thermalCoolerClass } from '@/lib/parts/calculator-inputs';
import { LoadBuildButton, PartSelect, partOptions } from '../CataloguePicker';
import {
  CalculatorShell,
  NumberField,
  ResultRow,
  ResultValue,
  SelectField,
} from '../CalculatorShell';

/**
 * Estimated temperature under sustained load.
 *
 * Broken into its two contributions — what the case adds and what the cooler
 * adds — because that is what tells the reader which one to change. A high
 * figure driven by the case rise is a different problem from one driven by the
 * cooler, and a single number hides which.
 *
 * A catalogue processor fills its peak power (AMD PPT or Intel PL2), and a
 * catalogue cooler selects its class — by radiator size for an AiO, by design
 * for an air cooler — rather than turning its wattage rating into a thermal
 * resistance, which would invent a figure no manufacturer publishes.
 */
export function ThermalCalculator({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const [watts, setWatts] = useState(150);
  const [roomC, setRoomC] = useState(22);
  const [airflow, setAirflow] = useState<keyof typeof CASE_AIRFLOW_RISE>('typical');
  const [cooler, setCooler] = useState<keyof typeof COOLER_RESISTANCE>('dualTower');
  const [cpuId, setCpuId] = useState('');
  const [coolerId, setCoolerId] = useState('');

  const pickCpu = (id: string) => {
    setCpuId(id);
    const part = cpus.find((item) => item.id === id);
    if (part) setWatts(part.peakPower);
  };
  const pickCooler = (id: string) => {
    setCoolerId(id);
    const part = coolers.find((item) => item.id === id);
    if (part) setCooler(thermalCoolerClass(part));
  };

  const result = useMemo(
    () => estimateLoadTemp({ watts, roomC, airflow, cooler }),
    [watts, roomC, airflow, cooler],
  );

  const verdict =
    result.temperature < 65
      ? { text: dict.calc.thermal.cool, tone: 'success' as const }
      : result.temperature < 85
        ? { text: dict.calc.thermal.warm, tone: 'neutral' as const }
        : result.temperature < 95
          ? { text: dict.calc.thermal.hot, tone: 'warning' as const }
          : { text: dict.calc.thermal.throttling, tone: 'danger' as const };

  return (
    <CalculatorShell
      inputs={
        <>
          <LoadBuildButton
            locale={locale}
            uses={['cpu', 'cooler']}
            onLoad={(parts) => {
              const used: string[] = [];
              if (parts.cpu) {
                pickCpu(parts.cpu.id);
                used.push(partLabel(parts.cpu));
              }
              if (parts.cooler) {
                pickCooler(parts.cooler.id);
                used.push(partLabel(parts.cooler));
              }
              return used;
            }}
          />
          <PartSelect
            label={dict.configurator.category.cpu}
            value={cpuId}
            onChange={(id) => (id ? pickCpu(id) : setCpuId(''))}
            options={partOptions(
              cpus,
              (part) => part.socket.toUpperCase(),
              (part) => `${part.peakPower} W`,
            )}
            manualLabel={dict.calc.picker.manual}
          />
          <NumberField
            label={dict.calc.thermal.watts}
            unit="W"
            value={watts}
            onChange={(value) => {
              setWatts(value);
              setCpuId('');
            }}
            min={35}
            max={350}
            step={1}
            hint={dict.calc.thermal.wattsHint}
          />
          <NumberField
            label={dict.calc.thermal.room}
            unit="°C"
            value={roomC}
            onChange={setRoomC}
            min={15}
            max={35}
          />
          <SelectField
            label={dict.calc.thermal.airflow}
            value={airflow}
            onChange={setAirflow}
            options={[
              { value: 'good', label: dict.calc.thermal.airflowGood },
              { value: 'typical', label: dict.calc.thermal.airflowTypical },
              { value: 'restricted', label: dict.calc.thermal.airflowRestricted },
            ]}
          />
          <PartSelect
            label={dict.calc.thermal.coolerModel}
            value={coolerId}
            onChange={(id) => (id ? pickCooler(id) : setCoolerId(''))}
            options={partOptions(coolers, (part) => part.brand)}
            manualLabel={dict.calc.picker.manual}
            hint={dict.calc.thermal.coolerModelHint}
          />
          <SelectField
            label={dict.calc.thermal.cooler}
            value={cooler}
            onChange={(value) => {
              setCooler(value);
              setCoolerId('');
            }}
            options={[
              { value: 'boxed', label: dict.calc.thermal.coolerBoxed },
              { value: 'singleTower', label: dict.calc.thermal.coolerSingle },
              { value: 'dualTower', label: dict.calc.thermal.coolerDual },
              { value: 'aio240', label: dict.calc.thermal.coolerAio240 },
              { value: 'aio360', label: dict.calc.thermal.coolerAio360 },
            ]}
          />
        </>
      }
      result={
        <>
          <ResultValue
            label={dict.calc.thermal.estimated}
            value={Math.round(result.temperature)}
            unit="°C"
          />
          <div className="mb-3">
            <Badge tone={verdict.tone}>{verdict.text}</Badge>
          </div>
          <ResultRow label={dict.calc.thermal.fromRoom} value={`${roomC} °C`} />
          <ResultRow label={dict.calc.thermal.fromCase} value={`+${result.caseRise} °C`} />
          <ResultRow
            label={dict.calc.thermal.fromCooler}
            value={`+${Math.round(result.coolerRise)} °C`}
            emphasis
          />
        </>
      }
      explanation={dict.calc.thermal.explanation}
    />
  );
}
