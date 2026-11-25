import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import i18n from "../../lib/i18n";
import { reelTitleKey, reels } from "../../data/reels";
import { renderWithRouter } from "../../test/render";
import ReelsSection from "./ReelsSection";

const t = i18n.getFixedT("pl");

describe("ReelsSection", () => {
  it("pokazuje kafel każdej rolki z linkiem do Instagrama w nowej karcie", () => {
    renderWithRouter(<ReelsSection />);

    const section = screen.getByRole("region", {
      name: `${t("portfolio:reels.title")} ${t("portfolio:reels.accent")}`,
    });

    for (const reel of reels) {
      const link = within(section).getByRole("link", { name: new RegExp(t(reelTitleKey(reel))) });
      expect(link).toHaveAttribute("href", reel.url);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("każda rolka ma tytuł i opis w obu językach", () => {
    for (const lang of ["pl", "en"]) {
      for (const reel of reels) {
        expect(i18n.exists(reelTitleKey(reel), { lng: lang })).toBe(true);
        expect(i18n.exists(`portfolio:reels.items.${reel.id}.summary`, { lng: lang })).toBe(true);
      }
    }
  });
});
