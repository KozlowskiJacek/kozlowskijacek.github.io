import type { IconType } from "react-icons";
import {
  FaCode,
  FaComments,
  FaDatabase,
  FaFilm,
  FaLanguage,
  FaPenRuler,
  FaRocket,
  FaScrewdriverWrench,
  FaServer,
  FaUserGear,
  FaWandMagicSparkles,
} from "react-icons/fa6";

/*
 * Dane strony /dla-pracodawcow (CV online).
 * Teksty to klucze tłumaczeń (`career.*` w pl.json i en.json); nazwy własne (firmy, szkoły,
 * technologie, certyfikaty) są stałymi stringami. `null` = informacja jeszcze nieznana —
 * UI pomija takie pole. Miejsca do uzupełnienia są oznaczone `TODO`.
 */

// --- Dostępność -------------------------------------------------------------------------------

export type Availability = "open" | "freelance-only" | "closed";

export type WorkMode = "remote" | "hybrid" | "onsite" | "employment" | "b2b" | "freelance";

/** Klucze tłumaczeń etykiet dostępności. */
export const availabilityLabelKeys: Record<Availability, string> = {
  open: "career:availability.open",
  "freelance-only": "career:availability.freelance_only",
  closed: "career:availability.closed",
};

export const workModeLabelKeys: Record<WorkMode, string> = {
  remote: "career:work_modes.remote",
  hybrid: "career:work_modes.hybrid",
  onsite: "career:work_modes.onsite",
  employment: "career:work_modes.employment",
  b2b: "career:work_modes.b2b",
  freelance: "career:work_modes.freelance",
};

// --- Okresy -----------------------------------------------------------------------------------

/** Rok („2023”) albo rok i miesiąc („2023-09”). */
export type CareerDate = `${number}` | `${number}-${number}`;

export type Period = {
  from: CareerDate;
  /** `null` = nadal trwa („obecnie”). */
  to: CareerDate | null;
};

// --- Doświadczenie / edukacja / certyfikaty ----------------------------------------------------

export type ExperienceItem = {
  id: string;
  /** Nazwa firmy; `null` = nieujawniona (UI pokaże `companyFallbackKey`). */
  company: string | null;
  companyFallbackKey?: string;
  positionKey: string;
  period: Period;
  /** Klucze tłumaczeń osiągnięć (punkty na osi czasu). */
  achievementKeys: string[];
  tech: string[];
};

export type EducationItem = {
  id: string;
  /** Nazwa uczelni / organizatora; `null` = do uzupełnienia (pole ukryte). */
  school: string | null;
  degreeKey: string;
  period: Period | null;
  /** Dodatkowy opis, np. temat pracy dyplomowej. */
  noteKey?: string;
};

export type Certificate = {
  id: string;
  /** Oficjalna nazwa certyfikatu (bez tłumaczenia). */
  name: string;
  /** Wystawca; `null` = do uzupełnienia (pole ukryte). */
  issuer: string | null;
  year: number | null;
  /** Ścieżka do PDF w public/Certyfikaty. */
  file: `/Certyfikaty/${string}.pdf`;
};

// --- Umiejętności -------------------------------------------------------------------------------

export type SkillGroupId =
  | "frontend"
  | "backend"
  | "databases"
  | "tools"
  | "design"
  | "video"
  | "languages"
  | "soft";

/** Pozycja w grupie: nazwa własna (`label`) albo tekst tłumaczony (`labelKey`). */
export type SkillItem = ({ label: string } | { labelKey: string }) & {
  /** Opcjonalny poziom (np. języka obcego) — klucz tłumaczenia. */
  levelKey?: string;
};

export type SkillLink = {
  href: string;
  labelKey: string;
};

/** Rozwijane szczegóły grupy: opis, przykład z praktyki i materiały potwierdzające. */
export type SkillGroupDetails = {
  textKey: string;
  highlight?: { titleKey: string; textKey: string };
  links: SkillLink[];
};

export type SkillGroup = {
  id: SkillGroupId;
  titleKey: string;
  icon: IconType;
  items: SkillItem[];
  details?: SkillGroupDetails;
};

// --- Dlaczego ja ----------------------------------------------------------------------------------

export type WhyMePoint = {
  id: string;
  icon: IconType;
  titleKey: string;
  textKey: string;
};

// --- Profil -------------------------------------------------------------------------------------

