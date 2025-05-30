/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        coral: {
          500: "#FF6B6B",
          600: "#FF5A5A",
        },
      },
    },
  },
  plugins: [],
};
