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
): { idleKwh: number; loadKwh: number; totalKwh: number; cost: number } {
  const idleKwh = (idleWatts / 1000) * idleHoursPerDay * 365;
  const loadKwh = (loadWatts / 1000) * loadHoursPerDay * 365;
  const totalKwh = idleKwh + loadKwh;
  return { idleKwh, loadKwh, totalKwh, cost: totalKwh * pricePerKwh };
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
 *   deltaT (°C) = watts / (1.78 * CFM)
 *
 * The constant comes from the specific heat and density of air at room
 * temperature. It gives the rise in the exhaust air, not component
 * temperatures — those depend on each cooler as well.
 */
export function airflowDeltaT(watts: number, cfm: number): number {
  if (cfm <= 0) return Infinity;
  return watts / (1.78 * cfm);
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
 * CPU temperature estimated from cooler thermal resistance.
 *
 *   temperature = ambient + watts * °C/W
 *
 * Thermal resistance is rarely published, so it is derived here from the
 * cooler's rated wattage against a nominal 60 °C rise. That makes this a
 * comparison between coolers rather than a prediction of a specific reading.
 */
export function estimateCpuTemp(
  watts: number,
  coolerRatedWatts: number,
  ambientC: number,
): number {
  const thermalResistance = 60 / coolerRatedWatts;
  return ambientC + watts * thermalResistance;
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
  const severity = Math.min(100, Math.round((Math.abs(difference) / Math.max(cpuScore, effectiveGpu)) * 100));

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
