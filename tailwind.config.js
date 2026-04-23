/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F3F3F0",
        black: "#141515",
        white: "#F3F3F0",
        yellow: "#D7792B",
        orange: "#D7792B",
        green: "#659941",
        red: "#D7792B",
        slate: "#4E5861",
      },
      fontFamily: {
        coffee: ["'New Year Coffee'", "sans-serif"],
        sans: ["'Poppins'", "sans-serif"],
      },
      boxShadow: {
        hard: "5px 5px 0 #141515",
        "hard-lg": "9px 9px 0 #141515",
        "hard-sm": "3px 3px 0 #141515",
      },
      borderWidth: {
        3: "3px",
      },
      animation: {
        "scroll-ticker": "tscroll 28s linear infinite",
        "float-bob": "float-bob 3s ease-in-out infinite",
        "hero-float": "hero-float 4s ease-in-out infinite",
        "title-bounce": "title-bounce 4s ease-in-out infinite",
        "footer-wiggle": "footer-wiggle 4s ease-in-out infinite",
        "kol-pop": "kol-pop 3.5s ease-in-out infinite",
        "kon-wave": "kon-wave 2.5s ease-in-out infinite",
        "pulse-dot": "pulse 2s infinite",
        "badge-fade": "badge-fade 2s ease-in-out infinite",
        "page-in": "pgIn 0.3s ease both",
      },
    },
  },
  plugins: [],
};
