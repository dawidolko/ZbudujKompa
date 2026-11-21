import type { FaqEntry, GlossaryTerm } from './types';

/**
 * Glossary.
 *
 * Terms are defined in the sense a first-time builder meets them, not in the
 * fullest technical sense, because a definition that needs three more
 * definitions to parse is not a definition for this audience.
 */
export const glossary: GlossaryTerm[] = [
  {
    slug: 'tdp',
    term: 'TDP',
    category: 'cooling',
    definition: {
      pl: 'Thermal Design Power — ilość ciepła, którą chłodzenie musi odprowadzić, podana w watach. Uwaga: u obu producentów wartość ta bywa niższa niż rzeczywisty pobór mocy pod pełnym obciążeniem, więc traktuj ją jako minimum, a nie sufit.',
      en: 'Thermal Design Power — the amount of heat a cooler must remove, given in watts. Note that both vendors often quote a figure below real power draw under full load, so treat it as a floor rather than a ceiling.',
    },
  },
  {
    slug: 'dual-channel',
    term: 'Dual channel',
    category: 'basics',
    definition: {
      pl: 'Tryb, w którym procesor komunikuje się z pamięcią dwoma kanałami naraz, podwajając przepustowość. Wymaga parzystej liczby modułów w odpowiednich slotach — zwykle drugim i czwartym od procesora.',
      en: 'A mode in which the CPU talks to memory over two channels at once, doubling bandwidth. It requires an even number of modules in the correct slots — usually the second and fourth from the CPU.',
    },
  },
  {
    slug: 'expo-xmp',
    term: 'EXPO / XMP',
    category: 'optimisation',
    definition: {
      pl: 'Zapisane w module profile ustawień pamięci. EXPO to standard AMD, XMP — Intela. Bez ich włączenia w BIOS-ie pamięć pracuje z częstotliwością bazową, znacznie niższą niż deklarowana na opakowaniu.',
      en: 'Memory timing profiles stored in the module itself. EXPO is the AMD standard, XMP the Intel one. Without enabling them in the BIOS, memory runs at its base frequency, well below the figure advertised on the box.',
    },
  },
  {
    slug: 'post',
    term: 'POST',
    category: 'troubleshooting',
    definition: {
      pl: 'Power-On Self-Test — test podzespołów wykonywany przez płytę główną przed uruchomieniem systemu. Określenie „nie przechodzi POST” oznacza, że komputer zatrzymuje się przed wczytaniem systemu operacyjnego.',
      en: 'Power-On Self-Test — the component check a motherboard runs before starting the operating system. "Failing to POST" means the machine stops before the operating system is loaded.',
    },
  },
  {
    slug: 'vrm',
    term: 'VRM',
    category: 'platform',
    definition: {
      pl: 'Sekcja zasilania płyty głównej, przetwarzająca napięcie z zasilacza na to, którego potrzebuje procesor. Słaba sekcja przy mocnym procesorze prowadzi do obniżania taktowań pod obciążeniem.',
      en: "The motherboard's power delivery section, converting the PSU voltage into what the CPU needs. A weak section paired with a powerful CPU leads to reduced clocks under load.",
    },
  },
  {
    slug: 'thermal-throttling',
    term: 'Thermal throttling',
    category: 'cooling',
    definition: {
      pl: 'Automatyczne obniżanie taktowania po przekroczeniu bezpiecznej temperatury. To zabezpieczenie działające zgodnie z projektem, a nie awaria — ale sygnalizuje, że chłodzenie jest niewystarczające.',
      en: 'An automatic reduction in clock speed once a safe temperature is exceeded. It is a protection working as designed rather than a fault — but it signals that cooling is inadequate.',
    },
  },
  {
    slug: 'form-factor',
    term: 'Form factor',
    category: 'basics',
    definition: {
      pl: 'Znormalizowany rozmiar podzespołu. W przypadku płyt głównych: ATX, Micro-ATX i Mini-ITX, od największej do najmniejszej. Obudowa musi obsługiwać format twojej płyty.',
      en: 'The standardised size of a component. For motherboards: ATX, Micro-ATX and Mini-ITX, from largest to smallest. The case must support your board format.',
    },
  },
  {
    slug: 'nvme',
    term: 'NVMe',
    category: 'basics',
    definition: {
      pl: 'Standard komunikacji dysków SSD podłączanych bezpośrednio liniami PCIe. Wielokrotnie szybszy od SATA i montowany bez kabli, wprost w slocie M.2 na płycie głównej.',
      en: 'A communication standard for SSDs connected directly over PCIe lanes. Many times faster than SATA and installed without cables, directly in the M.2 slot on the motherboard.',
    },
  },
  {
    slug: 'standoff',
    term: 'Standoff',
    category: 'assembly',
    definition: {
      pl: 'Metalowy kołek dystansowy oddzielający płytę główną od tacy obudowy. Utrzymuje odstęp zapobiegający zwarciu — kołek pod miejscem bez otworu montażowego może uszkodzić płytę.',
      en: 'A metal spacer separating the motherboard from the case tray. It maintains the gap that prevents a short circuit — a standoff under a spot with no mounting hole can damage the board.',
    },
  },
  {
    slug: 'pcie-lanes',
    term: 'PCIe lanes',
    category: 'platform',
    definition: {
      pl: 'Kanały komunikacyjne między procesorem a kartami rozszerzeń i dyskami. Ich liczba jest ograniczona, dlatego montaż kilku dysków NVMe potrafi obniżyć liczbę linii dostępnych dla karty graficznej.',
      en: 'Communication channels between the CPU and expansion cards or drives. Their number is finite, which is why fitting several NVMe drives can reduce the lanes available to the graphics card.',
    },
  },
];

