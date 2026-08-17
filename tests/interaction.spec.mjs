import { chromium } from 'playwright';

/**
 * Interaction tests.
 *
 * Covers the behaviour an accessibility scanner cannot see: that the menu
 * actually opens and closes, that Escape works, that the assistant answers,
 * and that the two calculators recompute. Run against a built site:
 *
 *   npm run build && npm run serve
 *   node tests/interaction.spec.mjs
 */

const BASE = process.env.TEST_BASE_URL ?? 'http://localhost:3000';
const R = [];
const ck = (n, p, d = '') => {
  R.push(p);
  console.log(`${p ? 'PASS' : 'FAIL'}  ${n}${d ? ' — ' + d : ''}`);
};
const b = await chromium.launch();
const ctx = await b.newContext();
const page = await ctx.newPage();
page.on('pageerror', (e) => console.log('  [PAGEERROR]', e.message));

// Mega menu opens, navigates, and closes on the new page
await page.goto(`${BASE}/pl/`);
await page.click('button[aria-controls*="platforms"]');
const expanded = await page.getAttribute('button[aria-controls*="platforms"]', 'aria-expanded');
const panelVisible = await page.isVisible('#\\:R1cn6\\:-platforms, [id$="-platforms"]');
ck('mega menu opens', expanded === 'true' && panelVisible, `expanded=${expanded}`);

await page.click('[id$="-platforms"] a[href*="/platformy/am5/"]');
await page.waitForURL('**/platformy/am5/**');
await page.waitForTimeout(300);
const stillOpen = await page.getAttribute('button[aria-controls*="platforms"]', 'aria-expanded');
ck('menu closes after navigation', stillOpen === 'false', `expanded=${stillOpen}`);

// Escape closes the panel
await page.click('button[aria-controls*="platforms"]');
await page.keyboard.press('Escape');
await page.waitForTimeout(150);
ck(
  'Escape closes menu',
  (await page.getAttribute('button[aria-controls*="platforms"]', 'aria-expanded')) === 'false',
);

// Chat widget: open, ask, get an answer with links
await page.goto(`${BASE}/pl/`);
await page.click('button[aria-controls][aria-label*="asystent"]');
await page.waitForTimeout(300);
const dialogOpen = await page.isVisible('[role="dialog"]');
ck('chat opens', dialogOpen);
await page.fill('[role="dialog"] input[type="text"]', 'jakie chłodzenie wybrać');
await page.click('[role="dialog"] button[type="submit"]');
await page.waitForTimeout(600);
const msgs = await page.locator('[role="dialog"] [aria-live] > div').count();
const hasLinks = await page.locator('[role="dialog"] a[href*="/chlodzenie"]').count();
ck('chat answers with links', msgs >= 3 && hasLinks > 0, `msgs=${msgs} links=${hasLinks}`);
await page.keyboard.press('Escape');
await page.waitForTimeout(200);
ck('Escape closes chat', !(await page.isVisible('[role="dialog"]')));

// PSU calculator recomputes live. Use a fresh page so no chat DOM lingers,
// and read the recommended-wattage figure specifically.
{
  const p2 = await ctx.newPage();
  await p2.goto(`${BASE}/pl/narzedzia/zasilacz/`);
  const rec = p2.locator('[aria-live] p.text-accent-fg');
  const before = (await rec.textContent())?.trim();
  await p2.locator('input[type="number"]').first().fill('350');
  await p2.waitForTimeout(300);
  const after = (await rec.textContent())?.trim();
  ck('PSU calculator recomputes', Boolean(before) && before !== after, `${before} -> ${after}`);
  await p2.close();
}

// Compatibility checker flags a real mismatch: AM5 is DDR5-only
await page.goto(`${BASE}/pl/narzedzia/kompatybilnosc/`);
await page.selectOption('select >> nth=0', 'am5');
await page.locator('input[value="ddr4"]').click({ force: true });
await page.waitForTimeout(300);
const txt = await page.locator('[aria-live]').first().innerText();
ck('checker flags AM5+DDR4 mismatch', /nie obsługuje|nie pasuj/i.test(txt), txt.split('\n')[0]);

// Glossary filter narrows the list
await page.goto(`${BASE}/pl/slownik/`);
const all = await page.locator('dl > div').count();
await page.fill('input[type="search"]', 'pamięć');
await page.waitForTimeout(400);
const filtered = await page.locator('dl > div').count();
ck('glossary filter narrows results', filtered > 0 && filtered < all, `${all} -> ${filtered}`);

await b.close();
const f = R.filter((x) => !x).length;
console.log(`\n${R.length - f}/${R.length} passed`);
process.exit(f ? 1 : 0);
