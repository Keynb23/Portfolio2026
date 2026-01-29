/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pacers: {
          navy: {
            light: "#1A4A7A",
            DEFAULT: "#002D62",
            dark: "#001A3D",
          },
          gold: {
            light: "#FFD167",
            DEFAULT: "#FDB927",
            dark: "#C88E1C",
          },
          silver: {
            light: "#D9DBDC",
            DEFAULT: "#BEC0C2",
            dark: "#8D9093",
          },
        },
      },
    },
  },
  plugins: [],
};
