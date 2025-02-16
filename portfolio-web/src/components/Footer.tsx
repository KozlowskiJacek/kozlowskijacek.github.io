import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-bg_color_1 text-white flex justify-between items-center flex-wrap p-5 px-[9%]'>
      <div>
      <p className=''>Copyrights Jacek Kozłowski</p>
      </div>

      <div>
        <a href="#home" className='w-10 h-10 flex justify-center items-center py-3 px-3 bg-main_accent rounded-lg transition-all duration-500 ease-in-out hover:shadow-custom-around hover:scale-105'><i className='fa-solid fa-caret-up fa-bounce text-bg_color_1 text-2xl'></i></a>
      </div>
    </footer>
  )
}

export default Footer