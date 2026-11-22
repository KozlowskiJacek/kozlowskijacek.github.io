import { useTranslation } from "react-i18next";
import PixelAvatarWEB_animacja from "../assets/img/Pixel_Avatar.gif";
import cat from "../assets/img/Cat 1.png";
import fullStack from "../assets/img/Pixel full stack.png";
import development from "../assets/img/Development.png";
import contentCreator from "../assets/img/Content creator img.png";
import { paths } from "../data/navigation";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";
import { slideIn, revealHalf } from "../lib/animations";

const AboutPage = () => {

  const { t } = useTranslation();

  return (
    <div>

      <Section id="title_hello" padding="hero" bg="primary" className="md:flex-row flex-col">
        <motion.div
          className="w-full md:max-w-[36rem]"
          variants={slideIn("left")}
          {...revealHalf}
        >
          <h3 className="mb-3 text-h3 text-fg-secondary">
            {t("home.hello")}
          </h3>
          <h1 className="text-display text-accent">
            Jacek
          </h1>

          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">
            {t("about.text")}
          </p>
        </motion.div>
        <motion.div
          className="w-full max-w-sm shrink-0 md:max-w-md"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            className="h-auto w-full"
            src={PixelAvatarWEB_animacja}
            alt=""
          />
        </motion.div>
      </Section>

      <Section id="title_why" bg="secondary" className="md:flex-row flex-col-reverse">
        <motion.div
          className="w-full max-w-sm shrink-0 md:max-w-md"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            src={fullStack}
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
            title={t("about.why")}
            accent={t("about.full_stack")}
          />
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">
            {t("about.text2")}
          </p>
        </motion.div>
      </Section>

      <Section id="title_how" bg="primary" className="md:flex-row flex-col">
        <motion.div
          className="w-full md:max-w-[36rem]"
          variants={slideIn("left")}
          {...revealHalf}
        >
          <SectionHeading
            as="h3"
            className="mb-4"
            title={t("about.how")}
            accent={t("about.content_creator")}
          />

          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">
            {t("about.text3")}
          </p>
        </motion.div>
        <motion.div
          className="w-full max-w-sm shrink-0 md:max-w-md"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            className="h-auto w-full"
            src={contentCreator}
            alt=""
          />
        </motion.div>
      </Section>

      <Section id="title_what" bg="secondary" className="md:flex-row flex-col-reverse">
        <motion.div
          className="w-full max-w-sm shrink-0 md:max-w-md"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            src={development}
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
            title={t("about.what_im")}
            accent={t("about.guided_by")}
          />
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">
            {t("about.text4")}
          </p>
        </motion.div>
      </Section>

      <Section id="title_after" bg="primary" className="md:flex-row flex-col">
        <motion.div
          className="w-full md:max-w-[36rem]"
          variants={slideIn("left")}
          {...revealHalf}
        >
          <SectionHeading
            as="h3"
            className="mb-4"
            title={t("about.after")}
            accent={t("about.hour")}
          />

          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">
            {t("about.text5")}
          </p>
          <Button to={paths.contact} size="lg" className="mt-8">
            {t("about.questions")}
          </Button>
          <h2 className="mt-8 text-h3 text-fg-secondary">{t("about.bye")}</h2>
        </motion.div>
        <motion.div
          className="w-full max-w-sm shrink-0 md:max-w-md"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            className="h-auto w-full"
            src={cat}
            alt=""
          />
        </motion.div>
      </Section>
    </div>
  );
};

export default AboutPage;
