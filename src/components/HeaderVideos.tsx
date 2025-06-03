import { useEffect, useState } from 'react'
import useSmoothScroll from '../hooks/useSmoothScroll'
import { useTranslation } from "react-i18next"
import { Link } from 'react-router-dom'

const Header = () => {
  const { t, i18n } = useTranslation()
  const scrollTo = useSmoothScroll()

  const currentLang = i18n.language
  const [activeLink, setActiveLink] = useState<string>("nav_profesional")
  const [isOpen, setIsOpen] = useState(false)

  const toggleNavbar = () => setIsOpen(!isOpen)
  
  const links = ["nav_profesional", "nav_ads", "nav_vlogs", "nav_gaming", "nav_reels", "nav_how"]
   
  const toggleLanguage = () => {
    const newLang = currentLang === "pl" ? "en" : "pl"
    i18n.changeLanguage(newLang)
  }

  useEffect(() => {
    const sections = links.map(link => document.getElementById(link))
    const handleScroll = () => {
      let currentSection = "nav_profesional"

      sections.forEach(section => {
        if(section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = section.id
          }
        }
      })

      setActiveLink(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = (link: string) => {
    setActiveLink(link)
    scrollTo(link)
    setIsOpen(false) // Zamknięcie menu po kliknięciu w link
  }

  return (
    <header className="z-50 bg-bg_color_1 text-white fixed top-0 left-0 w-full p-5 shadow-md">
      <div className="container mx-auto flex justify-between items-center">

        <Link to="/"className='text-2xl text-white font-bold cursor-pointer'>Jacek Kozłowski</Link>


        <div className="hidden md:flex items-center justify-end flex-1 space-x-8 text-lg">
          {links.map((link) => (
            <a
              key={link}
              onClick={() => handleNavigation(link)}
              className={`cursor-pointer hover:scale-110 hover:text-main_accent transition-all ${
                activeLink === link ? "scale-110 text-main_accent" : ""
              }`}
            >
              {t(`video.${link}`)}
            </a>
          ))}

          <button onClick={toggleLanguage}>
            {currentLang === "pl" ? (
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/United-kingdom_flag_icon_round.svg/2048px-United-kingdom_flag_icon_round.svg.png" alt="English" className='w-6 h-6'/>
            ) : (
              <img src="https://cdn-icons-png.flaticon.com/512/5372/5372963.png" alt="Polish" className='w-6 h-6'/>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center space-x-4 md:hidden">
          <button onClick={toggleLanguage}>
              {currentLang === "pl" ? (
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/United-kingdom_flag_icon_round.svg/2048px-United-kingdom_flag_icon_round.svg.png" alt="English" className='w-6 h-6'/>
              ) : (
                <img src="https://cdn-icons-png.flaticon.com/512/5372/5372963.png" alt="Polish" className='w-6 h-6'/>
              )}
            </button>
         
          <button onClick={toggleNavbar} className="text-2xl md:hidden">
            {isOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
          </button>
        </div>
      </div>

      {/* Rozwijane menu mobilne */}
      {isOpen && (
        <div className="absolute left-0 right-0 bg-bg_color_1 text-white flex flex-col items-center space-y-4 py-4 shadow-lg">
          {links.map((link) => (
            <a
              key={link}
              onClick={() => handleNavigation(link)}
              className={`cursor-pointer hover:scale-110 hover:text-main_accent transition-all ${
                activeLink === link ? "scale-110 text-main_accent" : ""
              }`}
            >
              {t(`navbar.${link}`)}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

export default Header
