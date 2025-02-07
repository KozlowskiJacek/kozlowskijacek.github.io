import React, { useState } from 'react'
import confetti from 'canvas-confetti'

const Contact = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const[errors, setErrors] = useState<string[]>([])

  const [successMessage, setSuccessMessage] = setState("")
  //! Skończyłem tutaj !

  const handleConfetti = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault()

    const rect = event.currentTarget.getBoundingClientRect()

    confetti({
      particleCount: 100,
      spread: 50,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: rect.top / window.innerHeight
      }
    })
  }

  return (
    <section className="text-white bg-bg_color_2 flex flex-col justify-center items-center min-h-screen w-full pt-[100px] px-[9%] pv-[20px]" id="contact">
      <h2 className='mb-5 text-5xl font-semibold'>Let's <span className='text-main_accent'>Collaborate</span> 🤝</h2>
      <p className='text-sm text-gray_400 mb-[3rem]'>Write me an message and I will response within 1 business day</p>
    
      <form action="#" className='max-w-[70rem] text-center mx-auto my-4 mb-[3rem] '>
        <div className='flex justify-center space-x-4'>
          <input type="text" placeholder='Full name' className='input'/>
          <input type="text"  placeholder='E-mail' className='input'/>
        </div>
        <div className='flex justify-center flex-wrap space-x-4'>
          <input type="number" placeholder='Phone' className='input'/>
          <input type="text" placeholder='Subject' className='input'/>
        </div>
        <textarea 
        name=""
        id="" 
        cols={30} 
        rows={10}
        placeholder='Your message...'
        className='w-full p-5 text-base text-white bg-bg_color_1 rounded-xl my-4 mx-0'      
        ></textarea>
        <input type="submit" value="Submit" onClick={handleConfetti} className='btn' />
      </form>
    </section>
  )
}

export default Contact