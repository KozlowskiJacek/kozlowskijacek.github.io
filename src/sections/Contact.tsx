import ContactForm from "../components/contact/ContactForm";
import ContactChannels from "../components/contact/ContactChannels";
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
      padding={asPage ? "page" : "default"}
      className="flex-col"
    >
      <motion.div className="max-w-2xl text-center" variants={fadeIn("bottom")} {...reveal}>
        <SectionHeading
          as={asPage ? "h1" : "h2"}
          align="center"
          className="mb-4"
          title={t("contact:lets")}
          accent={t("contact:collaborate")}
        >
          {" "}
          🤝
        </SectionHeading>
        <p className="text-body text-fg-secondary md:text-body-lg">{t("contact:write")}</p>
      </motion.div>

      <div className="grid w-full max-w-6xl items-start gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <motion.div className="min-w-0" variants={fadeIn("bottom", 0.1)} {...reveal}>
          <Card className="p-5 sm:p-8">
            <ContactForm />
          </Card>
        </motion.div>
        <motion.aside
          aria-label={t("contact:channels.title")}
          className="lg:sticky lg:top-24"
          variants={fadeIn("bottom", 0.2)}
          {...reveal}
        >
          <ContactChannels />
        </motion.aside>
      </div>
    </Section>
  );
};

export default Contact;
