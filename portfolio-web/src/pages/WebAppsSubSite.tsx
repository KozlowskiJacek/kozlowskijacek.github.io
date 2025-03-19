import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import pixelJaca from "../assets/img/Pixel Jaca - strona.png"

const WebAppsSubSite = () => {

  const {t} = useTranslation()

  return (
    <>

    <section className="bg-bg_color_1 flex justify-center items-center min-h-screen w-full pt-[100px] px-[9%] pv-[20px]">
      <motion.div className="w-full text-white"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h3 className="text-3xl font-semibold mb-3">{t("web_app.title1")}</h3>
          <h3 className="text-5xl font-semibold mb-3 text-main_accent">{t("web_app.title2")}</h3>
        
          <p className="leading-7 mt-5">{t("web_app.title_text")}</p>
        </motion.div>
        <motion.div className="w-[75vw] m-20"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <img
            className="max-w-[100%] max-h-[100%] animate-floatImage ml-20"
            src={pixelJaca}
            alt=""
          />
        </motion.div>
    </section>

    <section className='bg-bg_color_2 flex justify-center items-center min-h-screen w-full pt-[100px] px-[9%] pv-[20px]'>
      <motion.div className='w-[75vw] m-20'
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.5 }}
      >
      <img src={pixelJaca} alt="" className='max-w-[100%] max-h-[100%] animate-floatImage'/>
      </motion.div>
      <motion.div className='text-white w-full'
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.5 }}
      >
        <h3 className='text-4xl font-bold mb-4'>{t("web_app.talk")} <span className='text-main_accent'>{t("web_app.analysis")}</span></h3>
        <p className='leading-7 my-5 mb-5'>{t("web_app.text3")}</p>
      </motion.div>

      </section>

    </>
  )
}

export default WebAppsSubSite