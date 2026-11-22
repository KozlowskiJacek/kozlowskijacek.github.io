import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import { serviceId, templateId, publicKey } from '../lib/env';

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLInputElement>(null);
  const {t} = useTranslation()
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const isSending = status === 'sending';
  
  // Zmieniamy kolor tekstu na biały po załadowaniu formularza (autofill)
  useEffect(() => {
    const changeTextColor = () => {
      const inputs = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input:-webkit-autofill, textarea:-webkit-autofill');
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
    const formElement = e.currentTarget;
    if (!form.current || isSending) return;

    setStatus('sending');

    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          setStatus('idle');
          formElement.reset();

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
        () => {
          setStatus('error');
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
      {status === 'error' && (
        <p role="alert" className="text-accent_color_pink md:text-base text-sm mt-2">
          {t("contact.error")}
        </p>
      )}
      <input
        type="submit"
        value={isSending ? t("contact.btn_sending") : t("contact.btn_send")}
        ref={buttonRef}
        disabled={isSending}
        aria-busy={isSending}
        className="btn disabled:opacity-60 disabled:cursor-not-allowed"
      />
    </form>
  );
};

export default ContactForm;
