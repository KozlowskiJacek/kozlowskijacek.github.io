export type SocialLink = {
  id: string;
  /** Nazwa serwisu – używana jako aria-label. */
  label: string;
  /** Klasa ikony Boxicons. */
  icon: string;
  /** null = link jeszcze nieznany, ikona nie jest renderowana. */
  href: string | null;
};

export const socialLinks: SocialLink[] = [
  {
    id: "instagram",
    label: "Instagram",
    icon: "bxl-instagram-alt",
    href: "https://www.instagram.com/life_of_jaca/",
  },
  // TODO: podać adres kanału YouTube.
  { id: "youtube", label: "YouTube", icon: "bxl-youtube", href: null },
  // TODO: podać zaproszenie na serwer Discord.
  { id: "discord", label: "Discord", icon: "bxl-discord-alt", href: null },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "bxl-linkedin",
    href: "https://www.linkedin.com/in/jacek-kozłowski-a43b21265/",
  },
  // TODO: podać link do strony „postaw kawę” (np. buycoffee.to).
  { id: "coffee", label: "Buy me a coffee", icon: "bx-coffee-togo", href: null },
];
