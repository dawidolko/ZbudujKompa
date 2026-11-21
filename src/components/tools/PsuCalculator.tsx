'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import {
  buildPowerBreakdown,
  CHIPSET_POWER,
  fanHeaderPlan,
  PART_POWER,
  requiredConnectors,
  sizePowerSupply,
  type ChipsetClass,
} from '@/lib/calculators';
import { cpus, gpus, motherboards, psus, storage } from '@/lib/parts';
import type { Storage } from '@/lib/parts';
import { chipsetClassOf, partLabel } from '@/lib/parts/calculator-inputs';
import { LoadBuildButton, PartSelect, partOptions } from './CataloguePicker';
import {
  CalculatorShell,
  NumberField,
  ResultRow,
  ResultValue,
  SelectField,
} from './CalculatorShell';

/** The draw a drive contributes: its published figure, or the generic one for its kind. */
function driveWatts(drive: Storage | undefined): { watts: number; generic: boolean } {
  if (!drive) return { watts: PART_POWER.nvme, generic: true };
  if (drive.power) return { watts: drive.power, generic: false };
  const generic = { nvme: PART_POWER.nvme, 'sata-ssd': PART_POWER.sataSsd, hdd: PART_POWER.hdd };
  return { watts: generic[drive.kind], generic: true };
}

/**
 * Power supply sizing.
 *
 * The distinguishing feature against most calculators of this kind is that it
 * asks whether the supply meets ATX 3.x, because that single answer changes
 * the recommendation substantially. Modern graphics cards spike far above
 * their rated power for under a millisecond; a compliant supply is required to
 * ride that out, an older one is not — and the protection trips on the spike
 * rather than on the average.
 *
 * Parts can be picked from the catalogue, which fills the CPU's peak power,
 * the card's board power and connectors, and the board's chipset and fan
 * headers. Every figure stays editable, and editing one sets its picker back
 * to manual so the breakdown never names a part the number no longer matches.
 */
