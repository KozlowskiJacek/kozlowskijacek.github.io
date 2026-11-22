import serwisGasiorek from "../assets/img/Serwis Gąsiorek Logo_20250519_093746_0000.png";
import grupaDeGie from "../assets/img/Grupa DeGie Logo_20250519_093717_0000.png";
import agataImage from "../assets/img/Agata.png";
import dawidImage from "../assets/img/Dawid.jfif";
import julkaImage from "../assets/img/Julka.png";

export type Testimonial = {
  id: string;
  name: string;
  /** Logo firmy albo zdjęcie osoby. */
  logo: string;
  /** `company` — logo trafia też do paska zaufania na stronie głównej. */
  kind: "company" | "person";
  /** Klucz tłumaczenia treści opinii (feedback.*). */
  textKey: string;
  /** Kolor karty w sliderze (hex). */
  color: string;
};

export const testimonials: Testimonial[] = [
  { id: "serwis-gasiorek", name: "Serwis Gąsiorek", kind: "company", logo: serwisGasiorek, textKey: "feedback.text1", color: "#FF5733" },
  { id: "dawid-ferchow", name: "Dawid Ferchow", kind: "person", logo: dawidImage, textKey: "feedback.text2", color: "#33FF57" },
  { id: "agata-sulkowska", name: "Agata Sułkowska", kind: "person", logo: agataImage, textKey: "feedback.text3", color: "#5733FF" },
  { id: "grupa-degie", name: "Grupa DeGie", kind: "company", logo: grupaDeGie, textKey: "feedback.text4", color: "#FFC300" },
  { id: "julia-pitula", name: "Julia Pituła", kind: "person", logo: julkaImage, textKey: "feedback.text5", color: "#FF33A8" },
];

/** Firmy z opinii — logotypy w pasku zaufania. */
export const clientLogos = testimonials.filter((item) => item.kind === "company");
