# Portfolio-web — plan modernizacji

> **Cel:** zamienić obecne portfolio w profesjonalną stronę-wizytówkę, która:
> 1. **sprzedaje usługi** klientom w dwóch filarach: **Kreacja wideo** (nagrywanie, montaż, grafiki, animacje) oraz **IT** (strony www, aplikacje webowe, projektowanie UI/UX, automatyzacje),
> 2. **pokazuje kompetencje pracodawcom/rekruterom** (stack, projekty, doświadczenie, certyfikaty, CV do pobrania).
>
> Ostatnia aktualizacja: 2026-11-22

---

## 1. Analiza obecnego stanu

### Stack
| Obszar | Technologia |
|---|---|
| Framework | React 18 + TypeScript 5.6 + Vite 7 (SWC) |
| Stylowanie | Tailwind CSS 3 (własna paleta: `bg_color_1/2`, `main_accent #74FAC8`), font Playfair Display |
| Animacje | framer-motion 12, keyframes Tailwind (float, tada, blink) |
| Routing | react-router-dom 7 (`BrowserRouter`) |
| i18n | i18next + react-i18next + language detector (PL/EN, pliki w `src/translations/`) |
| Formularz | EmailJS (`@emailjs/browser`) + canvas-confetti |
| Slider | Swiper (opinie) |
| Ikony | boxicons, react-icons, **Font Awesome (niezaładowany w źródłach!)** |
| Deploy | `gh-pages -d dist` → https://jacekkozlowski.github.io (gałąź `gh-pages`) |

### Struktura
```
src/
  App.tsx                 # routing: /, /about, /web-apps, /social-video
  pages/MainPage.tsx      # Home, About, MySkills, Projects, TheyTrustedMe, Contact (Services zakomentowane)
  pages/AboutSubSite.tsx, WebAppsSubSite.tsx, VideoMarketingSubSite.tsx
  pages/sections/*        # sekcje strony głównej
  components/             # 4 prawie identyczne Header*.tsx, Footer, FormContact, ImageSlider, Modal
  translations/pl.json, en.json
```

### Mocne strony
- Dobry fundament technologiczny (Vite + TS + Tailwind), dwujęzyczność.
- Prawdziwe opinie klientów i realne projekty (AureliaHR, GPSMaker, NoEscapeCursor, web scraping).
- Treści o procesie współpracy (web) i ofercie wideo są już napisane — da się je przerobić.

### Problemy znalezione w kodzie

**Krytyczne / bugi**
- [ ] **`.env` jest commitowany do repo** (mimo wpisu w `.gitignore` — był dodany wcześniej).
- [ ] **Font Awesome nie jest ładowany w `index.html`** — jest tylko w starym buildzie na `gh-pages`. Następny deploy zgubi ikony (menu mobilne, skille, stopka, usługi).
- [ ] **29 błędów TypeScript** (`tsc --noEmit`) — głównie typowanie `Variants` we framer-motion (`ease: number[]`), nietypowane `useRef()` w `FormContact`.
- [ ] Odświeżenie podstrony (`/about`, `/web-apps`) na GitHub Pages zwraca **404** (brak fallbacku SPA).
- [ ] Favicon wskazuje na `/src/assets/img/MainPhoto.png` — w buildzie nie istnieje.
- [ ] Klucz tłumaczenia `projects.aureliah` vs `projects.aureliahr` w JSON → pusty opis AureliaHR.
- [ ] `useEffect` bez tablicy zależności w podstronach (`window.scrollTo` przy każdym renderze).
- [ ] Linki-placeholdery `href="#"` (YouTube, Discord, „kawa”, projekty „Cooking”), `target="_blank"` bez `rel="noopener noreferrer"`.
- [ ] Brak obsługi błędów w formularzu (tylko `console.log`), brak stanu „wysyłanie”.
- [ ] `<html lang="en">` przy domyślnym języku PL; literówki („Skontaktuj się **za** mną”, „realizacaj”, „Gameing”).

**Porządek w repo**
- [ ] W `master` są zacommitowane artefakty buildu: `assets/`, `.vite/`, `translations/`, `Certyfikaty/`, `vite.svg` w katalogu głównym.
- [ ] Zduplikowane tłumaczenia `public/translations/*` (nieużywane — i18n importuje z `src/translations`).
- [ ] Nieużywane / błędnie dodane zależności: `jsonwebtoken`, `jws`, `intl-tel-input`, `i18next-http-backend`, `clsx`, `brace-expansion`, `picomatch`, `rollup`, `@eslint/*` w `dependencies`, `react-router` obok `react-router-dom`; `gh-pages` powinien być w `devDependencies`.
- [ ] `README.md` to szablon Vite.
- [ ] Dwie gałęzie główne (`main` i `master`) — warto ujednolicić na `main`.

**Jakość kodu**
- [ ] 4 skopiowane komponenty `Header*` (~116 linii każdy), `fadeInVariants` skopiowane w ~8 plikach.
- [ ] Projekty, skille i opinie zahardkodowane w JSX zamiast w danych.
- [ ] `VideoMarketingSubSite.tsx` eksportuje komponent nazwany `WebAppsSubSite`.
- [ ] Obrazy 0,6–1,6 MB (PNG/JPG/JFIF) — brak WebP/AVIF, brak `loading="lazy"`.
- [ ] Animacje `duration: 2s` + `once: false` — wszystko „wjeżdża” przy każdym przewinięciu, brak `prefers-reduced-motion`.
- [ ] `select-none` na całej stronie (nie da się skopiować maila/tekstu), brak `alt` na obrazach.

**Wizerunek / UX (dlaczego strona wygląda „amatorsko”)**
- Komunikat rozmyty: hero wymienia 5 ról (YouTuber, Marketing Specialist…) — klient nie wie, *co konkretnie kupuje*, rekruter — *na jakie stanowisko aplikujesz*.
- Brak sekcji usług (zakomentowana), brak oferty/pakietów, brak portfolio wideo/grafik/animacji (a to połowa oferty!).
- Brak ścieżki dla rekrutera: CV, doświadczenie, stack, GitHub w jednym miejscu.
- Emoji w treściach, długie akapity, Playfair (szeryf) w całym UI, neonowy glow — styl „hobby”, nie „studio”.
- Brak SEO (meta, OG, sitemap), brak social proof w hero (logotypy klientów).

