import { useTranslation } from "react-i18next";
import PixelAvatarWEB_animacja from "../assets/img/Pixel_Avatar.gif";
import cat from "../assets/img/Cat 1.png";
import fullStack from "../assets/img/Pixel full stack.png";
import development from "../assets/img/Development.png";
import contentCreator from "../assets/img/Content creator img.png";
import useNavigateToSection from "../hooks/useNavigateToSection";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";
import { slideIn, revealHalf } from "../lib/animations";

const AboutPage = () => {
  const navigateToSection = useNavigateToSection();

  const { t } = useTranslation();

  return (
    <div>

      <Section id="title_hello" bg="primary" className="md:flex-row flex-col">
        <motion.div
          className="w-full text-white"
          variants={slideIn("left")}
          {...revealHalf}
        >
          <h3 className="md:text-3xl text-2xl font-semibold mb-3">
            {t("home.hello")}
          </h3>
          <h1 className="md:text-6xl text-4xl font-semibold text-main_accent">
            Jacek
          </h1>

          <p className="md:leading-7 md:text-base text-sm mt-5">
            {t("about.text")}
          </p>
        </motion.div>
        <motion.div
          className="w-[75vw] m-20"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            className="md:max-w-[100%] md:max-h-[100%] max-w-[80%] max-h-[80%] ml-10"
            src={PixelAvatarWEB_animacja}
            alt=""
          />
        </motion.div>
      </Section>

      <Section id="title_why" bg="secondary" className="md:flex-row flex-col-reverse">
        <motion.div
          className="w-[75vw] m-20"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            src={fullStack}
            alt=""
            className="md:max-w-[100%] md:max-h-[100%]"
          />
        </motion.div>
        <motion.div
          className="text-white w-full"
          variants={slideIn("right")}
          {...revealHalf}
        >
          <SectionHeading
            as="h3"
            className="md:text-4xl text-2xl font-bold mb-4"
            title={t("about.why")}
            accent={t("about.full_stack")}
          />
          <p className="md:leading-7 md:text-base text-sm my-5 mb-5">
            {t("about.text2")}
          </p>
        </motion.div>
      </Section>

      <Section id="title_how" bg="primary" className="md:flex-row flex-col">
        <motion.div
          className="w-full text-white"
          variants={slideIn("left")}
          {...revealHalf}
        >
          <SectionHeading
            as="h3"
            className="md:text-4xl text-2xl font-semibold mb-3"
            title={t("about.how")}
            accent={t("about.content_creator")}
          />

          <p className="md:leading-7 md:text-base text-sm mt-5">
            {t("about.text3")}
          </p>
        </motion.div>
        <motion.div
          className="w-[75vw] m-20"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            className="max-w-[100%] max-h-[100%]"
            src={contentCreator}
            alt=""
          />
        </motion.div>
      </Section>

      <Section id="title_what" bg="secondary" className="md:flex-row flex-col-reverse">
        <motion.div
          className="w-[75vw] m-20"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            src={development}
            alt=""
            className="max-w-[100%] max-h-[100%]"
          />
        </motion.div>
        <motion.div
          className="text-white w-full"
          variants={slideIn("right")}
          {...revealHalf}
        >
          <SectionHeading
            as="h3"
            className="md:text-4xl text-2xl font-bold mb-4"
            title={t("about.what_im")}
            accent={t("about.guided_by")}
          />
          <p className="md:leading-7  md:text-base text-sm my-5 mb-5">
            {t("about.text4")}
          </p>
        </motion.div>
      </Section>

      <Section id="title_after" bg="primary" className="md:flex-row flex-col">
        <motion.div
          className="w-full text-white"
          variants={slideIn("left")}
          {...revealHalf}
        >
          <SectionHeading
            as="h3"
            className="md:text-4xl text-2xl font-semibold mb-3"
            title={t("about.after")}
            accent={t("about.hour")}
          />

          <p className="md:leading-7 md:text-base text-sm mt-5 ">
            {t("about.text5")}
          </p>
          <Button onClick={() => navigateToSection("contact")} className="md:text-2xl text-base font-semibold">
            {t("about.questions")}
          </Button>
          <h2 className=":md:text-xl text-lg">{t("about.bye")}</h2>
        </motion.div>
        <motion.div
          className="w-[75vw] m-20"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            className="max-w-[100%] max-h-[100%]"
            src={cat}
            alt=""
          />
        </motion.div>
      </Section>
    </div>
  );
};

export default AboutPage;
