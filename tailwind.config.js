/** @type {import('tailwindcss').Config} */
export default {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000000",
      white: "#ffffff",
      lightIndigo: "#e0e7ff",
      lightSlate: "#e2e8f0",
      lightOrange: "#fff7ed",
      lightPurple: "#f3e8ff",
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {},
  },
  plugins: [],
};
