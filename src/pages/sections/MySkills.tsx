import React from "react";
import { motion } from "framer-motion";
import { fadeIn, reveal } from "../../lib/animations";
import { useTranslation } from "react-i18next";
import Modal from "../../components/Modal";
import { FaReact, FaPython, FaCss3Alt, FaDatabase, FaPuzzlePiece, FaGithub } from "react-icons/fa6";

const Projects = () => {
  const [openReact, setOpenReact] = React.useState(false);
  const [openPython, setOpenPython] = React.useState(false);
  const [openTailwind, setOpenTailwind] = React.useState(false);
  const [openDatabase, setOpenDatabase] = React.useState(false);
  const [openCreatve, setOpenCreative] = React.useState(false);
  const [openGit, setOpenGit] = React.useState(false);

  const { t } = useTranslation();

  return (
    <section
      className="text-white bg-bg_color_1 flex flex-col justify-center items-center min-h-screen w-full pt-[100px] px-[9%] py-[20px]"
      id="skills"
    >
      <motion.h2
        className="text-center text-5xl font-bold mb-20"
        variants={fadeIn("top")}
        {...reveal}
      >
        {t("skills.my")}
        <span className="text-main_accent"> {t("skills.skills")}</span>
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 items-center gap-10 mb-10"
        variants={fadeIn("bottom")}
        {...reveal}
      >
        <div>
          <button
            className="bg-bg_color_2 w-[300px] h-[200px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer"
            onClick={() => setOpenReact(true)}
          >
            <FaReact aria-hidden="true" className="text-main_accent text-6xl mx-auto" />
            <h3 className="text-2xl font-bold mt-4">React / JS / TS</h3>
          </button>
          <Modal open={openReact} onClose={() => setOpenReact(false)}>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl ">React / JS / TS</h1>
              <hr className="border-t-solid border-1 border-white" />
              <p className="mtext-base">{t("skills.react.text")}</p>
              <a
                className="text-main_accent text-base underline underline-offset-4"
                href="/Certyfikaty/Frontend ang.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("skills.react.certificate")}
              </a>
              <hr className="border-t-solid border-1 border-white" />
              <p className="text-xl">🛠 Aurelia HR</p>
              <p className="text-base">{t("skills.react.app")}</p>
              <hr className="border-t-solid border-1 border-white" />
              <div className="flex flex-row justify-center">
                <button className="md:text-xl text-base btn" onClick={() => setOpenReact(false)}>
                  {t("skills.close_btn")}
                </button>
              </div>
            </div>
          </Modal>
        </div>

        <div>
          <button
            className="bg-bg_color_2 w-[300px] h-[200px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer"
            onClick={() => setOpenPython(true)}
          >
            <FaPython aria-hidden="true" className="text-main_accent text-6xl mx-auto" />
            <h3 className="text-2xl font-bold mt-4">Python</h3>
          </button>
          <Modal open={openPython} onClose={() => setOpenPython(false)}>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">Python</h1>
              <hr className="border-t-solid border-1 border-white" />
              <p>{t("skills.python.text")}</p>
              <a
                className="text-main_accent underline underline-offset-4"
                href="/Certyfikaty/Full Stack Python ang.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("skills.python.certificate_1")}
              </a>
              <a
                className="text-main_accent underline underline-offset-4"
                href="/Certyfikaty/Python backend ang.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("skills.python.certificate_2")}
              </a>
              <hr className="border-t-solid border-1 border-white" />
              <p className="text-xl">{t("skills.python.script")}</p>
              <p>{t("skills.python.solo")}</p>
              <hr className="border-t-solid border-1 border-white" />
              <div className="flex flex-row justify-center">
                <button className="md:text-xl text-base btn" onClick={() => setOpenPython(false)}>
                  {t("skills.close_btn")}
                </button>
              </div>
            </div>
          </Modal>
        </div>

        <div>
          <button
            className="bg-bg_color_2 w-[300px] h-[200px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer"
            onClick={() => setOpenTailwind(true)}
          >
            <FaCss3Alt aria-hidden="true" className="text-main_accent text-6xl mx-auto" />
            <h3 className="text-2xl font-bold mt-4">Tailwind CSS</h3>
          </button>
          <Modal open={openTailwind} onClose={() => setOpenTailwind(false)}>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">Tailwind CSS</h1>
              <hr className="border-t-solid border-1 border-white" />
              <p>{t("skills.tailwind.text")}</p>
              <a
                className="text-main_accent underline underline-offset-4"
                href="/Certyfikaty/Full Stack Python ang.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("skills.tailwind.certificate")}
              </a>
              <hr className="border-t-solid border-1 border-white" />
              <p className="text-xl">{t("skills.tailwind.main")}</p>
              <p>{t("skills.tailwind.text_2")}</p>
              <hr className="border-t-solid border-1 border-white" />
              <div className="flex flex-row justify-center">
                <button className="md:text-xl text-base btn" onClick={() => setOpenTailwind(false)}>
                  {t("skills.close_btn")}
                </button>
              </div>
            </div>
          </Modal>
        </div>

        <div>
          <button
            className="bg-bg_color_2 w-[300px] h-[200px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer"
            onClick={() => setOpenDatabase(true)}
          >
            <FaDatabase aria-hidden="true" className="text-main_accent text-6xl mx-auto" />
            <h3 className="text-2xl font-bold mt-4">{t("skills.database")}</h3>
          </button>
          <Modal open={openDatabase} onClose={() => setOpenDatabase(false)}>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">{t("skills.database")}</h1>
              <hr className="border-t-solid border-1 border-white" />
              <p>{t("skills.database_pop.text")}</p>
              <a
                className="text-main_accent underline underline-offset-4"
                href="/Certyfikaty/Full Stack Python ang.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("skills.database_pop.certificate")}
              </a>
              <hr className="border-t-solid border-1 border-white" />
              <p className="text-xl">🛠 AureliaHR</p>
              <p>{t("skills.database_pop.mongodb")}</p>
              <hr className="border-t-solid border-1 border-white" />
              <div className="flex flex-row justify-center">
                <button className="md:text-xl text-base btn" onClick={() => setOpenDatabase(false)}>
                  {t("skills.close_btn")}
                </button>
              </div>
            </div>
          </Modal>
        </div>

        <div>
          <button
            className="bg-bg_color_2 w-[300px] h-[200px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer"
            onClick={() => setOpenCreative(true)}
          >
            <FaPuzzlePiece aria-hidden="true" className="text-main_accent text-6xl mx-auto" />
            <h3 className="text-2xl font-bold mt-4">{t("skills.creative")}</h3>
          </button>
          <Modal open={openCreatve} onClose={() => setOpenCreative(false)}>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">{t("skills.creative")}</h1>
              <hr className="border-t-solid border-1 border-white" />
              <p>{t("skills.creativity.text")}</p>
              <a
                className="text-main_accent underline underline-offset-4"
                href="https://www.youtube.com/watch?v=oTUANW-PJ0E&ab_channel=Otinus"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("skills.creativity.certificate")}
              </a>
              <hr className="border-t-solid border-1 border-white" />
              <p className="text-xl">{t("skills.creativity.main")}</p>
              <p>{t("skills.creativity.text_2")}</p>
              <hr className="border-t-solid border-1 border-white" />
              <div className="flex flex-row justify-center">
                <button className="md:text-xl text-base btn" onClick={() => setOpenCreative(false)}>
                  {t("skills.close_btn")}
                </button>
              </div>
            </div>
          </Modal>
        </div>

        <div>
          <button
            className="bg-bg_color_2 w-[300px] h-[200px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer"
            onClick={() => setOpenGit(true)}
          >
            <FaGithub aria-hidden="true" className="text-main_accent text-6xl mx-auto" />
            <h3 className="text-2xl font-bold mt-4">Git</h3>
          </button>
          <Modal open={openGit} onClose={() => setOpenGit(false)}>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">Git</h1>
              <hr className="border-t-solid border-1 border-white" />
              <p>{t("skills.git.text")}</p>
              <a
                className="text-main_accent underline underline-offset-4"
                href="https://github.com/JacekKoz?tab=overview&from=2025-02-01&to=2025-02-10"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("skills.git.git")}
              </a>
              <hr className="border-t-solid border-1 border-white" />
              <p className="text-xl">{t("skills.git.main")}</p>
              <p>{t("skills.git.text_2")}</p>
              <hr className="border-t-solid border-1 border-white" />
              <div className="flex flex-row justify-center">
                <button className="md:text-xl text-base btn" onClick={() => setOpenGit(false)}>
                  {t("skills.close_btn")}
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
