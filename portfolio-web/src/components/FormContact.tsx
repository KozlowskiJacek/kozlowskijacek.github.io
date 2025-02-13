import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti'

const FormContact = () => {

  const form = useRef();
  const buttonRef = useRef(null)

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_yzmlj1d', 'template_d572b6s', form.current, {
        publicKey: 'Tf79i0jx0HykysBf-',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          e.target.reset()

          if(buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect()
            const x = (rect.left + rect.width / 2) / window.innerWidth
            const y = (rect.top + rect.height / 2) / window.innerHeight
           
            confetti({
              particleCount: 100,
              spread: 50,
              origin: { x, y }
            })
          }

        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  const formatPhone = (value: string) => {
    let numbers = value.replace(/\D/g, '')

    numbers = numbers.slice(0, 9)

    return numbers.replace(/(\d{3})(?=\d)/g, '$1-')
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = formatPhone(e.target.value)
  }

  return (
    <form ref={form} onSubmit={sendEmail} className="max-w-[70rem] text-center mx-auto my-4 mb-[3rem] ">
      <div className="flex justify-center space-x-4">
      <input type="text" name="user_name" placeholder='Full name' required className='input'/>
      <input type="email" name="user_email" placeholder='Email' required className='input'/>
      </div>
      <div className="flex justify-center flex-wrap space-x-4">
      <input 
        type="text"
        name="user_phone"
        placeholder='Phone (Optional)' 
        onChange={handlePhoneChange} 
        maxLength={11} 
        className='input'/>
      <input type="text" name="user_subject" placeholder='Subject' required className='input'/>
      </div>
      <textarea cols={30} rows={10} name="message" placeholder='Your message...' required className="w-full p-5 text-base text-white bg-bg_color_1 rounded-xl my-4 mx-0"/>
      <input type="submit" value="Send" ref={buttonRef} className="btn" />
    </form>
  );
};


export default FormContact

//todo wstawić jeśli się da to automatyczny +48 przed numerem tel żeby było wiadomo skąd jest klient i poładnić strone wymienić zdjęcia w niedziele je zrobić dodać podstrony któe sa konieczne 