import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { staggerContainer, staggerItem } from "../../lib/animations";
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
      <motion.div
        className={`w-full ${centered ? "max-w-3xl text-center" : "lg:max-w-xl"}`}
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={staggerItem}
          className={`mb-4 text-small font-semibold uppercase tracking-wider ${classes.text}`}
        >
          {t(hero.eyebrowKey)}
        </motion.p>
        <motion.h1 variants={staggerItem} className="text-balance font-display text-h1 text-fg">
          {t(hero.titleKey)} <span className={classes.text}>{t(hero.accentKey)}</span>
        </motion.h1>
        <motion.p
          variants={staggerItem}
          className={`mt-5 text-body text-fg-secondary md:text-body-lg ${centered ? "mx-auto max-w-2xl" : ""}`}
        >
          {t(hero.textKey)}
        </motion.p>
        <motion.div
          variants={staggerItem}
          className={`mt-8 flex flex-wrap items-center gap-4 ${centered ? "justify-center" : ""}`}
        >
          <Button to={contactTopicPath(topic)} variant={classes.button} size="lg">
            {t("services.cta_button")}
            <FaArrowRight aria-hidden="true" className="text-small" />
          </Button>
          {secondaryHref && (
            <Button href={secondaryHref} variant="secondary" size="lg">
              {t("services.see_packages")}
            </Button>
          )}
        </motion.div>
      </motion.div>

      {media && (
        <motion.div
          className="w-full lg:max-w-xl"
          variants={staggerItem}
          initial="hidden"
          animate="visible"
        >
          {media}
        </motion.div>
      )}
    </Section>
  );
};

export default ServiceHero;
