import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import testImage from '../assets/img/test.jpg'
import { FaStar } from "react-icons/fa";
import { Autoplay } from 'swiper/modules';

const ImageSlider = () => {

  const [active, setActive] = useState(null)

  const langs = [
    { name: "Firma 1", logo: testImage, text:'"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati dolorem veniam adipisci veritatis! Nisi nihil, quasi ipsa facilis blanditiis non molestias odit maiores aut dicta. Quidem possimus aut ratione repellat."', color: "#FF5733" },
    { name: "Firma 2", logo: testImage, color: "#33FF57" },
    { name: "Firma 3", logo: testImage, color: "#5733FF" },
    { name: "Firma 4", logo: testImage, color: "#FFC300" }, 
    { name: "Firma 5", logo: testImage, color: "#FF33A8" },
    { name: "Firma 6", logo: testImage, color: "#33D1FF" }, 
    { name: "Firma 7", logo: testImage, color: "#A833FF" },
  ]

  return (
    <div className='max-w-5xl'>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={(cur) => setActive(cur.realIndex)}
        loop={true}
        centeredSlides={true}
        speed={800}
        autoplay={{
          delay: 3000,
        }}
        modules={[Autoplay]}
      >

        {
          langs.map((lang, i) => (
            <SwiperSlide key={i}>
              <div className='h-96 flex'>
              <div className={`card ${active === i ? "card-active" : ""} border-[${lang.color}]`} 
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