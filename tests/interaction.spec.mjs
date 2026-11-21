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

// PSU calculator: picking catalogue parts fills the figures, itemises the
// build and reads the card's connectors from the vendor specification.
{
  const p3 = await ctx.newPage();
  await p3.goto(`${BASE}/pl/narzedzia/zasilacz/`);
  await p3.getByLabel('Procesor', { exact: true }).selectOption('ryzen-7-7800x3d');
  const cpuWatts = await p3.getByLabel('Pobór mocy procesora (W)').inputValue();
  ck('PSU CPU picker fills peak power', cpuWatts === '162', `cpu=${cpuWatts}`);
  await p3.getByLabel('Karta graficzna', { exact: true }).selectOption('rtx-5070-ti');
  const result = await p3.locator('[aria-live]').first().innerText();
  ck('PSU breakdown names the parts', /7800X3D/.test(result) && /RTX 5070 Ti/.test(result));
  ck(
    'PSU lists the vendor 12V-2x6 connector',
    /12V-2x6/.test(result) && /specyfikacja producenta/.test(result),
  );
  await p3.getByLabel('Płyta główna', { exact: true }).selectOption('b650m-pro-rs');
  await p3.getByLabel('Wentylatory obudowy i chłodzenia').fill('7');
  const headers = await p3.locator('[aria-live]').first().innerText();
  ck(
    'PSU compares fans with the board headers',
    /rozgałęźniki \(2\)/.test(headers),
    headers.match(/Złącza[^\n]*/)?.[0],
  );
  // Editing a filled figure sets its picker back to manual entry.
  await p3.getByLabel('Pobór mocy procesora (W)').fill('200');
  const cpuPick = await p3.getByLabel('Procesor', { exact: true }).inputValue();
  ck('editing a figure returns its picker to manual', cpuPick === '', `picker=${cpuPick}`);
  await p3.close();
}

// The configurator keeps its build on this device, and a calculator loads it.
{
  const p4 = await ctx.newPage();
  await p4.goto(`${BASE}/pl/konfigurator/`);
  await p4.getByRole('button', { name: 'Dobierz zestaw' }).click();
  await p4.waitForTimeout(300);
  const stored = await p4.evaluate(() => localStorage.getItem('zbudujkompa:build'));
  ck('configurator saves its build', Boolean(stored && JSON.parse(stored).cpu), stored ?? 'none');
  await p4.goto(`${BASE}/pl/narzedzia/zasilacz/`);
  await p4.getByRole('button', { name: 'Wczytaj mój zestaw z konfiguratora' }).click();
  await p4.waitForTimeout(200);
  const picked = await p4.getByLabel('Procesor', { exact: true }).inputValue();
  const status = await p4.getByRole('status').first().innerText();
  ck(
    'calculator loads the configurator build',
    picked === JSON.parse(stored).cpu && /Wczytano/.test(status),
    status,
  );
  // With nothing saved, the button says so and links to the configurator.
  await p4.evaluate(() => localStorage.removeItem('zbudujkompa:build'));
  await p4.reload();
  await p4.getByRole('button', { name: 'Wczytaj mój zestaw z konfiguratora' }).click();
  ck(
    'no saved build is reported',
    await p4.getByRole('link', { name: 'Otwórz konfigurator' }).isVisible(),
  );
  await p4.close();
}

// Clearance and M.2 calculators fill their figures from the catalogue.
{
  const p5 = await ctx.newPage();
  await p5.setViewportSize({ width: 390, height: 844 });
  await p5.goto(`${BASE}/pl/kalkulatory/`);
  const clearance = p5.locator('#zgodnosc');
  await clearance.getByLabel('Obudowa', { exact: true }).selectOption('terra');
  const numbers = await clearance
    .locator('input[type="number"]')
    .evaluateAll((els) => els.map((el) => el.value));
  ck(
    'clearance case picker fills the limits',
    numbers.includes('322') && numbers.includes('77'),
    numbers.join(','),
  );
  const m2 = p5.locator('#slot-m2');
  await m2.getByLabel('Płyta główna', { exact: true }).selectOption('a620m-hdv');
  const slotOptions = await m2.getByLabel('Gniazdo na płycie').locator('option').count();
  ck('M.2 board picker lists its real slots', slotOptions === 2, `slots=${slotOptions}`);
  const scrollWidth = await p5.evaluate(() => document.documentElement.scrollWidth);
  ck('calculators fit a 390 px screen', scrollWidth <= 390, `scrollWidth=${scrollWidth}`);
  await p5.close();
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