/**
 * Frequently asked questions.
 *
 * Also emitted as FAQPage structured data, so the answers are written to stand
 * on their own in a search result without the surrounding page for context.
 */
export const faq: FaqEntry[] = [
  {
    id: 'harder-than-it-looks',
    question: {
      pl: 'Czy składanie komputera jest trudne?',
      en: 'Is building a PC difficult?',
    },
    answer: {
      pl: 'Nie. Każdy element pasuje tylko w jedno miejsce i tylko w jednej orientacji, więc trwałe uszkodzenie czegoś przez pomyłkę jest trudne. Pierwsze składanie zajmuje zwykle od dwóch do czterech godzin. Najtrudniejszym elementem bywa podłączenie kabli panelu przedniego, bo styki są małe i słabo opisane.',
      en: 'No. Every part fits in one place and one orientation only, so damaging something by mistake is genuinely hard. A first build usually takes two to four hours. The fiddliest part tends to be the front panel cables, because the pins are small and poorly labelled.',
    },
  },
  {
    id: 'cheaper-than-prebuilt',
    question: {
      pl: 'Czy zestaw składany samodzielnie wychodzi taniej niż gotowy?',
      en: 'Does a self-built PC cost less than a prebuilt one?',
    },
    answer: {
      pl: 'Zwykle tak, ale różnica bywa mniejsza, niż się powszechnie sądzi, i zależy od promocji oraz cen części w danym momencie. Realna korzyść leży gdzie indziej: sam wybierasz każdy podzespół, więc producent nie oszczędzi na zasilaczu ani chłodzeniu, których w specyfikacji gotowego zestawu często się nie wymienia.',
      en: 'Usually yes, but the gap is often smaller than commonly assumed, and it depends on current part prices and promotions. The real benefit lies elsewhere: you choose every part, so no manufacturer economises on the power supply or cooler, which prebuilt specifications frequently leave unlisted.',
    },
  },
  {
    id: 'amd-or-intel',
    question: {
      pl: 'AMD czy Intel?',
      en: 'AMD or Intel?',
    },
    answer: {
      pl: 'Oba producenci oferują dziś dobre procesory i różnica w wydajności rzadko decyduje. Praktyczne kryterium to platforma: AM5 od AMD ma zadeklarowane wsparcie do 2029 roku, a kolejna generacja Ryzenów (Zen 6) jest dla niej potwierdzona, choć jeszcze niedostępna — to realna ścieżka wymiany samego procesora w przyszłości. LGA1851 Intela takiej ścieżki raczej nie da: odświeżenie Core Ultra 200S Plus ma być na tej podstawce ostatnie. Intel nadrabia w zadaniach wielowątkowych i w poborze mocy w spoczynku. Do samego grania procesory AMD z pamięcią 3D V-Cache mają wyraźną przewagę.',
      en: "Both vendors make good processors today, and raw performance rarely settles it. The practical criterion is the platform: AMD has committed to supporting AM5 through 2029, and the next Ryzen generation (Zen 6) is confirmed for it, though not yet available — a real path to swapping only the CPU later. Intel's LGA1851 is unlikely to offer that path: the Core Ultra 200S Plus refresh is expected to be the last on that socket. Intel makes up ground in multi-threaded work and idle power draw. For gaming specifically, AMD parts with 3D V-Cache hold a clear advantage.",
    },
  },
  {
    id: 'air-or-liquid',
    question: {
      pl: 'Chłodzenie powietrzne czy wodne?',
      en: 'Air or liquid cooling?',
    },
    answer: {
      pl: 'Dla większości zestawów wystarczy dobre chłodzenie powietrzne i jest ono rozsądniejszym wyborem: nie ma pompy, która mogłaby się zużyć, ani płynu, który mógłby przeciec. Chłodzenie wodne warto rozważyć przy procesorach powyżej 200 W, przy długotrwałych obciążeniach wszystkich rdzeni albo w obudowie, w której duża wieża się nie mieści.',
      en: 'For most builds a good air cooler is enough, and it is the more sensible choice: no pump to wear out and no liquid to leak. Liquid cooling is worth considering for CPUs above 200 W, for sustained all-core workloads, or in a case where a large tower does not fit.',
    },
  },
  {
    id: 'how-much-ram',
    question: {
      pl: 'Ile pamięci RAM potrzebuję?',
      en: 'How much RAM do I need?',
    },
    answer: {
      pl: '16 GB to dziś praktyczne minimum do grania, a 32 GB jest rozsądnym standardem, zwłaszcza jeśli obok gry działa przeglądarka i komunikator. 64 GB ma sens dopiero przy montażu wideo, renderze 3D lub pracy z maszynami wirtualnymi. Zawsze montuj dwa moduły zamiast jednego — tryb dwukanałowy daje realny wzrost wydajności. Pamięć DDR5 zdrożała w 2026 roku o ponad 300 procent w skali roku, więc przy modernizacji platformy z DDR4 warto rozważyć zachowanie dotychczasowych modułów.',
      en: '16 GB is the practical minimum for gaming today, and 32 GB is a sensible standard, particularly with a browser and chat application running alongside a game. 64 GB only starts to make sense for video editing, 3D rendering or virtual machines. Always fit two modules rather than one — dual channel gives a real performance gain. DDR5 prices rose by more than 300 per cent year on year in 2026, so when upgrading a DDR4 platform it is worth considering keeping the modules you already have.',
    },
  },
  {
    id: 'psu-savings',
    question: {
      pl: 'Czy mogę zaoszczędzić na zasilaczu?',
      en: 'Can I economise on the power supply?',
    },
    answer: {
      pl: 'To najgorsze miejsce na oszczędności w całym zestawie. Zasilacz jest jedynym podzespołem, którego awaria potrafi uszkodzić pozostałe. Kieruj się okresem gwarancji — producenci dają 10 lat tylko na konstrukcje, którym ufają — i wybieraj moc z około 30-procentowym zapasem ponad wyliczone zapotrzebowanie.',
      en: 'It is the worst place in the whole build to save money. The power supply is the only component whose failure can damage the others. Use the warranty period as your guide — manufacturers offer ten years only on designs they trust — and choose a wattage with roughly 30 per cent headroom over your calculated need.',
    },
  },
  {
    id: 'reuse-parts',
    question: {
      pl: 'Czy mogę wykorzystać części ze starego komputera?',
      en: 'Can I reuse parts from an old computer?',
    },
    answer: {
      pl: 'Obudowę, dyski i często zasilacz — tak, o ile ma wystarczającą moc i nie ma więcej niż około siedmiu lat. Pamięć tylko wtedy, gdy nowa płyta przyjmuje tę samą generację: DDR4 i DDR5 nie są wzajemnie zgodne. Przy obecnych cenach DDR5 zachowanie modułów DDR4 na płycie AM4 albo LGA1700 w wersji DDR4 to mocny argument za tymi platformami. Chłodzenie bywa zgodne między podstawkami jednego producenta, na przykład AM4 i AM5 albo LGA1700 i LGA1851.',
      en: "The case, drives and often the power supply — yes, provided it has enough capacity and is not much more than seven years old. Memory only if the new board takes the same generation: DDR4 and DDR5 are mutually incompatible. At current DDR5 prices, keeping DDR4 modules on an AM4 board or a DDR4 version of an LGA1700 board is a strong argument for those platforms. Coolers are often compatible across one vendor's sockets, AM4 and AM5 or LGA1700 and LGA1851 being examples.",
    },
  },
  {
    id: 'gpu-first',
    question: {
      pl: 'Na czym najbardziej opłaca się skupić budżet?',
      en: 'Where is budget best concentrated?',
    },
    answer: {
      pl: 'W zestawie do grania karta graficzna decyduje o liczbie klatek w największym stopniu i zwykle powinna pochłonąć od 35 do 45 procent budżetu. Procesor przestaje mieć znaczenie powyżej pewnego progu, zwłaszcza w wyższych rozdzielczościach. Nie tnij natomiast zasilacza ani chłodzenia — to podzespoły, które służą przez kilka kolejnych zestawów.',
      en: 'In a gaming build the graphics card determines frame rate more than anything else and should usually take 35 to 45 per cent of the budget. The CPU stops mattering above a certain threshold, particularly at higher resolutions. Do not cut the power supply or cooler, though — those are the parts that carry over into several later builds.',
    },
  },
];

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return glossary.find((term) => term.slug === slug);
}
