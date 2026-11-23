import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../lib/animations";
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
      <motion.div
        className="w-full max-w-3xl text-center"
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate="visible"
      >
        {eyebrow && (
          <motion.p
            variants={staggerItem}
            className="mb-4 text-small font-semibold uppercase tracking-wider text-accent"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1 variants={staggerItem} className="text-balance font-display text-h1 text-fg">
          {title}
        </motion.h1>
        <motion.p
          variants={staggerItem}
          className="mx-auto mt-5 max-w-2xl text-body text-fg-secondary md:text-body-lg"
        >
          {text}
        </motion.p>
        <motion.div
          variants={staggerItem}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Button to={paths.contact} size="lg">
            {t("common:cta")}
          </Button>
          {children}
        </motion.div>
      </motion.div>
    </Section>
  );
};

export default PageIntro;
