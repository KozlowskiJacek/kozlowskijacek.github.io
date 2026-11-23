import type { IconType } from "react-icons";
import { FaDatabase } from "react-icons/fa6";
import {
  SiAdobeaftereffects,
  SiAdobepremierepro,
  SiDjango,
  SiFigma,
  SiGit,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export type StackItem = {
  id: string;
  /** Nazwa narzędzia (nazwa własna — bez tłumaczenia). */
  label: string;
  icon: IconType;
};

/** Główny stack pokazywany w teaserze dla pracodawców. */
export const mainStack: StackItem[] = [
  { id: "react", label: "React", icon: SiReact },
  { id: "typescript", label: "TypeScript", icon: SiTypescript },
  { id: "python", label: "Python", icon: SiPython },
  { id: "django", label: "Django", icon: SiDjango },
  { id: "tailwind", label: "Tailwind CSS", icon: SiTailwindcss },
  { id: "databases", label: "SQL / MongoDB", icon: FaDatabase },
  { id: "git", label: "Git", icon: SiGit },
  { id: "figma", label: "Figma", icon: SiFigma },
  { id: "premiere", label: "Premiere / DaVinci", icon: SiAdobepremierepro },
  { id: "aftereffects", label: "After Effects", icon: SiAdobeaftereffects },
];
