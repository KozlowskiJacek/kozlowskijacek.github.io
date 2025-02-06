import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import testImage from '../assets/img/test.jpg'
import { FaStar } from "react-icons/fa";
import { Autoplay } from 'swiper/modules';

const ImageSlider = () => {

  const [active, setActive] = useState(null)

  const langs = [
    {name: "Firma 1", logo: testImage, color: "hue-rotate-[240deg]" },
    {name: "Firma 2", logo: testImage, color: "hue-rotate-[20deg]" },
    {name: "Firma 3", logo: testImage, color: "hue-rotate-[340deg]" },
    {name: "Firma 4", logo: testImage, color: "hue-rotate-[58deg]" },
    {name: "Firma 5", logo: testImage, color: "hue-rotate-[225deg]" },
    {name: "Firma 6", logo: testImage, color: "hue-rotate-[168deg]" },
    {name: "Firma 7", logo: testImage, color: "hue-rotate-[0deg]" },
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
              <div className={`card ${active === i && "card-active"} bg-gradient-to-t from-white/20 to-[#ff0000]/60 ${lang.color} `}>
                  <div className='other-logos'>
                    <img src={lang.logo} alt="" />
                  </div>
                  <h2 className='text-3xl mt-2 font-semibold'>{lang.name}</h2>
                  <p className='para'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati dolorem veniam adipisci veritatis! Nisi nihil, quasi ipsa facilis blanditiis non molestias odit maiores aut dicta. Quidem possimus aut ratione repellat?
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