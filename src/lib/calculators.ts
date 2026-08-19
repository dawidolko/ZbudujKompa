/**
 * Calculator formulas.
 *
 * Kept separate from the components so each formula can be tested directly,
 * without a browser. Every function here is pure: same inputs, same output, no
 * dependence on the DOM or on time.
 *
 * Where a formula is an approximation rather than physics, the comment says so.
 * A calculator that presents an estimate as a measurement is worse than no
 * calculator, because the reader has no way to know how much to trust it.
 */

/* =============================================================================
   Electricity
   ============================================================================= */

/**
 * Power drawn at the wall, given the supply's efficiency.
 *
 *   wall = dc / efficiency
 *
 * This is what the electricity meter records and the bill charges for. A build
 * pulling 400 W of DC through a 92 per cent supply costs as though it were
 * 435 W, and calculators that skip this step understate the running cost.
 */
export function wallPower(dcWatts: number, efficiency: number): number {
  if (efficiency <= 0) return dcWatts;
  return dcWatts / efficiency;
}

/**
 * Annual running cost.
 *
 *   cost = watts / 1000 * hours per day * days per year * price per kWh
 *
 * Exact arithmetic — the only uncertainty is in the inputs, since real draw
 * varies with load and the tariff may have day and night rates.
 */
export function annualEnergyCost(
  watts: number,
  hoursPerDay: number,
  pricePerKwh: number,
  daysPerYear = 365,
): { kwh: number; cost: number } {
  const kwh = (watts / 1000) * hoursPerDay * daysPerYear;
  return { kwh, cost: kwh * pricePerKwh };
}

/**
 * Running cost split between idle and load.
 *
 * More honest than a single average figure: a gaming machine spends most of its
 * time idling, and using peak draw for all of it overstates the bill severalfold.
 */
export function splitEnergyCost(
  idleWatts: number,
  loadWatts: number,
  loadHoursPerDay: number,
  idleHoursPerDay: number,
  pricePerKwh: number,
  /* Supply efficiency, as a fraction. The meter records what enters the power
     supply, not what leaves it, so the bill is for the DC draw divided by
     efficiency — a 400 W build on a 90 per cent unit is charged as 444 W.
     Most calculators of this kind skip this step and understate the cost by
     around a tenth. */
  efficiency = 0.9,
): {
  idleKwh: number;
  loadKwh: number;
  totalKwh: number;
  cost: number;
  wallIdle: number;
  wallLoad: number;
} {
  const wallIdle = wallPower(idleWatts, efficiency);
  const wallLoad = wallPower(loadWatts, efficiency);

  const idleKwh = (wallIdle / 1000) * idleHoursPerDay * 365;
  const loadKwh = (wallLoad / 1000) * loadHoursPerDay * 365;
  const totalKwh = idleKwh + loadKwh;

  return { idleKwh, loadKwh, totalKwh, cost: totalKwh * pricePerKwh, wallIdle, wallLoad };
}

/* =============================================================================
   Display
   ============================================================================= */

/**
 * Pixels per inch.
 *
 *   ppi = sqrt(width^2 + height^2) / diagonal
 *
 * Exact geometry, assuming square pixels — true of every desktop monitor.
 */
export function pixelsPerInch(width: number, height: number, diagonalInches: number): number {
  return Math.sqrt(width ** 2 + height ** 2) / diagonalInches;
}

/**
 * Physical dimensions of a screen from its diagonal and aspect ratio.
 *
 * Useful because monitors are sold by diagonal, while desk space is limited by
 * width — and the two diverge sharply between 16:9 and 21:9.
 */
export function screenDimensions(
  diagonalInches: number,
  aspectWidth: number,
  aspectHeight: number,
): { width: number; height: number } {
  const ratio = Math.sqrt(aspectWidth ** 2 + aspectHeight ** 2);
  return {
    width: (diagonalInches * aspectWidth) / ratio,
    height: (diagonalInches * aspectHeight) / ratio,
  };
}

