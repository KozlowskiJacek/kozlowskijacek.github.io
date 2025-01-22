import React from 'react'

const Services = () => {
  return (
    <section className='text-white bg-bg_color_1 flex flex-col justify-center items-center min-h-screen w-full pt-[100px] px-[9%] pv-[20px]' id='services'>
      <h2 className='text-5xl font-semibold mb-40'>My <span className='text-main_accent'>Services</span></h2>

      <div className='flex justify-center items-center flex-wrap gap-8'>
        <div className='bg-bg_color_2  p-12 pb-16 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 w-[30rem]'>
          <i className='fa-solid fa-laptop-code fa-beat-fade text-main_accent'></i>
          <h3>Tworzenie stron internetowych</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            fuga a. Molestias quo et maxime neque. Ullam molestias architecto
            odit!
          </p>
          <a href="#" className=''>Learn more!</a>
        </div>

        <div className='bg-bg_color_2  p-12 pb-16 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 w-[30rem]'>
          <i className='fa-solid fa-clapperboard fa-beat-fade text-main_accent'></i>
          <h3>Montaż filmów</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            fuga a. Molestias quo et maxime neque. Ullam molestias architecto
            odit!
          </p>
          <a href="#" className=''>Learn more!</a>
        </div>

        <div className='bg-bg_color_2  p-12 pb-16 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 w-[30rem]'>
          <i className='fa-solid fa-paintbrush fa-beat-fade text-main_accent'></i>
          <h3>Obróbka zdjęć</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            fuga a. Molestias quo et maxime neque. Ullam molestias architecto
            odit!
          </p>
          <a href="#" className=''>Learn more!</a>
        </div>

      </div>
    </section>
  )
}

export default Services