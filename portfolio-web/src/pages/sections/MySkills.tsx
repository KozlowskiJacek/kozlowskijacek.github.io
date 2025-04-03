import React, { useState } from "react";
import { motion } from 'framer-motion'
import { useTranslation } from "react-i18next";
import Modal from "../../components/Modal";




const Projects = () => {
  const [openReact, setOpenReact] = React.useState(false)
  const [openPython, setOpenPython] = React.useState(false)
  const [openTailwind, setOpenTailwind] = React.useState(false)
  const [openDatabase, setOpenDatabase] = React.useState(false)
  const [openCreatve, setOpenCreative] = React.useState(false)
  const [openGit, setOpenGit] = React.useState(false)

  const {t} = useTranslation()
  
  const fadeInVariants = (direction: "top" | "bottom" | "left" | "right") => {
    return {
      hidden: {
        opacity: 0,
        y: direction === "top" ? -80 : direction === "bottom" ? 80 : 0,
        x: direction === "left" ? -80 : direction === "right" ? 80 : 0,
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration: 2,
          opacity: { duration: 2, delay: 0.6},
          delay: 0.2,
          ease: [0.9, 0, 0.2, 1]
        }
      }
    } 
  }

  return (
    <section
      className="text-white bg-bg_color_1 flex flex-col justify-center items-center min-h-screen w-full pt-[100px] px-[9%] pv-[20px]"
      id="skills"
    >
      <motion.h2 className="text-center text-5xl font-bold mb-20"
       variants = {fadeInVariants("top")}
       initial = "hidden"
       whileInView = "visible"
       viewport = {{ once: false}}
      >
        {t("Moje")}<span className="text-main_accent"> {t("Umiejętności")}</span>
      </motion.h2>
      <motion.div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10 mb-10"
       variants = {fadeInVariants("bottom")}
       initial = "hidden"
       whileInView = "visible"
       viewport = {{ once: false}}
      >
        <div>
          <button className='bg-bg_color_2 w-[350px] h-[500px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer' onClick={() => setOpenReact(true)}>
            <i className='fa-brands fa-react text-main_accent text-6xl'></i>
            <h3 className='text-2xl font-bold mt-4'>React / JS / TS</h3>
          </button>
          <Modal open={openReact} onClose={() => setOpenReact(false)}>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">React / JS / TS</h1>
              <hr className="border-t-solid border-1 border-white"/>
              <p>
                {t("skills.react.text")}
              </p>
              <a href="/Certyfikaty/Frontend ang.pdf" target="_blank">{t("skills.react.certificate")}</a>
              <hr className="border-t-solid border-1 border-white"/>
              <p className="text-xl">🛠 Aurelia HR</p>
              <p>
                {t("skills.react.app")}
              </p>
              <hr className="border-t-solid border-1 border-white"/>
              <div className="flex flex-row justify-center">
                <button className="btn" onClick={() => setOpenReact(false)}>
                  {t("skills.close_btn")}
                </button>
              </div>
            </div>
          </Modal>
        </div>

        <div>
          <button className='bg-bg_color_2 w-[350px] h-[500px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer' onClick={() => setOpenPython(true)}>
            <i className='fa-brands fa-python text-main_accent text-6xl'></i>
            <h3 className='text-2xl font-bold mt-4'>Python</h3>
          </button>
          <Modal open={openPython} onClose={() => setOpenPython(false)}>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">Python</h1>
              <p>
                {t("skills.python.text")}
              </p>
              <a href="/Certyfikaty/Full Stack Python ang.pdf" target="_blank">Full Stack Python - Certyfikat</a>
              <a href="/Certyfikaty/Python backend ang.pdf" target="_blank">Python Back-end Developer - Certyfikat</a>
              <hr className="border-t-solid border-1 border-white"/>
              <p className="text-xl">{t("skills.python.script")}</p>
              <p>
                 {t("skills.python.solo")}
              </p>
              <hr className="border-t-solid border-1 border-white"/>
              <div className="flex flex-row justify-center">
                <button className="btn" onClick={() => setOpenPython(false)}>
                  {t("skills.close_btn")}
                </button>
              </div>
            </div>
          </Modal>
        </div>

        <div>
          <button className='bg-bg_color_2 w-[350px] h-[500px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer' onClick={() => setOpenTailwind(true)}>
            <i className='fa-brands fa-css3-alt text-main_accent text-6xl'></i>
            <h3 className='text-2xl font-bold mt-4'>Tailwind CSS</h3>
          </button>
          <Modal open={openTailwind} onClose={() => setOpenTailwind(false)}>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">Tailwind CSS</h1>
              <p>
                 {t("skills.tailwind.text")}
              </p>
              <a href="/Certyfikaty/Full Stack Python ang.pdf" target="_blank">Full Stack Python - Certyfikat</a>
              <hr className="border-t-solid border-1 border-white"/>
              <p className="text-xl">{t("skills.tailwind.main")}</p>
              <p>
                {t("skills.tailwind.text_2")}
              </p>
              <hr className="border-t-solid border-1 border-white"/>
              <div className="flex flex-row justify-center">
                <button className="btn" onClick={() => setOpenTailwind(false)}>
                  {t("skills.close_btn")}
                </button>
              </div>
            </div>
          </Modal>
        </div>

        <div>
          <button className='bg-bg_color_2 w-[350px] h-[500px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer' onClick={() => setOpenDatabase(true)}>
            <i className='fa-solid fa-database text-main_accent text-6xl'></i>
            <h3 className='text-2xl font-bold mt-4'>{t("skills.database")}</h3>
          </button>
          <Modal open={openDatabase} onClose={() => setOpenDatabase(false)}>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">{t("skills.database")}</h1>
              <p>
                Dzięki studiom i kursowi Full Stack Developer odkryłem potencjał baz danych i zrozumiałem, jak ważną rolę odgrywają w aplikacjach. Używam ich w praktyce i znam zarówno SQL, jak i NoSQL. Wiem, kiedy używać jednego lub drugiego rozwiązania, a także jak je optymalizować. Dzięki temu mogę tworzyć wydajne aplikacje, które działają szybko i sprawnie.
              </p>
              <a href="/Certyfikaty/Full Stack Python ang.pdf" target="_blank">Full Stack Python - Certyfikat</a>
              <hr className="border-t-solid border-1 border-white"/>
              <p className="text-xl">🛠 AureliaHR</p>
              <p>
                📌 Moja aplikacja używa MongoDB do przechowywania danych o użytkownikach oraz dane dotyczące zadań dla poszczególnego zespołu. 
              </p>
              <hr className="border-t-solid border-1 border-white"/>
              <div className="flex flex-row justify-center">
                <button className="btn" onClick={() => setOpenDatabase(false)}>
                  Close
                </button>
              </div>
            </div>
          </Modal>
        </div>

        <div>
          <button className='bg-bg_color_2 w-[350px] h-[500px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer' onClick={() => setOpenCreative(true)}>
            <i className='fa-solid fa-puzzle-piece text-main_accent text-6xl'></i>
            <h3 className='text-2xl font-bold mt-4'>{t("skills.creative")}</h3>
          </button>
          <Modal open={openCreatve} onClose={() => setOpenCreative(false)}>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">{t("skills.creative")}</h1>
              <p>
              Łączę pracę kreatywną z analitycznym myśleniem – montaż filmów i programowanie. Dzięki temu mam unikalne podejście do tworzenia stron i aplikacji, gdzie estetyka i funkcjonalność idą w parze. Ta symbioza pozwala mi lepiej projektować zarówno od strony wizualnej, jak i technicznej.
              </p>
              <a href="https://www.youtube.com/watch?v=oTUANW-PJ0E&ab_channel=Otinus" target="_blank">Jedna z moich prac</a>
              <hr className="border-t-solid border-1 border-white"/>
              <p className="text-xl">🛠 Praca kreatywna</p>
              <p>
                📌 Jako montażysta nauczyłem się, czym jest timing, jak dobierać muzykę do filmu, pisać teksty i wykorzystywać AI do usprawniania różnych procesów. Poznałem także zasady pisania scenariuszy, planowania ujęć, ustawiania światła, kadrowania, color gradingu i kompozycji.
              </p>
              <hr className="border-t-solid border-1 border-white"/>
              <div className="flex flex-row justify-center">
                <button className="btn" onClick={() => setOpenCreative(false)}>
                  Close
                </button>
              </div>
            </div>
          </Modal>
        </div>

        <div>
          <button className='bg-bg_color_2 w-[350px] h-[500px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer' onClick={() => setOpenGit(true)}>
            <i className='fa-brands fa-github text-main_accent text-6xl'></i>
            <h3 className='text-2xl font-bold mt-4'>Git</h3>
          </button>
          <Modal open={openGit} onClose={() => setOpenGit(false)}>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">Git</h1>
              <p>
              Na co dzień korzystam z Git, co pozwala mi sprawnie zarządzać kodem zarówno w projektach indywidualnych, jak i zespołowych (projekty na studia). Tworzę i zarządzam branchami, co ułatwia równoległą pracę nad różnymi funkcjonalnościami. Dbam o czytelność repozytorium, stosując dobre praktyki w commitach i pull requestach.
              </p>
              <a href="https://github.com/JacekKoz?tab=overview&from=2025-02-01&to=2025-02-10" target="_blank">Mój GitHub</a>
              <hr className="border-t-solid border-1 border-white"/>
              <p className="text-xl">🛠 Git – kontrola wersji i praca zespołowa</p>
              <p>
                📌 Mam doświadczenie w rozwiązywaniu konfliktów w kodzie oraz pracy z code review, co pomaga w utrzymaniu wysokiej jakości projektów. Korzystam z GitHub/GitLab, a także podstawowych funkcji CI/CD, które automatyzują proces wdrażania i testowania aplikacji. Dzięki temu mogę skutecznie kontrolować wersje kodu i usprawniać współpracę w zespołach.
              </p>
              <hr className="border-t-solid border-1 border-white"/>
              <div className="flex flex-row justify-center">
                <button className="btn" onClick={() => setOpenGit(false)}>
                  Close
                </button>
              </div>
            </div>
          </Modal>
        </div>

        
      </motion.div>
    </section>
  );
};

export default Projects;
