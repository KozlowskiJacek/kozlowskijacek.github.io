import i18n from "./i18n";
import { contactTopicKeys } from "../data/services/contact";
import {
  budgetLabelKeys,
  deadlineLabelKeys,
  employmentLabelKeys,
  isProjectTopic,
  type BudgetOption,
  type DeadlineOption,
  type EmploymentOption,
} from "../data/contact";
import type { ContactTopic } from "../data/services/types";

export type ContactFormValues = {
  name: string;
  email: string;
  topic: ContactTopic | "";
  budget: BudgetOption | "";
  deadline: DeadlineOption | "";
  materials: string;
  company: string;
  position: string;
  employment: EmploymentOption | "";
  message: string;
  consent: boolean;
};

export const emptyContactForm = (topic: ContactTopic | "" = ""): ContactFormValues => ({
  name: "",
  email: "",
  topic,
  budget: "",
  deadline: "",
  materials: "",
  company: "",
  position: "",
  employment: "",
  message: "",
  consent: false,
});

/** Zmienne szablonu EmailJS — opis w README (sekcja „Szablon EmailJS”). */
export type ContactTemplateParams = Record<string, string>;

/** Pusta wartość w e-mailu dla pól, które nie dotyczą wybranego tematu. */
const EMPTY = "—";

/**
 * Zamienia wartości formularza na zmienne szablonu EmailJS.
 * Etykiety (temat, budżet, termin, forma) są zawsze po polsku — maile trafiają do właściciela strony,
 * a język odwiedzającego przekazuje osobna zmienna `language`.
 */
export const toTemplateParams = (values: ContactFormValues): ContactTemplateParams => {
  const pl = i18n.getFixedT("pl");
  const topic = values.topic || "inne";
  const project = isProjectTopic(topic);
  const job = topic === "praca";

  const budget = project && values.budget ? pl(budgetLabelKeys[values.budget]) : EMPTY;
  const deadline =
    project && values.deadline ? pl(deadlineLabelKeys[values.deadline]) : EMPTY;
  const materials = project && values.materials.trim() ? values.materials.trim() : EMPTY;
  const company = job && values.company.trim() ? values.company.trim() : EMPTY;
  const position = job && values.position.trim() ? values.position.trim() : EMPTY;
  const employment =
    job && values.employment ? pl(employmentLabelKeys[values.employment]) : EMPTY;

  // Gotowe podsumowanie pól zależnych od tematu — wystarczy jedna zmienna w prostym szablonie.
  const details = project
    ? [`Budżet: ${budget}`, `Termin: ${deadline}`, `Materiały: ${materials}`]
    : job
      ? [`Firma: ${company}`, `Stanowisko: ${position}`, `Forma współpracy: ${employment}`]
      : [];

  return {
    user_name: values.name.trim(),
    user_email: values.email.trim(),
    user_subject: pl(contactTopicKeys[topic]),
    topic,
    budget,
    deadline,
    materials_link: materials,
    company,
    position,
    employment_type: employment,
    details: details.join("\n") || EMPTY,
    message: values.message.trim(),
    consent: values.consent ? "Tak" : "Nie",
    language: (i18n.resolvedLanguage ?? i18n.language ?? "pl").split("-")[0],
    page_url: window.location.href,
  };
};
