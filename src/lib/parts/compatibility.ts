import type { Locale } from '@/i18n/config';
import type { BuildSelection } from './types.ts';
import { resolveSelection, selectionPower } from './selection.ts';

/**
 * Compatibility engine.
 *
 * Every check returns a reason, never a bare verdict. "Incompatible" on its own
 * sends the reader straight back to a forum; "this board takes DDR5 and that
 * kit is DDR4" tells them what to change.
 *
 * Severity is deliberately three-valued. A hard error means the build cannot
 * work at all. A warning means it works but something is compromised — a cooler
 * at its limit, a board throttling a CPU — and those are the cases people
 * actually get wrong, because nothing visibly fails.
 */

export type IssueLevel = 'error' | 'warning' | 'ok';

export type CompatibilityIssue = {
  level: IssueLevel;
  /** Which categories the issue is about, for highlighting in the UI. */
  categories: string[];
  message: { pl: string; en: string };
};

export type CompatibilityReport = {
  issues: CompatibilityIssue[];
  /** True when nothing blocks the build outright. */
  buildable: boolean;
  /** Estimated draw and the supply size that covers it. */
  power: { estimated: number; recommended: number };
};

/** Common retail wattages, so a recommendation names a supply you can buy. */
const SUPPLY_STEPS = [450, 550, 650, 750, 850, 1000, 1200, 1500];

/** Headroom over estimated draw: efficiency peak plus transient spikes. */
const HEADROOM = 1.3;

