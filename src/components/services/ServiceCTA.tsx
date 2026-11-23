import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { fadeIn, reveal } from "../../lib/animations";
import { contactTopicPath } from "../../data/services/contact";
import type { ContactTopic, ServiceCtaData, ServiceTone } from "../../data/services/types";
import Section from "../ui/Section";
import Button from "../ui/Button";
import { toneClasses } from "./tone";

type ServiceCTAProps = {
  cta: ServiceCtaData;
  tone: ServiceTone;
  topic: ContactTopic;
  /** Klucz tłumaczenia tekstu przycisku (domyślnie „Zapytaj o wycenę”). */
  buttonKey?: string;
};

/** Końcowe wezwanie do kontaktu z tematem podstrony (/kontakt?temat=…). */
const ServiceCTA = ({ cta, tone, topic, buttonKey = "services:shared.cta_button" }: ServiceCTAProps) => {
  const { t } = useTranslation();
  const classes = toneClasses[tone];

  return (
    <Section id="cta" padding="compact" className="flex-col">
      <motion.div
        className={`relative isolate w-full overflow-hidden rounded-3xl border bg-surface-elevated px-6 py-14 text-center shadow-card sm:px-12 md:py-20 ${classes.border}`}
        variants={fadeIn("bottom")}
        {...reveal}
      >
        <div
          aria-hidden="true"
          className={`absolute inset-0 -z-10 bg-gradient-to-b ${classes.glow} via-transparent to-transparent`}
        />
        <h2 className="text-balance font-display text-h2 text-fg">
          {t(cta.titleKey)} <span className={classes.text}>{t(cta.accentKey)}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-body text-fg-secondary md:text-body-lg">{t(cta.textKey)}</p>
        <Button to={contactTopicPath(topic)} variant={classes.button} size="lg" className="mt-8">
          {t(buttonKey)}
          <FaArrowRight aria-hidden="true" className="text-small" />
        </Button>
      </motion.div>
    </Section>
  );
};

export default ServiceCTA;
