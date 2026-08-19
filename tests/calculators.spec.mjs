/**
 * Calculator formula tests.
 *
 * Each case checks a formula against a figure that can be verified
 * independently — a 27-inch 1440p panel is documented at 108.79 PPI, two equal
 * noise sources add 3 dB, and DDR5-6000 CL30 works out to exactly 10 ns. A
 * calculator that silently drifts would hand readers wrong numbers with no
 * outward sign, so these are worth pinning.
 *
 *   node --experimental-strip-types tests/calculators.spec.mjs
 */

const c = await import('../src/lib/calculators.ts');

let passed = 0;
let failed = 0;

function check(label, actual, expected, tolerance = 0.02) {
  /* Identity is checked first so non-finite values — Infinity above all —
     compare correctly; a tolerance test on them yields NaN and never passes. */
  const ok =
    actual === expected ||
    (typeof expected === 'number' &&
      Number.isFinite(expected) &&
      Math.abs(actual - expected) <= tolerance);
  if (ok) passed++;
  else failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${ok ? '' : `  — got ${actual}, wanted ${expected}`}`);
}

/* ---- Acoustics: decibels are logarithmic and cannot be added ---- */
check('two 30 dBA fans combine to 33 dBA', c.combineDecibels([30, 30]), 33.01);
check('ten 30 dBA fans combine to 40 dBA', c.combineDecibels(Array(10).fill(30)), 40);
check('a single source is unchanged', c.combineDecibels([28]), 28);
check('no sources is silence', c.combineDecibels([]), 0);
check('+10 dB is heard as about twice as loud', c.perceivedLoudnessRatio(30, 40), 2);

/* ---- Memory: the DDR4/DDR5 equivalence that confuses everyone ---- */
check('DDR5-6000 CL30 is 10 ns', c.memoryLatencyNs(6000, 30), 10);
check('DDR4-3600 CL18 is 10 ns', c.memoryLatencyNs(3600, 18), 10);
check('DDR4-3200 CL16 is 10 ns', c.memoryLatencyNs(3200, 16), 10);
check('DDR5-6000 dual channel is 96 GB/s', c.memoryBandwidth(6000, 2), 96, 0.1);
check('single channel is half the bandwidth', c.memoryBandwidth(6000, 1), 48, 0.1);

/* ---- Display geometry ---- */
check('27-inch 1440p is 108.79 PPI', c.pixelsPerInch(2560, 1440, 27), 108.79);
check('24-inch 1080p is 91.79 PPI', c.pixelsPerInch(1920, 1080, 24), 91.79);
check('27-inch 4K is 163.18 PPI', c.pixelsPerInch(3840, 2160, 27), 163.18);
check('a 27-inch 16:9 panel is 23.53 inches wide', c.screenDimensions(27, 16, 9).width, 23.53);
/* Marketing calls these 21:9 but the real ratio is 43:18, which is what the
   panel actually measures — 31.25 inches wide rather than 31.36. */
check('a 34-inch ultrawide is 31.25 inches wide', c.screenDimensions(34, 21, 9).width, 31.25);

/* ---- Storage: the "missing" capacity is arithmetic, not a defect ---- */
check('1 TB advertised is 931.32 GiB usable', c.usableCapacity(1000), 931.32);
check('2 TB advertised is 1862.65 GiB usable', c.usableCapacity(2000), 1862.65);
check('120 GB at 60 GB each fits one item', c.itemsThatFit(120, 60), 1);

/* ---- Frame timing ---- */
check('60 fps is 16.67 ms per frame', c.frameTime(60), 16.67);
check('144 fps is 6.94 ms per frame', c.frameTime(144), 6.94);
check('240 fps is 4.17 ms per frame', c.frameTime(240), 4.17);

/* ---- Electricity ---- */
check('100 W for 8 h a day is 292 kWh a year', c.annualEnergyCost(100, 8, 1).kwh, 292);
check('and costs 292 at 1 per kWh', c.annualEnergyCost(100, 8, 1).cost, 292);

/* ---- Airflow ---- */
check('400 W at 50 CFM raises air by 4.49 °C', c.airflowDeltaT(400, 50), 4.49);
check('no airflow means an unbounded rise', c.airflowDeltaT(400, 0), Infinity);

/* ---- Connectors: wattage alone does not tell you the cables ---- */
const heavy = c.requiredConnectors(450, 3, 6);
check('a 450 W card needs three 8-pin connectors', heavy.pcie8pin, 3);
check('and uses the 12V-2x6 connector', heavy.uses12vhpwr, true);
check('and needs a fan hub past four fans', heavy.needsFanHub, true);
check('a 75 W card needs no PCIe cable', c.requiredConnectors(75, 1, 2).pcie8pin, 0);

/* ---- Bottleneck: direction matters, the number is an estimate ---- */
check(
  'a weak CPU with a strong GPU is CPU-limited at 1080p',
  c.estimateBottleneck(40, 90, '1080p').limitedBy,
  'cpu',
);
check(
  'the same pairing is less CPU-limited at 4K',
  c.estimateBottleneck(40, 90, '4K').severity < c.estimateBottleneck(40, 90, '1080p').severity,
  true,
);
check(
  'a matched pairing reads as balanced',
  c.estimateBottleneck(80, 80, '1440p').limitedBy,
  'balanced',
);

console.log(`\n${passed}/${passed + failed} passed`);
process.exit(failed > 0 ? 1 : 0);
