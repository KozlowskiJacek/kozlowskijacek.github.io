import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa6";
import { fadeIn, reveal, staggerContainer, staggerItem } from "../lib/animations";
import { publishedProjects as projects } from "../data/projects";
import { useTranslation } from "react-i18next";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

const Projects = () => {
  const { t } = useTranslation();

  return (
    <Section id="projects" bg="secondary" className="flex-col">
      <SectionHeading
        align="center"
        variants={fadeIn("bottom")}
        {...reveal}
        title={t("projects.my")}
        accent={t("projects.projects")}
      />
      <motion.ul
        className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer()}
        {...reveal}
      >
        {projects.map((project) => (
          <motion.li key={project.slug} variants={staggerItem}>
            <Card as="article" interactive className="group flex h-full flex-col overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden border-b border-border bg-surface">
                <img
                  className="h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
                  src={project.cover}
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-h3 text-fg">{project.title}</h3>
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={project.title}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border-strong text-fg-secondary transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <FaGithub aria-hidden="true" />
                    </a>
                  )}
                </div>
                <p className="text-small text-fg-secondary">{t(project.summaryKey)}</p>
                {project.tech.length > 0 && (
                  <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                    {project.tech.map((tech) => (
                      <li key={tech}>
                        <Badge>{tech}</Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Card>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
};

export default Projects;
