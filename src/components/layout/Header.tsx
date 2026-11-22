import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { contactLink, mainLinks, paths, serviceLinks } from "../../data/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import Container from "../ui/Container";

const SCROLL_THRESHOLD = 8;

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `relative py-1 text-small font-medium transition-colors duration-200 hover:text-fg focus-visible:outline-none focus-visible:text-fg ` +
  `after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-300 ` +
  (isActive ? "text-fg after:scale-x-100" : "text-fg-secondary after:scale-x-0");

const Header = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ease-out ${
        scrolled
          ? "border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70"
          : "border-transparent bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link
          to={paths.home}
          className="group inline-flex items-center gap-2.5 rounded-sm font-display text-lg font-semibold tracking-tight text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-[3px] bg-accent transition-transform duration-300 group-hover:rotate-45"
          />
          Jacek Kozłowski
        </Link>

        <nav className="hidden flex-1 items-center justify-end gap-8 lg:flex">
          {[...serviceLinks, ...mainLinks, contactLink].map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {t(link.labelKey)}
            </NavLink>
          ))}
          <LanguageSwitcher />
        </nav>
      </Container>
    </header>
  );
};

export default Header;
