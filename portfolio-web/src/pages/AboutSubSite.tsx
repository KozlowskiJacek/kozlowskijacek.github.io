import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import homePhoto from "../assets/img/Image 1.png";
import pixelJaca from "../assets/img/Pixel Jaca - strona.png";
import pixelJaca_animacja from "../assets/img/Pixel_Jaca_strona_animacja.gif";
import cat from "../assets/img/Cat 1.png";
import fullStack from "../assets/img/Pixel full stack.png";
import development from "../assets/img/Development.png";
import contentCreator from "../assets/img/Content creator img.png";
import { useLocation, useNavigate } from "react-router-dom";
import useSmoothScroll from "../hooks/useSmoothScroll";
import { motion } from "framer-motion";
import HeaderAbout from "../components/HeaderAbout";

const AboutSubSite = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollTo = useSmoothScroll();

  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleNavigation = () => {
    // setActiveLink("contact")
    navigate(`/`);
    setTimeout(() => scrollTo("contact"), 100);
  };

  return (
    <div className="select-none">
      <HeaderAbout />

      <section
        className="bg-bg_color_1 flex md:flex-row flex-col justify-center items-center min-h-screen w-full pt-[100px] px-[9%] py-[20px]"
        id="title_hello"
      >
        <motion.div
          className="w-full text-white"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h3 className="md:text-3xl text-2xl font-semibold mb-3">{t("home.hello")}</h3>
          <h1 className="md:text-6xl text-4xl font-semibold text-main_accent">Jacek</h1>

          <p className="md:leading-7 md:text-base text-sm mt-5">{t("about.text")}</p>
        </motion.div>
        <motion.div
          className="w-[75vw] m-20"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <img
            className="md:max-w-[100%] md:max-h-[100%] max-w-[80%] max-h-[80%] ml-16 animate-floatImage"
            src={pixelJaca_animacja}
            alt=""
          />
        </motion.div>
      </section>

      <section
        className="bg-bg_color_2 flex md:flex-row flex-col-reverse justify-center items-center min-h-screen w-full pt-[100px] px-[9%] py-[20px]"
        id="title_why"
      >
        <motion.div
          className="w-[75vw] m-20"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <img
            src={fullStack}
            alt=""
            className="md:max-w-[100%] md:max-h-[100%] animate-floatImage"
          />
        </motion.div>
        <motion.div
          className="text-white w-full"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h3 className="md:text-4xl text-2xl font-bold mb-4">
            {t("about.why")}{" "}
            <span className="text-main_accent">{t("about.full_stack")}</span>
          </h3>
          <p className="md:leading-7 md:text-base text-sm my-5 mb-5">{t("about.text2")}</p>
        </motion.div>
      </section>

      <section
        className="bg-bg_color_1 flex md:flex-row flex-col justify-center items-center min-h-screen w-full pt-[100px] px-[9%] py-[20px]"
        id="title_how"
      >
        <motion.div
          className="w-full text-white"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h3 className="md:text-4xl text-2xl font-semibold mb-3">
            {t("about.how")}{" "}
            <span className="text-main_accent">
              {t("about.content_creator")}
            </span>
          </h3>

          <p className="md:leading-7 md:text-base text-sm mt-5">{t("about.text3")}</p>
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
            src={contentCreator}
            alt=""
          />
        </motion.div>
      </section>

      <section
        className="bg-bg_color_2 flex md-flex-row flex-col-reverse justify-center items-center min-h-screen w-full pt-[100px] px-[9%] py-[20px]"
        id="title_what"
      >
        <motion.div
          className="w-[75vw] m-20"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <img
            src={development}
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
          <h3 className="md:text-4xl text-2xl font-bold mb-4">
            {t("about.what_im")}{" "}
            <span className="text-main_accent">{t("about.guided_by")}</span>
          </h3>
          <p className="md:leading-7  md:text-base text-sm my-5 mb-5">{t("about.text4")}</p>
        </motion.div>
      </section>

      <section
        className="bg-bg_color_1 flex md:flex-row flex-col justify-center items-center min-h-screen w-full pt-[100px] px-[9%] py-[20px]"
        id="title_after"
      >
        <motion.div
          className="w-full text-white"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h3 className="md:text-4xl text-2xl font-semibold mb-3">
            {t("about.after")}{" "}
            <span className="text-main_accent">{t("about.hour")}</span>
          </h3>

          <p className="md:leading-7 md:text-base text-sm mt-5 ">{t("about.text5")}</p>
          <a
            onClick={() => handleNavigation()}
            className="text-2xl font-semibold btn"
          >
            {t("about.questions")}
          </a>
          <h2 className="text-xl">{t("about.bye")}</h2>
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
            src={cat}
            alt=""
          />
        </motion.div>
      </section>
    </div>
  );
};

export default AboutSubSite;
