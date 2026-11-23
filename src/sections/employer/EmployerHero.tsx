import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaDownload, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import mainPhoto from "../../assets/img/MainPhoto.png";
import { staggerContainer, staggerItem } from "../../lib/animations";
import { career, availabilityLabelKeys, workModeLabelKeys, type Availability } from "../../data/career";
import { contactTopicPath } from "../../data/services/contact";
import { cvFiles, cvLanguages } from "../../data/cv";
import Section from "../../components/ui/Section";
import Button from "../../components/ui/Button";
import Tag from "../../components/ui/Tag";

const availabilityDot: Record<Availability, "accent" | "video" | "muted"> = {
  open: "accent",
  "freelance-only": "video",
  closed: "muted",
};

const hasCv = cvLanguages.some((lang) => cvFiles[lang]);

/** Nagłówek CV: zdjęcie, imię, headline, dostępność i główne akcje. */
const EmployerHero = () => {
  const { t } = useTranslation();

  return (
    <Section
      id="employer"
      padding="page"
      className="flex-col-reverse md:flex-row md:items-center md:justify-between"
    >
      <motion.div
        className="w-full md:max-w-[40rem]"
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={staggerItem}
          className="mb-4 text-small font-semibold uppercase tracking-wider text-accent"
        >
          {t("navbar.employers")}
        </motion.p>
        <motion.h1 variants={staggerItem} className="font-display text-h1 text-fg">
          {career.name}
        </motion.h1>
        <motion.p
          variants={staggerItem}
          className="mt-4 text-balance text-body-lg text-fg-secondary"
        >
          {t(career.headlineKey)}
        </motion.p>

        <motion.div variants={staggerItem} className="mt-6 flex flex-wrap items-center gap-2">
          <Tag dot={availabilityDot[career.availability]} className="font-medium text-fg">
            {t(availabilityLabelKeys[career.availability])}
          </Tag>
          <ul aria-label={t("employer.hero.work_modes")} className="flex flex-wrap gap-2">
            {career.workModes.map((mode) => (
              <li key={mode}>
                <Tag>{t(workModeLabelKeys[mode])}</Tag>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={staggerItem} className="mt-8 flex flex-wrap gap-3">
          {cvLanguages.map((lang) => {
            const href = cvFiles[lang];
            return (
              href && (
                <Button key={lang} href={href} download>
                  <FaDownload aria-hidden="true" />
                  {t("employer.hero.download_cv", { lang: lang.toUpperCase() })}
                </Button>
              )
            );
          })}
          <Button
            variant="secondary"
            href={career.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin aria-hidden="true" />
            LinkedIn
          </Button>
          <Button
            variant="secondary"
            href={career.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub aria-hidden="true" />
            GitHub
          </Button>
          <Button to={contactTopicPath("praca")} variant={hasCv ? "secondary" : "primary"}>
            <FaEnvelope aria-hidden="true" />
            {t("employer.hero.contact")}
          </Button>
        </motion.div>
      </motion.div>

      <motion.img
        src={mainPhoto}
        alt={t("employer.hero.photo_alt")}
        width={320}
        height={320}
        className="aspect-square w-48 shrink-0 rounded-full border border-border-strong bg-surface-elevated object-cover shadow-lift md:w-72"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
    </Section>
  );
};

export default EmployerHero;
