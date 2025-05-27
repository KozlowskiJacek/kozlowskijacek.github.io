import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import pixelJaca from "../assets/img/Pixel Jaca - strona.png";
import jacaLaptop from "../assets/img/Jaca Laptop.png";
import { useLocation, useNavigate } from "react-router-dom";
import useSmoothScroll from "../hooks/useSmoothScroll";
import HeaderVideos from "../components/HeaderVideos";

const WebAppsSubSite = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const scrollTo = useSmoothScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleNavigation = () => {
    // setActiveLink("contact")
    navigate(`/`);
    setTimeout(() => scrollTo("contact"), 100);
  };
  //todo Skończyć pod strone teksty i grafiki
  return (
    <>
      <HeaderVideos />

      <section
        className="bg-bg_color_1 flex justify-center items-center min-h-screen w-full pt-[100px] px-[9%] py-[20px]"
        id="nav_profesional"
      >
        <motion.div
          className="w-full text-white"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h3 className="text-3xl font-semibold mb-3">{t("video.title1")}</h3>
          <h3 className="text-5xl font-semibold mb-3 text-main_accent">
            {t("video.title2")}
          </h3>

          <p className="leading-7 mt-5">{t("video.text")}</p>
        </motion.div>
        <motion.div
          className="w-[75vw] m-20"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <img
            className="max-w-[100%] max-h-[100%] animate-floatImage"
            src={jacaLaptop}
            alt=""
          />
        </motion.div>
      </section>

      <section
        className="bg-bg_color_2 flex justify-center items-center min-h-screen w-full pt-[100px] px-[9%] py-[20px]"
        id="nav_ads"
      >
        <motion.div
          className="w-[75vw] m-20"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <img
            src={pixelJaca}
            alt=""
            className="max-w-[100%] max-h-[100%] animate-floatImage"
          />
        </motion.div>
        <motion.div
          className="text-white w-full"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h3 className="text-4xl font-bold mb-4">
            {t("video.ads")}{" "}
            <span className="text-main_accent">{t("video.films")}</span>
          </h3>
          <p className="leading-7 my-5 mb-5">{t("video.text1")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text1_montage")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text1_highlights")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text1_one")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text1_plan")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text1_ideal")}</p>
        </motion.div>
      </section>

      <section
        className="bg-bg_color_1 flex justify-center items-center min-h-screen w-full pt-[100px] px-[9%] py-[20px]"
        id="nav_vlogs"
      >
        <motion.div
          className="w-full text-white"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h3 className="text-4xl font-bold mb-4">
            {t("video.vlogs")}{" "}
            <span className="video.storytelling">{t("web_app.concept")}</span>
          </h3>

          <p className="leading-7 mt-5">{t("video.text_2")}</p>
          <p className="leading-7 mt-5">{t("video.text_2_strategy")}</p>
          <p className="leading-7 mt-5">{t("video.text_2_story")}</p>
          <p className="leading-7 mt-5">{t("video.text_2_speed")}</p>
          <p className="leading-7 mt-5">{t("video.text_2_collaboration")}</p>
          <p className="leading-7 mt-5">{t("video.text_2_ideal")}</p>
        </motion.div>
        <motion.div
          className="w-[75vw] m-20"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <img
            className="max-w-[100%] max-h-[100%] animate-floatImage"
            src={jacaLaptop}
            alt=""
          />
        </motion.div>
      </section>

      <section
        className="bg-bg_color_2 flex justify-center items-center min-h-screen w-full pt-[100px] px-[9%] py-[20px]"
        id="nav_gaming"
      >
        <motion.div
          className="w-[75vw] m-20"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <img
            src={pixelJaca}
            alt=""
            className="max-w-[100%] max-h-[100%] animate-floatImage"
          />
        </motion.div>
        <motion.div
          className="text-white w-full"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h3 className="text-4xl font-bold mb-4">
            {t("video.gameing")}{" "}
            <span className="text-main_accent">{t("video.content")}</span>
          </h3>
          <p className="leading-7 my-5 mb-5">{t("video.text_3")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text_3_dynamic")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text_3_effect")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text_3_adaption")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text_3_platforms")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text_3_ideal")}</p>
        </motion.div>
      </section>

      <section
        className="bg-bg_color_1 flex justify-center items-center min-h-screen w-full pt-[100px] px-[9%] py-[20px]"
        id="nav_reels"
      >
        <motion.div
          className="w-full text-white"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h3 className="text-4xl font-bold mb-4">
            {t("video.reels")}{" "}
            <span className="text-main_accent">{t("video.tiktok")}</span>
          </h3>

          <p className="leading-7 mt-5">{t("video.text_4")}</p>
          <p className="leading-7 mt-5">{t("video.text_4_dynamic")}</p>
          <p className="leading-7 mt-5">{t("video.text_4_creative")}</p>
          <p className="leading-7 mt-5">{t("video.text_4_sound")}</p>
          <p className="leading-7 mt-5">{t("video.text_4_cringe")}</p>
          <p className="leading-7 mt-5">{t("video.text_4_ideal")}</p>
        </motion.div>
        <motion.div
          className="w-[75vw] m-20"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <img
            className="max-w-[100%] max-h-[100%] animate-floatImage"
            src={jacaLaptop}
            alt=""
          />
        </motion.div>
      </section>

      <section
        className="bg-bg_color_2 flex justify-center items-center min-h-screen w-full pt-[100px] px-[9%] py-[20px]"
        id="nav_how"
      >
        <motion.div
          className="w-[75vw] m-20"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <img
            src={pixelJaca}
            alt=""
            className="max-w-[100%] max-h-[100%] animate-floatImage"
          />
        </motion.div>
        <motion.div
          className="text-white w-full"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h3 className="text-4xl font-bold mb-4">
            {t("video.how")}{" "}
            <span className="text-main_accent">{t("video.practice")}</span>
          </h3>
          <p className="leading-7 my-5 mb-5">{t("video.text_5_create")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text_5_style")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text_5_support")}</p>
          <p className="leading-7 my-5 mb-5">{t("video.text_5_ideal")}</p>
          <a
            onClick={() => handleNavigation()}
            className="text-2xl font-semibold btn"
          >
            {t("about.questions")}
          </a>
        </motion.div>
      </section>
    </>
    //todo Zaktualizoać zdjęcia
  );
};

export default WebAppsSubSite;
