import workInProgress from "../assets/img/test.jpg";
import noEscapeCursor from "../assets/img/NoEscapeCursor.png";
import pythonCode from "../assets/img/python code.jpg";
import pythonCode1 from "../assets/img/python code 1.jpg";
import aureliaHR from "../assets/img/AureliaHR.jpg";

export type ProjectCategory = "web" | "python" | "desktop";

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
  },
];
