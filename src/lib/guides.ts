import type { Guide, GuideCategory } from './types';

/**
 * Guide catalogue.
 *
 * Each guide is a sequence of anchored steps rather than one block of prose, so
 * the table of contents, the deep links and the HowTo structured data can all
 * be generated from the same source instead of being maintained separately.
 */
export const guides: Guide[] = [
  {
    slug: 'assembly-step-by-step',
    category: 'assembly',
    difficulty: 'beginner',
    updated: '2026-08-01',
    related: ['first-boot-and-bios', 'cable-management', 'troubleshooting-no-post'],
    title: {
      pl: 'Składanie komputera krok po kroku',
      en: 'Building a PC step by step',
    },
    summary: {
      pl: 'Pełna instrukcja montażu od rozpakowania części do pierwszego uruchomienia. Kolejność ma znaczenie — opisana tutaj oszczędza sporo cofania się.',
      en: 'A complete walkthrough from unboxing to first boot. Order matters — the sequence here saves a lot of backtracking.',
    },
    steps: [
      {
        id: 'preparation',
        minutes: 15,
        title: { pl: 'Przygotowanie stanowiska', en: 'Preparing your workspace' },
        tools: {
          pl: ['Śrubokręt krzyżakowy PH2', 'Opaski zaciskowe', 'Latarka lub lampka'],
          en: ['PH2 Phillips screwdriver', 'Cable ties', 'A torch or desk lamp'],
        },
        body: {
          pl: [
            'Potrzebujesz płaskiej powierzchni większej niż obudowa, dobrego światła i jednego śrubokręta krzyżakowego PH2. To pokrywa około 95 procent wkrętów w typowym zestawie.',
            'Rozpakuj wszystkie części i sprawdź, czy niczego nie brakuje, zanim zaczniesz cokolwiek przykręcać. Szczególnie łatwo przeoczyć brak kabla zasilania karty graficznej albo śrubek do dysku NVMe.',
            'O ładunkach elektrostatycznych: ryzyko jest realne, ale często wyolbrzymiane. Wystarczy dotknąć metalowej części obudowy przed wzięciem podzespołu do ręki i nie składać komputera na dywanie w wełnianym swetrze. Opaska antystatyczna jest przydatna, ale nie obowiązkowa.',
          ],
          en: [
            'You need a flat surface larger than the case, good light and a single PH2 Phillips screwdriver. That covers roughly 95 per cent of the screws in a typical build.',
            'Unbox everything and check nothing is missing before you screw anything down. A missing GPU power cable or a missing NVMe screw is particularly easy to overlook.',
            'On static electricity: the risk is real but frequently overstated. Touching a bare metal part of the case before picking up a component, and not building on carpet in a wool jumper, is enough. An anti-static strap is useful but not mandatory.',
          ],
        },
      },
      {
        id: 'cpu',
        minutes: 10,
        title: { pl: 'Montaż procesora', en: 'Installing the CPU' },
        warning: {
          pl: 'Nigdy nie dociskaj procesora siłą. Prawidłowo ułożony wpada w gniazdo pod własnym ciężarem — opór zawsze oznacza złe ustawienie.',
          en: 'Never force the CPU down. Correctly aligned, it drops into the socket under its own weight — resistance always means it is misaligned.',
        },
        body: {
          pl: [
            'Wykonaj ten krok przy płycie głównej leżącej poza obudową, na pudełku, w którym przyszła. Będziesz miał znacznie lepszy dostęp niż po jej przykręceniu.',
            'Podnieś dźwignię gniazda. Na procesorze i na gnieździe znajdziesz mały trójkąt — muszą się pokrywać. W przypadku AMD AM5 i wszystkich podstawek Intela piny są w gnieździe, nie na procesorze, więc największym zagrożeniem jest upuszczenie procesora na gniazdo.',
            'Ułóż procesor prosto nad gniazdem i opuść pionowo. Nie przesuwaj go na boki. Następnie opuść ramkę i dociśnij dźwignię — opór przy zamykaniu jest normalny i bywa zaskakująco duży.',
          ],
          en: [
            'Do this with the motherboard outside the case, resting on the box it came in. Access is far better than it will be once the board is screwed down.',
            'Lift the socket lever. There is a small triangle on both the CPU and the socket — they must line up. On AMD AM5 and every Intel socket the pins are in the socket rather than on the chip, so the main hazard is dropping the CPU onto the socket.',
            'Hold the CPU flat above the socket and lower it straight down. Do not slide it sideways. Then close the retention frame and press the lever home — resistance while closing is normal and can be surprisingly firm.',
          ],
        },
      },
      {
        id: 'memory',
        minutes: 5,
        title: { pl: 'Montaż pamięci RAM', en: 'Installing the memory' },
        warning: {
          pl: 'Dwa moduły montuj w slotach 2 i 4, licząc od procesora. Włożenie ich w sąsiadujące sloty wyłącza tryb dwukanałowy i realnie obniża wydajność.',
          en: 'With two modules, use slots 2 and 4 counting from the CPU. Putting them in adjacent slots disables dual channel and measurably reduces performance.',
        },
        body: {
          pl: [
            'To najczęściej mylony krok w całym montażu i jednocześnie najłatwiejszy do naprawienia. Instrukcja płyty głównej podaje właściwe sloty wprost — zwykle są to A2 i B2.',
            'Otwórz zatrzaski na końcach slotów. Część płyt ma zatrzask tylko z jednej strony, co jest normalne. Wycięcie w module pasuje tylko w jednej orientacji.',
            'Dociskaj moduł równomiernie z obu końców, aż zatrzaski same zaskoczą. Wymagana siła jest wyraźnie większa, niż podpowiada intuicja — moduł, który nie kliknął, jest modułem, którego komputer nie zobaczy.',
          ],
          en: [
            'This is the most commonly mistaken step in the whole build, and also the easiest to correct. The motherboard manual states the correct slots explicitly — usually A2 and B2.',
            'Open the clips at the ends of the slots. Some boards have a clip on one side only, which is normal. The notch in the module fits one orientation only.',
            'Press down evenly at both ends until the clips snap shut by themselves. The force needed is noticeably more than intuition suggests — a module that has not clicked is a module the computer will not see.',
          ],
        },
      },
      {
        id: 'storage',
        minutes: 5,
        title: { pl: 'Montaż dysku NVMe', en: 'Installing the NVMe drive' },
        body: {
          pl: [
            'Zrób to teraz, dopóki płyta leży poza obudową. Po zamontowaniu karty graficznej dostęp do górnego slotu M.2 bywa całkowicie zablokowany.',
            'Zdejmij radiator ze slotu M.2, jeśli płyta go ma, i pamiętaj o usunięciu folii ochronnej z podkładki termicznej pod spodem. Pozostawiona folia to częsty powód przegrzewania się dysku.',
            'Wsuń dysk pod kątem około 30 stopni, dociśnij poziomo i przykręć jedną małą śrubką. Nie dokręcaj jej mocno — wystarczy, by dysk nie odskakiwał.',
          ],
          en: [
            'Do this now, while the board is still outside the case. Once the graphics card is in, access to the top M.2 slot is often completely blocked.',
            'Remove the M.2 heatsink if the board has one, and remember to peel the protective film off the thermal pad underneath. Leaving that film on is a common cause of a drive running hot.',
            'Slide the drive in at roughly 30 degrees, press it flat and secure it with the single small screw. Do not overtighten — it only needs to stop the drive springing back up.',
          ],
        },
      },
      {
        id: 'cooler',
        minutes: 20,
        title: { pl: 'Montaż chłodzenia procesora', en: 'Installing the CPU cooler' },
        warning: {
          pl: 'Pastę termoprzewodzącą nakładaj tylko wtedy, gdy nie ma jej fabrycznie na podstawie chłodzenia. Podwójna warstwa pogarsza odprowadzanie ciepła.',
          en: 'Only apply thermal paste if the cooler does not already have some pre-applied on its base. A double layer makes heat transfer worse, not better.',
        },
        body: {
          pl: [
            'Ilość pasty: kropla wielkości ziarna grochu na środku pokrywy procesora. Nacisk chłodzenia rozprowadzi ją równomiernie. Rozsmarowywanie pasty kartą nie jest potrzebne i zwykle wprowadza pęcherzyki powietrza.',
            'Backplate montuje się od spodu płyty głównej — to kolejny powód, by nie przykręcać jeszcze płyty do obudowy. Sprawdź w instrukcji, którego zestawu mocowań użyć dla swojej podstawki.',
            'Śruby dokręcaj naprzemiennie, po trochu, jak koła w samochodzie. Dokręcenie jednej strony do końca przed drugą przechyla blok i pozostawia część powierzchni bez kontaktu.',
            'Wentylator podłącz do gniazda opisanego CPU_FAN. Płyta sprawdza to gniazdo przy starcie i wiele modeli odmawia uruchomienia, gdy nie wykryje tam obrotów.',
          ],
          en: [
            'How much paste: a pea-sized dot in the centre of the CPU lid. The cooler pressure spreads it evenly. Spreading it manually with a card is unnecessary and usually introduces air bubbles.',
            'The backplate mounts from behind the motherboard — another reason not to have screwed the board into the case yet. Check the manual for which mounting hardware your socket uses.',
            'Tighten the screws alternately and a little at a time, like wheel nuts on a car. Fully tightening one side before the other tilts the block and leaves part of the surface out of contact.',
            'Connect the fan to the header marked CPU_FAN. The board checks that header at startup, and many models refuse to boot if they detect no fan speed there.',
          ],
        },
      },
      {
        id: 'case-prep',
        minutes: 15,
        title: { pl: 'Przygotowanie obudowy', en: 'Preparing the case' },
        body: {
          pl: [
            'Zdejmij oba panele boczne i wyjmij wszystko, co producent zapakował do środka — zwykle w koszu na dyski znajdziesz pudełko ze śrubkami.',
            'Sprawdź rozmieszczenie kołków dystansowych. Muszą odpowiadać otworom w twojej płycie głównej, ani mniej, ani więcej. Kołek pod miejscem bez otworu może zewrzeć płytę.',
            'Zamontuj osłonę wejść-wyjść, jeśli twoja płyta ma ją osobno. To jedyny element, którego po zamontowaniu płyty nie da się już dołożyć bez jej wykręcania — i najczęściej pomijany krok w całym montażu.',
          ],
          en: [
            'Remove both side panels and take out everything the manufacturer packed inside — the screw box is usually in the drive cage.',
            'Check the standoff layout. They must match the holes in your motherboard, no more and no fewer. A standoff under a spot with no hole can short the board.',
            'Fit the I/O shield if your board has a separate one. It is the only part that cannot be added after the board is mounted without unscrewing it again — and the most commonly skipped step in the whole build.',
          ],
        },
      },
      {
        id: 'motherboard',
        minutes: 10,
        title: { pl: 'Montaż płyty głównej', en: 'Mounting the motherboard' },
        body: {
          pl: [
            'Opuść płytę pod lekkim kątem, wsuwając najpierw złącza w osłonę wejść-wyjść, a dopiero potem opuszczając ją płasko na kołki.',
            'Wkręć najpierw środkową śrubę, żeby płyta się nie przesuwała, a potem pozostałe. Dokręcaj do oporu, ale bez siłowania — laminat płyty da się uszkodzić zbyt mocnym dokręceniem.',
            'Podłącz teraz kable panelu przedniego: przycisk zasilania, reset, dioda i złącza USB oraz audio. To najbardziej upierdliwa część montażu, bo styki są małe i słabo opisane. Instrukcja płyty ma dokładny schemat tego bloku pinów.',
          ],
          en: [
            'Lower the board in at a slight angle, sliding the rear connectors into the I/O shield first and only then dropping it flat onto the standoffs.',
            'Fit the centre screw first so the board cannot shift, then the rest. Tighten until they stop, but do not force them — board laminate can be damaged by overtightening.',
            'Connect the front panel cables now: power button, reset, LED, plus the USB and audio headers. This is the fiddliest part of the build, because the pins are small and poorly labelled. The board manual has an exact diagram of that pin block.',
          ],
        },
      },
      {
        id: 'psu',
        minutes: 15,
        title: {
          pl: 'Montaż zasilacza i okablowanie',
          en: 'Installing the power supply and cabling',
        },
        warning: {
          pl: 'Używaj wyłącznie kabli dołączonych do twojego zasilacza. Kable modularne nie są znormalizowane między producentami, a nawet między modelami jednej marki — pomyłka może zniszczyć podzespoły.',
          en: 'Use only the cables that came with your specific power supply. Modular cables are not standardised between manufacturers, or even between models from one brand — mixing them can destroy components.',
        },
        body: {
          pl: [
            'Zasilacz montuj wentylatorem w dół, jeśli obudowa ma pod nim otwór wentylacyjny i filtr. Zasysa wtedy chłodne powietrze spod obudowy zamiast ciepłego z jej wnętrza.',
            'Podłącz trzy główne kable: 24-pinowy do płyty głównej, 8-pinowy EPS do zasilania procesora w górnej części płyty oraz zasilanie karty graficznej. Kabel EPS jest najczęściej pomijany, a bez niego komputer w ogóle nie ruszy.',
            'W przypadku kart z gniazdem 12V-2x6 dociśnij wtyczkę zdecydowanie, aż usłyszysz kliknięcie, i sprawdź, czy złącze jest wsunięte do końca na całej szerokości. Niedociśnięta wtyczka w tym standardzie potrafi się przegrzać.',
          ],
          en: [
            'Mount the PSU fan-down if the case has a vent and filter beneath it. It then draws cool air from under the case rather than warm air from inside it.',
            'Connect the three main cables: the 24-pin to the motherboard, the 8-pin EPS for CPU power at the top of the board, and the graphics card power. The EPS cable is the one most often forgotten, and without it the machine will not start at all.',
            'For cards using the 12V-2x6 connector, push the plug in firmly until it clicks and check that it is fully seated across its whole width. A partially seated plug in this standard can overheat.',
          ],
        },
      },
      {
        id: 'gpu',
        minutes: 10,
        title: { pl: 'Montaż karty graficznej', en: 'Installing the graphics card' },
        body: {
          pl: [
            'Karta idzie do górnego slotu PCIe — tego najbliżej procesora. To jedyny slot podłączony bezpośrednio do procesora pełną liczbą linii.',
            'Wykręć odpowiednią liczbę zaślepek z tyłu obudowy. Współczesne karty zajmują najczęściej trzy sloty, choć fizyczne złącze mają jedno.',
            'Dociśnij kartę, aż zatrzask przy slocie kliknie. Nowoczesne karty są ciężkie — jeśli twoja wyraźnie się ugina, rozważ podpórkę, zwłaszcza gdy komputer bywa przenoszony.',
          ],
          en: [
            'The card goes in the top PCIe slot — the one closest to the CPU. It is the only slot wired directly to the processor with the full number of lanes.',
            'Remove the right number of blanking plates from the back of the case. Modern cards usually occupy three slots even though they have a single physical connector.',
            'Press the card down until the slot latch clicks. Modern cards are heavy — if yours visibly sags, consider a support bracket, particularly if the machine gets moved around.',
          ],
        },
      },
      {
        id: 'final-check',
        minutes: 10,
        title: { pl: 'Kontrola przed pierwszym uruchomieniem', en: 'Checks before first power-on' },
        body: {
          pl: [
            'Zanim zamkniesz obudowę, przejdź listę: kabel 24-pin, kabel EPS procesora, zasilanie karty graficznej, wentylator procesora w gnieździe CPU_FAN, pamięć w slotach 2 i 4, wszystkie zatrzaski zamknięte.',
            'Sprawdź, czy żaden kabel nie leży w płaszczyźnie łopatek wentylatora. To najczęstsza przyczyna głośnego stukania przy pierwszym starcie.',
            'Panele boczne zostaw na razie zdjęte. Jeśli coś wymaga poprawki, będziesz miał do tego dostęp bez ponownego rozkręcania obudowy.',
          ],
          en: [
            'Before closing the case, run the list: 24-pin cable, CPU EPS cable, graphics card power, CPU fan in the CPU_FAN header, memory in slots 2 and 4, every latch closed.',
            'Check that no cable sits in the path of a fan blade. That is the most common cause of a loud ticking noise on first start.',
            'Leave the side panels off for now. If something needs correcting, you will have access without taking the case apart again.',
          ],
        },
      },
    ],
  },
  {
    slug: 'first-boot-and-bios',
    category: 'assembly',
    difficulty: 'beginner',
    updated: '2026-08-01',
    related: ['assembly-step-by-step', 'troubleshooting-no-post'],
    title: {
      pl: 'Pierwsze uruchomienie i ustawienia BIOS',
      en: 'First boot and BIOS setup',
    },
    summary: {
      pl: 'Co zrobić po zamknięciu obudowy: profil pamięci, kolejność bootowania i ustawienia, które naprawdę warto zmienić.',
      en: 'What to do once the case is closed: the memory profile, boot order, and the settings genuinely worth changing.',
    },
    steps: [
      {
        id: 'first-power',
        minutes: 5,
        title: { pl: 'Pierwsze włączenie', en: 'The first power-on' },
        body: {
          pl: [
            'Podłącz monitor do karty graficznej, nie do złącza na płycie głównej. To najczęstszy powód czarnego ekranu przy pierwszym starcie w zestawie z osobną kartą.',
            'Włącz przełącznik z tyłu zasilacza, a potem przycisk zasilania obudowy. Pierwsze uruchomienie trwa dłużej niż kolejne — płyta uczy się konfiguracji pamięci, co przy DDR5 potrafi zająć nawet minutę z ciemnym ekranem.',
            'Jeśli po dwóch minutach nie ma obrazu, wyłącz zasilanie i przejdź do poradnika o braku obrazu przy starcie. Nie zostawiaj komputera w tym stanie na dłużej.',
          ],
          en: [
            'Connect the monitor to the graphics card, not to the motherboard output. That is the single most common cause of a black screen on first boot in a system with a discrete card.',
            'Flip the switch at the back of the PSU, then press the case power button. The first start takes longer than later ones — the board is training the memory configuration, which on DDR5 can take up to a minute with a dark screen.',
            'If there is no picture after two minutes, cut the power and move to the no-display troubleshooting guide. Do not leave the machine sitting in that state.',
          ],
        },
      },
      {
        id: 'memory-profile',
        minutes: 5,
        title: { pl: 'Włączenie profilu pamięci', en: 'Enabling the memory profile' },
        warning: {
          pl: 'Bez włączenia profilu pamięć pracuje z częstotliwością bazową, znacznie niższą niż ta z opakowania. To jedyne ustawienie, które musisz zmienić w każdym nowym zestawie.',
          en: 'Without enabling the profile, memory runs at its base frequency, far below the figure on the box. This is the one setting you must change in every new build.',
        },
        body: {
          pl: [
            'Wejdź do BIOS-u klawiszem Delete lub F2 zaraz po włączeniu komputera. Odszukaj ustawienie o nazwie EXPO (płyty AMD) lub XMP (płyty Intel).',
            'Wybierz profil pierwszy, zapisz i uruchom ponownie. Po restarcie sprawdź w Menedżerze zadań Windows, czy pamięć raportuje deklarowaną częstotliwość.',
            'Jeśli komputer po włączeniu profilu nie startuje, wyczyść ustawienia BIOS-u zworką lub przyciskiem na płycie i spróbuj profilu drugiego, jeśli jest dostępny. Niestabilność przy profilu fabrycznym zdarza się i nie oznacza wadliwej pamięci.',
          ],
          en: [
            'Enter the BIOS with Delete or F2 immediately after powering on. Find the setting called EXPO on AMD boards or XMP on Intel boards.',
            'Select the first profile, save and restart. After the reboot, check in Windows Task Manager that the memory reports its rated frequency.',
            'If the machine will not start with the profile enabled, clear the BIOS with the jumper or button on the board and try the second profile if one is offered. Instability with a rated profile does happen and does not mean the memory is faulty.',
          ],
        },
      },
      {
        id: 'fan-curve',
        minutes: 10,
        title: { pl: 'Krzywa wentylatorów', en: 'The fan curve' },
        body: {
          pl: [
            'Domyślne krzywe są ustawione zachowawczo i zwykle zbyt agresywne — wentylatory przyspieszają przy każdym krótkim skoku temperatury, co słychać jako ciągłe falowanie.',
            'Sensowny punkt wyjścia: cicho do 60 stopni, płynny wzrost między 60 a 80, pełne obroty powyżej 85. Ustaw też opóźnienie reakcji na kilka sekund, żeby chwilowe skoki nie rozkręcały wentylatorów.',
            'Zmiany rób w BIOS-ie, nie w oprogramowaniu systemowym. Ustawienia w BIOS-ie działają od razu po starcie i nie zależą od tego, czy program zdążył się uruchomić.',
          ],
          en: [
            'Default curves are set conservatively and are usually too aggressive — the fans ramp on every brief temperature spike, which you hear as constant surging.',
            'A sensible starting point: quiet up to 60 degrees, a smooth ramp between 60 and 80, full speed above 85. Also set a response delay of a few seconds so short spikes do not spin the fans up.',
            'Make these changes in the BIOS rather than in desktop software. BIOS settings apply from the moment the machine starts and do not depend on an application having loaded.',
          ],
        },
      },
    ],
  },
  {
    slug: 'troubleshooting-no-post',
    category: 'troubleshooting',
    difficulty: 'intermediate',
    updated: '2026-08-01',
    related: ['assembly-step-by-step', 'first-boot-and-bios'],
    title: {
      pl: 'Komputer się nie uruchamia — diagnostyka',
      en: 'The computer will not start — diagnostics',
    },
    summary: {
      pl: 'Uporządkowana lista przyczyn od najczęstszych do najrzadszych. W większości przypadków problem znajduje się w pierwszych trzech punktach.',
      en: 'An ordered list of causes from most to least common. In most cases the problem is in the first three entries.',
    },
    steps: [
      {
        id: 'no-power',
        title: { pl: 'Brak jakiejkolwiek reakcji', en: 'No reaction at all' },
        body: {
          pl: [
            'Sprawdź przełącznik z tyłu zasilacza — to zaskakująco częsta przyczyna i warto wykluczyć ją najpierw.',
            'Sprawdź kabel od przycisku zasilania na bloku pinów panelu przedniego. Wciśnięty na złą parę pinów nie zrobi nic. Żeby wykluczyć sam przycisk, możesz zewrzeć na moment dwa piny PWR_SW śrubokrętem.',
            'Sprawdź, czy podłączony jest 8-pinowy kabel EPS przy procesorze. Bez niego wiele płyt nie daje żadnej reakcji, łącznie z brakiem diod.',
          ],
          en: [
            'Check the switch on the back of the PSU — a surprisingly common cause, and worth ruling out first.',
            'Check the power button cable on the front panel pin block. On the wrong pair of pins it does nothing. To rule out the button itself, briefly bridge the two PWR_SW pins with a screwdriver.',
            'Check that the 8-pin EPS cable near the CPU is connected. Without it many boards give no reaction at all, including no LEDs.',
          ],
        },
      },
      {
        id: 'fans-no-display',
        title: {
          pl: 'Wentylatory kręcą się, brak obrazu',
          en: 'Fans spin but there is no display',
        },
        body: {
          pl: [
            'Najpierw sprawdź, czy monitor jest podłączony do karty graficznej, a nie do płyty głównej. To przyczyna w większości zgłoszeń tego objawu.',
            'Wyjmij pamięć i włóż ponownie, mocno, aż zatrzaski klikną. Następnie spróbuj uruchomić komputer z jednym modułem w slocie drugim od procesora. Źle osadzona pamięć to druga najczęstsza przyczyna.',
            'Sprawdź diody diagnostyczne na płycie głównej. Większość współczesnych płyt ma cztery diody opisane CPU, DRAM, VGA i BOOT — świecąca wskazuje etap, na którym start się zatrzymał, co oszczędza sporo zgadywania.',
          ],
          en: [
            'First check the monitor is connected to the graphics card and not the motherboard. That accounts for most reports of this symptom.',
            'Remove the memory and refit it firmly until the clips click. Then try starting with a single module in the second slot from the CPU. Badly seated memory is the second most common cause.',
            'Check the diagnostic LEDs on the motherboard. Most modern boards have four, marked CPU, DRAM, VGA and BOOT — the lit one shows where startup stopped, which saves a lot of guessing.',
          ],
        },
      },
      {
        id: 'boot-loop',
        title: {
          pl: 'Komputer startuje i gaśnie w pętli',
          en: 'The machine starts and shuts off in a loop',
        },
        body: {
          pl: [
            'Krótka pętla, po dwie do trzech sekund, zwykle oznacza problem z pamięcią lub jej profilem. Wyczyść ustawienia BIOS-u i uruchom bez włączonego EXPO lub XMP.',
            'Jeśli pętla pojawia się dopiero pod obciążeniem, podejrzewaj zasilacz o zbyt małej mocy albo źle dociśnięty kabel zasilania karty graficznej.',
            'Sprawdź też, czy chłodzenie procesora jest dociśnięte równomiernie. Blok przechylony na jedną stronę powoduje natychmiastowe przegrzanie i wyłączenie zabezpieczające.',
          ],
          en: [
            'A short loop, two to three seconds at a time, usually points at the memory or its profile. Clear the BIOS and start with EXPO or XMP disabled.',
            'If the loop only appears under load, suspect an underpowered PSU or a poorly seated graphics card power cable.',
            'Also check that the CPU cooler is evenly tightened. A block tilted to one side causes immediate overheating and a protective shutdown.',
          ],
        },
      },
    ],
  },
  {
    slug: 'cable-management',
    category: 'assembly',
    difficulty: 'beginner',
    updated: '2026-08-01',
    related: ['assembly-step-by-step'],
    title: {
      pl: 'Prowadzenie kabli',
      en: 'Cable management',
    },
    summary: {
      pl: 'Nie chodzi wyłącznie o wygląd. Uporządkowane kable poprawiają przepływ powietrza i znacznie ułatwiają każdą późniejszą zmianę w zestawie.',
      en: 'This is not only about looks. Tidy cables improve airflow and make every later change to the build far easier.',
    },
    steps: [
      {
        id: 'plan',
        title: { pl: 'Zaplanuj trasy przed podłączeniem', en: 'Plan the routes before connecting' },
        body: {
          pl: [
            'Przełóż kabel na tył obudowy zanim wepniesz go do gniazda. Odwrotna kolejność kończy się zwykle wypinaniem wszystkiego i zaczynaniem od nowa.',
            'Wykorzystaj otwory z gumowymi przelotkami — są rozmieszczone dokładnie tam, gdzie znajdują się gniazda na płycie głównej.',
            'Za tacą płyty głównej jest zwykle 20 do 30 milimetrów miejsca. To wystarczy na wszystkie kable, ale tylko wtedy, gdy nie krzyżują się w jednym punkcie.',
          ],
          en: [
            'Route a cable behind the tray before plugging it in. Doing it the other way round usually ends with unplugging everything and starting again.',
            'Use the grommeted pass-throughs — they are positioned exactly where the motherboard connectors are.',
            'There is usually 20 to 30 millimetres of space behind the motherboard tray. That is enough for every cable, but only if they do not all cross at one point.',
          ],
        },
      },
      {
        id: 'airflow',
        title: { pl: 'Kable a przepływ powietrza', en: 'Cables and airflow' },
        body: {
          pl: [
            'Kabel przeciągnięty w poprzek wlotu wentylatora ogranicza przepływ i generuje szum. Największe znaczenie ma przestrzeń przed wentylatorami przednimi i pod kartą graficzną.',
            'Opaski zaciskowe dokręcaj tylko na tyle, by kable trzymały się razem. Zbyt mocno dociśnięty pęk utrudnia późniejsze zmiany, a przy cienkich kablach panelu przedniego może uszkodzić izolację.',
            'Nadmiar kabli zwijaj w luźne pętle o średnicy co najmniej pięciu centymetrów. Ciasne zwoje kabli zasilających to niepotrzebne obciążenie dla izolacji.',
          ],
          en: [
            'A cable pulled across a fan intake restricts flow and generates noise. The space in front of the front fans and under the graphics card matters most.',
            'Tighten cable ties only enough to hold the bundle together. An overtightened bundle makes later changes awkward, and on thin front-panel cables it can damage the insulation.',
            'Coil excess cable into loose loops at least five centimetres across. Tight coils in power cables put needless stress on the insulation.',
          ],
        },
      },
    ],
  },
  {
    slug: 'choosing-cooling',
    category: 'cooling',
    difficulty: 'beginner',
    updated: '2026-08-01',
    related: ['assembly-step-by-step', 'thermal-paste'],
    title: {
      pl: 'Jak wybrać chłodzenie procesora',
      en: 'How to choose a CPU cooler',
    },
    summary: {
      pl: 'Powietrze czy woda — decyzja jest prostsza, niż sugerują dyskusje w internecie. Liczy się pobór mocy procesora i wymiary obudowy.',
      en: 'Air or liquid — the decision is simpler than online debate suggests. What matters is CPU power draw and case dimensions.',
    },
    steps: [
      {
        id: 'power-first',
        title: { pl: 'Zacznij od poboru mocy procesora', en: 'Start with the CPU power draw' },
        body: {
          pl: [
            'Sprawdź wartość TDP lub maksymalnego poboru mocy swojego procesora i dodaj do niej około 15 procent zapasu. Chłodzenie pracujące stale na granicy swoich możliwości to chłodzenie głośne.',
            'Do około 150 W wystarczy dobra pojedyncza wieża. Między 150 a 250 W sensowna jest podwójna wieża lub chłodnica 240 mm. Powyżej 250 W warto rozważyć chłodnicę 360 mm.',
            'Ten jeden parametr rozstrzyga większość przypadków. Reszta to już kwestia wymiarów i preferencji.',
          ],
          en: [
            'Look up the TDP or peak power figure for your CPU and add roughly 15 per cent of headroom. A cooler permanently running at its limit is a loud cooler.',
            'Up to about 150 W, a good single tower is enough. Between 150 and 250 W, a dual tower or a 240 mm radiator makes sense. Above 250 W, a 360 mm radiator is worth considering.',
            'That single figure settles most cases. The rest comes down to dimensions and preference.',
          ],
        },
      },
      {
        id: 'measure',
        title: { pl: 'Zmierz, zanim kupisz', en: 'Measure before you buy' },
        warning: {
          pl: 'Maksymalna wysokość chłodzenia jest podana w specyfikacji każdej obudowy. Sprawdzenie tej jednej liczby oszczędza najczęstszego zwrotu w całym składaniu komputera.',
          en: 'Maximum cooler height is listed in every case specification. Checking that one number avoids the most common return in the whole hobby.',
        },
        body: {
          pl: [
            'Przy chłodzeniu powietrznym sprawdź dwie wartości: maksymalną wysokość chłodzenia w obudowie i wysokość radiatorów pamięci. Podwójne wieże często zachodzą nad pierwszy slot pamięci.',
            'Przy chłodzeniu wodnym sprawdź, gdzie obudowa przewiduje montaż chłodnicy i jakiego rozmiaru. Deklaracja „obsługuje 360 mm” bywa prawdziwa tylko dla jednej pozycji montażowej.',
            'Uwzględnij też grubość chłodnicy razem z wentylatorami — zwykle 52 do 60 mm. W wąskich obudowach chłodnica potrafi kolidować z pamięcią lub sekcją zasilania płyty.',
          ],
          en: [
            'For air cooling, check two numbers: the maximum cooler height the case allows and the height of your memory heat spreaders. Dual towers often overhang the first memory slot.',
            'For liquid cooling, check where the case supports a radiator and at what size. A claim of "supports 360 mm" is sometimes true for one mounting position only.',
            'Account for radiator thickness including fans — usually 52 to 60 mm. In narrow cases a radiator can foul the memory or the board power section.',
          ],
        },
      },
    ],
  },
  {
    slug: 'thermal-paste',
    category: 'cooling',
    difficulty: 'beginner',
    updated: '2026-08-01',
    related: ['choosing-cooling', 'assembly-step-by-step'],
    title: {
      pl: 'Pasta termoprzewodząca — ile i jak',
      en: 'Thermal paste — how much and how',
    },
    summary: {
      pl: 'Temat obrosły mitami. W praktyce metoda nakładania ma znaczenie marginalne, a ilość — umiarkowane.',
      en: 'A topic surrounded by myths. In practice the application method matters marginally, and the quantity moderately.',
    },
    steps: [
      {
        id: 'how-much',
        title: { pl: 'Ile pasty', en: 'How much paste' },
        body: {
          pl: [
            'Kropla wielkości ziarna grochu na środku pokrywy procesora. Przy dużych procesorach z pokrywą prostokątną, jak Threadripper, nakłada się cienką warstwę na całą powierzchnię.',
            'Testy niezależnych recenzentów wielokrotnie pokazały, że różnice między metodami nakładania — kropka, krzyż, pięć punktów, rozsmarowanie — mieszczą się w granicach jednego do dwóch stopni. To mniej niż różnica między dwoma egzemplarzami tego samego chłodzenia.',
            'Za mało pasty szkodzi wyraźnie bardziej niż za dużo. Nadmiar zostanie wyciśnięty na boki, natomiast niedobór zostawia obszary bez kontaktu termicznego.',
          ],
          en: [
            'A pea-sized dot in the centre of the CPU lid. On large CPUs with a rectangular lid, such as Threadripper, spread a thin layer across the whole surface instead.',
            'Independent testing has repeatedly shown that the differences between application methods — dot, cross, five dots, spreading — fall within one to two degrees. That is less than the variation between two samples of the same cooler.',
            'Too little paste is markedly worse than too much. Excess is squeezed out at the edges, whereas a shortfall leaves areas with no thermal contact at all.',
          ],
        },
      },
      {
        id: 'when-to-replace',
        title: { pl: 'Kiedy wymieniać', en: 'When to replace it' },
        body: {
          pl: [
            'Pasta nie wymaga wymiany według harmonogramu. Wymieniaj ją, gdy zdejmujesz chłodzenie, albo gdy temperatury rosną bez innej przyczyny.',
            'Zdjęcie i ponowne założenie chłodzenia zawsze wymaga nowej pasty. Raz ściśnięta warstwa nie odtworzy równomiernego kontaktu.',
            'Do czyszczenia użyj alkoholu izopropylowego i niestrzępiącej się ściereczki. Nie używaj papierowych ręczników — zostawiają włókna na powierzchni styku.',
          ],
          en: [
            'Paste does not need replacing on a schedule. Replace it when you remove the cooler, or when temperatures rise with no other explanation.',
            'Removing and refitting a cooler always requires fresh paste. Once a layer has been compressed it will not re-form even contact.',
            'Clean with isopropyl alcohol and a lint-free cloth. Avoid paper towels — they leave fibres on the contact surface.',
          ],
        },
      },
    ],
  },
  {
    slug: 'choosing-psu',
    category: 'basics',
    difficulty: 'beginner',
    updated: '2026-08-01',
    related: ['assembly-step-by-step'],
    title: {
      pl: 'Dobór zasilacza',
      en: 'Choosing a power supply',
    },
    summary: {
      pl: 'Jedyny podzespół, którego awaria może pociągnąć za sobą resztę zestawu. Tu oszczędzanie jest najmniej opłacalne.',
      en: 'The one component whose failure can take the rest of the system with it. This is the worst place to economise.',
    },
    steps: [
      {
        id: 'wattage',
        title: { pl: 'Ile watów', en: 'How many watts' },
        body: {
          pl: [
            'Zsumuj pobór mocy procesora i karty graficznej, a następnie dodaj około 150 W na resztę podzespołów. Do tej sumy dołóż jeszcze 30 procent zapasu.',
            'Zapas nie służy zasilaniu — służy sprawności i chwilowym skokom poboru. Zasilacz pracuje najefektywniej przy obciążeniu około połowy swojej mocy, a współczesne karty graficzne generują krótkie skoki znacznie przekraczające ich wartość nominalną.',
            'W praktyce: zestaw ze średnią kartą to 650 do 750 W, zestaw z mocną kartą to 850 do 1000 W.',
          ],
          en: [
            'Add the CPU and graphics card power figures together, then add roughly 150 W for everything else. Add a further 30 per cent of headroom on top of that total.',
            'The headroom is not there to supply power — it is there for efficiency and transient spikes. A PSU is most efficient at around half its rated load, and modern graphics cards produce brief spikes well above their nominal figure.',
            'In practice: a build with a mid-range card wants 650 to 750 W, and one with a high-end card wants 850 to 1000 W.',
          ],
        },
      },
      {
        id: 'quality',
        title: { pl: 'Na co jeszcze patrzeć', en: 'What else to look at' },
        warning: {
          pl: 'Certyfikat 80 Plus mówi o sprawności, nie o jakości ani bezpieczeństwie. Zasilacz bez rozpoznawalnej marki potrafi mieć certyfikat i mimo to być złym wyborem.',
          en: 'An 80 Plus badge describes efficiency, not quality or safety. An unbranded unit can carry the badge and still be a bad choice.',
        },
        body: {
          pl: [
            'Kieruj się okresem gwarancji. Producenci dają 10 lat gwarancji tylko na konstrukcje, którym ufają — to sygnał wiarygodniejszy niż sam certyfikat sprawności.',
            'Modularne kable są wygodne, ale nie wpływają na jakość zasilania. To udogodnienie montażowe, za które warto dopłacić tylko przy ciasnej obudowie.',
            'Jeśli twoja karta ma złącze 12V-2x6, wybierz zasilacz zgodny z ATX 3.1. Standard ten uwzględnia skoki poboru współczesnych kart, dzięki czemu zabezpieczenia nie wyłączają komputera bez powodu.',
          ],
          en: [
            'Use the warranty period as a guide. Manufacturers offer ten-year warranties only on designs they trust — a more reliable signal than the efficiency badge alone.',
            'Modular cables are convenient but do not affect power quality. They are an assembly convenience, worth paying for mainly in a cramped case.',
            'If your card uses a 12V-2x6 connector, choose a supply that meets ATX 3.1. That standard accounts for the transient spikes modern cards produce, so the protection circuits do not shut the machine down without cause.',
          ],
        },
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getGuidesByCategory(category: GuideCategory): Guide[] {
  return guides.filter((guide) => guide.category === category);
}

/**
 * Estimated reading time in minutes.
 *
 * Based on 200 words per minute, which is a common figure for technical prose.
 * Rounded up, and never below one minute, so a short guide does not claim to
 * take zero time to read.
 */
export function readingTime(guide: Guide, locale: 'pl' | 'en'): number {
  const words = guide.steps.reduce((total, step) => {
    const stepWords = step.body[locale].join(' ').split(/\s+/).length;
    return total + stepWords;
  }, 0);
  return Math.max(1, Math.ceil(words / 200));
}
