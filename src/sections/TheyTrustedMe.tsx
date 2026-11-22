import TestimonialsSlider from "../components/TestimonialsSlider";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fadeIn, reveal } from "../lib/animations";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";

const TheyTrustedMe = () => {
  const { t } = useTranslation();

  return (
    <Section id="feedback" className="flex-col">
      <SectionHeading
        align="center"
        variants={fadeIn("bottom")}
        {...reveal}
        title={t("feedback.they_trust")}
        accent={t("feedback.me")}
      />
      <motion.div className="w-full" variants={fadeIn("bottom", 0.1)} {...reveal}>
        <TestimonialsSlider />
      </motion.div>
    </Section>
  );
};

export default TheyTrustedMe;
