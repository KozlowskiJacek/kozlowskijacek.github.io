import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { FaStar } from "react-icons/fa";
import { Autoplay } from 'swiper/modules';
import { useTranslation } from "react-i18next";
import { testimonials, type Testimonial } from '../data/testimonials';

const STARS = 5;
const PREVIEW_LENGTH = 200;

const ImageSlider = () => {

  const [selected, setSelected] = useState<Testimonial | null>(null)
  const [active, setActive] = useState<number | null>(null)

  const { t } = useTranslation()

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
        {testimonials.map((testimonial, i) => {
          const text = t(testimonial.textKey)

          return (
            <SwiperSlide key={testimonial.id}>
              <div className='h-96 flex justify-center'>
                <div className={`card ${active === i ? "card-active" : ""} `}
                  style={{ background: `linear-gradient(to top, rgba(255,255,255,0.2), ${testimonial.color}90)`,
                    borderColor: testimonial.color
                  }}
                  onClick={() => setSelected(testimonial)}
                >
                  <div className='other-logos'>
                    <img src={testimonial.logo} alt="" className='rounded-3xl' />
                  </div>
                  <h2 className='text-3xl mt-2 font-semibold'>{testimonial.name}</h2>
                  <p className='para'>
                    {text.length > PREVIEW_LENGTH ? text.slice(0, PREVIEW_LENGTH) + "..." : text}
                  </p>
                  <div className='relative flex justify-center p-4'>
                    <div className='stars flex item-center space-x-1  h-12 rounded-full'>
                      <p className='text-xl pb-1'>{STARS}/{STARS}</p>
                      {Array.from({ length: STARS }, (_, star) => (
                        <FaStar key={star} className='text-accent_color_yellow w-5 h-5'/>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {selected && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-bg_color_2 rounded-xl p-6 max-w-lg w-full relative'>
            <button
              onClick={() => setSelected(null)}
              className='absolute -top-5 right-2 bg-main_accent inline-block my-7 py-1 px-3 rounded-full text-bg_color_2 font-extrabold hover:drop-shadow-custom-glow hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer text-xl shadow-custom-around shadow-main_accent'
            >
              X
            </button>
            <img src={selected.logo} alt={selected.name} className='h-20 mx-auto mb-4' />
            <h2 className='text-2xl font-bold text-center mb-2'>{selected.name}</h2>
            <p className='text-center'>{t(selected.textKey)}</p>
            <div className="flex flex-row justify-center">
              <button className="btn" onClick={() => setSelected(null)}>
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
