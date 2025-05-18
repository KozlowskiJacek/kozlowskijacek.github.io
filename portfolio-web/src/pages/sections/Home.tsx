import React, { useEffect, useState } from "react";
import "boxicons/css/boxicons.min.css";
import homePhoto from "../../assets/img/Image 1.png";
import useSmoothScroll from "../../hooks/useSmoothScroll";
import { useTranslation } from "react-i18next";
import { motion } from 'framer-motion'

const Home = () => {
  const { t } = useTranslation();

  const roles = [
    "Full Stack Developer",
    "YouTuber",
    "Video Editor",
    "Content Creator",
    "Marketing Specialist",
  ];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharindex] = useState(0);
  const [pause, setPause] = useState(false);

  const typingSpeed = 150;
  const deletingSpeed = 50;
  const pauseDuration = 2000;

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!isDeleting && charIndex < roles[index].length) {
          setText((prev) => prev + roles[index][charIndex]);
          setCharindex((prev) => prev + 1);
        } else if (!isDeleting && charIndex === roles[index].length) {
          setPause(true);
          setTimeout(() => {
            setIsDeleting(true);
            setPause(false);
          }, pauseDuration);
        } else if (isDeleting && charIndex > 0) {
          setText((prev) => prev.slice(0, -1));
          setCharindex((prev) => prev - 1);
        } else if (isDeleting && charIndex === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % roles.length);
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, pause]);

  const scrollTo = useSmoothScroll();

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
          opacity: { duration: 2, delay: 0.6},
          delay: 0.2,
          ease: [0.9, 0, 0.2, 1]
        }
      }
    } 
  }

  return (
    <section
      className="bg-bg_color_1 flex md:flex-row flex-col justify-center items-center min-h-screen w-full pt-[100px] px-[9%] py-[20px]"
      id="home"
    >
      <motion.div className="w-full text-white"
       variants = {fadeInVariants("top")}
       initial = "hidden"
       whileInView = "visible"
       viewport = {{ once: false}}
      >
        <h3 className="md:text-3xl text-2xl font-semibold mb-3">{t("home.hello")}</h3>
        <motion.h1 className="md:text-6xl text-4xl font-semibold"
          variants = {fadeInVariants("left")}
          initial = "hidden"
          whileInView = "visible"
          viewport = {{ once: false}}
        >Jacek Kozłowski</motion.h1>
        <h3 className="mt-4 md:text-3xl text-2xl font-semibold mb-5">
          {t("home.im")} <span className="text-main_accent">{text}</span>
          <span className="animate-blink">|</span>
        </h3>
        <motion.p className="md:leading-7 md:text-base text-sm"
        variants = {fadeInVariants("right")}
        initial = "hidden"
        whileInView = "visible"
        viewport = {{ once: false}}
        >{t("home.text")}</motion.p>
        <div className="flex space-x-4 mt-5 md:text-3xl text-2xl">
          <a href="https://www.instagram.com/life_of_jaca/" target="_blank">
            <i className="bx bxl-instagram-alt text-main_accent inline-flex justify-center items-center  bg-opacity-0 border-main_accent rounded-full p-2 border-[3px] hover:animate-tada hover:bg-main_accent hover:text-bg_color_2 transition-all hover:drop-shadow-custom-glow"></i>
          </a>
          <a href="#">
            <i className="bx bxl-youtube text-main_accent inline-flex justify-center items-center bg-opacity-0 border-main_accent rounded-full p-2 border-[3px] hover:animate-tada hover:bg-main_accent hover:text-bg_color_2 transition-all hover:drop-shadow-custom-glow"></i>
          </a>
          <a href="#">
            <i className="bx bxl-discord-alt text-main_accent inline-flex justify-center items-center bg-opacity-0 border-main_accent rounded-full p-2 border-[3px] hover:animate-tada hover:bg-main_accent hover:text-bg_color_2 transition-all hover:drop-shadow-custom-glow"></i>
          </a>
          <a href="https://www.linkedin.com/in/jacek-kozłowski-a43b21265/" target="_blank">
            <i className="bx bxl-linkedin text-main_accent inline-flex justify-center items-center bg-opacity-0 border-main_accent rounded-full p-2 border-[3px] hover:animate-tada hover:bg-main_accent hover:text-bg_color_2 transition-all hover:drop-shadow-custom-glow"></i>
          </a>
          <a href="#">
            <i className="bx bx-coffee-togo text-main_accent inline-flex justify-center items-center bg-opacity-0 border-main_accent rounded-full p-2 border-[3px] hover:animate-tada hover:bg-main_accent hover:text-bg_color_2 transition-all hover:drop-shadow-custom-glow"></i>
          </a>
        </div>
        <a
          onClick={() => scrollTo("contact")}
          className="btn"
        >
          {t("home.btn_get_in_touch")}
        </a>
      </motion.div>
      <motion.div className="w-[75vw] "
              variants = {fadeInVariants("bottom")}
              initial = "hidden"
              whileInView = "visible"
              viewport = {{ once: false}}
      >
        <img
          className="max-w-[100%] max-h-[100%] animate-floatImage"
          src={homePhoto}
          alt=""
        />
      </motion.div>
    </section>
  );
};

export default Home;
