import defaultTheme from "tailwindcss/defaultTheme";

/** Kolor z motywu: kanały RGB w zmiennej CSS `--color-<name>` (src/index.css). */
const token = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      /*
       * Semantyczne tokeny kolorów. Wartości (kanały RGB) są zmiennymi CSS w src/index.css —
       * osobno dla motywu ciemnego i jasnego (`data-theme` na <html>). Format
       * `rgb(var(--color-x) / <alpha-value>)` zachowuje modyfikatory przezroczystości (`bg-accent/10`).
       * Kontrasty (WCAG AA) są opisane przy obu paletach w index.css.
       */
      colors: {
        background: token("background"),
        surface: {
          DEFAULT: token("surface"),
          elevated: token("surface-elevated"),
        },
        border: {
          DEFAULT: token("border"),
          strong: token("border-strong"),
        },
        fg: {
          DEFAULT: token("fg"),
          secondary: token("fg-secondary"),
          muted: token("fg-muted"),
        },
        accent: {
          DEFAULT: token("accent"),
          hover: token("accent-hover"),
          muted: token("accent-muted"),
          contrast: token("accent-contrast"),
        },
        /** Drugi akcent — filar wideo / social media. */
        video: {
          DEFAULT: token("video"),
          hover: token("video-hover"),
          muted: token("video-muted"),
        },
        danger: token("danger"),
        /** Paleta wydruku (CV na białym papierze). */
        print: {
          ink: "#111827",
          muted: "#4B5563",
          line: "#D1D5DB",
          accent: "#0F766E",
        },
        rating: token("rating"),
      },
      boxShadow: {
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)",
      },
      fontFamily: {
        sans: ["Inter Variable", "Inter", ...defaultTheme.fontFamily.sans],
        display: ["Space Grotesk Variable", "Space Grotesk", "Inter Variable", ...defaultTheme.fontFamily.sans],
      },
      /** Skala typograficzna: [rozmiar, { lineHeight, letterSpacing, fontWeight }]. */
      fontSize: {
        display: [
          "clamp(2.5rem, 1.6rem + 4vw, 4.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "600" },
        ],
        h1: [
          "clamp(2.25rem, 1.7rem + 2.4vw, 3.5rem)",
          { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "600" },
        ],
        h2: [
          "clamp(1.875rem, 1.5rem + 1.6vw, 2.75rem)",
          { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        h3: [
          "clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)",
          { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        "body-lg": ["1.125rem", { lineHeight: "1.75rem" }],
        body: ["1rem", { lineHeight: "1.625rem" }],
        small: ["0.875rem", { lineHeight: "1.375rem" }],
      },
      keyframes: {
        blink: {
          "0%, 50%": { opacity: 1 },
          "51%, 100%": { opacity: 0 },
        },
        /** Wejście treści nad zgięciem — w CSS, więc działa w HTML z prerenderingu przed hydratacją. */
        enter: {
          from: { opacity: 0, transform: "translateY(16px)" },
          to: { opacity: 1, transform: "none" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        enter: "enter 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};
