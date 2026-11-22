import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      /*
       * Semantyczne tokeny kolorów. Kontrast tekstu (WCAG AA, ≥ 4.5:1):
       *   fg           na background ≈ 16.3:1, na surface-elevated ≈ 14.4:1
       *   fg-secondary na background ≈ 9.1:1,  na surface-elevated ≈ 8.0:1
       *   fg-muted     na background ≈ 5.3:1,  na surface-elevated ≈ 4.7:1
       *   accent / video / danger na surface-elevated ≥ 7.5:1
       *   background   na accent ≈ 14.9:1, na video ≈ 11.3:1 (tekst na przyciskach)
       */
      colors: {
        background: "#0B0F14",
        surface: {
          DEFAULT: "#10151C",
          elevated: "#171D26",
        },
        border: {
          DEFAULT: "#1F2731",
          strong: "#2E3845",
        },
        fg: {
          DEFAULT: "#E8EDF2",
          secondary: "#A9B4C0",
          muted: "#7D8896",
        },
        accent: {
          DEFAULT: "#74FAC8",
          hover: "#A3FBDB",
          muted: "#3FAF8A",
          contrast: "#04140E",
        },
        /** Drugi akcent — filar wideo / social media. */
        video: {
          DEFAULT: "#FFB86B",
          hover: "#FFCB91",
          muted: "#C98A45",
        },
        danger: "#FF8A9B",
        rating: "#FFD47F",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(0 0 0 / 0.3), 0 8px 24px -12px rgb(0 0 0 / 0.5)",
        lift: "0 2px 4px 0 rgb(0 0 0 / 0.3), 0 20px 40px -16px rgb(0 0 0 / 0.6)",
      },
      fontFamily: {
        sans: ["Inter Variable", "Inter", ...defaultTheme.fontFamily.sans],
        display: ["Space Grotesk Variable", "Space Grotesk", "Inter Variable", ...defaultTheme.fontFamily.sans],
      },
      /** Skala typograficzna: [rozmiar, { lineHeight, letterSpacing, fontWeight }]. */
      fontSize: {
        display: ["clamp(2.5rem, 1.6rem + 4vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "600" }],
        h1: ["clamp(2.25rem, 1.7rem + 2.4vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "600" }],
        h2: ["clamp(1.875rem, 1.5rem + 1.6vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
        h3: ["clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75rem" }],
        body: ["1rem", { lineHeight: "1.625rem" }],
        small: ["0.875rem", { lineHeight: "1.375rem" }],
      },
      keyframes: {
        blink: {
          "0%, 50%": { opacity: 1 },
          "51%, 100%": { opacity: 0 },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
