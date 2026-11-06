import type { PriceRecord } from './price-types.ts';

/**
 * Price data for the catalogue, and the only place a price is written down.
 *
 * Generated: scripts/update-prices.mjs rewrites this file, so an edit by hand
 * has to keep this shape.
 *
 * `min` is the lowest sensible new retail price and `max` the typical price at
 * a mainstream shop, both in PLN. `min` and `max` are null when no credible
 * Polish price was found, and `reason` then says why. Records marked `manual`
 * are not touched by the automated refresh.
 */
export const priceRecords: Record<string, PriceRecord> = {
  'ryzen-5-7600': {
    min: 699,
    max: 839,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-ryzen+5+7600',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=ryzen%205%207600',
      },
    ],
  },
  'ryzen-7-7800x3d': {
    min: 1385,
    max: 1549,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-ryzen+7+7800x3d',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=ryzen%207%207800x3d',
      },
    ],
  },
  'ryzen-7-9700x': {
    min: 1138,
    max: 1329,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-ryzen+7+9700x',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=ryzen%207%209700x',
      },
    ],
  },
  'ryzen-9-9950x': {
    min: 2035,
    max: 2349,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-ryzen+9+9950x',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=ryzen%209%209950x',
      },
    ],
  },
  'ryzen-7-8700g': {
    min: 1098,
    max: 1269,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-ryzen+7+8700g',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=ryzen%207%208700g',
      },
    ],
  },
  'ryzen-5-5600': {
    min: 595,
    max: 599,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-ryzen+5+5600',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=ryzen%205%205600',
      },
    ],
  },
  'ryzen-7-5800x3d': {
    min: 1499,
    max: 1539,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-ryzen+7+5800x3d',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=ryzen%207%205800x3d',
      },
    ],
  },
  'core-ultra-5-245k': {
    min: 894,
    max: 899,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-core+ultra+5+245k',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=core%20ultra%205%20245k',
      },
    ],
  },
  'core-ultra-7-265k': {
    min: 1399,
    max: 1459,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Proline',
        url: 'https://proline.pl/?qp=core+ultra+7+265k',
      },
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-core+ultra+7+265k',
      },
    ],
  },
  'core-i5-14400f': {
    min: 629,
    max: 669,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-core+i5+14400f',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=core%20i5%2014400f',
      },
    ],
  },
  'core-i5-14600k': {
    min: 1089,
    max: 1159,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-core+i5+14600k',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=core%20i5%2014600k',
      },
    ],
  },
  'ryzen-5-9600x': {
    min: 689,
    max: 799,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-ryzen+5+9600x',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=ryzen%205%209600x',
      },
    ],
  },
  'ryzen-9-7900x3d': {
    min: 2249,
    max: 2275,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-ryzen+9+7900x3d',
      },
    ],
    note: 'Only three shops list the box; x-kom showed 2939 zł out of stock.',
  },
  'ryzen-9-9950x3d': {
    min: 2699,
    max: 2899,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-ryzen+9+9950x',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=ryzen%209%209950x',
      },
    ],
  },
  'ryzen-5-5500': {
    min: 385,
    max: 419,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-ryzen+5+5500',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=ryzen%205%205500',
      },
    ],
  },
  'ryzen-7-5700x': {
    min: 676,
    max: 849,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-ryzen+7+5700x',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=ryzen%207%205700x',
      },
    ],
  },
  'core-ultra-9-285k': {
    min: 2160,
    max: 2499,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-core+ultra+9+285k',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=core%20ultra%209%20285k',
      },
    ],
  },
  'core-i7-14700k': {
    min: 1622,
    max: 1729,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-core+i7+14700k',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=core%20i7%2014700k',
      },
    ],
  },
  'core-i3-14100f': {
    min: 449,
    max: 449,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-core+i3+14100f',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=core%20i3%2014100f',
      },
    ],
  },
  'b650m-pro-rs': {
    min: 512,
    max: 539,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-asrock+b650m+pro+rs',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=asrock%20b650m%20pro%20rs',
      },
    ],
  },
  'tuf-b650-plus-wifi': {
    min: 599,
    max: 639,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-asus+tuf+gaming+b650-plus+wifi',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=tuf%20gaming%20b650-plus%20wifi',
      },
    ],
  },
  'x870e-tomahawk': {
    min: 1425,
    max: 1651,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Proline',
        url: 'https://proline.pl/?qp=msi+mag+x870e+tomahawk+wifi',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=msi+mag+x870e+tomahawk+wifi',
      },
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-msi+mag+x870e+tomahawk+wifi',
      },
    ],
  },
  'b650i-lightning': {
    min: null,
    max: null,
    reason: 'no-offer',
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Proline',
        url: 'https://proline.pl/?qp=b650i+lightning',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=b650i%20lightning',
      },
    ],
    note: 'x-kom listed it out of stock and the only Ceneo offer was 1437 zł from Allegro, which is no retail price.',
  },
  'b550-a-pro': {
    min: 489,
    max: 558,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-msi+b550-a+pro',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=msi+b550-a+pro',
      },
    ],
  },
  'z890-tomahawk': {
    min: 1269,
    max: 1401,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Proline',
        url: 'https://proline.pl/?qp=msi+mag+z890+tomahawk+wifi',
      },
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-msi+mag+z890+tomahawk+wifi',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=msi+mag+z890+tomahawk+wifi',
      },
    ],
  },
  'b860m-pro': {
    min: 786,
    max: 786,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-msi+pro+b860m-a+wifi',
      },
    ],
    note: 'Four shops on Ceneo. x-kom showed 769 zł out of stock.',
  },
  'prime-b760m-a': {
    min: 379,
    max: 499,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-asus+prime+b760m-a',
      },
    ],
    note: 'Priced from the PRIME B760M-A-CSM listing, the corporate version, at 379 to 499 zł. The plain board was not listed.',
  },
  'b760m-ddr4': {
    min: 449,
    max: 449,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-msi+pro+b760m-p+ddr4',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=pro%20b760m-p%20ddr4',
      },
    ],
  },
  'x670e-hero': {
    min: null,
    max: null,
    reason: 'discontinued',
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/p/1072680-plyta-glowna-socket-am5-asus-rog-crosshair-x670e-hero.html',
      },
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-asus+rog+crosshair+x670e+hero',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=rog+crosshair+x670e+hero',
      },
      {
        label: 'Proline',
        url: 'https://proline.pl/?qp=crosshair+x670e+hero',
      },
    ],
    note: 'x-kom marks it Produkt wycofany.',
  },
  'b850-tomahawk': {
    min: 949,
    max: 1173,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-msi+mag+b850+tomahawk+wifi',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=mag%20b850%20tomahawk%20wifi',
      },
    ],
  },
  'a620m-hdv': {
    min: null,
    max: null,
    reason: 'no-offer',
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-a620m-hdv',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=a620m-hdv%2Fm.2',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=asrock+a620m-hdv/m.2',
      },
      {
        label: 'Proline',
        url: 'https://proline.pl/?qp=asrock+a620m',
      },
    ],
    note: 'Only an out-of-stock x-kom listing at 399 zł.',
  },
  'z890-aorus-elite': {
    min: 1099,
    max: 1145,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Proline',
        url: 'https://proline.pl/?qp=z890+aorus+elite+wifi7',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=z890%20aorus%20elite%20wifi7',
      },
    ],
    note: 'x-kom listed it out of stock.',
  },
  'flare-x5-32-6000': {
    min: 3029,
    max: 3457,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-g.skill+flare+x5+32gb+6000+cl30',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=flare%20x5%2032gb%206000%20cl30',
      },
    ],
  },
  'fury-beast-32-6000': {
    min: 2718,
    max: 3299,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-kingston+fury+beast+32gb+6000+cl36',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=fury%20beast%2032gb%206000%20cl36',
      },
    ],
  },
  'vengeance-64-6000': {
    min: 6531,
    max: 6636,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-corsair+vengeance+64gb+6000+cl30',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=corsair+vengeance+64gb+6000+cl30',
      },
    ],
    note: 'x-kom showed 5419 zł out of stock.',
  },
  'fury-beast-16-5600': {
    min: 1549,
    max: 1620,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-kingston+fury+beast+16gb+5600+cl36',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=KF556C36BBEK2-16',
      },
    ],
  },
  'lowprofile-32-6000': {
    min: null,
    max: null,
    reason: 'no-offer',
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-corsair+vengeance+ddr5+low+profile+32gb+6000',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=corsair+low+profile+ddr5+32gb+6000',
      },
    ],
    note: 'No Corsair DDR5 kit with this name and a 22 mm height could be identified.',
  },
  'fury-beast-16-3200': {
    min: 759,
    max: 909,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-kingston+fury+beast+16gb+3200+cl16+ddr4',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=fury%20beast%2016gb%203200%20cl16%20ddr4',
      },
    ],
  },
  'vengeance-32-3600': {
    min: null,
    max: null,
    reason: 'no-offer',
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-CMK32GX4M2Z3600C18',
      },
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-corsair+vengeance+lpx+32gb+3600+cl18',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=corsair+vengeance+lpx+32gb+3600+cl18',
      },
      {
        label: 'Proline',
        url: 'https://proline.pl/?qp=vengeance+lpx+32gb+3600',
      },
    ],
    note: 'Only the RGB kit CMW32GX4M2Z3600C18 from one shop at 1654 zł.',
  },
  'trident-z5-32-6400': {
    min: 3749,
    max: 3860,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-F5-6400J3239G16GX2-TZ5NR',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=g.skill+trident+z5+neo+32gb+6400+cl32',
      },
    ],
    note: 'x-kom asked 6999 zł in stock, nearly double every other shop, and was treated as an outlier.',
  },
  'fury-renegade-64-6000': {
    min: null,
    max: null,
    reason: 'no-offer',
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-KF560C32RSK264',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=KF560C32RSK2-64',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=kingston+fury+renegade+64gb+6000',
      },
      {
        label: 'Proline',
        url: 'https://proline.pl/?qp=fury+renegade+64gb',
      },
    ],
  },
  'crucial-32-5600': {
    min: 3019,
    max: 3054,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-crucial+pro+32gb+5600+ddr5',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=crucial+pro+32gb+5600',
      },
    ],
  },
  'rtx-5090': {
    min: 35887,
    max: 44999,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-geforce+rtx+5090',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=rtx%205090',
      },
    ],
    note: 'Lower bound is the MSI Ventus from 13 shops. A water-block-only card at 33999 zł was left out.',
  },
  'rtx-5080': {
    min: 8799,
    max: 8999,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-geforce+rtx+5080',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=rtx%205080',
      },
    ],
  },
  'rtx-5070-ti': {
    min: 5919,
    max: 6499,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-geforce+rtx+5070+ti',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=rtx%205070%20ti',
      },
    ],
  },
  'rtx-5070': {
    min: 3966,
    max: 4399,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-geforce+rtx+5070+12gb',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=geforce+rtx+5070+12gb',
      },
    ],
  },
  'rx-9070-xt': {
    min: 4168,
    max: 4399,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-radeon+rx+9070+xt',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=rx%209070%20xt',
      },
    ],
  },
  'rtx-5060-ti': {
    min: 3482,
    max: 3899,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-geforce+rtx+5060+ti+16gb',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=rtx%205060%20ti%2016gb',
      },
    ],
  },
  'rx-9060-xt': {
    min: 2770,
    max: 2999,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-radeon+rx+9060+xt+16gb',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=rx%209060%20xt%2016gb',
      },
    ],
  },
  'rtx-5060': {
    min: 2099,
    max: 2399,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-geforce+rtx+5060+8gb',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=rtx%205060%208gb',
      },
    ],
    note: 'x-kom charged 2099 zł only with a promo code, so its regular 2399 zł is the typical price.',
  },
  'rx-7600': {
    min: 1699,
    max: 1799,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-radeon+rx+7600+8gb',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=radeon%20rx%207600%208gb',
      },
    ],
  },
  'rx-9070': {
    min: 3490,
    max: 3699,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-radeon+rx+9070+16gb',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=rx%209070%2016gb',
      },
    ],
  },
  'rtx-5050': {
    min: 1738,
    max: 1849,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-geforce+rtx+5050',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=rtx%205050',
      },
    ],
  },
  'arc-b580': {
    min: 1798,
    max: 1799,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-intel+arc+b580',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=arc%20b580',
      },
    ],
  },
  'nv3-1tb': {
    min: 616,
    max: 635,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-kingston+nv3+1tb',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=kingston%20nv3%201tb',
      },
    ],
  },
  '990-evo-plus-2tb': {
    min: 1485,
    max: 1693,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-samsung+990+evo+plus+2tb',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=samsung+990+evo+plus+2tb',
      },
    ],
  },
  '990-pro-2tb': {
    min: 1699,
    max: 2299,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-samsung+990+pro+2tb',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=samsung%20990%20pro%202tb',
      },
    ],
  },
  'wd-blue-4tb-hdd': {
    min: 927,
    max: 968,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-WD40EZAX',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=wd+blue+4tb+wd40ezax',
      },
    ],
  },
  't705-2tb': {
    min: 2403,
    max: 2403,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-crucial+t705+2tb',
      },
    ],
    note: 'One offer on Ceneo. x-kom showed a stale 1199 zł out of stock.',
  },
  'nv3-2tb': {
    min: 1173,
    max: 1219,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-kingston+nv3+2tb',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=kingston%20nv3%202tb',
      },
    ],
  },
  'sn850x-4tb': {
    min: 2929,
    max: 3277,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-wd+black+sn850x+4tb',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=sn850x+4tb',
      },
    ],
    note: 'Now also sold under the Sandisk brand.',
  },
  'ironwolf-8tb': {
    min: 1566,
    max: 1599,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-seagate+ironwolf+8tb',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=seagate%20ironwolf%208tb',
      },
    ],
  },
  'system-power-10-550': {
    min: null,
    max: null,
    reason: 'no-offer',
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-be+quiet+system+power+10+550w',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=system%20power%2010%20550w',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=be+quiet+system+power+10+550w',
      },
      {
        label: 'Proline',
        url: 'https://proline.pl/?qp=system+power+10+550w',
      },
    ],
    note: 'Replaced in shops by the System Power 11 550 W, 249 to 259 zł.',
  },
  'pure-power-12m-650': {
    min: null,
    max: null,
    reason: 'no-offer',
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-be+quiet+pure+power+12+m+650w',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=pure%20power%2012%20m%20650w',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=be+quiet+pure+power+12+m+650w',
      },
      {
        label: 'Proline',
        url: 'https://proline.pl/?qp=pure+power+12+m',
      },
    ],
    note: 'One Ceneo offer at 1665 zł was treated as an outlier. x-kom sells the Pure Power 13 M 650 W at 469 zł.',
  },
  'pure-power-12m-750': {
    min: null,
    max: null,
    reason: 'no-offer',
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-be+quiet+pure+power+12+m+750w',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=pure%20power%2012%20m%20750w',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=be+quiet+pure+power+12+m+650w',
      },
      {
        label: 'Proline',
        url: 'https://proline.pl/?qp=pure+power+12+m',
      },
    ],
    note: 'One Ceneo offer at 1347.50 zł was treated as an outlier. x-kom sells the Pure Power 13 M 750 W at 499 zł.',
  },
  'focus-gx-850': {
    min: 599,
    max: 834,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Proline',
        url: 'https://proline.pl/?qp=seasonic+focus+gx+850',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=seasonic+focus+gx+850',
      },
    ],
    note: 'ATX 3.1 v4 black. x-kom showed 799 zł out of stock.',
  },
  'prime-tx-1000': {
    min: null,
    max: null,
    reason: 'no-offer',
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-seasonic+prime+tx+1000w+titanium',
      },
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-seasonic+prime+tx-1000',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=seasonic%20prime%20tx%201000',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=seasonic+prime+tx+1000',
      },
      {
        label: 'Proline',
        url: 'https://proline.pl/?qp=seasonic+prime+tx',
      },
    ],
  },
  sf750: {
    min: 703,
    max: 773,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-corsair+sf750',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=corsair+sf750',
      },
    ],
    note: '2024 revision. x-kom listed it out of stock.',
  },
  rm850x: {
    min: 529,
    max: 669,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-corsair+rm850x',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=corsair%20rm850x',
      },
    ],
  },
  'mpg-a1000g': {
    min: 499,
    max: 559,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-msi+mpg+a1000g+pcie5',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=msi%20mpg%20a1000g%20pcie5',
      },
    ],
  },
  sf850l: {
    min: 649,
    max: 649,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Proline',
        url: 'https://proline.pl/?qp=corsair+sf850l',
      },
    ],
    note: 'One shop only. Not listed on Ceneo, x-kom or Morele.',
  },
  'system-power-11-750': {
    min: 339,
    max: 339,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-be+quiet+system+power+11+750w',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=system%20power%2011%20750w',
      },
    ],
  },
  'focus-2': {
    min: 299,
    max: 359,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-fractal+design+focus+2',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=fractal%20design%20focus%202',
      },
    ],
    note: 'Plain black versions. The 269 zł RGB offer at x-kom needed a promo code.',
  },
  north: {
    min: 576,
    max: 719,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-fractal+design+north',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=fractal%20design%20north',
      },
    ],
  },
  'define-7': {
    min: 800,
    max: 889,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-fractal+design+define+7',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=fractal%20design%20define%207',
      },
    ],
  },
  terra: {
    min: 965,
    max: 1209,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-fractal+design+terra',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=fractal+design+terra',
      },
    ],
    note: 'Silver from one shop, Jade from three. x-kom listed every colour out of stock.',
  },
  'node-304': {
    min: 399,
    max: 530,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-fractal+design+node+304',
      },
    ],
    note: 'Two shops at 399 zł and one at 530 zł, on Ceneo only.',
  },
  'lancool-216': {
    min: 431,
    max: 449,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-lian+li+lancool+216',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=lian%20li%20lancool%20216',
      },
    ],
  },
  'pop-air': {
    min: 361,
    max: 392,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-fractal+design+pop+air',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=fractal+design+pop+air',
      },
    ],
    note: 'Ceneo also shows one 49 zł listing, rejected as an error.',
  },
  'o11-dynamic-evo': {
    min: 793,
    max: 793,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-lian+li+o11+dynamic+evo',
      },
    ],
    note: 'One white unit on Ceneo. Morele sells the RGB version at 699 to 769 zł.',
  },
  'meshify-2-compact': {
    min: 476,
    max: 589,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-fractal+design+meshify+2+compact',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=meshify%202%20compact',
      },
    ],
  },
  'ncase-m1': {
    min: null,
    max: null,
    reason: 'no-offer',
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-ncase+m1',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=ncase%20m1',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=ncase+m1',
      },
    ],
  },
  'assassin-x-120': {
    min: 80,
    max: 105,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-thermalright+assassin+x+120+r+se',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=thermalright%20assassin%20x%20120',
      },
    ],
  },
  'peerless-assassin-120': {
    min: 172,
    max: 199,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-thermalright+peerless+assassin+120+se',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=peerless%20assassin%20120%20se',
      },
    ],
  },
  'nh-d15-g2': {
    min: 617,
    max: 689,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-noctua+nh-d15+g2',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=noctua%20nh-d15%20g2',
      },
    ],
  },
  'nh-l12s': {
    min: 293,
    max: 293,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-noctua+nh-l12s',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=noctua+nh-l12s',
      },
    ],
  },
  'liquid-freezer-iii-240': {
    min: 429,
    max: 429,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-ACFRE00150A',
      },
    ],
    note: 'Only the ARGB White non-Pro was listed. The Pro 240 sells from 349 zł.',
  },
  'liquid-freezer-iii-360': {
    min: 429,
    max: 599,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-ACFRE00152A',
      },
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-arctic+liquid+freezer+iii+pro',
      },
    ],
    note: 'Non-Pro stock only. The Pro 360 sells from 422 zł.',
  },
  'phantom-spirit-120': {
    min: 180,
    max: 209,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-thermalright+phantom+spirit+120+se',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=phantom%20spirit%20120%20se',
      },
    ],
  },
  'nh-u12a': {
    min: 579,
    max: 579,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-noctua+nh-u12a',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=noctua+nh-u12a',
      },
    ],
    note: 'chromax.black version.',
  },
  ak620: {
    min: 239,
    max: 244,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-deepcool+ak620+digital',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=deepcool+ak620+digital',
      },
    ],
    note: 'White version.',
  },
  'kraken-360': {
    min: 900,
    max: 900,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-nzxt+kraken+360+rgb',
      },
    ],
    note: 'x-kom sells the newer Kraken Plus 360 RGB at 979 zł.',
  },
  'liquid-freezer-iii-420': {
    min: 714,
    max: 714,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-arctic+liquid+freezer+iii+420',
      },
    ],
    note: 'Only the ARGB White non-Pro was listed. The Pro 420 sells from 399 zł.',
  },
  'stock-wraith': {
    min: 0,
    max: 28,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-amd+wraith+stealth',
      },
    ],
    note: 'Free in a boxed Ryzen. 28 zł is the loose unit from nine shops.',
    manual: true,
  },
  'core-i5-14400': {
    min: 722,
    max: 787,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/162718502',
      },
    ],
    note: 'Thirteen offers on Ceneo. x-kom and Morele show 769 and 786 zł.',
  },
  'b650i-ax': {
    min: 591,
    max: 669,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/161459535',
      },
    ],
    note: 'Thirteen offers on Ceneo, from Amazon.pl at 591 zł to the usual 669 zł.',
  },
  'system-power-11-550': {
    min: 249,
    max: 249,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/183209183',
      },
    ],
    note: 'Thirteen offers on Ceneo, most of them at 249 zł.',
  },
  'pure-power-13m-650': {
    min: 429,
    max: 434,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/184870051',
      },
    ],
    note: 'Ten offers on Ceneo. The 550 W and 750 W models were not listed.',
  },
  'pure-power-13m-850': {
    min: 559,
    max: 569,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/184870070',
      },
    ],
    note: 'Thirteen offers on Ceneo, including x-kom at 559 zł.',
  },
  'liquid-freezer-iii-pro-360': {
    min: 326,
    max: 337,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/183982377',
      },
    ],
    note: 'Ten offers on Ceneo for the black version, ACFRE00180A.',
  },
  'class:air-tower-single': {
    min: 80,
    max: 579,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-thermalright+assassin+x+120+r+se',
      },
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-noctua+nh-u12a',
      },
    ],
    manual: true,
  },
  'class:air-tower-dual': {
    min: 172,
    max: 689,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-thermalright+peerless+assassin+120+se',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=noctua%20nh-d15%20g2',
      },
    ],
    manual: true,
  },
  'class:aio-240': {
    min: 349,
    max: 429,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=arctic+liquid+freezer+iii+240',
      },
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-ACFRE00150A',
      },
    ],
    manual: true,
  },
  'class:aio-360': {
    min: 422,
    max: 979,
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=arctic+liquid+freezer+iii+360',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=nzxt%20kraken%20360%20rgb',
      },
    ],
    manual: true,
  },
  'class:custom-loop': {
    min: null,
    max: null,
    reason: 'no-offer',
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-ek+quantum+zestaw+chlodzenia+wodnego',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=zestaw+chlodzenia+wodnego+custom+loop+ek',
      },
    ],
    note: 'Polish shops list single loop components, not complete kits.',
    manual: true,
  },
};
