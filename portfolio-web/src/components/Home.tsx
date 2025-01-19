import React from 'react'
import 'boxicons/css/boxicons.min.css';
import homePhoto from '../assets/img/Image 1.png'

const Home = () => {
  return (
    <section id='#' className='bg-bg_color_1 flex justify-center items-center min-h-screen w-screen '>
      <div className='w-full text-white'>
        <h3>Hello, its me!</h3>
        <h1>Jacek Kozłowski</h1>
        <h3 className='mt-4 text-lg'>I'm <span className=''>Full-Stack</span></h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
          fuga fugit assumenda, quos accusantium excepturi quibusdam
          reprehenderit magnam voluptatum facilis asperiores sapiente dicta non
          itaque dolorum ad neque id eligendi.
        </p>
        <div>
          <a href="#"><i className='bx bxl-instagram-alt'></i></a>
          <a href="#"><i className="bx bxl-youtube"></i></a>
          <a href="#"><i className="bx bxl-discord-alt"></i></a>
          <a href="#"><i className="bx bxl-linkedin"></i></a>
          <a href="#"><i className="bx bx-coffee-togo"></i></a>
        </div>
        <a href="#contact" className='bg-main_accent inline-block py-2 px-12 rounded-full text-bg_color_2 font-extrabold hover:drop-shadow-custom-glow hover:scale-110 transition-all delay-150 ease-in-out cursor-pointer text-xl'>Get in touch</a>
      </div>
      <div className=''>
        <img src={homePhoto} alt="" />
      </div>
    </section>
  )
}

export default Home
