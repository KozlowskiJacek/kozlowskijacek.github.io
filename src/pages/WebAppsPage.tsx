import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { slideIn, revealHalf } from "../lib/animations";
import PixelAvatarWEB from "../assets/img/PixelAvatarWEB.png";
import Photo_about from "../assets/img/Photo_about.png";
import useNavigateToSection from "../hooks/useNavigateToSection";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";

const WebAppsPage = () => {
  const { t } = useTranslation();
  const navigateToSection = useNavigateToSection();

  return (
    <>

      <Section id="nav_modern" padding="hero" bg="primary" className="flex-col md:flex-row">
        <motion.div
          className="w-full md:max-w-[36rem]"
          variants={slideIn("left")}
          {...revealHalf}
        >
          <h3 className="mb-3 text-h3 text-fg-secondary">{t("web_app.title1")}</h3>
          <h3 className="text-display text-accent">
            {t("web_app.title2")}
          </h3>

          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("web_app.title_text")}</p>
        </motion.div>
        <motion.div
          className="w-full max-w-sm shrink-0 md:max-w-md"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            className="h-auto w-full"
            src={Photo_about}
            alt=""
          />
        </motion.div>
      </Section>

      <Section id="nav_discussion" bg="secondary" className="flex-col-reverse md:flex-row">
        <motion.div
          className="w-full max-w-sm shrink-0 md:max-w-md"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            src={PixelAvatarWEB}
            alt=""
            className="h-auto w-full"
          />
        </motion.div>
        <motion.div
          className="w-full md:max-w-[36rem]"
          variants={slideIn("right")}
          {...revealHalf}
        >
          <SectionHeading
            as="h3"
            className="mb-4"
            title={t("web_app.talk")}
            accent={t("web_app.analysis")}
          />
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("web_app.text3")}</p>
        </motion.div>
      </Section>

      <Section id="nav_visual" bg="primary" className="flex-col md:flex-row">
        <motion.div
          className="w-full md:max-w-[36rem]"
          variants={slideIn("left")}
          {...revealHalf}
        >
          <SectionHeading
            as="h3"
            className="mb-4"
            title={t("web_app.project")}
            accent={t("web_app.concept")}
          />

          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("web_app.text4")}</p>
        </motion.div>
        <motion.div
          className="w-full max-w-sm shrink-0 md:max-w-md"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            className="h-auto w-full"
            src={Photo_about}
            alt=""
          />
        </motion.div>
      </Section>

      <Section id="nav_development" bg="secondary" className="flex-col-reverse md:flex-row">
        <motion.div
          className="w-full max-w-sm shrink-0 md:max-w-md"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            src={PixelAvatarWEB}
            alt=""
            className="h-auto w-full"
          />
        </motion.div>
        <motion.div
          className="w-full md:max-w-[36rem]"
          variants={slideIn("right")}
          {...revealHalf}
        >
          <SectionHeading
            as="h3"
            className="mb-4"
            title={t("web_app.coding")}
            accent={t("web_app.implementation")}
          />
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("web_app.text5")}</p>
        </motion.div>
      </Section>

      <Section id="nav_presentation" bg="primary" className="flex-col md:flex-row">
        <motion.div
          className="w-full md:max-w-[36rem]"
          variants={slideIn("left")}
          {...revealHalf}
        >
          <SectionHeading
            as="h3"
            className="mb-4"
            title={t("web_app.presentation")}
            accent={t("web_app.ready")}
          />

          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("web_app.text6")}</p>
        </motion.div>
        <motion.div
          className="w-full max-w-sm shrink-0 md:max-w-md"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            className="h-auto w-full"
            src={Photo_about}
            alt=""
          />
        </motion.div>
      </Section>

      <Section id="nav_support" bg="secondary" className="flex-col-reverse md:flex-row">
        <motion.div
          className="w-full max-w-sm shrink-0 md:max-w-md"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            src={PixelAvatarWEB}
            alt=""
            className="h-auto w-full"
          />
        </motion.div>
        <motion.div
          className="w-full md:max-w-[36rem]"
          variants={slideIn("right")}
          {...revealHalf}
        >
          <SectionHeading
            as="h3"
            className="mb-4"
            title={t("web_app.support")}
            accent={t("web_app.after")}
          />
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("web_app.text7")}</p>
          <Button onClick={() => navigateToSection("contact")} size="lg" className="mt-8">
            {t("about.questions")}
          </Button>
        </motion.div>
      </Section>
    </>
  );
};

export default WebAppsPage;
