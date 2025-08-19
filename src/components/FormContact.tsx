import React, { useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import "intl-tel-input/build/css/intlTelInput.css";
import "../index.css";
import { useTranslation } from 'react-i18next';
import { serviceId, templateId, publicKey } from '../env';

const FormContact = () => {
  const form = useRef();
  const buttonRef = useRef(null);
  const {t} = useTranslation()
  
  // Zmieniamy kolor tekstu na biały po załadowaniu formularza (autofill)
  useEffect(() => {
    const changeTextColor = () => {
      const inputs = document.querySelectorAll('input:-webkit-autofill, textarea:-webkit-autofill');
      inputs.forEach(input => {
        input.style.color = 'white';  // Wymusza kolor białego tekstu
      });
    }

    // Dodanie nasłuchiwania na zdarzenie 'load' i 'animationstart'
    window.addEventListener('load', changeTextColor);  
    document.addEventListener('animationstart', changeTextColor);  

    // Sprzątanie nasłuchiwaczy
    return () => {
      window.removeEventListener('load', changeTextColor);
      document.removeEventListener('animationstart', changeTextColor);
    };
  }, []);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          console.log('SUCCESS!');
          e.target.reset();

          if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;

            confetti({
              particleCount: 100,
              spread: 50,
              origin: { x, y },
            });
          }
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="max-w-[70rem] text-center mx-auto my-4 mb-[3rem]">
      <div className="flex md:flex-row flex-col justify-center md:gap-5">
        <input type="text" name="user_name" placeholder={t("contact.full_name")} required className="input" />
        <input type="email" name="user_email" placeholder={t("contact.email")} required className="input" />
      </div>
      <div className="flex justify-center flex-wrap space-x-4">
        <input type="text" name="user_subject" placeholder={t("contact.subject")} required className="w-[100%] p-5 text-base text-white bg-bg_color_1 rounded-xl my-4 mx-0" />
      </div>
      <textarea
        cols={30}
        rows={7}
        name="message"
        placeholder={t("contact.message")}
        required
        className="w-full p-5 text-base text-white bg-bg_color_1 rounded-xl my-4 mx-0"
      />
      <input type="submit" value={t("contact.btn_send")} ref={buttonRef} className="btn" />
    </form>
  );
};

export default FormContact;
