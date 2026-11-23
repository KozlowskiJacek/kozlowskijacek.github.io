import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { reveal, staggerContainer, staggerItem } from "../../lib/animations";
import { clientLogos } from "../../data/testimonials";
import { stats } from "../../data/stats";
import Section from "../../components/ui/Section";
import Img from "../../components/ui/Img";

/** Pasek zaufania pod hero: logotypy klientów + kilka liczb. */
const TrustBar = () => {
  const { t } = useTranslation();

  return (
    <Section
      id="trust"
      bg="secondary"
      padding="compact"
      aria-label={t("home:trust.label")}
      className="flex-col gap-10 lg:flex-row lg:justify-between md:gap-12"
    >
      <motion.div
        className="flex w-full flex-col items-center gap-5 lg:w-auto lg:items-start"
        variants={staggerContainer(0.08)}
        {...reveal}
      >
        <motion.p
          variants={staggerItem}
          className="text-small font-semibold uppercase tracking-wider text-fg-muted"
        >
          {t("home:trust.title")}
        </motion.p>
        <ul className="flex flex-wrap items-center justify-center gap-4">
          {clientLogos.map((client) => (
            <motion.li key={client.id} variants={staggerItem}>
              {/* Logotypy mają białe tło i szeroki margines — mix-blend-multiply wtapia je w jasny kafel, scale przycina margines. */}
              <div className="group grid h-24 w-24 place-items-center overflow-hidden rounded-xl bg-fg opacity-70 transition-opacity duration-300 hover:opacity-100">
                <Img
                  picture={client.image}
                  alt={client.name}
                  title={client.name}
                  sizes="6rem"
                  className="h-full w-full scale-[1.3] object-contain mix-blend-multiply grayscale transition-[filter] duration-300 group-hover:grayscale-0"
                />
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.dl
        className="grid w-full grid-cols-3 gap-4 sm:gap-8 lg:w-auto"
        variants={staggerContainer(0.08, 0.15)}
        {...reveal}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            variants={staggerItem}
            className="flex flex-col-reverse items-center gap-1 text-center lg:items-start lg:text-left"
          >
            <dt className="text-small text-fg-secondary">{t(stat.labelKey)}</dt>
            <dd className="font-display text-h2 text-fg">{stat.value}</dd>
          </motion.div>
        ))}
      </motion.dl>
    </Section>
  );
};

export default TrustBar;
