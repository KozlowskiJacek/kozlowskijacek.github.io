import React from 'react'
import aboutPhoto from '../assets/img/Ja i papuga.png'
const About = () => {
  return (
    <section className='bg-bg_color_2 flex justify-center items-center min-h-screen w-full pt-[100px] px-[9%] pv-[20px]' id='aubout'>
      <div className='w-[75vw] m-20'>
       <img src={aboutPhoto} alt="" className='max-w-[100%] max-h-[100%] animate-floatImage'/>
      </div>
      <div className='text-white w-full'>
        <h2 className='text-left text-5xl font-semibold mb-2'>About <span className='text-main_accent'>Me</span></h2>
        <h3 className='text-3xl font-bold mb-4'>Front developer</h3>
        <p className='text-justify leading-6 my-5 mb-5'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur
          dolorum corporis aliquam facilis nihil mollitia et consectetur quod,
          vero necessitatibus labore nesciunt. Aspernatur officiis mollitia,
          debitis quae at eaque distinctio.
        </p>
        <div className='flex justify-center gap-10'>
          <a href="#">
            <img src="https://toppng.com/uploads/preview/sample-logo-11551056375txoo49urn6.png" alt="" className='w-20 h-auto cursor-pointer rounded hover:scale-110 transition-all duration-500 ease-in-out hover:drop-shadow-custom-glow'/>
          </a>

          <a href="#">
            <img src="https://toppng.com/uploads/preview/sample-logo-11551056375txoo49urn6.png" alt="" className='w-20 h-auto cursor-pointer rounded hover:scale-110 transition-all duration-500 ease-in-out hover:drop-shadow-custom-glow'/>
          </a>
        </div>
      </div>

    </section>
  )
}

export default About