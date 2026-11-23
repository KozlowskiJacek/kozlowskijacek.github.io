import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { errorId } from "./fieldStyles";

type FormFieldProps = {
  id: string;
  label: string;
  /** Dopisek „(opcjonalnie)” przy etykiecie. */
  optional?: boolean;
  /** Komunikat błędu (już przetłumaczony). */
  error?: string;
  children: ReactNode;
  className?: string;
};

/** Etykieta + kontrolka + komunikat błędu pod spodem. */
const FormField = ({ id, label, optional = false, error, children, className = "" }: FormFieldProps) => {
  const { t } = useTranslation();

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-small font-medium text-fg-secondary">
        {label}
        {optional && <span className="font-normal text-fg-muted"> ({t("contact:form.optional")})</span>}
      </label>
      {children}
      {error && (
        <p id={errorId(id)} className="text-small text-danger">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
