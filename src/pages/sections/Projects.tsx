import { motion } from "framer-motion";
import { fadeIn, reveal } from "../../lib/animations";
import { projects } from "../../data/projects";
import { useTranslation } from "react-i18next";

const Projects = () => {
  const { t } = useTranslation();

  return (
    <section
      className="text-white bg-bg_color_2 flex flex-col justify-center items-center min-h-screen w-full pt-[100px] px-[9%] py-[20px]"
      id="projects"
    >
      <motion.h2
        className="text-center text-5xl font-bold mb-10"
        variants={fadeIn("top")}
        {...reveal}
      >
        {t("projects.my")}
        <span className="text-main_accent"> {t("projects.projects")}</span>
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 items-center gap-10 mb-10"
        variants={fadeIn("bottom")}
        {...reveal}
      >
        {projects.map((project, i) => (
          <div
            key={`${project.title}-${i}`}
            className="relative rounded-2xl shadow-[0_0_1rem_bg_color_1] overflow-hidden flex group cursor-pointer"
          >
            <img
              className="w-full transition duration-500 ease-in-out transform group-hover:scale-110"
              src={project.image}
              alt=""
            />
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-bg_color_1 flex flex-col justify-center items-center text-center px-16 translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
              <h4 className="md:text-3xl text-xl font-bold">{project.title}</h4>
              <p className="mx-0 mb-2 mt-3 md:text-base text-sm">{t(project.descriptionKey)}</p>
              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={project.title}
                  className="inline-flex justify-center items-center md:w-10 md:h-10 w-8 h-8 bg-white rounded-full"
                >
                  <i className="bx bx-link text-gray_600 text-lg"></i>
                </a>
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
