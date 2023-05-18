/** @type {import('tailwindcss').Config} */
import TypographyPlugin from "@tailwindcss/typography"

export default {
  darkMode: "class",
  content: ["./index.ts.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [TypographyPlugin],
}
