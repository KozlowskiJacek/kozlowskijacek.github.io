import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowUpRightFromSquare, FaCheck, FaClock, FaCopy, FaEnvelope } from "react-icons/fa6";
import { contactEmail, contactLinks } from "../../data/contact";
import Card from "../ui/Card";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated";

/** Kopiuje tekst do schowka; fallback przez zaznaczenie tekstu dla starszych przeglądarek / braku HTTPS. */
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    // Brak API albo odmowa uprawnień (np. iframe) — próbujemy starszej metody.
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.className = "fixed -left-[10000px]";
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand("copy");
  textarea.remove();
  if (!ok) throw new Error("copy failed");
};

const COPIED_RESET_MS = 2000;

/** Bezpośrednie kanały kontaktu obok formularza: e-mail (z kopiowaniem), profile, czas odpowiedzi. */
const ContactChannels = () => {
  const { t } = useTranslation();
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const resetTimer = useRef<number>();

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const handleCopy = async () => {
    try {
      await copyToClipboard(contactEmail);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopyState("idle"), COPIED_RESET_MS);
  };

  const links = contactLinks.filter((link) => link.href);
  const [emailLocal, emailDomain] = contactEmail.split("@");

  return (
    <Card as="div" className="flex flex-col gap-6 p-5 sm:p-6">
      <div>
        <h2 className="font-display text-h3 text-fg">{t("contact.channels.title")}</h2>
        <p className="mt-2 text-small text-fg-secondary">{t("contact.channels.text")}</p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-small font-medium text-fg-secondary">{t("contact.channels.email")}</span>
        <div className="flex items-center gap-2">
          <a
            href={`mailto:${contactEmail}`}
            className={`flex min-h-12 min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-border bg-background px-3.5 py-2.5 text-small text-fg transition-colors hover:border-accent/50 hover:text-accent ${focusRing}`}
          >
            <FaEnvelope aria-hidden="true" className="shrink-0 text-accent" />
            <span className="min-w-0 [overflow-wrap:anywhere]">
              {/* Jeśli adres się nie mieści, łamie się przed „@”, a nie w środku domeny. */}
              {emailLocal}
              <wbr />@{emailDomain}
            </span>
          </a>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={t("contact.channels.copy")}
            title={t("contact.channels.copy")}
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-background text-fg-secondary transition-colors hover:border-accent/50 hover:text-accent ${focusRing}`}
          >
            {copyState === "copied" ? (
              <FaCheck aria-hidden="true" className="text-accent" />
            ) : (
              <FaCopy aria-hidden="true" />
            )}
          </button>
        </div>
        <p aria-live="polite" className="min-h-[1.375rem] text-small">
          {copyState === "copied" && <span className="text-accent">{t("contact.channels.copied")}</span>}
          {copyState === "failed" && <span className="text-danger">{t("contact.channels.copy_failed")}</span>}
        </p>
      </div>

      {links.length > 0 && (
        <ul className="flex flex-col gap-2">
          {links.map(({ id, icon: Icon, labelKey, detail, href }) => (
            <li key={id}>
              <a
                href={href ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 transition-colors hover:border-accent/50 ${focusRing}`}
              >
                <Icon aria-hidden="true" className="shrink-0 text-lg text-fg-secondary group-hover:text-accent" />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-small font-medium text-fg">{t(labelKey)}</span>
                  <span className="truncate text-xs text-fg-muted">{detail}</span>
                </span>
                <FaArrowUpRightFromSquare aria-hidden="true" className="shrink-0 text-xs text-fg-muted" />
                <span className="sr-only">{t("pages.case_study.new_tab")}</span>
              </a>
            </li>
          ))}
        </ul>
      )}

      <p className="flex items-center gap-3 rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-small text-fg-secondary">
        <FaClock aria-hidden="true" className="shrink-0 text-accent" />
        <span>
          {t("contact.channels.response_label")}{" "}
          <strong className="font-semibold text-fg">{t("contact.channels.response_time")}</strong>
        </span>
      </p>
    </Card>
  );
};

export default ContactChannels;
