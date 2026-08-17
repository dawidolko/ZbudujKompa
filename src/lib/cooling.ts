import type { CoolingProfile, CoolingType } from './types';

/**
 * Cooling catalogue.
 *
 * Split by class rather than by product, because the choice a reader actually
 * faces is "air or AiO", not "which of these forty coolers". Wattage, noise and
 * price figures are realistic bands for the class, not headline numbers from a
 * single product's marketing page.
 */
export const coolingProfiles: CoolingProfile[] = [
  {
    slug: 'air-tower-single',
    type: 'air',
    name: {
      pl: 'Chłodzenie powietrzne — wieża pojedyncza',
      en: 'Air cooling — single tower',
    },
    tagline: {
      pl: 'Najlepszy stosunek ceny do spokoju ducha',
      en: 'The best ratio of price to peace of mind',
    },
    description: {
      pl: 'Pojedyncza wieża z blokiem lamel, ciepłowodami i jednym wentylatorem 120 lub 140 mm. To najczęstszy i najrozsądniejszy wybór do zdecydowanej większości zestawów.\n\nNie ma tu pompy ani płynu, więc nie ma też elementu, który może się zużyć lub przeciec. Dobra wieża przepracuje dekadę i jedyną czynnością serwisową będzie odkurzenie lamel.',
      en: 'A single fin stack with heat pipes and one 120 or 140 mm fan. This is the most common and most sensible choice for the large majority of builds.\n\nThere is no pump and no liquid, so there is no component that can wear out or leak. A good tower will run for a decade, and the only maintenance it needs is dusting the fins.',
    },
    wattage: { min: 95, max: 180 },
    noise: { min: 24, max: 34 },
    price: { min: 120, max: 320 },
    pros: {
      pl: [
        'Brak pompy — nic nie może przeciec ani się zatrzeć',
        'Żywotność liczona w latach, praktycznie bezobsługowa',
        'Najniższy koszt przy dobrej wydajności',
        'Cicha praca przy typowym obciążeniu',
      ],
      en: [
        'No pump — nothing to leak or seize',
        'Lifespan measured in years, essentially maintenance-free',
        'The lowest cost for genuinely good performance',
        'Quiet under typical load',
      ],
    },
    cons: {
      pl: [
        'Zajmuje dużo miejsca wokół gniazda procesora',
        'Może kolidować z wysokimi radiatorami pamięci',
        'Wymaga sprawdzenia maksymalnej wysokości chłodzenia w obudowie',
      ],
      en: [
        'Takes up a lot of room around the CPU socket',
        'Can clash with tall memory heat spreaders',
        'Requires checking the maximum cooler height your case allows',
      ],
    },
    bestFor: {
      pl: 'Zestawy do gier i pracy z procesorem do około 150 W. Domyślny wybór, jeśli nie masz konkretnego powodu, by wybrać co innego.',
      en: 'Gaming and workstation builds with a CPU up to roughly 150 W. The default choice unless you have a specific reason to pick something else.',
    },
  },
  {
    slug: 'air-tower-dual',
    type: 'air',
    name: {
      pl: 'Chłodzenie powietrzne — wieża podwójna',
      en: 'Air cooling — dual tower',
    },
    tagline: {
      pl: 'Wydajność AiO bez pompy',
      en: 'AiO-class performance without a pump',
    },
    description: {
      pl: 'Dwa bloki lamel i zwykle dwa wentylatory. Konstrukcja dorównuje pod względem odprowadzania ciepła chłodzeniom wodnym z chłodnicą 240 mm, zachowując prostotę i niezawodność powietrza.\n\nCena za to jest fizyczna: takie chłodzenie waży od 1,2 do 1,5 kg i potrafi zająć jedną trzecią szerokości obudowy. Przed zakupem koniecznie sprawdź maksymalną wysokość w specyfikacji swojej obudowy.',
      en: 'Two fin stacks and usually two fans. This class matches 240 mm liquid coolers on heat removal while keeping the simplicity and reliability of air.\n\nThe cost is physical: these coolers weigh 1.2 to 1.5 kg and can occupy a third of the width of the case. Check your case specification for maximum cooler height before buying.',
    },
    wattage: { min: 180, max: 280 },
    noise: { min: 26, max: 36 },
    price: { min: 300, max: 600 },
    pros: {
      pl: [
        'Wydajność porównywalna z chłodnicą 240 mm',
        'Nadal brak pompy i płynu',
        'Bardzo dobra kultura pracy przy niskich obrotach',
      ],
      en: [
        'Performance comparable to a 240 mm radiator',
        'Still no pump and no liquid',
        'Very quiet when the fans are allowed to run slowly',
      ],
    },
    cons: {
      pl: [
        'Duża masa obciążająca płytę główną',
        'Często zasłania pierwszy slot pamięci',
        'Wymaga obudowy o szerokości co najmniej 165 mm',
      ],
      en: [
        'Significant mass hanging off the motherboard',
        'Often overhangs the first memory slot',
        'Needs a case at least 165 mm wide',
      ],
    },
    bestFor: {
      pl: 'Mocne procesory 150–250 W u osób, które nie chcą mieć pompy w zestawie.',
      en: 'Powerful 150–250 W CPUs, for people who would rather not have a pump in the system.',
    },
  },
  {
    slug: 'aio-240',
    type: 'aio',
    name: {
      pl: 'Chłodzenie wodne AiO 240 mm',
      en: 'AiO liquid cooling — 240 mm',
    },
    tagline: {
      pl: 'Zamknięty obieg, przewidywalny montaż',
      en: 'A sealed loop with a predictable installation',
    },
    description: {
      pl: 'Gotowy, zamknięty obieg z chłodnicą na dwa wentylatory 120 mm. Fabrycznie napełniony i szczelny — nie wymaga uzupełniania płynu ani serwisu obiegu.\n\nGłówną zaletą wobec powietrza nie jest wyższa wydajność, lecz przeniesienie ciepła poza okolicę gniazda procesora. Wokół podstawki robi się przestronnie, a gorące powietrze trafia bezpośrednio na zewnątrz obudowy.',
      en: 'A pre-filled, sealed loop with a radiator sized for two 120 mm fans. It arrives filled and closed — there is no fluid to top up and no loop to service.\n\nIts main advantage over air is not raw performance but moving the heat away from the socket area. The space around the CPU opens up, and hot air is exhausted straight out of the case.',
    },
    wattage: { min: 150, max: 250 },
    noise: { min: 28, max: 38 },
    price: { min: 350, max: 700 },
    pros: {
      pl: [
        'Wolna przestrzeń wokół gniazda procesora',
        'Ciepło wyrzucane bezpośrednio poza obudowę',
        'Brak masy zwisającej z płyty głównej',
      ],
      en: [
        'Clear space around the CPU socket',
        'Heat exhausted directly out of the case',
        'No heavy mass hanging off the motherboard',
      ],
    },
    cons: {
      pl: [
        'Pompa to element ruchomy o skończonej żywotności',
        'Droższe od porównywalnego chłodzenia powietrznego',
        'Pompa bywa słyszalna nawet przy niskim obciążeniu',
      ],
      en: [
        'The pump is a moving part with a finite lifespan',
        'More expensive than comparable air cooling',
        'Pump noise can be audible even at low load',
      ],
    },
    bestFor: {
      pl: 'Zestawy 150–220 W, zwłaszcza w obudowach, gdzie duża wieża się nie mieści.',
      en: 'Builds in the 150–220 W range, particularly in cases where a large tower will not fit.',
    },
  },
  {
    slug: 'aio-360',
    type: 'aio',
    name: {
      pl: 'Chłodzenie wodne AiO 360 mm',
      en: 'AiO liquid cooling — 360 mm',
    },
    tagline: {
      pl: 'Dla procesorów, które naprawdę grzeją',
      en: 'For CPUs that genuinely run hot',
    },
    description: {
      pl: 'Chłodnica na trzy wentylatory 120 mm. Największa powierzchnia wymiany ciepła spośród gotowych zestawów, co pozwala utrzymać wysokie taktowania podczas długiego obciążenia wszystkich rdzeni.\n\nMa to sens przy procesorach powyżej 200 W lub przy zadaniach trwających godzinami — renderowaniu, kompilacji, obróbce wideo. Przy typowym graniu różnica wobec 240 mm bywa niewielka, bo gry rzadko obciążają wszystkie rdzenie naraz.',
      en: 'A radiator sized for three 120 mm fans. It offers the largest heat exchange area among off-the-shelf coolers, which lets a CPU hold high clocks through sustained all-core load.\n\nThis matters with CPUs above 200 W or for work that runs for hours — rendering, compiling, video encoding. For typical gaming the gap to a 240 mm unit is often small, because games rarely load every core at once.',
    },
    wattage: { min: 220, max: 350 },
    noise: { min: 30, max: 40 },
    price: { min: 550, max: 1200 },
    pros: {
      pl: [
        'Najwyższa wydajność wśród gotowych zestawów',
        'Utrzymuje taktowania przy długim obciążeniu wszystkich rdzeni',
        'Przy niskich obrotach wentylatorów bardzo cicha',
      ],
      en: [
        'The highest performance among off-the-shelf coolers',
        'Holds clocks through long all-core workloads',
        'Very quiet when the fans are allowed to run slowly',
      ],
    },
    cons: {
      pl: [
        'Wymaga obudowy z miejscem na chłodnicę 360 mm',
        'Najdroższy wariant gotowego chłodzenia',
        'Przy graniu przewaga nad 240 mm często niewielka',
      ],
      en: [
        'Requires a case with room for a 360 mm radiator',
        'The most expensive off-the-shelf option',
        'The advantage over 240 mm is often small when gaming',
      ],
    },
    bestFor: {
      pl: 'Procesory powyżej 200 W i długotrwałe obciążenia — render, kompilacja, obróbka wideo.',
      en: 'CPUs above 200 W and sustained workloads — rendering, compiling, video work.',
    },
  },
  {
    slug: 'custom-loop',
    type: 'custom-loop',
    name: {
      pl: 'Obieg custom',
      en: 'Custom loop',
    },
    tagline: {
      pl: 'Maksymalna kontrola, maksymalne wymagania',
      en: 'Maximum control, maximum commitment',
    },
    description: {
      pl: 'Obieg składany z osobnych elementów: bloku procesora, pompy, zbiornika, chłodnic i przewodów. Daje pełną kontrolę nad wydajnością, wyglądem i poziomem hałasu, a przy dużej powierzchni chłodnic pozwala na pracę praktycznie bezgłośną.\n\nTo jednak zobowiązanie, nie zakup. Obieg wymaga testu szczelności przed pierwszym uruchomieniem i wymiany płynu mniej więcej co rok. Jeśli składasz swój pierwszy komputer, zacznij od czegoś innego — do obiegu custom zawsze zdążysz wrócić.',
      en: 'A loop assembled from separate parts: a CPU block, pump, reservoir, radiators and tubing. It gives complete control over performance, appearance and noise, and with enough radiator area it can run all but silently.\n\nIt is a commitment rather than a purchase, though. A loop needs a leak test before it is first powered on and a fluid change roughly once a year. If this is your first build, start elsewhere — a custom loop will still be there later.',
    },
    wattage: { min: 300, max: 800 },
    noise: { min: 20, max: 32 },
    price: { min: 1800, max: 6000 },
    pros: {
      pl: [
        'Najwyższa możliwa wydajność chłodzenia',
        'Możliwa praca niemal bezgłośna',
        'Jeden obieg może chłodzić procesor i kartę graficzną',
      ],
      en: [
        'The highest cooling performance achievable',
        'Can be made almost silent',
        'One loop can cool both the CPU and the graphics card',
      ],
    },
    cons: {
      pl: [
        'Wysoki koszt i długi, wymagający montaż',
        'Konieczny test szczelności przed uruchomieniem',
        'Wymiana płynu mniej więcej raz w roku',
        'Błąd montażowy może zniszczyć podzespoły',
      ],
      en: [
        'High cost and a long, demanding installation',
        'A leak test is mandatory before powering on',
        'Fluid change roughly once a year',
        'An installation mistake can destroy components',
      ],
    },
    bestFor: {
      pl: 'Doświadczonych użytkowników budujących zestaw pokazowy lub ekstremalnie cichy.',
      en: 'Experienced builders putting together a showcase or an extremely quiet machine.',
    },
  },
];

export function getCoolingProfile(slug: string): CoolingProfile | undefined {
  return coolingProfiles.find((profile) => profile.slug === slug);
}

export function getCoolingByType(type: CoolingType): CoolingProfile[] {
  return coolingProfiles.filter((profile) => profile.type === type);
}

/**
 * Suggests cooling classes able to handle a given CPU power draw.
 *
 * A 15 W margin is added because the rated figure is a sustained-load ceiling,
 * and a cooler run permanently at its limit is a loud cooler.
 */
export function recommendCooling(cpuWatts: number): CoolingProfile[] {
  return coolingProfiles.filter((profile) => profile.wattage.max >= cpuWatts + 15);
}
