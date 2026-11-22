import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Container from "./Container";

const backgrounds = {
  /** Tło strony. */
  primary: "bg-background",
  /** Lekko podniesiona powierzchnia — do przeplatania sekcji. */
  secondary: "bg-surface border-y border-border",
} as const;

const paddings = {
  default: "py-20 md:py-28",
  compact: "py-16 md:py-20",
  /** Pierwsza sekcja pod przezroczystym headerem. */
  hero: "min-h-[100svh] pt-28 pb-16 md:pt-36 md:pb-24",
} as const;

type SectionProps = Omit<ComponentPropsWithoutRef<"section">, "className"> & {
  /** Id sekcji — cel nawigacji i scroll-spy w Header. */
  id: string;
  bg?: keyof typeof backgrounds;
  padding?: keyof typeof paddings;
  /** Klasy kontenera treści (układ flex: kierunek, wyrównanie, odstępy). */
  className?: string;
  /** Warstwa dekoracyjna pod treścią (np. gradient), renderowana poza kontenerem. */
  backdrop?: ReactNode;
};

/** Sekcja strony: tło na całą szerokość + wyśrodkowany kontener flex z treścią. */
const Section = ({
  bg = "primary",
  padding = "default",
  className = "",
  backdrop,
  children,
  ...props
}: SectionProps) => (
  <section
    className={`relative isolate flex w-full scroll-mt-16 items-center overflow-hidden ${backgrounds[bg]} ${paddings[padding]}`}
    {...props}
  >
    {backdrop}
    <Container className={`flex items-center justify-center gap-10 md:gap-16 ${className}`}>
      {children}
    </Container>
  </section>
);

export default Section;
