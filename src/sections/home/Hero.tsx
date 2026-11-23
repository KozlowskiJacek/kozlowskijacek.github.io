import { useTranslation } from "react-i18next";
import { FaArrowRight } from "react-icons/fa6";
import mainPhoto from "../../assets/img/main-photo.webp?photo";
import { enter } from "../../lib/animations";
import { paths } from "../../data/navigation";
import { showreelUrl } from "../../data/hero";
import Section from "../../components/ui/Section";
import Button from "../../components/ui/Button";
import Tag from "../../components/ui/Tag";
import HeroMedia from "./HeroMedia";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <Section id="home" padding="hero" className="flex-col md:flex-row md:justify-between" backdrop={<HeroBackdrop />}>
      <div className="w-full md:max-w-[38rem]">
        <div className={enter(0)}>
          <Tag dot="accent">{t("home:hero.badge")}</Tag>
        </div>
        <h1 className={`mt-6 text-balance font-display text-h1 text-fg ${enter(1)}`}>{t("home:hero.title")}</h1>
        <p className={`mt-6 max-w-xl text-body text-fg-secondary md:text-body-lg ${enter(2)}`}>
          {t("home:hero.subtitle")}
        </p>
        <div className={`mt-8 flex flex-wrap items-center gap-3 sm:gap-4 ${enter(3)}`}>
          <Button size="lg" to={{ hash: "services" }}>
            {t("home:hero.cta_offer")}
          </Button>
          <Button size="lg" variant="secondary" to={paths.employers}>
            {t("home:hero.cta_recruiter")}
            <FaArrowRight aria-hidden="true" className="text-small" />
          </Button>
        </div>
      </div>
      <div className={`w-full max-w-sm md:max-w-md ${enter(2)}`}>
        <HeroMedia image={mainPhoto} videoSrc={showreelUrl} />
      </div>
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
