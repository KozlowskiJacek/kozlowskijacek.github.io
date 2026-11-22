import type { ComponentPropsWithoutRef, ElementType } from "react";

type CardElement = "div" | "article" | "li" | "button";

type CardProps<T extends CardElement> = {
  as?: T;
  /** Podniesienie i podświetlenie krawędzi na hover / focus. */
  interactive?: boolean;
} & ComponentPropsWithoutRef<T>;

const base = "rounded-2xl border border-border bg-surface-elevated shadow-card";

const interactiveClasses =
  "cursor-pointer transition-[transform,border-color,box-shadow] duration-300 ease-out " +
  "hover:border-accent/40 hover:shadow-lift motion-safe:hover:-translate-y-1 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** Powierzchnia treści: karta umiejętności, projektu, opinii. */
const Card = <T extends CardElement = "div">({
  as,
  interactive = false,
  className = "",
  ...props
}: CardProps<T>) => {
  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag
      className={`${base} ${interactive ? interactiveClasses : ""} ${className}`}
      {...(as === "button" ? { type: "button" } : {})}
      {...props}
    />
  );
};

export default Card;
