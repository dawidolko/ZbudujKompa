import { chromium } from 'playwright';

/**
 * Accessibility panel tests.
 *
 * The panel exists for readers who depend on it, so a silent regression would
 * hurt precisely the people least able to work around it. The persistence
 * cases matter most: settings that reset on navigation are worse than none,
 * because the reader has to reapply them on every page.
 *
 *   npm run build && npm run serve
 *   node tests/accessibility-panel.spec.mjs
 */

const BASE = process.env.TEST_BASE_URL ?? 'http://localhost:3000';

const results = [];
function check(label, passed, detail = '') {
  results.push(passed);
  console.log(`${passed ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`);
}

const browser = await chromium.launch();
const page = await (
  await browser.newContext({ viewport: { width: 1440, height: 1000 } })
).newPage();

await page.goto(`${BASE}/pl/`, { waitUntil: 'networkidle' });
await page.locator('button:has(span:text("Otwórz ustawienia dostępności"))').click();
await page.waitForTimeout(300);

check(
  'the panel opens',
  await page.locator('[role="dialog"][aria-label="Dostępność"]').isVisible(),
);

const sizeBefore = await page.evaluate(() => getComputedStyle(document.documentElement).fontSize);
await page.locator('button:has(span:text("Powiększ tekst"))').click();
await page.waitForTimeout(300);
const sizeAfter = await page.evaluate(() => getComputedStyle(document.documentElement).fontSize);
check(
  'enlarging text changes the root size',
  sizeBefore !== sizeAfter,
  `${sizeBefore} → ${sizeAfter}`,
);

await page.locator('button:text("Wysoki kontrast")').click();
await page.waitForTimeout(300);
check(
  'high contrast sets the attribute',
  (await page.getAttribute('html', 'data-a11y-filter')) === 'high-contrast',
);

/* The settings have to outlive both a reload and the full document swap the
   language switcher performs — the case that previously broke the theme. */
await page.reload({ waitUntil: 'domcontentloaded' });
check(
  'settings survive a reload',
  (await page.getAttribute('html', 'data-a11y-filter')) === 'high-contrast',
);
check(
  'and the text size with them',
  (await page.evaluate(() => getComputedStyle(document.documentElement).fontSize)) === sizeAfter,
);

await page.click('a[hreflang="en"]');
await page.waitForURL('**/en/**');
await page.waitForTimeout(600);
check(
  'settings survive a language switch',
  (await page.getAttribute('html', 'data-a11y-filter')) === 'high-contrast',
);

/* Reset must clear everything, not merely the last thing changed. */
await page.locator('button:has(span:text("Open accessibility settings"))').click();
await page.waitForTimeout(300);
await page.locator('button:text("Reset all")').click();
await page.waitForTimeout(300);
check('reset clears the filter', (await page.getAttribute('html', 'data-a11y-filter')) === null);
check(
  'and restores the default size',
  (await page.evaluate(() => getComputedStyle(document.documentElement).fontSize)) === '16px',
);

await browser.close();

const failed = results.filter((passed) => !passed).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed > 0 ? 1 : 0);
