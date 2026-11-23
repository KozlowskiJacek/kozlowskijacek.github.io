import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa6";
import { reveal, staggerContainer, staggerItem } from "../../lib/animations";
import { formatPeriod } from "../../lib/career";
import { career } from "../../data/career";
import Card from "../../components/ui/Card";
import EmployerSection from "./EmployerSection";

const Education = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage ?? "pl";

  return (
    <EmployerSection
      id="education"
      title={t("employer.education.title")}
      accent={t("employer.education.accent")}
    >
      <motion.ul
        className="grid gap-4 md:grid-cols-2 print:grid-cols-2 print:gap-x-6 print:gap-y-1"
        variants={staggerContainer(0.06)}
        {...reveal}
      >
        {career.education.map((item) => (
          <motion.li key={item.id} variants={staggerItem}>
            <Card className="flex h-full gap-4 p-5 sm:p-6 print:rounded-none print:border-0 print:p-0">
              <FaGraduationCap
                aria-hidden="true"
                className="mt-1 shrink-0 text-xl text-accent print:hidden"
              />
              <div>
                {item.period && (
                  <p className="text-small font-medium text-accent">
                    {formatPeriod(item.period, language, t("employer.experience.present"))}
                  </p>
                )}
                <h3 className="text-body-lg font-semibold text-fg print:!text-[9pt] print:leading-snug">{t(item.degreeKey)}</h3>
                {item.school && <p className="text-body text-fg-secondary">{item.school}</p>}
                {item.noteKey && (
                  <p className="mt-2 text-small text-fg-secondary print:mt-0 print:!text-[8pt] print:leading-snug">
                    {t(item.noteKey)}
                  </p>
                )}
              </div>
            </Card>
          </motion.li>
        ))}
      </motion.ul>
    </EmployerSection>
  );
};

export default Education;
