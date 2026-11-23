import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowUpRightFromSquare, FaChevronDown } from "react-icons/fa6";
import { EASE_OUT, reveal, staggerContainer, staggerItem } from "../../lib/animations";
import { career, type SkillGroup, type SkillItem } from "../../data/career";
import Badge from "../../components/ui/Badge";
import Card from "../../components/ui/Card";
import EmployerSection from "./EmployerSection";

const SkillBadge = ({ item }: { item: SkillItem }) => {
  const { t } = useTranslation();
  const label = "labelKey" in item ? t(item.labelKey) : item.label;

  return (
    <Badge className="px-2.5 py-1 text-small print:rounded-none print:border-0 print:p-0 print:!text-[8.5pt] print:font-normal">
      {label}
      {item.levelKey && <span className="ml-1 text-fg-muted">· {t(item.levelKey)}</span>}
    </Badge>
  );
};

/** Karta grupy stacku: lista technologii + opcjonalnie rozwijane szczegóły (opis, praktyka, certyfikaty). */
const StackGroupCard = ({ group }: { group: SkillGroup }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const detailsId = useId();
  const Icon = group.icon;
  const { details } = group;

  return (
    <Card className="flex h-full flex-col p-5 sm:p-6 print:flex-row print:items-baseline print:gap-2 print:rounded-none print:border-0 print:p-0">
      <div className="flex items-center gap-3 print:w-[30mm] print:shrink-0">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-accent/20 bg-accent/10 text-lg text-accent print:hidden">
          <Icon aria-hidden="true" />
        </span>
        <h3 className="text-h3 text-fg print:!text-[8.5pt] print:font-semibold print:leading-snug">{t(group.titleKey)}</h3>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2 print:mt-0 print:gap-x-1 print:gap-y-0">
        {group.items.map((item) => (
          <li
            key={"labelKey" in item ? item.labelKey : item.label}
            className="print:after:content-[','] print:last:after:content-none"
          >
            <SkillBadge item={item} />
          </li>
        ))}
      </ul>

      {details && (
        <div className="mt-auto pt-4 print:hidden">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={detailsId}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex items-center gap-2 rounded-sm text-small font-medium text-accent hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated"
          >
            {t(open ? "career:employer.stack.hide_details" : "career:employer.stack.show_details")}
            <FaChevronDown
              aria-hidden="true"
              className={`text-xs transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={detailsId}
                key="details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="overflow-hidden"
              >
                <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4 text-small text-fg-secondary">
                  <p>{t(details.textKey)}</p>
                  {details.highlight && (
                    <div className="rounded-lg border border-border bg-surface p-3">
                      <p className="font-medium text-fg">{t(details.highlight.titleKey)}</p>
                      <p className="mt-1">{t(details.highlight.textKey)}</p>
                    </div>
                  )}
                  {details.links.length > 0 && (
                    <ul className="flex flex-col gap-1.5">
                      {details.links.map((link) => (
                        <li key={link.href + link.labelKey}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-sm text-accent underline-offset-4 hover:text-accent-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                          >
                            {t(link.labelKey)}
                            <FaArrowUpRightFromSquare aria-hidden="true" className="text-[0.7em]" />
                            <span className="sr-only">{t("portfolio:case_study.new_tab")}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </Card>
  );
};

/** Stack pogrupowany tematycznie — bez pasków procentowych. */
const StackGroups = () => {
  const { t } = useTranslation();

  return (
    <EmployerSection
      id="stack"
      bg="secondary"
      title={t("career:employer.stack.title")}
      accent={t("career:employer.stack.accent")}
      text={t("career:employer.stack.text")}
    >
      <motion.ul
        className="grid items-start gap-4 md:grid-cols-2 xl:grid-cols-3 print:grid-cols-1 print:gap-y-0.5"
        variants={staggerContainer(0.05)}
        {...reveal}
      >
        {career.skillGroups.map((group) => (
          <motion.li key={group.id} variants={staggerItem}>
            <StackGroupCard group={group} />
          </motion.li>
        ))}
      </motion.ul>
    </EmployerSection>
  );
};

export default StackGroups;
