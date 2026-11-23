import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fadeIn, reveal, staggerContainer, staggerItem } from "../../lib/animations";
import { processSteps } from "../../data/process";
import Section from "../../components/ui/Section";
import SectionHeading from "../../components/ui/SectionHeading";

/** „Jak pracuję”: 5 kroków — pionowa oś na mobile, pozioma od `lg`. */
const Process = () => {
  const { t } = useTranslation();

  return (
    <Section id="process" className="flex-col">
      <motion.div className="max-w-2xl text-center" variants={fadeIn("bottom")} {...reveal}>
        <SectionHeading
          align="center"
          title={t("home:process.title")}
          accent={t("home:process.accent")}
        />
        <p className="mt-4 text-body text-fg-secondary md:text-body-lg">{t("home:process.text")}</p>
      </motion.div>

      <motion.ol
        className="relative grid w-full gap-8 lg:grid-cols-5 lg:gap-6"
        variants={staggerContainer(0.1)}
        {...reveal}
      >
        {/* Linia łącząca kroki: pionowa (mobile) / pozioma (desktop), przez środki znaczników. */}
        <span
          aria-hidden="true"
          className="absolute bottom-6 left-6 top-6 w-px bg-border-strong lg:bottom-auto lg:left-6 lg:right-6 lg:top-6 lg:h-px lg:w-auto"
        />
        {processSteps.map((step, index) => (
          <motion.li
            key={step.id}
            variants={staggerItem}
            className="relative flex gap-5 lg:flex-col lg:gap-5"
          >
            <span
              aria-hidden="true"
              className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-accent/40 bg-background font-display text-body-lg font-semibold text-accent"
            >
              {index + 1}
            </span>
            <div className="pt-2 lg:pt-0">
              <h3 className="font-display text-body-lg font-semibold text-fg">{t(step.titleKey)}</h3>
              <p className="mt-2 text-small text-fg-secondary">{t(step.textKey)}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
};

export default Process;
