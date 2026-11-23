import workInProgress from "../assets/img/test.jpg";
import noEscapeCursor from "../assets/img/NoEscapeCursor.png";
import pythonCode from "../assets/img/python code.jpg";
import pythonCode1 from "../assets/img/python code 1.jpg";
import aureliaHR from "../assets/img/AureliaHR.jpg";
import pixelFullStack from "../assets/img/Pixel full stack.png";
import contentCreator from "../assets/img/Content creator img.png";

export type ProjectCategory = "video" | "graphics" | "animation" | "website" | "webapp" | "automation";

/** Kolejność kategorii (filtry na /portfolio). */
export const projectCategories: ProjectCategory[] = [
  "video",
  "graphics",
  "animation",
  "website",
  "webapp",
  "automation",
];

/** Klucze tłumaczeń etykiet kategorii. */
export const projectCategoryLabelKeys: Record<ProjectCategory, string> = {
  video: "projects.categories.video",
  graphics: "projects.categories.graphics",
  animation: "projects.categories.animation",
  website: "projects.categories.website",
  webapp: "projects.categories.webapp",
  automation: "projects.categories.automation",
};

/** Filar oferty, do którego należy kategoria — decyduje o kolorze akcentu. */
export const projectCategoryTone: Record<ProjectCategory, "video" | "accent"> = {
  video: "video",
  graphics: "video",
  animation: "video",
  website: "accent",
  webapp: "accent",
  automation: "accent",
};

export const isProjectCategory = (value: unknown): value is ProjectCategory =>
  projectCategories.includes(value as ProjectCategory);

/** Dla kogo realizacja jest istotna: klient (usługi), pracodawca (kod) czy oba. */
export type ProjectAudience = "client" | "employer" | "both";

export type ProjectLinks = {
  github?: string;
  live?: string;
};

export type ProjectImage = {
  src: string;
  /** Klucz tłumaczenia tekstu alternatywnego. */
  altKey: string;
};

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  audience: ProjectAudience;
  /** Projekt pokazywany w „Wybranych realizacjach” na stronie głównej. */
  featured: boolean;
  /** Okładka: miniatura karty i hero case study. */
  cover: string;
  /** `contain` dla grafik, których nie wolno przycinać (np. pixel art). Domyślnie `cover`. */
  coverFit?: "cover" | "contain";
  gallery?: ProjectImage[];
  /** Adres filmu na YouTube — karta otwiera go w modalu. */
  videoUrl?: string;
  /** Klucze tłumaczeń (projects.items.*): jedno zdanie + sekcje case study. */
  summaryKey: string;
  problemKey?: string;
  solutionKey?: string;
  resultKey?: string;
  tech: string[];
  /** Klucz tłumaczenia roli w projekcie. */
  roleKey: string;
  year: number;
  links: ProjectLinks;
  /** Szkic: niewidoczny na stronie (brak karty, case study → 404). */
  draft?: boolean;
};

