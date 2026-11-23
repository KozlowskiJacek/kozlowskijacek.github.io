import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import i18n from "../../lib/i18n";
import { SYSTEM_LIGHT_QUERY, THEME_STORAGE_KEY } from "../../lib/theme";
import ThemeToggle from "./ThemeToggle";
import indexHtml from "../../../index.html?raw";

const t = i18n.getFixedT("pl");
const root = document.documentElement;

/** matchMedia z zadanym motywem systemu; `change` pozwala zasymulować jego zmianę. */
const mockSystemTheme = (light: boolean) => {
  const listeners = new Set<() => void>();
  const state = { light };
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) =>
      ({
        get matches() {
          return query === SYSTEM_LIGHT_QUERY && state.light;
        },
        media: query,
        addEventListener: (_: string, listener: () => void) => listeners.add(listener),
        removeEventListener: (_: string, listener: () => void) => listeners.delete(listener),
      }) as unknown as MediaQueryList,
  );
  return {
    change: (next: boolean) => {
      state.light = next;
      listeners.forEach((listener) => listener());
    },
  };
};

const themeColor = () => document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')!.content;

beforeEach(() => {
  delete root.dataset.theme;
  const meta = document.createElement("meta");
  meta.name = "theme-color";
  meta.content = "#0B0F14";
  document.head.append(meta);
});

afterEach(() => {
  vi.restoreAllMocks();
  document.querySelector('meta[name="theme-color"]')?.remove();
});

describe("ThemeToggle", () => {
  it("bez zapisanego wyboru przyjmuje motyw systemu", () => {
    mockSystemTheme(true);
    render(<ThemeToggle />);

    expect(root.dataset.theme).toBe("light");
    expect(screen.getByRole("button", { name: t("common:navbar.theme_to_dark") })).toBeInTheDocument();
  });

  it("kliknięcie przełącza motyw, zapamiętuje wybór i aktualizuje theme-color", async () => {
    mockSystemTheme(false);
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: t("common:navbar.theme_to_light") });

    await user.click(button);
    expect(root.dataset.theme).toBe("light");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
    expect(themeColor()).toBe("#F6F8FA");
    expect(button).toHaveAccessibleName(t("common:navbar.theme_to_dark"));

    await user.click(button);
    expect(root.dataset.theme).toBe("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(themeColor()).toBe("#0B0F14");
  });

  it("zapisany wybór ma pierwszeństwo przed motywem systemu i jego zmianą", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    const system = mockSystemTheme(true);
    render(<ThemeToggle />);

    expect(root.dataset.theme).toBe("dark");
    act(() => system.change(true));
    expect(root.dataset.theme).toBe("dark");
  });

  it("bez zapisanego wyboru podąża za zmianą motywu systemu", () => {
    const system = mockSystemTheme(false);
    render(<ThemeToggle />);

    act(() => system.change(true));
    expect(root.dataset.theme).toBe("light");
    expect(screen.getByRole("button")).toHaveAccessibleName(t("common:navbar.theme_to_dark"));
  });

  it("działa z klawiatury (Enter)", async () => {
    mockSystemTheme(false);
    const user = userEvent.setup();
    render(<ThemeToggle />);

    screen.getByRole("button").focus();
    await user.keyboard("{Enter}");

    expect(root.dataset.theme).toBe("light");
  });
});

describe("skrypt motywu w index.html", () => {
  const script = /<script>([\s\S]*?)<\/script>/.exec(indexHtml)![1];
  // Uruchamiamy dokładnie ten skrypt inline, który trafia do HTML strony.
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const runScript = () => (new Function(script) as () => void)();

  it("ustawia motyw systemu, gdy nie ma zapisanego wyboru", () => {
    mockSystemTheme(true);
    runScript();

    expect(root.dataset.theme).toBe("light");
    expect(themeColor()).toBe("#F6F8FA");
  });

  it("używa zapisanego wyboru (ten sam klucz co src/lib/theme.ts)", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    mockSystemTheme(true);
    runScript();

    expect(root.dataset.theme).toBe("dark");
    expect(themeColor()).toBe("#0B0F14");
  });
});
