import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fadeIn, reveal } from "../../lib/animations";
import { career } from "../../data/career";
import EmployerSection from "./EmployerSection";

const Summary = () => {
  const { t } = useTranslation();

  return (
    <EmployerSection
      id="summary"
      title={t("employer.summary.title")}
      accent={t("employer.summary.accent")}
    >
      <motion.div
        className="flex max-w-3xl flex-col gap-4 text-body text-fg-secondary md:text-body-lg print:max-w-none print:gap-1 print:!text-[9pt] print:leading-snug"
        variants={fadeIn("bottom")}
        {...reveal}
      >
        {career.summaryKeys.map((key) => (
          <p key={key}>{t(key)}</p>
        ))}
      </motion.div>
    </EmployerSection>
  );
};

export default Summary;
