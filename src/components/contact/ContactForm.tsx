import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { CONTACT_TOPIC_PARAM, isContactTopic } from "../../data/services/contact";
import {
  budgetLabelKeys,
  budgetOptions,
  deadlineLabelKeys,
  deadlineOptions,
  employmentLabelKeys,
  employmentOptions,
  isProjectTopic,
} from "../../data/contact";
import { paths } from "../../data/navigation";
import type { ContactTopic } from "../../data/services/types";
import { emptyContactForm, toTemplateParams, type ContactFormValues } from "../../lib/contactForm";
import { publicKey, serviceId, templateId } from "../../lib/env";
import { buttonClasses } from "../ui/buttonStyles";
import FormField from "./FormField";
import { fieldClasses } from "./fieldStyles";
import TopicPicker from "./TopicPicker";

type TextField = "name" | "email" | "materials" | "company" | "position" | "message" | "budget" | "deadline";

const ContactForm = () => {
  const { t } = useTranslation();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const isSending = status === "sending";

  // /kontakt?temat=wideo|web|praca|inne — temat wybrany z góry (CTA na podstronach usług).
  const [searchParams, setSearchParams] = useSearchParams();
  const topicParam = searchParams.get(CONTACT_TOPIC_PARAM);
  const [values, setValues] = useState<ContactFormValues>(() =>
    emptyContactForm(isContactTopic(topicParam) ? topicParam : ""),
  );

  // Kliknięcie innego CTA, gdy formularz jest już otwarty, zmienia tylko query string.
  useEffect(() => {
    if (isContactTopic(topicParam)) {
      setValues((current) => (current.topic === topicParam ? current : { ...current, topic: topicParam }));
    }
  }, [topicParam]);

  const setTopic = (topic: ContactTopic) => {
    setValues((current) => ({ ...current, topic }));
    const next = new URLSearchParams(searchParams);
    next.set(CONTACT_TOPIC_PARAM, topic);
    setSearchParams(next, { replace: true });
  };

  const handleChange =
    (field: TextField) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setValues((current) => ({ ...current, [field]: event.target.value }));

  const handleEmployment = (event: ChangeEvent<HTMLInputElement>) =>
    setValues((current) => ({ ...current, employment: event.target.value as ContactFormValues["employment"] }));

  const fireConfetti = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    confetti({
      particleCount: 100,
      spread: 50,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending) return;

    setStatus("sending");
    try {
      await emailjs.send(serviceId, templateId, toTemplateParams(values), { publicKey });
      fireConfetti();
      setValues(emptyContactForm(values.topic));
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  const showProjectFields = isProjectTopic(values.topic);
  const showJobFields = values.topic === "praca";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <FormField id="contact-name" label={t("contact.full_name")}>
          <input
            id="contact-name"
            type="text"
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={handleChange("name")}
            className={fieldClasses()}
          />
        </FormField>
        <FormField id="contact-email" label={t("contact.email")}>
          <input
            id="contact-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={handleChange("email")}
            className={fieldClasses()}
          />
        </FormField>
      </div>

      <TopicPicker value={values.topic} onChange={setTopic} />

      <AnimatePresence mode="wait" initial={false}>
        {showProjectFields && (
          <motion.div
            key="project"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid gap-5 md:grid-cols-2"
          >
            <FormField id="contact-budget" label={t("contact.form.budget")}>
              <select
                id="contact-budget"
                name="budget"
                required
                value={values.budget}
                onChange={handleChange("budget")}
                className={fieldClasses()}
              >
                <option value="" disabled>
                  {t("contact.form.select_placeholder")}
                </option>
                {budgetOptions.map((option) => (
                  <option key={option} value={option}>
                    {t(budgetLabelKeys[option])}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField id="contact-deadline" label={t("contact.form.deadline")}>
              <select
                id="contact-deadline"
                name="deadline"
                required
                value={values.deadline}
                onChange={handleChange("deadline")}
                className={fieldClasses()}
              >
                <option value="" disabled>
                  {t("contact.form.select_placeholder")}
                </option>
                {deadlineOptions.map((option) => (
                  <option key={option} value={option}>
                    {t(deadlineLabelKeys[option])}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField id="contact-materials" label={t("contact.form.materials")} optional className="md:col-span-2">
              <input
                id="contact-materials"
                type="url"
                name="materials"
                inputMode="url"
                placeholder="https://"
                value={values.materials}
                onChange={handleChange("materials")}
                className={fieldClasses()}
              />
            </FormField>
          </motion.div>
        )}

        {showJobFields && (
          <motion.div
            key="job"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid gap-5 md:grid-cols-2"
          >
            <FormField id="contact-company" label={t("contact.form.company")}>
              <input
                id="contact-company"
                type="text"
                name="company"
                autoComplete="organization"
                required
                value={values.company}
                onChange={handleChange("company")}
                className={fieldClasses()}
              />
            </FormField>
            <FormField id="contact-position" label={t("contact.form.position")}>
              <input
                id="contact-position"
                type="text"
                name="position"
                autoComplete="organization-title"
                required
                value={values.position}
                onChange={handleChange("position")}
                className={fieldClasses()}
              />
            </FormField>
            <fieldset className="flex flex-col gap-1.5 md:col-span-2">
              <legend className="mb-1.5 text-small font-medium text-fg-secondary">
                {t("contact.form.employment")}
              </legend>
              <div className="flex flex-wrap gap-2">
                {employmentOptions.map((option) => (
                  <label
                    key={option}
                    className={`cursor-pointer rounded-full border px-4 py-2 text-small transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent ${
                      values.employment === option
                        ? "border-accent/70 bg-accent/10 text-fg"
                        : "border-border bg-background text-fg-secondary hover:border-border-strong"
                    }`}
                  >
                    <input
                      type="radio"
                      name="employment"
                      value={option}
                      required
                      checked={values.employment === option}
                      onChange={handleEmployment}
                      className="sr-only"
                    />
                    {t(employmentLabelKeys[option])}
                  </label>
                ))}
              </div>
            </fieldset>
          </motion.div>
        )}
      </AnimatePresence>

      <FormField id="contact-message" label={t("contact.form.message")}>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          placeholder={t("contact.message")}
          value={values.message}
          onChange={handleChange("message")}
          className={`${fieldClasses()} resize-y`}
        />
      </FormField>

      <label className="flex cursor-pointer items-start gap-3 text-small text-fg-secondary">
        <input
          type="checkbox"
          name="consent"
          required
          checked={values.consent}
          onChange={(event) => setValues((current) => ({ ...current, consent: event.target.checked }))}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-border-strong accent-accent"
        />
        <span>
          <Trans
            i18nKey="contact.form.consent"
            components={{
              policy: (
                <Link
                  to={paths.privacy}
                  target="_blank"
                  className="text-accent underline underline-offset-4 hover:text-accent-hover"
                />
              ),
            }}
          />
        </span>
      </label>

      {status === "error" && (
        <p role="alert" className="text-small text-danger">
          {t("contact.error")}
        </p>
      )}

      <button
        ref={buttonRef}
        type="submit"
        disabled={isSending}
        aria-busy={isSending}
        className={buttonClasses({ size: "lg", className: "mt-1 w-full sm:w-auto sm:self-end" })}
      >
        {isSending ? t("contact.btn_sending") : t("contact.btn_send")}
      </button>
    </form>
  );
};

export default ContactForm;
