import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import homePhoto from "../assets/img/Image 1.png"
import { useLocation, useNavigate } from 'react-router-dom'
import useSmoothScroll from '../hooks/useSmoothScroll'

const AboutSubSite = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const scrollTo = useSmoothScroll()

  const { t } = useTranslation()

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  //todo Spraweidzć czy wszystko działa i zmeinić grafiki na nowe postarać się o zrobioenie grafik pixelart sprawdzić czy lepiej dać animacje czy porpostu pixel art 
  //todo Pomyśleć czy zrobić mój avatar jako pixel art czy jakies przedmioty

  const handleNavigation = () => {
    // setActiveLink("contact")
    navigate(`/`)
    setTimeout(() => scrollTo("contact"), 100)
  }

  return (
    <div id='about'>
    
      <section
        className="bg-bg_color_1 flex justify-center items-center min-h-screen w-full pt-[100px] px-[9%] pv-[20px]">
        <div className="w-full text-white">
          <h3 className="text-3xl font-semibold mb-3">{t("home.hello")}</h3>
          <h1 className="text-6xl font-semibold text-main_accent">Jacek</h1>
        
          <p className="leading-7 mt-5">{t("about.text")}</p>
        </div>
        <div className="w-[75vw] m-20">
          <img
            className="max-w-[100%] max-h-[100%] animate-floatImage"
            src={homePhoto}
            alt=""
          />
        </div>
        
      </section>

      <section className='bg-bg_color_2 flex justify-center items-center min-h-screen w-full pt-[100px] px-[9%] pv-[20px]'>
      <div className='w-[75vw] m-20'>
      <img src={homePhoto} alt="" className='max-w-[100%] max-h-[100%] animate-floatImage'/>
      </div>
      <div className='text-white w-full'>
        <h3 className='text-4xl font-bold mb-4'>{t("about.why")} <span className='text-main_accent'>{t("about.full_stack")}</span></h3>
        <p className='leading-7 my-5 mb-5'>{t("about.text2")}</p>
      </div>

      </section>

      <section
        className="bg-bg_color_1 flex justify-center items-center min-h-screen w-full pt-[100px] px-[9%] pv-[20px]">
        <div className="w-full text-white">
          <h3 className="text-4xl font-semibold mb-3">{t("about.how")} <span className='text-main_accent'>{t("about.content_creator")}</span></h3>
        
          <p className="leading-7 mt-5">{t("about.text3")}</p>
        </div>
        <div className="w-[75vw] m-20">
          <img
            className="max-w-[100%] max-h-[100%] animate-floatImage"
            src={homePhoto}
            alt=""
          />
        </div>
        
      </section>

      <section className='bg-bg_color_2 flex justify-center items-center min-h-screen w-full pt-[100px] px-[9%] pv-[20px]'>
      <div className='w-[75vw] m-20'>
      <img src={homePhoto} alt="" className='max-w-[100%] max-h-[100%] animate-floatImage'/>
      </div>
      <div className='text-white w-full'>
        <h3 className='text-4xl font-bold mb-4'>{t("about.what_im")} <span className='text-main_accent'>{t("about.guided_by")}</span></h3>
        <p className='leading-7 my-5 mb-5'>{t("about.text4")}</p>
      </div>

      </section>

      <section
        className="bg-bg_color_1 flex justify-center items-center min-h-screen w-full pt-[100px] px-[9%] pv-[20px]">
        <div className="w-full text-white">
          <h3 className="text-4xl font-semibold mb-3">{t("about.after")} <span className='text-main_accent'>{t("about.hour")}</span></h3>
        
          <p className="leading-7 mt-5 ">{t("about.text5")}</p>
          <a onClick={() => handleNavigation()} className='text-2xl font-semibold btn'>{t("about.questions")}</a>
          <h2 className='text-xl'>{t("about.bye")}</h2>
        </div>
        <div className="w-[75vw] m-20">
          <img
            className="max-w-[100%] max-h-[100%] animate-floatImage"
            src={homePhoto}
            alt=""
          />
        </div>
        
      </section>

    </div>
  )
}

export default AboutSubSite