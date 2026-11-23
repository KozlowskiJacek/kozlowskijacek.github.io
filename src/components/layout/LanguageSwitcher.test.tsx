import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useTranslation } from "react-i18next";
import i18n from "../../lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

/** Dowolny przetłumaczony tekst obok przełącznika — sprawdza, że reszta UI też zmienia język. */
const SampleText = () => {
  const { t } = useTranslation();
  return <p data-testid="sample">{t("common:navbar.contact")}</p>;
};

const setup = () => {
  const user = userEvent.setup();
  render(
    <>
      <LanguageSwitcher />
      <SampleText />
    </>,
  );
  return { user, button: screen.getByRole("button") };
};

const activeLabel = () => screen.getByText(/^(PL|EN)$/, { selector: ".text-accent" }).textContent;

describe("LanguageSwitcher", () => {
  it("pokazuje aktywny język i opis akcji w nazwie dostępnej", () => {
    const { button } = setup();

    expect(activeLabel()).toBe("PL");
    // Nazwa = widoczne „PL / EN” + opis akcji (spacje między spanami jsdom liczy inaczej niż przeglądarka).
    expect(button).toHaveAccessibleName(/^PL\s*\/\s*EN/);
    expect(button.textContent).toContain(i18n.getFixedT("pl")("common:navbar.switch_language"));
  });

  it("kliknięcie przełącza PL → EN → PL", async () => {
    const { user, button } = setup();
    const contactLabel = (lang: string) => i18n.getFixedT(lang)("common:navbar.contact");

    await user.click(button);
    expect(i18n.resolvedLanguage).toBe("en");
    expect(activeLabel()).toBe("EN");
    expect(screen.getByTestId("sample")).toHaveTextContent(contactLabel("en"));

    await user.click(button);
    expect(i18n.resolvedLanguage).toBe("pl");
    expect(activeLabel()).toBe("PL");
    expect(screen.getByTestId("sample")).toHaveTextContent(contactLabel("pl"));
  });

  it("aktualizuje atrybut lang w <html> i zapamiętuje wybór", async () => {
    const { user, button } = setup();

    await user.click(button);

    expect(document.documentElement.lang).toBe("en");
    expect(localStorage.getItem("i18nextLng")).toBe("en");
  });

  it("działa z klawiatury (Enter)", async () => {
    const { user, button } = setup();

    button.focus();
    await user.keyboard("{Enter}");

    expect(i18n.resolvedLanguage).toBe("en");
  });
});
