import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheck } from "react-icons/fa6";
import { reveal, staggerContainer, staggerItem } from "../../lib/animations";
import { contactTopicPath } from "../../data/services/contact";
import type {
  ContactTopic,
  PackagePrice,
  SectionCopy,
  ServicePackage,
  ServiceTone,
} from "../../data/services/types";
import Section from "../ui/Section";
import Card from "../ui/Card";
import Button from "../ui/Button";
import ServiceSectionHeader from "./ServiceSectionHeader";
import { toneClasses } from "./tone";

type PackageCardsProps = {
  id: string;
  copy: SectionCopy;
  packages: ServicePackage[];
  tone: ServiceTone;
  topic: ContactTopic;
  bg?: "primary" | "secondary";
};

/** Cena „od …” w walucie PLN, sformatowana według aktywnego języka. */
const usePriceLabel = () => {
  const { t, i18n } = useTranslation();

  return (price: PackagePrice) => {
    if (!price) return { amount: t("services:shared.price_custom"), prefix: null };
    const amount = new Intl.NumberFormat(i18n.language, {
      style: "currency",
      currency: "PLN",
      maximumFractionDigits: 0,
    }).format(price.from);
    return { amount, prefix: t("services:shared.price_from") };
  };
};

/** Karty pakietów z ceną orientacyjną i CTA do formularza. */
const PackageCards = ({ id, copy, packages, tone, topic, bg = "primary" }: PackageCardsProps) => {
  const { t } = useTranslation();
  const classes = toneClasses[tone];
  const priceLabel = usePriceLabel();

  return (
    <Section id={id} bg={bg} className="flex-col">
      <ServiceSectionHeader copy={copy} tone={tone} />

      <motion.ul
        className="grid w-full gap-6 lg:grid-cols-3"
        variants={staggerContainer(0.1)}
        {...reveal}
      >
        {packages.map((pkg) => {
          const price = priceLabel(pkg.price);

          return (
            <motion.li key={pkg.id} variants={staggerItem}>
              <Card
                as="article"
                className={`relative flex h-full flex-col p-6 sm:p-8 ${pkg.highlighted ? classes.border : ""}`}
              >
                {pkg.highlighted && (
                  <span
                    className={`absolute -top-3 left-6 rounded-full border bg-background px-3 py-0.5 text-xs font-semibold uppercase tracking-wider ${classes.icon}`}
                  >
                    {t("services:shared.popular")}
                  </span>
                )}
                <h3 className="font-display text-h3 text-fg">{t(pkg.titleKey)}</h3>
                <p className="mt-2 text-body text-fg-secondary">{t(pkg.textKey)}</p>

                <p className="mt-6 flex flex-wrap items-baseline gap-x-2 font-display">
                  {price.prefix && <span className="text-small text-fg-muted">{price.prefix}</span>}
                  <span className={`text-h3 ${classes.text}`}>{price.amount}</span>
                </p>

                <ul className="mt-6 grid gap-3 border-t border-border pt-6">
                  {pkg.featureKeys.map((key) => (
                    <li key={key} className="flex items-start gap-3 text-small text-fg">
                      <FaCheck aria-hidden="true" className={`mt-1 shrink-0 text-xs ${classes.text}`} />
                      {t(key)}
                    </li>
                  ))}
                </ul>

                <Button
                  to={contactTopicPath(topic)}
                  variant={pkg.highlighted ? classes.button : "secondary"}
                  className="mt-8 w-full"
                >
                  {t("services:shared.package_cta")}
                  <span className="sr-only">: {t(pkg.titleKey)}</span>
                  <FaArrowRight aria-hidden="true" className="text-small" />
                </Button>
              </Card>
            </motion.li>
          );
        })}
      </motion.ul>

      <p className="max-w-2xl text-center text-small text-fg-muted">{t("services:shared.price_note")}</p>
    </Section>
  );
};

export default PackageCards;
