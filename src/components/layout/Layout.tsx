import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import PageLoader from "./PageLoader";

/** Wspólny układ podstron: header, treść trasy (ładowana leniwie) i stopka. */
const Layout = () => (
  <div className="flex min-h-screen flex-col bg-background font-sans text-fg">
    <Header />
    <main id="main" className="flex-1">
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
  </div>
);

export default Layout;
