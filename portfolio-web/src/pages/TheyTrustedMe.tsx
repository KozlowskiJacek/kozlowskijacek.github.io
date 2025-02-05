import React from 'react'
import workInProgress from "../assets/img/test.jpg";
import ImageSlider from "../components/ImageSlider"

const TheyTrustedMe = () => {
  return (
    <section className='text-white bg-bg_color_1 flex flex-col justify-center items-center min-h-screen w-full pt-[100px] px-[9%] pv-[20px]' id='they-trusted-me'>
      <div className=''>
        <h2 className='leading-10 text-5xl font-semibold mb-12 text-center'>They Trusted <span className='text-main_accent'>Me</span></h2>
          <p className='text-justify leading-6 w-[40rem] m-0'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos veniam
          quidem accusantium eius veritatis dignissimos sequi ut nisi facilis
          quaerat nemo laborum reprehenderit, deserunt, explicabo voluptate
          labore, sed omnis blanditiis quasi incidunt inventore eveniet. Placeat
          maiores iure, quibusdam vitae, sed laborum vero culpa, sit dolor
          praesentium vel animi quae consequatur?
          </p>
      </div>
      
      <ImageSlider/>
    //todo Naprawić Slider możliwe że można jakoś lepiej zrobić cały komponent
    </section>
  )
}

export default TheyTrustedMe