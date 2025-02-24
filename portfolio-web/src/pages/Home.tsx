import React, { useEffect, useState } from 'react'
import 'boxicons/css/boxicons.min.css';
import homePhoto from '../assets/img/Image 1.png'
import useSmoothScroll from '../hooks/useSmoothScroll';
import { Trans, useTranslation } from 'react-i18next';

const Home = () => {

  const { t } = useTranslation()

  const roles = ["Full Stack Developer", "YouTuber", "Video Editor", "Content Creator", "Marketing Specialist"]

  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharindex] = useState(0)
  const [pause, setPause] = useState(false)

  const typingSpeed = 150
  const deletingSpeed = 50
  const pauseDuration = 2000

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < roles[index].length) {
        setText((prev) => prev + roles[index][charIndex])
        setCharindex((prev) => prev + 1)
      } else if (!isDeleting && charIndex === roles[index].length) {
          setPause(true)
          setTimeout(() => {
            setIsDeleting(true)
            setPause(false)
        }, pauseDuration)
      } else if (isDeleting && charIndex > 0) {
          setText((prev) => prev.slice(0, -1))
          setCharindex((prev) => prev -1)
      } else if (isDeleting && charIndex === 0) {
          setIsDeleting(false)
          setIndex((prev) => (prev + 1) % roles.length)
        }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return() => clearTimeout(timeout)
  }, [charIndex, isDeleting, pause])

  const scrollTo = useSmoothScroll()

  return (
    <section className='bg-bg_color_1 flex justify-center items-center min-h-screen w-full pt-[100px] px-[9%] pv-[20px]' id='home'>
      <div className='w-full text-white'>
        <h3 className='text-3xl font-semibold mb-3'>{t("home.hello")}</h3>
        <h1 className='text-6xl font-semibold'>Jacek Kozłowski</h1>
        <h3 className='mt-4 text-3xl font-semibold mb-5'>{t("home.im")} <span className='text-main_accent'>{text}</span><span className='animate-blink'>|</span></h3>
        <p className='leading-6 text-justify '>
          {/* {t("home.text")} */}
          <Trans i18nKey="home.text" components={{ br: <br /> }}/>
        </p>
        <div className='flex space-x-4 mt-5'>
          <a href="#"><i className='bx bxl-instagram-alt text-main_accent inline-flex justify-center items-center text-3xl bg-opacity-0 border-main_accent rounded-full p-2 border-[3px] hover:animate-tada hover:bg-main_accent hover:text-bg_color_2 transition-all hover:drop-shadow-custom-glow'></i></a>
          <a href="#"><i className="bx bxl-youtube text-main_accent inline-flex justify-center items-center text-3xl bg-opacity-0 border-main_accent rounded-full p-2 border-[3px] hover:animate-tada hover:bg-main_accent hover:text-bg_color_2 transition-all hover:drop-shadow-custom-glow"></i></a>
          <a href="#"><i className="bx bxl-discord-alt text-main_accent inline-flex justify-center items-center text-3xl bg-opacity-0 border-main_accent rounded-full p-2 border-[3px] hover:animate-tada hover:bg-main_accent hover:text-bg_color_2 transition-all hover:drop-shadow-custom-glow"></i></a>
          <a href="#"><i className="bx bxl-linkedin text-main_accent inline-flex justify-center items-center text-3xl bg-opacity-0 border-main_accent rounded-full p-2 border-[3px] hover:animate-tada hover:bg-main_accent hover:text-bg_color_2 transition-all hover:drop-shadow-custom-glow"></i></a>
          <a href="#"><i className="bx bx-coffee-togo text-main_accent inline-flex justify-center items-center text-3xl bg-opacity-0 border-main_accent rounded-full p-2 border-[3px] hover:animate-tada hover:bg-main_accent hover:text-bg_color_2 transition-all hover:drop-shadow-custom-glow"></i></a>
        </div>
        <a onClick={() => scrollTo("contact")} className='bg-main_accent inline-block my-7 py-2 px-12 rounded-full text-bg_color_2 font-extrabold hover:drop-shadow-custom-glow hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer text-xl shadow-custom-around shadow-main_accent'>Get in touch</a>
      </div>
      <div className='w-[75vw] m-20'>
        <img className='max-w-[100%] max-h-[100%] animate-floatImage' src={homePhoto} alt="" />
      </div>
    </section>
  )
}

export default Home
