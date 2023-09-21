/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      theme: {
        extend: {
          colors: {
            "brand-gray": {
              100: "#F0F0F0",
              200: "#D9D9D9",
              300: "#B3B3B3",
              400: "#8C8C8C",
              500: "#666666",
              600: "#4C4C4C",
              700: "#333333", // Provided color
              800: "#222222", // Provided color
              900: "#111111",
            },
            "brand-green": {
              100: "#E6F5E8",
              200: "#BFEBBF",
              300: "#99E096",
              400: "#73D46D",
              500: "#4CC844",
              600: "#419E3C",
              700: "#3A8648", // Provided color
              800: "#326F3F",
              900: "#2A5736",
            },
            gold: {
              100: "#FFF2E0",
              200: "#FFE2B1",
              300: "#FFD183",
              400: "#FFC055",
              500: "#FFAF28",
              600: "#E39D25",
              700: "#C08737", // Provided color
              800: "#9E702F",
              900: "#7C5927",
            },
            "brand-yellow": {
              100: "#FCFBE6",
              200: "#F9F8BF",
              300: "#F5F599",
              400: "#F1F373",
              500: "#EEF04C",
              600: "#DCE539",
              700: "#CFDE26", // Provided color
              800: "#BAC222",
              900: "#A5A71F",
            },
            red: {
              100: "#FFE5E5",
              200: "#FFBFBF",
              300: "#FF9999",
              400: "#FF7373",
              500: "#FF4C4C",
              600: "#F04343",
              700: "#EB2F2F", // Provided color
              800: "#D42727",
              900: "#BE1F1F",
            },
          },
        },
      },
    },
  },
  plugins: [],
};
