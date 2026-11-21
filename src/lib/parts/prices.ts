import type { PriceRecord } from './price-types.ts';

/**
 * Price data for the catalogue, and the only place a price is written down.
 *
 * Generated: scripts/update-prices.mjs rewrites this file, so an edit by hand
 * has to keep this shape.
 *
 * `min` is the lowest sensible new retail price and `max` the typical price at
 * a mainstream shop, both in PLN. `min` and `max` are null when no credible
 * Polish price was found, and `reason` then says why. `tier` is where the part
 * sits in its category, and follows the price. Records marked `manual` are not
 * touched by the automated refresh.
 */
export const priceRecords: Record<string, PriceRecord> = {
  'ryzen-5-7600': {
    min: 720,
    max: 809,
    tier: 'value',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Komputronik.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=AMD Ryzen 5 7600&prds=catalogid:15649429508520211300,productid:4434757629732034504,headlineOfferDocid:16337966393425749199,imageDocid:4766575350231165040,rds:PC_8668203288417062033|PROD_PC_8668203288417062033,gpcid:8668203288417062033,mid:576462502699634545,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Morele.net',
        url: 'https://www.google.pl/search?ibp=oshop&q=AMD Ryzen 5 7600&prds=catalogid:8923206814553419003,productid:2557731187487065769,headlineOfferDocid:7698406833508906740,imageDocid:13163681745773986733,rds:PC_4629225366025754053|PROD_PC_4629225366025754053,gpcid:4629225366025754053,mid:576462898592099065,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Allegro',
        url: 'https://www.google.pl/search?ibp=oshop&q=AMD Ryzen 5 7600&prds=catalogid:13167775704470394617,productid:15159419962763418522,headlineOfferDocid:12872058678236986886,imageDocid:4872238539297090872,rds:PC_658759547135548271|PROD_PC_658759547135548271,gpcid:658759547135548271,mid:576462563317822275,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'ryzen-7-7800x3d': {
    min: 1349,
    max: 1365,
    tier: 'high',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/151188370',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=amd+ryzen+7+7800x3d',
      },
    ],
    note: 'Six shops at 1349 zł and Komputronik at 1365 zł. A single Amazon.pl offer at 1314 zł was left out.',
  },
  'ryzen-7-9700x': {
    min: 1169,
    max: 1199,
    tier: 'midrange',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/171280719',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=ryzen%207%209700x',
      },
    ],
    note: 'x-kom, Morele, Media Expert and Euro at 1199 zł, in stock.',
  },
  'ryzen-9-9950x': {
    min: 2035,
    max: 2349,
    tier: 'flagship',
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
    min: 1105,
    max: 1192,
    tier: 'midrange',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Ceneo.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=AMD Ryzen 7 8700G&prds=catalogid:1634578644493521773,productid:4149856303875599741,headlineOfferDocid:15542789865864779863,imageDocid:2903724306239126784,rds:PC_5921076765591036106|PROD_PC_5921076765591036106,gpcid:5921076765591036106,mid:576462576362934319,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Ceneo.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=AMD Ryzen 7 8700G&prds=catalogid:1027265075811498551,productid:6113838667115846674,headlineOfferDocid:15804505564901153221,imageDocid:837412585780198397,rds:PC_12177506634110362820|PROD_PC_12177506634110362820,gpcid:12177506634110362820,mid:576462567153397628,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Allegro',
        url: 'https://www.google.pl/search?ibp=oshop&q=AMD Ryzen 7 8700G&prds=catalogid:3908869852271520880,productid:5384749675770347210,headlineOfferDocid:8865120734945400803,imageDocid:10817485652387950000,rds:PC_14085335091890070398|PROD_PC_14085335091890070398,gpcid:14085335091890070398,mid:576462771787911540,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'ryzen-5-5600': {
    min: 491,
    max: 499,
    tier: 'budget',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Allegro',
        url: 'https://www.google.pl/search?ibp=oshop&q=AMD Ryzen 5 5600&prds=catalogid:11895633128929124327,productid:4508521361517511109,headlineOfferDocid:4904398089095598516,imageDocid:17500768873307426314,rds:PC_1875748572235329105|PROD_PC_1875748572235329105,gpcid:1875748572235329105,mid:576462912464555254,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Sferis.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=AMD Ryzen 5 5600&prds=catalogid:1576761766720434043,productid:13189606938195549769,headlineOfferDocid:4228454107346220200,imageDocid:11303083903118901118,rds:PC_11964045099704766664|PROD_PC_11964045099704766664,gpcid:11964045099704766664,mid:576462915889560767,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Etroniks.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=AMD Ryzen 5 5600&prds=catalogid:4332214422884738018,productid:10721576293245410819,headlineOfferDocid:5213532268688642166,imageDocid:8974662553753160682,rds:PC_7106884098092755516|PROD_PC_7106884098092755516,gpcid:7106884098092755516,mid:576462916899105329,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'ryzen-7-5800x3d': {
    min: 1795,
    max: 2119,
    tier: 'high',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Allegro',
        url: 'https://www.google.pl/search?ibp=oshop&q=AMD Ryzen 7 5800X3D&prds=productid:13450733777445531247,headlineOfferDocid:13450733777445531247,imageDocid:8505742917525076047,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Deluxury',
        url: 'https://www.google.pl/search?ibp=oshop&q=AMD Ryzen 7 5800X3D&prds=productid:9306192661340627554,headlineOfferDocid:9306192661340627554,imageDocid:16304609987610721327,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Allegro',
        url: 'https://www.google.pl/search?ibp=oshop&q=AMD Ryzen 7 5800X3D&prds=productid:4443606341078982551,headlineOfferDocid:4443606341078982551,imageDocid:3082241142133933308,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'core-ultra-5-245k': {
    min: 889,
    max: 942,
    tier: 'value',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/175358046',
      },
    ],
    note: 'Sferis 889 zł and Morele 942 zł. A single Amazon.pl offer at 748 zł was left out, and x-kom listed it out of stock.',
  },
  'core-ultra-7-265k': {
    min: 1459,
    max: 1459,
    tier: 'high',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/175216878',
      },
    ],
    note: 'Only Komputronik had it in stock; x-kom showed the same price out of stock.',
  },
  'core-i5-14400f': {
    min: 617,
    max: 669,
    tier: 'budget',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Allegro',
        url: 'https://www.google.pl/search?ibp=oshop&q=Intel Core i5-14400F&prds=catalogid:7301560944985535934,productid:11757378275083075428,headlineOfferDocid:14865974484826821567,imageDocid:5557068251658830483,rds:PC_3879402558664737314|PROD_PC_3879402558664737314,gpcid:3879402558664737314,mid:576462793972299521,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Netland24',
        url: 'https://www.google.pl/search?ibp=oshop&q=Intel Core i5-14400F&prds=catalogid:8199246663706806864,productid:2725810341460490547,headlineOfferDocid:15593119027095635193,imageDocid:8175808577835461694,rds:PC_3278202938590738087|PROD_PC_3278202938590738087,gpcid:3278202938590738087,mid:576462563284769467,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Buy-IT.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Intel Core i5-14400F&prds=catalogid:5437876699434262745,productid:15505078369322616526,headlineOfferDocid:18258110442913157314,imageDocid:17592018114165587271,rds:PC_12991530199921748789|PROD_PC_12991530199921748789,gpcid:12991530199921748789,mid:576462917246922589,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'core-i5-14600k': {
    min: 1036,
    max: 1077,
    tier: 'midrange',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Allegro',
        url: 'https://www.google.pl/search?ibp=oshop&q=Intel Core i5-14600K&prds=catalogid:13646488709691962966,productid:3838124716270531609,headlineOfferDocid:3845718403268090156,imageDocid:1494818686875037746,rds:PC_15669376971807638668|PROD_PC_15669376971807638668,gpcid:15669376971807638668,mid:576462916364437415,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Mironet.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Intel Core i5-14600K&prds=catalogid:9840148464988852632,productid:1350321945031069503,headlineOfferDocid:18092768397556466811,imageDocid:9383407400820735174,rds:PC_8261291337736785649|PROD_PC_8261291337736785649,gpcid:8261291337736785649,mid:576462575678549294,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Microless.com',
        url: 'https://www.google.pl/search?ibp=oshop&q=Intel Core i5-14600K&prds=catalogid:918071325120022813,productid:3976613310553471248,headlineOfferDocid:9175807305005095383,imageDocid:13147938978440686674,rds:PC_3726405076505470995|PROD_PC_3726405076505470995,gpcid:3726405076505470995,mid:576462892657232827,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'ryzen-5-9600x': {
    min: 739,
    max: 749,
    tier: 'value',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/171280884',
      },
    ],
    note: 'x-kom, Media Expert, Euro and Neonet at 749 zł.',
  },
  'ryzen-9-7900x3d': {
    min: 2249,
    max: 2275,
    tier: 'flagship',
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
    min: 2300,
    max: 2879,
    tier: 'flagship',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Ceneo.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=AMD Ryzen 9 9950X3D&prds=productid:15730833571536603171,headlineOfferDocid:15730833571536603171,imageDocid:12861089127808085028,rds:PC_9836810663656115255|PROD_PC_9836810663656115255,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Electro.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=AMD Ryzen 9 9950X3D&prds=catalogid:18235918576730165959,productid:8386966002398064347,headlineOfferDocid:4588071625549285104,imageDocid:14308994865150062128,rds:PC_643293850459846933|PROD_PC_643293850459846933,gpcid:643293850459846933,mid:576462892678791340,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Allegro',
        url: 'https://www.google.pl/search?ibp=oshop&q=AMD Ryzen 9 9950X3D&prds=catalogid:15517325382371697467,productid:10394967221983057218,headlineOfferDocid:12179879249127199191,imageDocid:9089259085598785741,rds:PC_3426478417096671751|PROD_PC_3426478417096671751,gpcid:3426478417096671751,mid:576462916873015192,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'ryzen-5-5500': {
    min: 359,
    max: 461,
    tier: 'budget',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Allegro',
        url: 'https://www.google.pl/search?ibp=oshop&q=AMD Ryzen 5 5500&prds=productid:835509441080596353,headlineOfferDocid:835509441080596353,imageDocid:12235359678264776257,rds:PC_14544401599678066447|PROD_PC_14544401599678066447,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'balta.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=AMD Ryzen 5 5500&prds=productid:12358621067130606736,headlineOfferDocid:12358621067130606736,imageDocid:470924278997428355,rds:PC_9123094277819938491|PROD_PC_9123094277819938491,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Komputronik.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=AMD Ryzen 5 5500&prds=catalogid:11014790934219036926,productid:17459975991766864829,headlineOfferDocid:17624361433755849819,imageDocid:6781205325056365394,rds:PC_7206357340401329705|PROD_PC_7206357340401329705,gpcid:7206357340401329705,mid:576462768726020686,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'ryzen-7-5700x': {
    min: 644,
    max: 673,
    tier: 'budget',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'JayNET',
        url: 'https://www.google.pl/search?ibp=oshop&q=AMD Ryzen 7 5700X&prds=catalogid:14029962298470008637,productid:11378898235325404378,headlineOfferDocid:14205298103564047952,imageDocid:4255440572045268385,rds:PC_16974833399580282934|PROD_PC_16974833399580282934,gpcid:16974833399580282934,mid:576462898595415490,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Media Expert',
        url: 'https://www.google.pl/search?ibp=oshop&q=AMD Ryzen 7 5700X&prds=catalogid:3864019882445002929,productid:8008568088522218195,headlineOfferDocid:11255792723902685571,imageDocid:12682021969043080136,rds:PC_4099857183052818360|PROD_PC_4099857183052818360,gpcid:4099857183052818360,mid:576462800907194879,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Morele.net',
        url: 'https://www.google.pl/search?ibp=oshop&q=AMD Ryzen 7 5700X&prds=catalogid:7647986626036816529,productid:8741968070815329753,headlineOfferDocid:8950409996804997109,imageDocid:4528313077599621355,rds:PC_5899213217431006524|PROD_PC_5899213217431006524,gpcid:5899213217431006524,mid:576462576360106440,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'core-ultra-9-285k': {
    min: 2160,
    max: 2499,
    tier: 'flagship',
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
    min: 1337,
    max: 1592,
    tier: 'high',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'AiO',
        url: 'https://www.google.pl/search?ibp=oshop&q=Intel Core i7-14700K&prds=catalogid:15208857966970134331,productid:9200565206544756695,headlineOfferDocid:9766178589210694958,imageDocid:12854965240135591393,rds:PC_11830207691819391382|PROD_PC_11830207691819391382,gpcid:11830207691819391382,mid:576462807117015819,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Net-s.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Intel Core i7-14700K&prds=catalogid:6368476590018865018,productid:10075511510403837834,headlineOfferDocid:1342192900144843871,imageDocid:3902907277308885790,gpcid:9821291066336058594,mid:576462575678344642,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Morele.net',
        url: 'https://www.google.pl/search?ibp=oshop&q=Intel Core i7-14700K&prds=catalogid:13842747258178952810,productid:14930897781602233888,headlineOfferDocid:15435641773842938604,imageDocid:15943907061366386256,rds:PC_15327405411359749505|PROD_PC_15327405411359749505,gpcid:15327405411359749505,mid:576462896413217781,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'core-i3-14100f': {
    min: 399,
    max: 484,
    tier: 'budget',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'balta.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Intel Core i3-14100F&prds=productid:12613108736776502669,headlineOfferDocid:12613108736776502669,imageDocid:9927815972499429810,rds:PC_57252538708224416|PROD_PC_57252538708224416,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Ceneo.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Intel Core i3-14100F&prds=catalogid:7023692581481016330,productid:17906153850144111937,headlineOfferDocid:5203213742709123605,imageDocid:1590144612319518176,rds:PC_57252538708224416|PROD_PC_57252538708224416,gpcid:57252538708224416,mid:576462895433941307,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'beststore.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Intel Core i3-14100F&prds=catalogid:73870122470759705,productid:13364248964158730715,headlineOfferDocid:17268290324336675289,imageDocid:8228879904563587066,gpcid:7770697068913632897,mid:576462896408542190,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'b650m-pro-rs': {
    min: 510,
    max: 587,
    tier: 'budget',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Arakom',
        url: 'https://www.google.pl/search?ibp=oshop&q=ASRock B650M Pro RS&prds=catalogid:15715276634104473598,productid:14439089266798052401,headlineOfferDocid:5238683483886438922,imageDocid:10725955943208261354,rds:PC_1674166996852702024|PROD_PC_1674166996852702024,gpcid:1674166996852702024,mid:576462881041959479,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Arakom',
        url: 'https://www.google.pl/search?ibp=oshop&q=ASRock B650M Pro RS&prds=productid:5238683483886438922,headlineOfferDocid:5238683483886438922,imageDocid:10725955943208261354,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'ekonomat.hr',
        url: 'https://www.google.pl/search?ibp=oshop&q=ASRock B650M Pro RS&prds=productid:13746669976047811542,headlineOfferDocid:13746669976047811542,imageDocid:6511317839682900020,rds:PC_6953628979037792697|PROD_PC_6953628979037792697,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'tuf-b650-plus-wifi': {
    min: 638,
    max: 639,
    tier: 'value',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=tuf%20gaming%20b650-plus%20wifi',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=asus+tuf+gaming+b650-plus+wifi',
      },
    ],
  },
  'x870e-tomahawk': {
    min: 1425,
    max: 1651,
    tier: 'high',
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
    tier: 'value',
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
    tier: 'budget',
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
    tier: 'high',
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
    tier: 'value',
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
    tier: 'budget',
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
    tier: 'budget',
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
    tier: 'flagship',
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
    min: 1060,
    max: 1156,
    tier: 'midrange',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=msi+mag+b850+tomahawk+wifi',
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
    tier: 'budget',
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
    tier: 'midrange',
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
    tier: 'midrange',
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
    min: 2480,
    max: 2928,
    tier: 'value',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Allegro',
        url: 'https://www.google.pl/search?ibp=oshop&q=Kingston Fury Beast 32GB DDR5-6000 CL36&prds=catalogid:252943907521303870,productid:7257851422579959369,headlineOfferDocid:739723813653766322,imageDocid:15891368139632761432,rds:PC_4923869750749931850|PROD_PC_4923869750749931850,gpcid:4923869750749931850,mid:576462917144570754,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'IT Planet',
        url: 'https://www.google.pl/search?ibp=oshop&q=Kingston Fury Beast 32GB DDR5-6000 CL36&prds=catalogid:2692687261290123372,productid:2124280177934837633,headlineOfferDocid:2586857120628182634,imageDocid:16219631761290378636,rds:PC_9416205868472808162|PROD_PC_9416205868472808162,gpcid:2874012486643964286,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Allegro',
        url: 'https://www.google.pl/search?ibp=oshop&q=Kingston Fury Beast 32GB DDR5-6000 CL36&prds=catalogid:14424359800455697783,productid:5032972010701272281,headlineOfferDocid:6822731433913232184,imageDocid:4213376670294318855,rds:PC_9568820397724984986|PROD_PC_9568820397724984986,gpcid:1444530884132263903,mid:576462916467164736,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'vengeance-64-6000': {
    min: 6531,
    max: 6636,
    tier: 'high',
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
    min: 1379,
    max: 2223,
    tier: 'value',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'arena.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Kingston Fury Beast 16GB DDR5-5600 CL36&prds=productid:14601508419558777600,headlineOfferDocid:14601508419558777600,imageDocid:12853167827095296953,rds:PC_16719457995202572025|PROD_PC_16719457995202572025,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'arena.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Kingston Fury Beast 16GB DDR5-5600 CL36&prds=productid:14188205408019672041,headlineOfferDocid:14188205408019672041,imageDocid:10604097519154919025,rds:PC_4312295782712901619|PROD_PC_4312295782712901619,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Allegro',
        url: 'https://www.google.pl/search?ibp=oshop&q=Kingston Fury Beast 16GB DDR5-5600 CL36&prds=catalogid:17518493323910130817,productid:3009304432726441187,headlineOfferDocid:3723441717566879905,imageDocid:4213376670294318855,rds:PC_8117050439766187242|PROD_PC_8117050439766187242,gpcid:8117050439766187242,mid:576462563955643436,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'lowprofile-32-6000': {
    min: null,
    max: null,
    tier: 'midrange',
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
    min: 811,
    max: 909,
    tier: 'budget',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=kingston+fury+beast+ddr4+16gb+3200+cl16',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=kingston%20fury%20beast%2016gb%202x8gb%203200%20ddr4',
      },
    ],
    note: 'KF432C16BBK2/16: Morele 811 zł, x-kom 909 zł in stock.',
  },
  'vengeance-32-3600': {
    min: null,
    max: null,
    tier: 'value',
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
    tier: 'high',
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
    tier: 'high',
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
    tier: 'value',
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
    min: 39472,
    max: 41997,
    tier: 'flagship',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Empik.com',
        url: 'https://www.google.pl/search?ibp=oshop&q=GeForce RTX 5090&prds=catalogid:15603737721296798265,productid:15142048528705180086,headlineOfferDocid:9353869971179522233,imageDocid:7309518433341601947,rds:PC_18364702699777354389|PROD_PC_18364702699777354389,gpcid:18364702699777354389,mid:576462814192694852,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Proshop.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=GeForce RTX 5090&prds=catalogid:1393896463611403876,productid:17561834370118036692,headlineOfferDocid:9308749304656153456,imageDocid:9533798141540074725,rds:PC_8798291469362399672|PROD_PC_8798291469362399672,gpcid:7968905315227671235,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Madman Gaming',
        url: 'https://www.google.pl/search?ibp=oshop&q=GeForce RTX 5090&prds=catalogid:8258267174041214872,productid:13440945647834183024,headlineOfferDocid:15751728194990934128,imageDocid:13753787415821796485,rds:PC_13882748776852975850|PROD_PC_13882748776852975850,gpcid:13882748776852975850,mid:576462892701264032,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'rtx-5080': {
    min: 8142,
    max: 9499,
    tier: 'flagship',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'techlord.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=GeForce RTX 5080&prds=catalogid:2758866956958849886,productid:5835925474997926873,headlineOfferDocid:13974220436732474878,imageDocid:3795411600363668949,rds:PC_5119551313277968245|PROD_PC_5119551313277968245,gpcid:5119551313277968245,mid:576462813816661407,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'SuperTech.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=GeForce RTX 5080&prds=catalogid:16844684953332686851,productid:3109217383021313366,headlineOfferDocid:17641914503612052732,imageDocid:13254303435402367781,rds:PC_6997274284137934162|PROD_PC_6997274284137934162,gpcid:6997274284137934162,mid:576462913477697938,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Komputronik.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=GeForce RTX 5080&prds=catalogid:6226839780713908286,productid:17196187273047143724,headlineOfferDocid:13985751808934956330,imageDocid:17710187237564184460,rds:PC_17850292253938305053|PROD_PC_17850292253938305053,gpcid:17850292253938305053,mid:576462897992625874,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'rtx-5070-ti': {
    min: 5482,
    max: 7249,
    tier: 'high',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'RTV Euro AGD',
        url: 'https://www.google.pl/search?ibp=oshop&q=GeForce RTX 5070 Ti&prds=catalogid:2068020788210657009,productid:10905010988446548537,headlineOfferDocid:5560292383203368324,imageDocid:9313317692852675773,rds:PC_13212379037515836399|PROD_PC_13212379037515836399,gpcid:13212379037515836399,mid:576462898014303644,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'RTV Euro AGD',
        url: 'https://www.google.pl/search?ibp=oshop&q=GeForce RTX 5070 Ti&prds=catalogid:16884268297224424258,productid:6681079010043837500,headlineOfferDocid:16212141777948684469,imageDocid:17651559653410359888,rds:PC_11669251472695706543|PROD_PC_11669251472695706543,gpcid:11669251472695706543,mid:576462898838482218,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Sferis.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=GeForce RTX 5070 Ti&prds=catalogid:3999261027247967051,productid:7845501299129551905,headlineOfferDocid:15139746538827352186,imageDocid:11281945635373054103,rds:PC_2937898156323419773|PROD_PC_2937898156323419773,gpcid:1534454497515900474,mid:576462912457055609,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'rtx-5070': {
    min: 4099,
    max: 4399,
    tier: 'midrange',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=rtx%205070',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=rtx+5070',
      },
    ],
    note: 'Zotac Twin Edge 4099 zł at x-kom; MSI Ventus 4399 zł.',
  },
  'rx-9070-xt': {
    min: 3999,
    max: 4799,
    tier: 'high',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Allegro',
        url: 'https://www.google.pl/search?ibp=oshop&q=Radeon RX 9070 XT&prds=catalogid:12112139623187190370,productid:15321128583821364252,headlineOfferDocid:4464638385783580724,imageDocid:12552380639933262537,rds:PC_11443036990498996467|PROD_PC_11443036990498996467,gpcid:5499032935705639385,mid:576462815174049830,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Komputronik.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Radeon RX 9070 XT&prds=catalogid:13111375620666662406,productid:4188388583549825571,headlineOfferDocid:5529553105214360848,imageDocid:4253869833166615839,rds:PC_15101717014273956906|PROD_PC_15101717014273956906,gpcid:15101717014273956906,mid:576462511701399259,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Proshop.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Radeon RX 9070 XT&prds=catalogid:11690592004287933295,productid:7338821260152962332,headlineOfferDocid:4357500097831527496,imageDocid:2949335052204560251,rds:PC_1860684814613040841|PROD_PC_1860684814613040841,gpcid:1860684814613040841,mid:576462556859803511,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'rtx-5060-ti': {
    min: 2975,
    max: 3788,
    tier: 'midrange',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Komtek24',
        url: 'https://www.google.pl/search?ibp=oshop&q=GeForce RTX 5060 Ti 16GB&prds=catalogid:16556367407325171968,productid:14961583872536403679,headlineOfferDocid:12739970096720765246,imageDocid:11440497445757701557,rds:PC_9009545737542031576|PROD_PC_9009545737542031576,gpcid:5512649739520223398,mid:576462916466435945,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'i-hurtownia.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=GeForce RTX 5060 Ti 16GB&prds=catalogid:6274750334095952043,productid:17847470963132624084,headlineOfferDocid:8311626795790384252,imageDocid:16901926700914537237,rds:PC_4252533294290571249|PROD_PC_4252533294290571249,gpcid:4252533294290571249,mid:576462834182050891,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Cablio',
        url: 'https://www.google.pl/search?ibp=oshop&q=GeForce RTX 5060 Ti 16GB&prds=catalogid:6115305711260850622,productid:5690493736514910751,headlineOfferDocid:18292295455817762879,imageDocid:2377437321651908495,rds:PC_6260824916908781507|PROD_PC_6260824916908781507,gpcid:3763784696555387941,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'rx-9060-xt': {
    min: 2783,
    max: 3619,
    tier: 'midrange',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Empik.com',
        url: 'https://www.google.pl/search?ibp=oshop&q=Radeon RX 9060 XT 16GB&prds=catalogid:6334973160659794613,productid:1368399459765618037,headlineOfferDocid:5055940814221083375,imageDocid:16530346430924341151,rds:PC_17272047900390199997|PROD_PC_17272047900390199997,gpcid:17272047900390199997,mid:576462861877545206,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Allegro',
        url: 'https://www.google.pl/search?ibp=oshop&q=Radeon RX 9060 XT 16GB&prds=catalogid:18362623957851369752,productid:3298934171334748067,headlineOfferDocid:14756768634217253369,imageDocid:836274756362184449,rds:PC_17272047900390199997|PROD_PC_17272047900390199997,gpcid:11397438057470934863,mid:576462576459276084,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Allegro',
        url: 'https://www.google.pl/search?ibp=oshop&q=Radeon RX 9060 XT 16GB&prds=catalogid:17917842433695151128,productid:16509566461824496897,headlineOfferDocid:12680464024831069356,imageDocid:10602774762903603521,rds:PC_364405184978325900|PROD_PC_364405184978325900,gpcid:364405184978325900,mid:576462828005337029,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'rtx-5060': {
    min: 1888,
    max: 2300,
    tier: 'budget',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Ceneo.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=GeForce RTX 5060 8GB&prds=catalogid:11169237399001315210,productid:3927450045850828575,headlineOfferDocid:3270536416886259921,imageDocid:13454561276004677415,rds:PC_4595664188690823458|PROD_PC_4595664188690823458,gpcid:4595664188690823458,mid:576462899896786953,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Media Expert',
        url: 'https://www.google.pl/search?ibp=oshop&q=GeForce RTX 5060 8GB&prds=catalogid:17910375560282261100,productid:15135247742132149706,headlineOfferDocid:12674369491969252306,imageDocid:4535248471925042743,rds:PC_6074064039852755360|PROD_PC_6074064039852755360,gpcid:6074064039852755360,mid:576462878433952741,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Media Expert',
        url: 'https://www.google.pl/search?ibp=oshop&q=GeForce RTX 5060 8GB&prds=catalogid:6496502507290410295,productid:3624720520395698536,headlineOfferDocid:16324913739947766252,imageDocid:9259957195195264126,gpcid:6347150750134975032,mid:576462576251357899,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'rx-7600': {
    min: 1698,
    max: 1899,
    tier: 'budget',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'RTV Euro AGD',
        url: 'https://www.google.pl/search?ibp=oshop&q=Radeon RX 7600 8GB&prds=catalogid:11968904791600693292,productid:14211910750507563048,headlineOfferDocid:11354846624573622048,imageDocid:15254062954311691500,rds:PC_6669032190776984956|PROD_PC_6669032190776984956,gpcid:6669032190776984956,mid:576462833416431556,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Ceneo.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Radeon RX 7600 8GB&prds=catalogid:6742787634618600201,productid:8162238917489532235,headlineOfferDocid:18383837744406638887,imageDocid:9602001607045832625,rds:PC_7410150555092963464|PROD_PC_7410150555092963464,gpcid:7410150555092963464,mid:576462828350350246,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Amazon.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Radeon RX 7600 8GB&prds=catalogid:2681345985933322323,productid:4727461802200710283,headlineOfferDocid:6308242969409130390,imageDocid:1031692679239918782,rds:PC_33059899947944675|PROD_PC_33059899947944675,gpcid:33059899947944675,mid:576462823634786521,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'rx-9070': {
    min: 3498,
    max: 4384,
    tier: 'midrange',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'balta.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Radeon RX 9070 16GB&prds=catalogid:3053659915576919775,productid:9099020468762692152,headlineOfferDocid:822485558054999697,imageDocid:5578941450451553485,rds:PC_11690897758214564146|PROD_PC_11690897758214564146,gpcid:11690897758214564146,mid:576462518212324012,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'OleOle!',
        url: 'https://www.google.pl/search?ibp=oshop&q=Radeon RX 9070 16GB&prds=catalogid:2187667009221006396,productid:11046652476778952098,headlineOfferDocid:7543902539159706655,imageDocid:978146635419995964,rds:PC_17009025325573494352|PROD_PC_17009025325573494352,gpcid:17009025325573494352,mid:576462823842110325,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Ceneo.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Radeon RX 9070 16GB&prds=catalogid:1940773483563668870,productid:6021992181233880120,headlineOfferDocid:17089873087738817948,imageDocid:6688445433029807920,rds:PC_761774092761481988|PROD_PC_761774092761481988,gpcid:761774092761481988,mid:576462866915254564,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'rtx-5050': {
    min: 1768,
    max: 2189,
    tier: 'budget',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'PCX Poland',
        url: 'https://www.google.pl/search?ibp=oshop&q=GeForce RTX 5050&prds=productid:6418083059767420182,headlineOfferDocid:6418083059767420182,imageDocid:3646726682959752674,rds:PC_1212926700843472541|PROD_PC_1212926700843472541,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Allegro',
        url: 'https://www.google.pl/search?ibp=oshop&q=GeForce RTX 5050&prds=catalogid:16998750187908068236,productid:3861282189494454077,headlineOfferDocid:17950738329245622093,imageDocid:4894030608273252923,rds:PC_16675787666521023607|PROD_PC_16675787666521023607,gpcid:4530848521883661553,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'od-tech.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=GeForce RTX 5050&prds=catalogid:1259412635751694656,productid:6724610482966577938,headlineOfferDocid:17043276617579099558,imageDocid:8208666185027499228,rds:PC_15783705023283260914|PROD_PC_15783705023283260914,gpcid:15783705023283260914,mid:576462917250464702,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'arc-b580': {
    min: 1798,
    max: 1799,
    tier: 'budget',
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
    min: 635,
    max: 646,
    tier: 'budget',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=kingston%20nv3',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=kingston+nv3',
      },
    ],
  },
  '990-evo-plus-2tb': {
    min: 1485,
    max: 1693,
    tier: 'midrange',
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
    min: 2299,
    max: 2371,
    tier: 'high',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=samsung%20990%20pro%202tb',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=samsung+990+2tb',
      },
    ],
    note: 'x-kom 2299 zł in stock, Morele 2371 zł. A marketplace offer at 1950 zł was left out.',
  },
  'wd-blue-4tb-hdd': {
    min: 944,
    max: 1017,
    tier: 'value',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'kacubo.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=WD Blue 4TB WD40EZAX&prds=catalogid:11952609536088805551,productid:3712735979578412358,headlineOfferDocid:16870497706217669429,imageDocid:10491258723395330770,rds:PC_5310263990319914481|PROD_PC_5310263990319914481,gpcid:7698679050028779123,mid:576462563328256894,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'SMB',
        url: 'https://www.google.pl/search?ibp=oshop&q=WD Blue 4TB WD40EZAX&prds=catalogid:13338032151911422958,productid:6997663198089125037,headlineOfferDocid:10689515512909732382,imageDocid:9371436603269375007,rds:PC_5099998308046673320|PROD_PC_5099998308046673320,gpcid:4817963232924753363,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Allegro',
        url: 'https://www.google.pl/search?ibp=oshop&q=WD Blue 4TB WD40EZAX&prds=catalogid:7197090702025845354,productid:3985044391483810325,headlineOfferDocid:10232258302533813097,imageDocid:7960332036508832998,rds:PC_10682447558375122828|PROD_PC_10682447558375122828,gpcid:14052234650370433606,mid:576462576402359075,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  't705-2tb': {
    min: 2403,
    max: 2403,
    tier: 'high',
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
    min: 1189,
    max: 1217,
    tier: 'value',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=kingston%20nv3',
      },
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=kingston+nv3',
      },
    ],
  },
  'sn850x-4tb': {
    min: 2929,
    max: 3277,
    tier: 'flagship',
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
    min: 1115,
    max: 1649,
    tier: 'midrange',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'ITnes.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Seagate IronWolf 8TB&prds=catalogid:3649828781742593084,productid:8013494995841210764,headlineOfferDocid:3761824770202697650,imageDocid:13003154862765965475,rds:PC_11216380883413540145|PROD_PC_11216380883413540145,gpcid:11216380883413540145,mid:576462897994514472,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Allegro',
        url: 'https://www.google.pl/search?ibp=oshop&q=Seagate IronWolf 8TB&prds=catalogid:16553660294007621222,productid:3407721445840024412,headlineOfferDocid:5284795687716058013,imageDocid:10892442410545752431,rds:PC_7508066457006152035|PROD_PC_7508066457006152035,gpcid:7508066457006152035,mid:576462916005520411,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Allegro',
        url: 'https://www.google.pl/search?ibp=oshop&q=Seagate IronWolf 8TB&prds=catalogid:10336539201835218969,productid:1116478465776485741,headlineOfferDocid:3839928883011769854,imageDocid:4428153402032493414,rds:PC_3440693835483474162|PROD_PC_3440693835483474162,gpcid:3440693835483474162,mid:576462912477384779,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'system-power-10-550': {
    min: null,
    max: null,
    tier: 'budget',
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
    tier: 'value',
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
    tier: 'midrange',
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
    tier: 'midrange',
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
    tier: 'flagship',
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
    tier: 'midrange',
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
    min: 589,
    max: 648,
    tier: 'value',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Ceneo.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Corsair RM850x&prds=catalogid:1959701718958880861,productid:17287911883322291714,headlineOfferDocid:14707227340174937834,imageDocid:7155402509298462211,rds:PC_15894280652699318276|PROD_PC_15894280652699318276,gpcid:769071469628759365,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Backbone Krzysztof Raczyński',
        url: 'https://www.google.pl/search?ibp=oshop&q=Corsair RM850x&prds=productid:4516513515544362176,headlineOfferDocid:4516513515544362176,imageDocid:17018070843745756221,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Media Expert',
        url: 'https://www.google.pl/search?ibp=oshop&q=Corsair RM850x&prds=catalogid:4744672154733375785,productid:18171335536875342153,headlineOfferDocid:13708155707215138018,imageDocid:12716947463368184913,rds:PC_6180385986387585230|PROD_PC_6180385986387585230,gpcid:6180385986387585230,mid:576462916375410854,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'mpg-a1000g': {
    min: 499,
    max: 559,
    tier: 'value',
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
    tier: 'midrange',
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
    tier: 'budget',
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
    min: 269,
    max: 299,
    tier: 'budget',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Amazon.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Fractal Design Focus 2&prds=catalogid:14535114196820785674,productid:18219404980396954437,headlineOfferDocid:7115411910106147933,imageDocid:857214109425503078,rds:PC_11966795571778917355|PROD_PC_11966795571778917355,gpcid:11966795571778917355,mid:576462898020745182,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Neonet',
        url: 'https://www.google.pl/search?ibp=oshop&q=Fractal Design Focus 2&prds=catalogid:2308285333013695412,productid:10395013633632074198,headlineOfferDocid:2417320487310937115,imageDocid:12726390779666061299,rds:PC_7174046415535077858|PROD_PC_7174046415535077858,gpcid:14563092439717110915,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Allegro',
        url: 'https://www.google.pl/search?ibp=oshop&q=Fractal Design Focus 2&prds=catalogid:15743688614702817510,productid:15491699249222006233,headlineOfferDocid:17793901276216922412,imageDocid:16607323889861736915,rds:PC_7174046415535077858|PROD_PC_7174046415535077858,gpcid:13764625033227014876,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  north: {
    min: 606,
    max: 677,
    tier: 'midrange',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Allegro',
        url: 'https://www.google.pl/search?ibp=oshop&q=Fractal Design North&prds=catalogid:2601242752772609343,productid:16418274375431366512,headlineOfferDocid:6828519792094221082,imageDocid:16890290789600975528,rds:PC_7090701301944876828|PROD_PC_7090701301944876828,gpcid:7090701301944876828,mid:576462542659308228,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Empik.com',
        url: 'https://www.google.pl/search?ibp=oshop&q=Fractal Design North&prds=catalogid:15191552730499341205,productid:16028381518099268478,headlineOfferDocid:14749990158458687287,imageDocid:12086342344642062220,gpcid:1558463017104042871,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'beststore.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Fractal Design North&prds=productid:2744763673977541977,headlineOfferDocid:2744763673977541977,imageDocid:5007865175835149024,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'define-7': {
    min: 800,
    max: 889,
    tier: 'high',
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
    tier: 'high',
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
    tier: 'value',
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
    tier: 'value',
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
    min: 364,
    max: 501,
    tier: 'value',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Microless.com',
        url: 'https://www.google.pl/search?ibp=oshop&q=Fractal Design Pop Air&prds=catalogid:15575900011772483654,productid:2774188383467154429,headlineOfferDocid:9728635024091121553,imageDocid:1251987865721675317,rds:PC_77676243204615830|PROD_PC_77676243204615830,gpcid:77676243204615830,mid:576462576355961978,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Microless.com',
        url: 'https://www.google.pl/search?ibp=oshop&q=Fractal Design Pop Air&prds=catalogid:11275818309399720658,productid:16943729669559457475,headlineOfferDocid:14001230932959609082,imageDocid:1251987865721675317,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Microless.com',
        url: 'https://www.google.pl/search?ibp=oshop&q=Fractal Design Pop Air&prds=catalogid:9255775419846125418,productid:8247589876865209845,headlineOfferDocid:12416636994665174354,imageDocid:8544689452269327725,rds:PC_4001351522777068868|PROD_PC_4001351522777068868,gpcid:16534154032512678040,mid:576462576456888182,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'o11-dynamic-evo': {
    min: 793,
    max: 793,
    tier: 'high',
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
    tier: 'midrange',
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
    tier: 'flagship',
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
    min: 61,
    max: 86,
    tier: 'budget',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Amazon.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Thermalright Assassin X 120 R SE&prds=catalogid:15298675175078790900,productid:1877497442267466309,headlineOfferDocid:2496965927876729221,imageDocid:3708751913667706996,rds:PC_8059363048054879529|PROD_PC_8059363048054879529,gpcid:8059363048054879529,mid:576462823164316396,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Microless.com',
        url: 'https://www.google.pl/search?ibp=oshop&q=Thermalright Assassin X 120 R SE&prds=productid:5364904598851941197,headlineOfferDocid:5364904598851941197,imageDocid:6612757055704434873,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Ceneo.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Thermalright Assassin X 120 R SE&prds=productid:13331883526509141548,headlineOfferDocid:13331883526509141548,imageDocid:304782777796310680,rds:PC_11966400734799744311|PROD_PC_11966400734799744311,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'peerless-assassin-120': {
    min: 172,
    max: 199,
    tier: 'value',
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
    min: 655,
    max: 741,
    tier: 'high',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Microless.com',
        url: 'https://www.google.pl/search?ibp=oshop&q=Noctua NH-D15 G2&prds=catalogid:7076726148966148667,productid:8134988988767512689,headlineOfferDocid:15236648113040792980,imageDocid:4949791810865032537,rds:PC_17132896970172464592|PROD_PC_17132896970172464592,gpcid:17132896970172464592,mid:576462898603785197,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Microless.com',
        url: 'https://www.google.pl/search?ibp=oshop&q=Noctua NH-D15 G2&prds=catalogid:7076726148966148667,productid:8134988988767512689,headlineOfferDocid:17852151522803177025,imageDocid:4949791810865032537,rds:PC_17132896970172464592|PROD_PC_17132896970172464592,gpcid:17132896970172464592,mid:576462898603785197,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Morele.net',
        url: 'https://www.google.pl/search?ibp=oshop&q=Noctua NH-D15 G2&prds=catalogid:18314505782198207875,productid:4314939116280193877,headlineOfferDocid:8943390825552164879,imageDocid:9380542256496293153,rds:PC_15947935192744699748|PROD_PC_15947935192744699748,gpcid:15947935192744699748,mid:576462898587941129,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'nh-l12s': {
    min: 293,
    max: 293,
    tier: 'midrange',
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
    tier: 'midrange',
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
    tier: 'high',
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
    min: 147,
    max: 151,
    tier: 'value',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Amazon.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Thermalright Phantom Spirit 120 SE&prds=catalogid:15396094805333246452,productid:11875103257128191371,headlineOfferDocid:16901506024379723619,imageDocid:13684894085196783309,rds:PC_6399421843940302317|PROD_PC_6399421843940302317,gpcid:6399421843940302317,mid:576462575679240331,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Amazon.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Thermalright Phantom Spirit 120 SE&prds=catalogid:18009707596127420963,productid:6183998874488553330,headlineOfferDocid:13640909707073376480,imageDocid:660235602973714944,rds:PC_411272197942839805|PROD_PC_411272197942839805,gpcid:411272197942839805,mid:576462896474229279,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Amazon.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Thermalright Phantom Spirit 120 SE&prds=catalogid:600582163288473703,productid:14735182946665351927,headlineOfferDocid:9504017255501780686,imageDocid:13684894085196783309,rds:PC_17902401114334367014|PROD_PC_17902401114334367014,gpcid:17902401114334367014,mid:576462562406806533,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'nh-u12a': {
    min: 579,
    max: 579,
    tier: 'high',
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
    tier: 'midrange',
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
    tier: 'high',
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
    tier: 'high',
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
    tier: 'budget',
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/;szukaj-amd+wraith+stealth',
      },
    ],
    note: 'Free in a boxed Ryzen; the figures are the loose unit, refreshed like any other part.',
  },
  'core-i5-14400': {
    min: 699,
    max: 789,
    tier: 'budget',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Alsen',
        url: 'https://www.google.pl/search?ibp=oshop&q=Intel Core i5-14400&prds=catalogid:4666470890520179863,productid:2866995237565286941,headlineOfferDocid:665954195958126589,imageDocid:16843978497430032834,gpcid:7212092558794652794,mid:576462893759149799,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'kuplaptopa.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Intel Core i5-14400&prds=catalogid:10616217228060304182,productid:11983925273908858103,headlineOfferDocid:6958850386119554160,imageDocid:2349131116328019843,gpcid:17393765010274191112,mid:576462898602419187,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Net-s.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=Intel Core i5-14400&prds=catalogid:12310245538849397717,productid:977663982527950119,headlineOfferDocid:16120765718158402857,imageDocid:11082463984206616494,gpcid:15853875119669708488,mid:576462566257711001,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'b650i-ax': {
    min: 591,
    max: 669,
    tier: 'value',
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
    max: 283,
    tier: 'budget',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Backbone Krzysztof Raczyński',
        url: 'https://www.google.pl/search?ibp=oshop&q=be quiet! System Power 11 550W&prds=productid:4428705553405623661,headlineOfferDocid:4428705553405623661,imageDocid:2851795655883809779,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'balta.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=be quiet! System Power 11 550W&prds=productid:10650567898054498386,headlineOfferDocid:10650567898054498386,imageDocid:5734580819216618378,rds:PC_5364386741935077634|PROD_PC_5364386741935077634,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Media Expert',
        url: 'https://www.google.pl/search?ibp=oshop&q=be quiet! System Power 11 550W&prds=catalogid:17026253034443366051,productid:6874441350142195541,headlineOfferDocid:13395356408209349840,imageDocid:12575812707870088709,rds:PC_5364386741935077634|PROD_PC_5364386741935077634,gpcid:5364386741935077634,mid:576462517855401575,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'pure-power-13m-650': {
    min: 429,
    max: 500,
    tier: 'value',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Apollo.pl',
        url: 'https://www.google.pl/search?ibp=oshop&q=be quiet! Pure Power 13 M 650W&prds=productid:14357447501948005584,headlineOfferDocid:14357447501948005584,imageDocid:2828516512825359382,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Backbone Krzysztof Raczyński',
        url: 'https://www.google.pl/search?ibp=oshop&q=be quiet! Pure Power 13 M 650W&prds=productid:4726921326646160165,headlineOfferDocid:4726921326646160165,imageDocid:2083899852545942730,pvt:hg&hl=pl&gl=pl&udm=28',
      },
      {
        label: 'Media Expert',
        url: 'https://www.google.pl/search?ibp=oshop&q=be quiet! Pure Power 13 M 650W&prds=catalogid:2593517498116182665,productid:15571585608900807661,headlineOfferDocid:11723592783119426324,imageDocid:3686652685084610564,rds:PC_3774144134673760506|PROD_PC_3774144134673760506,gpcid:3774144134673760506,mid:576462917250335451,pvt:hg&hl=pl&gl=pl&udm=28',
      },
    ],
  },
  'pure-power-13m-850': {
    min: 549,
    max: 599,
    tier: 'value',
    checkedAt: '2026-11-21',
    sources: [
      {
        label: 'Morele',
        url: 'https://www.morele.net/wyszukiwarka/?q=be+quiet+pure+power+13+m+850w',
      },
      {
        label: 'x-kom',
        url: 'https://www.x-kom.pl/szukaj?q=pure%20power%2013%20m%20850w',
      },
    ],
    note: 'x-kom 559 zł only with a promo code; 599 zł regular.',
  },
  'liquid-freezer-iii-pro-360': {
    min: 326,
    max: 337,
    tier: 'midrange',
    checkedAt: '2026-11-06',
    sources: [
      {
        label: 'Ceneo',
        url: 'https://www.ceneo.pl/183982377',
      },
    ],
    note: 'Ten offers on Ceneo for the black version, ACFRE00180A.',
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
