import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { slideIn, revealHalf } from "../lib/animations";
import PixelAvatarWEB from "../assets/img/PixelAvatarWEB.png";
import Photo_about from "../assets/img/Photo_about.png";
import useNavigateToSection from "../hooks/useNavigateToSection";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";

const VideoMarketingPage = () => {
  const { t } = useTranslation();
  const navigateToSection = useNavigateToSection();
  return (
    <>

      <Section id="nav_profesional" padding="hero" bg="primary" className="flex-col md:flex-row">
        <motion.div
          className="w-full md:max-w-[36rem]"
          variants={slideIn("left")}
          {...revealHalf}
        >
          <h3 className="mb-3 text-h3 text-fg-secondary">{t("video.title1")}</h3>
          <h3 className="text-display text-video">
            {t("video.title2")}
          </h3>

          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text")}</p>
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

      <Section id="nav_ads" bg="secondary" className="flex-col-reverse md:flex-row">
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
            className="mb-4" tone="video"
            title={t("video.ads")}
            accent={t("video.films")}
          />
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text1")}</p>
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text1_montage")}</p>
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text1_highlights")}</p>
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text1_one")}</p>
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text1_plan")}</p>
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text1_ideal")}</p>
        </motion.div>
      </Section>

      <Section id="nav_vlogs" bg="primary" className="flex-col md:flex-row">
        <motion.div
          className="w-full md:max-w-[36rem]"
          variants={slideIn("left")}
          {...revealHalf}
        >
          <SectionHeading
            as="h3"
            className="mb-4" tone="video"
            title={t("video.vlogs")}
            accent={t("video.storytelling")}
          />

          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text_2")}</p>
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text_2_strategy")}</p>
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text_2_story")}</p>
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text_2_speed")}</p>
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text_2_collaboration")}</p>
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text_2_ideal")}</p>
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

      <Section id="nav_gaming" bg="secondary" className="flex-col-reverse md:flex-row">
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
            className="mb-4" tone="video"
            title={t("video.gaming")}
            accent={t("video.content")}
          />
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text_3")}</p>
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text_3_dynamic")}</p>
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text_3_effect")}</p>
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text_3_adaption")}</p>
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text_3_platforms")}</p>
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text_3_ideal")}</p>
        </motion.div>
      </Section>

      <Section id="nav_reels" bg="primary" className="flex-col md:flex-row">
        <motion.div
          className="w-full md:max-w-[36rem]"
          variants={slideIn("left")}
          {...revealHalf}
        >
          <SectionHeading
            as="h3"
            className="mb-4" tone="video"
            title={t("video.reels")}
            accent={t("video.tiktok")}
          />

          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text_4")}</p>
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text_4_dynamic")}</p>
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text_4_creative")}</p>
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text_4_sound")}</p>
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text_4_cringe")}</p>
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text_4_ideal")}</p>
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

      <Section id="nav_how" bg="secondary" className="flex-col-reverse md:flex-row">
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
            className="mb-4" tone="video"
            title={t("video.how")}
            accent={t("video.practice")}
          />
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text_5_create")}</p>
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text_5_style")}</p>
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text_5_support")}</p>
          <p className="mt-5 text-body text-fg-secondary md:text-body-lg">{t("video.text_5_ideal")}</p>
          <Button onClick={() => navigateToSection("contact")} size="lg" className="mt-8">
            {t("about.questions")}
          </Button>
        </motion.div>
      </Section>
    </>
  );
};

export default VideoMarketingPage;