/**
 * Viewing distance at which individual pixels stop being resolvable.
 *
 * Based on one arcminute of visual acuity, the standard figure for 20/20
 * vision:
 *
 *   distance (inches) = 1 / (ppi * tan(1 arcminute))
 *
 * This is a threshold for a typical eye, not a recommendation — acuity varies
 * between people, and plenty sit closer without complaint.
 */
export function retinaDistance(ppi: number): number {
  const oneArcminuteInRadians = (1 / 60) * (Math.PI / 180);
  return 1 / (ppi * Math.tan(oneArcminuteInRadians));
}

/* =============================================================================
   Memory
   ============================================================================= */

/**
 * True latency of a memory kit, in nanoseconds.
 *
 *   ns = CL / (transfers per second / 2) * 1e9  =  CL * 2000 / speed
 *
 * This is the number that lets DDR4 and DDR5 be compared. A DDR5-6000 CL30 kit
 * and a DDR4-3600 CL18 kit both land at 10 ns, which is why a higher CAS number
 * on DDR5 does not mean it is slower — the clock is faster in proportion.
 */
export function memoryLatencyNs(speedMts: number, casLatency: number): number {
  return (casLatency * 2000) / speedMts;
}

/**
 * Theoretical peak memory bandwidth, in GB/s.
 *
 *   bandwidth = transfers/s * bus width (8 bytes) * channels
 *
 * Theoretical is the operative word: real throughput is meaningfully lower,
 * because it ignores refresh cycles, bank conflicts and controller overhead.
 * It is useful for comparing configurations, not for predicting a benchmark.
 */
export function memoryBandwidth(speedMts: number, channels: number): number {
  return (speedMts * 8 * channels) / 1000;
}

/* =============================================================================
   Acoustics
   ============================================================================= */

/**
 * Combined level of several noise sources, in dBA.
 *
 *   total = 10 * log10( sum of 10^(level/10) )
 *
 * Decibels are logarithmic, so they cannot be added: two identical 30 dBA fans
 * produce 33 dBA, not 60. This is the single most misunderstood figure in fan
 * selection, which is why the calculator shows the arithmetic.
 *
 * The result is an upper bound. Real cases attenuate some of it, and sources
 * that are out of phase can partially cancel.
 */
export function combineDecibels(levels: number[]): number {
  if (levels.length === 0) return 0;
  const summed = levels.reduce((total, level) => total + 10 ** (level / 10), 0);
  return 10 * Math.log10(summed);
}

/**
 * How much louder one level is perceived to be than another.
 *
 * The rule of thumb is that +10 dB is heard as roughly twice as loud, which
 * gives 2^(difference / 10). It is a psychoacoustic approximation and varies
 * with frequency and level, so it should be read as "about twice", never as a
 * measurement.
 */
export function perceivedLoudnessRatio(fromDb: number, toDb: number): number {
  return 2 ** ((toDb - fromDb) / 10);
}

/* =============================================================================
   Airflow
   ============================================================================= */

/**
 * Airflow needed to exchange the case volume a given number of times a minute.
 *
 *   CFM = volume in cubic feet * air changes per minute
 *
 * The theory is exact; applying it to a PC case is not. Real airflow is far
 * below a fan's rated CFM, because that figure is measured with no restriction
 * at all — filters, radiators and the components themselves all reduce it.
 * Treat the result as a lower bound on the fans you need.
 */
export function requiredAirflow(volumeLitres: number, changesPerMinute: number): number {
  const cubicFeet = volumeLitres * 0.0353147;
  return cubicFeet * changesPerMinute;
}

/**
 * Air temperature rise across a case, from the heat it has to carry away.
 *
 *   deltaT (°C) = watts / (0.5692 * CFM)
 *
 * Derived from Q = m_dot * cp * deltaT. One CFM is 4.719e-4 m³/s; at an air
 * density of 1.2 kg/m³ and a specific heat of 1005 J/(kg·K), one CFM carries
 * 0.5692 W for each degree of rise.
 *
 * The result is the rise in the exhaust air, not a component temperature —
 * those depend on each cooler as well. It is also a floor rather than a
 * prediction: fan CFM ratings are measured with no restriction at all, and
 * filters, radiators and the components themselves all reduce real flow well
 * below the rated figure.
 */
