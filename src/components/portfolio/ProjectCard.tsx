import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { projectCategoryLabelKeys, projectCategoryTone, type Project } from "../../data/projects";
import { caseStudyPath } from "../../data/navigation";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import ProjectCover from "./ProjectCover";

type ProjectCardProps = {
  project: Project;
};

/** Karta realizacji w siatce portfolio: miniatura, kategoria, tytuł, jedno zdanie, technologie. */
const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useTranslation();
  const tone = projectCategoryTone[project.category];

  return (
    <Card
      as="article"
      interactive
      className="group relative flex h-full flex-col overflow-hidden has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-surface">
        <ProjectCover project={project} />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <Badge tone={tone} className="self-start">
          {t(projectCategoryLabelKeys[project.category])}
        </Badge>
        <h3 className="text-h3 text-fg">
          {/* Rozciągnięty link: cała karta prowadzi do case study, czytnik ogłasza tylko tytuł. */}
          <Link
            to={caseStudyPath(project.slug)}
            className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>
        <p className="text-small text-fg-secondary">{t(project.summaryKey)}</p>

        {project.tech.length > 0 && (
          <ul aria-label={t("projects.tech_label")} className="flex flex-wrap gap-2 pt-1">
            {project.tech.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>
        )}

        <span
          aria-hidden="true"
          className={`mt-auto inline-flex items-center gap-2 pt-2 text-small font-semibold ${
            tone === "video" ? "text-video" : "text-accent"
          }`}
        >
          {t("home.work.case_study")}
          <FaArrowRight className="transition-transform duration-200 motion-safe:group-hover:translate-x-1" />
        </span>
      </div>
    </Card>
  );
};

export default ProjectCard;
