import type { ComponentPropsWithoutRef } from "react";

const tones = {
  neutral: "border-border-strong bg-surface text-fg-secondary",
  accent: "border-accent/25 bg-accent/10 text-accent",
  video: "border-video/25 bg-video/10 text-video",
} as const;

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  tone?: keyof typeof tones;
};

/** Mała prostokątna etykieta, np. technologia w tech stacku projektu. */
const Badge = ({ tone = "neutral", className = "", ...props }: BadgeProps) => (
  <span
    className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium tracking-wide ${tones[tone]} ${className}`}
    {...props}
  />
);

export default Badge;
