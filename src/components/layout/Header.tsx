import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaBars, FaXmark } from "react-icons/fa6";
import useSmoothScroll from "../../hooks/useSmoothScroll";
import useScrollSpy from "../../hooks/useScrollSpy";
import type { NavConfig } from "../../data/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

type HeaderProps = Omit<NavConfig, "id">;

const linkClass = (active: boolean) =>
  `cursor-pointer hover:scale-110 hover:text-main_accent transition-all ${
    active ? "scale-110 text-main_accent" : ""
  }`;

const Header = ({ links, mode, logoTo }: HeaderProps) => {
  const { t } = useTranslation();
  const scrollTo = useSmoothScroll();
  const navigate = useNavigate();

  const ids = useMemo(() => links.map((link) => link.id), [links]);
  const firstId = ids[0];
  const [activeId, setActiveId] = useScrollSpy(ids, firstId);
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (id: string) => {
    setActiveId(id);
    if (mode === "navigate") navigate(`/${id}`);
    else scrollTo(id);
    setIsOpen(false);
  };

  const renderLinks = () =>
    links.map((link) => (
      <a
        key={link.id}
        onClick={() => handleNavigation(link.id)}
        className={linkClass(activeId === link.id)}
      >
        {t(link.labelKey)}
      </a>
    ));

  const logoClass = "text-2xl text-white font-bold cursor-pointer";

  return (
    <header className="z-50 bg-bg_color_1 text-white fixed top-0 left-0 w-full p-5 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {logoTo ? (
          <Link to={logoTo} className={logoClass}>
            Jacek Kozłowski
          </Link>
        ) : (
          <a onClick={() => handleNavigation(firstId)} className={logoClass}>
            Jacek Kozłowski
          </a>
        )}

        <div className="hidden md:flex items-center justify-end flex-1 space-x-8 text-lg">
          {renderLinks()}
          <LanguageSwitcher />
        </div>

        {/* Menu mobilne */}
        <div className="flex items-center space-x-4 md:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setIsOpen((open) => !open)}
            className="text-2xl md:hidden"
            aria-label="Menu"
          >
            {isOpen ? <FaXmark aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 bg-bg_color_1 text-white flex flex-col items-center space-y-4 py-4 shadow-lg">
          {renderLinks()}
        </div>
      )}
    </header>
  );
};

export default Header;
