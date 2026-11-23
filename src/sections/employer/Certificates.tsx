import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaAward, FaFilePdf } from "react-icons/fa6";
import { reveal, staggerContainer, staggerItem } from "../../lib/animations";
import { career } from "../../data/career";
import Card from "../../components/ui/Card";
import EmployerSection from "./EmployerSection";

/** Certyfikaty z linkiem do PDF w public/Certyfikaty. */
const Certificates = () => {
  const { t } = useTranslation();

  return (
    <EmployerSection
      id="certificates"
      title={t("employer.certificates.title")}
      accent={t("employer.certificates.accent")}
    >
      <motion.ul
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={staggerContainer(0.06)}
        {...reveal}
      >
        {career.certificates.map((cert) => {
          const meta = [cert.issuer, cert.year].filter(Boolean).join(" · ");
          return (
            <motion.li key={cert.id} variants={staggerItem}>
              <Card as="article" className="flex h-full flex-col p-5">
                <FaAward aria-hidden="true" className="text-2xl text-accent" />
                <h3 className="mt-3 text-body-lg font-semibold text-fg">{cert.name}</h3>
                {meta && <p className="text-small text-fg-muted">{meta}</p>}
                <a
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 self-start rounded-sm pt-4 text-small font-medium text-accent underline-offset-4 hover:text-accent-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <FaFilePdf aria-hidden="true" />
                  {t("employer.certificates.open")}
                  <span className="sr-only">
                    : {cert.name} {t("pages.case_study.new_tab")}
                  </span>
                </a>
              </Card>
            </motion.li>
          );
        })}
      </motion.ul>
    </EmployerSection>
  );
};

export default Certificates;
