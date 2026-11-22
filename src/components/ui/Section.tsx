import type { ComponentPropsWithoutRef } from "react";

const backgrounds = {
  primary: "bg-bg_color_1",
  secondary: "bg-bg_color_2",
} as const;

const paddings = {
  default: "pt-[100px] px-[9%] py-[20px]",
  compact: "pt-[50px] px-4",
} as const;

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  /** Id sekcji — cel nawigacji i scroll-spy w Header. */
  id: string;
  bg?: keyof typeof backgrounds;
  padding?: keyof typeof paddings;
};

/** Pełnoekranowa sekcja strony z wyśrodkowaną zawartością (flex). */
const Section = ({
  bg = "primary",
  padding = "default",
  className = "",
  children,
  ...props
}: SectionProps) => (
  <section
    className={`${backgrounds[bg]} flex justify-center items-center min-h-screen w-full ${paddings[padding]} ${className}`}
    {...props}
  >
    {children}
  </section>
);

export default Section;
