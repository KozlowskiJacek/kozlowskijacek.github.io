import type { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import { enter, fadeIn, reveal, staggerContainer, staggerItem } from "../lib/animations";
import {
  findProject,
  projectCategoryLabelKeys,
  projectCategoryTone,
  publishedProjects,
  type Project,
} from "../data/projects";
import { caseStudyPath, paths } from "../data/navigation";
import { toneClasses } from "../components/services/tone";
import Section from "../components/ui/Section";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import YouTubeEmbed from "../components/ui/YouTubeEmbed";
import ProjectCover from "../components/portfolio/ProjectCover";
import Img from "../components/ui/Img";
import ServiceCTA from "../components/services/ServiceCTA";
import Seo from "../components/Seo";
import NotFoundPage from "./NotFoundPage";

const storySteps = [
  { id: "problem", field: "problemKey", labelKey: "portfolio:case_study.problem" },
  { id: "solution", field: "solutionKey", labelKey: "portfolio:case_study.solution" },
  { id: "result", field: "resultKey", labelKey: "portfolio:case_study.result" },
] as const;

const caseStudyCta = {
  titleKey: "portfolio:case_study.cta_title",
  accentKey: "portfolio:case_study.cta_accent",
  textKey: "portfolio:case_study.cta_text",
};

/** Sąsiednie realizacje (z zawinięciem) do nawigacji poprzedni / następny. */
const neighbours = (project: Project) => {
  const index = publishedProjects.indexOf(project);
  const count = publishedProjects.length;
  return {
    prev: publishedProjects[(index - 1 + count) % count],
    next: publishedProjects[(index + 1) % count],
  };
};

const MetaItem = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex flex-col gap-2">
    <dt className="text-xs font-semibold uppercase tracking-wider text-fg-muted">{label}</dt>
    <dd className="text-body text-fg">{children}</dd>
  </div>
);