---

## 2. Docelowa koncepcja

### Pozycjonowanie
> **Jacek Kozłowski — Developer & Video Creator**
> *Tworzę strony, aplikacje i treści wideo, które pracują na Twój biznes.*

Dwa filary oferty + jedna ścieżka kariery:

| Filar | Zakres |
|---|---|
| 🎬 **Kreacja wideo** | Nagrywanie, montaż (reklamy, vlogi, gaming, rolki), grafiki (miniatury, social media, identyfikacja), animacje / motion design |
| 💻 **IT** | Strony www, aplikacje webowe (React/Django), projektowanie UI/UX (Figma), automatyzacje (Python) |
| 👔 **Dla pracodawców** | Profil zawodowy, stack, doświadczenie, projekty z kodem, certyfikaty, CV PDF |

### Mapa strony (nowa architektura informacji)
```
/                       Strona główna (oba filary + skrót dla rekrutera)
/uslugi/wideo           Kreacja wideo: nagrywanie, montaż, grafiki, animacje
/uslugi/web             IT: strony, aplikacje, UI/UX, automatyzacje
/portfolio              Wszystkie realizacje z filtrami (Wideo / Grafika / Animacja / Strony / Aplikacje / Automatyzacje)
/portfolio/:slug        Case study
/dla-pracodawcow        CV online + pobranie PDF
/o-mnie                 Historia, wartości, po godzinach
/kontakt                Formularz z wyborem tematu
*                       404
```
(stare adresy `/about`, `/web-apps`, `/social-video` → przekierowania)

### Strona główna — sekcje
1. **Hero** — jasny nagłówek, 1 zdanie wartości, 2 CTA: *„Zobacz ofertę”* i *„Jestem rekruterem →”*, zdjęcie / krótka pętla showreela.
2. **Pasek zaufania** — logotypy klientów (Serwis Gąsiorek, Grupa DeGie…) + liczby (np. „X zrealizowanych projektów”, „3 kanały YT w 3 językach”).
3. **Usługi** — 2 duże karty filarów → podstrony.
4. **Wybrane realizacje** — 4–6 najlepszych prac (mix wideo + web) → `/portfolio`.
5. **Jak pracuję** — 4–5 kroków (rozmowa → projekt → realizacja → prezentacja → wsparcie).
6. **Opinie** — slider/siatka z prawdziwymi rekomendacjami.
7. **Dla pracodawców (teaser)** — stack w ikonach + przycisk „Pobierz CV” / „Zobacz profil”.
8. **CTA + kontakt**.

### Kierunek wizualny
- Ciemny, stonowany motyw (grafit/granat) + **jeden akcent** (zachowany miętowy `#74FAC8` lub bardziej stonowany wariant) — bez neonowego glow.
- Typografia: bezszeryfowa do UI i treści (np. **Inter** / **Manrope**), opcjonalnie wyrazisty display font do nagłówków.
- Siatka 12-kolumnowa, kontener `max-w-7xl`, duże odstępy, krótkie akapity, listy zamiast ścian tekstu.
- Animacje subtelne: 0.4–0.6 s, `once: true`, respektowanie `prefers-reduced-motion`.
- Emoji tylko sporadycznie; ikony z jednej biblioteki (`react-icons` / `lucide-react`).

---

## 3. Do przygotowania przez Ciebie (treści, których kod nie wymyśli)

- [ ] **Showreel** wideo (YouTube/Vimeo, 60–90 s) + 6–12 linków do najlepszych realizacji wideo, grafik i animacji (z miniaturami).
- [ ] **CV w PDF** (PL i EN) → `public/cv/`.
- [ ] Decyzja o **cenach** („od X zł”) lub tylko „wycena indywidualna” + 2–3 pakiety na filar.
- [ ] Doświadczenie zawodowe (firma, stanowisko, daty, 2–3 osiągnięcia z liczbami).
- [ ] Prawdziwe linki: YouTube, Discord (lub usunąć), GitHub, LinkedIn, ewentualnie Calendly.
- [ ] Logo/monogram osobisty (opcjonalnie) i zdjęcie w lepszej jakości (profesjonalne portretowe).
- [ ] Zgoda klientów na użycie logotypów i opinii.
- [ ] Zdjęcia/zrzuty ekranu realizacji web (strony dla klientów).
- [ ] Docelowe teksty i grafiki podstrony wideo (`/social-video`) — dziś wszystkie sekcje mają zastępcze zdjęcia `Photo_about` / `PixelAvatarWEB`; to samo dotyczy podstrony `/web-apps`.
- [ ] Opisy usług (dawna sekcja Services, klucze `services.*`) o porównywalnej długości w PL i EN, żeby kafelki nie rozjeżdżały się przy zmianie języka.

---

## 4. Etapy wdrożenia z promptami dla Claude Code

> **Zasady dla każdego etapu**
> - Pracuj na osobnej gałęzi: `git checkout -b <typ>/<nazwa>` (np. `chore/repo-cleanup`), po etapie merge do `main`.
> - Każdy etap kończy się zielonym: `npm run lint`, `npx tsc -p tsconfig.app.json --noEmit`, `npm run build`.
> - Commity w konwencji **Conventional Commits**:
>   - `feat:` nowa funkcjonalność
>   - `fix:` naprawa błędu
>   - `refactor:` zmiana kodu bez zmiany działania
>   - `style:` formatowanie / wygląd bez zmiany logiki
>   - `chore:` zadania techniczne, konfiguracja, zależności
>   - `docs:` dokumentacja · `perf:` wydajność · `test:` testy · `ci:` pipeline
> - Po każdym etapie odhacz checkboxy w tym pliku.

---

### Etap 0 — Porządki w repozytorium i zależnościach `chore`
**Status:** ⬜ do zrobienia

