import React, { useState } from "react";
import { motion } from 'framer-motion'
import { useTranslation } from "react-i18next";
import Modal from "../../components/Modal";




const Projects = () => {
  const [openReact, setOpenReact] = React.useState(false)
  const [openPython, setOpenPython] = React.useState(false)

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
 
  //todo Stworzyć poupa po kliknięciu w kafelek żeby rozwinąć opis co dokładnie umiem
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
        <div>
          <button className='bg-bg_color_2 w-[350px] h-[500px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer' onClick={() => setOpenReact(true)}>
            <i className='fa-brands fa-react text-main_accent text-6xl'></i>
            <h3 className='text-2xl font-bold mt-4'>React / JS / TS</h3>
          </button>
          <Modal open={openReact} onClose={() => setOpenReact(false)}>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">Super title</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, vero corrupti saepe cum iure eveniet cupiditate tempore officia dignissimos dolorum.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, optio aliquid, ab minima debitis quis voluptates dignissimos corporis, reprehenderit animi iste eveniet amet. Rem officia iusto, ex excepturi molestias ducimus alias quia, quis nihil quod reprehenderit repellat labore veritatis! Repellat.
              </p>
              <hr className="border-t-solid border-1 border-white"/>
              <div className="flex flex-row justify-center">
                <button className="btn" onClick={() => setOpenReact(false)}>
                  Close
                </button>
              </div>
            </div>
          </Modal>
        </div>

        <div>
          <button className='bg-bg_color_2 w-[350px] h-[500px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer' onClick={() => setOpenPython(true)}>
            <i className='fa-brands fa-python text-main_accent text-6xl'></i>
            <h3 className='text-2xl font-bold mt-4'>Python</h3>
          </button>
          <Modal open={openPython} onClose={() => setOpenPython(false)}>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">Zjadł bym steka</h1>
              <p>
               Wcale tutaj nie chce lorem bo chce sprawdzić czy wgl to zadziałą :P
              </p>
              <p>
                A ja tutaj napisze coś innego la la la la 
              </p>
              <hr className="border-t-solid border-1 border-white"/>
              <div className="flex flex-row justify-center">
                <button className="btn" onClick={() => setOpenPython(false)}>
                  Close
                </button>
              </div>
            </div>
          </Modal>
        </div>

        <button className='bg-bg_color_2 w-[350px] h-[500px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer'>
          <i className='fa-brands fa-css3-alt text-main_accent text-6xl'></i>
          <h3 className='text-2xl font-bold mt-4'>Tailwind CSS</h3>
        </button>

        <button className='bg-bg_color_2 w-[350px] h-[500px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer'>
          <i className='fa-solid fa-database text-main_accent text-6xl'></i>
          <h3 className='text-2xl font-bold mt-4'>{t("skills.database")}</h3>
        </button>

        <button className='bg-bg_color_2 w-[350px] h-[500px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer'>
          <i className='fa-solid fa-puzzle-piece text-main_accent text-6xl'></i>
          <h3 className='text-2xl font-bold mt-4'>{t("skills.creative")}</h3>
        </button>

        <button className='bg-bg_color_2 w-[350px] h-[500px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer'>
          <i className='fa-brands fa-github text-main_accent text-6xl'></i>
          <h3 className='text-2xl font-bold mt-4'>DevOps</h3>
        </button>

        
      </motion.div>
    </section>
  );
};

export default Projects;
