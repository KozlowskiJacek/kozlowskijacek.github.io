import type { Project } from "../../data/projects";
import Img from "../ui/Img";

type ProjectCoverProps = {
  project: Pick<Project, "cover" | "coverFit">;
  /** Okładka nad zgięciem (hero case study, pierwsza karta) — bez lazy loadingu, fetchpriority="high". */
  priority?: boolean;
  /** Szerokość wyświetlania (srcset); domyślnie karta w siatce 1–3 kolumn. */
  sizes?: string;
  /** Lekkie powiększenie przy hover na karcie (`group`). */
  zoomOnHover?: boolean;
  className?: string;
};

/** Okładka realizacji — dekoracyjna (alt=""), bo obok zawsze stoi tytuł projektu. */
const ProjectCover = ({
  project,
  priority = false,
  sizes = "(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw",
  zoomOnHover = true,
  className = "",
}: ProjectCoverProps) => (
  <Img
    picture={project.cover}
    alt=""
    sizes={sizes}
    priority={priority}
    className={`h-full w-full ${project.coverFit === "contain" ? "object-contain p-4" : "object-cover"} ${
      zoomOnHover
        ? "transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
        : ""
    } ${className}`}
  />
);

export default ProjectCover;
