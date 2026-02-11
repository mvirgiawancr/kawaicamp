import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kawaii: {
          pink: "#FF6BB5",
          "pink-dark": "#E8559E",
          lavender: "#E0D7FF",
          babypink: "#FFD9EC",
          cream: "#FFF9F2",
          text: "#333333",
          success: "#4CAF50",
          error: "#F44336",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        kawaii: "12px",
      },
      boxShadow: {
        kawaii: "0 4px 20px rgba(255, 107, 181, 0.15)",
        "kawaii-lg": "0 8px 40px rgba(255, 107, 181, 0.2)",
        "kawaii-glow": "0 0 30px rgba(255, 107, 181, 0.3)",
      },
      animation: {
        "bounce-soft": "bounceSoft 0.5s ease-out",
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "scale-up": "scaleUp 0.2s ease-out",
        "shimmer": "shimmer 2s linear infinite",
        "pulse-pink": "pulsePink 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        bounceSoft: {
          "0%": { transform: "scale(0.95)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleUp: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulsePink: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 107, 181, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 107, 181, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