const CaseStudyPage = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const project = findProject(slug);

  if (!project) return <NotFoundPage />;

  const tone = projectCategoryTone[project.category];
  const classes = toneClasses[tone];
  const steps = storySteps.filter((step) => project[step.field]);
  const { prev, next } = neighbours(project);
  const hasNav = publishedProjects.length > 1;
  const externalLinkProps = { target: "_blank", rel: "noopener noreferrer" } as const;

  return (
    // key: przejście poprzedni/następny to nowy montaż — animacje wejścia startują od nowa.
    <article key={project.slug}>
      <Seo title={project.title} description={t(project.summaryKey)} image={project.cover.img.src} type="article" />
      <Section id="case-study" padding="page" className="flex-col !items-stretch !gap-10 md:!gap-12">
        <header className="flex flex-col items-start gap-4">
          <div className={enter(0)}>
            <Button to={paths.portfolio} variant="ghost" className="text-small">
              <FaArrowLeft aria-hidden="true" />
              {t("portfolio:case_study.back")}
            </Button>
          </div>
          <div className={`flex flex-wrap items-center gap-3 ${enter(1)}`}>
            <span className={`text-small font-semibold uppercase tracking-wider ${classes.text}`}>
              {t("portfolio:case_study.eyebrow")}
            </span>
            <Badge tone={tone}>{t(projectCategoryLabelKeys[project.category])}</Badge>
          </div>
          <h1 className={`text-balance font-display text-h1 text-fg ${enter(2)}`}>{project.title}</h1>
          <p className={`max-w-3xl text-body text-fg-secondary md:text-body-lg ${enter(3)}`}>{t(project.summaryKey)}</p>
        </header>

        <div className={enter(3)}>
          {project.videoUrl ? (
            <YouTubeEmbed url={project.videoUrl} title={project.title} />
          ) : (
            <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-surface shadow-lift">
              <ProjectCover project={project} priority sizes="(min-width: 1280px) 72rem, 100vw" zoomOnHover={false} />
            </div>
          )}
        </div>

        <motion.dl
          aria-label={t("portfolio:case_study.meta_label")}
          className="grid gap-6 rounded-2xl border border-border bg-surface-elevated p-6 shadow-card sm:grid-cols-2 md:p-8 lg:grid-cols-4"
          variants={fadeIn("bottom")}
          {...reveal}
        >
          <MetaItem label={t("portfolio:case_study.role")}>{t(project.roleKey)}</MetaItem>
          <MetaItem label={t("portfolio:case_study.year")}>{project.year}</MetaItem>
          {project.tech.length > 0 && (
            <MetaItem label={t("portfolio:case_study.tech")}>
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <li key={tech}>
                    <Badge>{tech}</Badge>
                  </li>
                ))}
              </ul>
            </MetaItem>
          )}
          {(project.links.github || project.links.live) && (
            <MetaItem label={t("portfolio:case_study.links")}>
              <span className="flex flex-wrap gap-2">
                {project.links.github && (
                  <Button href={project.links.github} variant="secondary" size="sm" {...externalLinkProps}>
                    <FaGithub aria-hidden="true" />
                    GitHub
                    <span className="sr-only">{t("portfolio:case_study.new_tab")}</span>
                  </Button>
                )}
                {project.links.live && (
                  <Button href={project.links.live} variant="secondary" size="sm" {...externalLinkProps}>
                    <FaArrowUpRightFromSquare aria-hidden="true" />
                    {t("portfolio:case_study.live")}
                    <span className="sr-only">{t("portfolio:case_study.new_tab")}</span>
                  </Button>
                )}
              </span>
            </MetaItem>
          )}
        </motion.dl>
      </Section>

      {steps.length > 0 && (
        <Section id="story" bg="secondary" padding="compact" className="flex-col !items-stretch">
          <motion.ol className="grid gap-6 md:grid-cols-3" variants={staggerContainer(0.12)} {...reveal}>
            {steps.map((step, index) => (
              <motion.li
                key={step.id}
                variants={staggerItem}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-surface-elevated p-6 shadow-card md:p-8"
              >
                <span
                  aria-hidden="true"
                  className={`grid h-10 w-10 place-items-center rounded-full border font-display text-small font-semibold ${classes.step}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-h3 text-fg">{t(step.labelKey)}</h2>
                <p className="text-body text-fg-secondary">{t(project[step.field] as string)}</p>
              </motion.li>
            ))}
          </motion.ol>
        </Section>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <Section id="gallery" padding="compact" className="flex-col !items-stretch">
          <h2 className="font-display text-h2 text-fg">{t("portfolio:case_study.gallery")}</h2>
          <motion.ul className="grid gap-4 sm:grid-cols-2" variants={staggerContainer()} {...reveal}>
            {project.gallery.map((image) => (
              <motion.li
                key={image.src.img.src}
                variants={staggerItem}
                className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card"
              >
                <Img
                  picture={image.src}
                  alt={t(image.altKey)}
                  sizes="(min-width: 640px) 36rem, 100vw"
                  className="h-full w-full object-cover"
                />
              </motion.li>
            ))}
          </motion.ul>
        </Section>
      )}

      {hasNav && (
        <Section id="more-work" padding="compact" className="flex-col !items-stretch">
          <nav aria-label={t("portfolio:case_study.nav_label")} className="grid gap-4 sm:grid-cols-2">
            {[
              { item: prev, labelKey: "portfolio:case_study.prev", dir: "prev" as const },
              { item: next, labelKey: "portfolio:case_study.next", dir: "next" as const },
            ].map(({ item, labelKey, dir }) => (
              <Button
                key={dir}
                to={caseStudyPath(item.slug)}
                variant="secondary"
                className={`!h-auto !gap-4 !rounded-2xl !px-6 !py-5 ${dir === "next" ? "sm:text-right" : ""}`}
              >
                {dir === "prev" && <FaArrowLeft aria-hidden="true" className="shrink-0" />}
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wider text-fg-muted">{t(labelKey)}</span>
                  <span className="truncate font-display text-h3 text-fg">{item.title}</span>
                </span>
                {dir === "next" && <FaArrowRight aria-hidden="true" className="shrink-0" />}
              </Button>
            ))}
          </nav>
        </Section>
      )}

      <ServiceCTA cta={caseStudyCta} tone={tone} topic={tone === "video" ? "wideo" : "web"} />
    </article>
  );
};

export default CaseStudyPage;
