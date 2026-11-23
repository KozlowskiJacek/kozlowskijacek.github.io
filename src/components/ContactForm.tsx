import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { CONTACT_TOPIC_PARAM, contactTopicKeys, isContactTopic } from '../data/services/contact';
import { serviceId, templateId, publicKey } from '../lib/env';
import { buttonClasses } from './ui/buttonStyles';

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLInputElement>(null);
  const {t} = useTranslation()
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const isSending = status === 'sending';
  // /kontakt?temat=wideo|web|praca — wstępnie wypełnione pole „Temat”.
  const [searchParams] = useSearchParams();
  const topic = searchParams.get(CONTACT_TOPIC_PARAM);
  const defaultSubject = isContactTopic(topic) ? t(contactTopicKeys[topic]) : undefined;
  
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

  const fieldClass =
    'w-full rounded-xl border border-border bg-background px-4 py-3 text-body text-fg placeholder:text-fg-muted transition-[border-color,box-shadow] duration-200 ease-out hover:border-border-strong focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20';

  return (
    <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <input type="text" name="user_name" placeholder={t("contact.full_name")} aria-label={t("contact.full_name")} required className={fieldClass} />
        <input type="email" name="user_email" placeholder={t("contact.email")} aria-label={t("contact.email")} required className={fieldClass} />
      </div>
      <input key={defaultSubject} type="text" name="user_subject" defaultValue={defaultSubject} placeholder={t("contact.subject")} aria-label={t("contact.subject")} required className={fieldClass} />
      <textarea
        cols={30}
        rows={7}
        name="message"
        placeholder={t("contact.message")}
        aria-label={t("contact.message")}
        required
        className={`${fieldClass} resize-y`}
      />
      {status === 'error' && (
        <p role="alert" className="text-small text-danger">
          {t("contact.error")}
        </p>
      )}
      <input
        type="submit"
        value={isSending ? t("contact.btn_sending") : t("contact.btn_send")}
        ref={buttonRef}
        disabled={isSending}
        aria-busy={isSending}
        className={buttonClasses({ size: "lg", className: "mt-2 w-full sm:w-auto sm:self-end" })}
      />
    </form>
  );
};

export default ContactForm;
