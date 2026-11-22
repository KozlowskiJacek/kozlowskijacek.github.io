import aboutPhoto from "../assets/img/Photo_about.png";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fadeIn, reveal } from "../lib/animations";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";

const About = () => {
  const { t } = useTranslation();

  return (
    <Section id="about" bg="secondary" className="flex-col-reverse md:flex-row">
      <motion.div className="w-full max-w-sm md:max-w-md" variants={fadeIn("bottom")} {...reveal}>
        <img src={aboutPhoto} alt="" className="h-auto w-full" />
      </motion.div>
      <motion.div className="w-full md:max-w-[36rem]" variants={fadeIn("bottom", 0.1)} {...reveal}>
        <SectionHeading className="mb-3" title={t("about.about")} accent={t("about.me")} />
        <h3 className="mb-6 text-h3 text-fg-secondary">{t("about.title")}</h3>
        <p className="text-body text-fg-secondary md:text-body-lg">
          {t("about.text")}{" "}
          <Button variant="ghost" to="/about" className="font-semibold">
            {t("about.see_more")}
          </Button>
        </p>
      </motion.div>
    </Section>
  );
};

export default About;
