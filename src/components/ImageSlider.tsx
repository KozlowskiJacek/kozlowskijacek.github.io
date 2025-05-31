import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import testImage from '../assets/img/test.jpg'
import { FaStar } from "react-icons/fa";
import { Autoplay } from 'swiper/modules';
import { useTranslation } from "react-i18next";
import serwisGasiorek from '../assets/img/Serwis Gąsiorek Logo_20250519_093746_0000.png'
import grupaDeGie from '../assets/img/Grupa DeGie Logo_20250519_093717_0000.png'

const ImageSlider = () => {

  const { t } = useTranslation()

  const [active, setActive] = useState(null)

  const langs = [
    { name: "Serwis Gąsiorek", logo: serwisGasiorek, text: t("feedback.text1"), color: "#FF5733" },
    { name: "Dawid Ferchow", logo: testImage, text: t("feedback.text2"), color: "#33FF57" },
    // { name: "Firma 3", logo: testImage, text:"", color: "#5733FF" },
    { name: "Grupa DeGie", logo: grupaDeGie, text: t("feedback.text4"), color: "#FFC300" }, 
    // { name: "Firma 5", logo: testImage, text:"", color: "#FF33A8" },
    // { name: "Firma 6", logo: testImage, text:"", color: "#33D1FF" }, 
    // { name: "Firma 7", logo: testImage, text:"", color: "#A833FF" },
  ]

  return (
    <div className='max-w-5xl mx-auto'>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(cur) => setActive(cur.realIndex)}
        loop={true}
        centeredSlides={true}
        speed={800}
        autoplay={{ delay: 5000 }}
        modules={[Autoplay]}
      >

        {
          langs.map((lang, i) => (
            <SwiperSlide key={i}>
              <div className='h-96 flex justify-center'>
              <div className={`h-[1000px] card ${active === i ? "card-active" : ""} border-[${lang.color}]`} 
                  style={{ background: `linear-gradient(to top, rgba(255,255,255,0.2), ${lang.color}90)`,
                  borderColor: lang.color
                }}
              >
                  <div className='other-logos'>
                    <img src={lang.logo} alt="" />
                  </div>
                  <h2 className='text-3xl mt-2 font-semibold'>{lang.name}</h2>
                  <p className='para'>
                   {lang.text}
                  </p>
                  <div className='relative flex justify-center p-4'>
                    <div className='stars flex item-center space-x-1  h-12 rounded-full'>
                      <p className='text-xl pb-1'>5/5</p>
                      <FaStar className='text-accent_color_yellow w-5 h-5'/>
                      <FaStar className='text-accent_color_yellow w-5 h-5'/>
                      <FaStar className='text-accent_color_yellow w-5 h-5'/>
                      <FaStar className='text-accent_color_yellow w-5 h-5'/>
                      <FaStar className='text-accent_color_yellow w-5 h-5'/>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default ImageSlider