import React from 'react'
import aboutPhoto from '../../assets/img/Jaca Laptop.png'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

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


const About = () => {

  const { t } = useTranslation()

  return (
    <section 
    className='bg-bg_color_2 flex md:flex-row flex-col-reverse justify-center items-center min-h-screen w-full pt-[100px] px-[9%] py-[20px]' 
    id='about'
    >
      <motion.div className='w-[75vw] m-10'
        variants = {fadeInVariants("bottom")}
        initial = "hidden"
        whileInView = "visible"
        viewport = {{ once: false}}
      >
       <img src={aboutPhoto} alt="" className='max-w-[100%] max-h-[100%] animate-floatImage'/>
      </motion.div>
      <motion.div className='text-white w-full'
        variants = {fadeInVariants("right")}
        initial = "hidden"
        whileInView = "visible"
        viewport = {{ once: false}}
      >
        <motion.h2 className='text-left md:text-5xl text-3xl font-semibold mb-2'
          variants = {fadeInVariants("top")}
          initial = "hidden"
          whileInView = "visible"
          viewport = {{ once: false}}
        >
          {t("about.about")}<span className='text-main_accent'> {t("about.me")}</span>
        </motion.h2>
        <h3 className='md:text-3xl text-xl font-bold mb-4'>{t("about.title")}</h3>
        <p className='md:leading-7 md:text-base text-sm my-5 md:mb-5 mb-1'>{t("about.text")} 
          <Link to="/about" className='cursor-pointer text-main_accent hover:drop-shadow-custom-glow transition-all'> {t("about.see_more")}</Link>
        </p>
      </motion.div>

    </section>
  )
}

export default About