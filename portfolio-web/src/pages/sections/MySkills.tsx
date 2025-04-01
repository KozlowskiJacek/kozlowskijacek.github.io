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
 
  //todo Stworzyć poupa po kliknięciu w kafelek żeby rozwinąć opis co dokładnie umiem
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
                Skończyłem kursy Reacta, w których nauczyłem się m.in. React Routera, React Query, Tailwind CSS i TypeScript. Wszystkie projekty – zarówno te mniejsze, jak i większe – realizowałem samodzielnie, co wyrobiło we mnie nawyk szukania informacji w dokumentacji i na forach, a także dostosowywania rozwiązań do własnych potrzeb. Lubię trafiać na nowe rozwiązania, bo dzięki nim ciągle się uczę i staram się trzymać standardów programowania.
              </p>
              <a href="/Certyfikaty/Frontend ang.pdf" target="_blank">Frontend - Certyfikat</a>
              <hr className="border-t-solid border-1 border-white"/>
              <p className="text-xl">🛠 Aurelia HR</p>
              <p>
                📌 Aplikacja ma pomóc firmom w zarządzaniu zespołami i eliminowaniu chaosu komunikacyjnego. Każdy pracownik komunikuje się wyłącznie w ramach swojego zespołu, a kontakty między zespołami odbywają się jedynie na poziomie kierowników. Dzięki temu menedżerowie mogą sprawnie przydzielać zadania i mieć pełny wgląd w postępy swoich zespołów.
              </p>
              <hr className="border-t-solid border-1 border-white"/>
              <div className="flex flex-row justify-center">
                <button className="btn" onClick={() => setOpenReact(false)}>
                  Close
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
                Zaczynałem jako samouk, a gdy opanowałem podstawy, postanowiłem zapisać się na kursy Backend Python Developer oraz Full Stack Python Developer. Dzięki nim nie tylko rozwinąłem swoje umiejętności w Pythonie, ale również zyskałem głębsze zrozumienie takich narzędzi jak Git, bazy danych, Figma, a nawet Unix. Poznałem frameworki takie jak Flask i Django.
              </p>
              <a href="/Certyfikaty/Full Stack Python ang.pdf" target="_blank">Full Stack Python - Certyfikat</a>
              <a href="/Certyfikaty/Python backend ang.pdf" target="_blank">Python Back-end Developer - Certyfikat</a>
              <hr className="border-t-solid border-1 border-white"/>
              <p className="text-xl">🛠 Skrypty które faktycznie zostały użyte</p>
              <p>
                📌 Samodzielnie napisałem dwa skrypty, które zostały wdrożone w firmie, w której pracuję. Pierwszy to skrypt do web scrapingu, używający biblioteki BeautifulSoup. Dzięki niemu mogłem analizować strony internetowe, na których wystawiała się konkurencja. Drugi skrypt wykorzystywał Pandas i służył do modyfikacji pliku CSV zawierającego informacje GPS o samochodach służbowych. Dzięki temu rozwiązaniu skróciłem czas pracy z 4-5 dni do zaledwie dwóch kliknięć. 
              </p>
              <hr className="border-t-solid border-1 border-white"/>
              <div className="flex flex-row justify-center">
                <button className="btn" onClick={() => setOpenPython(false)}>
                  Close
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
                 Tailwind poznałem na kursie z Web Front-end Developer i bardzo polubiłem to narzędzie do stylizacji. Dzięki niemu mogę szybko i efektywnie tworzyć responsywne strony internetowe, które są zgodne z najnowszymi standardami. Używam Tailwind CSS w większości swoich projektów, co pozwala mi na łatwe dostosowywanie stylów do potrzeb użytkowników.
              </p>
              <hr className="border-t-solid border-1 border-white"/>
              <p className="text-xl">🛠 Tailwind – mój główny stylowy wybór</p>
              <p>
                📌 Tailwinda używam we wszystkich moich projektach i dobrze znam zarówno jego zalety, jak i wady. Dzięki temu wiem, jak korzystać z niego w sposób, który rzeczywiście ułatwia pracę, zamiast ją komplikować.
              </p>
              <hr className="border-t-solid border-1 border-white"/>
              <div className="flex flex-row justify-center">
                <button className="btn" onClick={() => setOpenTailwind(false)}>
                  Close
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

        <button className='bg-bg_color_2 w-[350px] h-[500px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer'>
          <i className='fa-brands fa-github text-main_accent text-6xl'></i>
          <h3 className='text-2xl font-bold mt-4'>DevOps</h3>
        </button>

        
      </motion.div>
    </section>
  );
};

export default Projects;
