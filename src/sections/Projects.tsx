import { motion } from "framer-motion";
import { fadeIn, reveal } from "../lib/animations";
import { projects } from "../data/projects";
import { useTranslation } from "react-i18next";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";

const Projects = () => {
  const { t } = useTranslation();

  return (
    <Section id="projects" bg="secondary" className="text-white flex-col">
      <SectionHeading
        className="text-center text-5xl font-bold mb-10"
        variants={fadeIn("top")}
        {...reveal}
        title={t("projects.my")}
        accent={t("projects.projects")}
      />
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 items-center gap-10 mb-10"
        variants={fadeIn("bottom")}
        {...reveal}
      >
        {projects.map((project) => (
          <div
            key={project.id}
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
              {project.links.github && (
                <a
                  href={project.links.github}
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
    </Section>
  );
};

export default Projects;
