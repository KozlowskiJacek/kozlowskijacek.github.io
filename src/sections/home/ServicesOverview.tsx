import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheck } from "react-icons/fa6";
import { fadeIn, reveal, staggerContainer, staggerItem } from "../../lib/animations";
import { servicePillars, type ServicePillar } from "../../data/services";
import Section from "../../components/ui/Section";
import SectionHeading from "../../components/ui/SectionHeading";
import Card from "../../components/ui/Card";

/** Klasy zależne od filaru — pełne nazwy, żeby Tailwind je wykrył. */
const toneClasses: Record<ServicePillar["tone"], { icon: string; check: string; link: string; card: string }> = {
  video: {
    icon: "border-video/25 bg-video/10 text-video",
    check: "text-video",
    link: "text-video hover:text-video-hover",
    card: "hover:border-video/40",
  },
  accent: {
    icon: "border-accent/25 bg-accent/10 text-accent",
    check: "text-accent",
    link: "text-accent hover:text-accent-hover",
    card: "hover:border-accent/40",
  },
};

/** Dwa filary oferty: kreacja wideo oraz strony i aplikacje. */
const ServicesOverview = () => {
  const { t } = useTranslation();

  return (
    <Section id="services" className="flex-col">
      <motion.div className="max-w-2xl text-center" variants={fadeIn("bottom")} {...reveal}>
        <SectionHeading
          align="center"
          title={t("home:services.title")}
          accent={t("home:services.accent")}
        />
        <p className="mt-4 text-body text-fg-secondary md:text-body-lg">{t("home:services.text")}</p>
      </motion.div>

      <motion.ul
        className="grid w-full gap-6 md:grid-cols-2"
        variants={staggerContainer(0.1)}
        {...reveal}
      >
        {servicePillars.map((pillar) => {
          const tone = toneClasses[pillar.tone];
          const Icon = pillar.icon;

          return (
            <motion.li key={pillar.id} variants={staggerItem}>
              <Card
                as="article"
                className={`relative flex h-full flex-col p-6 transition-colors duration-300 sm:p-8 ${tone.card}`}
              >
                <span
                  aria-hidden="true"
                  className={`grid h-14 w-14 place-items-center rounded-xl border text-2xl ${tone.icon}`}
                >
                  <Icon />
                </span>
                <h3 className="mt-6 font-display text-h3 text-fg">{t(pillar.titleKey)}</h3>
                <p className="mt-3 text-body text-fg-secondary">{t(pillar.descriptionKey)}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {pillar.points.map((point) => (
                    <li key={point.id} className="flex items-center gap-3 text-body text-fg">
                      <FaCheck aria-hidden="true" className={`shrink-0 text-small ${tone.check}`} />
                      {t(point.labelKey)}
                    </li>
                  ))}
                </ul>
                <Link
                  to={pillar.to}
                  className={`mt-8 inline-flex items-center gap-2 self-start rounded-sm font-semibold transition-colors after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${tone.link}`}
                >
                  {t("home:services.more")}
                  <span className="sr-only">: {t(pillar.titleKey)}</span>
                  <FaArrowRight aria-hidden="true" className="text-small" />
                </Link>
              </Card>
            </motion.li>
          );
        })}
      </motion.ul>
    </Section>
  );
};

export default ServicesOverview;
