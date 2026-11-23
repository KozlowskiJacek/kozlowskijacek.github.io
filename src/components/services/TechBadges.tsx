import { motion } from "framer-motion";
import { fadeIn, reveal } from "../../lib/animations";
import type { SectionCopy, ServiceTone, TechGroup } from "../../data/services/types";
import { useTranslation } from "react-i18next";
import Section from "../ui/Section";
import Badge from "../ui/Badge";
import ServiceSectionHeader from "./ServiceSectionHeader";

type TechBadgesProps = {
  id: string;
  copy: SectionCopy;
  groups: TechGroup[];
  tone: ServiceTone;
  bg?: "primary" | "secondary";
};

/** Technologie pogrupowane w wiersze etykiet (Badge). */
const TechBadges = ({ id, copy, groups, tone, bg = "primary" }: TechBadgesProps) => {
  const { t } = useTranslation();

  return (
    <Section id={id} bg={bg} className="flex-col">
      <ServiceSectionHeader copy={copy} tone={tone} />

      <motion.dl className="grid w-full max-w-4xl gap-6 sm:grid-cols-2" variants={fadeIn("bottom", 0.1)} {...reveal}>
        {groups.map((group) => (
          <div key={group.id} className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-card">
            <dt className="text-small font-semibold uppercase tracking-wider text-fg-muted">{t(group.labelKey)}</dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item} tone={tone}>
                  {item}
                </Badge>
              ))}
            </dd>
          </div>
        ))}
      </motion.dl>
    </Section>
  );
};

export default TechBadges;
