import type { Article } from './types.ts';

/**
 * Articles published in 2026.
 *
 * Split by year so the file does not grow without bound, and so an archive
 * page can load only the year it is showing.
 */
export const articles2026: Article[] = [
  {
    slug: 'ile-naprawde-potrzeba-vram',
    category: 'analysis',
    published: '2026-08-14',
    perishable: true,
    author: 'Dawid Olko',
    photo: 'gpu-card',
    tags: ['vram', 'karty graficzne', 'analiza'],
    related: ['czy-warto-8gb-vram', 'jak-czytac-testy-wydajnosci'],
    title: {
      pl: 'Ile naprawdę potrzeba VRAM w 2026 roku',
      en: 'How much VRAM you actually need in 2026',
    },
    summary: {
      pl: 'Osiem gigabajtów przestało wystarczać szybciej, niż zakładali producenci. Rozbieramy, skąd bierze się zapotrzebowanie i dlaczego liczba w menedżerze zadań kłamie.',
      en: 'Eight gigabytes stopped being enough faster than manufacturers assumed. We take apart where the demand comes from, and why the figure in task manager lies.',
    },
    body: [
      {
        type: 'paragraph',
        text: {
          pl: 'Pytanie o ilość pamięci na karcie graficznej wraca przy każdej premierze i za każdym razem dostaje tę samą złą odpowiedź: „sprawdź, ile gra zużywa w menedżerze zadań". To nie działa i warto zrozumieć, dlaczego.',
          en: 'The question of how much memory a graphics card needs returns with every launch, and every time it gets the same bad answer: "check how much the game uses in task manager". That does not work, and it is worth understanding why.',
        },
      },
      {
        type: 'heading',
        id: 'alokacja-vs-uzycie',
        text: { pl: 'Alokacja to nie zużycie', en: 'Allocation is not usage' },
      },
      {
        type: 'paragraph',
        text: {
          pl: 'Narzędzia pokazujące „zużycie VRAM" raportują pamięć zaalokowaną, nie faktycznie potrzebną. Silniki gier działają oportunistycznie: jeśli karta ma 24 GB, silnik trzyma w pamięci tekstury, których może potrzebować za chwilę, bo nic go to nie kosztuje. Ta sama gra na karcie z 12 GB zwolni je bez zauważalnej różnicy.',
          en: 'Tools that report "VRAM usage" show allocated memory, not what is genuinely needed. Game engines behave opportunistically: if a card has 24 GB, the engine keeps textures it might want in a moment, because holding them costs nothing. The same game on a 12 GB card releases them with no noticeable difference.',
        },
      },
      {
        type: 'callout',
        tone: 'warning',
        label: { pl: 'Częsty błąd', en: 'A common mistake' },
        text: {
          pl: 'Zobaczenie „15 GB zajęte" na karcie z 24 GB nie oznacza, że karta z 16 GB byłaby za mała. Oznacza tylko, że silnik miał 24 GB do dyspozycji.',
          en: 'Seeing "15 GB in use" on a 24 GB card does not mean a 16 GB card would be too small. It means only that the engine had 24 GB available to it.',
        },
      },
      {
        type: 'heading',
        id: 'co-faktycznie-zajmuje',
        text: { pl: 'Co faktycznie zajmuje pamięć', en: 'What actually occupies the memory' },
      },
      {
        type: 'paragraph',
        text: {
          pl: 'Bufor ramki — obraz, który widzisz — to ułamek całości. W 4K przy potrójnym buforowaniu i 32 bitach na piksel wychodzi około 100 MB. To jeden procent tego, co zajmuje współczesna gra.',
          en: 'The framebuffer — the image you see — is a fraction of the total. At 4K with triple buffering and 32 bits per pixel it comes to around 100 MB. That is one per cent of what a modern game occupies.',
        },
      },
      {
        type: 'list',
        items: {
          pl: [
            'Tekstury — największa pozycja i, co kluczowe, niezależna od rozdzielczości. Ustawienie tekstur na ultra w 1080p zajmuje tyle samo, co w 4K.',
            'Bufory pośrednie renderowania odroczonego — zależne od rozdzielczości, zwykle 30–100 bajtów na piksel.',
            'Mapy cieni — niezależne od rozdzielczości ekranu, zależne od ustawień jakości cieni.',
            'Struktury przyspieszające ray tracing — zależne od geometrii sceny, często 1–2 GB.',
            'Bufory historii dla skalowania i wygładzania — zależne od rozdzielczości.',
          ],
          en: [
            'Textures — the largest item and, critically, independent of resolution. Ultra textures at 1080p occupy exactly as much as at 4K.',
            'Deferred rendering intermediate buffers — resolution-dependent, typically 30–100 bytes per pixel.',
            'Shadow maps — independent of screen resolution, dependent on shadow quality settings.',
            'Ray tracing acceleration structures — dependent on scene geometry, often 1–2 GB.',
            'History buffers for upscaling and anti-aliasing — resolution-dependent.',
          ],
        },
      },
      {
        type: 'paragraph',
        text: {
          pl: 'Ta lista tłumaczy zjawisko, które myli najbardziej: karta z 8 GB potrafi mieć problem w 1080p na wysokich teksturach, a jednocześnie radzić sobie w 4K na średnich. Tekstury nie skalują się z rozdzielczością, więc to one, a nie liczba pikseli, wypełniają pamięć.',
          en: 'That list explains the thing that confuses people most: an 8 GB card can struggle at 1080p with high textures while coping at 4K on medium. Textures do not scale with resolution, so it is they — not the pixel count — that fill the memory.',
        },
      },
      {
        type: 'heading',
        id: 'praktyczne-progi',
        text: { pl: 'Praktyczne progi', en: 'Practical thresholds' },
      },
      {
        type: 'table',
        caption: {
          pl: 'Zapotrzebowanie na pamięć karty według rozdzielczości i ustawień, stan na sierpień 2026',
          en: 'Graphics memory demand by resolution and settings, as of August 2026',
        },
        headers: {
          pl: ['Rozdzielczość', 'Ustawienia', 'Wystarczy', 'Komfortowo'],
          en: ['Resolution', 'Settings', 'Enough', 'Comfortable'],
        },
        rows: [
          { pl: ['1080p', 'średnie', '8 GB', '12 GB'], en: ['1080p', 'medium', '8 GB', '12 GB'] },
          {
            pl: ['1080p', 'ultra + RT', '12 GB', '16 GB'],
            en: ['1080p', 'ultra + RT', '12 GB', '16 GB'],
          },
          { pl: ['1440p', 'wysokie', '12 GB', '16 GB'], en: ['1440p', 'high', '12 GB', '16 GB'] },
          {
            pl: ['1440p', 'ultra + RT', '16 GB', '16 GB'],
            en: ['1440p', 'ultra + RT', '16 GB', '16 GB'],
          },
          { pl: ['4K', 'wysokie', '16 GB', '20 GB'], en: ['4K', 'high', '16 GB', '20 GB'] },
          {
            pl: ['4K', 'ultra + RT', '16 GB', '24 GB'],
            en: ['4K', 'ultra + RT', '16 GB', '24 GB'],
          },
        ],
      },
      {
        type: 'callout',
        tone: 'info',
        label: { pl: 'Skąd te liczby', en: 'Where these come from' },
        text: {
          pl: 'To wartości obserwowane w testach niezależnych recenzentów, nie wynik wzoru. Nie ma wzoru na zapotrzebowanie na VRAM — jest tylko pomiar, i te liczby będą rosły.',
          en: 'These are figures observed in independent testing, not the output of a formula. There is no formula for VRAM demand — only measurement, and these numbers will rise.',
        },
      },
      {
        type: 'heading',
        id: 'co-sie-dzieje-po-przekroczeniu',
        text: { pl: 'Co się dzieje po przekroczeniu', en: 'What happens when you run out' },
      },
      {
        type: 'paragraph',
        text: {
          pl: 'Brak pamięci nie objawia się spadkiem średniej liczby klatek, tylko przycięciami. Gdy tekstura nie mieści się na karcie, sterownik pobiera ją przez PCIe z pamięci systemowej — rząd wielkości wolniej. Średnia może zostać na 80 klatkach, a gra i tak będzie się zacinać przy każdym obrocie kamery.',
          en: 'Running out of memory does not show up as a lower average frame rate; it shows up as stutter. When a texture does not fit on the card, the driver fetches it over PCIe from system memory — an order of magnitude slower. The average can stay at 80 frames while the game hitches on every camera turn.',
        },
      },
      {
        type: 'paragraph',
        text: {
          pl: 'Dlatego przy ocenie kart patrz na wyniki 1% najniższych klatek, a nie na średnią. Karta z mniejszą pamięcią potrafi mieć identyczną średnią i wyraźnie gorsze minima — a to minima decydują o tym, czy gra jest płynna w odbiorze.',
          en: 'That is why, when judging cards, you look at the 1 per cent low figures rather than the average. A card with less memory can post an identical average and markedly worse minimums — and the minimums are what decide whether a game feels smooth.',
        },
      },
      {
        type: 'heading',
        id: 'wniosek',
        text: { pl: 'Wniosek', en: 'The conclusion' },
      },
      {
        type: 'paragraph',
        text: {
          pl: 'W sierpniu 2026 kupowanie karty z 8 GB ma sens wyłącznie do 1080p i przy akceptacji obniżania tekstur w nowszych tytułach. 12 GB to rozsądne minimum dla 1440p, a 16 GB to wartość, która nie będzie ograniczać przez kilka lat. Powyżej 16 GB płacisz za zapas, który w grach wykorzystasz rzadko — chyba że renderujesz albo pracujesz z modelami AI, gdzie pamięć jest twardym ograniczeniem.',
          en: 'As of August 2026, buying an 8 GB card makes sense only for 1080p and only if you accept lowering textures in newer titles. 12 GB is a sensible minimum for 1440p, and 16 GB is the figure that will not constrain you for several years. Above 16 GB you are paying for headroom you will rarely use in games — unless you render or work with AI models, where memory is a hard limit.',
        },
      },
    ],
  },
  {
    slug: 'czy-warto-8gb-vram',
    category: 'buying',
    published: '2026-07-22',
    perishable: true,
    author: 'Dawid Olko',
    photo: 'gpu-card',
    tags: ['vram', 'zakupy', 'karty graficzne'],
    related: ['ile-naprawde-potrzeba-vram'],
    title: {
      pl: 'Karta z 8 GB w 2026 — kiedy to jeszcze ma sens',
      en: 'An 8 GB card in 2026 — when it still makes sense',
    },
    summary: {
      pl: 'Osiem gigabajtów to dziś dolna granica, ale nie automatyczna dyskwalifikacja. Wyjaśniamy, w których scenariuszach taka karta wciąż jest rozsądnym zakupem.',
      en: 'Eight gigabytes is the floor today, but not an automatic disqualification. We set out the cases where such a card is still a sensible buy.',
    },
    body: [
      {
        type: 'paragraph',
        text: {
          pl: 'Wokół kart z ośmioma gigabajtami narosło sporo emocji, a odpowiedź jest bardziej zniuansowana niż „nie kupuj". Zależy od tego, w co grasz i w jakiej rozdzielczości.',
          en: 'A lot of heat has built up around 8 GB cards, and the answer is more nuanced than "do not buy". It depends on what you play and at what resolution.',
        },
      },
      {
        type: 'heading',
        id: 'kiedy-tak',
        text: { pl: 'Kiedy 8 GB wystarczy', en: 'When 8 GB is enough' },
      },
      {
        type: 'list',
        items: {
          pl: [
            'Gry sieciowe i e-sportowe — CS2, Valorant, League of Legends, Dota. Te tytuły są projektowane pod szeroki sprzęt i rzadko przekraczają 6 GB.',
            'Granie w 1080p na ustawieniach średnich i wysokich, bez ray tracingu.',
            'Starsze tytuły z biblioteki — wszystko sprzed 2022 roku mieści się bez problemu.',
            'Komputer, który głównie służy do pracy, a granie jest okazjonalne.',
          ],
          en: [
            'Multiplayer and esports titles — CS2, Valorant, League of Legends, Dota. These are designed for broad hardware and rarely exceed 6 GB.',
            'Gaming at 1080p on medium and high settings, without ray tracing.',
            'Older titles from a back catalogue — anything before 2022 fits comfortably.',
            'A machine used mainly for work, where gaming is occasional.',
          ],
        },
      },
      {
        type: 'heading',
        id: 'kiedy-nie',
        text: { pl: 'Kiedy to zły pomysł', en: 'When it is a bad idea' },
      },
      {
        type: 'list',
        items: {
          pl: [
            'Nowe tytuły AAA na wysokich teksturach — tu 8 GB kończy się przycięciami.',
            'Ray tracing w czymkolwiek nowszym niż 2023 rok.',
            'Rozdzielczość 1440p i wyżej z ustawieniami powyżej średnich.',
            'Modding, zwłaszcza paczki tekstur — potrafią podwoić zapotrzebowanie.',
            'Zakup z myślą o kilku latach. Trend jest jednokierunkowy.',
          ],
          en: [
            'New AAA titles on high textures — this is where 8 GB turns into stutter.',
            'Ray tracing in anything newer than 2023.',
            'Resolutions of 1440p and above at settings past medium.',
            'Modding, texture packs especially — they can double the requirement.',
            'Buying with several years in mind. The trend runs one way.',
          ],
        },
      },
      {
        type: 'callout',
        tone: 'info',
        label: { pl: 'Praktyczna zasada', en: 'A practical rule' },
        text: {
          pl: 'Jeśli różnica w cenie między wersją 8 GB a 16 GB tej samej karty wynosi poniżej 20 procent, dopłać. To najtańsze wydłużenie życia zestawu, jakie możesz kupić.',
          en: 'If the price gap between the 8 GB and 16 GB version of the same card is under 20 per cent, pay the difference. It is the cheapest extension of a build lifespan you can buy.',
        },
      },
    ],
  },
  {
    slug: 'jak-czytac-testy-wydajnosci',
    category: 'explainer',
    published: '2026-06-30',
    author: 'Dawid Olko',
    photo: 'workstation',
    tags: ['testy', 'metodyka', 'poradnik'],
    related: ['ile-naprawde-potrzeba-vram'],
    title: {
      pl: 'Jak czytać testy wydajności, żeby się nie naciąć',
      en: 'How to read benchmarks without being misled',
    },
    summary: {
      pl: 'Średnia liczba klatek to najmniej użyteczna liczba w recenzji. Pokazujemy, na co patrzeć zamiast niej i jakie pułapki kryją wykresy.',
      en: 'The average frame rate is the least useful number in a review. Here is what to look at instead, and the traps hiding in the charts.',
    },
    body: [
      {
        type: 'paragraph',
        text: {
          pl: 'Recenzje sprzętu operują liczbami, które wyglądają na obiektywne, ale ich interpretacja wymaga kontekstu. Kilka rzeczy zmienia sposób czytania wykresów na zawsze.',
          en: 'Hardware reviews trade in numbers that look objective, but reading them requires context. A few things change how you read a chart permanently.',
        },
      },
      {
        type: 'heading',
        id: 'minima-nie-srednia',
        text: {
          pl: 'Patrz na minima, nie na średnią',
          en: 'Look at the minimums, not the average',
        },
      },
      {
        type: 'paragraph',
        text: {
          pl: 'Średnia 100 klatek może oznaczać równe 100 przez całą sesję albo skoki między 140 a 45. Pierwsze jest płynne, drugie odczuwalnie się zacina. Rozróżnia je wskaźnik 1% najniższych klatek — czyli najgorsze jedno na sto pomiarów.',
          en: 'An average of 100 frames can mean a steady 100 throughout, or swings between 140 and 45. The first is smooth; the second visibly stutters. The 1 per cent low figure — the worst one measurement in a hundred — is what distinguishes them.',
        },
      },
      {
        type: 'keyFigure',
        value: '1%',
        label: {
          pl: 'najniższych klatek — jedyna liczba mówiąca o płynności',
          en: 'low frame rate — the one number that describes smoothness',
        },
        note: {
          pl: 'Jeśli recenzja jej nie podaje, nie da się z niej wywnioskować, czy gra działa płynnie.',
          en: 'If a review does not report it, you cannot tell from it whether a game runs smoothly.',
        },
      },
      {
        type: 'heading',
        id: 'rozdzielczosc-testu',
        text: { pl: 'Sprawdź rozdzielczość testu', en: 'Check the test resolution' },
      },
      {
        type: 'paragraph',
        text: {
          pl: 'Testy procesorów robi się często w 1080p na najmocniejszej dostępnej karcie — celowo, żeby zdjąć ograniczenie karty i pokazać różnice między procesorami. To poprawna metodyka, ale wyniki nie przekładają się wprost na twój zestaw: w 4K te same procesory będą w granicy błędu pomiaru.',
          en: 'Processor tests are often run at 1080p with the fastest card available — deliberately, to remove the graphics limit and expose differences between processors. That is correct methodology, but the results do not transfer directly to your build: at 4K those same processors land within measurement error of each other.',
        },
      },
      {
        type: 'callout',
        tone: 'warning',
        label: { pl: 'Uwaga', en: 'Careful' },
        text: {
          pl: 'Różnica 15 procent między procesorami w teście 1080p może oznaczać 2 procent w twoim zestawie w 1440p. To nie jest oszustwo recenzenta — to inne pytanie badawcze.',
          en: 'A 15 per cent gap between processors in a 1080p test can mean 2 per cent in your build at 1440p. That is not the reviewer misleading you — it is a different question being asked.',
        },
      },
      {
        type: 'heading',
        id: 'osie-wykresow',
        text: { pl: 'Patrz na osie wykresów', en: 'Look at the chart axes' },
      },
      {
        type: 'paragraph',
        text: {
          pl: 'Wykres słupkowy zaczynający się od 90 zamiast od zera zamienia różnicę trzech procent w wizualnie dwukrotną. To najczęstsza manipulacja w materiałach producentów i zdarza się też w recenzjach — nie zawsze złośliwie, czasem po prostu przez domyślne ustawienia narzędzia.',
          en: 'A bar chart starting at 90 rather than zero turns a three per cent difference into a visually twofold one. It is the most common manipulation in manufacturer material and appears in reviews too — not always maliciously, sometimes just through a tool default.',
        },
      },
      {
        type: 'heading',
        id: 'jedna-recenzja-to-za-malo',
        text: { pl: 'Jedna recenzja to za mało', en: 'One review is not enough' },
      },
      {
        type: 'paragraph',
        text: {
          pl: 'Egzemplarze tego samego modelu różnią się między sobą, sterowniki się zmieniają, a każdy recenzent testuje w innej scenie. Trzy niezależne źródła dają obraz, którego pojedyncza recenzja nie da — a rozbieżność między nimi sama w sobie jest informacją.',
          en: 'Samples of the same model differ, drivers change, and every reviewer tests a different scene. Three independent sources give a picture no single review can — and disagreement between them is itself information.',
        },
      },
    ],
  },
  {
    slug: 'ddr5-czy-warto-najszybsza-pamiec',
    category: 'analysis',
    published: '2026-05-18',
    author: 'Dawid Olko',
    photo: 'memory-modules',
    tags: ['pamięć', 'ddr5', 'analiza'],
    related: ['jak-czytac-testy-wydajnosci'],
    title: {
      pl: 'DDR5-8000 kontra DDR5-6000 — czy szybsza pamięć się opłaca',
      en: 'DDR5-8000 against DDR5-6000 — is faster memory worth it',
    },
    summary: {
      pl: 'Wyższa liczba na opakowaniu nie zawsze oznacza szybszy komputer. Wyjaśniamy, gdzie leży granica opłacalności i dlaczego na Ryzenach jest szczególnie ostra.',
      en: 'A higher number on the box does not always mean a faster machine. We explain where the returns stop, and why on Ryzen the boundary is unusually sharp.',
    },
    body: [
      {
        type: 'paragraph',
        text: {
          pl: 'Pamięć DDR5 sprzedaje się dziś w zakresie od 4800 do ponad 9000 MT/s, a różnica w cenie między krańcami tego zakresu bywa trzykrotna. Pytanie brzmi, gdzie kończy się realny zysk.',
          en: 'DDR5 sells today in a range from 4800 to over 9000 MT/s, and the price difference between the ends of that range can be threefold. The question is where the real gain stops.',
        },
      },
      {
        type: 'heading',
        id: 'nanosekundy-nie-megatransfery',
        text: {
          pl: 'Liczą się nanosekundy, nie megatransfery',
          en: 'Nanoseconds matter, not megatransfers',
        },
      },
      {
        type: 'paragraph',
        text: {
          pl: 'Opóźnienie CAS podawane jest w taktach zegara, a nie w czasie. Moduł DDR5-6000 CL30 i DDR5-8000 CL40 mają identyczne opóźnienie pierwszego słowa: 10 nanosekund. Szybszy moduł oferuje wyższą przepustowość, ale nie krótsze opóźnienie — a większość gier reaguje na to drugie.',
          en: 'CAS latency is given in clock cycles, not in time. A DDR5-6000 CL30 kit and a DDR5-8000 CL40 kit have identical first-word latency: 10 nanoseconds. The faster kit offers more bandwidth but no less latency — and most games respond to the latter.',
        },
      },
      {
        type: 'heading',
        id: 'granica-na-ryzenie',
        text: { pl: 'Twarda granica na Ryzenach', en: 'The hard boundary on Ryzen' },
      },
      {
        type: 'paragraph',
        text: {
          pl: 'Na procesorach Ryzen kontroler pamięci pracuje synchronicznie z pamięcią do pewnej częstotliwości, a powyżej przechodzi w tryb dzielony. Po przekroczeniu tego progu wydajność potrafi spaść mimo wyższych liczb na module. Dla Ryzen 7000 i 9000 próg leży zwykle między 6000 a 6400 MT/s.',
          en: 'On Ryzen processors the memory controller runs synchronously with the memory up to a certain frequency, and above it drops into a divided mode. Past that threshold performance can fall despite the higher numbers on the module. For Ryzen 7000 and 9000 the threshold usually sits between 6000 and 6400 MT/s.',
        },
      },
      {
        type: 'callout',
        tone: 'success',
        label: { pl: 'Rekomendacja', en: 'Recommendation' },
        text: {
          pl: 'Dla Ryzena kup DDR5-6000 CL30 i przestań o tym myśleć. To nie jest kompromis — to punkt, w którym platforma pracuje najefektywniej.',
          en: 'For Ryzen, buy DDR5-6000 CL30 and stop thinking about it. This is not a compromise — it is the point at which the platform runs most efficiently.',
        },
      },
      {
        type: 'paragraph',
        text: {
          pl: 'Na Intelu sytuacja jest inna: kontroler radzi sobie z wyższymi częstotliwościami i szybsza pamięć daje tam realny, choć wciąż niewielki, przyrost. Mówimy o kilku procentach w grach ograniczonych procesorem i praktycznie zerze w rozdzielczości 4K.',
          en: 'On Intel the situation differs: the controller handles higher frequencies and faster memory does give a real, if still small, gain there. We are talking about a few per cent in CPU-limited games and effectively nothing at 4K.',
        },
      },
    ],
  },
  {
    slug: 'czy-warto-teraz-kupowac-komputer',
    category: 'opinion',
    published: '2026-04-11',
    perishable: true,
    author: 'Dawid Olko',
    photo: 'hero-workbench',
    tags: ['zakupy', 'opinia', 'rynek'],
    title: {
      pl: 'Czy teraz to dobry moment na zakup komputera',
      en: 'Is now a good time to buy a computer',
    },
    summary: {
      pl: 'Pytanie zadawane bez przerwy i mające zawsze tę samą odpowiedź — ale warto wiedzieć, dlaczego akurat taką.',
      en: 'A question asked constantly, with always the same answer — though it is worth knowing why that answer holds.',
    },
    body: [
      {
        type: 'paragraph',
        text: {
          pl: 'Na forach ta kwestia wraca co tydzień: „czy poczekać na następną generację". Odpowiedź brzmi: kup, kiedy potrzebujesz, bo czekanie na lepszy moment jest z definicji nieskończone.',
          en: 'On forums this comes up weekly: "should I wait for the next generation". The answer is: buy when you need to, because waiting for a better moment is by definition endless.',
        },
      },
      {
        type: 'heading',
        id: 'zawsze-cos-nadchodzi',
        text: { pl: 'Zawsze coś nadchodzi', en: 'Something is always coming' },
      },
      {
        type: 'paragraph',
        text: {
          pl: 'Cykl premier w tej branży nie ma przerw. Gdy kupujesz, zawsze za trzy do sześciu miesięcy pojawi się coś szybszego, a za rok coś, co sprawi, że twój sprzęt będzie wyglądał na średni. To normalna dynamika, nie powód do odkładania zakupu.',
          en: 'The release cycle in this industry has no gaps. Whenever you buy, something faster arrives in three to six months, and within a year something that makes your hardware look mid-range. That is the normal rhythm, not a reason to defer.',
        },
      },
      {
        type: 'heading',
        id: 'kiedy-faktycznie-poczekac',
        text: { pl: 'Kiedy faktycznie warto poczekać', en: 'When waiting genuinely makes sense' },
      },
      {
        type: 'list',
        items: {
          pl: [
            'Premiera jest ogłoszona i wypada w ciągu najbliższych czterech do sześciu tygodni. Wtedy poczekanie nic nie kosztuje, a często obniża cenę poprzedniej generacji.',
            'Kupujesz platformę, a nie pojedynczą część — nowa podstawka tuż przed premierą to zakup w ślepą uliczkę.',
            'Twój obecny komputer działa i nic ci nie blokuje.',
          ],
          en: [
            'A launch is announced and falls within the next four to six weeks. Waiting then costs nothing, and often lowers the price of the previous generation.',
            'You are buying a platform rather than a single part — a new socket just before a launch is buying into a dead end.',
            'Your current machine works and nothing is blocking you.',
          ],
        },
      },
      {
        type: 'callout',
        tone: 'info',
        label: { pl: 'Zasada praktyczna', en: 'A practical rule' },
        text: {
          pl: 'Jeśli komputer jest ci potrzebny teraz i masz budżet, kup teraz. Trzy miesiące czekania kosztują cię trzy miesiące używania sprzętu, a zyskujesz przeciętnie kilka procent wydajności za tę samą cenę.',
          en: 'If you need the machine now and have the budget, buy now. Three months of waiting costs you three months of using it, and gains you on average a few per cent of performance for the same money.',
        },
      },
    ],
  },
];
