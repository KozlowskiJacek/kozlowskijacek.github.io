import { useTranslation } from "react-i18next";
import { contactTopicOptions } from "../../data/contact";
import { contactTopicKeys } from "../../data/services/contact";
import type { ContactTopic } from "../../data/services/types";
import { errorId } from "./fieldStyles";

type TopicPickerProps = {
  value: ContactTopic | "";
  onChange: (topic: ContactTopic) => void;
  /** Komunikat błędu (już przetłumaczony). */
  error?: string;
};

const ID = "contact-topic";

/** Wybór tematu jako kafelki — pod spodem natywne radio (klawiatura, czytniki ekranu). */
const TopicPicker = ({ value, onChange, error }: TopicPickerProps) => {
  const { t } = useTranslation();

  return (
    <fieldset id={ID} aria-describedby={error ? errorId(ID) : undefined} className="flex flex-col gap-1.5">
      <legend className="mb-1.5 text-small font-medium text-fg-secondary">{t("contact:form.topic")}</legend>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {contactTopicOptions.map(({ id, icon: Icon, hintKey }) => {
          const checked = value === id;
          return (
            <label
              key={id}
              className={`group relative flex cursor-pointer flex-col gap-2 rounded-xl border p-4 transition-[border-color,background-color,box-shadow] duration-200 ease-out has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent ${
                checked
                  ? "border-accent/70 bg-accent/10 shadow-card"
                  : error
                    ? "border-danger/50 bg-background hover:border-danger/80"
                    : "border-border bg-background hover:border-border-strong"
              }`}
            >
              <input
                id={`contact-topic-${id}`}
                type="radio"
                name="topic"
                value={id}
                checked={checked}
                onChange={() => onChange(id)}
                className="sr-only"
              />
              <Icon
                aria-hidden="true"
                className={`text-xl transition-colors ${checked ? "text-accent" : "text-fg-muted group-hover:text-fg-secondary"}`}
              />
              <span className="text-small font-semibold text-fg">{t(contactTopicKeys[id])}</span>
              <span className="text-xs leading-snug text-fg-muted">{t(hintKey)}</span>
            </label>
          );
        })}
      </div>
      {error && (
        <p id={errorId(ID)} className="text-small text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
};

export default TopicPicker;
