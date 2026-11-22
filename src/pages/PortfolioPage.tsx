import { useTranslation } from "react-i18next";
import PageIntro from "../components/PageIntro";
import Projects from "../sections/Projects";

const PortfolioPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageIntro
        id="portfolio"
        eyebrow={t("navbar.portfolio")}
        title={t("pages.portfolio.title")}
        text={t("pages.portfolio.text")}
      />
      <Projects />
    </>
  );
};

export default PortfolioPage;
