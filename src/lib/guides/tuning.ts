import type { Guide } from '../types';

/**
 * BIOS, tuning and maintenance guides.
 *
 * Separate from the assembly guides because these are things you do to a
 * machine that already works, and a reader arrives at them with a different
 * question: not "how do I put this together" but "how do I make it better".
 */
export const tuningGuides: Guide[] = [
  {
    slug: 'ustawienia-bios',
    category: 'optimisation',
    difficulty: 'intermediate',
    updated: '2026-08-01',
    related: ['first-boot-and-bios', 'podkrecanie-pamieci', 'cichy-komputer'],
    title: {
      pl: 'Ustawienia BIOS, które faktycznie warto zmienić',
      en: 'The BIOS settings actually worth changing',
    },
    summary: {
      pl: 'W BIOS-ie jest kilkaset opcji, a znaczenie ma kilkanaście. Ten poradnik przechodzi przez te, które robią różnicę, i mówi wprost, których nie ruszać.',
      en: 'A BIOS has several hundred options and around a dozen that matter. This walks through the ones that make a difference, and says plainly which to leave alone.',
    },
    steps: [
      {
        id: 'orientacja',
        minutes: 5,
        title: { pl: 'Orientacja w BIOS-ie', en: 'Finding your way around' },
        body: {
          pl: [
            'Każdy producent nazywa sekcje inaczej, ale układ jest podobny. Tryb Easy albo Simple pokazuje podstawy: temperaturę, kolejność bootowania i profil pamięci. Tryb Advanced, zwykle pod klawiszem F7, otwiera resztę.',
            'Zanim cokolwiek zmienisz, zapisz aktualne ustawienia jako profil. Większość płyt ma sekcję Profile albo Overclocking Profile z kilkoma slotami. To trzydzieści sekund pracy, które oszczędza godziny, gdy po zmianie komputer przestanie startować.',
            'Zapamiętaj też, gdzie jest opcja Load Optimized Defaults. Przywraca ustawienia fabryczne i jest najszybszą drogą wyjścia z sytuacji, w której zmieniłeś za dużo naraz i nie wiesz, co zawiodło.',
            'Jeśli komputer w ogóle nie startuje po zmianie, BIOS-u nie da się już otworzyć. Wtedy zostaje wyczyszczenie ustawień: zworka Clear CMOS na płycie, przycisk na panelu tylnym w droższych modelach, albo wyjęcie baterii CR2032 na kilka minut przy odłączonym zasilaniu.',
          ],
          en: [
            'Every manufacturer names things differently, but the layout is similar. Easy or Simple mode shows the basics: temperature, boot order and the memory profile. Advanced mode, usually behind F7, opens everything else.',
            'Before changing anything, save the current settings as a profile. Most boards have a Profile or Overclocking Profile section with several slots. It is thirty seconds of work that saves hours when a change stops the machine booting.',
            'Note where Load Optimized Defaults lives, too. It restores the factory configuration and is the fastest way out of having changed too much at once without knowing which change broke it.',
            'If the machine will not start at all after a change, the BIOS cannot be opened any more. The remaining route is clearing the settings: the Clear CMOS jumper on the board, a button on the rear panel of pricier models, or removing the CR2032 battery for a few minutes with the power disconnected.',
          ],
        },
      },
      {
        id: 'warte-zmiany',
        minutes: 15,
        title: { pl: 'Ustawienia warte zmiany', en: 'Settings worth changing' },
        warning: {
          pl: 'Zmieniaj po jednej rzeczy naraz i uruchamiaj komputer po każdej zmianie. Pięć zmian naraz i komputer, który nie startuje, to pięć podejrzanych zamiast jednego.',
          en: 'Change one thing at a time and boot between changes. Five changes at once and a machine that will not start leaves you with five suspects instead of one.',
        },
        body: {
          pl: [
            'Profil pamięci EXPO lub XMP to jedyna zmiana obowiązkowa w każdym nowym zestawie. Bez niej pamięć pracuje z częstotliwością bazową — DDR5-4800 zamiast deklarowanych 6000, czyli około 20 procent przepustowości wyrzucone.',
            'Resizable BAR, na płytach AMD nazywany Smart Access Memory, pozwala procesorowi adresować całą pamięć karty graficznej naraz zamiast okienkami po 256 MB. W części gier daje kilka procent klatek za darmo. Włącz, chyba że masz kartę starszą niż PCIe 4.0.',
            'Krzywe wentylatorów: domyślne są ustawione zachowawczo i reagują na każdy chwilowy skok temperatury, co słychać jako ciągłe falowanie obrotów. Ustaw cicho do 60 stopni, płynny wzrost do 80 i pełne obroty powyżej 85, a do tego opóźnienie reakcji na kilka sekund.',
            'Wake on LAN, Bluetooth i kontrolery, z których nie korzystasz, warto wyłączyć — nie z powodu wydajności, tylko poboru mocy w spoczynku i o kilka sekund krótszego startu.',
            'Secure Boot i TPM zostaw włączone. Windows 11 ich wymaga, a wyłączenie niczego nie przyspiesza.',
          ],
          en: [
            'The EXPO or XMP memory profile is the one mandatory change in every new build. Without it the memory runs at its base frequency — DDR5-4800 instead of the rated 6000, which is roughly 20 per cent of bandwidth thrown away.',
            'Resizable BAR, called Smart Access Memory on AMD boards, lets the CPU address the whole graphics card memory at once rather than through 256 MB windows. In some games it is worth a few per cent of frame rate for free. Enable it unless your card predates PCIe 4.0.',
            'Fan curves: the defaults are conservative and react to every momentary temperature spike, which you hear as constantly surging fans. Set quiet up to 60 degrees, a smooth ramp to 80 and full speed above 85, with a response delay of a few seconds.',
            'Wake on LAN, Bluetooth and controllers you do not use are worth disabling — not for performance, but for idle power draw and a few seconds off the boot time.',
            'Leave Secure Boot and TPM enabled. Windows 11 requires them, and disabling them speeds up nothing.',
          ],
        },
      },
      {
        id: 'nie-ruszac',
        title: { pl: 'Czego nie ruszać', en: 'What to leave alone' },
        body: {
          pl: [
            'Napięć procesora nie podnoś, dopóki nie wiesz dokładnie, co robisz i po co. Podniesione napięcie to wyższa temperatura i przyspieszona degradacja krzemu, a zysk przy domyślnych ustawieniach jest zwykle zerowy — współczesne procesory same podbijają taktowanie tak wysoko, jak pozwala im chłodzenie.',
            'Ustawień SATA i NVMe nie zmieniaj po instalacji systemu. Przełączenie trybu z AHCI na RAID w działającym Windows kończy się niebieskim ekranem przy starcie.',
            'Aktualizacja BIOS-u ma sens przy konkretnej potrzebie: nowszy procesor, poprawka błędu, który cię dotyczy, albo łatka bezpieczeństwa. Aktualizowanie „bo wyszła nowa wersja” to niepotrzebne ryzyko — przerwana aktualizacja potrafi zablokować płytę, a część płyt nie ma zabezpieczenia w postaci drugiej kości BIOS.',
            'Opcji, których nazwy nie rozumiesz, po prostu nie zmieniaj. To brzmi banalnie, ale większość zgłoszeń „zepsułem coś w BIOS-ie” zaczyna się od włączenia opcji, która wyglądała obiecująco.',
          ],
          en: [
            'Do not raise CPU voltages until you know exactly what you are doing and why. Higher voltage means higher temperature and accelerated silicon degradation, and the gain at stock settings is usually zero — modern processors already boost as high as their cooling allows.',
            'Do not change SATA or NVMe mode after installing the operating system. Switching from AHCI to RAID on a working Windows install ends in a blue screen at startup.',
            'Updating the BIOS makes sense for a specific need: a newer CPU, a fix for a bug that affects you, or a security patch. Updating "because there is a new version" is needless risk — an interrupted update can brick a board, and not every board has a second BIOS chip as a safety net.',
            'Options whose names you do not recognise are best left alone. That sounds obvious, but most "I broke something in the BIOS" reports start with enabling something that looked promising.',
          ],
        },
      },
    ],
  },
  {
    slug: 'podkrecanie-pamieci',
    category: 'optimisation',
    difficulty: 'advanced',
    updated: '2026-08-01',
    related: ['ustawienia-bios', 'diagnostyka-brak-obrazu'],
    title: {
      pl: 'Podkręcanie pamięci — co daje i jak zacząć',
      en: 'Memory overclocking — what it gains and how to start',
    },
    summary: {
      pl: 'Pamięć to jedyny podzespół, w którym podkręcanie wciąż daje wymierny zysk w grach. Ten poradnik pokazuje, gdzie jest granica sensu.',
      en: 'Memory is the one component where overclocking still gives a measurable gain in games. This shows where the point of diminishing returns sits.',
    },
    steps: [
      {
        id: 'czy-warto',
        title: { pl: 'Ile realnie można zyskać', en: 'What there is to gain' },
        body: {
          pl: [
            'Zacznij od włączenia profilu EXPO lub XMP. To pokrywa około 90 procent zysku, jaki pamięć ma do zaoferowania, i zajmuje jedno kliknięcie. Wszystko poniżej to walka o resztę.',
            'Ręczne strojenie ponad profil daje zwykle od 2 do 5 procent klatek — czasem więcej w grach ograniczonych procesorem, prawie nic w rozdzielczości 4K, gdzie wąskim gardłem jest karta graficzna.',
            'Realny koszt to czas: kilka godzin testów stabilności na każdą zmianę. Jeśli nie sprawia ci to przyjemności samo w sobie, profil fabryczny jest właściwym miejscem, żeby przestać.',
            'Na Ryzenach warto znać jedną rzecz: powyżej pewnej częstotliwości kontroler pamięci przechodzi w tryb dzielony i wydajność spada mimo wyższych liczb. Dla Ryzen 7000 i 9000 granica to zwykle DDR5-6000 do 6400 — dlatego właśnie 6000 CL30 jest tak często polecane.',
          ],
          en: [
            'Start by enabling the EXPO or XMP profile. That captures roughly 90 per cent of what memory has to offer and takes one click. Everything below is fighting for the remainder.',
            'Manual tuning beyond the profile is typically worth 2 to 5 per cent of frame rate — sometimes more in CPU-limited games, close to nothing at 4K where the graphics card is the bottleneck.',
            'The real cost is time: several hours of stability testing per change. If the process is not enjoyable in itself, the rated profile is the right place to stop.',
            'One thing worth knowing on Ryzen: above a certain frequency the memory controller drops into a divided mode and performance falls despite the higher numbers. For Ryzen 7000 and 9000 that boundary is usually DDR5-6000 to 6400 — which is exactly why 6000 CL30 is so often recommended.',
          ],
        },
      },
      {
        id: 'testowanie',
        minutes: 240,
        title: { pl: 'Testowanie stabilności', en: 'Testing stability' },
        warning: {
          pl: 'Niestabilna pamięć nie zawsze powoduje niebieski ekran. Częściej objawia się cichym uszkodzeniem danych — pliki zapisane w tle okazują się uszkodzone tygodnie później. Dlatego testuj długo, zanim uznasz ustawienia za gotowe.',
          en: 'Unstable memory does not always crash. More often it corrupts data quietly — files written in the background turn out damaged weeks later. That is why you test for a long time before calling a setting done.',
        },
        body: {
          pl: [
            'Minimum to godzina w TestMem5 z profilem anta777, albo pełny przebieg MemTest86 z pendrive. Krótszy test przepuszcza błędy, które ujawnią się dopiero w codziennym użyciu.',
            'Do pełnej pewności: cztery godziny bez błędu. To brzmi przesadnie, ale pamięć jest jedynym podzespołem, którego cicha awaria psuje dane zamiast po prostu zatrzymywać komputer.',
            'Testuj też w temperaturze roboczej, nie zaraz po włączeniu. Moduły rozgrzewają się pod obciążeniem i ustawienia stabilne na zimno potrafią sypać się po dwudziestu minutach.',
            'Gdy pojawi się błąd, cofnij ostatnią zmianę i przetestuj ponownie. Kuszące jest cofnięcie kilku naraz, ale wtedy nie dowiesz się, która była winna.',
          ],
          en: [
            'The minimum is an hour of TestMem5 with the anta777 profile, or a full MemTest86 pass from a USB stick. A shorter test lets through errors that will surface in everyday use instead.',
            'For real confidence: four hours without an error. That sounds excessive, but memory is the one component whose quiet failure corrupts data rather than simply stopping the machine.',
            'Test at operating temperature too, not straight from a cold start. Modules heat up under load, and settings that are stable cold can fall apart after twenty minutes.',
            'When an error appears, undo the last change and test again. It is tempting to undo several at once, but then you never learn which one was at fault.',
          ],
        },
      },
    ],
  },
  {
    slug: 'cichy-komputer',
    category: 'optimisation',
    difficulty: 'beginner',
    updated: '2026-08-01',
    related: ['choosing-cooling', 'ustawienia-bios', 'konserwacja'],
    title: {
      pl: 'Jak zbudować cichy komputer',
      en: 'How to build a quiet computer',
    },
    summary: {
      pl: 'Hałas bierze się z kilku konkretnych źródeł i każde da się ograniczyć. Kolejność działań ma znaczenie, bo najtańsze poprawki dają najwięcej.',
      en: 'Noise comes from a handful of specific sources and each can be reduced. The order matters, because the cheapest fixes give the most back.',
    },
    steps: [
      {
        id: 'skad-halas',
        title: { pl: 'Skąd bierze się hałas', en: 'Where the noise comes from' },
        body: {
          pl: [
            'Trzy źródła, w kolejności od najgłośniejszego: wentylatory kręcące się zbyt szybko, turbulencje powietrza przechodzącego przez przeszkody, i drgania przenoszone przez obudowę.',
            'Kluczowa zależność: hałas rośnie z obrotami znacznie szybciej niż liniowo. Wentylator 140 mm przy 800 obrotach przetłacza tyle samo powietrza co 120 mm przy 1200, ale jest wyraźnie cichszy. Dlatego większe wentylatory kręcące się wolniej są niemal zawsze lepszym rozwiązaniem niż małe kręcące się szybko.',
            'Drugi wniosek: nadmiar mocy chłodzenia kupuje ciszę. Chłodzenie odprowadzające 250 W przy procesorze 120 W nigdy nie musi się rozkręcić. To ten sam powód, dla którego warto wybierać chłodzenie z zapasem.',
          ],
          en: [
            'Three sources, loudest first: fans spinning faster than they need to, turbulence from air passing obstructions, and vibration carried through the case.',
            'The key relationship: noise rises with fan speed far faster than linearly. A 140 mm fan at 800 rpm moves as much air as a 120 mm at 1200 rpm but is noticeably quieter. Larger fans turning slowly are therefore almost always better than small fans turning fast.',
            'The second consequence: surplus cooling capacity buys silence. A cooler rated for 250 W paired with a 120 W processor never has to spin up. It is the same reason choosing cooling with headroom is worth it.',
          ],
        },
      },
      {
        id: 'co-zrobic',
        minutes: 30,
        title: { pl: 'Co zrobić, po kolei', en: 'What to do, in order' },
        body: {
          pl: [
            'Najpierw krzywe wentylatorów w BIOS-ie — to nic nie kosztuje i daje najwięcej. Większość zestawów jest głośna wyłącznie dlatego, że wentylatory reagują na każdy chwilowy skok temperatury. Dodaj opóźnienie reakcji i spłaszcz krzywą poniżej 60 stopni.',
            'Potem sprawdź, czy któryś kabel nie ociera o łopatki i czy wentylatory nie są przykręcone zbyt mocno. Śruba dokręcona na siłę przenosi drgania wprost na obudowę; podkładki gumowe albo lekkie poluzowanie usuwają buczenie.',
            'Trzeci krok to wymiana chłodzenia procesora na większe, jeśli obecne kręci się szybko przy zwykłym użyciu. Duża wieża przy 700 obrotach jest praktycznie niesłyszalna.',
            'Dysk talerzowy, jeśli jeszcze go masz, jest często najgłośniejszym elementem w spoczynku. Przeniesienie systemu na NVMe usuwa i hałas, i wibracje.',
            'Wyciszające maty w obudowie zostaw na koniec. Tłumią wysokie tony, ale pogarszają przepływ powietrza, przez co wentylatory muszą kręcić się szybciej — nierzadko efekt netto jest zerowy.',
          ],
          en: [
            'Start with fan curves in the BIOS — it costs nothing and gives the most back. Most builds are loud purely because the fans react to every momentary temperature spike. Add a response delay and flatten the curve below 60 degrees.',
            'Next check that no cable is catching a fan blade and that the fans are not screwed down too tightly. An overtightened screw transmits vibration straight into the case; rubber washers or slightly backing the screws off removes the hum.',
            'Third, replace the CPU cooler with a larger one if the current one spins fast during ordinary use. A big tower at 700 rpm is essentially inaudible.',
            'A spinning hard drive, if you still have one, is often the loudest thing at idle. Moving the system to NVMe removes both the noise and the vibration.',
            'Leave sound-dampening mats until last. They absorb high frequencies but restrict airflow, so the fans have to spin faster — the net effect is frequently nothing.',
          ],
        },
      },
    ],
  },
  {
    slug: 'konserwacja',
    category: 'optimisation',
    difficulty: 'beginner',
    updated: '2026-08-01',
    related: ['cichy-komputer', 'thermal-paste'],
    title: {
      pl: 'Czyszczenie i konserwacja',
      en: 'Cleaning and maintenance',
    },
    summary: {
      pl: 'Kurz to najczęstsza przyczyna rosnących temperatur i głośniejszej pracy po roku użytkowania. Czyszczenie zajmuje pół godziny raz na kilka miesięcy.',
      en: 'Dust is the most common reason temperatures climb and a machine gets louder after a year. Cleaning takes half an hour every few months.',
    },
    steps: [
      {
        id: 'jak-czyscic',
        minutes: 30,
        title: { pl: 'Jak czyścić', en: 'How to clean' },
        warning: {
          pl: 'Przy przedmuchiwaniu zablokuj wentylatory palcem albo patyczkiem. Rozpędzony sprężonym powietrzem wentylator pracuje jak prądnica i potrafi uszkodzić elektronikę, do której jest podłączony.',
          en: 'Hold the fans still with a finger or a cotton bud while blowing them out. A fan spun up by compressed air acts as a generator and can damage the electronics it is connected to.',
        },
        body: {
          pl: [
            'Odłącz zasilanie i przenieś komputer na zewnątrz albo do pomieszczenia, którego nie szkoda. Kurz wydmuchany w salonie osiądzie w salonie.',
            'Sprężone powietrze w puszce albo pompka ręczna. Odkurzacza nie używaj — generuje ładunki elektrostatyczne, a jego siła ssąca potrafi urwać drobne elementy.',
            'Kolejność: filtry przeciwkurzowe, wentylatory obudowy, lamele chłodzenia procesora, na końcu karta graficzna. Filtry najlepiej umyć wodą i wysuszyć całkowicie przed założeniem.',
            'Zwróć szczególną uwagę na lamele chłodzenia i chłodnicy. Warstwa kurzu grubości milimetra potrafi podnieść temperaturę o kilkanaście stopni, bo skutecznie izoluje powierzchnię, która ma oddawać ciepło.',
            'Częstotliwość zależy od otoczenia: co trzy miesiące w mieszkaniu ze zwierzętami, co pół roku w typowym, raz do roku w bardzo czystym. Jeśli temperatury rosną albo wentylatory kręcą się częściej niż kiedyś, to sygnał, że pora.',
          ],
          en: [
            'Disconnect the power and take the machine outside, or into a room you do not mind. Dust blown out in the living room settles in the living room.',
            'Use canned air or a hand pump. Not a vacuum cleaner — it generates static, and its suction can pull small components off.',
            'Order: dust filters, case fans, CPU cooler fins, then the graphics card last. Filters are best washed in water and dried completely before refitting.',
            'Pay particular attention to cooler and radiator fins. A millimetre of dust can raise temperatures by ten degrees or more, because it insulates precisely the surface meant to shed heat.',
            'Frequency depends on the environment: every three months in a home with pets, every six in a typical one, once a year in a very clean one. Rising temperatures or fans running more than they used to is the signal that it is time.',
          ],
        },
      },
    ],
  },
];
