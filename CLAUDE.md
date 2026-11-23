# CLAUDE.md

Zasady pracy w repozytorium Portfolio-web (osobista strona-wizytówka, deploy na GitHub Pages).

## Stack

React 18 + TypeScript + Vite (SWC), Tailwind CSS 3, framer-motion, react-router-dom 7, i18next (PL/EN), EmailJS.

## Komendy

```bash
npm run dev        # serwer deweloperski
npm run build      # build produkcyjny do dist/
npm run lint       # ESLint
npm run typecheck  # tsc -b
npm test           # Vitest (testy komponentów i skryptów)
npm run format     # Prettier (+ sortowanie klas Tailwind)
```

Po każdej zmianie kodu uruchom `npm run build`, `npm run lint` i `npm test`. Deploy robi GitHub Actions (`.github/workflows/deploy.yml`) po pushu na `main` — nie ma ręcznego `npm run deploy`.

## Zasady

- **Commity**: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `style:` …), jeden logiczny temat na commit.
- **Tłumaczenia**: każdy tekst widoczny dla użytkownika idzie przez `t()` z react-i18next. Tłumaczenia są podzielone na namespace'y odpowiadające stronom: `src/translations/{pl,en}/{common,home,services,portfolio,career,contact}.json`. Klucz w kodzie zawsze z namespace'em, np. `t("home:hero.title")`, i dodajesz go **zawsze w obu językach** (ten sam plik w `pl/` i `en/`). Po zmianach uruchom `npm run i18n:check`.
- **Style**: Tailwind (klasy utility i paleta z `tailwind.config.js`) zamiast inline `style={{}}` i nowych plików CSS. Nowe kolory i animacje dodawaj do `tailwind.config.js`.
- **Dane**: treści o strukturze listowej (projekty, usługi, opinie, umiejętności) trzymaj w `src/data/` jako typowane moduły TS, a nie zaszyte w JSX.
- **Pliki statyczne**: certyfikaty i inne pliki do pobrania trzymaj w `public/`, a obrazy importowane w komponentach w `src/assets/img/`. Nie commituj `dist/`, `.vite/` ani `node_modules/`.
- **Prerendering**: strony są renderowane do HTML przy buildzie (`scripts/prerender.mjs`). W renderze komponentów nie używaj `window`/`document`/`localStorage` — tylko w `useEffect` i handlerach — i nie renderuj na kliencie przy pierwszym renderze czegoś innego niż na serwerze. Nowa podstrona do indeksowania → dopisz ją do `indexableRoutes` w `src/data/site.ts`.
- **Testy**: testy obok kodu (`*.test.tsx`), helpery w `src/test/`. Teksty w asercjach bierz z `i18n.getFixedT("pl")`, a nie wpisuj na sztywno.
- **Sekrety**: `.env` nie trafia do gita. Nową zmienną dopisz do `.env.example` (bez wartości), do README, do `env:` kroku Build w `deploy.yml` i do repository secrets.
