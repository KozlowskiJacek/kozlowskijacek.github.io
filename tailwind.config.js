import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/intl-tel-input/**/*.js"],
  theme: {
    colors: {
      black: '#000000',
      white: '#ffffff',
      red: "#FF0000",
      bg_color_1: '#1f242d',
      bg_color_2: '#323946',
      main_accent: '#74FAC8',
      gray_200: '#e5e7eb',
      gray_400: '#9ca3af',
      gray_600: '#4b5563',
      gray_800: '#1f2937',
      accent_color_green: "#8ac186",
      accent_color_yellow: "#ffd47f",
      accent_color_pink: "#ffabc7",
      accent_color_purple: "#7868d8",
      accent_color_blue: "#154ec5",
      accent_color_orange: "#ff4d00",
    },
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
      },
      dropShadow: {
        'custom-glow': '0 0 20px #74FAC8',
      },
      boxShadow: {
        'custom-around': '0 0 5px #74FAC8', 
      }, 
      keyframes: {
        tada: {
          '0%': { transform: 'scale(1)' },
          '10%, 20%': { transform: 'scale(0.9) rotate(-3deg)' },
          '30%, 50%, 70%, 90%': { transform: 'scale(1.1) rotate(3deg)' },
          '40%, 60%, 80%': { transform: 'scale(1.1) rotate(-3deg)' },
          '100%': { transform: 'scale(1) rotate(0)' },
        },
        floatImage: {
          "0%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-2.4rem)",
          },
          "100%": {
            transform: "translateY(0)",
          }    
        },
        scroll: {
          "0%": {transform: "translateX(0)"},
          "100%": {transform: "translateX(calc(-250px * 4))"}
        },
        blink: {
          '0%, 50%': {opacity: 1},
          '51%, 100%': {opacity: 0},
        },
      },
      animation: {
        tada: 'tada 1s ease-in-out',
        floatImage: 'floatImage 5s ease-in-out infinite',
        scroll: "scroll 10s linear infinite",
        blink: 'blink 1s infinite',
      },
    },
  },
  plugins: [],
}