const WATTS_PER_CFM_PER_KELVIN = 0.5692;

export function airflowDeltaT(watts: number, cfm: number): number {
  if (cfm <= 0) return Infinity;
  return watts / (WATTS_PER_CFM_PER_KELVIN * cfm);
}

/* =============================================================================
   Storage
   ============================================================================= */

/** Usable capacity after the decimal-to-binary conversion vendors rely on. */
export function usableCapacity(advertisedGb: number): number {
  /* Manufacturers count 1 GB as 1,000,000,000 bytes while operating systems
     divide by 1024 three times. The "missing" 7 per cent is arithmetic, not a
     defect — which is what this calculator exists to show. */
  return (advertisedGb * 1_000_000_000) / 1024 ** 3;
}

/** How many items of a given average size fit in a capacity. */
export function itemsThatFit(capacityGb: number, itemSizeGb: number): number {
  if (itemSizeGb <= 0) return 0;
  return Math.floor(usableCapacity(capacityGb) / itemSizeGb);
}

/**
 * Time to transfer a quantity of data at a sustained rate.
 *
 * Sustained is the important word: NVMe drives write into a fast SLC cache
 * first and slow down sharply once it is full, so a large transfer takes
 * considerably longer than the headline figure suggests.
 */
export function transferTime(sizeGb: number, speedMbs: number): number {
  if (speedMbs <= 0) return Infinity;
  return (sizeGb * 1024) / speedMbs;
}

/* =============================================================================
   Thermals and performance
   ============================================================================= */

/**
 * CPU temperature from a cooler's thermal resistance.
 *
 *   temperature = ambient + watts * °C/W
 *
 * Thermal resistance is the input rather than something derived from a
 * cooler's "TDP rating": those ratings have no standard behind them, and
 * turning one into a °C/W figure would invent a number and present it as
 * physics. Where a manufacturer publishes °C/W, or a review measures it, this
 * gives a real answer; without one it should not be used at all.
 */
export function cpuTempFromResistance(
  watts: number,
  thermalResistanceCPerW: number,
  ambientC: number,
): number {
  return ambientC + watts * thermalResistanceCPerW;
}

/**
 * Frame time in milliseconds for a given frame rate.
 *
 *   ms = 1000 / fps
 *
 * Worth showing because the returns diminish steeply: 60 to 120 fps removes
 * 8.3 ms, while 240 to 360 removes only 1.4 ms for the same 120-frame step.
 */
export function frameTime(fps: number): number {
  return 1000 / fps;
}

/**
 * Which component limits a pairing, and by roughly how much.
 *
 * A deliberately crude model, and labelled as such wherever it is shown. Real
 * bottlenecks depend on the specific game, the settings and the resolution;
 * anything presenting a single percentage as fact is overselling. The value
 * here is the direction, not the number.
 */
export function estimateBottleneck(
  cpuScore: number,
  gpuScore: number,
  resolution: '1080p' | '1440p' | '4K',
): { limitedBy: 'cpu' | 'gpu' | 'balanced'; severity: number } {
  /* Higher resolutions shift load onto the graphics card, so the same pairing
     is progressively less CPU-limited as resolution rises. */
  const gpuWeight = { '1080p': 0.75, '1440p': 1.0, '4K': 1.35 }[resolution];
  const effectiveGpu = gpuScore / gpuWeight;

  const difference = cpuScore - effectiveGpu;
  const severity = Math.min(
    100,
    Math.round((Math.abs(difference) / Math.max(cpuScore, effectiveGpu)) * 100),
  );

  if (severity < 12) return { limitedBy: 'balanced', severity };
  return { limitedBy: difference > 0 ? 'gpu' : 'cpu', severity };
}

