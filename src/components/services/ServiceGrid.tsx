import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa6";
import { reveal, staggerContainer, staggerItem } from "../../lib/animations";
import type { SectionCopy, ServiceItem, ServiceTone } from "../../data/services/types";
import Section from "../ui/Section";
import Card from "../ui/Card";
import ServiceSectionHeader from "./ServiceSectionHeader";
import { toneClasses } from "./tone";

const columnClasses = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

type ServiceGridProps = {
  id: string;
  copy: SectionCopy;
  items: ServiceItem[];
  tone: ServiceTone;
  bg?: "primary" | "secondary";
  columns?: keyof typeof columnClasses;
};

/** Siatka kart: usługi, grupy docelowe, korzyści. */
const ServiceGrid = ({ id, copy, items, tone, bg = "primary", columns = 2 }: ServiceGridProps) => {
  const { t } = useTranslation();
  const classes = toneClasses[tone];

  return (
    <Section id={id} bg={bg} className="flex-col">
      <ServiceSectionHeader copy={copy} tone={tone} />

      <motion.ul
        className={`grid w-full gap-6 ${columnClasses[columns]}`}
        variants={staggerContainer(0.08)}
        {...reveal}
      >
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <motion.li key={item.id} variants={staggerItem}>
              <Card
                as="article"
                className={`flex h-full flex-col p-6 transition-colors duration-300 sm:p-7 ${classes.hoverBorder}`}
              >
                <span
                  aria-hidden="true"
                  className={`grid h-12 w-12 place-items-center rounded-xl border text-xl ${classes.icon}`}
                >
                  <Icon />
                </span>
                <h3 className="mt-5 font-display text-h3 text-fg">{t(item.titleKey)}</h3>
                <p className="mt-2 text-body text-fg-secondary">{t(item.textKey)}</p>

                {item.pointKeys && item.pointKeys.length > 0 && (
                  <ul className="mt-5 grid gap-2">
                    {item.pointKeys.map((key) => (
                      <li key={key} className="flex items-start gap-3 text-small text-fg">
                        <FaCheck aria-hidden="true" className={`mt-1 shrink-0 text-xs ${classes.text}`} />
                        {t(key)}
                      </li>
                    ))}
                  </ul>
                )}

                {item.example && (
                  <div className="mt-auto pt-6">
                    <p
                      className={`rounded-xl border bg-background/60 p-4 text-small text-fg-secondary ${classes.border}`}
                    >
                      <span className={`block font-semibold ${classes.text}`}>{t(item.example.labelKey)}</span>
                      {t(item.example.textKey)}
                    </p>
                  </div>
                )}
              </Card>
            </motion.li>
          );
        })}
      </motion.ul>
    </Section>
  );
};

export default ServiceGrid;