const projects: Project[] = [
  {
    slug: "aureliahr",
    title: "AureliaHR",
    category: "webapp",
    audience: "both",
    featured: true,
    cover: aureliaHR,
    summaryKey: "projects.items.aureliahr.summary",
    problemKey: "projects.items.aureliahr.problem",
    solutionKey: "projects.items.aureliahr.solution",
    resultKey: "projects.items.aureliahr.result",
    tech: ["React", "JavaScript", "MongoDB"],
    roleKey: "projects.roles.fullstack",
    // TODO: potwierdzić rok obrony pracy inżynierskiej.
    year: 2024,
    links: { github: "https://github.com/KozlowskiJacek/AureliaHR" },
  },
  {
    slug: "gpsmaker",
    title: "GPSMaker",
    category: "automation",
    audience: "both",
    featured: true,
    cover: pythonCode,
    summaryKey: "projects.items.gpsmaker.summary",
    problemKey: "projects.items.gpsmaker.problem",
    solutionKey: "projects.items.gpsmaker.solution",
    resultKey: "projects.items.gpsmaker.result",
    tech: ["Python", "pandas"],
    roleKey: "projects.roles.author",
    // TODO: potwierdzić rok.
    year: 2023,
    links: {
      github: "https://github.com/KozlowskiJacek/Projects-Python/tree/main/Python/GPSMaker",
    },
  },
  {
    slug: "web-scraping",
    title: "Web scraping",
    category: "automation",
    audience: "employer",
    featured: true,
    cover: pythonCode1,
    summaryKey: "projects.items.webscraping.summary",
    problemKey: "projects.items.webscraping.problem",
    solutionKey: "projects.items.webscraping.solution",
    resultKey: "projects.items.webscraping.result",
    tech: ["Python"],
    roleKey: "projects.roles.author",
    // TODO: potwierdzić rok.
    year: 2022,
    links: {
      github: "https://github.com/KozlowskiJacek/Projects-Python/tree/main/Python/Web%20scraping",
    },
  },
  {
    slug: "noescapecursor",
    title: "NoEscapeCursor",
    category: "webapp",
    audience: "employer",
    featured: true,
    cover: noEscapeCursor,
    summaryKey: "projects.items.noescapecursor.summary",
    problemKey: "projects.items.noescapecursor.problem",
    solutionKey: "projects.items.noescapecursor.solution",
    resultKey: "projects.items.noescapecursor.result",
    // TODO: uzupełnić stack projektu NoEscapeCursor.
    tech: [],
    roleKey: "projects.roles.author",
    // TODO: potwierdzić rok.
    year: 2025,
    links: { github: "https://github.com/KozlowskiJacek/NoEscapeCursor" },
  },
  {
    slug: "portfolio",
    title: "Portfolio-web",
    category: "website",
    audience: "both",
    featured: true,
    cover: pixelFullStack,
    coverFit: "contain",
    summaryKey: "projects.items.portfolio.summary",
    problemKey: "projects.items.portfolio.problem",
    solutionKey: "projects.items.portfolio.solution",
    resultKey: "projects.items.portfolio.result",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "framer-motion", "i18next"],
    roleKey: "projects.roles.design_dev",
    year: 2025,
    links: {
      github: "https://github.com/KozlowskiJacek/jacekkozlowski.github.io",
      live: "https://jacekkozlowski.github.io",
    },
  },
  // TODO: podać link do repozytorium projektu Cooking.
  {
    slug: "cooking",
    title: "Cooking",
    category: "webapp",
    audience: "both",
    featured: true,
    cover: workInProgress,
    summaryKey: "projects.items.cooking.summary",
    tech: [],
    roleKey: "projects.roles.fullstack",
    year: 2026,
    links: {},
  },
  {
    slug: "cooking-2",
    title: "Cooking",
    category: "webapp",
    audience: "both",
    featured: true,
    cover: workInProgress,
    summaryKey: "projects.items.cooking.summary",
    tech: [],
    roleKey: "projects.roles.fullstack",
    year: 2026,
    links: {},
  },

  // --- Szkice: niewidoczne, dopóki `draft: true` -------------------------------------------
  // TODO: realizacja wideo — okładka, link do YouTube, opis klienta, rola, rok.
  {
    slug: "video-placeholder",
    title: "TODO: realizacja wideo",
    category: "video",
    audience: "client",
    featured: false,
    cover: contentCreator,
    videoUrl: "https://www.youtube.com/watch?v=TODO_______",
    summaryKey: "projects.items.draft.summary",
    tech: ["DaVinci Resolve"],
    roleKey: "projects.roles.video",
    year: 2026,
    links: {},
    draft: true,
  },
  // TODO: grafiki — okładka, galeria, opis zlecenia.
  {
    slug: "graphics-placeholder",
    title: "TODO: grafiki",
    category: "graphics",
    audience: "client",
    featured: false,
    cover: contentCreator,
    summaryKey: "projects.items.draft.summary",
    tech: [],
    roleKey: "projects.roles.graphics",
    year: 2026,
    links: {},
    draft: true,
  },
  // TODO: animacja — okładka, link do filmu, opis.
  {
    slug: "animation-placeholder",
    title: "TODO: animacja",
    category: "animation",
    audience: "client",
    featured: false,
    cover: contentCreator,
    summaryKey: "projects.items.draft.summary",
    tech: [],
    roleKey: "projects.roles.animation",
    year: 2026,
    links: {},
    draft: true,
  },
  // TODO: strona klienta — okładka, link live, problem / rozwiązanie / efekt.
  {
    slug: "client-website-placeholder",
    title: "TODO: strona klienta",
    category: "website",
    audience: "client",
    featured: false,
    cover: contentCreator,
    summaryKey: "projects.items.draft.summary",
    tech: [],
    roleKey: "projects.roles.design_dev",
    year: 2026,
    links: {},
    draft: true,
  },
];

/** Opublikowane realizacje (bez szkiców) — jedyne źródło dla UI. */
export const publishedProjects = projects.filter((project) => !project.draft);

/** Maks. liczba realizacji na stronie głównej. */
export const FEATURED_LIMIT = 6;

export const featuredProjects = publishedProjects
  .filter((project) => project.featured)
  .slice(0, FEATURED_LIMIT);

export const findProject = (slug: string | undefined) =>
  publishedProjects.find((project) => project.slug === slug);
