<div align="center">

<img src="public/icon-192.png" alt="" width="84" height="84">

# ZbudujKompa

**Build your PC without guessing**

A bilingual, fully static reference site about building a PC — platforms, cooling,
components, reference builds and step-by-step guides, each with the reasoning behind
the recommendation rather than just the recommendation.

[![Deploy](https://github.com/dawidolko/ZbudujKompa/actions/workflows/deploy.yml/badge.svg)](https://github.com/dawidolko/ZbudujKompa/actions/workflows/deploy.yml)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-000)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19-087ea4)](https://react.dev)
[![Tailwind 4](https://img.shields.io/badge/Tailwind-4-06b6d4)](https://tailwindcss.com)
[![WCAG 2.2 AA](https://img.shields.io/badge/WCAG_2.2-AA-16a34a)](#accessibility)
[![MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

**[zbudujkompa.dawidolko.pl](https://zbudujkompa.dawidolko.pl)**

<a href="https://zbudujkompa.dawidolko.pl">
  <img src="docs/screenshots/home-dark.png" alt="The ZbudujKompa home page in dark mode" width="820">
</a>

</div>

---

## Contents

- [What this is](#what-this-is)
- [Screenshots](#screenshots)
- [Features](#features)
- [Quick start](#quick-start)
- [The build configurator](#the-build-configurator)
- [The chat assistant](#the-chat-assistant)
- [Accessibility](#accessibility)
- [Architecture](#architecture)
- [Testing](#testing)
- [Deployment](#deployment)
- [Learning the stack](#learning-the-stack)
- [Contributing](#contributing)

## What this is

A reference site for anyone assembling a computer, in Polish and English. It covers
CPU platforms and sockets, cooling classes, a catalogue of real components, complete
reference builds and step-by-step assembly guides — including installing Windows and
Linux, which most build guides skip entirely.

There is no backend, no database and no tracking. Everything is prerendered to files
and served by GitHub Pages. The interactive parts — the configurator, the calculators,
the assistant — all run in the browser.

## Screenshots

<table>
<tr>
<td width="50%">
<a href="https://zbudujkompa.dawidolko.pl/pl/konfigurator/">
  <img src="docs/screenshots/configurator.png" alt="The build configurator, showing selected parts and a live compatibility summary">
</a>
<p align="center"><strong>Build configurator</strong><br><sub>Live compatibility checks, power draw and price bands</sub></p>
</td>
<td width="50%">
<a href="https://zbudujkompa.dawidolko.pl/pl/poradniki/assembly-step-by-step/">
  <img src="docs/screenshots/guide.png" alt="An assembly guide with a sticky table of contents and technical diagrams">
</a>
<p align="center"><strong>Assembly guides</strong><br><sub>Anchored steps, timings and technical diagrams</sub></p>
</td>
</tr>
<tr>
<td colspan="2">
<img src="docs/screenshots/home-light.png" alt="The home page in light mode">
<p align="center"><strong>Light and dark themes</strong><br><sub>Both meet WCAG 2.2 AA, and the choice survives a language switch</sub></p>
</td>
</tr>
</table>

## Features

|                  |                                                                                                                                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Configurator** | Pick parts from a catalogue of 96 components and get live compatibility checks — socket, memory generation, VRM capacity, physical clearances and supply headroom — each explaining its reasoning |
| **Components**   | Every part carries a price band rather than a price, with the specifications that actually decide a build: cooler height, card length, module height                                              |
| **Platforms**    | Five AMD and Intel sockets with chipset tables and an honest verdict on which are still worth buying into                                                                                         |
| **Cooling**      | Five cooling classes compared on heat handled, noise and price, with the trade-offs stated plainly                                                                                                |
| **Guides**       | Fourteen step-by-step guides: assembly, first boot, BIOS, Windows and Linux installation, overclocking, quiet builds, diagnostics and maintenance                                                 |
| **Calculators**  | Fourteen calculators — supply sizing with ATX 3.x transients, physical clearance, running cost, acoustics, thermals, display bandwidth, memory latency and more — each showing its working        |
| **Articles**     | Analysis, buying advice, news and explainers, with perishable pieces flagged by age rather than presented as current indefinitely                                                                 |
| **Assistant**    | A docked chat assistant answering from a local knowledge base — no API key required, with an optional LLM layered on top                                                                          |
| **Bilingual**    | Every route exists in Polish and English with correct `hreflang`, `lang` and canonical URLs. Polish is the default                                                                                |
| **Visuals**      | Technical SVG diagrams, licensed photography, gradient background patterns and scroll animations that degrade to nothing without JavaScript                                                       |

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
npm run docker:dev     # dev server with hot reload
npm run docker:down
```

The production image is a three-stage build — dependencies, Next.js build, then an
nginx runtime containing only the exported files. It runs as an unprivileged user with
a read-only root filesystem. See [`.tools/docker/`](.tools/docker/).

## The build configurator

The [configurator](https://zbudujkompa.dawidolko.pl/pl/konfigurator/) is the piece with
the most logic behind it. It re-checks on every change rather than behind a submit
button, so a conflict appears while the choice that caused it is still on screen.

Findings come in three grades, and the middle one is the point:

- **Error** — the build cannot work. A DDR4 kit will not enter a DDR5 slot.
- **Warning** — it works, but something is compromised. A board whose VRM is below the
  CPU's peak draw does not fail; it quietly reduces clocks under sustained load, which
  is exactly the kind of problem nobody notices.
- **Pass** — checked and fine, stated explicitly so the reader knows it was considered.

Every message explains itself. `Incompatible` on its own sends someone back to a forum;
_"this board takes DDR5 and that kit is DDR4"_ tells them what to change.

The engine lives in [`src/lib/parts/compatibility.ts`](src/lib/parts/compatibility.ts)
and is covered by [15 tests](tests/compatibility.spec.mjs).

## The chat assistant

The assistant in the bottom-right corner matches questions against a knowledge base
compiled into the site. **It works offline, costs nothing per message, and needs no API
key.**

An optional LLM can be layered on top with a free-tier key from
[Groq](https://console.groq.com/keys), [OpenRouter](https://openrouter.ai/keys) or
[Cerebras](https://cloud.cerebras.ai):

```bash
npm run chat:key -- gsk_your_key_here    # verifies the key, then writes .env.local
npm run dev
```

**Any failure falls back to the local answer** — rate limit, bad key, no network, or a
15-second timeout. The assistant never stops answering.

> **Before adding a key to a public deployment.** This is a static export. A GitHub
> Secret is secret in the Actions log, not in the built site: the value is compiled
> into the JavaScript bundle and served to every visitor. Only use a free-tier key,
> with a hard spending limit, that you are prepared to rotate. `npm run check:secrets`
> scans tracked files for keys and runs first in CI.

To enable it on Pages, add `CHAT_API_URL`, `CHAT_API_KEY` and `CHAT_MODEL` as
repository secrets. Leaving them unset is fully supported.

## Accessibility

The site targets WCAG 2.2 Level AA. [`tests/a11y.spec.mjs`](tests/a11y.spec.mjs) runs
axe against a page from every section **in both themes** — a contrast failure can exist
in one theme and not the other, so a single-theme audit misses half of them.

- Every text/background pair is documented with its measured contrast ratio in
  [`globals.css`](src/app/globals.css), so a future change can be checked against the
  number it has to beat.
- Colour is never the sole carrier of meaning: every status pairs colour with an icon
  and a text label.
- Focus is always visible, meets the 3:1 indicator contrast of SC 2.4.13, and returns
  to the triggering control when a panel closes.
- `prefers-reduced-motion`, `prefers-contrast` and `forced-colors` are all honoured.
  Scroll animations are gated on JavaScript being available, so content is never left
  invisible.
- Interactive targets meet the 44×44 minimum of SC 2.5.8.

Automated testing catches roughly a third of accessibility problems. Passing the suite
is a floor, not a certificate — known gaps are listed on the site's own
[accessibility page](https://zbudujkompa.dawidolko.pl/pl/dostepnosc/).

## Architecture

```
├── .github/workflows/     CI: verify → test → build → deploy
├── .tools/
│   ├── docker/            Dockerfile, compose, nginx, security headers
│   └── scripts/           Brand assets, photo pipeline, secret scanning
├── docs/screenshots/      README imagery
├── public/                Icons, OG image, photos, manifest, CNAME
├── src/
│   ├── app/[locale]/      Every content route, both languages
│   ├── components/
│   │   ├── blog/          Article rendering
│   │   ├── configurator/  Part pickers, browser and comparison
│   │   ├── diagrams/      Technical SVG drawings
│   │   ├── chat/          Build assistant
│   │   ├── motion/        Scroll-reveal wrapper
│   │   └── ui/            Buttons, badges, cards, photos, icons
│   ├── i18n/              Locale config and PL/EN dictionaries
│   └── lib/
│       ├── parts/         Component catalogue and compatibility engine
│       ├── blog/          Articles and news
│       ├── calculators.ts  Every formula, testable without a browser
│       ├── chat/          Knowledge base and provider
│       ├── guides/        Guide content, split by subject
│       └── theme.ts       Theme resolution and persistence
└── tests/                 Chat, compatibility, theme, interaction, a11y
```

### Three decisions worth knowing

**The document shell lives in `[locale]/layout.tsx`, not the root layout.** The `lang`
attribute has to be correct in the _served_ HTML, and the locale segment is the only
place that knows the language.

**Navigation, sitemap and routes derive from the data modules.** Adding a socket to
`src/lib/sockets.ts` puts it in the menu, the footer, the sitemap and its own generated
page. There is no second list to keep in step.

**The theme is an attribute, re-applied after navigation.** Each locale renders its own
`<html>`, and Next.js treats a link between them as a client-side navigation — so the
new document's `<head>` script never runs and React drops the attribute. A blocking
script handles the cold load and [`ThemeScript`](src/components/layout/ThemeScript.tsx)
handles the soft navigation. Both halves are needed; [five tests](tests/theme.spec.mjs)
cover the combinations.

## Testing

```bash
npm run verify   # secrets, typecheck, lint, formatting, build
npm run test     # chat, compatibility, theme, interaction, accessibility
```

The browser suites need a built site running — `npm run build && npm run serve` first,
or point them elsewhere with `TEST_BASE_URL`.

| Suite                    | Covers                                                                                  |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `chat.spec.mjs`          | Question matching in both languages, including off-topic questions that must be refused |
| `compatibility.spec.mjs` | The configurator engine: sockets, memory, power, physical fit                           |
| `theme.spec.mjs`         | Theme persistence across language switches, and no flash on load                        |
| `interaction.spec.mjs`   | Menu, assistant, calculators, glossary filter                                           |
| `a11y.spec.mjs`          | axe against every section, in both themes                                               |

## Deployment

Pushing to `main` runs [`deploy.yml`](.github/workflows/deploy.yml): verify → test →
build → deploy. The deploy depends on the tests, so a build that fails typecheck, lint,
formatting or accessibility never reaches production.

For a project site at `https://<user>.github.io/<repo>/`, set
`NEXT_PUBLIC_BASE_PATH=/<repo>`. On a custom domain — as here, via `public/CNAME` —
leave it empty.

## Learning the stack

[`docs/NAUKA.md`](docs/NAUKA.md) is a beginner's guide, in Polish, to the technologies
this project is built on — and several it is not. It explains how Next.js routes through
directories and why the folders are named `[locale]` and `[slug]`, how Server and Client
Components divide the work, what Tailwind 4's CSS-based configuration replaces, and how
`clamp()` scales without breakpoints. It then compares React against Vue, Next against
Nuxt, TypeScript against JavaScript, and .NET/C# against Laravel, with Prisma covered as
the typed-database counterpart. Examples marked **„z tego projektu"** are quoted verbatim
from this codebase.

## Contributing

Corrections to the technical content are especially welcome; hardware advice ages, and
an issue pointing at something now wrong is genuinely useful. Please keep commits
following [Conventional Commits](https://www.conventionalcommits.org/) and run
`npm run verify` before opening a pull request.

Photographs are credited in [`public/photos/CREDITS.md`](public/photos/CREDITS.md) and
used under the [Unsplash Licence](https://unsplash.com/license).

## License

[MIT](LICENSE) © [Dawid Olko](https://dawidolko.pl)
