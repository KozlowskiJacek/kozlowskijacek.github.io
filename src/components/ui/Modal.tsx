import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { FaXmark } from "react-icons/fa6";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ open, onClose, children }: ModalProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Portal: modal nie dziedziczy stacking contextu ani transformacji sekcji (animacje framer-motion).
  return createPortal(
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center px-4 transition-[background-color,backdrop-filter] duration-300 ease-out ${
        open ? "visible bg-background/70 backdrop-blur-sm" : "invisible bg-transparent"
      }`}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full max-w-lg rounded-2xl border border-border bg-surface-elevated text-left text-fg shadow-lift transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t("skills.close_btn")}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-fg-secondary transition-colors hover:bg-surface hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <FaXmark aria-hidden="true" />
        </button>
        <div className="max-h-[80vh] overflow-y-auto p-6 md:p-8">{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