export function checkCompatibility(selection: BuildSelection): CompatibilityReport {
  const parts = resolveSelection(selection);
  const issues: CompatibilityIssue[] = [];

  const cpu = parts.cpu?.category === 'cpu' ? parts.cpu : undefined;
  const board = parts.motherboard?.category === 'motherboard' ? parts.motherboard : undefined;
  const ram = parts.ram?.category === 'ram' ? parts.ram : undefined;
  const gpu = parts.gpu?.category === 'gpu' ? parts.gpu : undefined;
  const psu = parts.psu?.category === 'psu' ? parts.psu : undefined;
  const pcCase = parts.case?.category === 'case' ? parts.case : undefined;
  const cooler = parts.cooler?.category === 'cooler' ? parts.cooler : undefined;

  /* ---- CPU and motherboard: the socket ---- */
  if (cpu && board) {
    if (cpu.socket !== board.socket) {
      issues.push({
        level: 'error',
        categories: ['cpu', 'motherboard'],
        message: {
          pl: `Procesor ${cpu.name} ma podstawkę ${cpu.socket.toUpperCase()}, a płyta ${board.name} — ${board.socket.toUpperCase()}. Fizycznie nie da się ich połączyć.`,
          en: `The ${cpu.name} uses socket ${cpu.socket.toUpperCase()} while the ${board.name} is ${board.socket.toUpperCase()}. They cannot physically go together.`,
        },
      });
    } else {
      issues.push({
        level: 'ok',
        categories: ['cpu', 'motherboard'],
        message: {
          pl: `Procesor i płyta mają zgodną podstawkę ${cpu.socket.toUpperCase()}.`,
          en: `The processor and board share socket ${cpu.socket.toUpperCase()}.`,
        },
      });
    }

    /* The VRM check catches the failure that hides: a weak board under a hungry
       CPU does not fail, it quietly reduces clocks under sustained load. */
    if (board.vrmRating < cpu.tdp) {
      issues.push({
        level: 'error',
        categories: ['cpu', 'motherboard'],
        message: {
          pl: `Sekcja zasilania płyty ${board.name} nie udźwignie procesora o TDP ${cpu.tdp} W. Wybierz płytę z mocniejszym VRM.`,
          en: `Power delivery on the ${board.name} cannot sustain a ${cpu.tdp} W processor. Choose a board with a stronger VRM.`,
        },
      });
    } else if (board.vrmRating < cpu.peakPower) {
      issues.push({
        level: 'warning',
        categories: ['cpu', 'motherboard'],
        message: {
          pl: `Płyta udźwignie ${cpu.name} przy typowym obciążeniu, ale w szczycie (${cpu.peakPower} W) może obniżać taktowania. Nic się nie zepsuje — po prostu stracisz część wydajności.`,
          en: `The board handles the ${cpu.name} at typical load, but may reduce clocks at its ${cpu.peakPower} W peak. Nothing breaks — you simply lose some performance.`,
        },
      });
    }
  }

  /* ---- Memory generation ---- */
  if (board && ram) {
    if (board.memoryType !== ram.type) {
      issues.push({
        level: 'error',
        categories: ['motherboard', 'ram'],
        message: {
          pl: `Płyta ${board.name} przyjmuje wyłącznie ${board.memoryType.toUpperCase()}, a wybrana pamięć to ${ram.type.toUpperCase()}. Moduły nie wejdą w slot — wycięcie jest w innym miejscu.`,
          en: `The ${board.name} takes ${board.memoryType.toUpperCase()} only, and the selected kit is ${ram.type.toUpperCase()}. The modules will not enter the slot — the notch sits elsewhere.`,
        },
      });
    } else {
      issues.push({
        level: 'ok',
        categories: ['motherboard', 'ram'],
        message: {
          pl: `Pamięć ${ram.type.toUpperCase()} pasuje do tej płyty.`,
          en: `The ${ram.type.toUpperCase()} kit matches this board.`,
        },
      });
    }

    if (ram.modules > board.memorySlots) {
      issues.push({
        level: 'error',
        categories: ['motherboard', 'ram'],
        message: {
          pl: `Zestaw ma ${ram.modules} moduły, a płyta tylko ${board.memorySlots} sloty pamięci.`,
          en: `The kit has ${ram.modules} modules but the board has only ${board.memorySlots} memory slots.`,
        },
      });
    }
  }

  if (cpu && ram && !cpu.memory.includes(ram.type)) {
    issues.push({
      level: 'error',
      categories: ['cpu', 'ram'],
      message: {
        pl: `Kontroler pamięci w ${cpu.name} nie obsługuje ${ram.type.toUpperCase()}.`,
        en: `The memory controller in the ${cpu.name} does not support ${ram.type.toUpperCase()}.`,
      },
    });
  }

  /* ---- Cooler: socket and capacity ---- */
  if (cpu && cooler) {
    if (!cooler.sockets.includes(cpu.socket)) {
      issues.push({
        level: 'error',
        categories: ['cpu', 'cooler'],
        message: {
          pl: `Chłodzenie ${cooler.name} nie ma mocowania pod ${cpu.socket.toUpperCase()}.`,
          en: `The ${cooler.name} does not include mounting hardware for ${cpu.socket.toUpperCase()}.`,
        },
      });
    } else if (cooler.wattage < cpu.tdp) {
      issues.push({
        level: 'error',
        categories: ['cpu', 'cooler'],
        message: {
          pl: `${cooler.name} odprowadza ${cooler.wattage} W — za mało dla procesora ${cpu.tdp} W. Procesor będzie stale obniżał taktowania.`,
          en: `The ${cooler.name} handles ${cooler.wattage} W — not enough for a ${cpu.tdp} W processor. It will throttle continuously.`,
        },
      });
    } else if (cooler.wattage < cpu.peakPower) {
      issues.push({
        level: 'warning',
        categories: ['cpu', 'cooler'],
        message: {
          pl: `${cooler.name} wystarczy przy typowym obciążeniu, ale w szczycie ${cpu.peakPower} W będzie pracować głośno i blisko granicy.`,
          en: `The ${cooler.name} copes at typical load, but at the ${cpu.peakPower} W peak it will run loud and close to its limit.`,
        },
      });
    } else {
      issues.push({
        level: 'ok',
        categories: ['cpu', 'cooler'],
        message: {
          pl: `${cooler.name} ma zapas względem ${cpu.peakPower} W szczytowego poboru procesora.`,
          en: `The ${cooler.name} has headroom over the processor's ${cpu.peakPower} W peak draw.`,
        },
      });
    }
  }

  /* ---- Physical fit: the checks people skip and regret ---- */
  if (pcCase && cooler && cooler.kind === 'air' && cooler.height) {
    if (cooler.height > pcCase.maxCoolerHeight) {
      issues.push({
        level: 'error',
        categories: ['case', 'cooler'],
        message: {
          pl: `Chłodzenie ma ${cooler.height} mm wysokości, a obudowa ${pcCase.name} mieści maksymalnie ${pcCase.maxCoolerHeight} mm. Panel boczny się nie zamknie.`,
          en: `The cooler is ${cooler.height} mm tall and the ${pcCase.name} allows ${pcCase.maxCoolerHeight} mm. The side panel will not close.`,
        },
      });
    } else {
      issues.push({
        level: 'ok',
        categories: ['case', 'cooler'],
        message: {
          pl: `Chłodzenie (${cooler.height} mm) mieści się w obudowie (limit ${pcCase.maxCoolerHeight} mm).`,
          en: `The cooler at ${cooler.height} mm fits the case limit of ${pcCase.maxCoolerHeight} mm.`,
        },
      });
    }
  }

  if (pcCase && cooler && cooler.kind === 'aio' && cooler.radiatorSize) {
    if (!pcCase.radiatorSupport.includes(cooler.radiatorSize)) {
      issues.push({
        level: 'error',
        categories: ['case', 'cooler'],
        message: {
          pl: `Obudowa ${pcCase.name} nie ma miejsca na chłodnicę ${cooler.radiatorSize} mm. Obsługuje: ${pcCase.radiatorSupport.join(', ') || 'brak chłodnic'}.`,
          en: `The ${pcCase.name} has no mounting position for a ${cooler.radiatorSize} mm radiator. It supports: ${pcCase.radiatorSupport.join(', ') || 'no radiators'}.`,
        },
      });
    }
  }

  if (pcCase && gpu) {
    if (gpu.length > pcCase.maxGpuLength) {
      issues.push({
        level: 'error',
        categories: ['case', 'gpu'],
        message: {
          pl: `Karta ${gpu.name} ma ${gpu.length} mm długości, a obudowa mieści ${pcCase.maxGpuLength} mm.`,
          en: `The ${gpu.name} is ${gpu.length} mm long and the case allows ${pcCase.maxGpuLength} mm.`,
        },
      });
    } else {
      issues.push({
        level: 'ok',
        categories: ['case', 'gpu'],
        message: {
          pl: `Karta graficzna (${gpu.length} mm) mieści się w obudowie (limit ${pcCase.maxGpuLength} mm).`,
          en: `The graphics card at ${gpu.length} mm fits the case limit of ${pcCase.maxGpuLength} mm.`,
        },
      });
    }
  }

  if (pcCase && board && !pcCase.formFactors.includes(board.formFactor)) {
    issues.push({
      level: 'error',
      categories: ['case', 'motherboard'],
      message: {
        pl: `Obudowa ${pcCase.name} nie przyjmuje płyt ${board.formFactor}. Obsługuje: ${pcCase.formFactors.join(', ')}.`,
        en: `The ${pcCase.name} does not accept ${board.formFactor} boards. It supports: ${pcCase.formFactors.join(', ')}.`,
      },
    });
  }

  if (pcCase && psu && psu.formFactor !== pcCase.psuFormFactor) {
    issues.push({
      level: 'error',
      categories: ['case', 'psu'],
      message: {
        pl: `Obudowa wymaga zasilacza ${pcCase.psuFormFactor}, a wybrany jest ${psu.formFactor}.`,
        en: `The case requires an ${pcCase.psuFormFactor} supply and the selected one is ${psu.formFactor}.`,
      },
    });
  }

  /* Tall memory under a large air cooler: not a hard failure, but it is the
     conflict people discover with the parts already in their hands. */
  if (ram && cooler && cooler.kind === 'air' && cooler.ramClearance) {
    if (ram.height > cooler.ramClearance) {
      issues.push({
        level: 'warning',
        categories: ['ram', 'cooler'],
        message: {
          pl: `Moduły mają ${ram.height} mm, a pod chłodzeniem jest ${cooler.ramClearance} mm prześwitu. Może być konieczne przesunięcie wentylatora w górę albo niższe moduły.`,
          en: `The modules are ${ram.height} mm tall and the cooler leaves ${cooler.ramClearance} mm of clearance. You may need to raise the fan or use lower-profile modules.`,
        },
      });
    }
  }

  /* ---- Power ---- */
  const estimated = selectionPower(selection);
  const withHeadroom = Math.ceil(estimated * HEADROOM);
  const recommended = SUPPLY_STEPS.find((step) => step >= withHeadroom) ?? SUPPLY_STEPS.at(-1)!;

  if (psu) {
    if (psu.wattage < estimated) {
      issues.push({
        level: 'error',
        categories: ['psu'],
        message: {
          pl: `Zasilacz ${psu.wattage} W nie pokryje szacowanego poboru ${estimated} W. Komputer będzie się wyłączał pod obciążeniem.`,
          en: `A ${psu.wattage} W supply cannot cover the estimated ${estimated} W draw. The machine will shut down under load.`,
        },
      });
    } else if (psu.wattage < recommended) {
      issues.push({
        level: 'warning',
        categories: ['psu'],
        message: {
          pl: `Zasilacz ${psu.wattage} W wystarczy, ale bez zapasu. Zalecane ${recommended} W — nie na dokładanie części, tylko na chwilowe skoki poboru karty graficznej.`,
          en: `A ${psu.wattage} W supply is enough but leaves no margin. ${recommended} W is recommended — not for more parts, but for the graphics card's transient spikes.`,
        },
      });
    } else {
      issues.push({
        level: 'ok',
        categories: ['psu'],
        message: {
          pl: `Zasilacz ${psu.wattage} W ma odpowiedni zapas przy szacowanym poborze ${estimated} W.`,
          en: `The ${psu.wattage} W supply has appropriate headroom over the estimated ${estimated} W draw.`,
        },
      });
    }

    if (gpu && !psu.atx31 && gpu.tdp >= 250) {
      issues.push({
        level: 'warning',
        categories: ['psu', 'gpu'],
        message: {
          pl: 'Ten zasilacz nie spełnia ATX 3.1, a karta pobiera powyżej 250 W. Zabezpieczenia mogą wyłączać komputer przy skokach poboru.',
          en: 'This supply does not meet ATX 3.1 and the card draws over 250 W. Its protection may shut the machine down on transient spikes.',
        },
      });
    }
  }

  /* ---- Graphics: discrete card or integrated ---- */
  if (cpu && !gpu && !cpu.integratedGraphics) {
    issues.push({
      level: 'error',
      categories: ['cpu', 'gpu'],
      message: {
        pl: `${cpu.name} nie ma grafiki zintegrowanej, a w zestawie nie ma karty graficznej. Nie uzyskasz obrazu.`,
        en: `The ${cpu.name} has no integrated graphics and no card is selected. You will get no display.`,
      },
    });
  }

  return {
    issues,
    buildable: !issues.some((issue) => issue.level === 'error'),
    power: { estimated, recommended },
  };
}

/** Picks the localised message from an issue. */
export function issueText(issue: CompatibilityIssue, locale: Locale): string {
  return issue.message[locale];
}
