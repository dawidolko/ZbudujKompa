/**
 * Chat matcher tests.
 *
 * These exist because of a reported failure: "Ile RAM-u potrzebuję?" — one of
 * the assistant's own suggested questions — returned "I do not know".
 *
 * Two bugs caused it. The score was the keyword length alone, so a three-letter
 * keyword like "ram" could never reach the threshold however exactly it
 * matched; and matching ran against raw text, so a hyphen in "RAM-u" or a
 * trailing question mark blocked the match outright.
 *
 * The false-positive cases at the end matter as much as the rest: a matcher
 * loose enough to answer everything is worse than one that admits it does not
 * know, because it answers confidently and wrongly.
 *
 *   node tests/chat.spec.mjs
 */

const { findAnswer } = await import('../src/lib/chat/knowledge-base.ts');

/** [question, expected entry id or null for "no good answer"] */
const cases = [
  // Questions that must find an answer.
  ['Ile RAM-u potrzebuję?', 'memory'],
  ['ile ram', 'memory'],
  ['pamięć DDR5', 'memory'],
  ['czesc', 'greeting'],
  ['cześć!', 'greeting'],
  ['dzień dobry', 'greeting'],
  ['jaki zasilacz do RTX 5070?', 'psu'],
  ['Którą podstawkę wybrać?', 'socket-choice'],
  ['powietrze czy woda', 'cooling-choice'],
  ['jakie chłodzenie do ryzena', 'cooling-choice'],
  ['komputer nie startuje', 'wont-start'],
  ['jak nałożyć pastę?', 'thermal-paste'],
  ['AMD czy Intel', 'amd-vs-intel'],
  ['ile to kosztuje', 'budget'],
  ['czy to pasuje do mojej płyty', 'compatibility'],
  ['jak złożyć komputer', 'first-build'],

  // Off-topic questions must be refused rather than answered badly.
  ['jaki jest sens życia', null],
  ['pogoda jutro', null],
  // "ram" appears inside "program" — the prefix boundary must reject it.
  ['program telewizyjny', null],
];

/** The English side has to work too, not only Polish. */
const englishCases = [
  ['How much RAM do I need?', 'memory'],
  ['hello', 'greeting'],
  ['which socket should I choose', 'socket-choice'],
  ['air or liquid cooling', 'cooling-choice'],
  ['my pc will not start', 'wont-start'],
  ['what is the weather like', null],
];

let passed = 0;
let failed = 0;

function check(question, expected, locale) {
  const actual = findAnswer(question, locale)?.id ?? null;
  const ok = actual === expected;
  if (ok) passed++;
  else failed++;
  const label = `${locale}  ${JSON.stringify(question)}`.padEnd(44);
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${label} -> ${actual}${ok ? '' : `  (expected ${expected})`}`,
  );
}

for (const [question, expected] of cases) check(question, expected, 'pl');
for (const [question, expected] of englishCases) check(question, expected, 'en');

console.log(`\n${passed}/${passed + failed} passed`);
process.exit(failed > 0 ? 1 : 0);
