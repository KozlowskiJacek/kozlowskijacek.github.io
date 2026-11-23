import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { fadeIn, reveal, staggerContainer, staggerItem } from "../../lib/animations";
import { featuredProjects, projectCategoryLabelKeys, projectCategoryTone } from "../../data/projects";
import { caseStudyPath, paths } from "../../data/navigation";
import Section from "../../components/ui/Section";
import SectionHeading from "../../components/ui/SectionHeading";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";


/** Wybrane realizacje (flaga `featured` w projects.ts) z linkiem do case study. */
const FeaturedWork = () => {
  const { t } = useTranslation();

  return (
    <Section id="work" bg="secondary" className="flex-col">
      <motion.div
        className="flex w-full flex-col items-center gap-4 text-center"
        variants={fadeIn("bottom")}
        {...reveal}
      >
        <SectionHeading align="center" title={t("home.work.title")} accent={t("home.work.accent")} />
        <p className="max-w-2xl text-body text-fg-secondary md:text-body-lg">{t("home.work.text")}</p>
      </motion.div>

      <motion.ul
        className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer()}
        {...reveal}
      >
        {featuredProjects.map((project) => (
          <motion.li key={project.slug} variants={staggerItem}>
            <Card
              as="article"
              interactive
              className="group relative flex h-full flex-col overflow-hidden has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background"
            >
              <div className="aspect-[16/10] overflow-hidden border-b border-border bg-surface">
                <img
                  className="h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
                  src={project.cover}
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <Badge tone={projectCategoryTone[project.category]} className="self-start">
                  {t(projectCategoryLabelKeys[project.category])}
                </Badge>
                <h3 className="text-h3 text-fg">
                  {/* Rozciągnięty link: cała karta jest klikalna, a czytnik ogłasza tylko tytuł. */}
                  <Link
                    to={caseStudyPath(project.slug)}
                    className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
                  >
                    {project.title}
                  </Link>
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-auto inline-flex items-center gap-2 pt-2 text-small font-semibold text-accent"
                >
                  {t("home.work.case_study")}
                  <FaArrowRight className="transition-transform duration-200 motion-safe:group-hover:translate-x-1" />
                </span>
              </div>
            </Card>
          </motion.li>
        ))}
      </motion.ul>

      <Button to={paths.portfolio} variant="secondary" size="lg">
        {t("home.work.all")}
        <FaArrowRight aria-hidden="true" className="text-small" />
      </Button>
    </Section>
  );
};

export default FeaturedWork;
