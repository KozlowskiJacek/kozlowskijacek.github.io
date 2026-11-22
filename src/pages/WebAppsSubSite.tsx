import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { slideIn, revealHalf } from "../lib/animations";
import PixelAvatarWEB from "../assets/img/PixelAvatarWEB.png";
import Photo_about from "../assets/img/Photo_about.png";
import useNavigateToSection from "../hooks/useNavigateToSection";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";

const WebAppsSubSite = () => {
  const { t } = useTranslation();
  // const location = useLocation();
  const navigateToSection = useNavigateToSection();

  return (
    <>

      <Section id="nav_modern" bg="primary">
        <motion.div
          className="w-full text-white"
          variants={slideIn("left")}
          {...revealHalf}
        >
          <h3 className="text-3xl font-semibold mb-3">{t("web_app.title1")}</h3>
          <h3 className="text-5xl font-semibold mb-3 text-main_accent">
            {t("web_app.title2")}
          </h3>

          <p className="leading-7 mt-5">{t("web_app.title_text")}</p>
        </motion.div>
        <motion.div
          className="w-[75vw] m-20"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            className="max-w-[100%] max-h-[100%] animate-floatImage"
            src={Photo_about}
            alt=""
          />
        </motion.div>
      </Section>

      <Section id="nav_discussion" bg="secondary">
        <motion.div
          className="w-[75vw] m-20"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            src={PixelAvatarWEB}
            alt=""
            className="max-w-[100%] max-h-[100%] animate-floatImage"
          />
        </motion.div>
        <motion.div
          className="text-white w-full"
          variants={slideIn("right")}
          {...revealHalf}
        >
          <SectionHeading
            as="h3"
            className="text-4xl font-bold mb-4"
            title={t("web_app.talk")}
            accent={t("web_app.analysis")}
          />
          <p className="leading-7 my-5 mb-5">{t("web_app.text3")}</p>
        </motion.div>
      </Section>

      <Section id="nav_visual" bg="primary">
        <motion.div
          className="w-full text-white"
          variants={slideIn("left")}
          {...revealHalf}
        >
          <SectionHeading
            as="h3"
            className="text-4xl font-bold mb-4"
            title={t("web_app.project")}
            accent={t("web_app.concept")}
          />

          <p className="leading-7 mt-5">{t("web_app.text4")}</p>
        </motion.div>
        <motion.div
          className="w-[75vw] m-20"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            className="max-w-[100%] max-h-[100%] animate-floatImage"
            src={Photo_about}
            alt=""
          />
        </motion.div>
      </Section>

      <Section id="nav_development" bg="secondary">
        <motion.div
          className="w-[75vw] m-20"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            src={PixelAvatarWEB}
            alt=""
            className="max-w-[100%] max-h-[100%] animate-floatImage"
          />
        </motion.div>
        <motion.div
          className="text-white w-full"
          variants={slideIn("right")}
          {...revealHalf}
        >
          <SectionHeading
            as="h3"
            className="text-4xl font-bold mb-4"
            title={t("web_app.coding")}
            accent={t("web_app.implementation")}
          />
          <p className="leading-7 my-5 mb-5">{t("web_app.text5")}</p>
        </motion.div>
      </Section>

      <Section id="nav_presentation" bg="primary">
        <motion.div
          className="w-full text-white"
          variants={slideIn("left")}
          {...revealHalf}
        >
          <SectionHeading
            as="h3"
            className="text-4xl font-bold mb-4"
            title={t("web_app.presentation")}
            accent={t("web_app.ready")}
          />

          <p className="leading-7 mt-5">{t("web_app.text6")}</p>
        </motion.div>
        <motion.div
          className="w-[75vw] m-20"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            className="max-w-[100%] max-h-[100%] animate-floatImage"
            src={Photo_about}
            alt=""
          />
        </motion.div>
      </Section>

      <Section id="nav_support" bg="secondary">
        <motion.div
          className="w-[75vw] m-20"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            src={PixelAvatarWEB}
            alt=""
            className="max-w-[100%] max-h-[100%] animate-floatImage"
          />
        </motion.div>
        <motion.div
          className="text-white w-full"
          variants={slideIn("right")}
          {...revealHalf}
        >
          <SectionHeading
            as="h3"
            className="text-4xl font-bold mb-4"
            title={t("web_app.support")}
            accent={t("web_app.after")}
          />
          <p className="leading-7 my-5 mb-5">{t("web_app.text7")}</p>
          <Button onClick={() => navigateToSection("contact")} className="text-2xl font-semibold">
            {t("about.questions")}
          </Button>
        </motion.div>
      </Section>
    </>
    //todo Zaktualizoać zdjęcia
  );
};

export default WebAppsSubSite;
