import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { FaCircleCheck, FaEnvelope, FaSpinner, FaTriangleExclamation } from "react-icons/fa6";
import { CONTACT_TOPIC_PARAM, contactTopicKeys, isContactTopic } from "../../data/services/contact";
import {
  budgetLabelKeys,
  budgetOptions,
  contactEmail,
  deadlineLabelKeys,
  deadlineOptions,
  employmentLabelKeys,
  employmentOptions,
  isProjectTopic,
} from "../../data/contact";
import { paths } from "../../data/navigation";
import type { ContactTopic } from "../../data/services/types";
import {
  emptyContactForm,
  toMailtoHref,
  toTemplateParams,
  type ContactFormValues,
} from "../../lib/contactForm";
import {
  contactFieldOrder,
  validateContactForm,
  MESSAGE_MAX,
  type ContactField,
} from "../../lib/contactValidation";
import { checkSpam, HONEYPOT_FIELD } from "../../lib/contactSpam";
import { emailJsConfig, missingEmailJsMessage } from "../../lib/env";
import { buttonClasses } from "../ui/buttonStyles";
import FormField from "./FormField";
import { errorId, fieldClasses } from "./fieldStyles";
import TopicPicker from "./TopicPicker";

type Status = "idle" | "sending" | "success" | "error" | "too_fast";
type TextField = "name" | "email" | "materials" | "company" | "position" | "message" | "budget" | "deadline";

/** Id elementu, na który trafia fokus przy błędzie danego pola. */
const focusTargetId: Record<ContactField, string> = {
  name: "contact-name",
  email: "contact-email",
  topic: "contact-topic-wideo",
  budget: "contact-budget",
  deadline: "contact-deadline",
  materials: "contact-materials",
  company: "contact-company",
  position: "contact-position",
  employment: "contact-employment-uop",
  message: "contact-message",
  consent: "contact-consent",
};

const fieldsMotion = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.2 },
};