- [ ] Usunięcie artefaktów buildu z repo (`assets/`, `.vite/`, `translations/`, `Certyfikaty/`, `vite.svg` w root)
- [ ] `.env` usunięty ze śledzenia + `.env.example`
- [ ] Sprzątanie zależności
- [ ] Nowy `README.md` i `CLAUDE.md`

```text
Przeanalizuj repozytorium Portfolio-web (React + TS + Vite + Tailwind) i zrób porządki techniczne, NIE zmieniając wyglądu ani działania strony:

1. Usuń ze śledzenia gita artefakty buildu w katalogu głównym: assets/, .vite/, translations/, Certyfikaty/, vite.svg (zostają tylko wersje w src/ i public/). Upewnij się, że .gitignore zawiera dist, .vite, node_modules.
2. Usuń .env ze śledzenia (git rm --cached .env), zostaw lokalny plik. Utwórz .env.example z kluczami VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY bez wartości.
3. Sprawdź, czy public/translations/*.json są gdziekolwiek używane — jeśli nie, usuń je (źródłem prawdy jest src/translations).
4. Wyczyść package.json: usuń nieużywane paczki (sprawdź grepem przed usunięciem): jsonwebtoken, jws, intl-tel-input (oraz jego import CSS w index.css i FormContact.tsx), i18next-http-backend, clsx, brace-expansion, picomatch, rollup, @eslint/config-array, @eslint/eslintrc, react-router (zostaje react-router-dom). Przenieś gh-pages do devDependencies. Zmień "name"/"version" na sensowne (np. 1.0.0). Usuń zbędne "overrides" jeśli nie są już potrzebne. Uruchom npm install i npm audit.
5. Usuń nieużywany import `transform` z tailwind.config.js.
6. Zastąp README.md prawdziwym opisem projektu: cel strony, stack, uruchomienie (npm i, npm run dev), zmienne środowiskowe, deploy, struktura katalogów, link do ROADMAP.md.
7. Utwórz CLAUDE.md z krótkimi zasadami projektu: stack, komendy (dev/build/lint/typecheck), konwencja Conventional Commits, tłumaczenia zawsze w PL i EN, Tailwind zamiast CSS inline, dane w src/data.

Na koniec uruchom npm run build i potwierdź, że działa. Pokaż mi listę usuniętych plików i paczek.

Zrób commity (osobno dla każdej logicznej zmiany):
- chore: remove committed build artifacts from repository root
- chore: stop tracking .env and add .env.example
- chore: remove unused dependencies and move gh-pages to devDependencies
- docs: rewrite README and add CLAUDE.md
```

---

### Etap 1 — Naprawa błędów `fix`
**Status:** ⬜ do zrobienia

- [ ] 0 błędów TypeScript
- [ ] Ikony działają bez Font Awesome z CDN
- [ ] Odświeżanie podstron na GitHub Pages
- [ ] Favicon, `lang`, literówki, klucze tłumaczeń, linki

```text
Napraw istniejące błędy w projekcie Portfolio-web bez przebudowy designu:

1. Doprowadź `npx tsc -p tsconfig.app.json --noEmit` do 0 błędów. Główna przyczyna: obiekty fadeInVariants nie są typowane jako `Variants` z framer-motion (ease: number[] → użyj krotki `[0.9, 0, 0.2, 1] as const` lub typu `Variants`). Otypuj też useRef w FormContact.tsx (HTMLFormElement, HTMLInputElement) i event w sendEmail, popraw typy useState w ImageSlider.tsx.
2. Font Awesome jest używany (fa-solid fa-bars, fa-xmark, fa-caret-up, fa-laptop-code, ikony w MySkills itd.), ale NIE jest załadowany w index.html. Zastąp wszystkie ikony Font Awesome odpowiednikami z react-icons (już zainstalowane), żeby nie zależeć od CDN.
3. GitHub Pages: dodaj fallback SPA — skrypt "postbuild" kopiujący dist/index.html do dist/404.html, aby odświeżenie /about, /web-apps, /social-video nie dawało 404. Sprawdź, czy `base: './'` w vite.config.ts nie psuje zagnieżdżonych ścieżek — dla strony użytkownika (jacekkozlowski.github.io) ustaw base: '/'.
4. index.html: popraw favicon (przenieś ikonę do public/ i wskaż /favicon.png), ustaw lang="pl", dodaj podstawowy meta description.
5. Klucz tłumaczenia: w Projects.tsx jest t("projects.aureliah"), a w JSON "aureliahr" — ujednolić. Przejrzyj wszystkie wywołania t() i sprawdź skryptem, czy każdy klucz istnieje w pl.json i en.json; wypisz brakujące i je uzupełnij.
6. Literówki w pl.json/en.json: "Skontaktuj się za mną" → "ze mną", "realizacaj" → "realizacja", "Gameing" → "Gaming", "wykorzystywujący" → "wykorzystujący", "aplikcję" → "aplikację", "największaj ilości potecjalnych" → "największej liczby potencjalnych".
7. Podstrony: useEffect(() => window.scrollTo(0,0)) bez tablicy zależności → dodaj []. (AutoScroll już to robi — rozważ usunięcie duplikatu.)
8. Linki: wszystkie target="_blank" mają mieć rel="noopener noreferrer"; link NoEscapeCursor otwieraj w nowej karcie; linki href="#" (YouTube, Discord, coffee, Cooking) — ukryj, dopóki nie podam prawdziwych adresów (zostaw TODO w danych).
9. Usuń `select-none` z głównego wrappera w MainPage.tsx (uniemożliwia kopiowanie tekstu).
10. FormContact: usuń console.log, dodaj stan wysyłania (disabled przycisk) i komunikat błędu dla użytkownika (z tłumaczeniem PL/EN).

Po zmianach: npm run lint, typecheck, build — wszystko zielone. Uruchom dev server i sprawdź w przeglądarce, że ikony i podstrony działają.

Zrób commity:
- fix: resolve TypeScript errors in animation variants and contact form
- fix: replace unloaded Font Awesome icons with react-icons
- fix: add SPA fallback for GitHub Pages and correct vite base path
- fix: correct favicon path, html lang and meta description
- fix: correct translation keys and typos
- fix: add rel noopener to external links and hide placeholder links
- fix: add loading and error states to contact form
```

