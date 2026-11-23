import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaArrowRight, FaDownload } from "react-icons/fa6";
import { fadeIn, reveal, staggerContainer, staggerItem } from "../../lib/animations";
import { paths } from "../../data/navigation";
import { mainStack } from "../../data/stack";
import { cvUrlFor } from "../../data/cv";
import Section from "../../components/ui/Section";
import SectionHeading from "../../components/ui/SectionHeading";
import Button from "../../components/ui/Button";

/** Krótki teaser profilu dla pracodawców: opis, główny stack, profil i CV. */
const RecruiterTeaser = () => {
  const { t, i18n } = useTranslation();
  const cvUrl = cvUrlFor(i18n.resolvedLanguage ?? "pl");

  return (
    <Section id="recruiters" className="flex-col lg:flex-row lg:items-center lg:justify-between">
      <motion.div className="w-full lg:max-w-md" variants={fadeIn("bottom")} {...reveal}>
        <p className="mb-4 text-small font-semibold uppercase tracking-wider text-accent">
          {t("home:recruiter.eyebrow")}
        </p>
        <SectionHeading title={t("home:recruiter.title")} accent={t("home:recruiter.accent")} />
        <p className="mt-4 text-body text-fg-secondary md:text-body-lg">{t("home:recruiter.text")}</p>
        <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
          <Button to={paths.employers} size="lg">
            {t("home:recruiter.profile")}
            <FaArrowRight aria-hidden="true" className="text-small" />
          </Button>
          {cvUrl && (
            <Button href={cvUrl} download variant="secondary" size="lg">
              <FaDownload aria-hidden="true" className="text-small" />
              {t("home:recruiter.cv")}
            </Button>
          )}
        </div>
      </motion.div>

      <motion.ul
        aria-label={t("home:recruiter.stack_label")}
        className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:max-w-xl"
        variants={staggerContainer(0.04)}
        {...reveal}
      >
        {mainStack.map((item) => {
          const Icon = item.icon;
          return (
            <motion.li
              key={item.id}
              variants={staggerItem}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface-elevated px-4 py-3 text-small font-medium text-fg"
            >
              <Icon aria-hidden="true" className="shrink-0 text-lg text-fg-secondary" />
              {item.label}
            </motion.li>
          );
        })}
      </motion.ul>
    </Section>
  );
};

export default RecruiterTeaser;
