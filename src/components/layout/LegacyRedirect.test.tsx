import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { Route, Routes, useNavigationType } from "react-router-dom";
import { legacyRedirects, paths } from "../../data/navigation";
import { renderWithRouter } from "../../test/render";
import LegacyRedirect from "./LegacyRedirect";

/** Strona docelowa: tytuł + typ nawigacji, którą na nią trafiliśmy (PUSH / REPLACE / POP). */
const Target = ({ path }: { path: string }) => (
  <>
    <h1>{`page ${path}`}</h1>
    <p data-testid="navigation-type">{useNavigationType()}</p>
  </>
);

/** Te same trasy przekierowań co w App.tsx + strony docelowe jako znaczniki. */
const renderAt = (route: string) =>
  renderWithRouter(
    <Routes>
      {legacyRedirects.map(({ from, to }) => (
        <Route key={from} path={from} element={<LegacyRedirect to={to} />} />
      ))}
      {Object.values(paths).map((path) => (
        <Route key={path} path={path} element={<Target path={path} />} />
      ))}
    </Routes>,
    { route },
  );

describe("przekierowania starych tras", () => {
  it("każda stara trasa ma cel wśród aktualnych adresów", () => {
    const current = new Set<string>(Object.values(paths));
    for (const { from, to } of legacyRedirects) {
      expect(current.has(to), `${from} → ${to}`).toBe(true);
      expect(current.has(from), `${from} nie może zasłaniać aktualnej trasy`).toBe(false);
    }
  });

  it.each(legacyRedirects)("$from → $to", ({ from, to }) => {
    renderAt(from);

    expect(screen.getByTestId("location")).toHaveTextContent(new RegExp(`^${to}$`));
    expect(screen.getByRole("heading", { name: `page ${to}` })).toBeInTheDocument();
  });

  it("zachowuje query string i kotwicę", () => {
    const [{ from, to }] = legacyRedirects;
    renderAt(`${from}?lang=en#kontakt`);

    expect(screen.getByTestId("location")).toHaveTextContent(`${to}?lang=en#kontakt`);
  });

  it("zastępuje wpis w historii (replace), więc „Wstecz” nie wraca na stary adres", () => {
    const [{ from }] = legacyRedirects;
    renderAt(from);

    expect(screen.getByTestId("navigation-type")).toHaveTextContent("REPLACE");
  });
});
