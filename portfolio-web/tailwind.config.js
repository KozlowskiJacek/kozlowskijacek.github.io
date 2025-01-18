/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      black: '#000000',
      white: '#ffffff',
      bg_color_1: '#1f242d',
      bg_color_2: '#323946',
      main_accent: '#74FAC8',
      gray_200: '#e5e7eb',
      gray_400: '#9ca3af',
      gray_600: '#4b5563',
      gray_800: '#1f2937',
    },
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
      },
      dropShadow: {
        'custom-glow': [
          '0 0 20px #74FAC8',
        ] 
      }
    },
  },
  plugins: [],
}

