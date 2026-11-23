import ContactForm from "../components/contact/ContactForm";
import { motion } from "framer-motion";
import { fadeIn, reveal } from "../lib/animations";
import { useTranslation } from "react-i18next";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";

type ContactProps = {
  /** Sekcja jako samodzielna strona /kontakt: nagłówek h1 i odstęp pod headerem. */
  asPage?: boolean;
};

const Contact = ({ asPage = false }: ContactProps) => {
  const { t } = useTranslation();

  return (
    <Section
      id="contact"
      bg={asPage ? "primary" : "secondary"}
      padding={asPage ? "hero" : "default"}
      className="flex-col"
    >
      <motion.div className="max-w-2xl text-center" variants={fadeIn("bottom")} {...reveal}>
        <SectionHeading
          as={asPage ? "h1" : "h2"}
          align="center"
          className="mb-4"
          title={t("contact.lets")}
          accent={t("contact.collaborate")}
        >
          {" "}🤝
        </SectionHeading>
        <p className="text-body text-fg-secondary md:text-body-lg">{t("contact.write")}</p>
      </motion.div>

      <motion.div className="w-full max-w-3xl" variants={fadeIn("bottom", 0.1)} {...reveal}>
        <Card className="p-5 sm:p-8">
          <ContactForm />
        </Card>
      </motion.div>
    </Section>
  );
};

export default Contact;
