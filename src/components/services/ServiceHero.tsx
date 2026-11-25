import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowRight } from "react-icons/fa6";
import { enter } from "../../lib/animations";
import { contactTopicPath } from "../../data/services/contact";
import type { ContactTopic, ServiceHeroData, ServiceTone } from "../../data/services/types";
import Section from "../ui/Section";
import Button from "../ui/Button";
import { toneClasses } from "./tone";

type ServiceHeroProps = {
  hero: ServiceHeroData;
  tone: ServiceTone;
  topic: ContactTopic;
  /** Kotwica drugiego przycisku (np. sekcja pakietów). */
  secondaryHref?: string;
  /** Media obok tekstu (np. showreel). Brak → układ wyśrodkowany. */
  media?: ReactNode;
};

/** Pierwsza sekcja podstrony usług: nagłówek, opis, CTA i opcjonalne media. */
const ServiceHero = ({ hero, tone, topic, secondaryHref, media }: ServiceHeroProps) => {
  const { t } = useTranslation();
  const classes = toneClasses[tone];
  const centered = !media;

  return (
    <Section
      id="hero"
      padding="hero"
      className="flex-col lg:flex-row"
      backdrop={
        <div
          aria-hidden="true"
          className={`absolute inset-0 -z-10 bg-gradient-to-b ${classes.glow} via-transparent to-transparent`}
        />
      }
    >
      <div className={`w-full ${centered ? "max-w-3xl text-center" : "lg:max-w-xl"}`}>
        <p className={`mb-4 text-small font-semibold uppercase tracking-wider ${classes.text} ${enter(0)}`}>
          {t(hero.eyebrowKey)}
        </p>
        <h1 className={`text-balance font-display text-h1 text-fg ${enter(1)}`}>
          {t(hero.titleKey)} <span className={classes.text}>{t(hero.accentKey)}</span>
        </h1>
        <p
          className={`mt-5 text-body text-fg-secondary md:text-body-lg ${centered ? "mx-auto max-w-2xl" : ""} ${enter(2)}`}
        >
          {t(hero.textKey)}
        </p>
        <div
          className={`mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 ${centered ? "sm:justify-center" : ""} ${enter(3)}`}
        >
          <Button to={contactTopicPath(topic)} variant={classes.button} size="lg">
            {t("services:shared.cta_button")}
            <FaArrowRight aria-hidden="true" className="text-small" />
          </Button>
          {secondaryHref && (
            <Button href={secondaryHref} variant="secondary" size="lg">
              {t("services:shared.see_packages")}
            </Button>
          )}
        </div>
      </div>

      {media && <div className={`w-full lg:max-w-xl ${enter(2)}`}>{media}</div>}
    </Section>
  );
};

export default ServiceHero;
