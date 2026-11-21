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
    updated: '2026-11-21',
    related: ['sterowniki-po-instalacji', 'first-boot-and-bios', 'instalacja-linux'],
    title: {
      pl: 'Instalacja Windows 11 krok po kroku',
      en: 'Installing Windows 11 step by step',
    },
    summary: {
      pl: 'Od sprawdzenia wymagań i pustego pendrive do działającego systemu: przygotowanie nośnika, ustawienia BIOS, partycjonowanie, konto lokalne i pierwsze porządki po instalacji.',
      en: 'From checking the requirements and an empty USB stick to a working system: preparing the media, BIOS settings, partitioning, a local account, and the first tidy-up afterwards.',
    },
    steps: [
      {
        id: 'wymagania',
        minutes: 5,
        title: { pl: 'Sprawdzenie wymagań', en: 'Checking the requirements' },
        body: {
          pl: [
            'Windows 11 wymaga: rozruchu UEFI z obsługą Secure Boot, modułu TPM 2.0, 4 GB pamięci, 64 GB miejsca na dysku i obsługiwanego procesora — w praktyce Intel Core 8. generacji lub nowszy albo AMD Ryzen 2000 lub nowszy. Każdy procesor i płyta kupione dziś spełniają to z zapasem; TPM nie wymaga osobnego modułu, bo wystarcza fTPM w procesorach AMD i PTT w procesorach Intela.',
            'Starszy procesor: od wersji 24H2 Windows 11 wymaga instrukcji SSE4.2 i POPCNT. Bardzo stare procesory, którym ich brakuje, nie uruchomią systemu w ogóle i nie obejdzie tego żadne narzędzie. Procesory, które mają te instrukcje, ale są starsze niż oficjalna lista, da się zainstalować z pominięciem wymagań, lecz Microsoft nie gwarantuje im aktualizacji.',
            'Jeśli zostajesz na razie przy Windows 10: jego wsparcie skończyło się 14 października 2025. Program rozszerzonych aktualizacji zabezpieczeń (ESU) dla użytkowników domowych działa do 12 października 2027, a w Europejskim Obszarze Gospodarczym, czyli także w Polsce, zapis jest bezpłatny z kontem Microsoft. ESU to wyłącznie poprawki bezpieczeństwa, bez nowych funkcji — rozwiązanie przejściowe, nie docelowe.',
          ],
          en: [
            'Windows 11 needs: UEFI boot with Secure Boot support, TPM 2.0, 4 GB of memory, 64 GB of storage and a supported processor — in practice Intel Core 8th gen or newer, or AMD Ryzen 2000 or newer. Any CPU and board bought today clears this comfortably; TPM needs no separate module, because fTPM on AMD processors and PTT on Intel ones is enough.',
            'An older processor: since version 24H2, Windows 11 requires the SSE4.2 and POPCNT instructions. Very old processors that lack them cannot boot the system at all, and no tool works around that. Processors that have them but predate the official list can be installed with the requirements skipped, but Microsoft does not guarantee them updates.',
            'If you are staying on Windows 10 for now: its support ended on 14 October 2025. The consumer Extended Security Updates (ESU) programme runs until 12 October 2027, and in the European Economic Area, Poland included, enrolment is free with a Microsoft account. ESU is security fixes only, with no new features — a stopgap, not a destination.',
          ],
        },
      },
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
            'Najprostsza droga to Media Creation Tool ze strony microsoft.com/software-download/windows11: pobiera obraz i od razu nagrywa go na pendrive. Wybierz opcję tworzenia nośnika dla innego komputera, a nie aktualizacji tego, na którym pracujesz.',
            'Alternatywa, którą warto znać: pobierz z tej samej strony sam plik ISO i nagraj go programem Rufus. Rufus daje coś, czego oficjalne narzędzie nie oferuje — przy nagrywaniu Windows 11 zaproponuje wyłączenie wymogu TPM 2.0 i Secure Boot oraz pominięcie obowiązkowego logowania kontem Microsoft z utworzeniem konta lokalnego. Jeśli masz starszy sprzęt albo chcesz konto lokalne, to jak dotąd najpewniejsza droga — użyj najnowszej wersji programu, bo Microsoft kolejne obejścia zamyka. Wymogu SSE4.2 i POPCNT Rufus nie usunie.',
            'Nagrywanie trwa od kilku do kilkunastu minut. Gdy się skończy, pendrive możesz od razu przełożyć do nowego komputera — nie ma potrzeby go bezpiecznie usuwać, bo nic już na niego nie zapisujemy.',
          ],
          en: [
            'The USB stick will be wiped, so move anything you want to keep off it first. 8 GB is the minimum, but 16 GB is more comfortable — it leaves room for drivers alongside the image.',
            'The simplest route is the Media Creation Tool from microsoft.com/software-download/windows11: it downloads the image and writes it to the stick in one go. Choose the option to create media for another PC rather than upgrading the machine you are working on.',
            'The alternative worth knowing: download the ISO on its own from the same page and write it with Rufus. Rufus offers something the official tool does not — when writing Windows 11 it will offer to remove the TPM 2.0 and Secure Boot requirements and to skip the mandatory Microsoft account sign-in by creating a local account. If you have older hardware or want a local account, this has so far been the most dependable path — use the latest version, because Microsoft keeps closing workarounds. Rufus cannot remove the SSE4.2 and POPCNT requirement.',
            'Writing takes anywhere from a few to fifteen minutes. Once it finishes you can move the stick straight to the new machine — there is no need to eject it safely, because nothing more is being written.',
          ],
        },
      },
      {
        id: 'bios-przed',
        minutes: 10,
        title: { pl: 'Ustawienia BIOS przed instalacją', en: 'BIOS settings before installing' },
        warning: {
          pl: 'Jeśli w BIOS-ie jest opcja trybu dysku SATA, upewnij się, że stoi na AHCI, a nie na RAID; na płytach Intela sprawdź też, czy wyłączony jest Intel VMD. Instalacja przy włączonym RAID lub VMD kończy się komunikatem, że instalator nie widzi żadnego dysku — to najczęstsza blokada na tym etapie.',
          en: 'If your BIOS has a SATA mode option, make sure it is set to AHCI rather than RAID; on Intel boards also check that Intel VMD is disabled. Installing with RAID or VMD enabled ends with the installer reporting that it can see no drives — the most common blocker at this stage.',
        },
        body: {
          pl: [
            'Wejdź do BIOS-u klawiszem Delete lub F2 zaraz po włączeniu komputera. Najpierw sprawdź wersję BIOS-u: na procesorach Intel Core 13. i 14. generacji wgraj wersję z mikrokodem 0x12F lub nowszym przed instalacją systemu (szczegóły w poradniku o pierwszym uruchomieniu). Potem włącz profil pamięci EXPO lub XMP — bez tego pamięć pracuje z częstotliwością bazową, znacznie niższą od tej z opakowania.',
            'Windows 11 wymaga dwóch rzeczy, które na nowej płycie bywają domyślnie wyłączone. Pierwsza to TPM 2.0: na płytach AMD nazywa się fTPM lub AMD fTPM, na płytach Intel PTT albo Intel Platform Trust Technology — ustaw na Enabled. Druga to Secure Boot, zwykle w sekcji Boot lub Security. Jeśli nie da się go włączyć, poszukaj obok opcji typu systemu (ustaw Windows UEFI) albo zarządzania kluczami i wybierz instalację kluczy domyślnych.',
            'Ustaw też tryb rozruchu na UEFI, bez trybu zgodności CSM lub Legacy. Windows 11 instaluje się wyłącznie w trybie UEFI, Secure Boot i Resizable BAR też wymagają wyłączonego CSM, a pozostawione CSM potrafi sprawić, że instalator w ogóle nie zobaczy pendrive.',
            'Uwaga przy starszym dysku z działającym systemem: jeśli Windows 10 był zainstalowany w trybie Legacy, dysk ma tablicę partycji MBR i po przełączeniu na UEFI nie wystartuje. Przed zmianą w BIOS-ie przekonwertuj go z poziomu Windows 10 narzędziem mbr2gpt: w wierszu poleceń administratora wpisz mbr2gpt /validate /allowFullOS, a gdy sprawdzenie przejdzie, mbr2gpt /convert /allowFullOS. Przy czystej instalacji nie jest to potrzebne — usunięcie partycji w instalatorze wystarczy.',
            'Na koniec ustaw kolejność bootowania tak, aby pendrive był pierwszy, albo — wygodniej — zapisz ustawienia klawiszem F10 i przy ponownym starcie naciśnij klawisz menu bootowania, zwykle F8, F11 lub F12. Wybierz pozycję pendrive z dopiskiem UEFI. Menu jednorazowe nie zmienia stałej konfiguracji, więc po instalacji nie musisz nic cofać.',
          ],
          en: [
            'Enter the BIOS with Delete or F2 immediately after powering on. First check the BIOS version: on Intel Core 13th and 14th gen processors, flash a version with microcode 0x12F or newer before installing the system (details in the first boot guide). Then enable the EXPO or XMP memory profile — without it the memory runs at its base frequency, well below the figure on the box.',
            'Windows 11 requires two things that are often disabled by default on a new board. The first is TPM 2.0: on AMD boards it is called fTPM or AMD fTPM, on Intel boards PTT or Intel Platform Trust Technology — set it to Enabled. The second is Secure Boot, usually under Boot or Security. If it will not switch on, look nearby for an OS type option (set it to Windows UEFI) or for key management, and choose to install the default keys.',
            'Also set the boot mode to UEFI with no CSM or Legacy compatibility mode. Windows 11 installs only in UEFI mode, Secure Boot and Resizable BAR also need CSM off, and leaving CSM enabled can stop the installer seeing the USB stick at all.',
            'A note for an older drive with a working system on it: if Windows 10 was installed in Legacy mode, the drive has an MBR partition table and will not boot once you switch to UEFI. Before changing the BIOS, convert it from within Windows 10 with mbr2gpt: in an administrator command prompt run mbr2gpt /validate /allowFullOS and, once that passes, mbr2gpt /convert /allowFullOS. For a clean installation this is unnecessary — deleting the partitions in the installer is enough.',
            'Finally, either put the USB stick first in the boot order or — more conveniently — save your settings with F10 and press the boot menu key on the next start, usually F8, F11 or F12. Pick the entry for the stick marked UEFI. A one-time menu leaves the permanent configuration alone, so there is nothing to undo after installing.',
          ],
        },
      },
      {
        id: 'partycje',
        minutes: 10,
        title: { pl: 'Partycjonowanie dysku', en: 'Partitioning the drive' },
        warning: {
          pl: 'Usunięcie partycji kasuje dane bezpowrotnie. Jeśli w komputerze jest więcej niż jeden dysk, sprawdź numer dysku dwa razy, zanim cokolwiek usuniesz — instalator pokazuje je jako Dysk 0, Dysk 1 i tak dalej, bez nazw handlowych. Pojemność obok numeru pomaga je odróżnić; najbezpieczniej na czas instalacji odłączyć dyski z danymi.',
          en: 'Deleting a partition destroys its data permanently. If the machine has more than one drive, check the disk number twice before deleting anything — the installer shows them as Drive 0, Drive 1 and so on, with no product names. The capacity next to each number helps tell them apart; safest of all is to disconnect data drives for the duration of the install.',
        },
        body: {
          pl: [
            'Po uruchomieniu z pendrive wybierz język i układ klawiatury. Na ekranie wyboru opcji instalacji wybierz instalację Windows 11 i zaznacz zgodę na usunięcie wszystkiego — dotyczy to tylko dysku, który za chwilę wskażesz. Gdy pojawi się pytanie o klucz produktu, możesz je pominąć opcją „Nie mam klucza produktu” — Windows da się zainstalować i używać bez aktywacji, z ograniczeniem sprowadzającym się do braku personalizacji wyglądu i znaku wodnego w rogu.',
            'Wybierz wersję systemu zgodną z licencją, którą masz albo kupisz, zwykle Home lub Pro. Pomyłka oznacza później ponowną instalację albo dopłatę do innej wersji.',
            'Na nowym, pustym dysku zaznacz nieprzydzielone miejsce i kliknij Dalej. Instalator sam utworzy potrzebne partycje: systemową EFI, zarezerwowaną MSR, główną z systemem i partycję odzyskiwania. Nie trzeba niczego ustawiać ręcznie.',
            'Jeśli dysk był wcześniej używany, usuń wszystkie partycje z tego jednego dysku, aż zostanie jedno ciągłe nieprzydzielone miejsce. Pozostawione partycje z poprzedniej instalacji to najczęstsza przyczyna dziwnych problemów z rozruchem później. Komunikat, że wybrany dysk ma tablicę partycji MBR, znika po tej samej operacji: na pustym dysku instalator sam utworzy tablicę GPT wymaganą w trybie UEFI.',
            'Kwestia podziału na C i D: przy jednym dysku NVMe zwykle nie ma to sensu. Dawniej dzielono dysk, żeby oddzielić system od danych, ale przy dzisiejszych pojemnościach kończy się to zwykle brakiem miejsca na jednej partycji przy wolnym miejscu na drugiej. Jeśli chcesz oddzielić dane, lepszym rozwiązaniem jest drugi fizyczny dysk.',
          ],
          en: [
            'After booting from the stick, choose the language and keyboard layout. On the setup option screen choose to install Windows 11 and tick the agreement that everything will be deleted — it applies only to the drive you are about to pick. When it asks for a product key you can skip it with "I do not have a product key" — Windows installs and runs without activation, the limitation amounting to no appearance personalisation and a watermark in the corner.',
            'Choose the edition that matches the licence you have or will buy, usually Home or Pro. Getting it wrong means reinstalling later or paying to upgrade to the other edition.',
            'On a new, empty drive, select the unallocated space and click Next. The installer creates the partitions it needs on its own: the EFI system partition, the reserved MSR partition, the main Windows partition and a recovery partition. None of it needs setting manually.',
            'If the drive has been used before, delete every partition on that one drive until a single continuous block of unallocated space remains. Leftover partitions from a previous installation are the most common cause of strange boot problems later. A message that the selected disk has an MBR partition table goes away with the same step: on an empty drive the installer creates the GPT table that UEFI mode requires.',
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
            'Windows 11 Home i Pro domyślnie wymagają połączenia z internetem i zalogowania kontem Microsoft, a samo odłączenie kabla sieciowego już tego nie omija. Jeśli wolisz konto lokalne, najpewniejszą drogą jest pendrive nagrany Rufusem z opcją konta lokalnego — wtedy ten ekran w ogóle się nie pojawi.',
            'Popularne kiedyś obejście OOBE\\BYPASSNRO (Shift plus F10 na ekranie sieci) Microsoft usunął w 2025 roku i na aktualnych nośnikach już nie działa. Jeśli instalujesz z nośnika Media Creation Tool, zaloguj się kontem Microsoft, a konto lokalne dodaj później w Ustawieniach, w sekcji Konta.',
            'Na kolejnych ekranach Windows zapyta o ustawienia prywatności: lokalizację, dane diagnostyczne, reklamy dopasowane do aktywności. Wszystkie można wyłączyć i nic przez to nie przestanie działać. Warto poświęcić na te ekrany chwilę zamiast klikać „dalej”, bo późniejsza zmiana wymaga przejścia przez kilkanaście miejsc w ustawieniach.',
          ],
          en: [
            'After the files are copied the machine restarts several times. When the welcome screen appears, remove the USB stick — otherwise the machine may boot back into the installer.',
            'Windows 11 Home and Pro require an internet connection and a Microsoft account sign-in by default, and simply unplugging the network cable no longer gets around it. If you prefer a local account, the most dependable route is a stick written by Rufus with the local account option — the sign-in screen then never appears.',
            'The once-popular OOBE\\BYPASSNRO workaround (Shift plus F10 at the network screen) was removed by Microsoft in 2025 and no longer works on current media. If you install from Media Creation Tool media, sign in with a Microsoft account and add a local account later under Settings, Accounts.',
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
            'Zanim zainstalujesz cokolwiek innego, uruchom Windows Update i przeklikaj go do skutku — zwykle wymaga dwóch lub trzech rund z restartami. Windows pobierze przy okazji podstawowe sterowniki, dzięki czemu sieć i dźwięk zaczną działać, i doprowadzi system do bieżącej wersji (w listopadzie 2026 to 26H2). Wersję sprawdzisz w Ustawieniach, w sekcji System i Informacje.',
            'Sprawdź aktywację w Ustawieniach, w sekcji System i Aktywacja. Jeśli płyta ma wgrany klucz OEM albo używasz konta Microsoft powiązanego z poprzednią licencją cyfrową, Windows aktywuje się sam.',
            'Zweryfikuj, czy pamięć pracuje z właściwą częstotliwością: otwórz Menedżera zadań, zakładkę Wydajność i pozycję Pamięć. Jeśli widzisz częstotliwość bazową zamiast deklarowanej, profil EXPO lub XMP nie został włączony w BIOS-ie.',
            'Sprawdź też, czy system widzi cały dysk i czy działa z pełną prędkością. Menedżer dysków pokaże pełną pojemność, a program CrystalDiskInfo w polu trybu transferu pokaże interfejs, na przykład PCIe 4.0 x4, oraz stan zdrowia dysku.',
            'Jeśli zalogowałeś się kontem Microsoft, Windows mógł sam włączyć szyfrowanie urządzenia. Sprawdź to w Ustawieniach, w sekcji Prywatność i zabezpieczenia, i zanotuj klucz odzyskiwania z konta Microsoft — przyda się przy aktualizacji BIOS-u, zmianie płyty albo instalacji drugiego systemu.',
            'Dopiero teraz przejdź do instalowania sterowników producenta — to osobny temat, opisany w powiązanym poradniku, i kolejność ma tam znaczenie.',
          ],
          en: [
            'Before installing anything else, run Windows Update and keep going until it stops offering things — usually two or three rounds with restarts. Windows pulls basic drivers along the way, which gets networking and audio working, and brings the system up to the current version (26H2 as of November 2026). You can check the version under Settings, System, About.',
            'Check activation under Settings, System, Activation. If the board carries an embedded OEM key, or you signed in with a Microsoft account tied to a previous digital licence, Windows activates itself.',
            'Confirm the memory is running at its rated speed: open Task Manager, the Performance tab, then Memory. If you see the base frequency rather than the rated one, the EXPO or XMP profile was not enabled in the BIOS.',
            'Check too that the system sees the whole drive and runs it at full speed. Disk Management shows the full capacity, and CrystalDiskInfo shows the interface in its transfer mode field, for example PCIe 4.0 x4, along with drive health.',
            'If you signed in with a Microsoft account, Windows may have switched on device encryption by itself. Check under Settings, Privacy and security, and note the recovery key from your Microsoft account — you will want it when updating the BIOS, swapping the motherboard or installing a second system.',
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
    updated: '2026-11-21',
    related: ['instalacja-windows', 'troubleshooting-no-post'],
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
            'Dla płyt AMD sterownik chipsetu instaluje też składniki zarządzania energią procesora. W dwuchipletowych Ryzenach X3D, takich jak 9950X3D czy 9900X3D, zawiera sterownik kierujący gry na rdzenie z dodatkową pamięcią podręczną — bez niego te procesory wyraźnie tracą w grach, a do rozpoznawania gier potrzebny jest też niewyłączony pasek gier Xbox Game Bar.',
            'Drugi w kolejności jest sterownik karty graficznej, pobrany bezpośrednio od NVIDIA, AMD lub Intela (dla kart Arc), nie od producenta samej karty. Jeśli instalator oferuje czystą instalację albo przywrócenie ustawień fabrycznych, wybierz ją — usuwa poprzednie wersje.',
            'Po instalacji sterownika graficznego sprawdź, czy działa Resizable BAR: panel NVIDIA pokazuje to w informacjach o systemie, a programy AMD i Intela w ustawieniach lub informacjach o sprzęcie. Przy kartach Intel Arc to konieczność, nie dodatek — bez Resizable BAR tracą dużą część wydajności. Jeśli jest wyłączony, włącz w BIOS-ie Above 4G Decoding i Re-Size BAR Support (przy wyłączonym CSM).',
            'Dopiero potem reszta: sieć, dźwięk, Bluetooth, kontrolery USB. Zwykle Windows Update zdąży już je zainstalować sam i nie trzeba nic robić — sprawdź Menedżer urządzeń i zajmij się tylko tym, co ma ostrzeżenie.',
            'Sterowników nie aktualizuj potem bez powodu. Zasada „działa, nie ruszaj” sprawdza się tu wyjątkowo dobrze; wyjątkiem jest sterownik karty graficznej, który warto odświeżać przy nowych grach.',
          ],
          en: [
            'Start with the chipset driver from the motherboard manufacturer. It is what tells Windows what the rest of the board even is, so installing anything before it tends to leave devices with a yellow warning icon in Device Manager.',
            'On AMD boards the chipset driver also installs the processor power-management components. On dual-chiplet Ryzen X3D parts such as the 9950X3D or 9900X3D it includes the driver that steers games onto the cores with the extra cache — without it these processors lose noticeably in games, and game detection also needs the Xbox Game Bar left enabled.',
            'Second comes the graphics driver, downloaded directly from NVIDIA, AMD or Intel (for Arc cards) rather than from the card vendor. If the installer offers a clean install or a factory reset, choose it — it removes previous versions.',
            'After installing the graphics driver, check that Resizable BAR is active: the NVIDIA control panel shows it under system information, and the AMD and Intel software shows it in their settings or hardware information. For Intel Arc cards it is a necessity, not an extra — without Resizable BAR they lose a large share of their performance. If it is off, enable Above 4G Decoding and Re-Size BAR Support in the BIOS (with CSM disabled).',
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
    updated: '2026-11-21',
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
            'Na start najrozsądniejsze są Ubuntu i Fedora: mają największe społeczności, więc na każdy problem znajdziesz gotową odpowiedź. Aktualne wydanie długoterminowe Ubuntu to 26.04 LTS z jądrem 7.0 i wsparciem do kwietnia 2031. Fedora wychodzi co około pół roku i zawsze ma świeże jądro. Linux Mint 22.x bazuje jeszcze na starszym Ubuntu 24.04; kolejne wydanie Minta, oparte na 26.04, twórcy planują na święta 2026.',
          ],
          en: [
            'For browsing, office work, programming and photo editing, Linux is entirely sufficient today and usually lighter than Windows on the same hardware.',
            'Gaming works better than its reputation suggests: the Proton layer in Steam runs most titles with no configuration. The exception is games with kernel-level anti-cheat — some will not launch at all, and there is no way around it.',
            'The real obstacles are specific applications: the full Adobe suite, some CAD software and certain industry tools have no Linux version and no equivalent replacement. If you need one of those for work, stay on Windows or install both.',
            'Ubuntu and Fedora are the sensible starting points: they have the largest communities, so any problem already has an answer written down. The current Ubuntu long-term release is 26.04 LTS, with kernel 7.0 and support until April 2031. Fedora ships roughly every six months and always carries a recent kernel. Linux Mint 22.x is still based on the older Ubuntu 24.04; its developers plan the next Mint release, based on 26.04, for Christmas 2026.',
          ],
        },
      },
      {
        id: 'nowy-sprzet',
        minutes: 20,
        title: {
          pl: 'Nowy sprzęt, sterowniki grafiki i Secure Boot',
          en: 'New hardware, graphics drivers and Secure Boot',
        },
        body: {
          pl: [
            'Nowy sprzęt potrzebuje nowego jądra i nowej wersji Mesy, czyli otwartych sterowników grafiki. Dotyczy to kart RX 9000, Intel Arc B, RTX 50 i procesorów Core Ultra 200S. Wybierz najnowsze wydanie LTS albo świeże wydanie Fedory — dystrybucja oparta na bazie sprzed dwóch lat może nie mieć obsługi takiego sprzętu.',
            'Karty AMD i Intela działają od razu, bez instalowania czegokolwiek: sterownik jest częścią jądra i Mesy. Karty NVIDIA wymagają sterownika producenta — w Ubuntu zaznacz w instalatorze instalację oprogramowania firm trzecich dla grafiki albo użyj później narzędzia Dodatkowe sterowniki, w Fedorze sterownik pochodzi z repozytorium RPM Fusion. Karty RTX 50 działają wyłącznie z otwartymi modułami jądra NVIDIA, w wersji sterownika 570 lub nowszej.',
            'Secure Boot możesz zostawić włączony: Ubuntu, Fedora i Mint uruchamiają się przez podpisany program rozruchowy. Przy instalacji sterownika NVIDIA z włączonym Secure Boot Ubuntu poprosi o ustawienie jednorazowego hasła (w Fedorze opisuje to instrukcja RPM Fusion), a po restarcie pojawi się niebieski ekran MOK Manager. Wybierz Enroll MOK, potwierdź i wpisz to samo hasło — bez tego kroku sterownik nie zostanie załadowany i system wystartuje w niskiej rozdzielczości.',
            'Że wszystko działa, sprawdzisz w ustawieniach systemu, w sekcji Informacje o systemie: pozycja grafiki powinna pokazywać nazwę twojej karty, a nie renderowanie programowe (llvmpipe).',
          ],
          en: [
            'New hardware needs a new kernel and a new Mesa, the open graphics driver stack. That applies to RX 9000, Intel Arc B and RTX 50 cards and Core Ultra 200S processors. Choose the newest LTS release or a fresh Fedora release — a distribution built on a base from two years ago may not support such hardware.',
            'AMD and Intel cards work straight away with nothing to install: the driver is part of the kernel and Mesa. NVIDIA cards need the vendor driver — in Ubuntu tick the installer option for third-party graphics software or use the Additional Drivers tool later, and in Fedora the driver comes from the RPM Fusion repository. RTX 50 cards work only with the NVIDIA open kernel modules, driver version 570 or newer.',
            'Secure Boot can stay on: Ubuntu, Fedora and Mint boot through a signed boot loader. When you install the NVIDIA driver with Secure Boot on, Ubuntu asks you to set a one-time password (in Fedora the RPM Fusion instructions cover it), and after a restart a blue MOK Manager screen appears. Choose Enroll MOK, confirm and enter the same password — without this step the driver is not loaded and the system starts at a low resolution.',
            'To check it all works, open the system settings, About section: the graphics entry should show the name of your card, not software rendering (llvmpipe).',
          ],
        },
      },
      {
        id: 'dual-boot',
        minutes: 40,
        title: { pl: 'Dwa systemy na jednym komputerze', en: 'Two systems on one machine' },
        warning: {
          pl: 'Instaluj Windows przed Linuksem. Instalator Windows ustawia swój menedżer rozruchu jako pierwszy w BIOS-ie i nie dodaje Linuksa do menu, więc zainstalowany wcześniej Linux pozornie znika — odwrotna kolejność oszczędza poprawiania rozruchu.',
          en: 'Install Windows before Linux. The Windows installer puts its own boot manager first in the BIOS and does not add Linux to the menu, so a Linux installed first seems to vanish — doing it in this order saves fixing the boot setup.',
        },
        body: {
          pl: [
            'Najbezpieczniejszy układ to dwa osobne dyski: Windows na jednym, Linux na drugim. Każdy system ma wtedy własny obszar rozruchowy i aktualizacja jednego nie może uszkodzić drugiego.',
            'Przy jednym dysku najpierw zmniejsz partycję Windows z poziomu samego Windows, w Zarządzaniu dyskami. Zostaw dla Linuksa co najmniej 60 GB, a wygodnie pracuje się od 100 GB w górę.',
            'Wyłącz szybki rozruch w Windows (Panel sterowania, Opcje zasilania, Wybierz działanie przycisków zasilania). Przy włączonym system nie wyłącza się do końca, tylko hibernuje, przez co Linux widzi partycję Windows jako zajętą i odmawia zapisu. Jeśli Windows ma włączone szyfrowanie urządzenia lub BitLocker, zanotuj klucz odzyskiwania przed zmniejszaniem partycji i zmianami w rozruchu — Windows może o niego poprosić.',
            'W instalatorze Linuksa wybierz instalację obok istniejącego systemu. Instalator sam wykryje Windows i doda go do menu rozruchowego, więc przy każdym starcie wybierzesz, co uruchomić. Jeśli po aktualizacji Windows menu przestanie się pojawiać, ustaw w BIOS-ie Linuksa (zwykle pozycja ubuntu lub fedora) jako pierwszy w kolejności rozruchu.',
            'Zegar systemowy bywa rozjechany między systemami, bo Windows traktuje zegar sprzętowy jako czas lokalny, a Linux jako UTC. Najprościej naprawić to po stronie Linuksa poleceniem timedatectl set-local-rtc 1, które ustawia zegar sprzętowy na czas lokalny.',
          ],
          en: [
            'The safest arrangement is two separate drives: Windows on one, Linux on the other. Each system then has its own boot area, and updating one cannot break the other.',
            'With a single drive, shrink the Windows partition from within Windows first, using Disk Management. Leave at least 60 GB for Linux; from 100 GB upwards is comfortable.',
            'Turn off fast startup in Windows (Control Panel, Power Options, Choose what the power buttons do). With it enabled the system hibernates rather than shutting down fully, which makes Linux see the Windows partition as in use and refuse to write to it. If Windows has device encryption or BitLocker on, note the recovery key before shrinking partitions or changing the boot setup — Windows may ask for it.',
            'In the Linux installer choose to install alongside the existing system. The installer detects Windows and adds it to the boot menu, so each start offers a choice. If the menu stops appearing after a Windows update, put the Linux entry (usually named ubuntu or fedora) first in the BIOS boot order.',
            'The clock often disagrees between the two, because Windows treats the hardware clock as local time while Linux treats it as UTC. The simplest fix is on the Linux side, with the command timedatectl set-local-rtc 1, which sets the hardware clock to local time.',
          ],
        },
      },
    ],
  },
];