/* =============================================================================
   Power connectors
   ============================================================================= */

/**
 * The power connectors a build needs.
 *
 * Counting these matters because a supply can have ample wattage and still lack
 * the right cables — a 750 W unit with two PCIe connectors cannot power a card
 * that needs three, and the wattage figure gives no hint of that.
 */
export function requiredConnectors(gpuWatts: number, driveCount: number, fanCount: number) {
  /* Each 8-pin PCIe connector is rated for 150 W, and the slot itself supplies
     75 W. Cards above roughly 300 W generally use the 12V-2x6 connector
     instead of multiple 8-pins. */
  const fromSlot = 75;
  const pcie8pin = gpuWatts <= fromSlot ? 0 : Math.ceil((gpuWatts - fromSlot) / 150);

  return {
    eps8pin: 1,
    pcie8pin,
    uses12vhpwr: gpuWatts > 300,
    sata: driveCount,
    /* Fan headers on a board are limited; beyond four, a hub is usually needed. */
    needsFanHub: fanCount > 4,
  };
}

/* =============================================================================
   Fan laws
   ============================================================================= */

/**
 * How a fan behaves at a different speed.
 *
 * The affinity laws, which hold well for a fan in a fixed system:
 *   airflow    ∝ rpm
 *   pressure   ∝ rpm²
 *   power      ∝ rpm³
 *   noise      ≈ 50 · log10(rpm ratio) dB
 *
 * This is the most actionable relationship in fan selection: dropping to 70 per
 * cent speed keeps 70 per cent of the airflow while cutting noise by about
 * 7.7 dB — a change that is clearly audible where the airflow loss usually is
 * not.
 */
export function fanAtSpeed(
  ratedRpm: number,
  ratedCfm: number,
  ratedNoise: number,
  targetRpm: number,
): { cfm: number; noise: number; relativePower: number } {
  if (ratedRpm <= 0) return { cfm: 0, noise: 0, relativePower: 0 };
  const ratio = targetRpm / ratedRpm;

  return {
    cfm: ratedCfm * ratio,
    /* log10(0) is -Infinity, so a stopped fan is reported as silent rather
       than as a nonsensical negative level. */
    noise: ratio <= 0 ? 0 : Math.max(0, ratedNoise + 50 * Math.log10(ratio)),
    relativePower: ratio ** 3,
  };
}

/**
 * Sound level at a different distance, in free field.
 *
 *   L2 = L1 − 20 · log10(d2 / d1)
 *
 * Worth knowing because manufacturers rate fans at different distances — one
 * at 1 m, another at 0.5 m — and that difference alone accounts for much of
 * the disagreement between spec sheets. Free field is an idealisation; a real
 * room reflects some sound back.
 */
export function noiseAtDistance(level: number, fromMetres: number, toMetres: number): number {
  if (fromMetres <= 0 || toMetres <= 0) return level;
  return level - 20 * Math.log10(toMetres / fromMetres);
}

/* =============================================================================
   Interface bandwidth
   ============================================================================= */

/** Usable bandwidth per PCIe lane, in GB/s, after line coding. */
const PCIE_LANE_GBPS: Record<3 | 4 | 5, number> = {
  /* Gen 3 onwards use 128b/130b encoding, so the overhead is about 1.5 per
     cent rather than the 20 per cent of the older 8b/10b scheme. */
  3: 0.985,
  4: 1.969,
  5: 3.938,
};

export function pcieBandwidth(generation: 3 | 4 | 5, lanes: number): number {
  return PCIE_LANE_GBPS[generation] * lanes;
}

/**
 * Data rate a display mode requires, in Gbps.
 *
 *   rate = width · height · refresh · bits per pixel · blanking overhead
 *
 * The 1.02 factor covers CVT reduced blanking. The result is the payload, so
 * it is compared against a cable's *effective* rate rather than its headline
 * signalling rate — the difference between the two is exactly why 4K at 144 Hz
 * needs compression on DisplayPort 1.4.
 */
