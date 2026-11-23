import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { reveal, staggerContainer, staggerItem } from "../../lib/animations";
import { projectCategoryLabelKeys, publishedProjects } from "../../data/projects";
import { caseStudyPath, paths } from "../../data/navigation";
import type { ServicePortfolioData, ServiceTone } from "../../data/services/types";
import Section from "../ui/Section";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import ProjectCover from "../portfolio/ProjectCover";
import ServiceSectionHeader from "./ServiceSectionHeader";
import { toneClasses } from "./tone";

/** Maks. liczba realizacji w mini-portfolio. */
const LIMIT = 3;

type ServiceProjectsProps = {
  id: string;
  portfolio: ServicePortfolioData;
  tone: ServiceTone;
  bg?: "primary" | "secondary";
};

/** Mini-portfolio podstrony: realizacje z wybranych kategorii projects.ts. */
const ServiceProjects = ({ id, portfolio, tone, bg = "primary" }: ServiceProjectsProps) => {
  const { t } = useTranslation();
  const classes = toneClasses[tone];
  const items = publishedProjects
    .filter((project) => project.audience !== "employer" && portfolio.categories.includes(project.category))
    .slice(0, LIMIT);

  return (
    <Section id={id} bg={bg} className="flex-col">
      <ServiceSectionHeader copy={portfolio} tone={tone} />

      {items.length > 0 ? (
        <motion.ul
          className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer()}
          {...reveal}
        >
          {items.map((project) => (
            <motion.li key={project.slug} variants={staggerItem}>
              <Card
                as="article"
                interactive
                className="group relative flex h-full flex-col overflow-hidden has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background"
              >
                <div className="aspect-[16/10] overflow-hidden border-b border-border bg-surface">
                  <ProjectCover project={project} />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <Badge tone={tone} className="self-start">
                    {t(projectCategoryLabelKeys[project.category])}
                  </Badge>
                  <h3 className="text-h3 text-fg">
                    {/* Rozciągnięty link: cała karta jest klikalna. */}
                    <Link
                      to={caseStudyPath(project.slug)}
                      className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
                    >
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-small text-fg-secondary">{t(project.summaryKey)}</p>
                  <span
                    aria-hidden="true"
                    className={`mt-auto inline-flex items-center gap-2 pt-2 text-small font-semibold ${classes.text}`}
                  >
                    {t("home:work.case_study")}
                    <FaArrowRight className="transition-transform duration-200 motion-safe:group-hover:translate-x-1" />
                  </span>
                </div>
              </Card>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <p className="w-full max-w-xl rounded-2xl border border-dashed border-border-strong px-6 py-8 text-center text-body text-fg-secondary">
          {t("services:shared.portfolio_empty")}
        </p>
      )}

      <Button to={paths.portfolio} variant="secondary" size="lg">
        {t("home:work.all")}
        <FaArrowRight aria-hidden="true" className="text-small" />
      </Button>
    </Section>
  );
};

export default ServiceProjects;
