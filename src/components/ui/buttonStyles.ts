export type ButtonVariant = "primary" | "video" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium cursor-pointer select-none " +
  "transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary:
    "rounded-full bg-accent text-accent-contrast shadow-card hover:bg-accent-hover hover:shadow-lift motion-safe:hover:-translate-y-0.5",
  /** Główny przycisk na podstronie wideo (drugi akcent). */
  video:
    "rounded-full bg-video text-background shadow-card hover:bg-video-hover hover:shadow-lift motion-safe:hover:-translate-y-0.5",
  secondary:
    "rounded-full border border-border-strong bg-surface/60 text-fg hover:border-accent/50 hover:bg-surface-elevated",
  ghost: "rounded-sm text-accent underline-offset-4 hover:text-accent-hover hover:underline",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-small",
  md: "h-11 px-6 text-body",
  lg: "h-12 px-7 text-body-lg",
};

/** Klasy przycisku — także dla elementów, które nie mogą być komponentem `Button` (np. `<input type="submit">`). */
export const buttonClasses = ({
  variant = "primary",
  size = "md",
  className = "",
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) =>
  [base, variants[variant], variant === "ghost" ? "" : sizes[size], className].filter(Boolean).join(" ");
