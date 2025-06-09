import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { FaStar } from "react-icons/fa";
import { Autoplay } from 'swiper/modules';
import { useTranslation } from "react-i18next";
import serwisGasiorek from '../assets/img/Serwis Gąsiorek Logo_20250519_093746_0000.png'
import grupaDeGie from '../assets/img/Grupa DeGie Logo_20250519_093717_0000.png'
import agataImage from "../assets/img/Agata.png"
import dawidImage from "../assets/img/Dawid.jfif"
import julkaImage from '../assets/img/Julka.png'

const ImageSlider = () => {

  const [isModalOpen, SetIsModalOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState(null)

  const { t } = useTranslation()

  const [active, setActive] = useState(null)

  const langs = [
    { name: "Serwis Gąsiorek", logo: serwisGasiorek, text: t("feedback.text1"), color: "#FF5733" },
    { name: "Dawid Ferchow", logo: dawidImage, text: t("feedback.text2"), color: "#33FF57" },
    { name: "Agata Sułkowska", logo: agataImage, text:t("feedback.text3"), color: "#5733FF" },
    { name: "Grupa DeGie", logo: grupaDeGie, text: t("feedback.text4"), color: "#FFC300" }, 
    { name: "Julia Pituła", logo: julkaImage, text: t("feedback.text5"), color: "#FF33A8" },
    // { name: "Firma 6", logo: testImage, text:"", color: "#33D1FF" }, 
    // { name: "Firma 7", logo: testImage, text:"", color: "#A833FF" },
  ]

  return (
    <div className='max-w-5xl mx-auto'>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
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
              <div className={`card ${active === i ? "card-active" : ""} `} 
                  style={{ background: `linear-gradient(to top, rgba(255,255,255,0.2), ${lang.color}90)`,
                  borderColor: lang.color
                }}
                onClick={() =>{
                  setSelectedLang(lang)
                  SetIsModalOpen(true)
                }}
              >
                  <div className='other-logos'>
                    <img src={lang.logo} alt="" className='rounded-3xl' />
                  </div>
                  <h2 className='text-3xl mt-2 font-semibold'>{lang.name}</h2>
                  <p className='para'>
                   {lang.text.length > 200 ? lang.text.slice(0, 200) + "..." : lang.text}
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

      {isModalOpen && selectedLang && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-bg_color_2 rounded-xl p-6 max-w-lg w-full relative'>
            <button
              onClick={() => SetIsModalOpen(false)}
              className='absolute -top-5 right-2 bg-main_accent inline-block my-7 py-1 px-3 rounded-full text-bg_color_2 font-extrabold hover:drop-shadow-custom-glow hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer text-xl shadow-custom-around shadow-main_accent'
            >
              X
            </button>
            <img src={selectedLang.logo} alt="{selectedLang.name}" className='h-20 mx-auto mb-4' />
            <h2 className='text-2xl font-bold text-center mb-2'>{selectedLang.name}</h2>
            <p className='text-center'>{selectedLang.text}</p>
            <div className="flex flex-row justify-center">
              <button className="btn" onClick={() => SetIsModalOpen(false)}>
                  {t("skills.close_btn")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageSlider