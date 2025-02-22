import React, { useEffect, useState } from 'react'
import useSmoothScroll from '../hooks/useSmoothScroll'

const Header = () => {

  const [activeLink, setActiveLink] = useState<string>("home")

  const links = ["home", "about", "services", "projects", "feedback", "contact"]

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
          {links.map((link)=> (
          <a
            key={link}
            onClick={() => {
              setActiveLink(link)
              scrollTo(link)
            }}
            className={`cursor-pointer hover:scale-125 hover:text-main_accent transition-all focus:scale-125 focus:text-main_accent hover:drop-shadow-custom-glow ${activeLink === link ? "scale-125 text-main_accent" : ""}`}
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </a>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header