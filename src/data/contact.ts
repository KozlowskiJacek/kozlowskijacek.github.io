import type { IconType } from "react-icons";
import { FaBriefcase, FaCode, FaComments, FaVideo } from "react-icons/fa6";
import type { ContactTopic } from "./services/types";

/** Kafelek tematu w formularzu kontaktowym. */
export type ContactTopicOption = {
  id: ContactTopic;
  icon: IconType;
  /** Klucz krótkiego opisu pod nazwą tematu. */
  hintKey: string;
};

/** Kolejność kafelków tematu (etykiety: `contactTopicKeys`). */
export const contactTopicOptions: ContactTopicOption[] = [
  { id: "wideo", icon: FaVideo, hintKey: "contact.form.topic_hints.wideo" },
  { id: "web", icon: FaCode, hintKey: "contact.form.topic_hints.web" },
  { id: "praca", icon: FaBriefcase, hintKey: "contact.form.topic_hints.praca" },
  { id: "inne", icon: FaComments, hintKey: "contact.form.topic_hints.inne" },
];

/** Tematy projektowe — pokazują budżet, termin i link do materiałów. */
export const projectTopics: readonly ContactTopic[] = ["wideo", "web"];

export const isProjectTopic = (topic: ContactTopic | "") =>
  topic !== "" && projectTopics.includes(topic);

export type BudgetOption = "lt2k" | "2k-5k" | "5k-10k" | "10k-20k" | "gt20k" | "unknown";
export type DeadlineOption = "asap" | "2w" | "1m" | "3m" | "flexible";
export type EmploymentOption = "uop" | "b2b" | "zlecenie";

/** Przedziały budżetu → klucz etykiety (kolejność = kolejność w selekcie). */
export const budgetLabelKeys: Record<BudgetOption, string> = {
  lt2k: "contact.form.budget_options.lt2k",
  "2k-5k": "contact.form.budget_options.2k-5k",
  "5k-10k": "contact.form.budget_options.5k-10k",
  "10k-20k": "contact.form.budget_options.10k-20k",
  gt20k: "contact.form.budget_options.gt20k",
  unknown: "contact.form.budget_options.unknown",
};

/** Oczekiwany termin realizacji → klucz etykiety. */
export const deadlineLabelKeys: Record<DeadlineOption, string> = {
  asap: "contact.form.deadline_options.asap",
  "2w": "contact.form.deadline_options.2w",
  "1m": "contact.form.deadline_options.1m",
  "3m": "contact.form.deadline_options.3m",
  flexible: "contact.form.deadline_options.flexible",
};

/** Forma współpracy w ofercie pracy → klucz etykiety. */
export const employmentLabelKeys: Record<EmploymentOption, string> = {
  uop: "contact.form.employment_options.uop",
  b2b: "contact.form.employment_options.b2b",
  zlecenie: "contact.form.employment_options.zlecenie",
};

const keysOf = <T extends string>(record: Record<T, string>) => Object.keys(record) as T[];

export const budgetOptions = keysOf(budgetLabelKeys);
export const deadlineOptions = keysOf(deadlineLabelKeys);
export const employmentOptions = keysOf(employmentLabelKeys);

/** Adres do bezpośredniego kontaktu i fallbacku mailto, gdy wysyłka formularza się nie uda. */
export const contactEmail = "jacek.kozlowski2000@gmail.com";