export type CareerProfile = {
  name: string;
  headlineKey: string;
  /** Akapity podsumowania. */
  summaryKeys: string[];
  availability: Availability;
  /** Preferowane formy współpracy (kolejność = priorytet). */
  workModes: WorkMode[];
  /** Lokalizacja; `null` = nie pokazuj. */
  locationKey: string | null;
  links: {
    linkedin: string;
    github: string;
    website: string;
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  certificates: Certificate[];
  skillGroups: SkillGroup[];
  whyMe: WhyMePoint[];
};

const certFiles = {
  frontend: "/Certyfikaty/Frontend ang.pdf",
  fullStackPython: "/Certyfikaty/Full Stack Python ang.pdf",
  pythonBackend: "/Certyfikaty/Python backend ang.pdf",
  google: "/Certyfikaty/Certyfikat google.pdf",
} as const;

export const career: CareerProfile = {
  name: "Jacek Kozłowski",
  headlineKey: "career:headline",
  summaryKeys: ["career:summary.p1", "career:summary.p2"],
  // TODO: potwierdzić status i preferowane formy współpracy.
  availability: "open",
  workModes: ["remote", "hybrid", "employment", "b2b"],
  // TODO: podać miasto, jeśli ma być widoczne w CV.
  locationKey: null,
  links: {
    linkedin: "https://www.linkedin.com/in/jacek-kozłowski-a43b21265/",
    github: "https://github.com/KozlowskiJacek",
    website: "https://jacekkozlowski.github.io",
  },

  experience: [
    {
      id: "company-automation",
      // TODO: nazwa firmy, w której wdrożono skrypty (albo zostaw null — pokaże się opis zastępczy).
      company: null,
      companyFallbackKey: "career:experience.company_job.company_fallback",
      // TODO: dokładna nazwa stanowiska.
      positionKey: "career:experience.company_job.position",
      // TODO: potwierdzić datę rozpoczęcia (najstarszy wdrożony skrypt — 2022).
      period: { from: "2022", to: null },
      achievementKeys: [
        "career:experience.company_job.a1",
        "career:experience.company_job.a2",
        "career:experience.company_job.a3",
      ],
      tech: ["Python", "pandas", "BeautifulSoup"],
    },
    {
      id: "freelance",
      company: "Freelance",
      positionKey: "career:experience.freelance.position",
      // TODO: potwierdzić datę rozpoczęcia działalności freelance.
      period: { from: "2023", to: null },
      achievementKeys: [
        "career:experience.freelance.a1",
        "career:experience.freelance.a2",
        "career:experience.freelance.a3",
      ],
      tech: ["React", "TypeScript", "Tailwind CSS", "DaVinci Resolve", "After Effects"],
    },
  ],

  education: [
    {
      id: "engineer",
      // TODO: nazwa uczelni i kierunek.
      school: null,
      degreeKey: "career:education.engineer.degree",
      // TODO: potwierdzić lata studiów.
      period: null,
      noteKey: "career:education.engineer.note",
    },
    {
      id: "courses",
      // TODO: organizator kursów (ten sam co wystawca certyfikatów).
      school: null,
      degreeKey: "career:education.courses.degree",
      period: null,
      noteKey: "career:education.courses.note",
    },
  ],

  certificates: [
    {
      id: "full-stack-python",
      name: "Full Stack Python Developer",
      // TODO: wystawca i rok — z treści PDF.
      issuer: null,
      year: null,
      file: certFiles.fullStackPython,
    },
    {
      id: "python-backend",
      name: "Python Back-end Developer",
      issuer: null,
      year: null,
      file: certFiles.pythonBackend,
    },
    {
      id: "frontend",
      name: "Web Front-end Developer",
      issuer: null,
      year: null,
      file: certFiles.frontend,
    },
    {
      id: "google",
      // TODO: pełna nazwa certyfikatu Google.
      name: "Google",
      issuer: "Google",
      year: null,
      file: certFiles.google,
    },
  ],

  skillGroups: [
    {
      id: "frontend",
      titleKey: "career:skills.frontend.title",
      icon: FaCode,
      items: [
        { label: "React" },
        { label: "TypeScript" },
        { label: "JavaScript" },
        { label: "Tailwind CSS" },
        { label: "HTML / CSS" },
        { label: "React Router" },
        { label: "React Query" },
        { label: "framer-motion" },
        { label: "Vite" },
      ],
      details: {
        textKey: "career:skills.frontend.text",
        highlight: {
          titleKey: "career:skills.frontend.highlight_title",
          textKey: "career:skills.frontend.highlight_text",
        },
        links: [{ href: certFiles.frontend, labelKey: "career:skills.links.cert_frontend" }],
      },
    },
    {
      id: "backend",
      titleKey: "career:skills.backend.title",
      icon: FaServer,
      items: [
        { label: "Python" },
        { label: "Django" },
        { label: "Flask" },
        { label: "pandas" },
        { label: "BeautifulSoup" },
      ],
      details: {
        textKey: "career:skills.backend.text",
        highlight: {
          titleKey: "career:skills.backend.highlight_title",
          textKey: "career:skills.backend.highlight_text",
        },
        links: [
          { href: certFiles.fullStackPython, labelKey: "career:skills.links.cert_full_stack" },
          { href: certFiles.pythonBackend, labelKey: "career:skills.links.cert_backend" },
        ],
      },
    },
    {
      id: "databases",
      titleKey: "career:skills.databases.title",
      icon: FaDatabase,
      items: [{ label: "SQL" }, { label: "MongoDB" }],
      details: {
        textKey: "career:skills.databases.text",
        highlight: {
          titleKey: "career:skills.databases.highlight_title",
          textKey: "career:skills.databases.highlight_text",
        },
        links: [{ href: certFiles.fullStackPython, labelKey: "career:skills.links.cert_full_stack" }],
      },
    },
    {
      id: "tools",
      titleKey: "career:skills.tools.title",
      icon: FaScrewdriverWrench,
      items: [
        { label: "Git" },
        { label: "GitHub" },
        { label: "GitLab" },
        { labelKey: "career:skills.tools.ci" },
        { label: "Unix" },
        { label: "GitHub Pages" },
      ],
      details: {
        textKey: "career:skills.tools.text",
        highlight: {
          titleKey: "career:skills.tools.highlight_title",
          textKey: "career:skills.tools.highlight_text",
        },
        links: [{ href: "https://github.com/KozlowskiJacek", labelKey: "career:skills.links.github" }],
      },
    },
    {
      id: "design",
      titleKey: "career:skills.design.title",
      icon: FaPenRuler,
      items: [
        { label: "Figma" },
        { label: "UI / UX" },
        { labelKey: "career:skills.design.rwd" },
        { labelKey: "career:skills.design.prototyping" },
      ],
    },
    {
      id: "video",
      titleKey: "career:skills.video.title",
      icon: FaFilm,
      items: [
        { label: "DaVinci Resolve" },
        { label: "Premiere Pro" },
        { label: "After Effects" },
        { labelKey: "career:skills.video.color" },
        { labelKey: "career:skills.video.script" },
      ],
      details: {
        textKey: "career:skills.video.text",
        highlight: {
          titleKey: "career:skills.video.highlight_title",
          textKey: "career:skills.video.highlight_text",
        },
        links: [
          {
            href: "https://www.youtube.com/watch?v=oTUANW-PJ0E&ab_channel=Otinus",
            labelKey: "career:skills.links.video_sample",
          },
        ],
      },
    },
    {
      id: "languages",
      titleKey: "career:skills.languages.title",
      icon: FaLanguage,
      items: [
        { labelKey: "career:skills.languages.polish", levelKey: "career:skills.languages.native" },
        // TODO: poziom angielskiego (np. B2 / C1) — wtedy dodaj levelKey.
        { labelKey: "career:skills.languages.english" },
      ],
    },
    {
      id: "soft",
      titleKey: "career:skills.soft.title",
      icon: FaComments,
      items: [
        { labelKey: "career:skills.soft.independence" },
        { labelKey: "career:skills.soft.self_learning" },
        { labelKey: "career:skills.soft.client_communication" },
        { labelKey: "career:skills.soft.analytical_creative" },
        { labelKey: "career:skills.soft.ownership" },
      ],
    },
  ],

  whyMe: [
    {
      id: "dev-creative",
      icon: FaWandMagicSparkles,
      titleKey: "career:why_me.dev_creative.title",
      textKey: "career:why_me.dev_creative.text",
    },
    {
      id: "independence",
      icon: FaUserGear,
      titleKey: "career:why_me.independence.title",
      textKey: "career:why_me.independence.text",
    },
    {
      id: "shipped",
      icon: FaRocket,
      titleKey: "career:why_me.shipped.title",
      textKey: "career:why_me.shipped.text",
    },
    {
      id: "product",
      icon: FaComments,
      titleKey: "career:why_me.product.title",
      textKey: "career:why_me.product.text",
    },
  ],
};
