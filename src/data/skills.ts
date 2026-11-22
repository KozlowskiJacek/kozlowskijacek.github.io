import type { IconType } from "react-icons";
import { FaReact, FaPython, FaCss3Alt, FaDatabase, FaPuzzlePiece, FaGithub } from "react-icons/fa6";

export type SkillLink = {
  href: string;
  /** Klucz tłumaczenia tekstu linku. */
  labelKey: string;
};

/** Tekst stały (`title`) albo tłumaczony (`titleKey`). */
export type SkillTitle = { title: string } | { titleKey: string };

export type Skill = SkillTitle & {
  id: string;
  icon: IconType;
  descriptionKey: string;
  /** Certyfikaty / materiały potwierdzające umiejętność. */
  links: SkillLink[];
  /** Przykład zastosowania w projekcie. */
  highlight: SkillTitle & { descriptionKey: string };
};

const fullStackPythonCert = "/Certyfikaty/Full Stack Python ang.pdf";

export const skills: Skill[] = [
  {
    id: "react",
    icon: FaReact,
    title: "React / JS / TS",
    descriptionKey: "skills.react.text",
    links: [{ href: "/Certyfikaty/Frontend ang.pdf", labelKey: "skills.react.certificate" }],
    highlight: { title: "🛠 Aurelia HR", descriptionKey: "skills.react.app" },
  },
  {
    id: "python",
    icon: FaPython,
    title: "Python",
    descriptionKey: "skills.python.text",
    links: [
      { href: fullStackPythonCert, labelKey: "skills.python.certificate_1" },
      { href: "/Certyfikaty/Python backend ang.pdf", labelKey: "skills.python.certificate_2" },
    ],
    highlight: { titleKey: "skills.python.script", descriptionKey: "skills.python.solo" },
  },
  {
    id: "tailwind",
    icon: FaCss3Alt,
    title: "Tailwind CSS",
    descriptionKey: "skills.tailwind.text",
    links: [{ href: fullStackPythonCert, labelKey: "skills.tailwind.certificate" }],
    highlight: { titleKey: "skills.tailwind.main", descriptionKey: "skills.tailwind.text_2" },
  },
  {
    id: "database",
    icon: FaDatabase,
    titleKey: "skills.database",
    descriptionKey: "skills.database_pop.text",
    links: [{ href: fullStackPythonCert, labelKey: "skills.database_pop.certificate" }],
    highlight: { title: "🛠 AureliaHR", descriptionKey: "skills.database_pop.mongodb" },
  },
  {
    id: "creative",
    icon: FaPuzzlePiece,
    titleKey: "skills.creative",
    descriptionKey: "skills.creativity.text",
    links: [
      {
        href: "https://www.youtube.com/watch?v=oTUANW-PJ0E&ab_channel=Otinus",
        labelKey: "skills.creativity.certificate",
      },
    ],
    highlight: { titleKey: "skills.creativity.main", descriptionKey: "skills.creativity.text_2" },
  },
  {
    id: "git",
    icon: FaGithub,
    title: "Git",
    descriptionKey: "skills.git.text",
    links: [
      {
        href: "https://github.com/JacekKoz?tab=overview&from=2025-02-01&to=2025-02-10",
        labelKey: "skills.git.git",
      },
    ],
    highlight: { titleKey: "skills.git.main", descriptionKey: "skills.git.text_2" },
  },
];
