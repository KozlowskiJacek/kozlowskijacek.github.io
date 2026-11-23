import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

const sizes = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
} as const;

const tones = {
  accent: "text-accent",
  video: "text-video",
} as const;

const aligns = {
  left: "text-left",
  center: "text-center",
} as const;

type SectionHeadingProps = Omit<HTMLMotionProps<"h2">, "title" | "children"> & {
  /** Znacznik HTML (semantyka). Wygląd ustawia `size`. */
  as?: "h1" | "h2" | "h3";
  size?: keyof typeof sizes;
  /** Kolor wyróżnionej części — `video` dla filaru wideo. */
  tone?: keyof typeof tones;
  align?: keyof typeof aligns;
  /** Pierwsza część tytułu. */
  title: ReactNode;
  /** Wyróżniona (akcentowa) część tytułu. */
  accent: ReactNode;
  /** Opcjonalna treść za akcentem, np. emoji. */
  children?: ReactNode;
};

const tags = { h1: motion.h1, h2: motion.h2, h3: motion.h3 } as const;

/** Nagłówek „tytuł + akcent”, opcjonalnie animowany propsami framer-motion. */
const SectionHeading = ({
  as = "h2",
  size = "h2",
  tone = "accent",
  align = "left",
  title,
  accent,
  children,
  className = "",
  ...props
}: SectionHeadingProps) => {
  const Tag = tags[as];

  return (
    <Tag className={`text-balance font-display text-fg ${sizes[size]} ${aligns[align]} ${className}`} {...props}>
      {title} <span className={tones[tone]}>{accent}</span>
      {children}
    </Tag>
  );
};

export default SectionHeading;
