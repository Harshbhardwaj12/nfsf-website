import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#14532D",
          900: "#0C1F14",
          950: "#071A0D",
        },
        earth: {
          400: "#D97706",
          500: "#B45309",
          600: "#92400E",
        },
        mist: {
          50:  "#F0FDF4",
          100: "#ECFDF5",
        },
      },
      fontFamily: {
        serif:  ["Playfair Display", "Georgia", "serif"],
        sans:   ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 4.5vw, 3.5rem)",  { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
      },
      animation: {
        "float-slow":   "floatUp 12s ease-in-out infinite",
        "float-medium": "floatUp 8s ease-in-out infinite 3s",
        "float-fast":   "floatUp 6s ease-in-out infinite 1.5s",
        "count-up":     "countUp 0.6s ease-out forwards",
        "fade-up":      "fadeUp 0.7s ease-out forwards",
        "fade-in":      "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        floatUp: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)", opacity: "0.4" },
          "50%":      { transform: "translateY(-40px) rotate(15deg)", opacity: "0.7" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
      },
      backgroundImage: {
        "forest-gradient": "linear-gradient(135deg, #0C1F14 0%, #14532D 50%, #15803D 100%)",
        "hero-gradient":   "radial-gradient(ellipse 80% 60% at 60% 40%, #16A34A22 0%, transparent 70%)",
      },
      boxShadow: {
        "green-glow": "0 0 40px rgba(21, 128, 61, 0.15)",
        "card":       "0 1px 3px rgba(12, 31, 20, 0.08), 0 8px 24px rgba(12, 31, 20, 0.06)",
        "card-hover": "0 4px 12px rgba(12, 31, 20, 0.12), 0 16px 40px rgba(12, 31, 20, 0.1)",
      },
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
  plugins: [],
};

export default config;
