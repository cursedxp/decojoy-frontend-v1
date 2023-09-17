/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#333333",
        secondary: "#CCCCCC",
        white: "#FFFFFF",
        accent: "#C08737",
        dark: "#222222",
        gray: "#363636",
        green: "#5E732F",
      },
    },
  },
  plugins: [],
};
