import type { ButtonVariant } from "../ui/buttonStyles";
import type { ServiceTone } from "../../data/services/types";

/** Klasy zależne od akcentu podstrony — pełne nazwy, żeby Tailwind je wykrył. */
export const toneClasses: Record<
  ServiceTone,
  {
    text: string;
    icon: string;
    border: string;
    hoverBorder: string;
    glow: string;
    /** Wariant głównego przycisku. */
    button: ButtonVariant;
    step: string;
  }
> = {
  video: {
    text: "text-video",
    icon: "border-video/25 bg-video/10 text-video",
    border: "border-video/40",
    hoverBorder: "hover:border-video/40",
    glow: "from-video/10",
    button: "video",
    step: "border-video/40 text-video",
  },
  accent: {
    text: "text-accent",
    icon: "border-accent/25 bg-accent/10 text-accent",
    border: "border-accent/40",
    hoverBorder: "hover:border-accent/40",
    glow: "from-accent/10",
    button: "primary",
    step: "border-accent/40 text-accent",
  },
};
