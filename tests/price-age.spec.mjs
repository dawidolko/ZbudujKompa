import { chromium } from 'playwright';
import { catalogueCheckedAt, PRICE_STALE_DAYS } from '../src/lib/parts/pricing.ts';

/*
 * The rule that a price past its age limit is never shown, checked against a
 * shifted clock. Run against a built site:
 *
 *   npm run build && npm run serve
 *   npm run test:priceage
 */

const BASE = process.env.TEST_BASE_URL ?? 'http://localhost:3000';
const DAY = 86_400_000;
const checked = Date.parse(`${catalogueCheckedAt()}T00:00:00Z`);
const fresh = new Date(checked + 10 * DAY);
const expired = new Date(checked + (PRICE_STALE_DAYS + 1) * DAY);

/* A figure followed by the currency, which is how every price is written. */
const FIGURE = /\d[\d\s ,.]*\s?zł/;

const PRICED_PAGES = [
  '/pl/zestawy/',
  '/pl/zestawy/mainstream-1440p/',
  '/en/zestawy/htpc-salon/',
  '/pl/podzespoly/',
  '/pl/podzespoly/gpu/',
  '/pl/podzespoly/marka/amd/',
  '/pl/chlodzenie/',
  '/pl/chlodzenie/aio-360/',
  '/pl/porownanie/',
];

const results = [];
function check(name, pass, detail = '') {
  results.push(pass);
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
}

async function visibleText(page) {
  return page.locator('main').innerText();
}

const browser = await chromium.launch();

/* ---- Past the limit ---- */
{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.clock.setFixedTime(expired);

  for (const path of PRICED_PAGES) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    const text = await visibleText(page);
    check(`no figure on ${path}`, !FIGURE.test(text), text.match(FIGURE)?.[0]);
  }

  await page.goto(`${BASE}/pl/podzespoly/gpu/`, { waitUntil: 'networkidle' });
  const main = page.locator('main');
  check(
    'the Polish label replaces the figure',
    (await main.getByText('Sprawdź aktualną cenę').count()) > 0,
  );
  const hosts = await main
    .locator('a[href*="ceneo.pl"], a[href*="allegro.pl"], a[href*="amazon.pl"]')
    .evaluateAll((links) => links.map((link) => new URL(link.href).hostname));
  check(
    'live Ceneo, Allegro and Amazon.pl links remain',
    ['ceneo', 'allegro', 'amazon'].every((name) => hosts.some((host) => host.includes(name))),
    `${hosts.length} links`,
  );

  await page.goto(`${BASE}/en/chlodzenie/aio-360/`, { waitUntil: 'networkidle' });
  check(
    'the English label replaces the figure',
    (await page.locator('main').getByText('Check current price').count()) > 0,
  );

  await page.goto(`${BASE}/pl/konfigurator/`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Dobierz zestaw' }).click();
  await page.waitForTimeout(300);
  const configurator = await visibleText(page);
  check(
    'a generated build shows no total and no part price',
    !FIGURE.test(configurator) && configurator.includes('Sprawdź aktualną cenę'),
    configurator.match(FIGURE)?.[0],
  );

  await page.goto(`${BASE}/pl/`, { waitUntil: 'networkidle' });
  const home = await visibleText(page);
  check('the home page picker shows no figure', !FIGURE.test(home), home.match(FIGURE)?.[0]);

  await page.goto(`${BASE}/pl/kalkulatory/`, { waitUntil: 'networkidle' });
  check(
    'the upgrade score keeps its figure, labelled as an estimate',
    (await page.locator('main').getByText('szacunek z zapisanych cen').count()) > 0,
  );

  /* Scripts held back, so nothing has hydrated. This is the moment between the
     first paint and React correcting the page. */
  const held = await context.newPage();
  await held.clock.setFixedTime(expired);
  await held.route('**/_next/static/**/*.js', (route) => route.abort());
  await held.goto(`${BASE}/pl/podzespoly/gpu/`, { waitUntil: 'load' });
  check(
    'an expired figure is hidden before hydration',
    (await held.locator('[data-price-date]').first().isHidden()) &&
      !FIGURE.test(await visibleText(held)),
  );

  await context.close();
}

/* ---- Inside the limit ---- */
{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.clock.setFixedTime(fresh);

  await page.goto(`${BASE}/pl/podzespoly/gpu/`, { waitUntil: 'networkidle' });
  const text = await visibleText(page);
  check('a recent price is shown', FIGURE.test(text));
  check('and the label is absent', !text.includes('Sprawdź aktualną cenę'));

  await context.close();
}

await browser.close();

const failed = results.filter((passed) => !passed).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
