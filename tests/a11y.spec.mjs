import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

/**
 * Accessibility audit.
 *
 * Runs axe against a representative page from every section, in both themes,
 * because a contrast failure can exist in one theme and not the other — and a
 * single-theme audit would miss exactly half of them.
 *
 * Automated testing catches roughly a third of accessibility problems. Passing
 * this suite is a floor, not a certificate: keyboard order, focus handling and
 * whether the wording actually makes sense still need a person. Run against a
 * built site:
 *
 *   npm run build && npm run serve
 *   node tests/a11y.spec.mjs
 */

const BASE = process.env.TEST_BASE_URL ?? 'http://localhost:3000';

const PAGES = [
  '/pl/',
  '/en/',
  '/pl/platformy/',
  '/pl/platformy/am5/',
  '/en/platformy/lga1851/',
  '/pl/chlodzenie/',
  '/pl/chlodzenie/aio-360/',
  '/pl/zestawy/',
  '/pl/zestawy/mainstream-1440p/',
  '/pl/poradniki/',
  '/pl/poradniki/assembly-step-by-step/',
  '/pl/narzedzia/kompatybilnosc/',
  '/pl/narzedzia/zasilacz/',
  '/pl/slownik/',
  '/pl/faq/',
  '/pl/o-serwisie/',
  '/pl/kontakt/',
  '/pl/dostepnosc/',
  '/pl/konfigurator/',
  '/pl/podzespoly/',
  '/pl/porownanie/',
  '/en/konfigurator/',
  '/pl/mapa-serwisu/',
  '/pl/zrodla/',
  '/en/zrodla/',
  '/pl/poradniki/instalacja-windows/',
  '/pl/poradniki/instalacja-linux/',
  '/pl/poradniki/sterowniki-po-instalacji/',
  '/pl/poradniki/ustawienia-bios/',
  '/pl/poradniki/cichy-komputer/',
  '/pl/zestawy/htpc-salon/',
  '/pl/zestawy/serwer-domowy/',
  '/en/poradniki/ustawienia-bios/',
];

const browser = await chromium.launch();
let violationCount = 0;

for (const theme of ['light', 'dark']) {
  const context = await browser.newContext({ colorScheme: theme });

  for (const path of PAGES) {
    const page = await context.newPage();
    await page.goto(BASE + path, { waitUntil: 'networkidle' });

    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    if (violations.length > 0) {
      violationCount += violations.length;
      console.log(`\n[${theme}] ${path}`);
      for (const violation of violations) {
        console.log(`  ${violation.impact?.toUpperCase()} ${violation.id}: ${violation.help}`);
        violation.nodes.slice(0, 3).forEach((node) => {
          console.log(`     ${node.target.join(' ')}`);
        });
      }
    }

    await page.close();
  }

  await context.close();
}

await browser.close();

console.log(
  violationCount === 0
    ? `\nNo WCAG A/AA violations across ${PAGES.length} pages in both themes.`
    : `\n${violationCount} violation group(s) found.`,
);

process.exit(violationCount > 0 ? 1 : 0);
