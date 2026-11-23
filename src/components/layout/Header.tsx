import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaChevronDown, FaXmark } from "react-icons/fa6";
import {
  contactLink,
  mainLinks,
  paths,
  serviceLinks,
  servicesPrefix,
} from "../../data/navigation";
import { buttonClasses } from "../ui/buttonStyles";
import LanguageSwitcher from "./LanguageSwitcher";
import Container from "../ui/Container";

const SCROLL_THRESHOLD = 8;
/** Breakpoint `lg` z Tailwinda — od niego widać nawigację desktopową. */
const DESKTOP_QUERY = "(min-width: 1024px)";

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const desktopLinkClass = (active: boolean) =>
  `relative inline-flex items-center gap-1.5 rounded-sm py-1 text-small font-medium transition-colors duration-200 hover:text-fg ${focusRing} ` +
  `after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-300 ` +
  (active ? "text-fg after:scale-x-100" : "text-fg-secondary after:scale-x-0");

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-lg px-4 py-3 text-h3 font-medium transition-colors ${focusRing} ${
    isActive ? "bg-surface-elevated text-fg" : "text-fg-secondary hover:bg-surface hover:text-fg"
  }`;

/** Rozwijane menu „Usługi” (wzorzec disclosure: przycisk + lista linków). */
const ServicesDropdown = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  /** Kursor nad menu — wtedy klik nie zamyka panelu otwartego najechaniem. */
  const hovering = useRef(false);

  const active = pathname.startsWith(servicesPrefix);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        hovering.current = true;
        setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        hovering.current = false;
        setOpen(false);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => hovering.current || !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className={desktopLinkClass(active)}
      >
        {t("common:navbar.services")}
        <FaChevronDown
          aria-hidden="true"
          className={`text-[0.65rem] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          // Pozycjonowanie na zewnętrznym divie: framer-motion nadpisuje `transform` animowanego elementu.
          <div id={panelId} className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3">
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
            <ul className="rounded-xl border border-border-strong bg-surface-elevated p-2 shadow-lift">
              {serviceLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-lg px-4 py-3 transition-colors ${focusRing} ${
                        isActive ? "bg-surface" : "hover:bg-surface"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`block text-small font-semibold ${isActive ? "text-accent" : "text-fg"}`}
                        >
                          {t(link.labelKey)}
                        </span>
                        {link.descriptionKey && (
                          <span className="mt-0.5 block text-small text-fg-muted">
                            {t(link.descriptionKey)}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Header = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Zmiana trasy zamyka menu (np. przycisk „wstecz”).
  useEffect(closeMenu, [pathname, closeMenu]);

  // Otwarte menu mobilne: blokada scrolla strony, Esc zamyka, przejście na desktop zamyka.
  useEffect(() => {
    if (!menuOpen) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", closeMenu);
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", closeMenu);
    };
  }, [menuOpen, closeMenu]);

  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b print:hidden transition-[background-color,border-color,backdrop-filter] duration-300 ease-out ${
          solid
            ? "border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70"
            : "border-transparent bg-transparent"
        }`}
      >
        <Container className="flex h-16 items-center justify-between gap-6">
          <Link
            to={paths.home}
            onClick={closeMenu}
            className={`group inline-flex items-center gap-2.5 rounded-sm font-display text-lg font-semibold tracking-tight text-fg ${focusRing}`}
          >
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-[3px] bg-accent transition-transform duration-300 group-hover:rotate-45"
            />
            Jacek Kozłowski
          </Link>

          <nav
            aria-label={t("common:navbar.main_nav")}
            className="hidden flex-1 items-center justify-end gap-8 lg:flex"
          >
            <ServicesDropdown />
            {mainLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => desktopLinkClass(isActive)}>
                {t(link.labelKey)}
              </NavLink>
            ))}
            <span aria-hidden="true" className="h-5 w-px bg-border-strong" />
            <LanguageSwitcher />
            <NavLink to={contactLink.to} className={buttonClasses({ size: "sm" })}>
              {t(contactLink.labelKey)}
            </NavLink>
          </nav>

          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSwitcher />
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className={`grid h-10 w-10 place-items-center rounded-full text-xl text-fg transition-colors hover:bg-surface-elevated ${focusRing}`}
              aria-label={t(menuOpen ? "common:navbar.close_menu" : "common:navbar.open_menu")}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <FaXmark aria-hidden="true" /> : <FaBars aria-hidden="true" />}
            </button>
          </div>
        </Container>
      </header>

      {/* Poza <header>: backdrop-filter headera zawęziłby `position: fixed` do jego wysokości. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label={t("common:navbar.main_nav")}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain bg-background lg:hidden print:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Container className="flex min-h-full flex-col gap-8 py-8">
              <div>
                <p className="mb-2 px-4 text-small font-semibold uppercase tracking-wider text-fg-muted">
                  {t("common:navbar.services")}
                </p>
                <ul className="flex flex-col gap-1">
                  {serviceLinks.map((link) => (
                    <li key={link.to}>
                      <NavLink to={link.to} onClick={closeMenu} className={mobileLinkClass}>
                        {t(link.labelKey)}
                        {link.descriptionKey && (
                          <span className="mt-0.5 block text-small font-normal text-fg-muted">
                            {t(link.descriptionKey)}
                          </span>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <ul className="flex flex-col gap-1 border-t border-border pt-6">
                {mainLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink to={link.to} onClick={closeMenu} className={mobileLinkClass}>
                      {t(link.labelKey)}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <NavLink
                to={contactLink.to}
                onClick={closeMenu}
                className={buttonClasses({ size: "lg", className: "mt-auto w-full" })}
              >
                {t(contactLink.labelKey)}
              </NavLink>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
