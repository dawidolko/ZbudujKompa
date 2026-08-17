import type { Build } from './types';

/**
 * Reference builds.
 *
 * Prices are indicative Polish retail figures in grosz, each carrying the date
 * it was checked. They are a starting point for a shopping list, not a live
 * price feed — a static site cannot promise current pricing, so it says so
 * rather than pretending otherwise.
 */
export const builds: Build[] = [
  {
    slug: 'budget-1080p',
    vendor: 'amd',
    socketSlug: 'am4',
    difficulty: 'beginner',
    name: {
      pl: 'Budżetowy zestaw do gier 1080p',
      en: 'Budget 1080p gaming build',
    },
    tagline: {
      pl: 'Najtańsze sensowne wejście w granie na PC',
      en: 'The cheapest sensible way into PC gaming',
    },
    description: {
      pl: 'Zestaw zbudowany wokół dojrzałej platformy AM4, gdzie części są dziś najtańsze. Celem jest płynne granie w rozdzielczości 1080p bez wydawania pieniędzy na rzeczy, których w tym budżecie nie odczujesz.',
      en: 'A build around the mature AM4 platform, where parts are cheapest today. The goal is smooth 1080p gaming without spending on things you would not notice at this budget.',
    },
    useCase: {
      pl: 'Granie w 1080p, nauka, praca biurowa',
      en: '1080p gaming, studying, office work',
    },
    expectation: {
      pl: 'W większości popularnych tytułów uzyskasz 60+ klatek na wysokich ustawieniach w 1080p. W najnowszych, wymagających grach trzeba będzie zejść do ustawień średnich.',
      en: 'Most popular titles will run at 60+ frames on high settings at 1080p. The newest demanding games will need medium settings.',
    },
    parts: [
      {
        kind: 'cpu',
        name: 'AMD Ryzen 5 5600',
        rationale: {
          pl: 'Sześć rdzeni, które wciąż spokojnie wystarczają do grania. Najlepszy stosunek ceny do wydajności na AM4.',
          en: 'Six cores that remain entirely sufficient for gaming. The best price-to-performance option on AM4.',
        },
      },
      {
        kind: 'motherboard',
        name: 'MSI B550-A PRO',
        rationale: {
          pl: 'B550 daje PCIe 4.0 dla karty i dysku, bez wentylatora na mostku. Solidne zasilanie w tej cenie.',
          en: 'B550 provides PCIe 4.0 for the GPU and drive with no chipset fan. Solid power delivery at this price.',
        },
      },
      {
        kind: 'ram',
        name: 'Kingston Fury Beast 16 GB (2×8) DDR4-3200 CL16',
        rationale: {
          pl: 'Dwa moduły zamiast jednego to wymóg, nie preferencja — dual channel daje realny wzrost wydajności.',
          en: 'Two modules rather than one is a requirement, not a preference — dual channel gives a real performance gain.',
        },
      },
      {
        kind: 'gpu',
        name: 'AMD Radeon RX 7600 8 GB',
        rationale: {
          pl: 'Karta dobrana pod 1080p. 8 GB pamięci to dziś minimum, przy którym nowe gry nie zaczynają się zacinać.',
          en: 'Sized for 1080p. 8 GB of memory is the point below which newer games begin to stutter.',
        },
      },
      {
        kind: 'storage',
        name: 'Kingston NV3 1 TB NVMe PCIe 4.0',
        rationale: {
          pl: '1 TB to praktyczne minimum — dwie duże gry potrafią zająć połowę tej przestrzeni.',
          en: '1 TB is the practical minimum — two large games can fill half of it.',
        },
      },
      {
        kind: 'psu',
        name: 'be quiet! System Power 10 550 W 80+ Bronze',
        rationale: {
          pl: 'Na zasilaczu nie oszczędzaj. 550 W daje zapas, a marka z certyfikatem chroni resztę podzespołów.',
          en: 'The power supply is not the place to economise. 550 W leaves headroom, and a certified unit protects everything else.',
        },
      },
      {
        kind: 'case',
        name: 'Fractal Design Focus 2',
        rationale: {
          pl: 'Dobry przepływ powietrza i sensowne prowadzenie kabli. Przy pierwszym składaniu to realna różnica.',
          en: 'Good airflow and sensible cable routing. On a first build that makes a genuine difference.',
        },
      },
      {
        kind: 'cooler',
        name: 'Thermalright Assassin X 120 R SE',
        rationale: {
          pl: 'Tańsze i cichsze od chłodzenia z zestawu, a montaż zajmuje kilka minut.',
          en: 'Cheaper and quieter than the boxed cooler, and it takes a few minutes to fit.',
        },
      },
    ],
  },
  {
    slug: 'mainstream-1440p',
    vendor: 'amd',
    socketSlug: 'am5',
    difficulty: 'beginner',
    name: {
      pl: 'Zestaw do gier 1440p',
      en: '1440p gaming build',
    },
    tagline: {
      pl: 'Najrozsądniejszy punkt na krzywej ceny do wydajności',
      en: 'The most sensible point on the price-performance curve',
    },
    description: {
      pl: 'Zestaw na aktualnej platformie AM5, obliczony na granie w 1440p i kilka lat spokoju. Płyta z gniazdem AM5 pozwala w przyszłości wymienić sam procesor, bez wymiany pamięci i płyty głównej.',
      en: 'A build on the current AM5 platform, aimed at 1440p gaming and a few years of not thinking about it. An AM5 board leaves room to swap only the CPU later, without replacing memory and motherboard.',
    },
    useCase: {
      pl: 'Granie w 1440p, streaming, praca z grafiką',
      en: '1440p gaming, streaming, graphics work',
    },
    expectation: {
      pl: 'Wysokie i ultra ustawienia w 1440p przy 90–144 klatkach w większości tytułów. W grach z ray tracingiem konieczne będzie skalowanie obrazu.',
      en: 'High and ultra settings at 1440p, 90–144 frames in most titles. Ray-traced games will need upscaling.',
    },
    parts: [
      {
        kind: 'cpu',
        name: 'AMD Ryzen 7 7800X3D',
        rationale: {
          pl: 'Dodatkowa pamięć podręczna 3D V-Cache daje w grach przewagę, której nie widać w testach syntetycznych.',
          en: 'The extra 3D V-Cache gives a gaming advantage that synthetic benchmarks do not show.',
        },
      },
      {
        kind: 'motherboard',
        name: 'ASUS TUF Gaming B650-PLUS WiFi',
        rationale: {
          pl: 'B650 z solidnym zasilaniem i Wi-Fi. Do zestawu bez ekstremalnego OC nie potrzeba droższego chipsetu.',
          en: 'B650 with solid power delivery and Wi-Fi. Without extreme overclocking, a pricier chipset adds nothing.',
        },
      },
      {
        kind: 'ram',
        name: 'G.Skill Flare X5 32 GB (2×16) DDR5-6000 CL30',
        rationale: {
          pl: 'DDR5-6000 CL30 to punkt, w którym Ryzen 7000 pracuje najefektywniej. Szybsze moduły dają już niewiele.',
          en: 'DDR5-6000 CL30 is where Ryzen 7000 runs most efficiently. Faster kits add very little beyond it.',
        },
      },
      {
        kind: 'gpu',
        name: 'NVIDIA GeForce RTX 5070 12 GB',
        rationale: {
          pl: 'Dobrana pod 1440p z zapasem na ray tracing i skalowanie obrazu.',
          en: 'Sized for 1440p with headroom for ray tracing and upscaling.',
        },
      },
      {
        kind: 'storage',
        name: 'Samsung 990 EVO Plus 2 TB NVMe',
        rationale: {
          pl: '2 TB pozwala trzymać bibliotekę gier bez ciągłego odinstalowywania.',
          en: '2 TB is enough to keep a game library without constantly uninstalling things.',
        },
      },
      {
        kind: 'psu',
        name: 'be quiet! Pure Power 12 M 750 W 80+ Gold',
        rationale: {
          pl: '750 W z zapasem na chwilowe skoki poboru karty graficznej. Modularne kable ułatwiają montaż.',
          en: '750 W with headroom for the transient spikes modern GPUs produce. Modular cables ease assembly.',
        },
      },
      {
        kind: 'case',
        name: 'Fractal Design North',
        rationale: {
          pl: 'Dobry przepływ powietrza w obudowie, która nie wygląda jak sprzęt gamingowy.',
          en: 'Good airflow in a case that does not look like gaming hardware.',
        },
      },
      {
        kind: 'cooler',
        name: 'Thermalright Peerless Assassin 120 SE',
        rationale: {
          pl: 'Podwójna wieża, która dorównuje chłodnicom 240 mm za ułamek ceny.',
          en: 'A dual tower that matches 240 mm liquid coolers for a fraction of the price.',
        },
      },
    ],
  },
  {
    slug: 'intel-creator',
    vendor: 'intel',
    socketSlug: 'lga1851',
    difficulty: 'intermediate',
    name: {
      pl: 'Stacja robocza Intel do pracy twórczej',
      en: 'Intel creator workstation',
    },
    tagline: {
      pl: 'Pod render, montaż wideo i kompilację',
      en: 'For rendering, video editing and compiling',
    },
    description: {
      pl: 'Zestaw obliczony na zadania, które trwają godzinami i obciążają wszystkie rdzenie naraz. Priorytetem jest utrzymanie taktowań przy długim obciążeniu, stąd mocne chłodzenie i zasilacz z wyraźnym zapasem.',
      en: 'A build aimed at work that runs for hours and loads every core at once. The priority is holding clocks under sustained load, hence strong cooling and a power supply with clear headroom.',
    },
    useCase: {
      pl: 'Montaż wideo, render 3D, kompilacja kodu',
      en: 'Video editing, 3D rendering, compiling code',
    },
    expectation: {
      pl: 'Płynny montaż materiału 4K na wielu ścieżkach i wyraźnie krótsze czasy renderowania niż na zestawie sześciordzeniowym.',
      en: 'Smooth multi-track 4K editing and render times markedly shorter than a six-core system.',
    },
    parts: [
      {
        kind: 'cpu',
        name: 'Intel Core Ultra 7 265K',
        rationale: {
          pl: 'Dużo rdzeni do zadań wielowątkowych plus wbudowany NPU przydatny w narzędziach z funkcjami AI.',
          en: 'Plenty of cores for multi-threaded work, plus an on-package NPU useful in AI-assisted tools.',
        },
      },
      {
        kind: 'motherboard',
        name: 'MSI MAG Z890 TOMAHAWK WIFI',
        rationale: {
          pl: 'Z890 daje pełne OC pamięci i dużo linii PCIe pod kilka dysków NVMe naraz.',
          en: 'Z890 allows full memory overclocking and provides lanes for several NVMe drives at once.',
        },
      },
      {
        kind: 'ram',
        name: 'Corsair Vengeance 64 GB (2×32) DDR5-6000 CL30',
        rationale: {
          pl: '64 GB to próg, powyżej którego montaż 4K i render przestają korzystać z pliku wymiany.',
          en: '64 GB is the threshold above which 4K editing and rendering stop hitting the swap file.',
        },
      },
      {
        kind: 'gpu',
        name: 'NVIDIA GeForce RTX 5070 Ti 16 GB',
        rationale: {
          pl: '16 GB pamięci karty to realne ograniczenie w renderze 3D — tu jest go wystarczająco.',
          en: 'GPU memory is a real ceiling in 3D rendering — 16 GB provides enough of it.',
        },
      },
      {
        kind: 'storage',
        name: 'Samsung 990 PRO 2 TB NVMe PCIe 4.0',
        rationale: {
          pl: 'Wysoka prędkość zapisu ma znaczenie przy pracy na dużych plikach wideo.',
          en: 'Sustained write speed matters when working with large video files.',
        },
      },
      {
        kind: 'psu',
        name: 'Seasonic Focus GX-850 850 W 80+ Gold',
        rationale: {
          pl: '850 W daje zapas przy jednoczesnym obciążeniu procesora i karty przez wiele godzin.',
          en: '850 W leaves headroom when the CPU and GPU are both loaded for hours at a time.',
        },
      },
      {
        kind: 'case',
        name: 'Fractal Design Define 7',
        rationale: {
          pl: 'Wyciszona obudowa z miejscem na wiele dysków — istotne przy archiwum materiałów.',
          en: 'A sound-dampened case with room for many drives — useful when archiving footage.',
        },
      },
      {
        kind: 'cooler',
        name: 'Arctic Liquid Freezer III 360',
        rationale: {
          pl: 'Chłodnica 360 mm utrzymuje taktowania przy obciążeniu wszystkich rdzeni przez godziny.',
          en: 'A 360 mm radiator holds clocks through hours of all-core load.',
        },
      },
    ],
  },
  {
    slug: 'compact-itx',
    vendor: 'amd',
    socketSlug: 'am5',
    difficulty: 'advanced',
    name: {
      pl: 'Kompaktowy zestaw Mini-ITX',
      en: 'Compact Mini-ITX build',
    },
    tagline: {
      pl: 'Pełna wydajność w obudowie wielkości konsoli',
      en: 'Full performance in a console-sized case',
    },
    description: {
      pl: 'Zestaw dla osób, które chcą wydajność zestawu do 1440p w obudowie o objętości poniżej 15 litrów. Każdy element dobierany jest tu pod wymiary, a nie pod cenę — to najtrudniejszy wariant montażu i nie polecam go na pierwszy raz.',
      en: 'For people who want 1440p-class performance in a case under 15 litres. Every part here is chosen by dimensions rather than price. This is the hardest build to assemble and not one I would recommend as a first attempt.',
    },
    useCase: {
      pl: 'Granie w 1440p, komputer do salonu, częste przenoszenie',
      en: '1440p gaming, living-room PC, frequent transport',
    },
    expectation: {
      pl: 'Wydajność zbliżona do zestawu 1440p przy wyraźnie wyższym poziomie hałasu pod obciążeniem — w małej objętości nie ma miejsca na duże, wolno kręcące się wentylatory.',
      en: 'Performance close to the 1440p build, at a noticeably higher noise level under load — a small volume leaves no room for large, slow-turning fans.',
    },
    parts: [
      {
        kind: 'cpu',
        name: 'AMD Ryzen 7 9700X',
        rationale: {
          pl: 'Niski pobór mocy przy dobrej wydajności — kluczowe, gdy chłodzenie jest ograniczone wymiarami.',
          en: 'Low power draw with good performance — critical when cooling is constrained by dimensions.',
        },
      },
      {
        kind: 'motherboard',
        name: 'ASRock B650I Lightning WiFi',
        rationale: {
          pl: 'Mini-ITX na AM5 z solidnym zasilaniem. Wybór w tym formacie jest wąski, więc płytę dobiera się pierwszą.',
          en: 'Mini-ITX on AM5 with solid power delivery. The choice in this form factor is narrow, so the board is picked first.',
        },
      },
      {
        kind: 'ram',
        name: 'G.Skill Flare X5 32 GB (2×16) DDR5-6000 CL30',
        rationale: {
          pl: 'Niskie moduły bez wysokich radiatorów — w ITX każdy milimetr nad płytą jest zajęty.',
          en: 'Low-profile modules without tall heat spreaders — in ITX every millimetre above the board is spoken for.',
        },
      },
      {
        kind: 'gpu',
        name: 'NVIDIA GeForce RTX 5070 12 GB (wersja 2-slot)',
        rationale: {
          pl: 'Wersja dwuslotowa jest tu wymogiem — sprawdź długość karty w specyfikacji obudowy przed zakupem.',
          en: 'A two-slot version is mandatory here — check the card length against the case specification before buying.',
        },
      },
      {
        kind: 'storage',
        name: 'Samsung 990 EVO Plus 2 TB NVMe',
        rationale: {
          pl: 'W tej obudowie nie ma miejsca na dyski 3,5 cala — cała przestrzeń to NVMe.',
          en: 'There is no room for 3.5-inch drives in this case — all storage is NVMe.',
        },
      },
      {
        kind: 'psu',
        name: 'Corsair SF750 750 W SFX 80+ Platinum',
        rationale: {
          pl: 'Format SFX jest tu koniecznością. Zasilacze SFX są droższe od ATX o tej samej mocy.',
          en: 'The SFX form factor is mandatory here. SFX units cost more than ATX of the same wattage.',
        },
      },
      {
        kind: 'case',
        name: 'Fractal Design Terra',
        rationale: {
          pl: 'Objętość poniżej 11 litrów przy zachowaniu miejsca na kartę dwuslotową.',
          en: 'Under 11 litres of volume while still fitting a two-slot graphics card.',
        },
      },
      {
        kind: 'cooler',
        name: 'Noctua NH-L12S',
        rationale: {
          pl: 'Niskoprofilowe chłodzenie zaprojektowane pod obudowy, w których wieża się nie mieści.',
          en: 'A low-profile cooler designed for cases where a tower simply will not fit.',
        },
      },
    ],
  },
  {
    slug: 'htpc-salon',
    vendor: 'amd',
    socketSlug: 'am5',
    difficulty: 'intermediate',
    name: {
      pl: 'Komputer do salonu (HTPC)',
      en: 'Living-room PC (HTPC)',
    },
    tagline: {
      pl: 'Cichy, mały, pod telewizor',
      en: 'Quiet, small, built for the television',
    },
    description: {
      pl: 'Zestaw obliczony na odtwarzanie filmów w 4K i granie z kanapy, przy poziomie hałasu, który nie przeszkadza w cichych scenach. Priorytetem jest cisza i wymiary, nie surowa wydajność — dlatego procesor z mocną grafiką zintegrowaną i brak osobnej karty graficznej.',
      en: 'A build for 4K video and couch gaming at a noise level that does not intrude during quiet scenes. Silence and dimensions come before raw performance, hence a processor with strong integrated graphics and no discrete card.',
    },
    useCase: {
      pl: 'Filmy w 4K, granie z kanapy, przeglądanie internetu na telewizorze',
      en: '4K video, couch gaming, browsing on the television',
    },
    expectation: {
      pl: 'Płynne odtwarzanie każdego materiału 4K wraz z HDR i lekkie granie w 1080p. Do wymagających tytułów trzeba będzie dołożyć kartę graficzną, na którą obudowa ma miejsce.',
      en: 'Smooth playback of any 4K material including HDR, plus light 1080p gaming. Demanding titles would need a graphics card, for which the case has room.',
    },
    parts: [
      {
        kind: 'cpu',
        name: 'AMD Ryzen 7 8700G',
        rationale: {
          pl: 'Najmocniejsza grafika zintegrowana na rynku desktopowym. Odtwarza 4K z akceleracją sprzętową i pozwala grać w 1080p bez osobnej karty.',
          en: 'The strongest integrated graphics available on desktop. It decodes 4K in hardware and games at 1080p with no discrete card at all.',
        },
      },
      {
        kind: 'motherboard',
        name: 'ASRock B650M Pro RS',
        rationale: {
          pl: 'Micro-ATX z wyjściem HDMI 2.1, które jest tu wymogiem — starsze HDMI nie przepuści 4K przy 120 Hz.',
          en: 'Micro-ATX with an HDMI 2.1 output, which is mandatory here — older HDMI cannot carry 4K at 120 Hz.',
        },
      },
      {
        kind: 'ram',
        name: 'Kingston Fury Beast 32 GB (2×16) DDR5-6000',
        rationale: {
          pl: 'Grafika zintegrowana korzysta z pamięci systemowej, więc szybsza pamięć przekłada się tu wprost na klatki — inaczej niż w zestawie z osobną kartą.',
          en: 'Integrated graphics use system memory, so faster memory translates directly into frame rate here — unlike in a build with a discrete card.',
        },
      },
      {
        kind: 'storage',
        name: 'Samsung 990 EVO Plus 2 TB NVMe',
        rationale: {
          pl: 'Bez ruchomych części, więc nic nie buczy w cichych scenach filmu.',
          en: 'No moving parts, so nothing hums during a quiet scene.',
        },
      },
      {
        kind: 'psu',
        name: 'be quiet! Pure Power 12 M 550 W 80+ Gold',
        rationale: {
          pl: 'Bez osobnej karty graficznej 550 W to duży zapas, a zasilacz pracujący przy jednej trzeciej obciążenia ma wentylator zatrzymany.',
          en: 'With no discrete card 550 W is ample headroom, and a supply running at a third of its rating keeps its fan stopped.',
        },
      },
      {
        kind: 'case',
        name: 'Fractal Design Node 304',
        rationale: {
          pl: 'Kompaktowa obudowa, która nie wygląda jak komputer, gdy stoi pod telewizorem.',
          en: 'A compact case that does not look like a computer when it sits under a television.',
        },
      },
      {
        kind: 'cooler',
        name: 'Noctua NH-L12S',
        rationale: {
          pl: 'Niskoprofilowe chłodzenie o bardzo dobrej kulturze pracy. Przy 65 W procesora nigdy nie musi się rozkręcić.',
          en: 'A low-profile cooler with excellent acoustics. Against a 65 W processor it never has to spin up.',
        },
      },
    ],
  },
  {
    slug: 'serwer-domowy',
    vendor: 'intel',
    socketSlug: 'lga1700',
    difficulty: 'intermediate',
    name: {
      pl: 'Serwer domowy i NAS',
      en: 'Home server and NAS',
    },
    tagline: {
      pl: 'Kopie zapasowe, media i usługi, całą dobę',
      en: 'Backups, media and services, around the clock',
    },
    description: {
      pl: 'Maszyna zaprojektowana pod pracę ciągłą: niski pobór mocy w spoczynku, dużo miejsca na dyski i procesor ze sprzętowym kodowaniem wideo. Wydajność szczytowa nie ma tu znaczenia — liczy się to, ile prądu zużyje przez rok i ile dysków pomieści.',
      en: 'A machine designed to run continuously: low idle power, room for many drives and a processor with hardware video encoding. Peak performance is irrelevant here — what matters is the yearly electricity bill and how many drives it holds.',
    },
    useCase: {
      pl: 'Kopie zapasowe, serwer plików, serwer mediów, usługi w kontenerach',
      en: 'Backups, file server, media server, containerised services',
    },
    expectation: {
      pl: 'Kilka jednoczesnych strumieni wideo z transkodowaniem sprzętowym i pobór około 25–35 W w spoczynku, co przy pracy ciągłej daje sensowny rachunek za prąd.',
      en: 'Several simultaneous video streams with hardware transcoding, at roughly 25–35 W idle — which keeps the electricity bill reasonable for a machine that never turns off.',
    },
    parts: [
      {
        kind: 'cpu',
        name: 'Intel Core i5-14400',
        rationale: {
          pl: 'Quick Sync koduje i dekoduje wideo sprzętowo, obciążając procesor w minimalnym stopniu. Do serwera mediów to najważniejsza cecha, ważniejsza od liczby rdzeni.',
          en: 'Quick Sync encodes and decodes video in hardware with minimal CPU load. For a media server that matters more than core count.',
        },
      },
      {
        kind: 'motherboard',
        name: 'ASUS PRIME B760M-A',
        rationale: {
          pl: 'Sześć portów SATA plus dwa gniazda M.2 — kluczowe, gdy dysków ma być więcej niż dwa.',
          en: 'Six SATA ports plus two M.2 sockets — the deciding factor once you need more than two drives.',
        },
      },
      {
        kind: 'ram',
        name: 'Crucial 32 GB (2×16) DDR5-5600',
        rationale: {
          pl: '32 GB to komfortowy zapas na kilka usług naraz i cache systemu plików. Przy ZFS pamięć jest najtańszym sposobem na wydajność.',
          en: '32 GB is comfortable headroom for several services and filesystem cache. With ZFS, memory is the cheapest performance you can buy.',
        },
      },
      {
        kind: 'storage',
        name: 'Kingston NV3 1 TB NVMe + 2× 8 TB HDD',
        rationale: {
          pl: 'NVMe na system i kontenery, talerzowe na dane. Dwa dyski pozwalają zrobić lustro, więc awaria jednego nie oznacza utraty danych.',
          en: 'NVMe for the system and containers, spinning drives for data. Two drives allow a mirror, so one failing does not mean losing anything.',
        },
      },
      {
        kind: 'psu',
        name: 'be quiet! Pure Power 12 M 550 W 80+ Gold',
        rationale: {
          pl: 'Przy pracy ciągłej sprawność zasilacza przekłada się wprost na rachunek. Certyfikat Gold zwraca się w ciągu kilku lat.',
          en: 'With a machine that never switches off, PSU efficiency shows up directly on the bill. A Gold rating pays for itself over a few years.',
        },
      },
      {
        kind: 'case',
        name: 'Fractal Design Define 7',
        rationale: {
          pl: 'Mieści do czternastu dysków i jest wyciszona — istotne, jeśli serwer stoi w mieszkaniu, a nie w piwnicy.',
          en: 'Holds up to fourteen drives and is sound-dampened — which matters if the server lives in a flat rather than a basement.',
        },
      },
      {
        kind: 'cooler',
        name: 'be quiet! Pure Rock 2',
        rationale: {
          pl: 'Ciche chłodzenie z dużym zapasem względem 65 W procesora, więc wentylator pracuje na najniższych obrotach.',
          en: 'A quiet cooler with generous headroom over the 65 W processor, so the fan sits at its lowest speed.',
        },
      },
    ],
  },
];

export function getBuild(slug: string): Build | undefined {
  return builds.find((build) => build.slug === slug);
}
