import type { Dictionary } from './en';

/**
 * Polish dictionary.
 *
 * Typed as `Dictionary`, so it has to match the English file key for key. A
 * missing translation is a compile error rather than an English string quietly
 * appearing in the middle of a Polish page.
 */
export const pl: Dictionary = {
  meta: {
    siteTitle: 'ZbudujKompa — złóż komputer bez zgadywania',
    siteDescription:
      'Poradniki składania komputera krok po kroku, porównanie platform AMD i Intel, dobór chłodzenia i gotowe zestawy. Konkretnie, bez marketingu.',
    keywords: [
      'składanie komputera',
      'jak złożyć komputer',
      'AMD AM5',
      'Intel LGA1851',
      'chłodzenie procesora',
      'zestaw do gier',
      'kompatybilność podzespołów',
    ],
  },

  nav: {
    skipToContent: 'Przejdź do treści głównej',
    mainNavigation: 'Nawigacja główna',
    openMenu: 'Otwórz menu',
    closeMenu: 'Zamknij menu',
    breadcrumb: 'Ścieżka nawigacji',
    home: 'Strona główna',
    footerNavigation: 'Nawigacja w stopce',
    backToTop: 'Wróć na górę',
    onThisPage: 'Na tej stronie',
  },

  theme: {
    toDark: 'Przełącz na tryb ciemny',
    toLight: 'Przełącz na tryb jasny',
  },

  language: {
    label: 'Język',
    switchTo: (name: string) => `Zmień język na ${name}`,
  },

  home: {
    heroEyebrow: 'Składanie komputera, wytłumaczone porządnie',
    heroTitle: 'Złóż komputer bez zgadywania',
    heroLead:
      'Która podstawka, jakie chłodzenie, jaki zasilacz — z uzasadnieniem każdego wyboru, żebyś mógł zdecydować sam, a nie wierzyć nam na słowo.',
    heroPrimary: 'Zacznij od instrukcji montażu',
    heroSecondary: 'Porównaj platformy',
    statsSockets: 'opisanych platform',
    statsGuides: 'poradników',
    statsBuilds: 'gotowych zestawów',
    platformsTitle: 'Wybierz platformę',
    platformsLead:
      'Podstawka decyduje o chipsecie, generacji pamięci i mocowaniu chłodzenia. To pierwsza realna decyzja przy każdym zestawie.',
    coolingTitle: 'Powietrze czy woda',
    coolingLead:
      'Uczciwe porównanie: ile ciepła każda klasa chłodzenia faktycznie odprowadza, ile kosztuje i czego wymaga w zamian.',
    buildsTitle: 'Gotowe zestawy',
    buildsLead:
      'Kompletne listy części w czterech budżetach, każda z uzasadnieniem doboru podzespołów i ceną orientacyjną.',
    guidesTitle: 'Poradniki',
    guidesLead: 'Od pierwszej śrubki po diagnostykę komputera, który nie chce wystartować.',
    faqTitle: 'Częste pytania',
    opinionsTitle: 'Co mówią składający',
    opinionsLead:
      'Zebrane z publicznych forów, każda opinia ze źródłem i datą zebrania, żebyś mógł sprawdzić oryginał.',
  },

  platform: {
    title: 'Platformy',
    lead: 'Porównanie podstawek AMD i Intela z uczciwą oceną, w które nadal warto wchodzić.',
    socket: 'Podstawka',
    vendor: 'Producent',
    launched: 'Premiera',
    supportedUntil: 'Wsparcie do',
    memory: 'Pamięć',
    pcie: 'PCIe',
    coolerMount: 'Mocowanie chłodzenia',
    chipsets: 'Chipsety',
    chipset: 'Chipset',
    overclocking: 'Podkręcanie',
    tier: 'Klasa',
    verdict: 'Ocena',
    status: 'Status',
    statusCurrent: 'Aktualna',
    statusMature: 'Dojrzała',
    statusLegacy: 'Wycofana',
    ocFull: 'Procesor i pamięć',
    ocMemory: 'Tylko pamięć',
    ocNone: 'Brak',
    tierFlagship: 'Flagowy',
    tierMainstream: 'Średni',
    tierBudget: 'Budżetowy',
    compareAll: 'Porównaj wszystkie platformy',
    relatedBuilds: 'Zestawy na tej platformie',
  },

  cooling: {
    title: 'Chłodzenie',
    lead: 'Ile ciepła realnie odprowadza każda klasa chłodzenia — w watach, decybelach i złotówkach.',
    type: 'Typ',
    typeAir: 'Powietrzne',
    typeAio: 'Wodne AiO',
    typeCustom: 'Obieg custom',
    wattage: 'Odprowadzane ciepło',
    noise: 'Hałas pod obciążeniem',
    price: 'Typowa cena',
    pros: 'Zalety',
    cons: 'Kompromisy',
    bestFor: 'Najlepsze do',
    allTypes: 'Wszystkie typy chłodzenia',
  },

  builds: {
    title: 'Gotowe zestawy',
    lead: 'Kompletne listy części z uzasadnieniem każdego wyboru i orientacyjną sumą.',
    useCase: 'Przeznaczenie',
    expectation: 'Czego oczekiwać',
    parts: 'Lista części',
    part: 'Część',
    component: 'Podzespół',
    price: 'Cena orientacyjna',
    why: 'Dlaczego ta część',
    total: 'Suma orientacyjna',
    difficulty: 'Trudność montażu',
    difficultyBeginner: 'Początkujący',
    difficultyIntermediate: 'Średnio zaawansowany',
    difficultyAdvanced: 'Zaawansowany',
    pricedOn: (date: string) => `Ceny sprawdzone ${date}`,
    priceNote:
      'Orientacyjne ceny detaliczne w Polsce, sprawdzone w podanym dniu. To punkt wyjścia do listy zakupów, a nie aktualny cennik — zweryfikuj je przed zakupem.',
    kind: {
      cpu: 'Procesor',
      motherboard: 'Płyta główna',
      ram: 'Pamięć',
      gpu: 'Karta graficzna',
      storage: 'Dysk',
      psu: 'Zasilacz',
      case: 'Obudowa',
      cooler: 'Chłodzenie procesora',
    },
  },

  guides: {
    title: 'Poradniki',
    lead: 'Instrukcje krok po kroku, pisane dla kogoś, kto robi to pierwszy raz.',
    readingTime: (minutes: number) => `${minutes} min czytania`,
    updated: (date: string) => `Aktualizacja ${date}`,
    difficulty: 'Trudność',
    steps: 'Kroki',
    step: 'Krok',
    stepOf: (current: number, total: number) => `Krok ${current} z ${total}`,
    minutes: (value: number) => `${value} min`,
    toolsNeeded: 'Potrzebne narzędzia',
    warning: 'Ważne',
    related: 'Powiązane poradniki',
    allGuides: 'Wszystkie poradniki',
    category: {
      basics: 'Podstawy',
      assembly: 'Montaż',
      cooling: 'Chłodzenie',
      platform: 'Platformy',
      troubleshooting: 'Diagnostyka',
      optimisation: 'Optymalizacja',
    },
    downloadChecklist: 'Pobierz listę kontrolną',
    downloadChecklistHint:
      'Lista wszystkich kroków do wydrukowania, generowana w twojej przeglądarce.',
  },

  tools: {
    title: 'Narzędzia',
    compatibility: {
      title: 'Sprawdzarka zgodności',
      lead: 'Wybierz podstawkę, chłodzenie i typ pamięci. Sprawdzarka pokaże, co pasuje, a przede wszystkim co nie pasuje.',
      selectSocket: 'Podstawka',
      selectCooling: 'Chłodzenie',
      selectMemory: 'Pamięć',
      cpuWattage: 'Pobór mocy procesora (W)',
      check: 'Sprawdź zgodność',
      resultTitle: 'Wynik',
      compatible: 'Te części do siebie pasują',
      incompatible: 'Te części do siebie nie pasują',
      warningsTitle: 'Warto wiedzieć',
      noSelection: 'Wybierz opcje powyżej, aby zobaczyć wynik.',
    },
    psu: {
      title: 'Kalkulator zasilacza',
      lead: 'Podaj pobór mocy procesora i karty graficznej. Wynik uwzględnia zapas, którego zasilacz naprawdę potrzebuje.',
      cpuWatts: 'Pobór mocy procesora (W)',
      gpuWatts: 'Pobór mocy karty graficznej (W)',
      otherWatts: 'Pozostałe podzespoły (W)',
      calculate: 'Oblicz',
      estimated: 'Szacowany pobór',
      recommended: 'Zalecany zasilacz',
      explanation:
        'Zalecenie dodaje 30 procent do szacowanego poboru. Ten zapas nie służy dokładaniu części — utrzymuje zasilacz blisko szczytu sprawności i pochłania krótkie skoki poboru współczesnych kart graficznych.',
    },
  },

  glossary: {
    title: 'Słownik pojęć',
    lead: 'Terminy, które spotkasz przy składaniu, wyjaśnione w znaczeniu, w jakim je spotkasz.',
    searchLabel: 'Szukaj pojęć',
    searchPlaceholder: 'Wpisz pojęcie…',
    noResults: 'Żadne pojęcie nie pasuje do tego wyszukiwania.',
    resultCount: (count: number) => {
      /* Polish uses three plural forms. The rule below is the standard one:
         1 takes the singular, 2-4 take the "few" form except in the teens,
         and everything else takes the "many" form. */
      if (count === 1) return '1 pojęcie';
      const lastTwo = count % 100;
      const last = count % 10;
      if (lastTwo >= 12 && lastTwo <= 14) return `${count} pojęć`;
      if (last >= 2 && last <= 4) return `${count} pojęcia`;
      return `${count} pojęć`;
    },
  },

  faq: {
    title: 'Najczęstsze pytania',
    lead: 'Pytania, które padają najczęściej, z odpowiedziami bez owijania w bawełnę.',
  },

  opinions: {
    title: 'Opinie społeczności',
    source: 'Źródło',
    collectedOn: (date: string) => `Zebrano ${date}`,
    rating: (value: number) => `Ocena ${value} na 5`,
    disclaimer:
      'To pojedyncze opinie zebrane z publicznych forów, cytowane wraz ze źródłem i datą zebrania. Nie są zweryfikowanymi recenzjami ani nie pochodzą od producentów.',
  },

  chat: {
    title: 'Asystent składania',
    open: 'Otwórz asystenta składania',
    close: 'Zamknij asystenta składania',
    placeholder: 'Zapytaj o podstawki, chłodzenie, pamięć…',
    send: 'Wyślij',
    greeting:
      'Cześć. Zapytaj o podstawki, chłodzenie, pamięć albo zasilacze, a wskażę ci właściwą stronę.',
    suggestions: 'Spróbuj zapytać',
    noAnswer:
      'Nie mam na to dobrej odpowiedzi. Zajrzyj do poradników albo słownika — obejmują więcej niż ja.',
    sourcesLabel: 'Czytaj więcej',
    thinking: 'Sprawdzam…',
    conversation: 'Rozmowa z asystentem składania',
    youLabel: 'Ty',
    botLabel: 'Asystent',
    reset: 'Wyczyść rozmowę',
    offlineNote: 'Odpowiedzi pochodzą z treści tego serwisu, nie z usługi zewnętrznej.',
  },

  about: {
    title: 'O serwisie',
    lead: 'Czym to jest, kto to zrobił i na czym stoi.',
  },

  contact: {
    title: 'Kontakt',
    lead: 'Zauważyłeś błąd albo chcesz zaproponować temat? Napisz.',
    emailLabel: 'E-mail',
    repositoryLabel: 'Kod źródłowy',
    repositoryText:
      'Ten serwis jest otwartoźródłowy. Poprawki mile widziane jako zgłoszenia lub pull requesty.',
  },

  accessibility: {
    title: 'Dostępność',
    lead: 'Co ten serwis robi, żeby był używalny dla każdego, i gdzie ma braki.',
  },

  common: {
    readMore: 'Czytaj więcej',
    learnMore: 'Dowiedz się więcej',
    viewAll: 'Zobacz wszystkie',
    backTo: (target: string) => `Powrót do: ${target}`,
    from: 'od',
    to: 'do',
    of: 'z',
    close: 'Zamknij',
    loading: 'Wczytywanie…',
    externalLink: 'Otwiera się w nowej karcie',
    lastUpdated: 'Ostatnia aktualizacja',
    notFoundTitle: 'Nie znaleziono strony',
    notFoundLead: 'Ta strona nie istnieje. Mogła zostać przeniesiona lub przemianowana.',
    notFoundAction: 'Przejdź na stronę główną',
  },
};
