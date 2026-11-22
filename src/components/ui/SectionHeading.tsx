import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type SectionHeadingProps = Omit<HTMLMotionProps<"h2">, "title" | "children"> & {
  as?: "h2" | "h3";
  /** Pierwsza część tytułu. */
  title: ReactNode;
  /** Wyróżniona (akcentowa) część tytułu. */
  accent: ReactNode;
  /** Opcjonalna treść za akcentem, np. emoji. */
  children?: ReactNode;
};

/** Nagłówek „tytuł + akcent”, opcjonalnie animowany propsami framer-motion. */
const SectionHeading = ({ as = "h2", title, accent, children, ...props }: SectionHeadingProps) => {
  const Tag = as === "h3" ? motion.h3 : motion.h2;

  return (
    <Tag {...props}>
      {title} <span className="text-main_accent">{accent}</span>
      {children}
    </Tag>
  );
};

export default SectionHeading;
