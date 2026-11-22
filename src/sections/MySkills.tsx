import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, reveal } from "../lib/animations";
import { useTranslation } from "react-i18next";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { skills, type SkillTitle } from "../data/skills";

const MySkills = () => {
  const [openSkill, setOpenSkill] = useState<string | null>(null);
  const close = () => setOpenSkill(null);

  const { t } = useTranslation();
  const titleOf = (item: SkillTitle) => ("titleKey" in item ? t(item.titleKey) : item.title);

  return (
    <Section id="skills" bg="primary" className="text-white flex-col">
      <SectionHeading
        className="text-center text-5xl font-bold mb-20"
        variants={fadeIn("top")}
        {...reveal}
        title={t("skills.my")}
        accent={t("skills.skills")}
      />
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 items-center gap-10 mb-10"
        variants={fadeIn("bottom")}
        {...reveal}
      >
        {skills.map((skill) => {
          const Icon = skill.icon;
          const title = titleOf(skill);

          return (
            <div key={skill.id}>
              <button
                className="bg-bg_color_2 w-[300px] h-[200px] md:w-[350px] md:h-[180px] mx-auto md:mx-auto mb-5 p-6 pb-8 rounded-2xl text-center border-2 border-bg_color_1 transition duration-500 ease hover:border-main_accent hover:scale-105 cursor-pointer"
                onClick={() => setOpenSkill(skill.id)}
              >
                <Icon aria-hidden="true" className="text-main_accent text-6xl mx-auto" />
                <h3 className="text-2xl font-bold mt-4">{title}</h3>
              </button>
              <Modal open={openSkill === skill.id} onClose={close}>
                <div className="flex flex-col gap-4">
                  <h1 className="text-2xl">{title}</h1>
                  <hr className="border-t-solid border-1 border-white" />
                  <p>{t(skill.descriptionKey)}</p>
                  {skill.links.map((link) => (
                    <a
                      key={link.href + link.labelKey}
                      className="text-main_accent underline underline-offset-4"
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t(link.labelKey)}
                    </a>
                  ))}
                  <hr className="border-t-solid border-1 border-white" />
                  <p className="text-xl">{titleOf(skill.highlight)}</p>
                  <p>{t(skill.highlight.descriptionKey)}</p>
                  <hr className="border-t-solid border-1 border-white" />
                  <div className="flex flex-row justify-center">
                    <Button className="md:text-xl text-base" onClick={close}>
                      {t("skills.close_btn")}
                    </Button>
                  </div>
                </div>
              </Modal>
            </div>
          );
        })}
      </motion.div>
    </Section>
  );
};

export default MySkills;
