import type { Project } from "../../data/projects";

type ProjectCoverProps = {
  project: Pick<Project, "cover" | "coverFit">;
  /** `eager` dla okładki nad zgięciem (hero case study). */
  loading?: "lazy" | "eager";
  /** Lekkie powiększenie przy hover na karcie (`group`). */
  zoomOnHover?: boolean;
  className?: string;
};

/** Okładka realizacji — dekoracyjna (alt=""), bo obok zawsze stoi tytuł projektu. */
const ProjectCover = ({ project, loading = "lazy", zoomOnHover = true, className = "" }: ProjectCoverProps) => (
  <img
    src={project.cover}
    alt=""
    loading={loading}
    decoding="async"
    className={`h-full w-full ${project.coverFit === "contain" ? "object-contain p-4" : "object-cover"} ${
      zoomOnHover
        ? "transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
        : ""
    } ${className}`}
  />
);

export default ProjectCover;
