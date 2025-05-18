import React from "react";
import workInProgress from "../../assets/img/test.jpg";
import pythonCode from "../../assets/img/python code.jpg";
import pythonCode1 from "../../assets/img/python code 1.jpg";
import aureliaHR from "../../assets/img/AureliaHR.jpg";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Projects = () => {
  const { t } = useTranslation();

  const fadeInVariants = (direction: "top" | "bottom" | "left" | "right") => {
    return {
      hidden: {
        opacity: 0,
        y: direction === "top" ? -80 : direction === "bottom" ? 80 : 0,
        x: direction === "left" ? -80 : direction === "right" ? 80 : 0,
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration: 2,
          opacity: { duration: 2, delay: 0.6 },
          delay: 0.2,
          ease: [0.9, 0, 0.2, 1],
        },
      },
    };
  };

  return (
    <section
      className="text-white bg-bg_color_2 flex flex-col justify-center items-center min-h-screen w-full pt-[100px] px-[9%] py-[20px]"
      id="projects"
    >
      <motion.h2
        className="text-center text-5xl font-bold mb-10"
        variants={fadeInVariants("top")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        {t("projects.my")}
        <span className="text-main_accent"> {t("projects.projects")}</span>
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 items-center gap-10 mb-10"
        variants={fadeInVariants("bottom")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <div className="relative rounded-2xl shadow-[0_0_1rem_bg_color_1] overflow-hidden flex group cursor-pointer">
          <img
            className="w-full transition duration-500 ease-in-out transform group-hover:scale-110"
            src={pythonCode}
            alt=""
          />
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-main_accent flex flex-col justify-center items-center text-center px-16 translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
            <h4 className="text-3xl font-bold">GPSMaker</h4>
            <p className="mx-0 mb-2 mt-3 text-bold">{t("projects.gpsmaker")}</p>
            <a
              href="https://github.com/JacekKoz/Projects-Python/tree/main/Python/GPSMaker"
              target="_blank"
              className="inline-flex justify-center items-center w-10 h-10 bg-white rounded-full"
            >
              <i className="bx bx-link text-gray_600 text-lg"></i>
            </a>
          </div>
        </div>

        <div className="relative rounded-2xl shadow-[0_0_1rem_bg_color_1] overflow-hidden flex group cursor-pointer">
          <img
            className="w-full transition duration-500 ease-in-out transform group-hover:scale-110"
            src={pythonCode1}
            alt=""
          />
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-main_accent flex flex-col justify-center items-center text-center px-16 translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
            <h4 className="text-3xl font-bold">Web scraping</h4>
            <p className="mx-0 mb-2 mt-3 text-bold">
              {t("projects.webscraping")}
            </p>
            <a
              href="https://github.com/JacekKoz/Projects-Python/tree/main/Python/Web%20scraping"
              target="_blank"
              className="inline-flex justify-center items-center w-10 h-10 bg-white rounded-full"
            >
              <i className="bx bx-link text-gray_600 text-lg"></i>
            </a>
          </div>
        </div>

        <div className="relative rounded-2xl shadow-[0_0_1rem_bg_color_1] overflow-hidden flex group cursor-pointer">
          <img
            className="w-full transition duration-500 ease-in-out transform group-hover:scale-110"
            src={aureliaHR}
            alt=""
          />
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-main_accent flex flex-col justify-center items-center text-center px-16 translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
            <h4 className="text-3xl font-bold">AureliaHR</h4>
            <p className="mx-0 mb-2 mt-3">{t("projects.aureliahr")}</p>
            <a
              href="https://github.com/JacekKoz/AureliaHR"
              className="inline-flex justify-center items-center w-10 h-10 bg-white rounded-full"
            >
              <i className="bx bx-link text-gray_600 text-lg"></i>
            </a>
          </div>
        </div>

        <div className="relative rounded-2xl shadow-[0_0_1rem_bg_color_1] overflow-hidden flex group cursor-pointer">
          <img
            className="w-full transition duration-500 ease-in-out transform group-hover:scale-110"
            src={workInProgress}
            alt=""
          />
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-main_accent flex flex-col justify-center items-center text-center px-16 translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
            <h4 className="text-3xl font-bold">Cooking</h4>
            <p className="mx-0 mb-2 mt-3 text-bold">{t("projects.cooking")}</p>
            <a
              href="#"
              className="inline-flex justify-center items-center w-10 h-10 bg-white rounded-full"
            >
              <i className="bx bx-link text-gray_600 text-lg"></i>
            </a>
          </div>
        </div>

        <div className="relative rounded-2xl shadow-[0_0_1rem_bg_color_1] overflow-hidden flex group cursor-pointer">
          <img
            className="w-full transition duration-500 ease-in-out transform group-hover:scale-110"
            src={workInProgress}
            alt=""
          />
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-main_accent flex flex-col justify-center items-center text-center px-16 translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
            <h4 className="text-3xl font-bold">Cooking</h4>
            <p className="mx-0 mb-2 mt-3 text-bold">{t("projects.cooking")}</p>
            <a
              href="#"
              className="inline-flex justify-center items-center w-10 h-10 bg-white rounded-full"
            >
              <i className="bx bx-link text-gray_600 text-lg"></i>
            </a>
          </div>
        </div>

        <div className="relative rounded-2xl shadow-[0_0_1rem_bg_color_1] overflow-hidden flex group cursor-pointer">
          <img
            className="w-full transition duration-500 ease-in-out transform group-hover:scale-110"
            src={workInProgress}
            alt=""
          />
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-main_accent flex flex-col justify-center items-center text-center px-16 translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
            <h4 className="text-3xl font-bold">Cooking</h4>
            <p className="mx-0 mb-2 mt-3 text-bold">{t("projects.cooking")}</p>
            <a
              href="#"
              className="inline-flex justify-center items-center w-10 h-10 bg-white rounded-full"
            >
              <i className="bx bx-link text-gray_600 text-lg"></i>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
