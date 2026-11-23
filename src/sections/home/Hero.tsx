import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import mainPhoto from "../../assets/img/main-photo.webp?photo";
import { fadeIn, staggerContainer, staggerItem } from "../../lib/animations";
import { paths } from "../../data/navigation";
import { showreelUrl } from "../../data/hero";
import Section from "../../components/ui/Section";
import Button from "../../components/ui/Button";
import Tag from "../../components/ui/Tag";
import HeroMedia from "./HeroMedia";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <Section
      id="home"
      padding="hero"
      className="flex-col md:flex-row md:justify-between"
      backdrop={<HeroBackdrop />}
    >
      <motion.div
        className="w-full md:max-w-[38rem]"
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={staggerItem}>
          <Tag dot="accent">{t("home:hero.badge")}</Tag>
        </motion.div>
        <motion.h1
          variants={staggerItem}
          className="mt-6 text-balance font-display text-h1 text-fg"
        >
          {t("home:hero.title")}
        </motion.h1>
        <motion.p
          variants={staggerItem}
          className="mt-6 max-w-xl text-body text-fg-secondary md:text-body-lg"
        >
          {t("home:hero.subtitle")}
        </motion.p>
        <motion.div variants={staggerItem} className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
          <Button size="lg" to={{ hash: "services" }}>
            {t("home:hero.cta_offer")}
          </Button>
          <Button size="lg" variant="secondary" to={paths.employers}>
            {t("home:hero.cta_recruiter")}
            <FaArrowRight aria-hidden="true" className="text-small" />
          </Button>
        </motion.div>
      </motion.div>
      <motion.div
        className="w-full max-w-sm md:max-w-md"
        variants={fadeIn("bottom", 0.15)}
        initial="hidden"
        animate="visible"
      >
        <HeroMedia image={mainPhoto} videoSrc={showreelUrl} />
      </motion.div>
    </Section>
  );
};

/** Delikatna poświata i siatka punktów pod hero. */
const HeroBackdrop = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
    <div className="absolute -top-48 left-1/2 h-[36rem] w-[56rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-3xl" />
    <div className="absolute -right-40 bottom-0 h-[24rem] w-[32rem] rounded-full bg-video/[0.05] blur-3xl" />
    <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.05)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
  </div>
);

export default Hero;
