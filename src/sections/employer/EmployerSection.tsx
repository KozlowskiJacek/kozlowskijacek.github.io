import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeIn, reveal } from "../../lib/animations";
import Section from "../../components/ui/Section";
import SectionHeading from "../../components/ui/SectionHeading";

type EmployerSectionProps = {
  id: string;
  title: ReactNode;
  accent: ReactNode;
  /** Krótki opis pod nagłówkiem. */
  text?: ReactNode;
  bg?: "primary" | "secondary";
  children: ReactNode;
};

/** Sekcja CV: nagłówek wyrównany do lewej + treść na pełną szerokość kontenera. */
const EmployerSection = ({ id, title, accent, text, bg, children }: EmployerSectionProps) => (
  <Section
    id={id}
    bg={bg}
    padding="compact"
    className="flex-col items-stretch !gap-8 md:!gap-10 print:!gap-1.5 print:!px-0"
  >
    <motion.div variants={fadeIn("bottom")} {...reveal}>
      <SectionHeading title={title} accent={accent} className="print:border-b print:pb-0.5 print:!text-[12pt]" />
      {text && <p className="mt-3 max-w-2xl text-body text-fg-secondary print:hidden">{text}</p>}
    </motion.div>
    {children}
  </Section>
);

export default EmployerSection;
