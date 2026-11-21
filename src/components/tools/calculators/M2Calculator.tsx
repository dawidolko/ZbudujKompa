'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { m2SlotCheck } from '@/lib/calculators';
import { motherboards, storage } from '@/lib/parts';
import { bestM2Slot, partLabel } from '@/lib/parts/calculator-inputs';
import { t } from '@/lib/utils';
import { LoadBuildButton, PartSelect, partOptions } from '../CataloguePicker';
import { CalculatorShell, ResultRow, ResultValue, SelectField } from '../CalculatorShell';

/* Only NVMe drives have a PCIe generation; SATA drives never meet this limit. */
const nvmeDrives = storage.filter((drive) => drive.kind === 'nvme' && drive.pcieGen);

/**
 * Whether an M.2 slot limits the drive in it.
 *
 * This exists because the mistake is silent: a board's second and third M.2
 * slots often run a lower PCIe generation or fewer lanes, and a fast drive in
 * one of them simply runs slower with nothing anywhere reporting why.
 *
 * Picking a board lists its real slots, read from the manufacturer's page,
 * so the reader chooses "M.2_3" rather than having to know what it is wired
 * to; picking a drive fills its generation.
 */
export function M2Calculator({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const [driveGen, setDriveGen] = useState<'3' | '4' | '5'>('5');
  const [slotGen, setSlotGen] = useState<'3' | '4' | '5'>('4');
  const [lanes, setLanes] = useState<'2' | '4'>('4');
  const [boardId, setBoardId] = useState('');
  const [slotIndex, setSlotIndex] = useState('0');
  const [driveId, setDriveId] = useState('');

  const board = motherboards.find((item) => item.id === boardId);
  const slot = board?.m2[Number(slotIndex)];

  const pickSlot = (index: number, from = board) => {
    const chosen = from?.m2[index];
    if (!chosen) return;
    setSlotIndex(String(index));
    setSlotGen(String(chosen.gen) as '3' | '4' | '5');
    setLanes(String(chosen.lanes) as '2' | '4');
  };
  const pickBoard = (id: string, gen = Number(driveGen) as 3 | 4 | 5) => {
    setBoardId(id);
    const part = motherboards.find((item) => item.id === id);
    /* Starts on the first slot that runs the drive at full speed, which is
       the advice the calculator would give anyway. */
    if (part) pickSlot(Math.max(0, bestM2Slot(part, gen)), part);
  };
  const pickDrive = (id: string) => {
    setDriveId(id);
    const part = nvmeDrives.find((item) => item.id === id);
    if (part?.pcieGen) setDriveGen(String(part.pcieGen) as '3' | '4' | '5');
  };

  const result = useMemo(
    () => m2SlotCheck(Number(driveGen) as 3 | 4 | 5, Number(slotGen) as 3 | 4 | 5, Number(lanes)),
    [driveGen, slotGen, lanes],
  );

  const gbs = (mbs: number) => `${(mbs / 1000).toFixed(2)} GB/s`;
  const generations = [
    { value: '3' as const, label: 'PCIe 3.0' },
    { value: '4' as const, label: 'PCIe 4.0' },
    { value: '5' as const, label: 'PCIe 5.0' },
  ];

  return (
    <CalculatorShell
      inputs={
        <>
          <LoadBuildButton
            locale={locale}
            uses={['motherboard', 'storage']}
            onLoad={(parts) => {
              const used: string[] = [];
              let gen = Number(driveGen) as 3 | 4 | 5;
              if (parts.storage?.kind === 'nvme' && parts.storage.pcieGen) {
                pickDrive(parts.storage.id);
                gen = parts.storage.pcieGen;
                used.push(partLabel(parts.storage));
              }
              if (parts.motherboard) {
                pickBoard(parts.motherboard.id, gen);
                used.push(partLabel(parts.motherboard));
              }
              return used;
            }}
          />
          <PartSelect
            label={dict.calc.m2.drive}
            value={driveId}
            onChange={(id) => (id ? pickDrive(id) : setDriveId(''))}
            options={partOptions(
              nvmeDrives,
              (part) => part.brand,
              (part) => `PCIe ${part.pcieGen}.0`,
            )}
            manualLabel={dict.calc.picker.manual}
          />
          <SelectField
            label={dict.calc.m2.driveGen}
            value={driveGen}
            onChange={(value) => {
              setDriveGen(value);
              setDriveId('');
            }}
            options={generations}
          />
          <PartSelect
            label={dict.configurator.category.motherboard}
            value={boardId}
            onChange={(id) => (id ? pickBoard(id) : setBoardId(''))}
            options={partOptions(
              motherboards,
              (part) => part.socket.toUpperCase(),
              (part) => dict.calc.m2.slotCount(part.m2.length),
            )}
            manualLabel={dict.calc.picker.manual}
          />
          {board ? (
            <SelectField
              label={dict.calc.m2.slot}
              value={slotIndex}
              onChange={(value) => pickSlot(Number(value))}
              options={board.m2.map((entry, index) => ({
                value: String(index),
                label: `${entry.label} — PCIe ${entry.gen}.0 x${entry.lanes}, ${
                  entry.wiredTo === 'cpu' ? dict.calc.m2.wiredCpu : dict.calc.m2.wiredChipset
                }`,
              }))}
              hint={slot?.note ? t(slot.note, locale) : undefined}
            />
          ) : (
            <>
              <SelectField
                label={dict.calc.m2.slotGen}
                value={slotGen}
                onChange={setSlotGen}
                options={generations}
              />
              <SelectField
                label={dict.calc.m2.slotLanes}
                value={lanes}
                onChange={setLanes}
                options={[
                  { value: '4', label: 'x4' },
                  { value: '2', label: 'x2' },
                ]}
              />
            </>
          )}
        </>
      }
      result={
        <>
          <ResultValue label={dict.calc.m2.maxSpeed} value={gbs(result.maxSpeedMbs)} tone="plain" />
          <div className="mb-3">
            <Badge tone={result.limited ? 'warning' : 'success'}>
              {result.limited ? dict.calc.m2.limited : dict.calc.m2.notLimited}
            </Badge>
          </div>
          {slot ? (
            <ResultRow
              label={dict.calc.m2.slot}
              value={`${slot.label}: PCIe ${slot.gen}.0 x${slot.lanes}`}
            />
          ) : null}
          <ResultRow
            label={dict.calc.m2.drivePotential}
            value={gbs(result.drivePotentialMbs)}
            emphasis
          />
          {result.limited ? (
            <ResultRow
              label={dict.calc.upgrade.gain}
              value={`−${Math.round((1 - result.maxSpeedMbs / result.drivePotentialMbs) * 100)}%`}
            />
          ) : null}
          {board && result.limited ? (
            <ResultRow
              label={dict.calc.m2.betterSlot}
              value={(() => {
                const best = board.m2[bestM2Slot(board, Number(driveGen) as 3 | 4 | 5)];
                return best ? best.label : dict.calc.m2.noBetterSlot;
              })()}
            />
          ) : null}
        </>
      }
      explanation={dict.calc.m2.explanation}
    />
  );
}
