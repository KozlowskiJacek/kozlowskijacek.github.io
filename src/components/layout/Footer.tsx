import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa6";
import "boxicons/css/boxicons.min.css";
import { footerColumns, paths } from "../../data/navigation";
import { socials } from "../../data/socials";
import Container from "../ui/Container";

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const Footer = () => {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const year = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });

  return (
    <footer className="border-t border-border bg-surface print:hidden">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:grid-cols-4 md:grid-cols-[1.4fr_repeat(4,1fr)] md:gap-8">
        <div className="col-span-2 max-w-xs sm:col-span-4 md:col-span-1">
          <Link
            to={paths.home}
            className={`inline-flex items-center gap-2.5 rounded-sm font-display text-lg font-semibold tracking-tight text-fg ${focusRing}`}
          >
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-[3px] bg-accent" />
            Jacek Kozłowski
          </Link>
          <p className="mt-3 text-small text-fg-muted">{t("footer.tagline")}</p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label={t("footer.socials")}>
            {socials
              .filter((social) => social.href)
              .map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`grid h-10 w-10 place-items-center rounded-full border border-border-strong text-lg text-fg-secondary transition-colors duration-200 hover:border-accent/50 hover:text-accent ${focusRing}`}
                  >
                    <i aria-hidden="true" className={`bx ${social.icon}`} />
                  </a>
                </li>
              ))}
          </ul>
        </div>

        <nav aria-label={t("footer.sitemap")} className="contents">
          {footerColumns.map((column) => (
            <div key={column.titleKey}>
              <h2 className="text-small font-semibold uppercase tracking-wider text-fg">
                {t(column.titleKey)}
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`rounded-sm text-small text-fg-secondary transition-colors hover:text-accent ${focusRing}`}
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-wrap items-center justify-between gap-4 py-6">
          <p className="text-small text-fg-muted">
            © {year} Jacek Kozłowski. {t("footer.rights")}{" "}
            <Link
              to={paths.privacy}
              className={`rounded-sm underline-offset-4 transition-colors hover:text-accent hover:underline ${focusRing}`}
            >
              {t("footer.privacy")}
            </Link>
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className={`group inline-flex items-center gap-2 rounded-full text-small text-fg-secondary transition-colors hover:text-accent ${focusRing}`}
          >
            {t("footer.back_to_top")}
            <span className="grid h-9 w-9 place-items-center rounded-full border border-border-strong transition-[border-color,transform] duration-200 ease-out group-hover:border-accent/50 motion-safe:group-hover:-translate-y-0.5">
              <FaArrowUp aria-hidden="true" />
            </span>
          </button>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
