import React from 'react'

const Services = () => {
  return (
    <section className='text-white bg-bg_color_1 flex flex-col justify-center items-center min-h-screen w-full pt-[100px] px-[9%] pv-[20px]' id='services'>
      <h2 className='text-5xl font-semibold mb-36'>My <span className='text-main_accent'>Services</span></h2>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-bg_color_2 w-[350px] md:w-[400px] h-[300px] mx-auto p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105'>
          <i className='fa-solid fa-laptop-code fa-beat-fade text-main_accent text-6xl'></i>
          <h3 className='text-2xl font-bold mt-4'>Tworzenie stron internetowych</h3>
          <p className='mt-2 text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, fuga a.
            Molestias quo et maxime neque. Ullam molestias architecto odit!
          </p>
          <a href="#" className='bg-main_accent inline-block mt-4 py-2 px-8 rounded-full text-bg_color_2 font-extrabold hover:drop-shadow-custom-glow hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer text-lg shadow-custom-around shadow-main_accent'>Learn more!</a>
        </div>

        <div className='bg-bg_color_2 w-[350px] md:w-[400px] h-[300px] mx-auto p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105'>
          <i className='fa-solid fa-clapperboard fa-beat-fade text-main_accent text-6xl'></i>
          <h3 className='text-2xl font-bold mt-4'>Montaż filmów</h3>
          <p className='mt-2 text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, fuga a.
            Molestias quo et maxime neque. Ullam molestias architecto odit!
          </p>
          <a href="#" className='bg-main_accent inline-block mt-4 py-2 px-8 rounded-full text-bg_color_2 font-extrabold hover:drop-shadow-custom-glow hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer text-lg shadow-custom-around shadow-main_accent'>Learn more!</a>
        </div>

        <div className='bg-bg_color_2 w-[350px] md:w-[400px] h-[300px] mx-auto p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105'>
          <i className='fa-solid fa-paintbrush fa-beat-fade text-main_accent text-6xl'></i>
          <h3 className='text-2xl font-bold mt-4'>Obróbka zdjęć</h3>
          <p className='mt-2 text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, fuga a.
            Molestias quo et maxime neque. Ullam molestias architecto odit!
          </p>
          <a href="#" className='bg-main_accent inline-block mt-4 py-2 px-8 rounded-full text-bg_color_2 font-extrabold hover:drop-shadow-custom-glow hover:scale-110 transition-all duration-500 ease-in-out cursor-pointer text-lg shadow-custom-around shadow-main_accent'>Learn more!</a>
        </div>
      </div>

    </section>
  )
}

export default Services