import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { FaXmark } from "react-icons/fa6";

const sizes = {
  md: "max-w-lg",
  /** Szeroki — np. odtwarzacz wideo. */
  xl: "max-w-4xl",
} as const;

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Id nagłówka w treści — nazwa dialogu dla czytnika ekranu. */
  labelledBy?: string;
  size?: keyof typeof sizes;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

/**
 * Dostępny dialog: focus trap, zamykanie Esc / kliknięciem w tło, blokada przewijania strony
 * i powrót fokusu do elementu, który otworzył modal.
 */
const Modal = ({ open, onClose, children, labelledBy, size = "md" }: ModalProps) => {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDivElement>(null);
  // Aktualny onClose bez restartu efektu (rodzice często podają funkcję inline).
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  // Portal dopiero po zamontowaniu: HTML z prerenderingu nie ma modala, więc pierwszy render
  // na kliencie też musi zwrócić null — inaczej hydratacja się nie zgadza.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const opener = document.activeElement as HTMLElement | null;
    const { body, documentElement } = document;

    // Blokada przewijania + kompensacja paska przewijania (treść nie „skacze” w bok).
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    const previous = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      body.style.overflow = previous.overflow;
      body.style.paddingRight = previous.paddingRight;
      opener?.focus({ preventScroll: true });
    };
  }, [open]);

  /** Strażnik na krawędzi dialogu: Tab z ostatniego elementu wraca na pierwszy i odwrotnie (działa też z iframe). */
  const wrapFocus = (edge: "first" | "last") => () => {
    const items = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (!items?.length) return;
    (edge === "first" ? items[0] : items[items.length - 1]).focus();
  };

  const sentinel = (edge: "first" | "last") =>
    open && <span tabIndex={0} aria-hidden="true" className="sr-only" onFocus={wrapFocus(edge)} />;

  if (!mounted) return null;

  // Portal: modal nie dziedziczy stacking contextu ani transformacji sekcji (animacje framer-motion).
  return createPortal(
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center px-4 transition-[background-color,backdrop-filter] duration-300 ease-out ${
        open ? "visible bg-background/70 backdrop-blur-sm" : "invisible bg-transparent"
      }`}
      aria-hidden={!open}
      onClick={onClose}
    >
      {sentinel("last")}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`relative w-full ${sizes[size]} rounded-2xl border border-border bg-surface-elevated text-left text-fg shadow-lift transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t("common:close")}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full text-fg-secondary transition-colors hover:bg-surface hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <FaXmark aria-hidden="true" />
        </button>
        <div className="max-h-[85vh] overflow-y-auto p-6 md:p-8">{children}</div>
      </div>
      {sentinel("first")}
    </div>,
    document.body,
  );
};

export default Modal;
