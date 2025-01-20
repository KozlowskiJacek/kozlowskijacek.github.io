import React from 'react'
import 'boxicons/css/boxicons.min.css';
import homePhoto from '../assets/img/Image 1.png'

const Home = () => {
  return (
    <section id='#' className='bg-bg_color_1 flex justify-center items-center min-h-screen w-screen pt-[100px] px-[9%] pv-[20px]'>
      <div className='w-full text-white'>
        <h3 className='text-4xl font-semibold mb-6'>Hello, its me!</h3>
        <h1 className='text-6xl font-semibold'>Jacek Kozłowski</h1>
        <h3 className='mt-4 text-4xl font-semibold mb-6'>I'm <span className='text-main_accent'>Full-Stack</span></h3>
        <p className='leading-6 text-justify'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
          fuga fugit assumenda, quos accusantium excepturi quibusdam
          reprehenderit magnam voluptatum facilis asperiores sapiente dicta non
          itaque dolorum ad neque id eligendi.
        </p>
        <div className='flex space-x-4 mt-5'>
          <a href="#"><i className='bx bxl-instagram-alt text-main_accent inline-flex justify-center items-center text-3xl bg-opacity-0 border-main_accent rounded-full p-2 border-[3px] hover:animate-tada hover:bg-main_accent hover:text-bg_color_2 transition-all hover:drop-shadow-custom-glow'></i></a>
          <a href="#"><i className="bx bxl-youtube text-main_accent inline-flex justify-center items-center text-3xl bg-opacity-0 border-main_accent rounded-full p-2 border-[3px] hover:animate-tada hover:bg-main_accent hover:text-bg_color_2 transition-all hover:drop-shadow-custom-glow"></i></a>
          <a href="#"><i className="bx bxl-discord-alt text-main_accent inline-flex justify-center items-center text-3xl bg-opacity-0 border-main_accent rounded-full p-2 border-[3px] hover:animate-tada hover:bg-main_accent hover:text-bg_color_2 transition-all hover:drop-shadow-custom-glow"></i></a>
          <a href="#"><i className="bx bxl-linkedin text-main_accent inline-flex justify-center items-center text-3xl bg-opacity-0 border-main_accent rounded-full p-2 border-[3px] hover:animate-tada hover:bg-main_accent hover:text-bg_color_2 transition-all hover:drop-shadow-custom-glow"></i></a>
          <a href="#"><i className="bx bx-coffee-togo text-main_accent inline-flex justify-center items-center text-3xl bg-opacity-0 border-main_accent rounded-full p-2 border-[3px] hover:animate-tada hover:bg-main_accent hover:text-bg_color_2 transition-all hover:drop-shadow-custom-glow"></i></a>
        </div>
        <a href="#contact" className='bg-main_accent inline-block my-7 py-2 px-12 rounded-full text-bg_color_2 font-extrabold hover:drop-shadow-custom-glow hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer text-xl shadow-custom-around shadow-main_accent'>Get in touch</a>
      </div>
      <div className=''>
        <img className='max-w-[100%] max-h-[100%] animate-floatImage' src={homePhoto} alt="" />
      </div>
    </section>
  )
}

export default Home
