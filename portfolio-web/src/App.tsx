import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Projects from './pages/Projects'
import TheyTrustedMe from './pages/TheyTrustedMe'
import Contact from './pages/Contact'


function App() {

  return (
    <div className='font-playfair'>
      <Header/>
      <Home/>
      <About/>
      <Services/>
      <Projects/>
      <TheyTrustedMe/>
      <Contact/>
    </div>
  )
}

export default App
