import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import i18n from "../lib/i18n";
import { projectCategories, projectCategoryLabelKeys, publishedProjects, type ProjectCategory } from "../data/projects";
import { renderWithRouter } from "../test/render";
import PortfolioPage from "./PortfolioPage";

const t = i18n.getFixedT("pl");
const filterButton = (name: string) =>
  within(screen.getByRole("group", { name: t("portfolio:page.filters_label") })).getByRole("button", { name });
const categoryButton = (category: ProjectCategory) => filterButton(t(projectCategoryLabelKeys[category]));
const cardTitles = () => screen.queryAllByRole("article").map((card) => within(card).getByRole("heading").textContent);
const titlesIn = (category: ProjectCategory) =>
  publishedProjects.filter((project) => project.category === category).map((project) => project.title);

const nonEmpty = projectCategories.filter((category) => titlesIn(category).length > 0);

describe("PortfolioPage — filtrowanie", () => {
  it("domyślnie pokazuje wszystkie opublikowane realizacje", () => {
    renderWithRouter(<PortfolioPage />, { route: "/portfolio" });

    expect(filterButton(t("portfolio:page.all"))).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByRole("article")).toHaveLength(publishedProjects.length);
  });

  it.each(nonEmpty)(
    "filtr „%s” pokazuje tylko realizacje z tej kategorii i zapisuje go w adresie",
    async (category) => {
      const user = userEvent.setup();
      renderWithRouter(<PortfolioPage />, { route: "/portfolio" });

      await user.click(categoryButton(category));

      expect(categoryButton(category)).toHaveAttribute("aria-pressed", "true");
      expect(filterButton(t("portfolio:page.all"))).toHaveAttribute("aria-pressed", "false");
      expect(cardTitles()).toEqual(titlesIn(category));
      expect(screen.getByTestId("location")).toHaveTextContent(`/portfolio?kategoria=${category}`);
    },
  );

  it("czyta filtr z parametru ?kategoria", () => {
    const [category] = nonEmpty;
    renderWithRouter(<PortfolioPage />, { route: `/portfolio?kategoria=${category}` });

    expect(categoryButton(category)).toHaveAttribute("aria-pressed", "true");
    expect(cardTitles()).toEqual(titlesIn(category));
  });

  it("nieznana kategoria w adresie → „Wszystko”", () => {
    renderWithRouter(<PortfolioPage />, { route: "/portfolio?kategoria=nie-ma-takiej" });

    expect(filterButton(t("portfolio:page.all"))).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByRole("article")).toHaveLength(publishedProjects.length);
  });

  it("„Wszystko” usuwa parametr z adresu", async () => {
    const user = userEvent.setup();
    renderWithRouter(<PortfolioPage />, { route: `/portfolio?kategoria=${nonEmpty[0]}` });

    await user.click(filterButton(t("portfolio:page.all")));

    expect(screen.getByTestId("location")).toHaveTextContent(/^\/portfolio$/);
    expect(screen.getAllByRole("article")).toHaveLength(publishedProjects.length);
  });

  it("ogłasza liczbę wyników czytnikom ekranu", async () => {
    const user = userEvent.setup();
    const [category] = nonEmpty;
    renderWithRouter(<PortfolioPage />, { route: "/portfolio" });

    await user.click(categoryButton(category));

    expect(screen.getByText(t("portfolio:page.results", { count: titlesIn(category).length }))).toBeInTheDocument();
  });
});
