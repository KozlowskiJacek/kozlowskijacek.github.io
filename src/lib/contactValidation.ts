import { isProjectTopic } from "../data/contact";
import type { ContactFormValues } from "./contactForm";

/** Pola, które mogą mieć błąd — w kolejności wyświetlania (fokus trafia na pierwszy błędny). */
export const contactFieldOrder = [
  "name",
  "email",
  "topic",
  "budget",
  "deadline",
  "materials",
  "company",
  "position",
  "employment",
  "message",
  "consent",
] as const;

export type ContactField = (typeof contactFieldOrder)[number];

/** Błąd pola: klucz tłumaczenia + opcjonalne parametry interpolacji. */
export type FieldError = { key: string; params?: Record<string, number> };
export type ContactErrors = Partial<Record<ContactField, FieldError>>;

export const NAME_MIN = 2;
export const NAME_MAX = 100;
export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 3000;
const SHORT_TEXT_MAX = 150;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const isHttpUrl = (value: string) => {
  try {
    const url = new URL(value);
    return (url.protocol === "http:" || url.protocol === "https:") && url.hostname.includes(".");
  } catch {
    return false;
  }
};

const required = { key: "contact:validation.required" };

/** Walidacja bez zewnętrznych bibliotek. Pola niedotyczące wybranego tematu są pomijane. */
export const validateContactForm = (values: ContactFormValues): ContactErrors => {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = required;
  else if (name.length < NAME_MIN) errors.name = { key: "contact:validation.too_short", params: { min: NAME_MIN } };
  else if (name.length > NAME_MAX) errors.name = { key: "contact:validation.too_long", params: { max: NAME_MAX } };

  if (!email) errors.email = required;
  else if (!EMAIL_PATTERN.test(email)) errors.email = { key: "contact:validation.email" };

  if (!values.topic) errors.topic = { key: "contact:validation.topic" };

  if (isProjectTopic(values.topic)) {
    if (!values.budget) errors.budget = { key: "contact:validation.choose" };
    if (!values.deadline) errors.deadline = { key: "contact:validation.choose" };
    const materials = values.materials.trim();
    if (materials && !isHttpUrl(materials)) errors.materials = { key: "contact:validation.url" };
  }

  if (values.topic === "praca") {
    const company = values.company.trim();
    const position = values.position.trim();
    if (!company) errors.company = required;
    else if (company.length > SHORT_TEXT_MAX)
      errors.company = { key: "contact:validation.too_long", params: { max: SHORT_TEXT_MAX } };
    if (!position) errors.position = required;
    else if (position.length > SHORT_TEXT_MAX)
      errors.position = { key: "contact:validation.too_long", params: { max: SHORT_TEXT_MAX } };
    if (!values.employment) errors.employment = { key: "contact:validation.choose" };
  }

  if (!message) errors.message = required;
  else if (message.length < MESSAGE_MIN)
    errors.message = { key: "contact:validation.too_short", params: { min: MESSAGE_MIN } };
  else if (message.length > MESSAGE_MAX)
    errors.message = { key: "contact:validation.too_long", params: { max: MESSAGE_MAX } };

  if (!values.consent) errors.consent = { key: "contact:validation.consent" };

  return errors;
};
