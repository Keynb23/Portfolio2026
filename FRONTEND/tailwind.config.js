/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        diner: {
          black: "#050505",
          crimson: "#E61919",
          white: "#F5F5F5",
          silver: "#BEC0C2",
          graphite: "#1A1A1A",
        },
        "primary-accent": "#E61919",
        "secondary-accent": "#F5F5F5",
      },
      backgroundImage: {
        "gradient-hero":
          "linear-gradient(135deg, #0e051eff 0%, #c1baba 50%, #0c0239ff 100%)",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        gradient: "gradient 8s ease infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },

  plugins: [],
};