---

### Etap 2 — Refaktoryzacja architektury `refactor`
**Status:** ✅ zrobione (2026-11-22)

- [x] Jeden komponent `Header` z konfiguracją
- [x] Wspólne animacje w `src/lib/animations.ts`
- [x] Dane w `src/data/*`
- [x] Komponenty bazowe UI

```text
Zrefaktoryzuj kod Portfolio-web BEZ zmiany wyglądu i działania (wynik ma wyglądać identycznie):

1. Utwórz src/lib/animations.ts z otypowaną funkcją fadeIn(direction) zwracającą Variants i usuń wszystkie lokalne kopie fadeInVariants z sekcji i podstron.
2. Połącz HeaderMain, HeaderAbout, HeaderWebApps, HeaderVideos w jeden komponent src/components/layout/Header.tsx przyjmujący listę linków (id sekcji + klucz tłumaczenia) i tryb (scroll do sekcji vs nawigacja). Wydziel LanguageSwitcher.tsx. Zamiast flag z zewnętrznych URL-i (wikimedia, flaticon) użyj prostego przełącznika tekstowego "PL / EN" albo lokalnych ikon.
3. Utwórz src/components/layout/Layout.tsx (Header + <Outlet/> + Footer) i użyj go w routingu.
4. Przenieś dane do plików TypeScript z typami:
   - src/data/projects.ts (id, slug, title, category, image, descriptionKey, tech[], links {github, live})
   - src/data/skills.ts
   - src/data/testimonials.ts
   - src/data/socials.ts
   Sekcje mają renderować listy przez .map() zamiast powielonego JSX.
5. MySkills.tsx: zamień 6 osobnych useState na jeden stan `openSkill: string | null`.
6. Utwórz bazowe komponenty UI w src/components/ui/: Section (id, tło, padding), Container, SectionHeading (tytuł + akcent), Button (variant: primary/secondary/ghost, jako <a>, <Link> lub <button>).
7. Popraw nazewnictwo: plik VideoMarketingSubSite.tsx eksportuje komponent WebAppsSubSite — nazwij poprawnie. Ustal strukturę: src/pages, src/sections, src/components/{layout,ui}, src/data, src/lib, src/hooks.
8. Usuń martwy kod i zakomentowane bloki (Services zakomentowane, komentarze //todo przenieś do ROADMAP.md jeśli istotne).

Sprawdź wizualnie w przeglądarce, że strona wygląda jak przed zmianą. lint + typecheck + build zielone.

Zrób commity:
- refactor: extract shared animation variants to lib
- refactor: merge duplicated headers into single configurable Header
- refactor: add shared Layout with header and footer
- refactor: move projects, skills and testimonials to typed data files
- refactor: add base UI components (Section, Container, Button, SectionHeading)
- refactor: reorganize folder structure and fix component naming
```

---

### Etap 3 — Nowy design system `style`
**Status:** ⬜ do zrobienia

- [ ] Tokeny kolorów, typografii, cieni w Tailwind
- [ ] Nowe fonty
- [ ] Komponenty UI w nowym stylu
- [ ] Subtelne animacje + `prefers-reduced-motion`

```text
Wprowadź nowy, profesjonalny design system w Portfolio-web. Strona ma wyglądać jak strona małego studia kreatywno-technologicznego, a nie hobbystyczne portfolio.

1. tailwind.config.js: zamiast nadpisywać całe `colors`, użyj `extend` i zdefiniuj semantyczne tokeny:
   - background (#0B0F14 lub podobny grafit), surface, surface-elevated, border (subtelne), text (primary/secondary/muted),
   - accent (oparty o obecny #74FAC8, z wariantami hover/muted), opcjonalnie drugi akcent dla filaru wideo.
   Zachowaj kontrast WCAG AA dla tekstu.
2. Typografia: Inter (lub Manrope) jako font bazowy przez @fontsource (bez Google Fonts CDN), opcjonalnie wyrazisty font display do H1/H2. Usuń Playfair Display z UI. Zdefiniuj skalę: display, h1, h2, h3, body-lg, body, small.
3. Usuń neonowe glow (drop-shadow-custom-glow), animację tada, floatImage. Zastąp subtelnymi efektami: hover lift na kartach, delikatny gradient/blur w tle hero, border highlight.
4. Przestyluj komponenty z src/components/ui (Button, SectionHeading, Section, Container) + dodaj Card, Badge (np. tech stack), Tag.
5. Animacje w src/lib/animations.ts: czas 0.4–0.6 s, ease-out, viewport once: true, stagger dla list. Dodaj hook useReducedMotion (framer-motion) i wyłączaj ruch, gdy użytkownik tego chce.
6. Zastosuj nowy styl do istniejących sekcji (Header, Home, About, Skills, Projects, Opinie, Kontakt, Footer) — bez zmiany treści i struktury. Header: przezroczysty → z tłem i blur po przewinięciu.
7. Dodaj stronę podglądu komponentów tylko w trybie dev (np. /dev/ui) — opcjonalnie.

Pokaż mi zrzuty ekranu przed/po (desktop i mobile 375 px). lint + typecheck + build zielone.

Zrób commity:
- style: add semantic design tokens to Tailwind config
- style: replace Playfair with Inter and define type scale
- style: restyle base UI components and add Card and Badge
- style: tone down animations and respect prefers-reduced-motion
- style: apply new design system to all sections
```

---

### Etap 4 — Nowa architektura informacji i routing `feat`
**Status:** ⬜ do zrobienia

- [ ] Nowe trasy + przekierowania ze starych
- [ ] Nawigacja z dropdownem „Usługi”
- [ ] Strona 404
- [ ] Lazy loading tras