export function displayBandwidth(
  width: number,
  height: number,
  refreshHz: number,
  bitsPerChannel: number,
): number {
  const bitsPerPixel = bitsPerChannel * 3;
  return (width * height * refreshHz * bitsPerPixel * 1.02) / 1_000_000_000;
}

/** Effective payload rates of the common display interfaces, in Gbps. */
export const DISPLAY_INTERFACES = {
  'hdmi-2.0': { label: 'HDMI 2.0', effective: 14.4 },
  'hdmi-2.1': { label: 'HDMI 2.1 (FRL6)', effective: 42.67 },
  'dp-1.2': { label: 'DisplayPort 1.2', effective: 17.28 },
  'dp-1.4': { label: 'DisplayPort 1.4 (HBR3)', effective: 25.92 },
  'dp-2.1': { label: 'DisplayPort 2.1 (UHBR20)', effective: 77.37 },
} as const;

/* =============================================================================
   Power supply behaviour
   ============================================================================= */

/**
 * Typical efficiency of each 80 Plus grade at about half load.
 *
 * Half load is where these units are most efficient and where a desktop
 * spends most of its time, so it is the fairest single figure to compare.
 */
export const PSU_EFFICIENCY = {
  Bronze: 0.85,
  Gold: 0.9,
  Platinum: 0.92,
  Titanium: 0.94,
} as const;

/* =============================================================================
   Drive endurance
   ============================================================================= */

/**
 * How long a drive's write endurance lasts at a given daily write rate.
 *
 * Included mainly because the worry is usually misplaced: a 600 TBW drive
 * written at 50 GB a day lasts about 33 years, which is far longer than anyone
 * keeps a drive.
 */
export function driveLifespanYears(tbw: number, gbPerDay: number): number {
  if (gbPerDay <= 0) return Infinity;
  return (tbw * 1000) / gbPerDay / 365;
}

/**
 * Memory access latency for the three row states.
 *
 * The CAS figure everyone quotes is the *best* case — the row is already open
 * and only the column access is paid for. Random access, which is what games
 * do, frequently lands on a different row and pays two or three times as much:
 *
 *   page hit    CL                 the row is already open
 *   page empty  tRCD + CL          no row is open, one must be activated
 *   page miss   tRP + tRCD + CL    the wrong row is open and must be closed
 *
 * tRAS is deliberately absent. It constrains how soon a row may be closed
 * again, not how long a read waits, and adding it — as many calculators do —
 * inflates the figure for no reason.
 *
 * None of these is the latency a program actually sees: caches, the memory
 * controller queue and the interconnect add far more, which is why a measured
 * figure is 60–90 ns where the first word arrives in 10.
 */
export function memoryLatencyDetail(
  speedMts: number,
  cl: number,
  trcd: number,
  trp: number,
): { clockNs: number; pageHit: number; pageEmpty: number; pageMiss: number } {
  const clockNs = 2000 / speedMts;
  return {
    clockNs,
    pageHit: cl * clockNs,
    pageEmpty: (trcd + cl) * clockNs,
    pageMiss: (trp + trcd + cl) * clockNs,
  };
}

/**
 * Whether a display mode fits an interface, and what compression would be
 * needed if it does not.
 *
 * Compares against the *effective* payload rate rather than the headline
 * signalling rate. The gap between the two is exactly why 4K at 144 Hz needs
 * compression on DisplayPort 1.4 but not on HDMI 2.1 — a result that surprises
 * people looking only at the marketing numbers.
 *
 * DSC is capped at 3:1 here. VESA describes it as visually lossless, which is
 * a claim validated by subjective testing rather than a mathematical
 * guarantee — it is still lossy compression.
 */
export function checkDisplayLink(
  required: number,
  interfaceGbps: number,
): { fits: boolean; withDsc: boolean; ratioNeeded: number } {
  const ratioNeeded = required / interfaceGbps;
  return {
    fits: required <= interfaceGbps,
    withDsc: ratioNeeded <= 3,
    ratioNeeded,
  };
}
