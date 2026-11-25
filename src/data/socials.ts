import type { IconType } from "react-icons";
import { FaDiscord, FaInstagram, FaLinkedin, FaMugHot, FaYoutube } from "react-icons/fa6";

export type Social = {
  id: string;
  /** Nazwa serwisu – używana jako aria-label. */
  label: string;
  /** Ikona z react-icons (dekoracyjna — nazwę podaje aria-label linku). */
  icon: IconType;
  /** null = link jeszcze nieznany, ikona nie jest renderowana. */
  href: string | null;
};

export const socials: Social[] = [
  {
    id: "instagram",
    label: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/life_of_jack_k/",
  },
  // TODO: podać adres kanału YouTube.
  { id: "youtube", label: "YouTube", icon: FaYoutube, href: null },
  // TODO: podać zaproszenie na serwer Discord.
  { id: "discord", label: "Discord", icon: FaDiscord, href: null },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/jacek-kozłowski-a43b21265/",
  },
  // TODO: podać link do strony „postaw kawę” (np. buycoffee.to).
  { id: "coffee", label: "Buy me a coffee", icon: FaMugHot, href: null },
];
