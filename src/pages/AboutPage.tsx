import { useTranslation } from "react-i18next";
import PixelAvatarWEB_animacja from "../assets/img/Pixel_Avatar.gif";
import cat from "../assets/img/cat-1.webp?photo";
import fullStack from "../assets/img/pixel-full-stack.webp?pixel";
import development from "../assets/img/development.webp?photo";
import contentCreator from "../assets/img/content-creator-img.webp?photo";
import { paths } from "../data/navigation";
import Seo from "../components/Seo";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Img from "../components/ui/Img";
import { motion } from "framer-motion";
import { slideIn, revealHalf } from "../lib/animations";

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Seo titleKey="career:about.meta.title" descriptionKey="career:about.meta.description" type="profile" />

      <Section id="title_hello" padding="hero" bg="primary" className="flex-col md:flex-row">
        <motion.div className="w-full md:max-w-[36rem]" variants={slideIn("left")} {...revealHalf}>
          <p className="mb-3 font-display text-h3 text-fg-secondary">{t("home:hello")}</p>
          <h1 className="text-display text-accent">Jacek</h1>

          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("career:about.text")}</p>
        </motion.div>
        <motion.div className="w-full max-w-sm shrink-0 md:max-w-md" variants={slideIn("bottom")} {...revealHalf}>
          {/* Animowany GIF (pixel art) — nad zgięciem, więc bez lazy loadingu. */}
          <img
            className="h-auto w-full [image-rendering:pixelated]"
            src={PixelAvatarWEB_animacja}
            width={520}
            height={568}
            alt=""
            decoding="async"
          />
        </motion.div>
      </Section>

      <Section id="title_why" bg="secondary" className="flex-col-reverse md:flex-row">
        <motion.div className="w-full max-w-sm shrink-0 md:max-w-md" variants={slideIn("bottom")} {...revealHalf}>
          <Img
            picture={fullStack}
            alt=""
            sizes="(min-width: 768px) 28rem, 24rem"
            className="h-auto w-full [image-rendering:pixelated]"
          />
        </motion.div>
        <motion.div className="w-full md:max-w-[36rem]" variants={slideIn("right")} {...revealHalf}>
          <SectionHeading
            as="h2"
            className="mb-4"
            title={t("career:about.why")}
            accent={t("career:about.full_stack")}
          />
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("career:about.text2")}</p>
        </motion.div>
      </Section>

      <Section id="title_how" bg="primary" className="flex-col md:flex-row">
        <motion.div className="w-full md:max-w-[36rem]" variants={slideIn("left")} {...revealHalf}>
          <SectionHeading
            as="h2"
            className="mb-4"
            title={t("career:about.how")}
            accent={t("career:about.content_creator")}
          />

          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("career:about.text3")}</p>
        </motion.div>
        <motion.div className="w-full max-w-sm shrink-0 md:max-w-md" variants={slideIn("bottom")} {...revealHalf}>
          <Img picture={contentCreator} alt="" sizes="(min-width: 768px) 28rem, 24rem" className="h-auto w-full" />
        </motion.div>
      </Section>

      <Section id="title_what" bg="secondary" className="flex-col-reverse md:flex-row">
        <motion.div className="w-full max-w-sm shrink-0 md:max-w-md" variants={slideIn("bottom")} {...revealHalf}>
          <Img picture={development} alt="" sizes="(min-width: 768px) 28rem, 24rem" className="h-auto w-full" />
        </motion.div>
        <motion.div className="w-full md:max-w-[36rem]" variants={slideIn("right")} {...revealHalf}>
          <SectionHeading
            as="h2"
            className="mb-4"
            title={t("career:about.what_im")}
            accent={t("career:about.guided_by")}
          />
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("career:about.text4")}</p>
        </motion.div>
      </Section>

      <Section id="title_after" bg="primary" className="flex-col md:flex-row">
        <motion.div className="w-full md:max-w-[36rem]" variants={slideIn("left")} {...revealHalf}>
          <SectionHeading as="h2" className="mb-4" title={t("career:about.after")} accent={t("career:about.hour")} />

          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("career:about.text5")}</p>
          <Button to={paths.contact} size="lg" className="mt-8">
            {t("career:about.questions")}
          </Button>
          <p className="mt-8 font-display text-h3 text-fg-secondary">{t("career:about.bye")}</p>
        </motion.div>
        <motion.div className="w-full max-w-sm shrink-0 md:max-w-md" variants={slideIn("bottom")} {...revealHalf}>
          <Img picture={cat} alt="" sizes="(min-width: 768px) 28rem, 24rem" className="h-auto w-full" />
        </motion.div>
      </Section>
    </div>
  );
};

export default AboutPage;