```text
Przebuduj routing i nawigację Portfolio-web zgodnie z nową mapą strony z ROADMAP.md (sekcja 2):

/ (strona główna), /uslugi/wideo, /uslugi/web, /portfolio, /portfolio/:slug, /dla-pracodawcow, /o-mnie, /kontakt, * (404).

1. Skonfiguruj trasy w App.tsx z użyciem Layout i React.lazy + Suspense dla podstron (lekki loader).
2. Stare adresy /about, /web-apps, /social-video przekieruj (Navigate replace) na /o-mnie, /uslugi/web, /uslugi/wideo.
3. Na razie utwórz szkielety nowych stron (tytuł + krótki opis + CTA do kontaktu), przenosząc istniejące treści tam, gdzie pasują: AboutSubSite → /o-mnie, WebAppsSubSite → /uslugi/web, VideoMarketingSubSite → /uslugi/wideo, formularz → /kontakt.
4. Nawigacja (Header): Usługi (dropdown: Kreacja wideo, Strony i aplikacje), Portfolio, Dla pracodawców, O mnie, przycisk CTA „Kontakt”, przełącznik PL/EN. Mobile: pełnoekranowe menu z blokadą scrolla, zamykanie Esc i kliknięciem w link. Aktywny link wg aktualnej trasy (NavLink).
5. Footer: kolumny (Usługi, Portfolio, Dla pracodawców, Kontakt), social media z src/data/socials.ts, rok generowany dynamicznie, link „do góry”.
6. Strona 404 z przyciskiem powrotu.
7. Przewijanie: przy zmianie trasy scroll na górę, obsługa kotwic (#sekcja) w obrębie strony.
8. Wszystkie nowe teksty dodaj w pl.json i en.json (namespace navbar, footer, notFound).

lint + typecheck + build zielone. Sprawdź w przeglądarce każdą trasę, przekierowania i menu mobilne.

Zrób commity:
- feat: add new route structure with lazy-loaded pages
- feat: redirect legacy routes to new paths
- feat: add services dropdown and mobile menu to header
- feat: redesign footer with sitemap columns
- feat: add 404 page
```

---

### Etap 5 — Nowa strona główna `feat`
**Status:** ⬜ do zrobienia

- [ ] Hero z dwoma CTA (klient / rekruter)
- [ ] Pasek zaufania
- [ ] Dwa filary usług
- [ ] Wybrane realizacje, proces, opinie, teaser dla pracodawców, CTA

```text
Zbuduj nową stronę główną Portfolio-web (sekcje w src/sections/home/) w oparciu o design system i dane z src/data:

1. Hero: nagłówek „Strony, aplikacje i wideo, które pracują na Twój biznes” (EN: „Websites, apps and video that work for your business”), podtytuł o połączeniu IT i kreacji, 2 CTA: „Zobacz ofertę” (scroll do usług) i „Jestem rekruterem →” (/dla-pracodawcow). Po prawej zdjęcie (MainPhoto) lub miejsce na pętlę showreela (komponent przyjmujący opcjonalny URL wideo, domyślnie zdjęcie). Usuń animację pisania z 5 rolami — zastąp statycznym badge „Developer · Video Creator”.
2. Pasek zaufania: logotypy klientów z testimonials.ts (grayscale → kolor na hover) + 3 liczby/statystyki w danych (wartości placeholder do uzupełnienia, oznaczone TODO).
3. Usługi: 2 duże karty filarów — „Kreacja wideo” (nagrywanie, montaż, grafiki, animacje) i „Strony i aplikacje” (strony www, aplikacje webowe, UI/UX, automatyzacje), każda z listą 4 punktów, ikoną i linkiem do podstrony.
4. Wybrane realizacje: 6 projektów z flagą featured w projects.ts, karta z miniaturą, kategorią (Badge), tytułem i linkiem do /portfolio/:slug. Przycisk „Całe portfolio”.
5. Jak pracuję: 5 kroków (Rozmowa → Koncepcja i wycena → Realizacja → Prezentacja i poprawki → Wsparcie) — skróć istniejące teksty z web_app.* do 1–2 zdań.
6. Opinie: przerób ImageSlider na czytelne karty (zdjęcie/logo, imię, firma, cytat skrócony do ~3 linii z „czytaj więcej”), na desktop siatka/slider, na mobile slider. Usuń losowe kolory kart.
7. Teaser dla pracodawców: krótki opis, ikony głównego stacku (React, TypeScript, Python, Django, Tailwind, SQL/MongoDB, Git, Figma, Premiere/DaVinci, After Effects), przyciski „Zobacz profil” i „Pobierz CV” (public/cv/ — jeśli plik nie istnieje, przycisk ukryty).
8. CTA końcowe: „Masz projekt? Porozmawiajmy” → /kontakt.

Treści w pl.json i en.json, krótkie i konkretne, bez nadmiaru emoji. Sprawdź desktop i mobile (375 px). lint + typecheck + build zielone.

Zrób commity:
- feat: add new hero section with client and recruiter CTAs
- feat: add trust bar with client logos and stats
- feat: add services overview with video and web pillars
- feat: add featured work section on homepage
- feat: add process section on homepage
- refactor: rebuild testimonials as accessible cards
- feat: add recruiter teaser and final CTA to homepage
```

---

### Etap 6 — Podstrony usług `feat`
**Status:** ⬜ do zrobienia

- [ ] `/uslugi/wideo` — nagrywanie, montaż, grafiki, animacje
- [ ] `/uslugi/web` — strony, aplikacje, UI/UX, automatyzacje
- [ ] Pakiety, FAQ, CTA

