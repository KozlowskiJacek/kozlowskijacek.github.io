import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_OUT, enter } from "../lib/animations";
import { isProjectCategory, projectCategories, publishedProjects, type Project } from "../data/projects";
import { paths } from "../data/navigation";
import Seo from "../components/Seo";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import PortfolioFilters, { type PortfolioFilter } from "../components/portfolio/PortfolioFilters";
import ProjectCard from "../components/portfolio/ProjectCard";
import VideoModal from "../components/portfolio/VideoModal";
import ReelsSection from "../components/portfolio/ReelsSection";

/** Parametr adresu z aktywnym filtrem: /portfolio?kategoria=video */
const FILTER_PARAM = "kategoria";

const cardTransition = { duration: 0.3, ease: EASE_OUT };

const PortfolioPage = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [videoProject, setVideoProject] = useState<Project | null>(null);

  const param = searchParams.get(FILTER_PARAM);
  // Nieznana wartość w adresie → „Wszystko”.
  const filter: PortfolioFilter = isProjectCategory(param) ? param : "all";

  const items =
    filter === "all" ? publishedProjects : publishedProjects.filter((project) => project.category === filter);

  const counts = useMemo(() => {
    const result = { all: publishedProjects.length } as Record<PortfolioFilter, number>;
    for (const category of projectCategories) {
      result[category] = publishedProjects.filter((project) => project.category === category).length;
    }
    return result;
  }, []);

  const changeFilter = (next: PortfolioFilter) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        if (next === "all") params.delete(FILTER_PARAM);
        else params.set(FILTER_PARAM, next);
        return params;
      },
      // replace: przełączanie filtrów nie zaśmieca historii przycisku „Wstecz”.
      { replace: true, preventScrollReset: true },
    );
  };

  return (
    <Section id="portfolio" padding="page" className="flex-col">
      <Seo titleKey="portfolio:page.meta.title" descriptionKey="portfolio:page.meta.description" />
      <header className="flex w-full max-w-3xl flex-col items-center gap-4 text-center">
        <p className={`text-small font-semibold uppercase tracking-wider text-accent ${enter(0)}`}>
          {t("common:navbar.portfolio")}
        </p>
        <SectionHeading
          as="h1"
          size="h1"
          align="center"
          className={enter(1)}
          title={t("portfolio:page.title")}
          accent={t("portfolio:page.accent")}
        />
        <p className={`max-w-2xl text-body text-fg-secondary md:text-body-lg ${enter(2)}`}>
          {t("portfolio:page.text")}
        </p>
      </header>

      <PortfolioFilters value={filter} onChange={changeFilter} counts={counts} />

      {/* Ogłoszenie liczby wyników po zmianie filtra. */}
      <p aria-live="polite" className="sr-only">
        {t("portfolio:page.results", { count: items.length })}
      </p>

      {items.length > 0 ? (
        <motion.ul layout className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* initial={false}: karty z prerenderingu widoczne od razu (bez czekania na JS), animacja tylko przy filtrowaniu. */}
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((project, index) => (
              <motion.li
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={cardTransition}
              >
                <ProjectCard project={project} onPlay={setVideoProject} priority={index === 0} headingLevel="h2" />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={cardTransition}
          className="flex w-full max-w-xl flex-col items-center gap-5 rounded-2xl border border-dashed border-border-strong px-6 py-10 text-center"
        >
          <p className="text-body text-fg-secondary">{t("portfolio:page.empty")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="secondary" onClick={() => changeFilter("all")}>
              {t("portfolio:page.show_all")}
            </Button>
            <Button to={paths.contact}>{t("common:cta")}</Button>
          </div>
        </motion.div>
      )}

      <ReelsSection />

      <VideoModal project={videoProject} onClose={() => setVideoProject(null)} />
    </Section>
  );
};

export default PortfolioPage;
