# Jak to wszystko działa

Przewodnik po technologiach użytych w tym projekcie — i po kilku, których tu nie
ma, ale warto je znać dla porównania. Pisany dla kogoś, kto zna podstawy
programowania, ale nie pracował z tymi konkretnymi narzędziami.

Wszystkie przykłady oznaczone **„z tego projektu"** to prawdziwy kod z
`ZbudujKompa` — możesz je otworzyć i zobaczyć w kontekście. Przykłady bez tego
oznaczenia są ilustracyjne.

---

## Spis treści

1. [Jak w ogóle działa framework webowy](#1-jak-w-ogóle-działa-framework-webowy)
2. [React — fundament pod Next](#2-react--fundament-pod-next)
3. [Next.js — routing przez katalogi](#3-nextjs--routing-przez-katalogi)
4. [Dlaczego katalogi nazywają się `[slug]`](#4-dlaczego-katalogi-nazywają-się-slug)
5. [Server Components kontra Client Components](#5-server-components-kontra-client-components)
6. [Vue i Nuxt — ta sama idea, inne wykonanie](#6-vue-i-nuxt--ta-sama-idea-inne-wykonanie)
7. [React kontra Vue — konkretne różnice](#7-react-kontra-vue--konkretne-różnice)
8. [Next kontra Nuxt — tabela decyzyjna](#8-next-kontra-nuxt--tabela-decyzyjna)
9. [TypeScript — co dokładnie dodaje do JavaScriptu](#9-typescript--co-dokładnie-dodaje-do-javascriptu)
10. [Tailwind CSS — i dlaczego `clamp()` zmienia zasady](#10-tailwind-css--i-dlaczego-clamp-zmienia-zasady)
11. [Prisma — baza danych z typami](#11-prisma--baza-danych-z-typami)
12. [.NET i C# — inny świat, te same problemy](#12-net-i-c--inny-świat-te-same-problemy)
13. [Laravel kontra .NET — porównanie](#13-laravel-kontra-net--porównanie)
14. [Co wybrać do czego](#14-co-wybrać-do-czego)

---

## 1. Jak w ogóle działa framework webowy

Zanim wejdziemy w szczegóły, warto zrozumieć jeden podział, bo z niego wynika
niemal wszystko inne.

### Trzy sposoby dostarczenia strony

**Server-Side Rendering (SSR)** — serwer składa gotowy HTML przy każdym żądaniu.
Tak działa Laravel, klasyczne PHP, Rails, ASP.NET MVC.

```
Przeglądarka:  "daj mi /produkty/123"
Serwer:        pobiera z bazy → wstawia w szablon → zwraca gotowy HTML
Przeglądarka:  wyświetla
```

Zaleta: strona jest gotowa od razu, wyszukiwarki widzą treść.
Wada: każde kliknięcie to nowe żądanie i przeładowanie całej strony.

**Client-Side Rendering (CSR)** — serwer zwraca pustą stronę i paczkę
JavaScriptu, która dopiero buduje interfejs w przeglądarce. Tak działa React
czy Vue bez frameworka nadrzędnego.

```
Przeglądarka:  "daj mi /produkty/123"
Serwer:        zwraca <div id="root"></div> + app.js
Przeglądarka:  uruchamia JS → pobiera dane → rysuje stronę
```

Zaleta: po pierwszym załadowaniu nawigacja jest błyskawiczna, bo zmienia się
tylko fragment strony.
Wada: pierwszy widok to biały ekran, a wyszukiwarka może nie zobaczyć treści.

**Static Site Generation (SSG)** — HTML powstaje raz, przy budowaniu projektu,
i leży na dysku jako gotowe pliki. **Tak działa ten projekt.**

```
Przy budowaniu:  Next generuje 229 plików .html
Przeglądarka:    "daj mi /pl/platformy/am5/"
Serwer:          zwraca gotowy plik z dysku
```

Zaleta: najszybsze możliwe, najtańsze w utrzymaniu (GitHub Pages jest darmowy),
brak serwera do zaatakowania.
Wada: treść zmienia się tylko przy ponownym zbudowaniu — dlatego strona
statyczna nie może pokazywać cen z API sklepu.

> **W tym projekcie:** `next.config.ts` zawiera `output: 'export'`, co włącza
> tryb w pełni statyczny. To jedna linijka, która determinuje bardzo dużo —
> między innymi to, dlaczego czat ma lokalną bazę wiedzy zamiast wołać API.

### Hydratacja — most między SSG a interaktywnością

Statyczny HTML sam z siebie nic nie robi. Żeby przycisk zadziałał, przeglądarka
musi „ożywić" gotowy HTML — podpiąć do niego JavaScript. To nazywa się
**hydratacją** (nawodnieniem).

```
1. Przeglądarka dostaje gotowy HTML  → widać treść natychmiast
2. Ładuje się JavaScript              → wciąż widać treść
3. React "podpina się" do HTML-a      → przyciski zaczynają działać
```

Dlatego strona statyczna może być interaktywna. Kluczowe jest to, że
**krok 1 działa nawet gdy krok 2 nigdy nie nastąpi** — i właśnie dlatego w tym
projekcie animacje pojawiania się są włączane dopiero po dodaniu klasy `js`
przez skrypt. Bez JavaScriptu treść po prostu jest widoczna, zamiast zostać
niewidoczna na zawsze.

---

## 2. React — fundament pod Next

Next.js to nadbudowa nad Reactem, więc najpierw React.

### Komponent to funkcja zwracająca opis interfejsu

```tsx
function Powitanie({ imie }) {
  return <p>Cześć, {imie}!</p>;
}

// Użycie:
<Powitanie imie="Dawid" />;
```

To wygląda jak HTML w JavaScripcie i tak właśnie jest — składnia nazywa się
**JSX**. Nie jest to prawdziwy HTML: narzędzie budujące zamienia to na wywołania
funkcji. Powyższy przykład staje się mniej więcej:

```js
React.createElement('p', null, 'Cześć, ', imie, '!');
```

Dlatego w JSX pisze się `className` zamiast `class` (bo `class` to słowo
kluczowe JavaScriptu) i `onClick` zamiast `onclick`.

### Stan — pamięć komponentu

```tsx
function Licznik() {
  const [ile, setIle] = useState(0);

  return <button onClick={() => setIle(ile + 1)}>Kliknięto {ile} razy</button>;
}
```

`useState` zwraca parę: aktualną wartość i funkcję do jej zmiany. Kiedy
wywołasz `setIle`, React **uruchamia całą funkcję komponentu od nowa** i
porównuje wynik z poprzednim. Różnicę nanosi na prawdziwy DOM.

To jest sedno Reacta i źródło większości nieporozumień: **komponent to nie jest
obiekt, który żyje i zmienia się w czasie. To funkcja, która przeliczana jest
od zera przy każdej zmianie.**

### Dlaczego to ma znaczenie w praktyce

```tsx
// ŹLE — to nie zadziała
function Licznik() {
  let ile = 0;
  return <button onClick={() => ile++}>Kliknięto {ile} razy</button>;
}
```

Zmienna `ile` zostanie utworzona na nowo przy każdym uruchomieniu funkcji, a
React w ogóle nie dowie się, że coś się zmieniło. Stan **musi** przejść przez
`useState`, bo to jest mechanizm, który mówi Reactowi „przelicz mnie".

### Efekty — kontakt ze światem zewnętrznym

```tsx
useEffect(() => {
  document.title = `Kliknięto ${ile} razy`;
}, [ile]); // uruchom ponownie tylko gdy `ile` się zmieni
```

`useEffect` służy do rzeczy, które nie są „obliczaniem interfejsu": zapisywanie
do `localStorage`, nasłuchiwanie zdarzeń, ustawianie tytułu strony. Tablica na
końcu to **lista zależności** — efekt uruchomi się ponownie tylko wtedy, gdy
któraś z nich się zmieni.

> **Z tego projektu** (`src/components/layout/ThemeScript.tsx`) — efekt bez
> tablicy zależności, uruchamiany po każdym renderze. To celowe: motyw trzeba
> przywrócić po każdej nawigacji, nie tylko przy pierwszym wyświetleniu.

---

## 3. Next.js — routing przez katalogi

Największa różnica względem gołego Reacta: **struktura katalogów to struktura
adresów URL.** Nie ma pliku z konfiguracją tras. Katalog _jest_ trasą.

```
src/app/
├── page.tsx                     →  /
├── kontakt/
│   └── page.tsx                 →  /kontakt
└── artykuly/
    ├── page.tsx                 →  /artykuly
    └── [slug]/
        └── page.tsx             →  /artykuly/cokolwiek
```

### Pliki specjalne

Next rozpoznaje kilka nazw plików i traktuje je szczególnie:

| Plik            | Znaczenie                                   |
| --------------- | ------------------------------------------- |
| `page.tsx`      | Zawartość strony pod tym adresem            |
| `layout.tsx`    | Otoczka dla tej trasy i wszystkiego pod nią |
| `loading.tsx`   | Pokazywane, gdy strona się ładuje           |
| `error.tsx`     | Pokazywane, gdy coś rzuci wyjątkiem         |
| `not-found.tsx` | Strona 404                                  |

**Layouty się zagnieżdżają** i to jest ważne. Jeśli masz `app/layout.tsx` i
`app/[locale]/layout.tsx`, to strona pod `/pl/kontakt` będzie owinięta w oba —
najpierw zewnętrzny, potem wewnętrzny.

> **Z tego projektu:** `src/app/layout.tsx` celowo **nie zawiera** `<html>` ani
> `<body>`. Robi to dopiero `src/app/[locale]/layout.tsx`, bo tylko on wie, jaki
> jest język, i może wstawić poprawne `lang="pl"`. Gdyby ustawiać to z poziomu
> JavaScriptu, wyszukiwarki i czytniki ekranu przeczytałyby stronę jako
> anglojęzyczną.

---

## 4. Dlaczego katalogi nazywają się `[slug]`

To pytanie zadałeś wprost, więc rozłóżmy je dokładnie.

### Problem, który to rozwiązuje

Masz 96 podzespołów. Każdy potrzebuje własnej strony. Nie chcesz tworzyć 96
katalogów ręcznie.

**Nawiasy kwadratowe oznaczają: „ten fragment adresu jest zmienną".**

```
src/app/[locale]/platformy/[slug]/page.tsx
                 ↑                ↑
                 |                └── zmienna: am5, am4, lga1851…
                 └── zmienna: pl, en
```

Jeden plik obsługuje wszystkie kombinacje:

```
/pl/platformy/am5       →  locale="pl",  slug="am5"
/pl/platformy/lga1851   →  locale="pl",  slug="lga1851"
/en/platformy/am5       →  locale="en",  slug="am5"
```

### Jak wartość trafia do kodu

> **Z tego projektu** — `src/app/[locale]/platformy/[slug]/page.tsx`:

```tsx
type Params = { locale: string; slug: string };

export default async function SocketPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params; // ← tu wyciągamy wartości z adresu

  if (!isLocale(locale)) notFound(); // /xx/platformy/… → 404

  const socket = getSocket(slug);
  if (!socket) notFound(); // /pl/platformy/wymyslone → 404

  // dalej: renderujemy stronę dla tego konkretnego gniazda
}
```

Zwróć uwagę na dwa sprawdzenia. Nawias kwadratowy dopasuje **cokolwiek**, więc
`/pl/platformy/ajshdkajshd` też trafi do tego pliku. To twój kod decyduje, że
taki adres ma zwrócić 404.

Zauważ też `Promise<Params>` i `await params`. W nowszych wersjach Next
parametry są asynchroniczne — to zmiana z Next 15, która zaskakuje osoby
znające starsze wersje.

### Jak Next wie, które strony wygenerować

Przy stronie statycznej Next musi znać listę adresów **przed** zbudowaniem.
Służy do tego `generateStaticParams`:

> **Z tego projektu:**

```tsx
export function generateStaticParams(): Params[] {
  return locales.flatMap((locale) => sockets.map((socket) => ({ locale, slug: socket.slug })));
}
```

Czytając to od środka: dla każdego języka (`pl`, `en`) weź każde gniazdo i zrób
z tego parę. Wynik to 2 języki × 5 gniazd = **10 stron**, wygenerowanych
automatycznie. Dodasz szóste gniazdo do `sockets.ts` — pojawią się dwie kolejne
strony bez dotykania routingu.

To jest bardzo ładna właściwość: **dane sterują strukturą serwisu**.

### Warianty nawiasów

| Zapis         | Nazwa                | Dopasowuje                          |
| ------------- | -------------------- | ----------------------------------- |
| `[slug]`      | segment dynamiczny   | dokładnie jeden fragment: `/a`      |
| `[...slug]`   | catch-all            | jeden lub więcej: `/a`, `/a/b/c`    |
| `[[...slug]]` | opcjonalny catch-all | również pusty: `/`, `/a/b`          |
| `(grupa)`     | grupa tras           | **nie** pojawia się w adresie       |
| `_katalog`    | katalog prywatny     | całkowicie ignorowany przez routing |

Grupa tras `(nawiasy okrągłe)` jest sprytna: pozwala nadać części stron wspólny
layout bez zmieniania ich adresów.

```
app/
├── (marketing)/
│   ├── layout.tsx        ← layout tylko dla tych dwóch
│   ├── page.tsx          →  /          (nie /marketing)
│   └── cennik/page.tsx   →  /cennik
└── (panel)/
    ├── layout.tsx        ← zupełnie inny layout
    └── ustawienia/page.tsx → /ustawienia
```

---

## 5. Server Components kontra Client Components

To najważniejsza koncepcja w nowoczesnym Next i zarazem najczęstsze źródło
błędów.

### Domyślnie wszystko jest serwerowe

W katalogu `app/` każdy komponent jest **Server Component**, dopóki nie
napiszesz inaczej. Taki komponent:

- wykonuje się **tylko** przy budowaniu (albo na serwerze)
- **nie trafia** do paczki JavaScriptu wysyłanej do przeglądarki
- może być `async` i bezpośrednio czytać pliki albo bazę danych
- **nie może** używać `useState`, `useEffect` ani obsługi zdarzeń

```tsx
// Server Component — bez żadnej dyrektywy
export default async function Strona() {
  const dane = await fetch('https://api.example.com/dane'); // OK
  return <div>{/* … */}</div>;
}
```

### Interaktywność wymaga deklaracji

```tsx
'use client'; // ← ta linijka na samej górze pliku

export function Licznik() {
  const [ile, setIle] = useState(0); // teraz to działa
  return <button onClick={() => setIle(ile + 1)}>{ile}</button>;
}
```

`'use client'` oznacza: „ten plik i wszystko, co importuje, wyślij do
przeglądarki". To granica, nie przełącznik — komponent serwerowy może
renderować komponent kliencki, ale nie odwrotnie.

### Dlaczego to ma znaczenie

> **W tym projekcie:** 33 z 85 komponentów to komponenty klienckie. Pozostałe
> 52 nigdy nie trafiają do przeglądarki — ich kod wykonał się przy budowaniu i
> został zamieniony na gotowy HTML.

To bezpośrednio przekłada się na rozmiar strony. Katalog podzespołów ma 96
pozycji z pełnymi opisami w dwóch językach; gdyby to był komponent kliencki,
cały ten plik musiałby pojechać do przeglądarki. Jako komponent serwerowy —
zostaje na dysku, a użytkownik dostaje tylko wyrenderowany HTML.

### Typowy błąd

```tsx
// ŹLE
export default async function Strona() {
  return <button onClick={() => alert('cześć')}>Kliknij</button>;
  //             ^^^^^^^ Error: Event handlers cannot be passed to Client
  //                     Component props
}
```

Rozwiązanie: wydziel interaktywny fragment do osobnego pliku z `'use client'`,
a resztę zostaw serwerową. To dobra praktyka niezależnie od błędu — trzymasz
interaktywność w małych, wyraźnie oznaczonych wyspach.

---

## 6. Vue i Nuxt — ta sama idea, inne wykonanie

Nuxt jest dla Vue tym, czym Next dla Reacta. Filozofia jest zbieżna,
wykonanie — nie.

### Vue: szablon, logika i style w jednym pliku

```vue
<script setup>
import { ref, computed } from 'vue';

const ile = ref(0);
const podwojone = computed(() => ile.value * 2);
</script>

<template>
  <button @click="ile++">Kliknięto {{ ile }} razy</button>
  <p>Podwojone: {{ podwojone }}</p>
</template>

<style scoped>
button {
  color: cyan;
}
</style>
```

Trzy rzeczy rzucają się w oczy w porównaniu z Reactem:

1. **Szablon jest prawdziwym HTML-em** z dodatkowymi atrybutami (`@click`,
   `{{ }}`), a nie JavaScriptem udającym HTML.
2. **`ile++` po prostu działa.** Nie ma `setIle`.
3. **`<style scoped>`** — style dotyczą tylko tego komponentu, bez żadnej
   dodatkowej biblioteki.

### Reaktywność — najgłębsza różnica

To jest sedno różnicy między Reactem a Vue.

**React** przelicza cały komponent, gdy stan się zmieni, i porównuje wynik z
poprzednim (to nazywa się _virtual DOM diffing_).

**Vue** śledzi, które konkretnie fragmenty szablonu zależą od której zmiennej.
Gdy zmienisz `ile`, Vue wie dokładnie, który węzeł DOM zaktualizować — bez
przeliczania czegokolwiek innego.

```
React:  zmiana stanu → przelicz komponent → porównaj → zaktualizuj różnice
Vue:    zmiana stanu → zaktualizuj dokładnie te węzły, które od niej zależą
```

W praktyce oba są wystarczająco szybkie. Ale różnica tłumaczy, dlaczego w
Reakcie istnieją `useMemo`, `useCallback` i lista zależności — to narzędzia do
ograniczania przeliczeń, których Vue po prostu nie potrzebuje.

### Nuxt: routing przez katalogi, ale inaczej

```
pages/
├── index.vue                →  /
├── kontakt.vue              →  /kontakt
└── artykuly/
    ├── index.vue            →  /artykuly
    └── [slug].vue           →  /artykuly/cokolwiek
```

Podobnie, ale zwróć uwagę na dwie różnice:

- Katalog nazywa się `pages/`, nie `app/`
- Trasa dynamiczna to **plik** `[slug].vue`, a nie katalog `[slug]/page.tsx`

Nuxt ma też **auto-importy**, których Next nie ma:

```vue
<script setup>
// Nie trzeba niczego importować — Nuxt sam znajdzie:
const { data } = await useFetch('/api/produkty');
const router = useRouter();
</script>
```

To wygodne, ale ma cenę: czytając cudzy kod, nie widzisz od razu, skąd pochodzi
dana funkcja. Next wymaga jawnych importów, co jest bardziej rozwlekłe, ale
jednoznaczne.

---

## 7. React kontra Vue — konkretne różnice

| Zagadnienie       | React                                     | Vue                                   |
| ----------------- | ----------------------------------------- | ------------------------------------- |
| Składnia          | JSX — HTML w JavaScripcie                 | Szablon — HTML z atrybutami           |
| Stan              | `const [x, setX] = useState(0)`           | `const x = ref(0)`, potem `x.value`   |
| Zmiana stanu      | `setX(x + 1)`                             | `x.value++`                           |
| Wartość pochodna  | `useMemo(() => a * 2, [a])`               | `computed(() => a.value * 2)`         |
| Efekt uboczny     | `useEffect(fn, [deps])`                   | `watchEffect(fn)` — zależności same   |
| Style lokalne     | biblioteka zewnętrzna albo Tailwind       | `<style scoped>` wbudowane            |
| Warunek           | `{warunek && <p>…</p>}`                   | `<p v-if="warunek">…</p>`             |
| Pętla             | `{lista.map(x => <li key={x.id}>…</li>)}` | `<li v-for="x in lista" :key="x.id">` |
| Klucz przy liście | wymagany, ostrzeżenie gdy brak            | wymagany, ostrzeżenie gdy brak        |

### Ta sama lista w obu

```tsx
// React
{
  produkty.map((produkt) => (
    <li key={produkt.id}>
      {produkt.nazwa} — {produkt.cena} zł
    </li>
  ));
}
```

```vue
<!-- Vue -->
<li v-for="produkt in produkty" :key="produkt.id">
  {{ produkt.nazwa }} — {{ produkt.cena }} zł
</li>
```

### Który wybrać

Szczerze: **oba są dobrymi wyborami** i różnica w możliwościach jest niewielka.
Praktyczne kryteria:

- **React** ma większy rynek pracy i więcej bibliotek. Jeśli uczysz się pod
  zatrudnienie, to ma znaczenie.
- **Vue** jest wyraźnie łatwiejszy na start — szablony są bliższe HTML-owi, a
  reaktywność mniej zaskakuje.
- **React Native** pozwala pisać aplikacje mobilne tą samą składnią. Vue nie ma
  równie dojrzałego odpowiednika.

---

## 8. Next kontra Nuxt — tabela decyzyjna

|                      | Next.js                            | Nuxt                                    |
| -------------------- | ---------------------------------- | --------------------------------------- |
| Bazuje na            | React                              | Vue                                     |
| Katalog tras         | `app/` (nowy) lub `pages/` (stary) | `pages/`                                |
| Trasa dynamiczna     | `[slug]/page.tsx`                  | `[slug].vue`                            |
| Catch-all            | `[...slug]`                        | `[...slug]`                             |
| Komponenty serwerowe | tak, domyślnie                     | tak, przez `<script setup>` na serwerze |
| Auto-importy         | nie                                | tak                                     |
| Eksport statyczny    | `output: 'export'`                 | `nuxt generate`                         |
| Pobieranie danych    | `async` komponent + `fetch`        | `useFetch`, `useAsyncData`              |
| Domyślny bundler     | Turbopack                          | Vite                                    |
| Firma za projektem   | Vercel                             | NuxtLabs                                |

### Ta sama strona w obu

**Next** — `app/produkty/[id]/page.tsx`:

```tsx
export async function generateStaticParams() {
  const produkty = await pobierzProdukty();
  return produkty.map((p) => ({ id: p.id }));
}

export default async function Produkt({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const produkt = await pobierzProdukt(id);
  return <h1>{produkt.nazwa}</h1>;
}
```

**Nuxt** — `pages/produkty/[id].vue`:

```vue
<script setup>
const route = useRoute();
const { data: produkt } = await useFetch(`/api/produkty/${route.params.id}`);
</script>

<template>
  <h1>{{ produkt.nazwa }}</h1>
</template>
```

Zauważ: w Nuxt parametr bierzesz z `useRoute()`, w Next dostajesz go jako
argument funkcji. Drobiazg, ale to typowa różnica — Nuxt daje globalne funkcje
pomocnicze, Next przekazuje rzeczy jawnie.

---

## 9. TypeScript — co dokładnie dodaje do JavaScriptu

### Podstawowa idea

TypeScript to JavaScript **plus adnotacje typów**. Te adnotacje sprawdzane są
przed uruchomieniem i **znikają** przy kompilacji — przeglądarka nigdy ich nie
widzi.

```ts
// JavaScript — działa, ale…
function dodaj(a, b) {
  return a + b;
}
dodaj(2, '3'); // "23" — ups

// TypeScript — błąd przed uruchomieniem
function dodaj(a: number, b: number): number {
  return a + b;
}
dodaj(2, '3'); // Error: Argument of type 'string' is not assignable…
```

### Najważniejsze konstrukcje

**Typ obiektu:**

```ts
type Uzytkownik = {
  id: number;
  imie: string;
  email?: string; // ? = pole opcjonalne
  readonly utworzony: Date; // readonly = nie można zmienić po utworzeniu
};
```

**Unia — „jedno z tych":**

```ts
type Status = 'oczekuje' | 'wyslane' | 'dostarczone';

let s: Status = 'wyslane'; // OK
let z: Status = 'anulowane'; // Error
```

To jest bardzo przydatne. Zamiast stringa, w którym można zrobić literówkę,
masz zbiór dozwolonych wartości, a edytor podpowiada je z listy.

**Typ dyskryminowany** — najpotężniejsza rzecz w TypeScripcie:

> **Z tego projektu** — `src/lib/parts/types.ts`:

```ts
export type Part = Cpu | Motherboard | Ram | Gpu | Storage | Psu | Case | Cooler;
```

Każdy z tych typów ma pole `category` o innej wartości (`'cpu'`,
`'motherboard'`, …). Dzięki temu TypeScript potrafi **zawęzić** typ na
podstawie sprawdzenia:

```ts
function opisz(part: Part) {
  if (part.category === 'cpu') {
    console.log(part.cores); // OK — TS wie, że to Cpu
    console.log(part.vram); // Error — Cpu nie ma vram
  }
  if (part.category === 'gpu') {
    console.log(part.vram); // OK — teraz to Gpu
  }
}
```

To nie jest tylko wygoda. Ta konstrukcja **uniemożliwia** odczytanie pola, które
dla danego typu nie istnieje — klasa błędów, która w JavaScripcie kończy się
`undefined` gdzieś głęboko w interfejsie.

**Generyki — typy z parametrem:**

```ts
function pierwszy<T>(lista: T[]): T | undefined {
  return lista[0];
}

pierwszy([1, 2, 3]); // TS wie: number | undefined
pierwszy(['a', 'b']); // TS wie: string | undefined
```

`T` to zmienna typowa — zostanie podstawiona tym, co faktycznie przekażesz.

**Typy mapowane** — zaawansowane, ale warto zobaczyć realny przykład:

> **Z tego projektu** — `src/i18n/dictionaries/en.ts`:

```ts
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? Widen<Item>[]
    : T extends (...args: infer Args) => infer Return
      ? (...args: Args) => Return
      : { -readonly [Key in keyof T]: Widen<T[Key]> };

export type Dictionary = Widen<typeof en>;
```

Po co to? Słownik angielski jest wzorcem dla polskiego. Gdyby polski musiał mieć
**dokładnie te same wartości**, nie dałoby się go przetłumaczyć. `Widen`
rozszerza konkretne napisy (`'Home'`) do ogólnego `string`, zachowując
**strukturę**. Efekt: jeśli dodasz klucz do angielskiego i zapomnisz o polskim,
projekt się nie zbuduje.

To jest dobry przykład tego, do czego typy naprawdę służą — nie do ozdoby, tylko
do zamiany klasy błędów w błąd kompilacji.

### JavaScript kontra TypeScript — kiedy co

|                     | JavaScript      | TypeScript                |
| ------------------- | --------------- | ------------------------- |
| Start projektu      | szybszy         | wolniejszy (konfiguracja) |
| Mały skrypt         | wystarczy       | narzut                    |
| Duży projekt        | ryzykowny       | wyraźnie bezpieczniejszy  |
| Praca w zespole     | trudniejsza     | typy są dokumentacją      |
| Refaktoryzacja      | ręczne szukanie | edytor znajdzie wszystko  |
| Podpowiedzi edytora | ograniczone     | pełne                     |

Praktyczna rada: **wszystko powyżej jednego pliku pisz w TypeScripcie.** Koszt
jest jednorazowy, korzyść rośnie z każdym tygodniem życia projektu.

---

## 10. Tailwind CSS — i dlaczego `clamp()` zmienia zasady

### Idea: klasy zamiast arkusza stylów

Klasyczne CSS:

```html
<button class="przycisk-glowny">Zapisz</button>
```

```css
.przycisk-glowny {
  display: inline-flex;
  padding: 0.5rem 1rem;
  background: cyan;
  border-radius: 4px;
}
```

Tailwind:

```html
<button class="inline-flex px-4 py-2 bg-cyan-500 rounded">Zapisz</button>
```

Każda klasa robi dokładnie jedną rzecz. Nie wymyślasz nazw, nie przełączasz się
między plikami, i nie boisz się usunąć stylu, bo nic innego z niego nie
korzysta.

Zarzut jest oczywisty i słuszny: **HTML robi się długi.** Odpowiedź jest taka,
że powtarzalne fragmenty wydziela się do komponentu — czyli tam, gdzie i tak
powinny być.

> **Z tego projektu** — `src/components/ui/Button.tsx`:
>
> ```ts
> const base =
>   'inline-flex items-center justify-center rounded-sm font-semibold uppercase tracking-wide ' +
>   'transition-colors focus-ring disabled:pointer-events-none disabled:opacity-50 ' +
>   'whitespace-nowrap';
> ```
>
> Klasy zapisane raz, w jednym miejscu. Każdy przycisk w serwisie ich używa.

### Jak czytać nazwy klas

Tailwind ma system, więc po kilku dniach nazwy stają się przewidywalne:

| Wzorzec   | Znaczenie                          | Przykład                     |
| --------- | ---------------------------------- | ---------------------------- |
| `p-4`     | padding ze wszystkich stron        | `padding: 1rem`              |
| `px-4`    | padding poziomo (x)                | `padding-left/right: 1rem`   |
| `py-2`    | padding pionowo (y)                | `padding-top/bottom: 0.5rem` |
| `pt-4`    | tylko góra (top)                   | `padding-top: 1rem`          |
| `m-4`     | margin, ta sama logika             | `margin: 1rem`               |
| `gap-4`   | odstęp między elementami flex/grid | `gap: 1rem`                  |
| `text-sm` | rozmiar tekstu                     | `font-size: 0.875rem`        |

**Skala liczbowa:** `1` = `0.25rem` = 4px. Więc `p-4` to 16px, `p-8` to 32px.
To celowe — trzymanie się skali daje spójne odstępy w całym serwisie.

**Modyfikatory** dodaje się przedrostkiem z dwukropkiem:

```html
<div class="p-2 md:p-4 lg:p-8 hover:bg-cyan-500 dark:bg-black"></div>
```

Czyta się to tak: padding 2, ale od breakpointa `md` w górę 4, od `lg` w górę 8;
przy najechaniu myszą tło cyan; w trybie ciemnym tło czarne.

**Ważne:** Tailwind jest _mobile-first_. `p-2` obowiązuje od najmniejszego
ekranu, a `md:p-4` **nadpisuje** je dopiero od 768px w górę. Nie odwrotnie.

### Tailwind 4 — konfiguracja przeniesiona do CSS

W wersji 3 konfigurację trzymało się w `tailwind.config.js`. **W wersji 4 —
której używa ten projekt — konfiguruje się w pliku CSS.** Nie ma tu żadnego
`tailwind.config`.

> **Z tego projektu** — `src/app/globals.css`:

```css
@import 'tailwindcss';

@theme {
  --color-brand-500: #06b6d4;
  --radius-sm: 5px;
  --font-sans:
    var(--font-inter), ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}
```

Zdefiniowanie `--color-brand-500` automatycznie tworzy klasy `bg-brand-500`,
`text-brand-500`, `border-brand-500` i tak dalej. Jedna definicja, komplet klas.

Jest też `@theme inline`, którego używam do czegoś sprytniejszego:

```css
@theme inline {
  --color-surface: var(--surface);
  --color-text-primary: var(--text-primary);
}
```

To mówi: „stwórz klasę `bg-surface`, ale niech wskazuje na zmienną
`--surface`". A `--surface` ma **inną wartość w trybie jasnym i ciemnym**.
Efekt: piszesz `bg-surface` raz, a kolor sam dostosowuje się do motywu. Nie ma
`dark:` w kodzie komponentów.

### `clamp()` — płynne skalowanie bez breakpointów

To jest funkcja **czystego CSS**, nie Tailwinda, ale w połączeniu z nim jest
bardzo użyteczna.

```css
padding: clamp(1rem, 5vw, 4rem);
/*    ↑      ↑     ↑
                |      |     └── maksimum: nigdy więcej niż 4rem
                |      └──────── preferowane: 5% szerokości okna
                └─────────────── minimum: nigdy mniej niż 1rem  */
```

Przeglądarka liczy `5vw` i przycina wynik do przedziału `[1rem, 4rem]`.

**Dlaczego to jest lepsze od breakpointów.** Porównaj:

```css
/* Podejście skokowe */
padding: 1rem;
@media (min-width: 768px) {
  padding: 2rem;
}
@media (min-width: 1280px) {
  padding: 4rem;
}
```

```css
/* Podejście płynne */
padding: clamp(1rem, 5vw, 4rem);
```

Pierwsze skacze w trzech punktach — przy 767px masz 1rem, przy 768px nagle 2rem.
Drugie rośnie płynnie i wygląda dobrze przy **każdej** szerokości, także tych,
o których nie pomyślałeś.

**Najczęstsze zastosowanie — typografia:**

```css
h1 {
  font-size: clamp(1.75rem, 1rem + 3vw, 4rem);
}
```

Zwróć uwagę na środkowy argument: `1rem + 3vw`, nie samo `3vw`. To ważne dla
dostępności. Jeśli rozmiar zależy **wyłącznie** od `vw`, to powiększenie tekstu
w przeglądarce nic nie da — `vw` nie reaguje na ustawienia użytkownika.
Dodanie stałej w `rem` sprawia, że tekst nadal się skaluje.

To realna zasada WCAG (kryterium 1.4.4), nie teoria.

**W Tailwindzie** używa się tego przez nawiasy kwadratowe:

```html
<h1 class="text-[clamp(1.75rem,1rem+3vw,4rem)]">Nagłówek</h1>
<section class="p-[clamp(1rem,5vw,4rem)]">…</section>
```

Albo, czyściej, definiując raz w `@theme`:

```css
@theme {
  --text-hero: clamp(1.75rem, 1rem + 3vw, 4rem);
}
```

```html
<h1 class="text-hero">Nagłówek</h1>
```

### Inne funkcje CSS warte znajomości

| Funkcja   | Do czego             | Przykład                          |
| --------- | -------------------- | --------------------------------- |
| `min()`   | weź mniejszą wartość | `width: min(100%, 40rem)`         |
| `max()`   | weź większą          | `font-size: max(1rem, 2vw)`       |
| `clamp()` | ogranicz z obu stron | `padding: clamp(1rem, 5vw, 4rem)` |
| `calc()`  | licz                 | `width: calc(100% - 2rem)`        |
| `var()`   | zmienna              | `color: var(--text-primary)`      |

`min(100%, 40rem)` to bardzo przydatny wzorzec: „szerokość 40rem, ale nigdy
więcej niż mieści się w rodzicu". Zastępuje parę `width` + `max-width`.

### Jednostki — co kiedy

| Jednostka   | Względem czego                  | Kiedy używać              |
| ----------- | ------------------------------- | ------------------------- |
| `px`        | piksel                          | obramowania, cienie       |
| `rem`       | rozmiar bazowy strony           | **prawie wszystko**       |
| `em`        | rozmiar rodzica                 | odstępy zależne od tekstu |
| `%`         | rodzic                          | szerokości                |
| `vw` / `vh` | okno przeglądarki               | sekcje pełnoekranowe      |
| `dvh`       | okno **z paskami przeglądarki** | pełna wysokość na mobile  |

`dvh` to nowość, którą warto znać: `100vh` na telefonie liczy się do pełnej
wysokości ekranu, ignorując pasek adresu — przez co treść ucieka pod niego.
`100dvh` uwzględnia go poprawnie.

> **Z tego projektu:** `min-h-dvh` na `<body>` — dokładnie z tego powodu.

Dlaczego `rem`, a nie `px`? Bo `rem` skaluje się razem z ustawieniem rozmiaru
czcionki w przeglądarce. Panel dostępności w tym projekcie zmienia jedną
wartość — `font-size` na `<html>` — i cały layout rośnie proporcjonalnie,
bo wszystko jest w `rem`. Gdyby odstępy były w `px`, tekst by urósł, a odstępy
zostały, i układ by się rozjechał.

---

## 11. Prisma — baza danych z typami

Prismy nie ma w tym projekcie (strona statyczna nie ma bazy), ale pytałeś, więc
opisuję.

### Problem, który rozwiązuje

Bez ORM-a piszesz SQL jako string:

```js
const wynik = await db.query('SELECT * FROM users WHERE id = ?', [id]);
console.log(wynik.rows[0].emial); // literówka — dowiesz się w produkcji
```

TypeScript nic tu nie pomoże, bo nie ma pojęcia, jakie kolumny ma tabela.

### Jak działa Prisma

Opisujesz bazę w pliku `schema.prisma`:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?              // ? = może być null
  posts     Post[]               // relacja jeden-do-wielu
  createdAt DateTime @default(now())
}

model Post {
  id       Int     @id @default(autoincrement())
  title    String
  content  String?
  author   User    @relation(fields: [authorId], references: [id])
  authorId Int
}
```

Uruchamiasz `npx prisma generate` i Prisma **generuje klienta z typami** na
podstawie tego pliku:

```ts
const user = await prisma.user.findUnique({
  where: { email: 'ktos@example.com' },
  include: { posts: true },
});

user.name; // string | null — TS wie, że może być null
user.posts[0].title; // string — TS zna kształt relacji
user.emial; // Error: Property 'emial' does not exist
```

**To jest cała wartość Prismy.** Schemat bazy staje się typami TypeScriptu, więc
literówka w nazwie kolumny to błąd kompilacji, a nie awaria w nocy.

### Migracje

```bash
npx prisma migrate dev --name dodaj_pole_telefon
```

Prisma porównuje schemat z bazą, generuje plik SQL z różnicą i zapisuje go w
repozytorium. Historia zmian bazy leży obok kodu i wersjonuje się razem z nim.

### Prisma kontra alternatywy

|                         | Prisma            | TypeORM             | Drizzle           | Surowy SQL |
| ----------------------- | ----------------- | ------------------- | ----------------- | ---------- |
| Typy                    | generowane, pełne | dekoratory, słabsze | generowane, pełne | brak       |
| Nauka                   | łatwa             | średnia             | średnia           | znasz SQL  |
| Kontrola nad zapytaniem | ograniczona       | średnia             | pełna             | pełna      |
| Rozmiar w bundlu        | duży              | duży                | mały              | zerowy     |
| Migracje                | wbudowane         | wbudowane           | wbudowane         | ręcznie    |

Prisma jest najwygodniejsza na start. Drizzle wybiera się, gdy zależy ci na
kontroli nad generowanym SQL-em albo na rozmiarze paczki.

---

## 12. .NET i C# — inny świat, te same problemy

### Czym jest .NET

Rozróżnienie, które myli na początku:

- **C#** — język programowania
- **.NET** — platforma: maszyna wykonawcza, biblioteka standardowa, narzędzia
- **ASP.NET Core** — framework webowy działający na .NET

To jak Java (język) / JVM (platforma) / Spring (framework).

### C# w pigułce dla kogoś z JavaScriptu

```csharp
// Typy są obowiązkowe i sprawdzane przy kompilacji
int wiek = 30;
string imie = "Dawid";
var lista = new List<string>();   // var = wywnioskuj typ, nadal statyczny

// Klasa z właściwościami
public class Uzytkownik
{
    public int Id { get; set; }
    public string Imie { get; set; } = "";
    public string? Email { get; set; }     // ? = może być null
}

// Metoda asynchroniczna — bardzo podobnie do JS
public async Task<Uzytkownik?> PobierzAsync(int id)
{
    return await _db.Uzytkownicy.FindAsync(id);
}
```

Różnice względem TypeScriptu, które zauważysz od razu:

1. **Typy istnieją w czasie wykonania.** W TypeScripcie znikają po kompilacji;
   w C# są realną częścią programu — możesz zapytać obiekt o jego typ.
2. **Kompilacja jest obowiązkowa.** Nie ma „uruchom mimo błędów typów".
3. **Konwencja nazw:** metody i właściwości pisze się `WielkąLiterą`
   (PascalCase), nie `małą` (camelCase).
4. **Wszystko jest w klasie.** Nie ma luźnych funkcji na poziomie pliku
   (poza `top-level statements` w `Program.cs`).

### Jak wygląda aplikacja webowa

**Minimal API** — najprostszy wariant, dobry do małych usług:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();
var app = builder.Build();

app.MapGet("/produkty", async (AppDbContext db) =>
    await db.Produkty.ToListAsync());

app.MapGet("/produkty/{id}", async (int id, AppDbContext db) =>
    await db.Produkty.FindAsync(id) is Produkt p
        ? Results.Ok(p)
        : Results.NotFound());

app.Run();
```

**Kontrolery** — wariant klasyczny, przy większych projektach:

```csharp
[ApiController]
[Route("api/[controller]")]
public class ProduktyController : ControllerBase
{
    private readonly AppDbContext _db;

    // Wstrzykiwanie zależności przez konstruktor
    public ProduktyController(AppDbContext db) => _db = db;

    [HttpGet("{id}")]
    public async Task<ActionResult<Produkt>> Pobierz(int id)
    {
        var produkt = await _db.Produkty.FindAsync(id);
        return produkt is null ? NotFound() : Ok(produkt);
    }
}
```

### Wstrzykiwanie zależności — centralna idea .NET

To jest rzecz, która najbardziej odróżnia .NET od Laravela czy Expressa w
codziennej pracy.

Zamiast tworzyć obiekty samodzielnie:

```csharp
// Tak się NIE robi w .NET
var db = new AppDbContext("connection string...");
```

**rejestrujesz** je raz, a framework dostarcza je tam, gdzie są potrzebne:

```csharp
// Rejestracja — Program.cs
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseNpgsql(connectionString));
builder.Services.AddScoped<IEmailService, SmtpEmailService>();
builder.Services.AddSingleton<ICacheService, RedisCache>();
```

```csharp
// Użycie — kontener sam podstawia zależności
public ProduktyController(AppDbContext db, IEmailService email)
{
    _db = db;
    _email = email;
}
```

**Trzy cykle życia, które trzeba znać:**

| Metoda         | Ile instancji           | Kiedy używać              |
| -------------- | ----------------------- | ------------------------- |
| `AddSingleton` | jedna na całą aplikację | cache, konfiguracja       |
| `AddScoped`    | jedna na żądanie HTTP   | połączenie z bazą         |
| `AddTransient` | nowa przy każdym użyciu | lekkie, bezstanowe usługi |

Wybór ma znaczenie: zarejestrowanie kontekstu bazy jako `Singleton` w aplikacji
webowej to klasyczny błąd prowadzący do trudnych do namierzenia awarii przy
równoczesnych żądaniach.

**Po co ta cała ceremonia?** Bo `IEmailService` to interfejs. W testach
podstawiasz atrapę zamiast prawdziwego SMTP, nie zmieniając ani linijki w
kontrolerze. To jest cała idea — kod zależy od _interfejsu_, nie od konkretnej
implementacji.

### Entity Framework — ORM .NET

```csharp
public class AppDbContext : DbContext
{
    public DbSet<Produkt> Produkty { get; set; }
    public DbSet<Kategoria> Kategorie { get; set; }
}

// Zapytania pisze się w LINQ — składni zapytań wbudowanej w język
var drogie = await _db.Produkty
    .Where(p => p.Cena > 1000)
    .OrderByDescending(p => p.Cena)
    .Include(p => p.Kategoria)      // dołącz relację
    .Take(10)
    .ToListAsync();
```

LINQ jest sprawdzany przez kompilator. Literówka w `p.Cenna` to błąd budowania,
a nie wyjątek w czasie działania. To ta sama korzyść, którą daje Prisma — tylko
wbudowana w język, a nie doklejona narzędziem.

---

## 13. Laravel kontra .NET — porównanie

Oba robią to samo. Różnią się filozofią.

### Ten sam endpoint w obu

**Laravel (PHP):**

```php
// routes/api.php
Route::get('/produkty/{id}', [ProduktController::class, 'show']);

// app/Http/Controllers/ProduktController.php
class ProduktController extends Controller
{
    public function show($id)
    {
        $produkt = Produkt::with('kategoria')->findOrFail($id);
        return response()->json($produkt);
    }
}
```

**.NET (C#):**

```csharp
[HttpGet("{id}")]
public async Task<ActionResult<Produkt>> Show(int id)
{
    var produkt = await _db.Produkty
        .Include(p => p.Kategoria)
        .FirstOrDefaultAsync(p => p.Id == id);

    return produkt is null ? NotFound() : Ok(produkt);
}
```

Laravel jest krótszy. `Produkt::with(...)` to metoda statyczna na modelu —
model sam wie, jak się pobrać z bazy (wzorzec Active Record). W .NET model to
zwykła klasa z danymi, a pobieranie należy do kontekstu bazy (wzorzec
Data Mapper).

### Tabela różnic

|                          | Laravel                        | ASP.NET Core                |
| ------------------------ | ------------------------------ | --------------------------- |
| Język                    | PHP (dynamiczny)               | C# (statyczny)              |
| Typowanie                | opcjonalne, słabe              | obowiązkowe, mocne          |
| ORM                      | Eloquent (Active Record)       | EF Core (Data Mapper)       |
| Zapytania                | `Produkt::where(...)`          | `_db.Produkty.Where(...)`   |
| Wstrzykiwanie zależności | jest, ale mniej centralne      | fundament architektury      |
| Kompilacja               | brak                           | obowiązkowa                 |
| Szybkość działania       | dobra                          | wyraźnie wyższa             |
| Szybkość pisania         | wyższa na start                | wolniejsza na start         |
| Konwencja                | „konwencja ponad konfigurację" | jawność ponad magię         |
| Hosting                  | tani, wszędzie                 | droższy, ale Linux już OK   |
| Migracje                 | `php artisan migrate`          | `dotnet ef database update` |
| Testy                    | PHPUnit, Pest                  | xUnit, NUnit                |

### Magia kontra jawność — najgłębsza różnica

**Laravel** stawia na wygodę. Fasady, „magiczne" metody, konwencje:

```php
// Skąd Laravel wie, że User to tabela `users`? Z konwencji.
$user = User::find(1);
$user->posts;   // relacja pobierana leniwie, automatycznie
```

To jest bardzo szybkie w pisaniu. Cena: gdy coś nie działa, trudniej dojść
dlaczego, bo dużo dzieje się niejawnie.

**.NET** stawia na jawność. Wszystko jest zarejestrowane, zadeklarowane, typowane:

```csharp
// Widać dokładnie skąd bierze się kontekst i co dołączamy
var user = await _db.Users
    .Include(u => u.Posts)
    .FirstOrDefaultAsync(u => u.Id == 1);
```

Więcej pisania. Za to edytor podpowiada każdy krok, refaktoryzacja jest
bezpieczna, a błąd zwykle wychodzi przy kompilacji.

### Kiedy co wybrać

**Laravel**, gdy: budujesz szybko, zespół zna PHP, hosting ma być tani, projekt
to typowa aplikacja CRUD albo sklep.

**.NET**, gdy: projekt jest duży i długoterminowy, wydajność ma znaczenie,
pracujesz w środowisku korporacyjnym, albo zespół ceni bezpieczeństwo typów.

Szczerze: **oba są dojrzałe i oba uniosą poważny projekt.** Wybór częściej
zależy od zespołu i kontekstu niż od technicznej przewagi.

---

## 14. Co wybrać do czego

### Strona z treścią, blog, dokumentacja

**Next albo Nuxt ze statycznym eksportem.** Tak jak ten projekt. Hosting za
darmo, najszybsze możliwe działanie, brak serwera do utrzymania.

### Aplikacja z logowaniem i bazą danych

**Next z API Routes + Prisma**, albo **Laravel**, albo **ASP.NET Core**. Wybór
zależy od zespołu — wszystkie trzy działają.

### Aplikacja czasu rzeczywistego (czat, powiadomienia)

Potrzebujesz serwera trzymającego połączenia. **Node z Socket.io**,
**.NET z SignalR** albo **Laravel z Reverb**. Strona statyczna tego nie zrobi.

### Panel administracyjny wewnątrz firmy

SEO nie ma znaczenia, więc czysty **React albo Vue** bez frameworka
nadrzędnego jest w porządku i prostszy.

### Sklep internetowy

**Laravel** ma gotowe rozwiązania i największy ekosystem sklepowy w PHP.
**Next** z headless commerce, jeśli zależy ci na wydajności frontu.

---

## Podsumowanie — najkrótsze możliwe

| Technologia    | Jednym zdaniem                                                                              |
| -------------- | ------------------------------------------------------------------------------------------- |
| **React**      | Biblioteka do budowania interfejsu z funkcji; przelicza komponent przy każdej zmianie stanu |
| **Vue**        | To samo, ale ze śledzeniem zależności zamiast przeliczania i z szablonami zamiast JSX       |
| **Next**       | React plus routing przez katalogi, renderowanie serwerowe i eksport statyczny               |
| **Nuxt**       | To samo dla Vue, z auto-importami                                                           |
| **`[slug]`**   | Nawias oznacza zmienny fragment adresu; jeden plik obsługuje wiele stron                    |
| **TypeScript** | JavaScript z typami sprawdzanymi przed uruchomieniem; znikają po kompilacji                 |
| **Tailwind**   | Style jako pojedyncze klasy; konfiguracja w CSS od wersji 4                                 |
| **`clamp()`**  | Płynne skalowanie między minimum a maksimum, bez breakpointów                               |
| **Prisma**     | Schemat bazy zamieniony na typy TypeScriptu                                                 |
| **C# / .NET**  | Język statyczny plus platforma, z wstrzykiwaniem zależności jako fundamentem                |
| **Laravel**    | PHP z naciskiem na szybkość pisania i konwencje                                             |

---

## Gdzie szukać dalej

- [Next.js — dokumentacja](https://nextjs.org/docs) — bardzo dobra, z interaktywnym kursem
- [Nuxt — dokumentacja](https://nuxt.com/docs)
- [React — nowa dokumentacja](https://react.dev) — przepisana w 2023, znacznie lepsza od starej
- [Vue — dokumentacja](https://vuejs.org/guide/introduction.html)
- [TypeScript — podręcznik](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Tailwind — dokumentacja](https://tailwindcss.com/docs)
- [MDN — `clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)
- [Prisma — dokumentacja](https://www.prisma.io/docs)
- [Microsoft Learn — ASP.NET Core](https://learn.microsoft.com/aspnet/core)
- [Laravel — dokumentacja](https://laravel.com/docs)

Najlepszy sposób nauki tego wszystkiego: **otwórz ten projekt i zmień coś.**
Dodaj gniazdo do `src/lib/sockets.ts` i zobacz, jak pojawia się w menu, w
sitemapie i jako nowa strona. To pokazuje więcej niż jakikolwiek opis.