export function PsuCalculator({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const text = dict.tools.psu;

  const [cpuId, setCpuId] = useState('');
  const [cpuWatts, setCpuWatts] = useState(120);
  const [gpuId, setGpuId] = useState('');
  const [gpuWatts, setGpuWatts] = useState(250);
  const [boardId, setBoardId] = useState('');
  const [chipset, setChipset] = useState<ChipsetClass>('amd');
  const [ramModules, setRamModules] = useState(2);
  const [driveId, setDriveId] = useState('');
  const [nvme, setNvme] = useState(0);
  const [sataSsd, setSataSsd] = useState(0);
  const [hdd, setHdd] = useState(0);
  const [fans, setFans] = useState(3);
  const [pumps, setPumps] = useState(0);
  const [rgbLeds, setRgbLeds] = useState(0);
  const [usbDevices, setUsbDevices] = useState(2);
  const [standard, setStandard] = useState<'atx3' | 'atx2'>('atx3');
  const [psuId, setPsuId] = useState('');

  const cpu = cpus.find((part) => part.id === cpuId);
  const gpu = gpus.find((part) => part.id === gpuId);
  const board = motherboards.find((part) => part.id === boardId);
  const drive = storage.find((part) => part.id === driveId);
  const psu = psus.find((part) => part.id === psuId);

  const pickCpu = (id: string) => {
    setCpuId(id);
    const part = cpus.find((item) => item.id === id);
    if (part) setCpuWatts(part.peakPower);
  };
  const pickGpu = (id: string) => {
    setGpuId(id);
    const part = gpus.find((item) => item.id === id);
    if (part) setGpuWatts(part.tdp);
  };
  const pickBoard = (id: string) => {
    setBoardId(id);
    const part = motherboards.find((item) => item.id === id);
    if (part) setChipset(chipsetClassOf(part));
  };
  const pickPsu = (id: string) => {
    setPsuId(id);
    const part = psus.find((item) => item.id === id);
    if (part) setStandard(part.atx31 ? 'atx3' : 'atx2');
  };

  const result = useMemo(() => {
    const mainDrive = driveWatts(drive);
    const breakdown = buildPowerBreakdown({
      cpuWatts,
      gpuWatts,
      chipset,
      ramModules,
      mainDriveWatts: mainDrive.watts,
      nvme,
      sataSsd,
      hdd,
      fans,
      pumps,
      rgbLeds,
      usbDevices,
    });
    const sizing = sizePowerSupply({
      cpuPeakWatts: cpuWatts,
      gpuWatts,
      otherWatts: breakdown.other,
      atx3x: standard === 'atx3',
    });
    /* SATA power plugs: every SATA SSD and hard drive, including the main
       drive when it is one. NVMe drives take power from the slot. */
    const sataDrives = sataSsd + hdd + (drive && drive.kind !== 'nvme' ? 1 : 0);
    const connectors = requiredConnectors(gpuWatts, sataDrives, fans + pumps, gpu?.power);
    const headers = board ? fanHeaderPlan(fans + pumps, board.fanHeaders) : null;
    return { breakdown, sizing, connectors, headers, mainDrive };
  }, [
    cpuWatts,
    gpuWatts,
    chipset,
    ramModules,
    drive,
    nvme,
    sataSsd,
    hdd,
    fans,
    pumps,
    rgbLeds,
    usbDevices,
    standard,
    gpu,
    board,
  ]);

  const { breakdown, sizing, connectors, headers } = result;
  const number = new Intl.NumberFormat(locale === 'pl' ? 'pl-PL' : 'en-GB', {
    maximumFractionDigits: 1,
  });
  const watts = (value: number) => `${number.format(value)} W`;

  const rowLabel = (key: (typeof breakdown.items)[number]['key']) => {
    if (key === 'cpu') return cpu ? partLabel(cpu) : text.items.cpu;
    if (key === 'gpu') return gpu ? partLabel(gpu) : text.items.gpu;
    if (key === 'board') return board ? `${text.items.board} (${board.chipset})` : text.items.board;
    if (key === 'drive') {
      const name = drive ? partLabel(drive) : text.items.drive;
      return result.mainDrive.generic ? `${name} ${text.genericFigure}` : name;
    }
    return text.items[key];
  };

  const psuVerdict = psu
    ? psu.wattage >= sizing.recommended
      ? { tone: 'success' as const, text: text.yourPsuEnough(psu.wattage) }
      : psu.wattage >= breakdown.total
        ? { tone: 'warning' as const, text: text.yourPsuTight(psu.wattage) }
        : { tone: 'danger' as const, text: text.yourPsuTooSmall(psu.wattage) }
    : null;

  return (
    <CalculatorShell
      inputs={
        <>
          <LoadBuildButton
            locale={locale}
            uses={['cpu', 'gpu', 'motherboard', 'ram', 'storage', 'cooler', 'psu']}
            onLoad={(parts) => {
              const used: string[] = [];
              if (parts.cpu) {
                pickCpu(parts.cpu.id);
                used.push(partLabel(parts.cpu));
              }
              if (parts.gpu) {
                pickGpu(parts.gpu.id);
                used.push(partLabel(parts.gpu));
              }
              if (parts.motherboard) {
                pickBoard(parts.motherboard.id);
                used.push(partLabel(parts.motherboard));
              }
              if (parts.ram) {
                setRamModules(parts.ram.modules);
                used.push(partLabel(parts.ram));
              }
              if (parts.storage) {
                setDriveId(parts.storage.id);
                used.push(partLabel(parts.storage));
              }
              if (parts.cooler) {
                setPumps(parts.cooler.kind === 'aio' ? 1 : 0);
                used.push(partLabel(parts.cooler));
              }
              if (parts.psu) {
                pickPsu(parts.psu.id);
                used.push(partLabel(parts.psu));
              }
              return used;
            }}
          />

          <fieldset className="space-y-4">
            <legend className="spec-label mb-3">{text.groupCore}</legend>
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
              label={text.cpuWatts}
              value={cpuWatts}
              onChange={(value) => {
                setCpuWatts(value);
                setCpuId('');
              }}
              min={35}
              max={400}
              step={1}
              hint={text.cpuHint}
            />
            <PartSelect
              label={dict.configurator.category.gpu}
              value={gpuId}
              onChange={(id) => (id ? pickGpu(id) : setGpuId(''))}
              options={partOptions(
                gpus,
                (part) => part.brand,
                (part) => `${part.tdp} W`,
              )}
              manualLabel={dict.calc.picker.manual}
            />
            <NumberField
              label={text.gpuWatts}
              value={gpuWatts}
              onChange={(value) => {
                setGpuWatts(value);
                setGpuId('');
              }}
              min={0}
              max={700}
              step={1}
              hint={text.gpuHint}
            />
            <PartSelect
              label={dict.configurator.category.motherboard}
              value={boardId}
              onChange={(id) => (id ? pickBoard(id) : setBoardId(''))}
              options={partOptions(
                motherboards,
                (part) => part.socket.toUpperCase(),
                (part) => part.chipset,
              )}
              manualLabel={dict.calc.picker.manual}
            />
            <SelectField
              label={text.chipset}
              value={chipset}
              onChange={(value) => {
                setChipset(value);
                setBoardId('');
              }}
              options={[
                { value: 'intel', label: text.chipsetIntel(CHIPSET_POWER.intel) },
                { value: 'amd', label: text.chipsetAmd(CHIPSET_POWER.amd) },
                { value: 'amd-dual', label: text.chipsetAmdDual(CHIPSET_POWER['amd-dual']) },
              ]}
              hint={text.chipsetHint}
            />
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="spec-label mb-3">{text.groupRest}</legend>
            <PartSelect
              label={text.mainDrive}
              value={driveId}
              onChange={setDriveId}
              options={partOptions(
                storage,
                (part) => dict.calc.picker.driveKind[part.kind],
                (part) => (part.power ? `${part.power} W` : text.noFigure),
              )}
              manualLabel={text.mainDriveManual(PART_POWER.nvme)}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <NumberField
                label={text.ramModules}
                value={ramModules}
                onChange={setRamModules}
                min={0}
                max={8}
                hint={text.each(PART_POWER.ramModule)}
              />
              <NumberField
                label={text.nvme}
                value={nvme}
                onChange={setNvme}
                min={0}
                max={8}
                hint={text.each(PART_POWER.nvme)}
              />
              <NumberField
                label={text.sataSsd}
                value={sataSsd}
                onChange={setSataSsd}
                min={0}
                max={8}
                hint={text.each(PART_POWER.sataSsd)}
              />
              <NumberField
                label={text.hdd}
                value={hdd}
                onChange={setHdd}
                min={0}
                max={8}
                hint={text.each(PART_POWER.hdd)}
              />
              <NumberField
                label={text.fans}
                value={fans}
                onChange={setFans}
                min={0}
                max={16}
                hint={text.each(PART_POWER.fan)}
              />
              <NumberField
                label={text.pumps}
                value={pumps}
                onChange={setPumps}
                min={0}
                max={2}
                hint={text.each(PART_POWER.aioPump)}
              />
              <NumberField
                label={text.rgbLeds}
                value={rgbLeds}
                onChange={setRgbLeds}
                min={0}
                max={300}
                step={1}
                hint={text.rgbHint(PART_POWER.rgbLed)}
              />
              <NumberField
                label={text.usbDevices}
                value={usbDevices}
                onChange={setUsbDevices}
                min={0}
                max={10}
                hint={text.each(PART_POWER.usbDevice)}
              />
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="spec-label mb-3">{text.groupSupply}</legend>
            <SelectField
              label={text.standard}
              value={standard}
              onChange={(value) => {
                setStandard(value);
                setPsuId('');
              }}
              options={[
                { value: 'atx3', label: text.atx3 },
                { value: 'atx2', label: text.atx2 },
              ]}
              hint={text.standardHint}
            />
            <PartSelect
              label={text.yourPsu}
              value={psuId}
              onChange={(id) => (id ? pickPsu(id) : setPsuId(''))}
              options={partOptions(
                psus,
                (part) => part.brand,
                (part) => `${part.wattage} W${part.atx31 ? ', ATX 3.1' : ''}`,
              )}
              manualLabel={text.yourPsuNone}
            />
          </fieldset>
        </>
      }
      result={
        <>
          <ResultValue label={text.recommended} value={sizing.recommended} unit="W" />
          <div className="mb-3 flex flex-wrap gap-2">
            {sizing.reason === 'transient' ? (
              <Badge tone="warning">{text.raisedForTransients}</Badge>
            ) : null}
            {psuVerdict ? <Badge tone={psuVerdict.tone}>{psuVerdict.text}</Badge> : null}
          </div>
          <ResultRow label={text.estimated} value={`${sizing.estimated} W`} emphasis />
          <ResultRow label={text.transientPeak} value={`~${sizing.transientPeak} W`} />
          <ResultRow
            label={text.loadAtRecommended}
            value={`${Math.round((sizing.estimated / sizing.recommended) * 100)}%`}
          />
          {gpu ? <ResultRow label={text.vendorPsu} value={`${gpu.recommendedPsu} W`} /> : null}

          <table className="mt-4 w-full text-sm">
            <caption className="spec-label mb-1 text-left">{text.breakdown}</caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">{text.part}</th>
                <th scope="col">{text.draw}</th>
              </tr>
            </thead>
            <tbody>
              {breakdown.items.map((item) => (
                <tr key={item.key} className="border-t border-border-subtle align-baseline">
                  <th scope="row" className="py-1.5 pr-3 text-left font-normal text-text-muted">
                    {rowLabel(item.key)}
                    {item.count > 1 ? (
                      <span className="text-text-secondary">
                        {' '}
                        ({item.count} × {watts(item.each)})
                      </span>
                    ) : null}
                  </th>
                  <td className="py-1.5 text-right whitespace-nowrap text-text-secondary">
                    {watts(item.watts)}
                  </td>
                </tr>
              ))}
              <tr className="border-t border-border-strong">
                <th scope="row" className="py-1.5 pr-3 text-left font-bold text-text-primary">
                  {text.total}
                </th>
                <td className="py-1.5 text-right font-bold whitespace-nowrap text-text-primary">
                  {watts(breakdown.total)}
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="spec-label mt-4 mb-1">{text.connectors}</h3>
          <ul className="space-y-1.5 text-sm text-text-secondary">
            <li>{text.eps}</li>
            <li>
              {connectors.uses12vhpwr
                ? text.gpu12v2x6(connectors.cableRating, connectors.pcie8pin)
                : connectors.pcie8pin > 0
                  ? text.gpu8pin(connectors.pcie8pin, connectors.cableRating)
                  : text.gpuNone}{' '}
              <span className="text-text-muted">
                ({connectors.fromCatalogue ? text.fromVendor : text.fromWattage})
              </span>
            </li>
            {connectors.sata > 0 ? <li>{text.sata(connectors.sata)}</li> : null}
            <li>
              {headers && board
                ? headers.needsHelp
                  ? text.headersShort(fans + pumps, board.fanHeaders, headers.splittersNeeded)
                  : text.headersOk(fans + pumps, board.fanHeaders)
                : connectors.needsFanHub
                  ? text.headersCheck
                  : text.headersUnknown}
            </li>
          </ul>
        </>
      }
      explanation={text.explanation}
    />
  );
}
