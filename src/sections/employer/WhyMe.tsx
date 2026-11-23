import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { reveal, staggerContainer, staggerItem } from "../../lib/animations";
import { career } from "../../data/career";
import Card from "../../components/ui/Card";
import EmployerSection from "./EmployerSection";

const WhyMe = () => {
  const { t } = useTranslation();

  return (
    <EmployerSection
      id="why-me"
      bg="secondary"
      title={t("career:employer.why_me.title")}
      accent={t("career:employer.why_me.accent")}
    >
      <motion.ul
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={staggerContainer(0.06)}
        {...reveal}
      >
        {career.whyMe.map((point) => {
          const Icon = point.icon;
          return (
            <motion.li key={point.id} variants={staggerItem}>
              <Card className="h-full p-5 sm:p-6">
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-accent/20 bg-accent/10 text-lg text-accent">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-body-lg font-semibold text-fg">{t(point.titleKey)}</h3>
                <p className="mt-2 text-small text-fg-secondary">{t(point.textKey)}</p>
              </Card>
            </motion.li>
          );
        })}
      </motion.ul>
    </EmployerSection>
  );
};

export default WhyMe;
