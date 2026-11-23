import { paths } from "../navigation";
import type { ContactTopic } from "./types";

/** Nazwa parametru tematu w adresie /kontakt. */
export const CONTACT_TOPIC_PARAM = "temat";

/** Klucze tłumaczeń tematów — etykiety kafelków i temat wiadomości w EmailJS. */
export const contactTopicKeys: Record<ContactTopic, string> = {
  wideo: "contact.topics.wideo",
  web: "contact.topics.web",
  praca: "contact.topics.praca",
  inne: "contact.topics.inne",
};

export const isContactTopic = (value: string | null): value is ContactTopic =>
  value !== null && value in contactTopicKeys;

/** Link do formularza z wybranym tematem, np. /kontakt?temat=wideo. */
export const contactTopicPath = (topic: ContactTopic) =>
  `${paths.contact}?${CONTACT_TOPIC_PARAM}=${topic}`;
