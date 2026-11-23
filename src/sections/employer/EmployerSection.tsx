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
  <Section id={id} bg={bg} padding="compact" className="flex-col items-stretch !gap-8 md:!gap-10">
    <motion.div variants={fadeIn("bottom")} {...reveal}>
      <SectionHeading title={title} accent={accent} />
      {text && <p className="mt-3 max-w-2xl text-body text-fg-secondary">{text}</p>}
    </motion.div>
    {children}
  </Section>
);

export default EmployerSection;
