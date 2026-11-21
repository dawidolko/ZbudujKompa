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
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${label}${ok ? '' : `  — got ${actual}, wanted ${expected}`}`,
  );
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
/* Derived from Q = m_dot * cp * deltaT rather than copied from the
   implementation, so the test would catch the constant being misplaced —
   which it previously was, understating the rise threefold. */
check('400 W at 50 CFM raises air by 14.06 °C', c.airflowDeltaT(400, 50), 14.06);
check('300 W at 60 CFM raises air by 8.78 °C', c.airflowDeltaT(300, 60), 8.78);
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

/* ---- Fan laws: the biggest lever for a quiet machine ---- */
const slowed = c.fanAtSpeed(1500, 60, 30, 1050);
check('70% speed keeps 70% of the airflow', slowed.cfm, 42);
check('but costs about 8 dB', 30 - slowed.noise, 7.75, 0.05);
check('and a third of the power', slowed.relativePower, 0.343, 0.005);
check('a fan at rated speed is unchanged', c.fanAtSpeed(1500, 60, 30, 1500).noise, 30);

/* ---- Distance: vendors rate at different distances, which explains much
       of the disagreement between spec sheets ---- */
check('halving the distance adds 6 dB', c.noiseAtDistance(25, 1, 0.5), 31.02);
check('doubling the distance removes 6 dB', c.noiseAtDistance(25, 1, 2), 18.98);

/* ---- Interface bandwidth ---- */
check('PCIe 4.0 x4 is 7.88 GB/s', c.pcieBandwidth(4, 4), 7.877, 0.01);
check('PCIe 5.0 x16 is 63 GB/s', c.pcieBandwidth(5, 16), 63.01, 0.01);

/* The known real-world result: 4K at 144 Hz needs compression on
   DisplayPort 1.4 but fits uncompressed over HDMI 2.1. */
const uhd144 = c.displayBandwidth(3840, 2160, 144, 8);
/* CVT-RB2 timing for 3840x2160 at 144 Hz is 3920 x 2314 total, a 1306 MHz
   pixel clock: 31.35 Gbps at 24 bits per pixel. */
check('4K 144 Hz needs about 31.3 Gbps', uhd144, 31.35, 0.05);
check(
  '4K 120 Hz at 8 bits still fits DisplayPort 1.4 uncompressed',
  c.checkDisplayLink(
    c.displayBandwidth(3840, 2160, 120, 8),
    c.DISPLAY_INTERFACES['dp-1.4'].effective,
  ).fits,
  true,
);
check(
  'which does not fit DisplayPort 1.4',
  c.checkDisplayLink(uhd144, c.DISPLAY_INTERFACES['dp-1.4'].effective).fits,
  false,
);
check(
  'but is within reach of DSC',
  c.checkDisplayLink(uhd144, c.DISPLAY_INTERFACES['dp-1.4'].effective).withDsc,
  true,
);
check(
  'and fits HDMI 2.1 uncompressed',
  c.checkDisplayLink(uhd144, c.DISPLAY_INTERFACES['hdmi-2.1'].effective).fits,
  true,
);

/* ---- Supply efficiency: the meter reads the wall, not the components ---- */
check('400 W DC through a 90% supply is 444 W at the wall', c.wallPower(400, 0.9), 444.44, 0.01);
check(
  'ignoring efficiency understates the bill by about a tenth',
  c.splitEnergyCost(60, 400, 3, 5, 1, 0.9).cost / c.splitEnergyCost(60, 400, 3, 5, 1, 1).cost,
  1.111,
  0.002,
);

/* ---- Memory: the quoted CAS figure is the best case, not the usual one ---- */
const detail = c.memoryLatencyDetail(6000, 30, 38, 38);
check('a DDR5-6000 clock is 0.333 ns', detail.clockNs, 0.333, 0.001);
check('a page hit costs the CAS figure', detail.pageHit, 10);
check(
  'a page miss costs three and a half times as much',
  detail.pageMiss / detail.pageHit,
  3.53,
  0.02,
);

/* ---- Drive endurance: the worry is usually misplaced ---- */
check('600 TBW at 50 GB a day lasts 33 years', c.driveLifespanYears(600, 50), 32.88, 0.02);

/* ---- Clearance: parts that each fit can still fail together ---- */
const clear = { maxGpuLength: 330, maxCoolerHeight: 170, gpuLength: 304, coolerHeight: 160 };
check(
  'a 304 mm card fits a 330 mm case',
  c.checkClearance({ ...clear, frontRadiator: false }).gpuFits,
  true,
);
check(
  'but not once a front radiator takes 55 mm',
  c.checkClearance({ ...clear, frontRadiator: true }).gpuFits,
  false,
);
check(
  'which drops the usable length to 275 mm',
  c.checkClearance({ ...clear, frontRadiator: true }).effectiveGpuLimit,
  275,
);

/* ---- Fan headers ---- */
check('seven fans on four headers is three short', c.fanHeaderPlan(7, 4).shortfall, 3);
check('four fans on four headers needs nothing', c.fanHeaderPlan(4, 4).needsHelp, false);

/* ---- Supply sizing: the standard changes the answer ---- */
const big = { cpuPeakWatts: 230, gpuWatts: 575, otherWatts: 90 };
check('a 5090 build estimates at 895 W', c.sizePowerSupply({ ...big, atx3x: true }).estimated, 895);
check(
  'with a transient peak near 1240 W',
  c.sizePowerSupply({ ...big, atx3x: true }).transientPeak,
  1240,
);
check(
  'an ATX 3.x supply needs 1200 W',
  c.sizePowerSupply({ ...big, atx3x: true }).recommended,
  1200,
);
check('an older one needs 1500 W', c.sizePowerSupply({ ...big, atx3x: false }).recommended, 1500);
check(
  'and says the transient is why',
  c.sizePowerSupply({ ...big, atx3x: false }).reason,
  'transient',
);

/* ---- Thermals: the two contributions are separable ---- */
const warm = c.estimateLoadTemp({ watts: 150, roomC: 22, airflow: 'typical', cooler: 'dualTower' });
check('150 W on a dual tower sits at 55 °C', Math.round(warm.temperature), 55);
check('and does not throttle', warm.throttles, false);
const cooked = c.estimateLoadTemp({
  watts: 250,
  roomC: 25,
  airflow: 'restricted',
  cooler: 'boxed',
});
check('250 W on a boxed cooler throttles', cooked.throttles, true);

/* ---- Frames against refresh rate ---- */
check('90 fps on a 240 Hz panel shows 90', c.displayedFrames(90, 240).shown, 90);
check('and uses 37.5% of the panel', c.displayedFrames(90, 240).utilisation, 37.5);
check('300 fps on 144 Hz shows 144', c.displayedFrames(300, 144).shown, 144);
check('and discards 156', c.displayedFrames(300, 144).wasted, 156);

/* ---- M.2 slots: the silent mistake ---- */
check('a Gen 5 drive in a Gen 3 slot is limited', c.m2SlotCheck(5, 3, 4).limited, true);
check('a Gen 4 drive in a Gen 4 slot is not', c.m2SlotCheck(4, 4, 4).limited, false);
check('a Gen 4 drive on two lanes is limited', c.m2SlotCheck(4, 4, 2).limited, true);

/* ---- Upgrade value ---- */
check('a 15% gain counts as worthwhile', c.upgradeValue(100, 115, 1000).worthwhile, true);
check('a 10% gain does not', c.upgradeValue(100, 110, 1000).worthwhile, false);

/* ---- Network transfer uses effective, not nominal, throughput ---- */
check('50 GB over gigabit takes 512 s', Math.round(c.networkTransferTime(50, 1000).seconds), 512);

/* ---- Connectors from the catalogue win over the wattage estimate ---- */
const fromSpec = c.requiredConnectors(300, 0, 3, {
  connector: '12v-2x6',
  pcie8pin: 2,
  cableRating: 300,
});
check('a 300 W card with a 16-pin socket uses 12V-2x6', fromSpec.uses12vhpwr, true);
check('and takes two 8-pin plugs into its adapter', fromSpec.pcie8pin, 2);
check('and names the minimum cable rating', fromSpec.cableRating, 300);
check('and says the figure is the vendor’s', fromSpec.fromCatalogue, true);
check(
  'the estimate alone would not have predicted 12V-2x6',
  c.requiredConnectors(300, 0, 3).uses12vhpwr,
  false,
);
check(
  'an 8-pin card keeps its own plug count',
  c.requiredConnectors(304, 0, 3, { connector: '8pin', pcie8pin: 2 }).pcie8pin,
  2,
);

/* ---- Power breakdown: every item is counted at its published figure ---- */
const typical = c.buildPowerBreakdown({
  cpuWatts: 162,
  gpuWatts: 300,
  chipset: 'amd',
  ramModules: 2,
  mainDriveWatts: 8.5,
  nvme: 0,
  sataSsd: 1,
  hdd: 2,
  fans: 4,
  pumps: 1,
  rgbLeds: 20,
  usbDevices: 2,
});
/* 162 + 300 + 7 + 2×5 + 8.5 + 2.5 + 2×10.1 + 4×1.68 + 4.2 + 20×0.18 + 2×4.5 */
check('the breakdown sums every item', typical.total, 533.72, 0.01);
check('and reports the rest rounded up', typical.other, 72);
check(
  'empty categories are left out',
  typical.items.some((item) => item.key === 'nvme'),
  false,
);
check(
  'two hard drives are one row of two',
  typical.items.find((item) => item.key === 'hdd')?.count,
  2,
);
check(
  'a dual-chipset AMD board counts 14 W',
  c
    .buildPowerBreakdown({ ...c.TYPICAL_BUILD, cpuWatts: 100, gpuWatts: 0, chipset: 'amd-dual' })
    .items.find((item) => item.key === 'board')?.watts,
  14,
);
check(
  'a card at 0 W (integrated graphics) has no row',
  c
    .buildPowerBreakdown({ ...c.TYPICAL_BUILD, cpuWatts: 100, gpuWatts: 0 })
    .items.some((item) => item.key === 'gpu'),
  false,
);
const sized = c.sizePowerSupply({
  cpuPeakWatts: 162,
  gpuWatts: 300,
  otherWatts: typical.other,
  atx3x: true,
});
check('the breakdown feeds the supply sizing', sized.estimated, 534);
check('534 W with 30% headroom needs a 750 W unit', sized.recommended, 750);

/* ---- Catalogue to calculator inputs ---- */
const parts = await import('../src/lib/parts/index.ts');
const inputs = await import('../src/lib/parts/calculator-inputs.ts');
const saved = await import('../src/lib/parts/saved-build.ts');
const board = (id) => parts.motherboards.find((item) => item.id === id);
const cooler = (id) => parts.coolers.find((item) => item.id === id);

check(
  'X870E counts as two AMD chipsets',
  inputs.chipsetClassOf(board('x870e-tomahawk')),
  'amd-dual',
);
check('B650 counts as one AMD chipset', inputs.chipsetClassOf(board('b650m-pro-rs')), 'amd');
check('B550 on AM4 counts as one AMD chipset', inputs.chipsetClassOf(board('b550-a-pro')), 'amd');
check('Z890 counts as an Intel chipset', inputs.chipsetClassOf(board('z890-tomahawk')), 'intel');
check(
  'a dual tower maps to the dual-tower class',
  inputs.thermalCoolerClass(cooler('nh-d15-g2')),
  'dualTower',
);
check(
  'a single tower maps to its class',
  inputs.thermalCoolerClass(cooler('nh-u12a')),
  'singleTower',
);
check('a low-profile cooler maps to boxed', inputs.thermalCoolerClass(cooler('nh-l12s')), 'boxed');
check(
  'a 420 mm AiO maps to the 360 class',
  inputs.thermalCoolerClass(cooler('liquid-freezer-iii-420')),
  'aio360',
);
check(
  'a 240 mm AiO maps to the 240 class',
  inputs.thermalCoolerClass(cooler('liquid-freezer-iii-240')),
  'aio240',
);
check('a Gen 5 drive belongs in the Gen 5 slot', inputs.bestM2Slot(board('b650m-pro-rs'), 5), 0);
check(
  'a Gen 5 drive has no full-speed slot on an A620',
  inputs.bestM2Slot(board('a620m-hdv'), 5),
  -1,
);
check(
  'the brand is not repeated in a label',
  inputs.partLabel({ brand: 'AMD', name: 'AMD Wraith' }),
  'AMD Wraith',
);

const loaded = inputs.buildParts({
  cpu: 'ryzen-7-7800x3d',
  gpu: 'rtx-5070-ti',
  psu: 'no-such-psu',
});
check('a build resolves its parts', loaded.cpu?.peakPower, 162);
check('and a part id that no longer exists is dropped', loaded.psu, undefined);

/* ---- The saved configurator build is validated on the way back in ---- */
check('nothing saved reads as no build', saved.parseSavedBuild(null), null);
check('broken JSON reads as no build', saved.parseSavedBuild('{oops'), null);
check(
  'a part saved under the wrong category is dropped',
  JSON.stringify(saved.parseSavedBuild('{"cpu":"rtx-5090","gpu":"rtx-5090"}')),
  '{"gpu":"rtx-5090"}',
);
check('a build of unknown parts reads as no build', saved.parseSavedBuild('{"cpu":"nope"}'), null);

/* ---- Catalogue data the calculators rely on ---- */
for (const gpu of parts.gpus) {
  check(`${gpu.id}: connector source is a vendor page`, /^https:\/\//.test(gpu.power.source), true);
  /* Each 8-pin carries 150 W and the slot 75 W, so the plugs a vendor lists
     must cover the card's board power. */
  check(
    `${gpu.id}: its 8-pin plugs cover its board power`,
    gpu.power.pcie8pin * 150 + 75 >= gpu.tdp,
    true,
  );
}
for (const item of parts.motherboards) {
  check(`${item.id}: M.2 list matches the slot count`, item.m2.length, item.m2Slots);
  check(
    `${item.id}: has fan headers and a spec source`,
    item.fanHeaders > 0 && /^https:\/\//.test(item.specSource),
    true,
  );
}
for (const drive of parts.storage) {
  if (drive.power !== undefined) {
    check(
      `${drive.id}: a power figure has a source`,
      /^https:\/\//.test(drive.powerSource ?? ''),
      true,
    );
  }
}

console.log(`\n${passed}/${passed + failed} passed`);
process.exit(failed > 0 ? 1 : 0);