const ContactForm = () => {
  const { t } = useTranslation();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const isSending = status === "sending";

  // Antyspam: ukryte pole-pułapka + minimalny czas od załadowania formularza.
  const [honeypot, setHoneypot] = useState("");
  const loadedAt = useRef(Date.now());

  // /kontakt?temat=wideo|web|praca|inne — temat wybrany z góry (CTA na podstronach usług).
  const [searchParams, setSearchParams] = useSearchParams();
  const topicParam = searchParams.get(CONTACT_TOPIC_PARAM);
  const [values, setValues] = useState<ContactFormValues>(() =>
    emptyContactForm(isContactTopic(topicParam) ? topicParam : ""),
  );

  // Błędy pokazujemy dopiero po opuszczeniu pola albo po próbie wysyłki.
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const errors = useMemo(() => validateContactForm(values), [values]);

  const errorFor = (field: ContactField) => {
    const error = errors[field];
    if (!error || !(submitAttempted || touched[field])) return undefined;
    return t(error.key, error.params);
  };

  /** Atrybuty dostępności kontrolki z ewentualnym błędem. */
  const a11y = (field: ContactField, id: string) => {
    const invalid = Boolean(errorFor(field));
    return {
      "aria-invalid": invalid || undefined,
      "aria-describedby": invalid ? errorId(id) : undefined,
    };
  };

  const markTouched = (field: ContactField) => () =>
    setTouched((current) => (current[field] ? current : { ...current, [field]: true }));

  // Kliknięcie innego CTA, gdy formularz jest już otwarty, zmienia tylko query string.
  useEffect(() => {
    if (isContactTopic(topicParam)) {
      setValues((current) => (current.topic === topicParam ? current : { ...current, topic: topicParam }));
    }
  }, [topicParam]);

  const setTopic = (topic: ContactTopic) => {
    setValues((current) => ({ ...current, topic }));
    setTouched((current) => ({ ...current, topic: true }));
    const next = new URLSearchParams(searchParams);
    next.set(CONTACT_TOPIC_PARAM, topic);
    setSearchParams(next, { replace: true });
  };

  const handleChange =
    (field: TextField) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
      if (status === "error" || status === "too_fast") setStatus("idle");
    };

  const handleEmployment = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((current) => ({ ...current, employment: event.target.value as ContactFormValues["employment"] }));
    setTouched((current) => ({ ...current, employment: true }));
  };

  const fireConfetti = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    confetti({
      particleCount: 80,
      spread: 55,
      startVelocity: 30,
      disableForReducedMotion: true,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
    });
  };

  const focusFirstError = () => {
    const first = contactFieldOrder.find((field) => errors[field]);
    if (first) document.getElementById(focusTargetId[first])?.focus();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending) return;

    setSubmitAttempted(true);
    if (Object.keys(errors).length > 0) {
      focusFirstError();
      return;
    }

    const spam = checkSpam(honeypot, loadedAt.current);
    if (spam === "honeypot") {
      // Bot nie dostaje sygnału, że został wykryty — udajemy sukces bez wysyłki.
      setStatus("success");
      return;
    }
    if (spam === "too_fast") {
      setStatus("too_fast");
      return;
    }

    setStatus("sending");
    try {
      if (!emailJsConfig) throw new Error(missingEmailJsMessage);
      const { serviceId, templateId, publicKey } = emailJsConfig;
      await emailjs.send(serviceId, templateId, toTemplateParams(values), { publicKey });
      fireConfetti();
      setStatus("success");
    } catch (error) {
      if (import.meta.env.DEV) console.error("[EmailJS] Wysyłka nie powiodła się:", error);
      setStatus("error");
    }
  };

  const resetForm = () => {
    setValues(emptyContactForm(values.topic));
    setTouched({});
    setSubmitAttempted(false);
    setHoneypot("");
    loadedAt.current = Date.now();
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 py-10 text-center"
      >
        <FaCircleCheck aria-hidden="true" className="text-5xl text-accent" />
        <h2 className="font-display text-h3 text-fg">{t("contact:state.success_title")}</h2>
        <p className="max-w-md text-body text-fg-secondary">{t("contact:state.success_text")}</p>
        <button type="button" onClick={resetForm} className={buttonClasses({ variant: "secondary", className: "mt-2" })}>
          {t("contact:state.send_another")}
        </button>
      </motion.div>
    );
  }

  const showProjectFields = isProjectTopic(values.topic);
  const showJobFields = values.topic === "praca";
  const mailtoHref = toMailtoHref(
    contactEmail,
    values,
    `${t(contactTopicKeys[values.topic || "inne"])} — ${values.name.trim() || t("contact:state.mailto_subject")}`,
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-5">
      {import.meta.env.DEV && !emailJsConfig && (
        <p role="alert" className="rounded-xl border border-video/40 bg-video/10 px-4 py-3 text-small text-video">
          [dev] {missingEmailJsMessage}
        </p>
      )}

      {/* Pole-pułapka: poza ekranem, pominięte przez czytniki ekranu i nawigację klawiaturą. */}
      <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="contact-website">{t("contact:form.honeypot")}</label>
        <input
          id="contact-website"
          type="text"
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      {/* disabled na fieldset blokuje wszystkie kontrolki na czas wysyłki. */}
      <fieldset disabled={isSending} className="flex min-w-0 flex-col gap-5">
        <div className="grid gap-5 md:grid-cols-2">
          <FormField id="contact-name" label={t("contact:full_name")} error={errorFor("name")}>
            <input
              id="contact-name"
              type="text"
              name="name"
              autoComplete="name"
              required
              value={values.name}
              onChange={handleChange("name")}
              onBlur={markTouched("name")}
              className={fieldClasses(Boolean(errorFor("name")))}
              {...a11y("name", "contact-name")}
            />
          </FormField>
          <FormField id="contact-email" label={t("contact:email")} error={errorFor("email")}>
            <input
              id="contact-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={handleChange("email")}
              onBlur={markTouched("email")}
              className={fieldClasses(Boolean(errorFor("email")))}
              {...a11y("email", "contact-email")}
            />
          </FormField>
        </div>

        <TopicPicker value={values.topic} onChange={setTopic} error={errorFor("topic")} />

        <AnimatePresence mode="wait" initial={false}>
          {showProjectFields && (
            <motion.div key="project" {...fieldsMotion} className="grid gap-5 md:grid-cols-2">
              <FormField id="contact-budget" label={t("contact:form.budget")} error={errorFor("budget")}>
                <select
                  id="contact-budget"
                  name="budget"
                  required
                  value={values.budget}
                  onChange={handleChange("budget")}
                  onBlur={markTouched("budget")}
                  className={fieldClasses(Boolean(errorFor("budget")))}
                  {...a11y("budget", "contact-budget")}
                >
                  <option value="" disabled>
                    {t("contact:form.select_placeholder")}
                  </option>
                  {budgetOptions.map((option) => (
                    <option key={option} value={option}>
                      {t(budgetLabelKeys[option])}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField id="contact-deadline" label={t("contact:form.deadline")} error={errorFor("deadline")}>
                <select
                  id="contact-deadline"
                  name="deadline"
                  required
                  value={values.deadline}
                  onChange={handleChange("deadline")}
                  onBlur={markTouched("deadline")}
                  className={fieldClasses(Boolean(errorFor("deadline")))}
                  {...a11y("deadline", "contact-deadline")}
                >
                  <option value="" disabled>
                    {t("contact:form.select_placeholder")}
                  </option>
                  {deadlineOptions.map((option) => (
                    <option key={option} value={option}>
                      {t(deadlineLabelKeys[option])}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField
                id="contact-materials"
                label={t("contact:form.materials")}
                optional
                error={errorFor("materials")}
                className="md:col-span-2"
              >
                <input
                  id="contact-materials"
                  type="url"
                  name="materials"
                  inputMode="url"
                  placeholder="https://"
                  value={values.materials}
                  onChange={handleChange("materials")}
                  onBlur={markTouched("materials")}
                  className={fieldClasses(Boolean(errorFor("materials")))}
                  {...a11y("materials", "contact-materials")}
                />
              </FormField>
            </motion.div>
          )}

          {showJobFields && (
            <motion.div key="job" {...fieldsMotion} className="grid gap-5 md:grid-cols-2">
              <FormField id="contact-company" label={t("contact:form.company")} error={errorFor("company")}>
                <input
                  id="contact-company"
                  type="text"
                  name="company"
                  autoComplete="organization"
                  required
                  value={values.company}
                  onChange={handleChange("company")}
                  onBlur={markTouched("company")}
                  className={fieldClasses(Boolean(errorFor("company")))}
                  {...a11y("company", "contact-company")}
                />
              </FormField>
              <FormField id="contact-position" label={t("contact:form.position")} error={errorFor("position")}>
                <input
                  id="contact-position"
                  type="text"
                  name="position"
                  autoComplete="organization-title"
                  required
                  value={values.position}
                  onChange={handleChange("position")}
                  onBlur={markTouched("position")}
                  className={fieldClasses(Boolean(errorFor("position")))}
                  {...a11y("position", "contact-position")}
                />
              </FormField>
              <fieldset
                className="flex min-w-0 flex-col gap-1.5 md:col-span-2"
                aria-describedby={errorFor("employment") ? errorId("contact-employment") : undefined}
              >
                <legend className="mb-1.5 text-small font-medium text-fg-secondary">
                  {t("contact:form.employment")}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {employmentOptions.map((option) => (
                    <label
                      key={option}
                      className={`cursor-pointer rounded-full border px-4 py-2 text-small transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent ${
                        values.employment === option
                          ? "border-accent/70 bg-accent/10 text-fg"
                          : errorFor("employment")
                            ? "border-danger/50 bg-background text-fg-secondary hover:border-danger/80"
                            : "border-border bg-background text-fg-secondary hover:border-border-strong"
                      }`}
                    >
                      <input
                        id={`contact-employment-${option}`}
                        type="radio"
                        name="employment"
                        value={option}
                        checked={values.employment === option}
                        onChange={handleEmployment}
                        className="sr-only"
                      />
                      {t(employmentLabelKeys[option])}
                    </label>
                  ))}
                </div>
                {errorFor("employment") && (
                  <p id={errorId("contact-employment")} className="text-small text-danger">
                    {errorFor("employment")}
                  </p>
                )}
              </fieldset>
            </motion.div>
          )}
        </AnimatePresence>

        <FormField id="contact-message" label={t("contact:form.message")} error={errorFor("message")}>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            required
            maxLength={MESSAGE_MAX}
            placeholder={t("contact:message")}
            value={values.message}
            onChange={handleChange("message")}
            onBlur={markTouched("message")}
            className={`${fieldClasses(Boolean(errorFor("message")))} resize-y`}
            {...a11y("message", "contact-message")}
          />
        </FormField>

        <div className="flex flex-col gap-1.5">
          <label className="flex cursor-pointer items-start gap-3 text-small text-fg-secondary">
            <input
              id="contact-consent"
              type="checkbox"
              name="consent"
              required
              checked={values.consent}
              onChange={(event) => {
                const { checked } = event.target;
                setValues((current) => ({ ...current, consent: checked }));
                setTouched((current) => ({ ...current, consent: true }));
              }}
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-border-strong accent-accent"
              {...a11y("consent", "contact-consent")}
            />
            <span>
              <Trans
                i18nKey="contact:form.consent"
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
          {errorFor("consent") && (
            <p id={errorId("contact-consent")} className="pl-8 text-small text-danger">
              {errorFor("consent")}
            </p>
          )}
        </div>
      </fieldset>

      {submitAttempted && Object.keys(errors).length > 0 && (
        <p className="sr-only" role="alert">
          {t("contact:validation.summary")}
        </p>
      )}

      {status === "too_fast" && (
        <p role="alert" className="rounded-xl border border-video/40 bg-video/10 px-4 py-3 text-small text-fg">
          {t("contact:state.too_fast")}
        </p>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-danger/40 bg-danger/10 px-4 py-4 text-small sm:flex-row sm:items-center"
        >
          <FaTriangleExclamation aria-hidden="true" className="shrink-0 text-lg text-danger" />
          <p className="flex-1 text-fg">{t("contact:state.error_text")}</p>
          <a
            href={mailtoHref}
            className={buttonClasses({ variant: "secondary", size: "sm", className: "shrink-0" })}
          >
            <FaEnvelope aria-hidden="true" />
            {t("contact:state.mailto")}
          </a>
        </div>
      )}

      <button
        ref={buttonRef}
        type="submit"
        disabled={isSending}
        aria-busy={isSending}
        className={buttonClasses({ size: "lg", className: "mt-1 w-full sm:w-auto sm:self-end" })}
      >
        {isSending && <FaSpinner aria-hidden="true" className="animate-spin" />}
        {isSending ? t("contact:btn_sending") : t("contact:btn_send")}
      </button>
    </form>
  );
};

export default ContactForm;
