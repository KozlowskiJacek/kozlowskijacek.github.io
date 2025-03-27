import React from "react";
import workInProgress from "../../assets/img/test.jpg";
import { motion } from 'framer-motion'
import { useTranslation } from "react-i18next";




const Projects = () => {
  const {t} = useTranslation()
  
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
      className="text-white bg-bg_color_1 flex flex-col justify-center items-center min-h-screen w-full pt-[100px] px-[9%] pv-[20px]"
      id="skills"
    >
      <motion.h2 className="text-center text-5xl font-bold mb-20"
       variants = {fadeInVariants("top")}
       initial = "hidden"
       whileInView = "visible"
       viewport = {{ once: false}}
      >
        {t("Moje")}<span className="text-main_accent"> {t("Umiejętności")}</span>
      </motion.h2>
      <motion.div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10 mb-10"
       variants = {fadeInVariants("bottom")}
       initial = "hidden"
       whileInView = "visible"
       viewport = {{ once: false}}
      >
        <div className='bg-bg_color_2 w-[350px] h-[500px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer'>
          <i className='fa-brands fa-react text-main_accent text-6xl'></i>
          <h3 className='text-2xl font-bold mt-4'>React / JS / TS</h3>
        </div>

        <div className='bg-bg_color_2 w-[350px] h-[500px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer'>
          <i className='fa-brands fa-python text-main_accent text-6xl'></i>
          <h3 className='text-2xl font-bold mt-4'>Python</h3>
        </div>

        <div className='bg-bg_color_2 w-[350px] h-[500px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer'>
          <i className='fa-brands fa-css3-alt text-main_accent text-6xl'></i>
          <h3 className='text-2xl font-bold mt-4'>Tailwind CSS</h3>
        </div>

        <div className='bg-bg_color_2 w-[350px] h-[500px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer'>
          <i className='fa-solid fa-database text-main_accent text-6xl'></i>
          <h3 className='text-2xl font-bold mt-4'>{t("skills.database")}</h3>
        </div>

        <div className='bg-bg_color_2 w-[350px] h-[500px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer'>
          <i className='fa-solid fa-puzzle-piece text-main_accent text-6xl'></i>
          <h3 className='text-2xl font-bold mt-4'>{t("skills.creative")}</h3>
        </div>

        <div className='bg-bg_color_2 w-[350px] h-[500px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer'>
          <i className='fa-brands fa-github text-main_accent text-6xl'></i>
          <h3 className='text-2xl font-bold mt-4'>DevOps</h3>
        </div>

        
      </motion.div>
    </section>
  );
};

export default Projects;
