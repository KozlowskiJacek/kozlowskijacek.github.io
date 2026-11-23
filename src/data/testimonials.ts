import serwisGasiorek from "../assets/img/Serwis Gąsiorek Logo_20250519_093746_0000.png";
import grupaDeGie from "../assets/img/Grupa DeGie Logo_20250519_093717_0000.png";
import agataImage from "../assets/img/Agata.png";
import dawidImage from "../assets/img/Dawid.jfif";
import julkaImage from "../assets/img/Julka.png";

export type Testimonial = {
  id: string;
  /** Imię i nazwisko albo nazwa firmy. */
  name: string;
  /** Logo firmy (`kind: "company"`) albo zdjęcie osoby (`kind: "person"`). */
  image: string;
  /** `company` — logo trafia też do paska zaufania na stronie głównej. */
  kind: "company" | "person";
  /** Firma, w której pracuje autor opinii (nazwa własna — bez tłumaczenia). */
  company?: string;
  /** Klucz tłumaczenia stanowiska / opisu autora. */
  roleKey?: string;
  /** Klucz tłumaczenia treści opinii (feedback.*). */
  textKey: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "serwis-gasiorek",
    name: "Serwis Gąsiorek",
    kind: "company",
    image: serwisGasiorek,
    roleKey: "feedback.roles.client",
    textKey: "feedback.text1",
  },
  {
    id: "dawid-ferchow",
    name: "Dawid Ferchow",
    kind: "person",
    image: dawidImage,
    // TODO: uzupełnić nazwę firmy (pole `company`).
    roleKey: "feedback.roles.it_lead",
    textKey: "feedback.text2",
  },
  {
    id: "agata-sulkowska",
    name: "Agata Sułkowska",
    kind: "person",
    image: agataImage,
    // TODO: uzupełnić nazwę firmy / marki (pole `company`).
    roleKey: "feedback.roles.website_client",
    textKey: "feedback.text3",
  },
  {
    id: "grupa-degie",
    name: "Grupa DeGie",
    kind: "company",
    image: grupaDeGie,
    roleKey: "feedback.roles.client",
    textKey: "feedback.text4",
  },
  {
    id: "julia-pitula",
    name: "Julia Pituła",
    kind: "person",
    image: julkaImage,
    // TODO: uzupełnić nazwę firmy / marki (pole `company`).
    roleKey: "feedback.roles.client",
    textKey: "feedback.text5",
  },
];

/** Firmy z opinii — logotypy w pasku zaufania. */
export const clientLogos = testimonials.filter((item) => item.kind === "company");

/** Opis autora pod nazwą: stanowisko i firma (o ile są w danych). */
export const testimonialMeta = (testimonial: Testimonial, t: (key: string) => string) =>
  [testimonial.roleKey && t(testimonial.roleKey), testimonial.company].filter(Boolean).join(" · ");
