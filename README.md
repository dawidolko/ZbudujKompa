<div align="center">

<img src="public/icon-192.png" alt="" width="88" height="88">

# ZbudujKompa

**Złóż komputer bez zgadywania** · _Build your PC without guessing_

Dwujęzyczny przewodnik po składaniu komputerów: platformy AMD i Intel, chłodzenie,
gotowe zestawy i instrukcje krok po kroku.

[![Deploy](https://github.com/dawidolko/ZbudujKompa/actions/workflows/deploy.yml/badge.svg)](https://github.com/dawidolko/ZbudujKompa/actions/workflows/deploy.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-000)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-087ea4)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06b6d4)](https://tailwindcss.com)
[![WCAG 2.2 AA](https://img.shields.io/badge/WCAG_2.2-AA-16a34a)](#accessibility)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

[zbudujkompa.dawidolko.pl](https://zbudujkompa.dawidolko.pl)

</div>

---

## What this is

A fully static, bilingual (Polish and English) reference site about building a PC.
It covers CPU platforms and sockets, cooling classes, complete reference builds and
step-by-step assembly guides — each with the reasoning behind the recommendation, not
just the recommendation itself.

There is no backend, no database and no tracking. The whole site is prerendered to
files and served by GitHub Pages.

## Features

|               |                                                                                                                                                 |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Platforms** | Five sockets across AMD and Intel, each with chipset tables, memory and PCIe support, and an honest verdict on whether it is still worth buying |
| **Cooling**   | Five cooling classes compared on heat handled, noise and price, with the trade-offs stated plainly                                              |
| **Builds**    | Four complete reference builds with per-part reasoning and dated indicative prices                                                              |
| **Guides**    | Seven step-by-step guides with anchored steps, timings, tool lists and printable checklists                                                     |
| **Tools**     | A compatibility checker and a PSU calculator, both computing live in the browser                                                                |
| **Assistant** | A docked chat assistant answering from a local knowledge base — no API key required                                                             |
| **Bilingual** | Every route exists in both languages with correct `hreflang`, `lang` and canonical URLs                                                         |
| **Themes**    | Light and dark, persisted across navigation and language changes, applied before first paint                                                    |

## Quick start

```bash
npm ci          # install exactly what the lockfile pins
npm run dev     # http://localhost:3000
```

Building and previewing the static export:

```bash
npm run build   # writes ./out
npm run serve   # http://localhost:3000
```

### Docker

```bash
npm run docker:up      # production image on http://localhost:8080
npm run docker:dev     # dev server with hot reload on http://localhost:3000
npm run docker:down
```

The production image is a three-stage build: dependencies, Next.js build, then an
nginx runtime containing only the exported files. It runs as an unprivileged user
with a read-only root filesystem. See [`.tools/docker/`](.tools/docker/).

## Project structure

```
├── .github/workflows/     CI: verify → test → build → deploy to Pages
├── .tools/
│   ├── docker/            Dockerfile, compose, nginx config, security headers
│   └── scripts/           Brand asset generation
├── public/                Icons, OG image, manifest, CNAME
├── src/
│   ├── app/
│   │   ├── [locale]/      Every content route, both languages
│   │   ├── layout.tsx     Root metadata (no document shell — see below)
│   │   ├── sitemap.ts     Generated from the same list as the navigation
│   │   └── robots.ts
│   ├── components/
│   │   ├── brand/         Logo and mark
│   │   ├── chat/          Build assistant
│   │   ├── glossary/      Filterable glossary
│   │   ├── guides/        Downloadable checklist
│   │   ├── layout/        Header, footer, breadcrumbs, theme
│   │   ├── seo/           JSON-LD
│   │   ├── tools/         Compatibility checker, PSU calculator
│   │   └── ui/            Button, badge, card, callout, icons
│   ├── i18n/              Locale config and PL/EN dictionaries
│   └── lib/
│       ├── chat/          Knowledge base and provider
│       ├── sockets.ts     Platform catalogue
│       ├── cooling.ts     Cooling classes
│       ├── builds.ts      Reference builds
│       ├── guides.ts      Step-by-step guides
│       ├── knowledge.ts   Glossary, FAQ, sourced opinions
│       ├── navigation.ts  Derived from the data modules
│       └── theme.ts       Theme resolution and persistence
└── tests/                 Theme, interaction and accessibility suites
```

### Two architectural decisions worth knowing

**The document shell lives in `[locale]/layout.tsx`, not in the root layout.** The
`lang` attribute has to be correct in the _served_ HTML, and the locale segment is
the only place that knows the language. Setting it client-side would leave crawlers
and assistive technology reading the page as the wrong language.

**Navigation, sitemap and routes are derived from the data modules.** Adding a socket
to `src/lib/sockets.ts` puts it in the menu, the sitemap, the footer and its own
generated page. There is no second list to keep in step.

## Accessibility

The site targets WCAG 2.2 Level AA, and [`tests/a11y.spec.mjs`](tests/a11y.spec.mjs)
runs axe against a page from every section **in both themes** — a contrast failure can
exist in one theme and not the other, so a single-theme audit misses half of them.

- Every text/background pair is documented with its measured contrast ratio in
  [`globals.css`](src/app/globals.css), so a future change can be checked against the
  number it has to beat.
- Colour is never the sole carrier of meaning: every status pairs colour with an icon
  and a text label.
- Focus is always visible, meets the 3:1 indicator contrast of SC 2.4.13, and is
  returned to the triggering control when a panel closes.
- `prefers-reduced-motion`, `prefers-contrast` and `forced-colors` are all honoured.
- Interactive targets meet the 44×44 minimum of SC 2.5.8.

Automated testing catches roughly a third of accessibility problems. Passing the suite
is a floor, not a certificate — known gaps are listed on the site's own
[accessibility page](https://zbudujkompa.dawidolko.pl/pl/dostepnosc/).

## The theme, and the bug it was built around

Switching language used to reset the site to light mode. The cause was subtle and
worth recording: each locale renders its own `<html>`, Next.js treats the link between
them as a client-side navigation, so the new document's blocking `<head>` script never
runs — and React reconciles `<html>` against markup with no `data-theme`, dropping the
attribute entirely.

The fix has two halves, and both are needed:

1. **A blocking script in `<head>`** applies the theme before first paint on a cold
   load, which is what prevents a flash of the wrong theme.
2. **[`ThemeScript`](src/components/layout/ThemeScript.tsx)** re-applies it after
   client-side navigation, which is where the head script does not run.

The resolved theme is also persisted on first visit, not only when the toggle is
pressed — otherwise a visitor who simply inherited their OS preference has nothing
stored for the next document to read.

[`tests/theme.spec.mjs`](tests/theme.spec.mjs) covers all five scenarios, including
the one the original implementation got wrong: an explicit _light_ choice on a machine
whose OS is set to dark.

## The build assistant

The assistant in the bottom-right corner matches questions against a knowledge base
compiled into the site ([`src/lib/chat/knowledge-base.ts`](src/lib/chat/knowledge-base.ts)).
It works offline, costs nothing per message, and needs no API key.

An optional LLM can be layered on top. Get a free key from
[Groq](https://console.groq.com/keys), [OpenRouter](https://openrouter.ai/keys) or
[Cerebras](https://cloud.cerebras.ai), then:

```bash
npm run chat:key -- gsk_your_key_here          # groq is the default
npm run chat:key -- sk-or-your_key openrouter  # or another provider
npm run dev                                    # restart to pick it up
```

The script verifies the key against the provider before writing anything, so a typo is
reported immediately rather than showing up later as an assistant that has quietly
fallen back to local answers. It writes `.env.local`, which is gitignored.

Recent turns are sent as context so follow-up questions work, requests time out after
15 seconds, and **any failure falls back to the local answer** — the assistant never
stops working. Links attached to an answer always come from the local knowledge base,
so the model cannot invent URLs.

> **On API keys:** this is a static export. There is no server to hold a secret, so a
> key set at build time is readable by anyone who opens the JavaScript bundle. Only use
> a free-tier key you are willing to treat as public and can rotate, and set a spending
> limit on it. Never put a paid key here.

## Data and sourcing

- **Specifications** come from published vendor documentation.
- **Cooling figures** are realistic bands for a whole class of design, not headline
  numbers from a single product's marketing page.
- **Prices** are indicative Polish retail figures and each carries the date it was
  checked. A price without a date goes stale silently, which is worse than no price.
- **Opinions** are quoted with their source and collection date. They are individual
  voices from public forums, not verified reviews.

## Scripts

| Script                 | Purpose                                     |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Development server                          |
| `npm run build`        | Static export to `./out`                    |
| `npm run serve`        | Serve the export locally                    |
| `npm run typecheck`    | TypeScript, no emit                         |
| `npm run lint`         | ESLint                                      |
| `npm run format`       | Prettier, write                             |
| `npm run verify`       | typecheck + lint + format check + build     |
| `npm run test`         | Theme, interaction and accessibility suites |
| `npm run brand:assets` | Regenerate icons and the OG image           |
| `npm run docker:*`     | Build, up, down, logs, dev                  |

Tests need a built site running — `npm run build && npm run serve` first, or point
them elsewhere with `TEST_BASE_URL`.

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
verify → test → build → deploy. The deploy job depends on the tests, so a build that
fails typecheck, lint, formatting or accessibility never reaches production.

For a project site at `https://<user>.github.io/<repo>/`, set
`NEXT_PUBLIC_BASE_PATH=/<repo>`. On a custom domain — as here, via `public/CNAME` —
leave it empty.

## Contributing

Corrections to the technical content are especially welcome; hardware advice ages, and
an issue pointing at something now wrong is genuinely useful. Please keep commits
following [Conventional Commits](https://www.conventionalcommits.org/) and run
`npm run verify` before opening a pull request.

## License

[MIT](LICENSE) © [Dawid Olko](https://dawidolko.pl)
