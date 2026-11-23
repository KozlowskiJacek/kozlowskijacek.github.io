import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import { reveal, staggerContainer, staggerItem } from "../../lib/animations";
import { publishedProjects, projectCategoryLabelKeys } from "../../data/projects";
import { caseStudyPath } from "../../data/navigation";
import Badge from "../../components/ui/Badge";
import Card from "../../components/ui/Card";
import EmployerSection from "./EmployerSection";

/** Projekty istotne dla pracodawcy (audience employer/both), które mają publiczny kod. */
const technicalProjects = publishedProjects.filter(
  (project) => project.audience !== "client" && project.links.github,
);

const linkClasses =
  "inline-flex items-center gap-1.5 rounded-sm text-small font-medium text-accent underline-offset-4 hover:text-accent-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const TechnicalProjects = () => {
  const { t } = useTranslation();

  if (technicalProjects.length === 0) return null;

  return (
    <EmployerSection
      id="projects"
      bg="secondary"
      title={t("employer.projects.title")}
      accent={t("employer.projects.accent")}
      text={t("employer.projects.text")}
    >
      <motion.ul
        className="grid gap-4 md:grid-cols-2"
        variants={staggerContainer(0.06)}
        {...reveal}
      >
        {technicalProjects.map((project) => (
          <motion.li key={project.slug} variants={staggerItem}>
            <Card as="article" className="flex h-full flex-col p-5 sm:p-6">
              <p className="text-small text-fg-muted">
                {t(projectCategoryLabelKeys[project.category])} · {project.year}
              </p>
              <h3 className="mt-1 text-h3 text-fg">{project.title}</h3>
              <p className="mt-2 text-body text-fg-secondary">{t(project.summaryKey)}</p>
              {project.tech.length > 0 && (
                <ul aria-label={t("pages.case_study.tech")} className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <li key={tech}>
                      <Badge tone="accent">{tech}</Badge>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5">
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClasses}
                >
                  <FaGithub aria-hidden="true" />
                  {t("employer.projects.code")}
                  <span className="sr-only">{t("pages.case_study.new_tab")}</span>
                </a>
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClasses}
                  >
                    <FaArrowUpRightFromSquare aria-hidden="true" className="text-[0.8em]" />
                    {t("pages.case_study.live")}
                    <span className="sr-only">{t("pages.case_study.new_tab")}</span>
                  </a>
                )}
                <Link to={caseStudyPath(project.slug)} className={linkClasses}>
                  {t("home.work.case_study")}
                  <FaArrowRight aria-hidden="true" className="text-[0.8em]" />
                  <span className="sr-only">: {project.title}</span>
                </Link>
              </div>
            </Card>
          </motion.li>
        ))}
      </motion.ul>
    </EmployerSection>
  );
};

export default TechnicalProjects;
