import React, { useEffect, useState } from 'react'
import useSmoothScroll from '../hooks/useSmoothScroll'

const Header = () => {

  // const handleScroll = (id: string) => {
  //   document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  // }

  const scrollTo = useSmoothScroll()

  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])


  return (
    <header className={`z-50 bg-bg_color_1 text-white top-0 left-0 w-full p-5 px-2 flex z-100 fixed ${isScrolled ? 'border-b-[0.1rem] border-b-[rgba(0,0,0,0.2)]' : ''}`}>
      <div className="container mx-auto flex justify-between items-center">
        <a onClick={() => scrollTo("home")} className='text-2xl text-white font-bold cursor-default'> Jacek Kozłowski</a>
        
        
        <div className="flex space-x-11 text-white text-lg ">
            <a onClick={() => scrollTo("home")} className="cursor-pointer hover:scale-125 hover:text-main_accent transition-all focus:scale-125 focus:text-main_accent hover:drop-shadow-custom-glow">Home</a>
            <a onClick={() => scrollTo("about")} className="cursor-pointer hover:scale-125 hover:text-main_accent transition-all focus:scale-125 focus:text-main_accent hover:drop-shadow-custom-glow">About</a>
            <a onClick={() => scrollTo("services")} className="cursor-pointer hover:scale-125 hover:text-main_accent transition-all focus:scale-125 focus:text-main_accent hover:drop-shadow-custom-glow">Services</a>
            <a onClick={() => scrollTo("projects")} className="cursor-pointer hover:scale-125 hover:text-main_accent transition-all focus:scale-125 focus:text-main_accent hover:drop-shadow-custom-glow">Projects</a>
            <a onClick={() => scrollTo("feedback")} className="cursor-pointer hover:scale-125 hover:text-main_accent transition-all focus:scale-125 focus:text-main_accent hover:drop-shadow-custom-glow">Feedback</a>
            <a onClick={() => scrollTo("contact")} className="cursor-pointer hover:scale-125 hover:text-main_accent transition-all focus:scale-125 focus:text-main_accent hover:drop-shadow-custom-glow">Contact</a>
        </div>
      </div>
    </header>
  )
}

export default Header