import ImageSlider from "../../components/ImageSlider";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion"
import { fadeIn, reveal } from "../../lib/animations";
import Section from "../../components/ui/Section";
import SectionHeading from "../../components/ui/SectionHeading";

const TheyTrustedMe = () => {

  const {t} = useTranslation()

  return (
    <Section id="feedback" padding="compact" className="text-white flex-col">
      <motion.div
        variants={fadeIn("top")}
        {...reveal}
       >
        <SectionHeading
          className="leading-10 md:text-5xl text-3xl font-semibold mb-12 text-center"
          title={t("feedback.they_trust")}
          accent={t("feedback.me")}
        />
      </motion.div>
      <motion.div
        variants={fadeIn("bottom")}
        {...reveal}
       >
        <ImageSlider />
      </motion.div>
    </Section>
  );
};

export default TheyTrustedMe;
