import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { enter } from "../lib/animations";
import { paths } from "../data/navigation";
import Section from "./ui/Section";
import Button from "./ui/Button";

type PageIntroProps = {
  /** Id sekcji (cel kotwicy). */
  id: string;
  /** Mały nadtytuł nad nagłówkiem. */
  eyebrow?: ReactNode;
  title: ReactNode;
  text: ReactNode;
  /** Dodatkowa treść pod opisem (np. link powrotny). */
  children?: ReactNode;
};

/** Nagłówek podstrony: tytuł, krótki opis i CTA do kontaktu. */
const PageIntro = ({ id, eyebrow, title, text, children }: PageIntroProps) => {
  const { t } = useTranslation();

  return (
    <Section id={id} padding="hero" className="flex-col">
      <div className="w-full max-w-3xl text-center">
        {eyebrow && (
          <p className={`mb-4 text-small font-semibold uppercase tracking-wider text-accent ${enter(0)}`}>
            {eyebrow}
          </p>
        )}
        <h1 className={`text-balance font-display text-h1 text-fg ${enter(1)}`}>{title}</h1>
        <p className={`mx-auto mt-5 max-w-2xl text-body text-fg-secondary md:text-body-lg ${enter(2)}`}>
          {text}
        </p>
        <div className={`mt-8 flex flex-wrap items-center justify-center gap-4 ${enter(3)}`}>
          <Button to={paths.contact} size="lg">
            {t("common:cta")}
          </Button>
          {children}
        </div>
      </div>
    </Section>
  );
};

export default PageIntro;
