import { useTranslation } from "react-i18next";
import { FaArrowUp } from "react-icons/fa6";
import useSmoothScroll from "../../hooks/useSmoothScroll";
import Container from "../ui/Container";

const Footer = () => {
  const { t } = useTranslation();
  const scrollTo = useSmoothScroll();

  return (
    <footer className="border-t border-border bg-background">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-8">
        <p className="text-small text-fg-muted">Copyrights © 2025 Jacek Kozłowski</p>

        <button
          type="button"
          onClick={() => scrollTo("home")}
          aria-label={t("footer.back_to_top")}
          className="grid h-10 w-10 place-items-center rounded-full border border-border-strong text-fg-secondary transition-[color,border-color,transform] duration-200 ease-out hover:border-accent/50 hover:text-accent motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <FaArrowUp aria-hidden="true" />
        </button>
      </Container>
    </footer>
  );
};

export default Footer;
