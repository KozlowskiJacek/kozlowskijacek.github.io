import React from 'react'
import workInProgress from '../assets/img/test.jpg'

const Projects = () => {
  return (
    <section className='text-white bg-bg_color_2 flex flex-col justify-center items-center min-h-screen w-full pt-[100px] px-[9%] pv-[20px]' id='projects'>
      <h2 className='text-center text-5xl font-bold'>My <span className='text-main_accent'>Project</span></h2>
    
      <div className='grid grid-cols-1 md:grid-cols-3 items-center gap-5'>

        <div className='relative border'>
          <img className='w-[100%] transition-all duration-500 ease hover:scale-105' src={workInProgress} alt="" />
          <div className='absolute bottom-0 left-0 w-[100%] h-[100%] bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-main_accent flex justify-center items-center flex-col text-center px-16 translate-y-[100%] transition-all duration-500 ease translate-y-[0%]'>
            <h4>Web Design</h4>
            <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatum, eaque.
            </p>
            <a href="#"><i className='bx bx-link'></i></a>
          </div>
        </div>

        <div className=''>
          <img src={workInProgress} alt="" />
          <div>
            <h4>Web Design</h4>
            <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatum, eaque.
            </p>
            <a href="#"><i className='bx bx-link'></i></a>
          </div>
        </div>

        <div className=''>
          <img src={workInProgress} alt="" />
          <div>
            <h4>Web Design</h4>
            <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatum, eaque.
            </p>
            <a href="#"><i className='bx bx-link'></i></a>
          </div>
        </div>

        <div className=''>
          <img src={workInProgress} alt="" />
          <div>
            <h4>Web Design</h4>
            <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatum, eaque.
            </p>
            <a href="#"><i className='bx bx-link'></i></a>
          </div>
        </div>

        <div className=''>
          <img src={workInProgress} alt="" />
          <div>
            <h4>Web Design</h4>
            <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatum, eaque.
            </p>
            <a href="#"><i className='bx bx-link'></i></a>
          </div>
        </div>

        <div className=''>
          <img src={workInProgress} alt="" />
          <div>
            <h4>Web Design</h4>
            <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatum, eaque.
            </p>
            <a href="#"><i className='bx bx-link'></i></a>
          </div>
        </div>

      </div>

    </section>
  )
}

export default Projects