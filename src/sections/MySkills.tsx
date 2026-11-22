import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, reveal, staggerContainer, staggerItem } from "../lib/animations";
import { useTranslation } from "react-i18next";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Modal from "../components/ui/Modal";
import { skills, type SkillTitle } from "../data/skills";

const MySkills = () => {
  const [openSkill, setOpenSkill] = useState<string | null>(null);
  const close = () => setOpenSkill(null);

  const { t } = useTranslation();
  const titleOf = (item: SkillTitle) => ("titleKey" in item ? t(item.titleKey) : item.title);

  return (
    <Section id="skills" bg="primary" className="flex-col">
      <SectionHeading
        align="center"
        variants={fadeIn("bottom")}
        {...reveal}
        title={t("skills.my")}
        accent={t("skills.skills")}
      />
      <motion.ul
        className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer()}
        {...reveal}
      >
        {skills.map((skill) => {
          const Icon = skill.icon;
          const title = titleOf(skill);

          return (
            <motion.li key={skill.id} variants={staggerItem}>
              <Card
                as="button"
                interactive
                className="group flex h-full w-full items-center gap-5 p-6 text-left"
                onClick={() => setOpenSkill(skill.id)}
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-accent/20 bg-accent/10 text-3xl text-accent transition-colors duration-300 group-hover:bg-accent/15">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="text-h3 text-fg">{title}</h3>
              </Card>
              <Modal open={openSkill === skill.id} onClose={close}>
                <div className="flex flex-col gap-4">
                  <h3 className="pr-10 text-h3 text-fg">{title}</h3>
                  <hr className="border-border" />
                  <p className="text-fg-secondary">{t(skill.descriptionKey)}</p>
                  {skill.links.map((link) => (
                    <Button
                      key={link.href + link.labelKey}
                      variant="ghost"
                      className="self-start underline"
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t(link.labelKey)}
                    </Button>
                  ))}
                  <hr className="border-border" />
                  <p className="text-body-lg font-medium text-fg">{titleOf(skill.highlight)}</p>
                  <p className="text-fg-secondary">{t(skill.highlight.descriptionKey)}</p>
                  <hr className="border-border" />
                  <div className="flex justify-end">
                    <Button variant="secondary" onClick={close}>
                      {t("skills.close_btn")}
                    </Button>
                  </div>
                </div>
              </Modal>
            </motion.li>
          );
        })}
      </motion.ul>
    </Section>
  );
};

export default MySkills;
