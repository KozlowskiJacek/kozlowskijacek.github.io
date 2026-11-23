# Portfolio-web

Osobista strona-wizytówka Jacka Kozłowskiego: **https://jacekkozlowski.github.io**

Strona ma dwa cele:

- **dla klientów**: prezentuje usługi w dwóch obszarach, czyli kreacja wideo (nagrywanie, montaż, grafiki, animacje) oraz IT (strony www, aplikacje webowe, UI/UX, automatyzacje),
- **dla rekruterów**: pokazuje stack, projekty, doświadczenie i certyfikaty.

Strona jest dwujęzyczna (PL / EN) i ma formularz kontaktowy wysyłany przez EmailJS.

## Stack

| Obszar     | Technologia                                                 |
| ---------- | ----------------------------------------------------------- |
| Framework  | React 18 + TypeScript + Vite (SWC)                          |
| Stylowanie | Tailwind CSS 3 (własna paleta w `tailwind.config.js`)       |
| Animacje   | framer-motion, keyframes Tailwind                           |
| Routing    | react-router-dom 7                                          |
| SEO        | react-helmet-async (komponent `<Seo />`)                    |
| i18n       | i18next + react-i18next + i18next-browser-languagedetector  |
| Formularz  | @emailjs/browser + canvas-confetti                          |
| Slider     | Swiper                                                      |
| Ikony      | react-icons                                                 |
| Testy      | Vitest + Testing Library (jsdom)                            |
| Jakość     | ESLint (typescript-eslint type-checked, jsx-a11y), Prettier |
| Deploy     | GitHub Actions → GitHub Pages                               |

## Uruchomienie

Wymagany Node.js 22+ (tak jak w CI).

```bash
npm i
cp .env.example .env   # uzupełnij wartości, patrz niżej
npm run dev            # serwer deweloperski: http://localhost:5173
```

Pozostałe komendy:

| Komenda                   | Opis                                                                                                                                      |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run build`           | build produkcyjny do `dist/`                                                                                                              |
| `npm run preview`         | podgląd zbudowanej wersji                                                                                                                 |
| `npm run lint`            | ESLint                                                                                                                                    |
| `npm run typecheck`       | sprawdzenie typów (`tsc -b`)                                                                                                              |
| `npm run i18n:check`      | spójność kluczy PL/EN, brakujące i nieużywane klucze (`-- --prune` usuwa nieużywane)                                                      |
| `npm test`                | testy Vitest (jednorazowo); `npm run test:watch` — tryb obserwowania                                                                      |
| `npm run format`          | formatuje cały projekt Prettierem (z sortowaniem klas Tailwind); `npm run format:check` tylko sprawdza                                    |
| `npm run og:render`       | renderuje `scripts/og/og-template.html` do `public/og/default.png` (headless Chrome/Edge)                                                 |
| `npm run analyze`         | build z mapą rozmiaru bundla w `stats.html` (rollup-plugin-visualizer)                                                                    |
| `npm run images:optimize` | konwertuje PNG/JPG z `src/assets/img` do WebP (max 1600 px, < 200 KB); warianty AVIF/WebP i srcset generuje przy buildzie vite-imagetools |
| `npm run fonts:subset`    | generuje odchudzone fonty w `src/assets/fonts` (wagi 400–600, łacina + polskie znaki)                                                     |

### Git hooks

`npm i` instaluje hooki [husky](https://typicode.github.io/husky/) (skrypt `prepare`):

- **pre-commit** — `lint-staged` (`lint-staged.config.js`): `eslint --fix` i `prettier --write` tylko na plikach w stage,
- **commit-msg** — `commitlint` (`commitlint.config.js`) wymusza [Conventional Commits](https://www.conventionalcommits.org/), np. `feat: …`, `fix: …`, `chore: …`.

W wyjątkowej sytuacji hooki można pominąć flagą `git commit --no-verify`; CI i tak sprawdzi lint, formatowanie i testy.

## SEO

- Każda strona renderuje `<Seo />` (`src/components/Seo.tsx`): title, description, canonical, Open Graph, Twitter Card i `hreflang`. Teksty pochodzą z kluczy `…:meta.title` / `…:meta.description` w tłumaczeniach.
- Adres strony, domyślny obraz OG i lista indeksowanych tras: `src/data/site.ts`.
- Język jest w parametrze adresu: wersja PL to `/sciezka`, EN to `/sciezka?lang=en` (parametr ma pierwszeństwo przed wyborem zapisanym w `localStorage`).
- `public/robots.txt` wskazuje na `sitemap.xml`, którą po buildzie generuje `scripts/generate-sitemap.mjs` (krok `postbuild`) z `indexableRoutes` w `src/data/site.ts` i slugów opublikowanych projektów. Nowa podstrona = dopisz trasę do `indexableRoutes`.
- **Prerendering**: `npm run build` buduje też wersję SSR (`dist-ssr/`, z `src/entry-server.tsx`), a `scripts/prerender.mjs` renderuje każdą trasę z `indexableRoutes` i każde case study do statycznego HTML z gotowymi meta tagami (`dist/uslugi/web.html` itd.). GitHub Pages serwuje te pliki pod adresami bez `.html` i bez ukośnika. W przeglądarce React hydratuje HTML, gdy zgadza się trasa i język (PL); przy `?lang=en` renderuje stronę od zera. `dist/404.html` to czysty szablon SPA dla nieznanych i starych adresów.
- Kod renderowany w komponentach musi działać w Node: `window`, `document`, `localStorage` tylko w `useEffect`/handlerach, a pierwszy render na kliencie musi dać to samo co prerendering (np. portal w `Modal` pojawia się dopiero po zamontowaniu).
- Domyślny obraz OG (1200×630) to `public/og/default.png`. Podmień plik albo zmień szablon `scripts/og/og-template.html` i uruchom `npm run og:render`.

## Zmienne środowiskowe

Plik `.env` nie jest w repozytorium. Szablon znajdziesz w `.env.example`:

| Zmienna                    | Opis                    |
| -------------------------- | ----------------------- |
| `VITE_EMAILJS_SERVICE_ID`  | ID usługi w EmailJS     |
| `VITE_EMAILJS_TEMPLATE_ID` | ID szablonu wiadomości  |
| `VITE_EMAILJS_PUBLIC_KEY`  | klucz publiczny EmailJS |

Wartości są czytane wyłącznie z `import.meta.env` w `src/lib/env.ts` i trafiają do bundla (prefiks `VITE_`), więc mogą tu być tylko klucze przeznaczone do użycia w przeglądarce.
Gdy którejś brakuje, w trybie dev konsola i baner nad formularzem pokazują, których zmiennych brakuje; na produkcji wysyłka kończy się stanem błędu z linkiem `mailto` jako fallbackiem.

## Formularz kontaktowy i szablon EmailJS

Formularz (`/kontakt`, `src/components/contact/`) wysyła dane przez `emailjs.send()` jako jawne zmienne szablonu
(`toTemplateParams` w `src/lib/contactForm.ts`). Temat można wybrać z góry linkiem `/kontakt?temat=wideo|web|praca|inne`.
Etykiety (temat, budżet, termin, forma współpracy) są zawsze po polsku, niezależnie od języka odwiedzającego.
Pola, które nie dotyczą wybranego tematu, mają wartość `—`.

W panelu EmailJS (**Email Templates → szablon z `VITE_EMAILJS_TEMPLATE_ID`**) użyj zmiennych:

| Zmienna               | Kiedy wypełniona    | Zawartość                                                 |
| --------------------- | ------------------- | --------------------------------------------------------- |
| `{{user_name}}`       | zawsze              | imię i nazwisko                                           |
| `{{user_email}}`      | zawsze              | e-mail nadawcy — ustaw też jako **Reply To**              |
| `{{user_subject}}`    | zawsze              | nazwa tematu, np. „Kreacja wideo”, „Oferta pracy”         |
| `{{topic}}`           | zawsze              | identyfikator tematu: `wideo`, `web`, `praca`, `inne`     |
| `{{budget}}`          | wideo / web         | przedział budżetu, np. „5 000 – 10 000 zł”                |
| `{{deadline}}`        | wideo / web         | termin, np. „Do miesiąca”                                 |
| `{{materials_link}}`  | wideo / web         | link do materiałów (opcjonalny)                           |
| `{{company}}`         | praca               | nazwa firmy                                               |
| `{{position}}`        | praca               | stanowisko                                                |
| `{{employment_type}}` | praca               | „Umowa o pracę”, „B2B” albo „Umowa zlecenie”              |
| `{{details}}`         | wideo / web / praca | gotowe podsumowanie pól zależnych od tematu (wiele linii) |
| `{{message}}`         | zawsze              | treść wiadomości                                          |
| `{{consent}}`         | zawsze              | „Tak” — zgoda RODO (formularz nie wyśle się bez niej)     |
| `{{language}}`        | zawsze              | język strony nadawcy: `pl` / `en`                         |
| `{{page_url}}`        | zawsze              | adres strony, z której wysłano formularz                  |

Poprzednia wersja szablonu używała `user_name`, `user_email`, `user_subject` i `message` — te nazwy zostały, więc stary
szablon dalej działa; nowe pola trzeba dopisać. Minimalny przykład treści:

```text
Temat: {{user_subject}} — {{user_name}}

Od: {{user_name}} <{{user_email}}>
Temat: {{user_subject}} ({{topic}})

{{details}}

Budżet: {{budget}}
Termin: {{deadline}}
Materiały: {{materials_link}}
Firma: {{company}} · Stanowisko: {{position}} · Forma: {{employment_type}}

Wiadomość:
{{message}}