```text
Zbuduj dwie podstrony usług w Portfolio-web, wykorzystując istniejące treści z pl.json/en.json (video.*, web_app.*, services.*) — skróć je i uporządkuj:

Wspólny szablon (src/components/services/): ServiceHero, ServiceGrid (karty usług), PackageCards, ProcessSteps, FAQ (akordeon dostępny z klawiatury), ServiceCTA. Dane każdej podstrony w src/data/services/video.ts i web.ts.

/uslugi/wideo — „Kreacja wideo”:
1. Hero + osadzony showreel (lekki embed YouTube: najpierw miniatura, iframe dopiero po kliknięciu; URL z danych, gdy brak → ukryj).
2. Usługi (karty): Nagrywanie (scenariusz, plan zdjęciowy, światło, kadrowanie), Montaż (reklamy, vlogi, gaming, rolki/shorts), Grafiki (miniatury YT, grafiki social media, materiały promocyjne), Animacje (motion design, napisy, intro/outro, animowane logo).
3. Dla kogo: firmy, twórcy internetowi, marki osobiste.
4. Pakiety: 3 karty (np. Rolki / Montaż cykliczny / Film reklamowy od A do Z) z ceną „od …” lub „wycena indywidualna” — wartości jako TODO w danych.
5. Mini-portfolio: realizacje z kategorii video/grafika/animacja z projects.ts.
6. FAQ (czas realizacji, liczba poprawek, format plików, kto nagrywa) + CTA.

/uslugi/web — „Strony i aplikacje”:
1. Hero + karty: Strony www (wizytówki, landing page), Aplikacje webowe (React + Django/Python), Projektowanie UI/UX (Figma, prototypy), Automatyzacje (Python, skrypty, integracje — z przykładem GPSMaker: „4–5 dni pracy → 2 kliknięcia”).
2. Proces współpracy (5 kroków z web_app.text3–text7, skrócone).
3. Technologie (Badge).
4. Pakiety: Strona wizytówka / Landing page / Aplikacja na zamówienie — ceny jako TODO.
5. Co dostajesz: responsywność, SEO podstawowe, szybkość, wsparcie po wdrożeniu.
6. Mini-portfolio web/app/automatyzacje + FAQ (hosting, domena, treści, czas realizacji) + CTA.

Każdy CTA prowadzi do /kontakt?temat=wideo lub /kontakt?temat=web. Teksty PL i EN. Desktop + mobile. lint + typecheck + build zielone.

Zrób commity:
- feat: add reusable service page components
- feat: add video creation services page
- feat: add web and app development services page
- feat: add lazy YouTube embed component
```

---

### Etap 7 — Portfolio z filtrami i case studies `feat`
**Status:** ⬜ do zrobienia

- [ ] `/portfolio` z filtrami kategorii
- [ ] `/portfolio/:slug` — case study
- [ ] Obsługa realizacji wideo (modal z odtwarzaczem)

```text
Zbuduj sekcję portfolio w Portfolio-web:

1. Rozszerz typ Project w src/data/projects.ts: slug, title, category ('video' | 'graphics' | 'animation' | 'website' | 'webapp' | 'automation'), audience ('client' | 'employer' | 'both'), featured, cover, gallery?, videoUrl?, summaryKey, problemKey?, solutionKey?, resultKey?, tech[], role, year, links {github?, live?}.
   Uzupełnij istniejące projekty (AureliaHR, GPSMaker, Web scraping, NoEscapeCursor, to portfolio) oraz dodaj placeholdery (oznaczone TODO, niewidoczne gdy draft: true) dla realizacji wideo, grafik, animacji i stron klientów.
2. /portfolio: nagłówek, filtry (Wszystko / Wideo / Grafika / Animacja / Strony / Aplikacje / Automatyzacje) jako przyciski z aria-pressed, filtr zapisywany w query string (?kategoria=video), siatka kart z animacją layout (framer-motion AnimatePresence).
3. Karta: miniatura (lazy), kategoria, tytuł, 1 zdanie, technologie. Dla wideo — ikona play i otwarcie w dostępnym modalu (focus trap, Esc, blokada scrolla) z lekkim embedem.
4. /portfolio/:slug: case study — hero z okładką, meta (rola, rok, technologie, linki GitHub/Live), sekcje Problem → Rozwiązanie → Efekt, galeria, nawigacja poprzedni/następny projekt, CTA. Nieistniejący slug → 404.
5. Usuń kafelki „Cooking” z placeholderem test.jpg.
6. Teksty PL/EN.

lint + typecheck + build zielone. Sprawdź filtrowanie, modal z klawiatury i case study na mobile.

Zrób commity:
- feat: extend project data model with categories and case study fields
- feat: add portfolio page with category filters
- feat: add accessible video modal for portfolio items
- feat: add project case study page
- chore: remove placeholder cooking projects
```

---

### Etap 8 — Strona dla pracodawców `feat`
**Status:** ⬜ do zrobienia

- [ ] Profil zawodowy + status dostępności
- [ ] Stack pogrupowany, doświadczenie, edukacja, certyfikaty
- [ ] Pobierz CV (PL/EN), GitHub, LinkedIn

```text
Zbuduj stronę /dla-pracodawcow w Portfolio-web — CV online dla rekruterów i potencjalnych pracodawców:

1. Dane w src/data/career.ts (typowane): headline, summary, availability ('open' | 'freelance-only' | 'closed') + preferowane formy pracy, experience[] (firma, stanowisko, od–do, osiągnięcia[]), education[], certificates[] (nazwa, wystawca, rok, plik PDF z public/Certyfikaty), skills pogrupowane: Frontend, Backend, Bazy danych, Narzędzia/DevOps, Design, Wideo i grafika, Języki obce, Soft skills.
   Uzupełnij tym, co wiadomo z obecnych tłumaczeń (kursy React/Python, Flask, Django, MongoDB, SQL, Git, Figma, skrypty wdrożone w firmie, praca inżynierska AureliaHR); resztę oznacz TODO.
2. Sekcje strony: hero (zdjęcie, headline, badge dostępności, przyciski: Pobierz CV PL / EN, LinkedIn, GitHub, Kontakt), Podsumowanie, Stack (grupy z Badge — BEZ pasków procentowych), Doświadczenie (oś czasu), Wybrane projekty techniczne (projects.ts z audience employer/both, z linkami do kodu), Certyfikaty (karty z linkiem do PDF), Edukacja, Dlaczego ja (3–4 punkty: łączę dev z kreacją, samodzielność, wdrożone rozwiązania), CTA „Zaproś mnie na rozmowę” → /kontakt?temat=praca.
3. Przycisk „Drukuj / PDF”: style @media print, które dają czytelne, jednostronicowe CV (ukryj nawigację, animacje, tła).
4. Pliki CV: oczekuj public/cv/Jacek-Kozlowski-CV-PL.pdf i -EN.pdf; jeśli brak — przycisk ukryty (sprawdzanie w danych, nie fetch).
5. Przenieś modale z MySkills.tsx do tej strony w lepszej formie (rozwijane szczegóły przy grupie stacku) i usuń starą sekcję skilli z głównej (zastąpioną teaserem z etapu 5).
6. Teksty PL/EN.

lint + typecheck + build zielone. Sprawdź podgląd wydruku.

Zrób commity:
- feat: add typed career data model
- feat: add employer page with experience timeline and grouped skills
- feat: add certificates and CV download to employer page
- style: add print stylesheet for employer page
- refactor: replace legacy skills section with employer page content
```

