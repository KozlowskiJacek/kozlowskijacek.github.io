import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { reveal, staggerContainer, staggerItem } from "../../lib/animations";
import { formatPeriod } from "../../lib/career";
import { career } from "../../data/career";
import Badge from "../../components/ui/Badge";
import EmployerSection from "./EmployerSection";

/** Doświadczenie jako pionowa oś czasu (od najnowszego). */
const ExperienceTimeline = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage ?? "pl";

  return (
    <EmployerSection
      id="experience"
      title={t("career:employer.experience.title")}
      accent={t("career:employer.experience.accent")}
    >
      <motion.ol
        className="relative ml-2 flex flex-col gap-10 border-l border-border-strong pl-8 md:ml-4 print:ml-1 print:gap-2 print:pl-4"
        variants={staggerContainer(0.1)}
        {...reveal}
      >
        {career.experience.map((job) => (
          <motion.li key={job.id} variants={staggerItem} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[calc(2.375rem+0.5px)] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background print:-left-[calc(1.375rem+0.5px)] print:top-1 print:!border-print-accent print:!bg-white"
            />
            <p className="text-small font-medium text-accent print:float-right print:!text-[8.5pt] print:!text-print-muted">
              {formatPeriod(job.period, language, t("career:employer.experience.present"))}
            </p>
            <h3 className="mt-1 text-h3 text-fg print:mt-0 print:inline print:!text-[10pt]">{t(job.positionKey)}</h3>
            <p className="text-body text-fg-secondary print:inline print:!text-[9pt] print:before:content-['_·_']">
              {job.company ?? (job.companyFallbackKey ? t(job.companyFallbackKey) : null)}
            </p>
            <ul className="mt-3 flex max-w-3xl list-disc flex-col gap-1.5 pl-5 text-body text-fg-secondary marker:text-accent print:mt-0.5 print:max-w-none print:gap-0 print:!text-[8.5pt] print:leading-snug">
              {job.achievementKeys.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
            {job.tech.length > 0 && (
              <ul aria-label={t("portfolio:case_study.tech")} className="mt-3 flex flex-wrap gap-2 print:hidden">
                {job.tech.map((tech) => (
                  <li key={tech}>
                    <Badge>{tech}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </motion.li>
        ))}
      </motion.ol>
    </EmployerSection>
  );
};

export default ExperienceTimeline;
