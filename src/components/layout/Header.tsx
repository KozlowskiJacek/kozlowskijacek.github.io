import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaBars, FaXmark } from "react-icons/fa6";
import useSmoothScroll from "../../hooks/useSmoothScroll";
import useScrollSpy from "../../hooks/useScrollSpy";
import type { NavConfig } from "../../data/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import Container from "../ui/Container";

type HeaderProps = Omit<NavConfig, "id">;

const SCROLL_THRESHOLD = 8;

const linkClass = (active: boolean) =>
  `relative py-1 text-small font-medium transition-colors duration-200 hover:text-fg focus-visible:outline-none focus-visible:text-fg ` +
  `after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-300 ` +
  (active ? "text-fg after:scale-x-100" : "text-fg-secondary after:scale-x-0");

const mobileLinkClass = (active: boolean) =>
  `w-full rounded-lg px-4 py-3 text-left text-body transition-colors ${
    active ? "bg-surface-elevated text-fg" : "text-fg-secondary hover:bg-surface hover:text-fg"
  }`;

const Header = ({ links, mode, logoTo }: HeaderProps) => {
  const { t } = useTranslation();
  const scrollTo = useSmoothScroll();
  const navigate = useNavigate();

  const ids = useMemo(() => links.map((link) => link.id), [links]);
  const firstId = ids[0];
  const [activeId, setActiveId] = useScrollSpy(ids, firstId);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigation = (id: string) => {
    setActiveId(id);
    if (mode === "navigate") navigate(`/${id}`);
    else scrollTo(id);
    setIsOpen(false);
  };

  const solid = scrolled || isOpen;

  const logoClass =
    "group inline-flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm";
  const logoContent = (
    <>
      <span
        aria-hidden="true"
        className="h-2.5 w-2.5 rounded-[3px] bg-accent transition-transform duration-300 group-hover:rotate-45"
      />
      Jacek Kozłowski
    </>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ease-out ${
        solid
          ? "border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70"
          : "border-transparent bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        {logoTo ? (
          <Link to={logoTo} className={logoClass}>
            {logoContent}
          </Link>
        ) : (
          <button type="button" onClick={() => handleNavigation(firstId)} className={logoClass}>
            {logoContent}
          </button>
        )}

        <nav className="hidden flex-1 items-center justify-end gap-8 md:flex">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavigation(link.id)}
              className={linkClass(activeId === link.id)}
              aria-current={activeId === link.id ? "true" : undefined}
            >
              {t(link.labelKey)}
            </button>
          ))}
          <span aria-hidden="true" className="h-5 w-px bg-border-strong" />
          <LanguageSwitcher />
        </nav>

        {/* Menu mobilne */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-full text-xl text-fg transition-colors hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <FaXmark aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {isOpen && (
        <nav className="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavigation(link.id)}
                className={mobileLinkClass(activeId === link.id)}
                aria-current={activeId === link.id ? "true" : undefined}
              >
                {t(link.labelKey)}
              </button>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
};

export default Header;
