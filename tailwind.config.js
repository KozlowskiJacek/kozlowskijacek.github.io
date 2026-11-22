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

        // Kolory legacy — do usunięcia po migracji sekcji na tokeny.
        button: "#C91F38",
        bg_color_1: "#1f242d",
        bg_color_2: "#323946",
        main_accent: "#74FAC8",
        gray_200: "#e5e7eb",
        gray_400: "#9ca3af",
        gray_600: "#4b5563",
        gray_800: "#1f2937",
        accent_color_green: "#8ac186",
        accent_color_yellow: "#ffd47f",
        accent_color_pink: "#ffabc7",
        accent_color_purple: "#7868d8",
        accent_color_blue: "#154ec5",
        accent_color_orange: "#ff4d00",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(0 0 0 / 0.3), 0 8px 24px -12px rgb(0 0 0 / 0.5)",
        lift: "0 2px 4px 0 rgb(0 0 0 / 0.3), 0 20px 40px -16px rgb(0 0 0 / 0.6)",
        "custom-around": "0 0 5px #74FAC8",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
      },
      dropShadow: {
        "custom-glow": "0 0 20px #74FAC8",
      },
      keyframes: {
        tada: {
          "0%": { transform: "scale(1)" },
          "10%, 20%": { transform: "scale(0.9) rotate(-3deg)" },
          "30%, 50%, 70%, 90%": { transform: "scale(1.1) rotate(3deg)" },
          "40%, 60%, 80%": { transform: "scale(1.1) rotate(-3deg)" },
          "100%": { transform: "scale(1) rotate(0)" },
        },
        floatImage: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2.4rem)" },
          "100%": { transform: "translateY(0)" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-250px * 4))" },
        },
        blink: {
          "0%, 50%": { opacity: 1 },
          "51%, 100%": { opacity: 0 },
        },
      },
      animation: {
        tada: "tada 1s ease-in-out",
        floatImage: "floatImage 5s ease-in-out infinite",
        scroll: "scroll 10s linear infinite",
        blink: "blink 1s infinite",
      },
    },
  },
  plugins: [],
};
