import type { IconType } from "react-icons";
import { FaCode, FaVideo } from "react-icons/fa6";
import { paths } from "./navigation";

export type ServicePoint = {
  id: string;
  /** Klucz tłumaczenia punktu listy. */
  labelKey: string;
};

export type ServicePillar = {
  id: "video" | "web";
  icon: IconType;
  /** Kolor akcentu karty: `video` (pomarańcz) lub `accent` (mięta). */
  tone: "video" | "accent";
  titleKey: string;
  descriptionKey: string;
  points: ServicePoint[];
  /** Podstrona z pełną ofertą. */
  to: string;
};

export const servicePillars: ServicePillar[] = [
  {
    id: "video",
    icon: FaVideo,
    tone: "video",
    titleKey: "home.services.video.title",
    descriptionKey: "home.services.video.text",
    points: [
      { id: "recording", labelKey: "home.services.video.recording" },
      { id: "editing", labelKey: "home.services.video.editing" },
      { id: "graphics", labelKey: "home.services.video.graphics" },
      { id: "animation", labelKey: "home.services.video.animation" },
    ],
    to: paths.servicesVideo,
  },
  {
    id: "web",
    icon: FaCode,
    tone: "accent",
    titleKey: "home.services.web.title",
    descriptionKey: "home.services.web.text",
    points: [
      { id: "websites", labelKey: "home.services.web.websites" },
      { id: "webapps", labelKey: "home.services.web.webapps" },
      { id: "uiux", labelKey: "home.services.web.uiux" },
      { id: "automation", labelKey: "home.services.web.automation" },
    ],
    to: paths.servicesWeb,
  },
];
