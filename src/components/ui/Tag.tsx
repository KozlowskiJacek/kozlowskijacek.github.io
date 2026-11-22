import type { ComponentPropsWithoutRef } from "react";

const dots = {
  accent: "bg-accent",
  video: "bg-video",
  muted: "bg-fg-muted",
} as const;

type TagProps = ComponentPropsWithoutRef<"span"> & {
  /** Kolorowa kropka przed tekstem. */
  dot?: keyof typeof dots;
};

/** Zaokrąglona etykieta kategorii / statusu (np. „Web”, „Wideo”). */
const Tag = ({ dot, className = "", children, ...props }: TagProps) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-small text-fg-secondary ${className}`}
    {...props}
  >
    {dot && <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dots[dot]}`} />}
    {children}
  </span>
);

export default Tag;
