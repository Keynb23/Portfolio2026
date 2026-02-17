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
           'dark-purple': '#28043f',
           'light-burgundy': '#1e0505',
           'warm-grey': '#c1baba',
      },      
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #1e0505 0%, #c1baba 50%, #28043f 100%)',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        gradient: 'gradient 8s ease infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },

  plugins: [],
}};
