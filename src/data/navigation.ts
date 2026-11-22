export type NavLink = {
  /** Id sekcji, do której prowadzi link. */
  id: string;
  /** Klucz tłumaczenia etykiety. */
  labelKey: string;
};

/**
 * - `scroll` — link przewija do sekcji na bieżącej stronie,
 * - `navigate` — link zmienia adres na `/<id>` (strona główna sama przewinie do sekcji).
 */
export type NavMode = "scroll" | "navigate";

export type NavConfig = {
  /** Unikalna nazwa konfiguracji (klucz komponentu Header). */
  id: string;
  links: NavLink[];
  mode: NavMode;
  /** Ścieżka, do której prowadzi logo. Bez niej logo przewija do pierwszej sekcji. */
  logoTo?: string;
};

export const mainNav: NavConfig = {
  id: "main",
  mode: "scroll",
  links: [
    { id: "home", labelKey: "navbar.home" },
    { id: "about", labelKey: "navbar.about" },
    { id: "skills", labelKey: "navbar.skills" },
    { id: "projects", labelKey: "navbar.projects" },
    { id: "feedback", labelKey: "navbar.feedback" },
    { id: "contact", labelKey: "navbar.contact" },
  ],
};

export const aboutNav: NavConfig = {
  id: "about",
  mode: "scroll",
  logoTo: "/",
  links: [
    { id: "title_hello", labelKey: "about.title_hello" },
    { id: "title_why", labelKey: "about.title_why" },
    { id: "title_how", labelKey: "about.title_how" },
    { id: "title_what", labelKey: "about.title_what" },
    { id: "title_after", labelKey: "about.title_after" },
  ],
};

export const webAppsNav: NavConfig = {
  id: "web-apps",
  mode: "scroll",
  logoTo: "/",
  links: [
    { id: "nav_modern", labelKey: "web_app.nav_modern" },
    { id: "nav_discussion", labelKey: "web_app.nav_discussion" },
    { id: "nav_visual", labelKey: "web_app.nav_visual" },
    { id: "nav_development", labelKey: "web_app.nav_development" },
    { id: "nav_presentation", labelKey: "web_app.nav_presentation" },
    { id: "nav_support", labelKey: "web_app.nav_support" },
  ],
};

export const videoNav: NavConfig = {
  id: "social-video",
  mode: "scroll",
  logoTo: "/",
  links: [
    { id: "nav_profesional", labelKey: "video.nav_profesional" },
    { id: "nav_ads", labelKey: "video.nav_ads" },
    { id: "nav_vlogs", labelKey: "video.nav_vlogs" },
    { id: "nav_gaming", labelKey: "video.nav_gaming" },
    { id: "nav_reels", labelKey: "video.nav_reels" },
    { id: "nav_how", labelKey: "video.nav_how" },
  ],
};
