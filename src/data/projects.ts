import workInProgress from "../assets/img/test.jpg";
import noEscapeCursor from "../assets/img/NoEscapeCursor.png";
import pythonCode from "../assets/img/python code.jpg";
import pythonCode1 from "../assets/img/python code 1.jpg";
import aureliaHR from "../assets/img/AureliaHR.jpg";

export type Project = {
  title: string;
  image: string;
  /** Klucz tłumaczenia opisu (projects.*). */
  descriptionKey: string;
  /** null = brak linku, przycisk nie jest renderowany. */
  href: string | null;
};

export const projects: Project[] = [
  {
    title: "GPSMaker",
    image: pythonCode,
    descriptionKey: "projects.gpsmaker",
    href: "https://github.com/KozlowskiJacek/Projects-Python/tree/main/Python/GPSMaker",
  },
  {
    title: "Web scraping",
    image: pythonCode1,
    descriptionKey: "projects.webscraping",
    href: "https://github.com/KozlowskiJacek/Projects-Python/tree/main/Python/Web%20scraping",
  },
  {
    title: "AureliaHR",
    image: aureliaHR,
    descriptionKey: "projects.aureliah",
    href: "https://github.com/KozlowskiJacek/AureliaHR",
  },
  {
    title: "NoEscapeCursor",
    image: noEscapeCursor,
    descriptionKey: "projects.noescapecursor",
    href: "https://github.com/KozlowskiJacek/NoEscapeCursor",
  },
  // TODO: podać link do repozytorium projektu Cooking.
  {
    title: "Cooking",
    image: workInProgress,
    descriptionKey: "projects.cooking",
    href: null,
  },
  // TODO: podać link do repozytorium projektu Cooking.
  {
    title: "Cooking",
    image: workInProgress,
    descriptionKey: "projects.cooking",
    href: null,
  },
];
