import { useState } from 'react'
import './App.css'
import Header from './components/header'
import Home from './components/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='font-playfair'>
      <Header/>
      <Home/>
    </div>
  )
}

export default App
