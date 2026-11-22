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

      <Section id="nav_profesional" bg="primary">
        <motion.div
          className="w-full text-white"
          variants={slideIn("left")}
          {...revealHalf}
        >
          <h3 className="text-3xl font-semibold mb-3">{t("video.title1")}</h3>
          <h3 className="text-5xl font-semibold mb-3 text-main_accent">
            {t("video.title2")}
          </h3>

          <p className="leading-7 mt-5">{t("video.text")}</p>
        </motion.div>
        <motion.div
          className="w-[75vw] m-20"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            className="max-w-[100%] max-h-[100%]"
            src={Photo_about}
            alt=""
          />
        </motion.div>
      </Section>

      <Section id="nav_ads" bg="secondary">
        <motion.div
          className="w-[75vw] m-20"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            src={PixelAvatarWEB}
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
            className="text-4xl font-bold mb-4"
            title={t("video.ads")}
            accent={t("video.films")}
          />
          <p className="leading-7 my-5 mb-5">{t("video.text1")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text1_montage")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text1_highlights")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text1_one")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text1_plan")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text1_ideal")}</p>
        </motion.div>
      </Section>

      <Section id="nav_vlogs" bg="primary">
        <motion.div
          className="w-full text-white"
          variants={slideIn("left")}
          {...revealHalf}
        >
          <SectionHeading
            as="h3"
            className="text-4xl font-bold mb-4"
            title={t("video.vlogs")}
            accent={t("video.storytelling")}
          />

          <p className="leading-7 mt-5">{t("video.text_2")}</p>
          <p className="leading-7 mt-5">{t("video.text_2_strategy")}</p>
          <p className="leading-7 mt-5">{t("video.text_2_story")}</p>
          <p className="leading-7 mt-5">{t("video.text_2_speed")}</p>
          <p className="leading-7 mt-5">{t("video.text_2_collaboration")}</p>
          <p className="leading-7 mt-5">{t("video.text_2_ideal")}</p>
        </motion.div>
        <motion.div
          className="w-[75vw] m-20"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            className="max-w-[100%] max-h-[100%]"
            src={Photo_about}
            alt=""
          />
        </motion.div>
      </Section>

      <Section id="nav_gaming" bg="secondary">
        <motion.div
          className="w-[75vw] m-20"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            src={PixelAvatarWEB}
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
            className="text-4xl font-bold mb-4"
            title={t("video.gaming")}
            accent={t("video.content")}
          />
          <p className="leading-7 my-5 mb-5">{t("video.text_3")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text_3_dynamic")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text_3_effect")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text_3_adaption")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text_3_platforms")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text_3_ideal")}</p>
        </motion.div>
      </Section>

      <Section id="nav_reels" bg="primary">
        <motion.div
          className="w-full text-white"
          variants={slideIn("left")}
          {...revealHalf}
        >
          <SectionHeading
            as="h3"
            className="text-4xl font-bold mb-4"
            title={t("video.reels")}
            accent={t("video.tiktok")}
          />

          <p className="leading-7 mt-5">{t("video.text_4")}</p>
          <p className="leading-7 mt-5">{t("video.text_4_dynamic")}</p>
          <p className="leading-7 mt-5">{t("video.text_4_creative")}</p>
          <p className="leading-7 mt-5">{t("video.text_4_sound")}</p>
          <p className="leading-7 mt-5">{t("video.text_4_cringe")}</p>
          <p className="leading-7 mt-5">{t("video.text_4_ideal")}</p>
        </motion.div>
        <motion.div
          className="w-[75vw] m-20"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            className="max-w-[100%] max-h-[100%]"
            src={Photo_about}
            alt=""
          />
        </motion.div>
      </Section>

      <Section id="nav_how" bg="secondary">
        <motion.div
          className="w-[75vw] m-20"
          variants={slideIn("bottom")}
          {...revealHalf}
        >
          <img
            src={PixelAvatarWEB}
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
            className="text-4xl font-bold mb-4"
            title={t("video.how")}
            accent={t("video.practice")}
          />
          <p className="leading-7 my-5 mb-5">{t("video.text_5_create")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text_5_style")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text_5_support")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text_5_ideal")}</p>
          <Button onClick={() => navigateToSection("contact")} className="text-2xl font-semibold">
            {t("about.questions")}
          </Button>
        </motion.div>
      </Section>
    </>
  );
};

export default VideoMarketingPage;
