import ContactForm from "../components/ContactForm";
import { motion } from "framer-motion";
import { fadeIn, reveal } from "../lib/animations";
import { useTranslation } from "react-i18next";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <Section id="contact" bg="secondary" className="text-white flex-col">
      <motion.div
        variants={fadeIn("top")}
        {...reveal}
      >
        <SectionHeading
          className="mb-5 md:text-5xl text-3xl font-semibold"
          title={t("contact.lets")}
          accent={t("contact.collaborate")}
        >
          {" "}🤝
        </SectionHeading>
        <p className="md:text-base text-sm text-gray_400 mb-[3rem]">
          {t("contact.write")}
        </p>
      </motion.div>

      <motion.div
        variants={fadeIn("bottom")}
        {...reveal}
      >
        <ContactForm />
      </motion.div>
    </Section>
  );
};

export default Contact;
