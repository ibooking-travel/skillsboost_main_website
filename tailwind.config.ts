import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Sora'", "'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        brand: {
          50: "#ecf3fb",
          100: "#d6e5f6",
          200: "#add0ed",
          300: "#84bbe5",
          400: "#5ba6dc",
          500: "#3291d3",
          600: "#0052a3",
          700: "#003d7a",
          800: "#002952",
          900: "#001a34",
          950: "#000f1a",
        },
        orange: {
          50: "#fef6f1",
          100: "#fce8dd",
          200: "#f7d1bc",
          300: "#f2b99a",
          400: "#ed9f6f",
          500: "#e87d44",
          600: "#d46530",
          700: "#c85a1d",
          800: "#934611",
          900: "#6a3209",
          950: "#451f05",
        },
        amber: {
          400: "#fbbf24",
          500: "#f59e0b",
        },
        rose: {
          400: "#fb7185",
          500: "#f43f5e",
        },
      },
      backgroundImage: {
        "mesh-light": "radial-gradient(at 40% 20%, hsla(200,100%,93%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(25,100%,93%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(210,100%,95%,1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(15,100%,95%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(200,100%,96%,1) 0px, transparent 50%)",
        "glass-card": "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 100%)",
        "cta-gradient": "linear-gradient(135deg, #003d7a 0%, #c85a1d 50%, #0052a3 100%)",
      },
      boxShadow: {
        "glass-sm": "0 2px 8px rgba(0,0,0,0.04), 0 0 0 1px rgba(255,255,255,0.8), inset 0 1px 0 rgba(255,255,255,1)",
        "glass-md": "0 8px 32px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.9), inset 0 1px 0 rgba(255,255,255,1)",
        "glass-lg": "0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.9)",
        "glass-xl": "0 32px 80px rgba(0,0,0,0.10), 0 0 0 1px rgba(255,255,255,0.95)",
        "blue-glow": "0 8px 40px rgba(0,82,163,0.25)",
        "blue-glow-lg": "0 16px 60px rgba(0,82,163,0.35)",
        "card-hover": "0 24px 64px rgba(0,0,0,0.12)",
        "soft": "0 4px 16px rgba(0,0,0,0.05)",
        "soft-lg": "0 12px 40px rgba(0,0,0,0.08)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "shimmer": "shimmer 2.5s infinite",
        "scale-in": "scaleIn 0.3s cubic-bezier(0.4,0,0.2,1)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-12px) rotate(1deg)" },
          "66%": { transform: "translateY(-6px) rotate(-1deg)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      backdropBlur: {
        "glass": "24px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
