import { chromium } from 'playwright';

/**
 * Theme persistence tests.
 *
 * These exist because of a specific, reported bug: switching language reset
 * the site to the light theme. The cause was that each locale renders its own
 * <html>, Next.js treats the link between them as a client-side navigation,
 * and so the new document's blocking <head> script never ran — React
 * reconciled <html> against markup with no `data-theme` and dropped the
 * attribute entirely.
 *
 * The scenarios below cover every combination that mattered, including the one
 * the original implementation got wrong: an explicit LIGHT choice on a machine
 * whose OS is set to dark. Run against a built site:
 *
 *   npm run build && npm run serve
 *   node tests/theme.spec.mjs
 */

const BASE = process.env.TEST_BASE_URL ?? 'http://localhost:3000';

const results = [];
function check(name, pass, detail = '') {
  results.push({ name, pass });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
}

/** Waits until the theme attribute has settled after a navigation. */
async function settled(page) {
  await page.waitForFunction(() => document.documentElement.getAttribute('data-theme') !== null);
}

const browser = await chromium.launch();

/* A dark OS preference with no explicit choice must survive the switch. */
{
  const ctx = await browser.newContext({ colorScheme: 'dark' });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/pl/`);
  const before = await page.getAttribute('html', 'data-theme');
  await page.click('a[hreflang="en"]');
  await page.waitForURL('**/en/**');
  await settled(page);
  const after = await page.getAttribute('html', 'data-theme');
  check(
    'dark system preference survives PL -> EN switch',
    before === 'dark' && after === 'dark',
    `${before} -> ${after}`,
  );
  await ctx.close();
}

/* The case the original code failed: an explicit light choice on a dark OS.
   Nothing was stored, so the init script fell back to the OS and flipped the
   page to dark on the next document. */
{
  const ctx = await browser.newContext({ colorScheme: 'dark' });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/pl/`);
  await page.click('button[aria-pressed]');
  const before = await page.getAttribute('html', 'data-theme');
  await page.click('a[hreflang="en"]');
  await page.waitForURL('**/en/**');
  await settled(page);
  const after = await page.getAttribute('html', 'data-theme');
  check(
    'explicit LIGHT on a dark OS survives the language switch',
    before === 'light' && after === 'light',
    `${before} -> ${after}`,
  );
  await ctx.close();
}

/* The mirror case: an explicit dark choice on a light OS. */
{
  const ctx = await browser.newContext({ colorScheme: 'light' });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en/`);
  await page.click('button[aria-pressed]');
  const before = await page.getAttribute('html', 'data-theme');
  await page.click('a[hreflang="pl"]');
  await page.waitForURL('**/pl/**');
  await settled(page);
  const after = await page.getAttribute('html', 'data-theme');
  check(
    'explicit DARK on a light OS survives the language switch',
    before === 'dark' && after === 'dark',
    `${before} -> ${after}`,
  );
  await ctx.close();
}

/* The switch happens on deep pages too, not only on the home page. */
{
  const ctx = await browser.newContext({ colorScheme: 'light' });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/pl/platformy/am5/`);
  await page.click('button[aria-pressed]');
  const before = await page.getAttribute('html', 'data-theme');
  await page.click('a[hreflang="en"]');
  await page.waitForURL('**/en/platformy/am5/**');
  await settled(page);
  const after = await page.getAttribute('html', 'data-theme');
  check(
    'theme survives the switch on a deep page',
    before === 'dark' && after === 'dark',
    `${before} -> ${after}`,
  );
  await ctx.close();
}

/* No flash: assert on what is actually painted rather than on the attribute,
   which would race the <head> script and prove nothing either way. */
{
  const ctx = await browser.newContext({ colorScheme: 'dark' });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/pl/`, { waitUntil: 'domcontentloaded' });
  const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  const background = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  check(
    'dark theme is painted at first paint (no flash)',
    theme === 'dark' && background === 'rgb(13, 15, 19)',
    `${theme} / ${background}`,
  );
  await ctx.close();
}

await browser.close();

const failed = results.filter((result) => !result.pass);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
