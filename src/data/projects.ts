import workInProgress from "../assets/img/test.jpg";
import noEscapeCursor from "../assets/img/NoEscapeCursor.png";
import pythonCode from "../assets/img/python code.jpg";
import pythonCode1 from "../assets/img/python code 1.jpg";
import aureliaHR from "../assets/img/AureliaHR.jpg";

export type ProjectCategory = "web" | "python" | "desktop";

/** Klucze tłumaczeń etykiet kategorii. */
export const projectCategoryLabelKeys: Record<ProjectCategory, string> = {
  web: "projects.categories.web",
  python: "projects.categories.python",
  desktop: "projects.categories.desktop",
};

export type ProjectLinks = {
  /** null = brak repozytorium (przycisk nie jest renderowany). */
  github: string | null;
  live: string | null;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  image: string;
  /** Klucz tłumaczenia opisu (projects.*). */
  descriptionKey: string;
  tech: string[];
  links: ProjectLinks;
  /** Projekt pokazywany w „Wybranych realizacjach” na stronie głównej. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "gpsmaker",
    slug: "gpsmaker",
    title: "GPSMaker",
    category: "python",
    image: pythonCode,
    descriptionKey: "projects.gpsmaker",
    tech: ["Python", "pandas"],
    links: {
      github: "https://github.com/KozlowskiJacek/Projects-Python/tree/main/Python/GPSMaker",
      live: null,
    },
    featured: true,
  },
  {
    id: "web-scraping",
    slug: "web-scraping",
    title: "Web scraping",
    category: "python",
    image: pythonCode1,
    descriptionKey: "projects.webscraping",
    tech: ["Python"],
    links: {
      github: "https://github.com/KozlowskiJacek/Projects-Python/tree/main/Python/Web%20scraping",
      live: null,
    },
    featured: true,
  },
  {
    id: "aureliahr",
    slug: "aureliahr",
    title: "AureliaHR",
    category: "web",
    image: aureliaHR,
    descriptionKey: "projects.aureliah",
    tech: ["React", "JavaScript", "MongoDB"],
    links: { github: "https://github.com/KozlowskiJacek/AureliaHR", live: null },
    featured: true,
  },
  {
    id: "noescapecursor",
    slug: "noescapecursor",
    title: "NoEscapeCursor",
    category: "desktop",
    image: noEscapeCursor,
    descriptionKey: "projects.noescapecursor",
    // TODO: uzupełnić stack projektu NoEscapeCursor.
    tech: [],
    links: { github: "https://github.com/KozlowskiJacek/NoEscapeCursor", live: null },
    featured: true,
  },
  // TODO: podać link do repozytorium projektu Cooking.
  {
    id: "cooking-1",
    slug: "cooking",
    title: "Cooking",
    category: "web",
    image: workInProgress,
    descriptionKey: "projects.cooking",
    tech: [],
    links: { github: null, live: null },
    featured: true,
  },
  {
    id: "cooking-2",
    slug: "cooking-2",
    title: "Cooking",
    category: "web",
    image: workInProgress,
    descriptionKey: "projects.cooking",
    tech: [],
    links: { github: null, live: null },
    featured: true,
  },
];

/** Maks. liczba realizacji na stronie głównej. */
export const FEATURED_LIMIT = 6;

export const featuredProjects = projects.filter((project) => project.featured).slice(0, FEATURED_LIMIT);
