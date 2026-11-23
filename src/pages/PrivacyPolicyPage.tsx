import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa6";
import { fadeIn, reveal, staggerContainer, staggerItem } from "../lib/animations";
import { contactEmail } from "../data/contact";
import { paths } from "../data/navigation";
import { privacySections, privacyUpdatedAt } from "../data/privacy";
import Seo from "../components/Seo";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";

const PrivacyPolicyPage = () => {
  const { t, i18n } = useTranslation();
  const updated = new Intl.DateTimeFormat(i18n.resolvedLanguage ?? "pl", { dateStyle: "long" }).format(
    new Date(privacyUpdatedAt),
  );

  return (
    <Section id="privacy" padding="page" className="flex-col">
      <Seo titleKey="contact:privacy.meta.title" descriptionKey="contact:privacy.meta.description" />
      <motion.header
        className="mx-auto w-full max-w-3xl"
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={staggerItem} className="mb-4 text-small font-semibold uppercase tracking-wider text-accent">
          {t("contact:privacy.eyebrow")}
        </motion.p>
        <motion.h1 variants={staggerItem} className="text-balance font-display text-h1 text-fg">
          {t("contact:privacy.title")}
        </motion.h1>
        <motion.p variants={staggerItem} className="mt-5 text-body text-fg-secondary md:text-body-lg">
          {t("contact:privacy.intro")}
        </motion.p>
        <motion.p variants={staggerItem} className="mt-3 text-small text-fg-muted">
          <time dateTime={privacyUpdatedAt}>{t("contact:privacy.updated", { date: updated })}</time>
        </motion.p>
      </motion.header>

      <motion.div
        className="mx-auto flex w-full max-w-3xl flex-col gap-10"
        variants={fadeIn("bottom", 0.1)}
        {...reveal}
      >
        {privacySections.map(({ id, titleKey, paragraphKeys, listKeys }) => (
          <section key={id} aria-labelledby={`privacy-${id}`} className="border-t border-border pt-8">
            <h2 id={`privacy-${id}`} className="font-display text-h3 text-fg">
              {t(titleKey)}
            </h2>
            {paragraphKeys.map((key) => (
              <p key={key} className="mt-3 text-body text-fg-secondary">
                {t(key, { email: contactEmail })}
              </p>
            ))}
            {listKeys && (
              <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-body text-fg-secondary marker:text-accent">
                {listKeys.map((key) => (
                  <li key={key}>{t(key)}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <div className="border-t border-border pt-8">
          <Button to={paths.contact} variant="secondary">
            <FaArrowLeft aria-hidden="true" />
            {t("contact:privacy.back")}
          </Button>
        </div>
      </motion.div>
    </Section>
  );
};

export default PrivacyPolicyPage;
