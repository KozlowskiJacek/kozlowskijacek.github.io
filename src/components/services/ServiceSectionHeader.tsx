import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fadeIn, reveal } from "../../lib/animations";
import type { SectionCopy, ServiceTone } from "../../data/services/types";
import SectionHeading from "../ui/SectionHeading";

type ServiceSectionHeaderProps = {
  copy: SectionCopy;
  tone: ServiceTone;
};

/** Wyśrodkowany nagłówek sekcji podstrony usług. */
const ServiceSectionHeader = ({ copy, tone }: ServiceSectionHeaderProps) => {
  const { t } = useTranslation();

  return (
    <motion.div className="max-w-2xl text-center" variants={fadeIn("bottom")} {...reveal}>
      <SectionHeading align="center" tone={tone} title={t(copy.titleKey)} accent={t(copy.accentKey)} />
      {copy.textKey && (
        <p className="mt-4 text-body text-fg-secondary md:text-body-lg">{t(copy.textKey)}</p>
      )}
    </motion.div>
  );
};

export default ServiceSectionHeader;
