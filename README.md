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
| i18n       | i18next + react-i18next + i18next-browser-languagedetector |
| Formularz  | @emailjs/browser + canvas-confetti                          |
| Slider     | Swiper                                                      |
| Ikony      | boxicons, react-icons                                       |
| Deploy     | gh-pages → GitHub Pages                                     |

## Uruchomienie

Wymagany Node.js 20+.

```bash
npm i
cp .env.example .env   # uzupełnij wartości, patrz niżej
npm run dev            # serwer deweloperski: http://localhost:5173
```

Pozostałe komendy:

| Komenda             | Opis                                 |
| ------------------- | ------------------------------------ |
| `npm run build`     | build produkcyjny do `dist/`         |
| `npm run preview`   | podgląd zbudowanej wersji            |
| `npm run lint`      | ESLint                               |
| `npm run typecheck` | sprawdzenie typów (`tsc -b`)         |
| `npm run deploy`    | build + publikacja na GitHub Pages   |

## Zmienne środowiskowe

Plik `.env` nie jest w repozytorium. Szablon znajdziesz w `.env.example`:

| Zmienna                     | Opis                         |
| --------------------------- | ---------------------------- |
| `VITE_EMAILJS_SERVICE_ID`   | ID usługi w EmailJS          |
| `VITE_EMAILJS_TEMPLATE_ID`  | ID szablonu wiadomości       |
| `VITE_EMAILJS_PUBLIC_KEY`   | klucz publiczny EmailJS      |

Wartości są czytane w `src/env.ts` i trafiają do bundla (prefiks `VITE_`), więc mogą tu być tylko klucze przeznaczone do użycia w przeglądarce.

## Deploy

```bash
npm run deploy
```

Skrypt `predeploy` buduje projekt, a `gh-pages -d dist` publikuje zawartość `dist/` na gałąź `gh-pages`, z której serwowany jest GitHub Pages. Katalog `dist/` nie jest commitowany.

## Struktura katalogów

```
.
├── index.html              # punkt wejścia Vite
├── public/                 # pliki statyczne kopiowane 1:1 (certyfikaty PDF, favicon)
├── src/
│   ├── main.tsx            # bootstrap React + i18n
│   ├── App.tsx             # routing: /, /about, /web-apps, /social-video
│   ├── env.ts              # odczyt zmiennych środowiskowych
│   ├── config/             # konfiguracja i18next
│   ├── translations/       # pl.json, en.json (jedyne źródło tłumaczeń)
│   ├── pages/              # podstrony
│   │   └── sections/       # sekcje strony głównej
│   ├── components/         # nagłówki, stopka, formularz, slider, modal
│   ├── hooks/              # własne hooki
│   └── assets/img/         # obrazy importowane w komponentach
├── tailwind.config.js
└── vite.config.ts
```

## Plan rozwoju

Plan modernizacji strony jest opisany w [ROADMAP.md](ROADMAP.md).
