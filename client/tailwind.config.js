/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#7DC6FF",
          normal: "#35A6FF",
          dark: "#1F69A2",
        },
      },
    },
  },
  plugins: [],
};
