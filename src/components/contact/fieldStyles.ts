/** Klasy pól tekstowych / selectów formularza; `invalid` podświetla błąd. */
export const fieldClasses = (invalid = false) =>
  [
    "w-full rounded-xl border bg-background px-4 py-3 text-body text-fg placeholder:text-fg-muted",
    "transition-[border-color,box-shadow] duration-200 ease-out focus:outline-none focus:ring-2",
    invalid
      ? "border-danger/70 focus:border-danger focus:ring-danger/20"
      : "border-border hover:border-border-strong focus:border-accent/60 focus:ring-accent/20",
  ].join(" ");

export const errorId = (id: string) => `${id}-error`;
