import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa6";
import { staggerContainer, staggerItem } from "../lib/animations";
import { paths } from "../data/navigation";
import Seo from "../components/Seo";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Section id="not-found" padding="hero" className="flex-col">
      <Seo titleKey="notFound.meta.title" noindex />
      <motion.div
        className="max-w-xl text-center"
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={staggerItem}
          aria-hidden="true"
          className="font-display text-[clamp(5rem,3rem+10vw,9rem)] font-semibold leading-none tracking-tight text-accent"
        >
          404
        </motion.p>
        <motion.h1 variants={staggerItem} className="mt-6 text-balance font-display text-h2 text-fg">
          {t("notFound.title")}
        </motion.h1>
        <motion.p variants={staggerItem} className="mt-4 text-body text-fg-secondary md:text-body-lg">
          {t("notFound.text")}
        </motion.p>
        <motion.div
          variants={staggerItem}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Button to={paths.home} size="lg">
            <FaArrowLeft aria-hidden="true" />
            {t("notFound.back_home")}
          </Button>
          <Button to={paths.contact} variant="secondary" size="lg">
            {t("notFound.contact")}
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  );
};

export default NotFoundPage;