---

### Etap 9 — Kontakt v2 `feat`
**Status:** ⬜ do zrobienia

- [ ] Wybór tematu (Wideo / Web / Praca / Inne) + pola zależne
- [ ] Walidacja, stany, antyspam, RODO
- [ ] Alternatywne kanały kontaktu

```text
Przebuduj kontakt w Portfolio-web (/kontakt + sekcja CTA):

1. Formularz (react-hook-form + zod, lub własna walidacja bez ciężkich bibliotek): imię, email, temat jako wybór kafelkowy (Kreacja wideo / Strona lub aplikacja / Oferta pracy / Inne), pola zależne od tematu:
   - wideo/web: budżet (przedziały), termin, link do materiałów (opcjonalnie),
   - praca: nazwa firmy, stanowisko, forma (UoP/B2B/zlecenie).
   Wiadomość, checkbox zgody na przetwarzanie danych (RODO) z linkiem do polityki prywatności.
2. Temat wstępnie wybierany z query string ?temat=wideo|web|praca.
3. Stany: walidacja inline z komunikatami PL/EN, wysyłanie (spinner, disabled), sukces (komunikat + delikatne confetti zostaje), błąd (komunikat + mailto jako fallback).
4. Antyspam: ukryte pole honeypot + prosty limit czasu (formularz wysłany < 3 s od załadowania = odrzuć).
5. EmailJS: przekaż wszystkie nowe pola do szablonu (opisz w README, jakie zmienne dodać w szablonie EmailJS). Klucze tylko z import.meta.env, z czytelnym błędem w dev, gdy ich brak.
6. Obok formularza: bezpośredni email (z możliwością skopiowania), LinkedIn, GitHub, czas odpowiedzi „do 1 dnia roboczego”, opcjonalnie link do Calendly (z danych, ukryty gdy brak).
7. Dodaj prostą stronę /polityka-prywatnosci (EmailJS jako procesor danych, cel, czas przechowywania) — treść jako szkic do mojej weryfikacji.

lint + typecheck + build zielone. Przetestuj wszystkie warianty tematu i błędy walidacji.

Zrób commity:
- feat: add topic-based contact form with conditional fields
- feat: add validation, loading, success and error states to contact form
- feat: add honeypot spam protection to contact form
- feat: add direct contact channels next to form
- feat: add privacy policy page
- docs: document EmailJS template variables
```

---

### Etap 10 — SEO, meta i i18n `feat`
**Status:** ⬜ do zrobienia

- [ ] Meta per strona, Open Graph, JSON-LD
- [ ] sitemap.xml, robots.txt
- [ ] Prerendering (HTML dla botów)
- [ ] Uporządkowane tłumaczenia

```text
Popraw SEO i i18n w Portfolio-web (SPA na GitHub Pages):

1. Dodaj zarządzanie <head> per strona (react-helmet-async lub natywne <title>/<meta> z React 19, jeśli projekt zostanie podbity): title, description, canonical, og:title/description/image/url, twitter:card, hreflang pl/en. Komponent <Seo /> przyjmujący klucze tłumaczeń.
2. Obraz OG 1200×630 w public/og/ (wygeneruj prosty szablon w HTML/SVG, który mogę podmienić).
3. JSON-LD: Person (imię, jobTitle, sameAs: LinkedIn, GitHub, YouTube) na stronie głównej i /dla-pracodawcow, ProfessionalService/Service na podstronach usług.
4. public/robots.txt i sitemap.xml generowana skryptem przy buildzie na podstawie tras i slugów projektów.
5. Prerendering statycznych tras do HTML przy buildzie (np. vite-react-ssg lub vite-plugin-prerender) — oceń, które rozwiązanie jest kompatybilne z react-router-dom 7 i GitHub Pages, zaproponuj mi je zanim zainstalujesz.
6. i18n: podziel tłumaczenia na namespace'y odpowiadające stronom (common, home, services, portfolio, career, contact), dodaj skrypt npm run i18n:check porównujący klucze PL/EN i wykrywający nieużywane klucze. Ustaw <html lang> dynamicznie przy zmianie języka.
7. Usuń nieużywane klucze tłumaczeń po wcześniejszych etapach.

lint + typecheck + build zielone. Sprawdź wygenerowany HTML (view-source) dla kilku tras.

Zrób commity:
- feat: add per-page SEO meta and Open Graph tags
- feat: add JSON-LD structured data
- chore: add robots.txt and generated sitemap
- feat: prerender static routes at build time
- refactor: split translations into namespaces
- chore: add i18n key consistency check script
```

---

### Etap 11 — Wydajność i dostępność `perf`
**Status:** ⬜ do zrobienia

- [ ] Obrazy WebP/AVIF, lazy, wymiary
- [ ] Lighthouse ≥ 90 we wszystkich kategoriach
- [ ] Dostępność: klawiatura, focus, alt, kontrast

