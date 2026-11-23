import { useSyncExternalStore } from "react";

/**
 * Motyw jasny/ciemny. Źródłem prawdy jest atrybut `data-theme` na <html> — ustawia go
 * skrypt inline w index.html przed pierwszym malowaniem (bez mignięcia), a potem ten moduł.
 * Kolory to zmienne CSS w src/index.css, więc HTML z prerenderingu nie zależy od motywu.
 */
export type Theme = "light" | "dark";

/** Klucz w localStorage — ten sam co w skrypcie inline w index.html. */
export const THEME_STORAGE_KEY = "theme";
export const SYSTEM_LIGHT_QUERY = "(prefers-color-scheme: light)";
/** Motyw HTML z prerenderingu i bez JS (zob. `:root` w index.css). */
export const DEFAULT_THEME: Theme = "dark";

/** Kolor paska przeglądarki (meta theme-color) = `--color-background` motywu. */
const THEME_COLORS: Record<Theme, string> = { dark: "#0B0F14", light: "#F6F8FA" };

const isTheme = (value: unknown): value is Theme => value === "light" || value === "dark";

/** Motyw wybrany ręcznie przez użytkownika (null — brak wyboru, podążamy za systemem). */
export const getStoredTheme = (): Theme | null => {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(value) ? value : null;
  } catch {
    return null;
  }
};

export const getSystemTheme = (): Theme => (window.matchMedia(SYSTEM_LIGHT_QUERY).matches ? "light" : "dark");

const readTheme = (): Theme => {
  const value = document.documentElement.dataset.theme;
  return isTheme(value) ? value : DEFAULT_THEME;
};

const listeners = new Set<() => void>();

const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
  listeners.forEach((listener) => listener());
};

/** Ustawia motyw i zapamiętuje wybór (od tej chwili zmiana motywu systemu go nie nadpisuje). */
export const setTheme = (theme: Theme) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Tryb prywatny / zablokowany storage — motyw działa do końca wizyty.
  }
  applyTheme(theme);
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  // Brak atrybutu (np. testy, skrypt inline nie zadziałał) — dobierz motyw tak jak index.html.
  if (!isTheme(document.documentElement.dataset.theme)) applyTheme(getStoredTheme() ?? getSystemTheme());

  const system = window.matchMedia(SYSTEM_LIGHT_QUERY);
  const onSystemChange = () => {
    if (!getStoredTheme()) applyTheme(getSystemTheme());
  };
  // Wybór w innej karcie.
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) applyTheme(getStoredTheme() ?? getSystemTheme());
  };

  system.addEventListener("change", onSystemChange);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    system.removeEventListener("change", onSystemChange);
    window.removeEventListener("storage", onStorage);
  };
};

/**
 * Aktualny motyw. Przy prerenderingu i hydratacji zwraca DEFAULT_THEME (zgodność z HTML
 * z serwera), zaraz potem React podmienia go na motyw odczytany z <html>.
 */
export const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, readTheme, () => DEFAULT_THEME);
  return { theme, setTheme, toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark") };
};
