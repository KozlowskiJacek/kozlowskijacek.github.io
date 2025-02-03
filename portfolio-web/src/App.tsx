import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import TheyTrustedMe from './components/TheyTrustedMe'

function App() {

  return (
    <div className='font-playfair'>
      <Header/>
      <Home/>
      <About/>
      <Services/>
      <Projects/>
      <TheyTrustedMe/>
    </div>
  )
}

export default App
