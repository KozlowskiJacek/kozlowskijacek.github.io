import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { reveal, staggerContainer, staggerItem } from "../../lib/animations";
import type { SectionCopy, ServiceStep, ServiceTone } from "../../data/services/types";
import Section from "../ui/Section";
import ServiceSectionHeader from "./ServiceSectionHeader";
import { toneClasses } from "./tone";

type ProcessStepsProps = {
  id: string;
  copy: SectionCopy;
  steps: ServiceStep[];
  tone: ServiceTone;
  bg?: "primary" | "secondary";
};

/** Etapy współpracy: pionowa oś na mobile, pozioma od `lg`. */
const ProcessSteps = ({ id, copy, steps, tone, bg = "primary" }: ProcessStepsProps) => {
  const { t } = useTranslation();
  const classes = toneClasses[tone];

  return (
    <Section id={id} bg={bg} className="flex-col">
      <ServiceSectionHeader copy={copy} tone={tone} />

      <motion.ol
        className="relative grid w-full gap-8 lg:grid-cols-5 lg:gap-6"
        variants={staggerContainer(0.1)}
        {...reveal}
      >
        <span
          aria-hidden="true"
          className="absolute bottom-6 left-6 top-6 w-px bg-border-strong lg:bottom-auto lg:left-6 lg:right-6 lg:top-6 lg:h-px lg:w-auto"
        />
        {steps.map((step, index) => (
          <motion.li key={step.id} variants={staggerItem} className="relative flex gap-5 lg:flex-col">
            <span
              aria-hidden="true"
              className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-full border bg-background font-display text-body-lg font-semibold ${classes.step}`}
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

export default ProcessSteps;
