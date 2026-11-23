import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { fadeIn, reveal } from "../../lib/animations";
import { paths } from "../../data/navigation";
import Section from "../../components/ui/Section";
import Button from "../../components/ui/Button";

/** Końcowe wezwanie do kontaktu. */
const FinalCta = () => {
  const { t } = useTranslation();

  return (
    <Section id="cta" padding="compact" className="flex-col">
      <motion.div
        className="relative isolate w-full overflow-hidden rounded-3xl border border-accent/20 bg-surface-elevated px-6 py-14 text-center shadow-card sm:px-12 md:py-20"
        variants={fadeIn("bottom")}
        {...reveal}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/10 via-transparent to-transparent"
        />
        <h2 className="text-balance font-display text-h2 text-fg">
          {t("home:cta.title")} <span className="text-accent">{t("home:cta.accent")}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-body text-fg-secondary md:text-body-lg">
          {t("home:cta.text")}
        </p>
        <Button to={paths.contact} size="lg" className="mt-8">
          {t("home:cta.button")}
          <FaArrowRight aria-hidden="true" className="text-small" />
        </Button>
      </motion.div>
    </Section>
  );
};

export default FinalCta;
