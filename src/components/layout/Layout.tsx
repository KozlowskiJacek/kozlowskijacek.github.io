import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import Footer from "./Footer";
import PageLoader from "./PageLoader";

/** Wspólny układ podstron: header, treść trasy (ładowana leniwie) i stopka. */
const Layout = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-fg print:min-h-0 print:bg-white">
      {/* Skip link: pierwszy element w kolejności Tab, widoczny dopiero po otrzymaniu fokusu. */}
      <a
        href="#main"
        className="sr-only z-[70] rounded-full bg-accent px-5 py-3 text-small font-semibold text-accent-contrast shadow-lift focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-fg focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {t("common:navbar.skip_to_content")}
      </a>
      <Header />
      {/* tabIndex={-1}: skip link przenosi tu fokus (nie tylko przewija). */}
      <main id="main" tabIndex={-1} className="flex-1 scroll-mt-16 focus:outline-none">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
