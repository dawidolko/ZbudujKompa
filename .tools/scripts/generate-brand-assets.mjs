/**
 * Generates the brand assets from a single SVG definition.
 *
 * Favicons, PWA icons and the Open Graph image all derive from the same mark
 * here, so the logo exists in one place rather than as half a dozen bitmaps
 * that drift apart the first time the brand changes.
 *
 *   node .tools/scripts/generate-brand-assets.mjs
 *
 * Requires `sharp`, which is a development-only dependency — the generated
 * files are committed, so a normal build and deploy never runs this.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = join(here, '..', '..', 'public');

/* Brand colours, kept in step with the tokens in globals.css. */
const CYAN = '#06b6d4';
const CYAN_LIGHT = '#22d3ee';
const GRAPHITE = '#0d0f13';
const GRAPHITE_MID = '#191c23';
const WHITE = '#f6f8f9';

/**
 * The logo mark: a CPU die with contact pins and a build arrow rising through
 * the middle. `scale` lets the same geometry render at any output size.
 */
function markSvg({ size = 512, background = 'transparent', padding = 0.16 } = {}) {
  const inner = size * (1 - padding * 2);
  const offset = size * padding;
  const unit = inner / 32;
  const u = (value) => (offset + value * unit).toFixed(2);
  const s = (value) => (value * unit).toFixed(2);

  const pins = [];
  for (const position of [10, 15, 20]) {
    pins.push(
      `<rect x="${u(position)}" y="${u(1)}" width="${s(2)}" height="${s(4)}" rx="${s(0.5)}"/>`,
    );
    pins.push(
      `<rect x="${u(position)}" y="${u(27)}" width="${s(2)}" height="${s(4)}" rx="${s(0.5)}"/>`,
    );
    pins.push(
      `<rect x="${u(1)}" y="${u(position)}" width="${s(4)}" height="${s(2)}" rx="${s(0.5)}"/>`,
    );
    pins.push(
      `<rect x="${u(27)}" y="${u(position)}" width="${s(4)}" height="${s(2)}" rx="${s(0.5)}"/>`,
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" fill="${background}" rx="${background === 'transparent' ? 0 : size * 0.18}"/>
  <g fill="${WHITE}" opacity="0.5">
    ${pins.join('\n    ')}
  </g>
  <rect x="${u(5)}" y="${u(5)}" width="${s(22)}" height="${s(22)}" rx="${s(3.5)}"
        fill="none" stroke="${WHITE}" stroke-width="${s(2)}"/>
  <path d="M ${u(16)} ${u(21.5)} V ${u(11.5)} M ${u(16)} ${u(11.5)} L ${u(11.5)} ${u(16)} M ${u(16)} ${u(11.5)} L ${u(20.5)} ${u(16)}"
        fill="none" stroke="${CYAN}" stroke-width="${s(2.5)}"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

/** The favicon, which adapts to the browser's own light or dark chrome. */
function faviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <style>
    /* The mark is drawn in the graphite ink by default and switches to the
       light tone when the browser chrome is dark, so it stays visible in both. */
    .ink { fill: ${GRAPHITE}; }
    .stroke-ink { stroke: ${GRAPHITE}; }
    @media (prefers-color-scheme: dark) {
      .ink { fill: ${WHITE}; }
      .stroke-ink { stroke: ${WHITE}; }
    }
  </style>
  <g class="ink" opacity="0.5">
    <rect x="10" y="1" width="2" height="4" rx="0.5"/>
    <rect x="15" y="1" width="2" height="4" rx="0.5"/>
    <rect x="20" y="1" width="2" height="4" rx="0.5"/>
    <rect x="10" y="27" width="2" height="4" rx="0.5"/>
    <rect x="15" y="27" width="2" height="4" rx="0.5"/>
    <rect x="20" y="27" width="2" height="4" rx="0.5"/>
    <rect x="1" y="10" width="4" height="2" rx="0.5"/>
    <rect x="1" y="15" width="4" height="2" rx="0.5"/>
    <rect x="1" y="20" width="4" height="2" rx="0.5"/>
    <rect x="27" y="10" width="4" height="2" rx="0.5"/>
    <rect x="27" y="15" width="4" height="2" rx="0.5"/>
    <rect x="27" y="20" width="4" height="2" rx="0.5"/>
  </g>
  <rect x="5" y="5" width="22" height="22" rx="3.5" fill="none" class="stroke-ink" stroke-width="2"/>
  <path d="M16 21.5V11.5M16 11.5L11.5 16M16 11.5L20.5 16" fill="none" stroke="${CYAN}"
        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

/**
 * Open Graph card, 1200x630.
 *
 * Text is drawn as SVG text rather than composited from a bitmap so the wording
 * can change without anyone opening an image editor.
 */
function ogSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${GRAPHITE}"/>
      <stop offset="100%" stop-color="${GRAPHITE_MID}"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${CYAN}"/>
      <stop offset="100%" stop-color="${CYAN_LIGHT}"/>
    </linearGradient>
    <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
      <path d="M44 0H0V44" fill="none" stroke="${WHITE}" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="8" fill="url(#accent)"/>

  <g transform="translate(80, 150)">
    ${markSvg({ size: 110, padding: 0 })
      .replace(/<svg[^>]*>/, '')
      .replace('</svg>', '')}
  </g>

  <text x="80" y="360" font-family="Helvetica, Arial, sans-serif" font-size="86" font-weight="700" fill="${WHITE}">
    Zbuduj<tspan fill="${CYAN_LIGHT}">Kompa</tspan>
  </text>
  <text x="80" y="424" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="${WHITE}" opacity="0.72">
    Złóż komputer bez zgadywania
  </text>
  <text x="80" y="470" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="${WHITE}" opacity="0.5">
    Platformy · Chłodzenie · Zestawy · Poradniki
  </text>
  <text x="80" y="560" font-family="Helvetica, Arial, sans-serif" font-size="24" fill="${CYAN_LIGHT}">
    zbudujkompa.dawidolko.pl
  </text>
</svg>`;
}

async function main() {
  const { default: sharp } = await import('sharp');

  await mkdir(publicDir, { recursive: true });

  /* The SVG favicon is written directly — it is the sharpest option wherever
     it is supported, and the PNGs below only exist as a fallback. */
  await writeFile(join(publicDir, 'favicon.svg'), faviconSvg(), 'utf8');

  const iconSource = Buffer.from(markSvg({ size: 512, background: GRAPHITE }));

  const targets = [
    { file: 'favicon-96.png', size: 96 },
    { file: 'apple-touch-icon.png', size: 180 },
    { file: 'icon-192.png', size: 192 },
    { file: 'icon-512.png', size: 512 },
  ];

  for (const target of targets) {
    await sharp(iconSource, { density: 400 })
      .resize(target.size, target.size)
      .png({ compressionLevel: 9 })
      .toFile(join(publicDir, target.file));
    console.log(`wrote ${target.file} (${target.size}x${target.size})`);
  }

  /* favicon.ico carries the two sizes that legacy browsers actually request. */
  await sharp(iconSource, { density: 400 })
    .resize(32, 32)
    .toFormat('png')
    .toFile(join(publicDir, 'favicon.ico'));
  console.log('wrote favicon.ico (32x32)');

  await sharp(Buffer.from(ogSvg()), { density: 200 })
    .resize(1200, 630)
    .png({ compressionLevel: 9 })
    .toFile(join(publicDir, 'og-default.png'));
  console.log('wrote og-default.png (1200x630)');

  console.log('\nBrand assets regenerated.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
