import { Outlet } from "react-router-dom";
import type { NavConfig } from "../../data/navigation";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  nav: NavConfig;
  /** Stopka (z przyciskiem „do góry”) jest tylko na stronie głównej. */
  withFooter?: boolean;
};

const Layout = ({ nav, withFooter = true }: LayoutProps) => {
  const { id, ...headerProps } = nav;

  return (
    <div className="min-h-screen bg-background font-sans text-fg">
      <Header key={id} {...headerProps} />
      <Outlet />
      {withFooter && <Footer />}
    </div>
  );
};

export default Layout;
