import type { Guide } from '../types';

/**
 * Operating system guides.
 *
 * Kept in their own module because the assembly guides and the software guides
 * are maintained on different rhythms: hardware advice ages over years, while
 * an installer flow can change with a single Windows feature update.
 */
export const osGuides: Guide[] = [
  {
    slug: 'instalacja-windows',
    category: 'software',
    difficulty: 'beginner',
    updated: '2026-08-01',
    related: ['sterowniki-po-instalacji', 'pierwsze-uruchomienie-bios', 'instalacja-linux'],
    title: {
      pl: 'Instalacja Windows 11 krok po kroku',
      en: 'Installing Windows 11 step by step',
    },
    summary: {
      pl: 'Od pustego pendrive do działającego systemu: przygotowanie nośnika, ustawienia BIOS, partycjonowanie, obejście konta Microsoft i pierwsze porządki po instalacji.',
      en: 'From an empty USB stick to a working system: preparing the media, BIOS settings, partitioning, working around the Microsoft account, and the first tidy-up afterwards.',
    },
    steps: [
      {
        id: 'nosnik',
        minutes: 20,
        title: { pl: 'Przygotowanie nośnika USB', en: 'Preparing the USB installer' },
        tools: {
          pl: ['Pendrive minimum 8 GB', 'Drugi komputer z dostępem do internetu'],
          en: ['A USB stick of at least 8 GB', 'A second computer with internet access'],
        },
        warning: {
          pl: 'Obraz Windows pobieraj wyłącznie ze strony Microsoftu. Nośniki z forów i torrentów bywają zmodyfikowane — dołożone oprogramowanie w systemie, który dopiero instalujesz, jest wyjątkowo trudne do wykrycia.',
          en: 'Download the Windows image only from Microsoft. Media from forums and torrents is sometimes modified, and added software inside an operating system you are only now installing is exceptionally hard to detect.',
        },
        body: {
          pl: [
            'Pendrive zostanie sformatowany, więc przenieś z niego wszystko, co chcesz zachować. 8 GB to minimum, ale wygodniej pracuje się na 16 GB — zmieścisz obok obrazu systemu także sterowniki.',
            'Najprostsza droga to Media Creation Tool ze strony Microsoftu: pobiera obraz i od razu nagrywa go na pendrive. Wybierz opcję tworzenia nośnika dla innego komputera, a nie aktualizacji tego, na którym pracujesz.',
            'Alternatywa, którą warto znać: pobierz sam plik ISO i nagraj go programem Rufus. Rufus daje coś, czego oficjalne narzędzie nie oferuje — przy nagrywaniu Windows 11 zaproponuje wyłączenie wymogu TPM 2.0 i Secure Boot oraz pominięcie obowiązkowego logowania kontem Microsoft. Jeśli masz starszy sprzęt albo chcesz konto lokalne, to najwygodniejsza droga.',
            'Nagrywanie trwa od kilku do kilkunastu minut. Gdy się skończy, pendrive możesz od razu przełożyć do nowego komputera — nie ma potrzeby go bezpiecznie usuwać, bo nic już na niego nie zapisujemy.',
          ],
          en: [
            'The USB stick will be wiped, so move anything you want to keep off it first. 8 GB is the minimum, but 16 GB is more comfortable — it leaves room for drivers alongside the image.',
            'The simplest route is the Media Creation Tool from Microsoft: it downloads the image and writes it to the stick in one go. Choose the option to create media for another PC rather than upgrading the machine you are working on.',
            'The alternative worth knowing: download the ISO on its own and write it with Rufus. Rufus offers something the official tool does not — when writing Windows 11 it will offer to remove the TPM 2.0 and Secure Boot requirements and to skip the mandatory Microsoft account sign-in. If you have older hardware or want a local account, this is the easier path.',
            'Writing takes anywhere from a few to fifteen minutes. Once it finishes you can move the stick straight to the new machine — there is no need to eject it safely, because nothing more is being written.',
          ],
        },
      },
      {
        id: 'bios-przed',
        minutes: 10,
        title: { pl: 'Ustawienia BIOS przed instalacją', en: 'BIOS settings before installing' },
        warning: {
          pl: 'Jeśli w BIOS-ie jest opcja trybu dysku SATA, upewnij się, że stoi na AHCI, a nie na RAID. Instalacja przy trybie RAID kończy się komunikatem, że instalator nie widzi żadnego dysku — to najczęstsza blokada na tym etapie.',
          en: 'If your BIOS has a SATA mode option, make sure it is set to AHCI rather than RAID. Installing with RAID enabled ends with the installer reporting that it can see no drives — the most common blocker at this stage.',
        },
        body: {
          pl: [
            'Wejdź do BIOS-u klawiszem Delete lub F2 zaraz po włączeniu komputera. Zanim cokolwiek zmienisz, włącz profil pamięci EXPO (płyty AMD) lub XMP (płyty Intel) — bez tego pamięć pracuje z częstotliwością bazową, znacznie niższą od tej z opakowania.',
            'Windows 11 wymaga dwóch rzeczy, które na nowej płycie bywają domyślnie wyłączone. Pierwsza to TPM: na płytach AMD nazywa się fTPM lub AMD fTPM, na płytach Intel PTT albo Intel Platform Trust Technology. Druga to Secure Boot, zwykle w sekcji Boot lub Security.',
            'Ustaw też tryb rozruchu na UEFI, bez trybu zgodności CSM lub Legacy. Windows 11 instaluje się wyłącznie w trybie UEFI, a pozostawione CSM potrafi sprawić, że instalator w ogóle nie zobaczy pendrive.',
            'Na koniec ustaw kolejność bootowania tak, aby pendrive był pierwszy, albo — wygodniej — zapisz ustawienia i przy ponownym starcie naciśnij klawisz menu bootowania, zwykle F8, F11 lub F12. Menu jednorazowe nie zmienia stałej konfiguracji, więc po instalacji nie musisz nic cofać.',
          ],
          en: [
            'Enter the BIOS with Delete or F2 immediately after powering on. Before changing anything else, enable the memory profile — EXPO on AMD boards, XMP on Intel — because without it the memory runs at its base frequency, well below the figure on the box.',
            'Windows 11 requires two things that are often disabled by default on a new board. The first is TPM: on AMD boards it is called fTPM or AMD fTPM, on Intel boards PTT or Intel Platform Trust Technology. The second is Secure Boot, usually under Boot or Security.',
            'Also set the boot mode to UEFI with no CSM or Legacy compatibility mode. Windows 11 installs only in UEFI mode, and leaving CSM enabled can stop the installer seeing the USB stick at all.',
            'Finally, either put the USB stick first in the boot order or — more conveniently — save your settings and press the boot menu key on the next start, usually F8, F11 or F12. A one-time menu leaves the permanent configuration alone, so there is nothing to undo after installing.',
          ],
        },
      },
      {
        id: 'partycje',
        minutes: 10,
        title: { pl: 'Partycjonowanie dysku', en: 'Partitioning the drive' },
        warning: {
          pl: 'Usunięcie partycji kasuje dane bezpowrotnie. Jeśli w komputerze jest więcej niż jeden dysk, sprawdź numer dysku dwa razy, zanim cokolwiek usuniesz — instalator pokazuje je jako Dysk 0, Dysk 1 i tak dalej, bez nazw handlowych.',
          en: 'Deleting a partition destroys its data permanently. If the machine has more than one drive, check the disk number twice before deleting anything — the installer shows them as Drive 0, Drive 1 and so on, with no product names.',
        },
        body: {
          pl: [
            'Po uruchomieniu z pendrive wybierz język, układ klawiatury i kliknij instalację. Gdy pojawi się pytanie o klucz produktu, możesz je pominąć — Windows da się zainstalować i używać bez aktywacji, z ograniczeniem sprowadzającym się do braku personalizacji wyglądu i znaku wodnego w rogu.',
            'Wybierz instalację niestandardową, nie aktualizację. Aktualizacja ma sens tylko wtedy, gdy na dysku jest już starszy Windows, który chcesz zachować wraz z plikami.',
            'Na nowym, pustym dysku zaznacz nieprzydzielone miejsce i kliknij Dalej. Instalator sam utworzy potrzebne partycje: systemową EFI, zarezerwowaną MSR, główną z systemem i partycję odzyskiwania. Nie trzeba niczego ustawiać ręcznie.',
            'Jeśli dysk był wcześniej używany, usuń wszystkie partycje z tego jednego dysku, aż zostanie jedno ciągłe nieprzydzielone miejsce. Pozostawione partycje z poprzedniej instalacji to najczęstsza przyczyna dziwnych problemów z rozruchem później.',
            'Kwestia podziału na C i D: przy jednym dysku NVMe zwykle nie ma to sensu. Dawniej dzielono dysk, żeby oddzielić system od danych, ale przy dzisiejszych pojemnościach kończy się to zwykle brakiem miejsca na jednej partycji przy wolnym miejscu na drugiej. Jeśli chcesz oddzielić dane, lepszym rozwiązaniem jest drugi fizyczny dysk.',
          ],
          en: [
            'After booting from the stick, choose the language and keyboard layout and start the installation. When it asks for a product key you can skip it — Windows installs and runs without activation, the limitation amounting to no appearance personalisation and a watermark in the corner.',
            'Choose the custom installation, not the upgrade. An upgrade only makes sense when the drive already holds an older Windows you want to keep along with its files.',
            'On a new, empty drive, select the unallocated space and click Next. The installer creates the partitions it needs on its own: the EFI system partition, the reserved MSR partition, the main Windows partition and a recovery partition. None of it needs setting manually.',
            'If the drive has been used before, delete every partition on that one drive until a single continuous block of unallocated space remains. Leftover partitions from a previous installation are the most common cause of strange boot problems later.',
            'On splitting into C and D: with a single NVMe drive this usually serves no purpose. The habit comes from separating system and data, but at current capacities it typically ends with one partition full while the other sits half empty. If you want data separated, a second physical drive is the better answer.',
          ],
        },
      },
      {
        id: 'konto',
        minutes: 10,
        title: {
          pl: 'Konfiguracja wstępna i konto lokalne',
          en: 'First-run setup and a local account',
        },
        body: {
          pl: [
            'Po skopiowaniu plików komputer zrestartuje się kilka razy. Gdy pojawi się ekran powitalny, wyjmij pendrive — inaczej komputer może ponownie uruchomić instalator.',
            'Windows 11 Home domaga się zalogowania kontem Microsoft i nie pokazuje opcji konta lokalnego wprost. Jeśli wolisz konto lokalne, na ekranie logowania odłącz kabel sieciowy i nie łącz się z Wi-Fi — po chwili pojawi się możliwość utworzenia konta bez logowania.',
            'Gdy ta droga nie zadziała, jest sposób sprawdzony: na ekranie połączenia sieciowego naciśnij Shift plus F10, żeby otworzyć wiersz poleceń, wpisz OOBE\\BYPASSNRO i zatwierdź. Komputer się zrestartuje i pojawi się opcja „Nie mam internetu”.',
            'Na kolejnych ekranach Windows zapyta o ustawienia prywatności: lokalizację, dane diagnostyczne, reklamy dopasowane do aktywności. Wszystkie można wyłączyć i nic przez to nie przestanie działać. Warto poświęcić na te ekrany chwilę zamiast klikać „dalej”, bo późniejsza zmiana wymaga przejścia przez kilkanaście miejsc w ustawieniach.',
          ],
          en: [
            'After the files are copied the machine restarts several times. When the welcome screen appears, remove the USB stick — otherwise the machine may boot back into the installer.',
            'Windows 11 Home insists on a Microsoft account and does not offer a local account outright. If you prefer a local account, disconnect the network cable at the sign-in screen and do not join a Wi-Fi network — after a moment the option to create an account without signing in appears.',
            'When that does not work, there is a reliable alternative: at the network screen press Shift plus F10 to open a command prompt, type OOBE\\BYPASSNRO and confirm. The machine restarts and the "I do not have internet" option appears.',
            'On the following screens Windows asks about privacy settings: location, diagnostic data, activity-based advertising. Every one of them can be switched off without breaking anything. These screens are worth a minute of attention rather than clicking through, because changing them later means visiting a dozen separate places in Settings.',
          ],
        },
      },
      {
        id: 'po-instalacji',
        minutes: 15,
        title: { pl: 'Pierwsze porządki po instalacji', en: 'The first tidy-up afterwards' },
        body: {
          pl: [
            'Zanim zainstalujesz cokolwiek innego, uruchom Windows Update i przeklikaj go do skutku — zwykle wymaga dwóch lub trzech rund z restartami. Windows pobierze przy okazji podstawowe sterowniki, dzięki czemu sieć i dźwięk zaczną działać.',
            'Sprawdź aktywację w Ustawieniach, w sekcji System i Aktywacja. Jeśli płyta ma wgrany klucz OEM albo używasz konta Microsoft powiązanego z poprzednią licencją cyfrową, Windows aktywuje się sam.',
            'Zweryfikuj, czy pamięć pracuje z właściwą częstotliwością: otwórz Menedżera zadań, zakładkę Wydajność i pozycję Pamięć. Jeśli widzisz częstotliwość bazową zamiast deklarowanej, profil EXPO lub XMP nie został włączony w BIOS-ie.',
            'Sprawdź też, czy system widzi cały dysk i czy działa w trybie NVMe. Menedżer dysków pokaże pełną pojemność, a program CrystalDiskInfo potwierdzi tryb pracy i stan zdrowia dysku.',
            'Dopiero teraz przejdź do instalowania sterowników producenta — to osobny temat, opisany w powiązanym poradniku, i kolejność ma tam znaczenie.',
          ],
          en: [
            'Before installing anything else, run Windows Update and keep going until it stops offering things — usually two or three rounds with restarts. Windows pulls basic drivers along the way, which gets networking and audio working.',
            'Check activation under Settings, System, Activation. If the board carries an embedded OEM key, or you signed in with a Microsoft account tied to a previous digital licence, Windows activates itself.',
            'Confirm the memory is running at its rated speed: open Task Manager, the Performance tab, then Memory. If you see the base frequency rather than the rated one, the EXPO or XMP profile was not enabled in the BIOS.',
            'Check too that the system sees the whole drive and is running it in NVMe mode. Disk Management shows the full capacity, and CrystalDiskInfo confirms the transfer mode and drive health.',
            'Only now move on to the manufacturer drivers — that is a separate topic covered in the related guide, and the order matters there.',
          ],
        },
      },
    ],
  },
  {
    slug: 'sterowniki-po-instalacji',
    category: 'software',
    difficulty: 'beginner',
    updated: '2026-08-01',
    related: ['instalacja-windows', 'diagnostyka-brak-obrazu'],
    title: {
      pl: 'Sterowniki: co, skąd i w jakiej kolejności',
      en: 'Drivers: what, from where, and in what order',
    },
    summary: {
      pl: 'Kolejność instalacji sterowników ma znaczenie i większość problemów po świeżej instalacji bierze się z jej pominięcia.',
      en: 'Driver installation order matters, and most problems after a fresh install come from ignoring it.',
    },
    steps: [
      {
        id: 'kolejnosc',
        minutes: 20,
        title: { pl: 'Właściwa kolejność', en: 'The right order' },
        warning: {
          pl: 'Nie pobieraj sterowników z serwisów typu „driver updater”. Prawie zawsze są nieaktualne albo dołożone do niepotrzebnego oprogramowania, a sterowniki od producenta płyty i karty są darmowe i dostępne bezpośrednio.',
          en: 'Do not get drivers from "driver updater" sites. They are almost always out of date or bundled with unwanted software, while the manufacturer drivers are free and available directly.',
        },
        body: {
          pl: [
            'Zacznij od sterownika chipsetu ze strony producenta płyty głównej. To on informuje Windows, czym w ogóle są pozostałe elementy płyty, więc instalowanie czegokolwiek przed nim potrafi skończyć się urządzeniami z żółtym wykrzyknikiem w Menedżerze urządzeń.',
            'Dla płyt AMD sterownik chipsetu instaluje też właściwy plan zasilania procesora. Bez niego procesory Ryzen działają zauważalnie gorzej, bo Windows nie wie, jak zarządzać ich rdzeniami.',
            'Drugi w kolejności jest sterownik karty graficznej, pobrany bezpośrednio od NVIDIA lub AMD, nie od producenta samej karty. Przy instalacji wybierz opcję czystej instalacji, która usuwa poprzednie wersje.',
            'Dopiero potem reszta: sieć, dźwięk, Bluetooth, kontrolery USB. Zwykle Windows Update zdąży już je zainstalować sam i nie trzeba nic robić — sprawdź Menedżer urządzeń i zajmij się tylko tym, co ma ostrzeżenie.',
            'Sterowników nie aktualizuj potem bez powodu. Zasada „działa, nie ruszaj” sprawdza się tu wyjątkowo dobrze; wyjątkiem jest sterownik karty graficznej, który warto odświeżać przy nowych grach.',
          ],
          en: [
            'Start with the chipset driver from the motherboard manufacturer. It is what tells Windows what the rest of the board even is, so installing anything before it tends to leave devices with a yellow warning icon in Device Manager.',
            'On AMD boards the chipset driver also installs the correct CPU power plan. Without it Ryzen processors perform noticeably worse, because Windows does not know how to schedule across their cores.',
            'Second comes the graphics driver, downloaded directly from NVIDIA or AMD rather than from the card vendor. During installation choose the clean install option, which removes previous versions.',
            'Only then the rest: networking, audio, Bluetooth, USB controllers. Windows Update has usually installed these already and there is nothing to do — check Device Manager and deal only with anything showing a warning.',
            'Do not update drivers afterwards without a reason. "If it works, leave it" holds unusually well here; the exception is the graphics driver, which is worth refreshing for new games.',
          ],
        },
      },
    ],
  },
  {
    slug: 'instalacja-linux',
    category: 'software',
    difficulty: 'intermediate',
    updated: '2026-08-01',
    related: ['instalacja-windows'],
    title: {
      pl: 'Linux jako alternatywa lub drugi system',
      en: 'Linux as an alternative or a second system',
    },
    summary: {
      pl: 'Kiedy Linux ma sens, czym różni się instalacja od windowsowej i jak ustawić dwa systemy obok siebie bez utraty danych.',
      en: 'When Linux makes sense, how installing it differs from Windows, and how to run both side by side without losing data.',
    },
    steps: [
      {
        id: 'czy-warto',
        title: { pl: 'Czy Linux ma sens w twoim przypadku', en: 'Whether Linux fits your case' },
        body: {
          pl: [
            'Do przeglądania internetu, pracy biurowej, programowania i obróbki zdjęć Linux jest dziś w pełni wystarczający i zwykle lżejszy od Windows na tym samym sprzęcie.',
            'Granie działa lepiej, niż sugeruje reputacja: warstwa Proton w Steamie uruchamia większość tytułów bez konfiguracji. Wyjątkiem są gry z anty-cheatem działającym na poziomie jądra — część z nich nie uruchomi się w ogóle i nie ma na to obejścia.',
            'Realne przeszkody to konkretne programy: pełny pakiet Adobe, część oprogramowania CAD i niektóre narzędzia branżowe nie mają wersji linuksowej ani równorzędnego zamiennika. Jeśli takiego programu potrzebujesz do pracy, zostań przy Windows albo postaw oba systemy.',
            'Na start najrozsądniejsze są Ubuntu i Fedora: mają największe społeczności, więc na każdy problem znajdziesz gotową odpowiedź, i obsługują nowy sprzęt bez dogrywania sterowników.',
          ],
          en: [
            'For browsing, office work, programming and photo editing, Linux is entirely sufficient today and usually lighter than Windows on the same hardware.',
            'Gaming works better than its reputation suggests: the Proton layer in Steam runs most titles with no configuration. The exception is games with kernel-level anti-cheat — some will not launch at all, and there is no way around it.',
            'The real obstacles are specific applications: the full Adobe suite, some CAD software and certain industry tools have no Linux version and no equivalent replacement. If you need one of those for work, stay on Windows or install both.',
            'Ubuntu and Fedora are the sensible starting points: they have the largest communities, so any problem already has an answer written down, and they support new hardware without hunting for drivers.',
          ],
        },
      },
      {
        id: 'dual-boot',
        minutes: 40,
        title: { pl: 'Dwa systemy na jednym komputerze', en: 'Two systems on one machine' },
        warning: {
          pl: 'Instaluj Windows przed Linuksem. Windows nadpisuje program rozruchowy bez pytania i po jego instalacji Linux zniknie z menu startowego — odwrotna kolejność oszczędza naprawiania bootloadera.',
          en: 'Install Windows before Linux. Windows overwrites the boot loader without asking, and a Linux installed first will vanish from the boot menu — doing it in this order saves repairing the bootloader.',
        },
        body: {
          pl: [
            'Najbezpieczniejszy układ to dwa osobne dyski: Windows na jednym, Linux na drugim. Każdy system ma wtedy własny obszar rozruchowy i aktualizacja jednego nie może uszkodzić drugiego.',
            'Przy jednym dysku najpierw zmniejsz partycję Windows z poziomu samego Windows, w Zarządzaniu dyskami. Zostaw dla Linuksa co najmniej 60 GB, a wygodnie pracuje się od 100 GB w górę.',
            'Wyłącz szybki rozruch w Windows. Przy włączonym system nie wyłącza się do końca, tylko hibernuje, przez co Linux widzi partycję Windows jako zajętą i odmawia zapisu.',
            'W instalatorze Linuksa wybierz instalację obok istniejącego systemu. Instalator sam wykryje Windows i doda go do menu rozruchowego, więc przy każdym starcie wybierzesz, co uruchomić.',
            'Zegar systemowy bywa rozjechany między systemami, bo Windows traktuje zegar sprzętowy jako czas lokalny, a Linux jako UTC. Najprościej naprawić to po stronie Linuksa jednym poleceniem ustawiającym zegar sprzętowy na czas lokalny.',
          ],
          en: [
            'The safest arrangement is two separate drives: Windows on one, Linux on the other. Each system then has its own boot area, and updating one cannot break the other.',
            'With a single drive, shrink the Windows partition from within Windows first, using Disk Management. Leave at least 60 GB for Linux; from 100 GB upwards is comfortable.',
            'Turn off fast startup in Windows. With it enabled the system hibernates rather than shutting down fully, which makes Linux see the Windows partition as in use and refuse to write to it.',
            'In the Linux installer choose to install alongside the existing system. The installer detects Windows and adds it to the boot menu, so each start offers a choice.',
            'The clock often disagrees between the two, because Windows treats the hardware clock as local time while Linux treats it as UTC. The simplest fix is on the Linux side, with a single command setting the hardware clock to local time.',
          ],
        },
      },
    ],
  },
];