```text
Zoptymalizuj wydajność i dostępność Portfolio-web:

1. Obrazy: skonwertuj src/assets/img do WebP/AVIF (vite-imagetools lub skrypt sharp), docelowo < 200 KB (np. Julka.png 1,6 MB, Cat.png, AureliaHR.jpg). Usuń nieużywane obrazy (sprawdź grepem: Cat.png, Image 1.png, Image 7.png, Logo poziom.png itp.). Komponent <Img> z width/height, loading="lazy", decoding="async", srcset; hero z fetchpriority="high".
2. Fonty: preload głównego fontu, font-display: swap, tylko używane wagi.
3. Bundle: sprawdź rozmiar (rollup-plugin-visualizer), wydziel vendor chunks, upewnij się, że confetti i emailjs ładują się dopiero na /kontakt, swiper tylko tam, gdzie potrzebny (lub zamień na lżejsze rozwiązanie CSS scroll-snap).
4. Usuń boxicons, jeśli po etapie 1 nie są już potrzebne (wszystko na react-icons).
5. Dostępność: semantyczne landmarki (header/nav/main/footer), jeden h1 na stronę, alt dla wszystkich obrazów, widoczny focus (focus-visible), „Przejdź do treści” (skip link), aria-label dla przycisków z ikonami, kontrast AA, obsługa klawiatury w menu/dropdownie/modalu/akordeonie.
6. Uruchom Lighthouse (mobile) dla /, /uslugi/wideo, /portfolio, /dla-pracodawcow i pokaż wyniki przed/po. Cel: ≥ 90 w Performance, Accessibility, Best Practices, SEO.

Zrób commity:
- perf: convert images to modern formats and add responsive Img component
- chore: remove unused image assets and boxicons
- perf: lazy load heavy dependencies and split vendor chunks
- perf: optimize font loading
- fix: improve accessibility of navigation, modals and forms
```

---

### Etap 12 — Jakość kodu, testy i CI/CD `ci`
**Status:** ⬜ do zrobienia

- [ ] Prettier + ESLint bez błędów
- [ ] Testy Vitest + Testing Library
- [ ] GitHub Actions: lint → typecheck → test → build → deploy

```text
Dodaj zaplecze jakości do Portfolio-web:

1. Prettier (+ prettier-plugin-tailwindcss) i skrypty format / format:check. Sformatuj cały projekt w OSOBNYM commicie.
2. ESLint: typecheck-aware config (typescript-eslint recommendedTypeChecked), jsx-a11y, napraw zgłoszone problemy. Skrypt "typecheck".
3. Vitest + @testing-library/react + jsdom: testy dla filtrowania portfolio, formularza kontaktowego (walidacja, pola zależne od tematu, honeypot), przełącznika języka, przekierowań starych tras, skryptu i18n:check.
4. GitHub Actions:
   - ci.yml na push/PR: npm ci → lint → typecheck → test → build,
   - deploy.yml na push do main: build i deploy na GitHub Pages przez actions/deploy-pages (sekrety EmailJS jako repository secrets) — zastępuje ręczny `npm run deploy`.
   Opisz w README, jakie sekrety dodać i jak przełączyć Pages na „GitHub Actions” w ustawieniach repo.
5. Opcjonalnie: husky + lint-staged (format + lint na commit) i commitlint z konwencją Conventional Commits.

Zrób commity:
- chore: add Prettier with Tailwind plugin
- style: format codebase with Prettier
- chore: enable type-aware and a11y ESLint rules
- test: add Vitest setup and component tests
- ci: add lint, typecheck, test and build workflow
- ci: deploy to GitHub Pages via GitHub Actions
- chore: add husky, lint-staged and commitlint
```

---

### Etap 13 — Rozszerzenia opcjonalne `feat`
**Status:** ⬜ pomysły na później

- [ ] **Analityka** z poszanowaniem prywatności (Plausible / Umami) lub GA4 z banerem zgód — `feat: add privacy-friendly analytics`
- [ ] **Blog / poradniki** w MDX (np. „Jak przygotować materiał do montażu”, „Ile kosztuje strona wizytówka”) — SEO i ekspertyza — `feat: add MDX blog`
- [ ] **Przełącznik jasny/ciemny motyw** — `feat: add light and dark theme toggle`
- [ ] **Kalkulator wyceny** (typ usługi + zakres → widełki cenowe) — `feat: add project cost estimator`
- [ ] **Własna domena** (np. jacekkozlowski.pl) + email w domenie — `chore: configure custom domain`
- [ ] **Headless CMS** (np. Sanity/Decap) do dodawania realizacji bez kodu — `feat: integrate headless CMS for portfolio`
- [ ] **Migracja na Astro/Next (SSG)**, jeśli prerendering w Vite okaże się niewystarczający dla SEO

Prompt szablonowy dla każdej z nich:
```text
Na podstawie ROADMAP.md (etap 13) zaimplementuj: <nazwa funkcji>. Najpierw przedstaw mi krótki plan i wybór bibliotek (z uzasadnieniem i wpływem na rozmiar bundla), poczekaj na akceptację, potem zaimplementuj z tłumaczeniami PL/EN, testem i aktualizacją README. lint + typecheck + test + build zielone.
Zrób commit: feat: <opis po angielsku w trybie rozkazującym>
```

---

## 5. Kolejność i szacunek

| # | Etap | Typ | Zależy od | Szac. czas |
|---|---|---|---|---|
| 0 | Porządki w repo | chore | — | 1 h |
| 1 | Naprawa błędów | fix | 0 | 2–3 h |
| 2 | Refaktoryzacja | refactor | 1 | 3–4 h |
| 3 | Design system | style | 2 | 4–6 h |
| 4 | Routing i nawigacja | feat | 2, 3 | 3 h |
| 5 | Strona główna | feat | 4 | 4–6 h |
| 6 | Podstrony usług | feat | 4 | 5–7 h |
| 7 | Portfolio | feat | 4 | 4–6 h |
| 8 | Dla pracodawców | feat | 4 | 4–5 h |
| 9 | Kontakt v2 | feat | 4 | 3–4 h |
| 10 | SEO i i18n | feat | 5–9 | 3–5 h |
| 11 | Wydajność i a11y | perf | 5–9 | 3–4 h |
| 12 | Testy i CI/CD | ci | 9 | 3–4 h |
| 13 | Opcjonalne | feat | 12 | — |

Etapy **6, 7, 8, 9** są niezależne od siebie (po etapie 4) — można je robić równolegle w osobnych gałęziach/sesjach.

**Minimum do „profesjonalnej wersji” (MVP):** etapy 0–5 + 6 + 8 + 9. Portfolio (7) może na start pokazywać istniejące projekty, a realizacje wideo dodasz, gdy przygotujesz materiały.

---

## 6. Dziennik zmian planu
- **2026-11-22** — utworzenie planu na podstawie analizy kodu (stan: commit `31aa9c0`).
