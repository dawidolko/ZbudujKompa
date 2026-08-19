/**
 * Compatibility engine tests.
 *
 * The engine is what the configurator's advice rests on, so a silent
 * regression here would give readers confidently wrong answers about parts they
 * are about to buy. Pure logic, so no browser is needed.
 *
 *   node --experimental-strip-types tests/compatibility.spec.mjs
 */

const { checkCompatibility } = await import('../src/lib/parts/compatibility.ts');

/** [name, selection, expected buildable] */
const buildableCases = [
  [
    'a fully compatible AM5 build',
    {
      cpu: 'ryzen-7-7800x3d',
      motherboard: 'tuf-b650-plus-wifi',
      ram: 'flare-x5-32-6000',
      gpu: 'rtx-5070-ti',
      cooler: 'peerless-assassin-120',
      psu: 'pure-power-12m-750',
      case: 'north',
    },
    true,
  ],
  ['AM5 CPU on an LGA1851 board', { cpu: 'ryzen-7-7800x3d', motherboard: 'z890-tomahawk' }, false],
  [
    'DDR4 kit in a DDR5 board',
    { motherboard: 'tuf-b650-plus-wifi', ram: 'fury-beast-16-3200' },
    false,
  ],
  [
    'a 550 W supply under a 9950X and 5090',
    { cpu: 'ryzen-9-9950x', gpu: 'rtx-5090', psu: 'system-power-10-550' },
    false,
  ],
  [
    'a 168 mm cooler in a case allowing 77 mm',
    { case: 'terra', cooler: 'nh-d15-g2', cpu: 'ryzen-7-9700x' },
    false,
  ],
  ['a 336 mm card in a case allowing 322 mm', { case: 'terra', gpu: 'rtx-5090' }, false],
  ['an F-suffix CPU with no graphics card', { cpu: 'core-i5-14400f' }, false],
  ['an ATX board in a Mini-ITX case', { case: 'terra', motherboard: 'tuf-b650-plus-wifi' }, false],
  ['an ATX supply in an SFX-only case', { case: 'terra', psu: 'pure-power-12m-750' }, false],
  [
    'a 170 W CPU on a 130 W VRM board',
    { cpu: 'ryzen-9-9950x', motherboard: 'b650m-pro-rs' },
    false,
  ],
];

/** [name, selection, level that must appear] */
const levelCases = [
  [
    'a cooler below the CPU peak warns rather than blocking',
    { cpu: 'ryzen-9-9950x', cooler: 'peerless-assassin-120' },
    'warning',
  ],
  [
    'tall memory under a low-clearance cooler warns',
    { ram: 'fury-beast-32-6000', cooler: 'nh-d15-g2' },
    'warning',
  ],
  [
    'a matching socket is reported as fine',
    { cpu: 'ryzen-5-7600', motherboard: 'tuf-b650-plus-wifi' },
    'ok',
  ],
];

let passed = 0;
let failed = 0;

function report(ok, label, detail) {
  if (ok) passed++;
  else failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${ok ? '' : `  — ${detail}`}`);
}

for (const [label, selection, expected] of buildableCases) {
  const result = checkCompatibility(selection);
  report(result.buildable === expected, label, `buildable=${result.buildable}, wanted ${expected}`);
}

for (const [label, selection, level] of levelCases) {
  const result = checkCompatibility(selection);
  const found = result.issues.some((issue) => issue.level === level);
  report(found, label, `no ${level} issue was produced`);
}

/* Every issue must carry both languages: a missing translation would surface
   as an empty line in the interface rather than as a build error. */
const everyIssue = [...buildableCases, ...levelCases].flatMap(
  ([, selection]) => checkCompatibility(selection).issues,
);
const untranslated = everyIssue.filter((issue) => !issue.message.pl || !issue.message.en);
report(untranslated.length === 0, 'every issue is translated', `${untranslated.length} missing`);

/* The recommendation has to clear the estimate, or it is not a recommendation. */
const power = checkCompatibility({ cpu: 'ryzen-7-7800x3d', gpu: 'rtx-5070-ti' }).power;
report(
  power.recommended > power.estimated,
  'the recommended supply exceeds the estimated draw',
  `${power.recommended} vs ${power.estimated}`,
);

console.log(`\n${passed}/${passed + failed} passed`);
process.exit(failed > 0 ? 1 : 0);
