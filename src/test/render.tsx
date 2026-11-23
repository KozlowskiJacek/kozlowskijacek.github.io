import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, useLocation } from "react-router-dom";

/** Render komponentu w routerze (MemoryRouter) i HelmetProvider — jak w aplikacji. */
export const renderWithRouter = (ui: ReactElement, { route = "/" }: { route?: string } = {}) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[route]}>
        {ui}
        <LocationProbe />
      </MemoryRouter>
    </HelmetProvider>,
  );

/** Aktualny adres routera w DOM — do asercji na przekierowaniach i query stringu. */
const LocationProbe = () => {
  const { pathname, search, hash } = useLocation();
  return <output data-testid="location">{`${pathname}${search}${hash}`}</output>;
};
