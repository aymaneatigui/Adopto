/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["inter", "sans"],
      },
    },
    screens: {
      xs: { max: "350px" },
      sm: { max: "540px" },
      md: { max: "768px" },
      lg: { max: "1024px" },
      xl: { max: "1280px" },
    },
  },
  plugins: [forms],
};