Zgoda RODO: {{consent}} · Język: {{language}} · Wysłano z: {{page_url}}
```

W ustawieniach szablonu: **Subject** `{{user_subject}} — {{user_name}}`, **Reply To** `{{user_email}}`.

Antyspam działa po stronie przeglądarki: ukryte pole-pułapka `website` (wypełnione = udawany sukces bez wysyłki)
i minimalny czas 3 s od załadowania formularza (`src/lib/contactSpam.ts`). Warto dodatkowo sprawdzić w ustawieniach konta EmailJS
ograniczenie wysyłek do własnej domeny i limity, jeśli plan na to pozwala.

Kanały kontaktu obok formularza (e-mail, LinkedIn, GitHub, opcjonalnie Calendly) są w `src/data/contact.ts`;
link do Calendly pojawi się po wpisaniu adresu w `contactLinks` (`href: null` = ukryty).
Treść polityki prywatności (`/polityka-prywatnosci`) jest w `contact:privacy.*` (`src/translations/{pl,en}/contact.json`), a lista sekcji i data
aktualizacji w `src/data/privacy.ts`.

## CI i deploy

Dwa workflowy w `.github/workflows/`:

| Workflow     | Kiedy                                           | Co robi                                                                                        |
| ------------ | ----------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `ci.yml`     | każdy push i pull request                       | `npm ci` → lint → `format:check` → typecheck → testy → build (bez sekretów)                    |
| `deploy.yml` | push na `master` lub ręcznie (**Run workflow**) | `npm ci` → testy → build z sekretami EmailJS → publikacja `dist/` przez `actions/deploy-pages` |

Ręczny `npm run deploy` (pakiet `gh-pages`) został usunięty — stronę publikuje tylko `deploy.yml`. Katalog `dist/` nie jest commitowany.
Skrypt `postbuild` generuje prerenderowane strony i `dist/404.html`, dzięki czemu GitHub Pages serwuje aplikację także przy bezpośrednim wejściu lub odświeżeniu podstron.

### Jednorazowa konfiguracja repozytorium

1. **Sekrety EmailJS** — _Settings → Secrets and variables → Actions → New repository secret_. Dodaj trzy sekrety o tych samych nazwach co w `.env`:

   | Secret                     | Skąd wziąć wartość (panel EmailJS) |
   | -------------------------- | ---------------------------------- |
   | `VITE_EMAILJS_SERVICE_ID`  | _Email Services_ → Service ID      |
   | `VITE_EMAILJS_TEMPLATE_ID` | _Email Templates_ → Template ID    |
   | `VITE_EMAILJS_PUBLIC_KEY`  | _Account → General_ → Public Key   |

   To klucze publiczne (trafiają do bundla), ale trzymanie ich w sekretach pozwala je zmieniać bez commitów. Bez sekretów build przejdzie, a formularz po wysłaniu pokaże błąd z linkiem `mailto`.

2. **Źródło GitHub Pages** — _Settings → Pages → Build and deployment → Source_ przełącz z **Deploy from a branch** na **GitHub Actions**. Bez tego `actions/deploy-pages` zakończy się błędem.
3. Po pierwszym udanym deployu gałąź `gh-pages` nie jest już potrzebna — można ją usunąć (`git push origin --delete gh-pages`).
4. Opcjonalnie: _Settings → Branches_ → reguła dla `master` z wymaganym statusem **CI / Lint, typecheck, test, build** przed merge.

## Struktura katalogów

```
.
├── index.html              # punkt wejścia Vite
├── public/                 # pliki statyczne kopiowane 1:1 (Certyfikaty/*.pdf, cv/*.pdf, favicon)
├── src/
│   ├── main.tsx            # bootstrap React + i18n
│   ├── App.tsx             # routing: /, /about, /web-apps, /social-video (każda trasa w Layout)
│   ├── pages/              # strony: MainPage, AboutPage, WebAppsPage, VideoMarketingPage
│   ├── sections/           # sekcje stron: home/ (strona główna), employer/ (/dla-pracodawcow), …
│   ├── components/
│   │   ├── layout/         # Layout, Header, LanguageSwitcher, Footer, ScrollToTop
│   │   ├── ui/             # Section, Container, SectionHeading, Button, Modal
│   │   ├── contact/        # ContactForm, TopicPicker, ContactChannels
│   │   └── *.tsx           # PageIntro
│   ├── data/               # typowane dane: navigation, projects, career (CV), stack, testimonials, socials
│   ├── lib/                # animations (framer-motion), i18n, env
│   ├── hooks/              # useSmoothScroll, useScrollSpy, useNavigateToSection
│   ├── translations/       # {pl,en}/<namespace>.json: common, home, services, portfolio, career, contact
│   └── assets/img/         # obrazy importowane w komponentach
├── tailwind.config.js
└── vite.config.ts
```

## CV do pobrania

Strona `/dla-pracodawcow` pokazuje przyciski „Pobierz CV PL / EN”, jeśli istnieją pliki
`public/cv/Jacek-Kozlowski-CV-PL.pdf` i `public/cv/Jacek-Kozlowski-CV-EN.pdf`. Ich obecność
sprawdza `vite.config.ts` przy starcie serwera i buildzie — po dodaniu pliku zrestartuj `npm run dev`.
Treść CV online (doświadczenie, edukacja, certyfikaty, stack) jest w `src/data/career.ts`.

## Plan rozwoju

Plan modernizacji strony jest opisany w [ROADMAP.md](ROADMAP.md).
