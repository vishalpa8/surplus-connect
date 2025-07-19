/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f4f9f4",
          100: "#e8f3e9",
          200: "#d1e7d3",
          300: "#badab8",
          400: "#a3cd9c",
          500: "#8cc081",
          600: "#74b366",
          700: "#5f9a52",
          800: "#4a7b40",
          900: "#355c2e",
        },
        secondary: {
          50: "#fff8f1",
          100: "#feecdc",
          200: "#fcd9bd",
          300: "#fdba8c",
          400: "#ff8a4c",
          500: "#ff5a1f",
          600: "#d03801",
          700: "#b43403",
          800: "#8a2c0d",
          900: "#771d1d",
        },
        accent: {
          DEFAULT: "#f8f7f4",
          ...colors.stone,
        },
        // Keep standard UI colors
        success: colors.green,
        warning: colors.yellow,
        error: colors.red,
        gray: colors.gray,
      },
      fontFamily: {
        sans: [
          "var(--font-nunito)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1.16" }],
        "6xl": ["3.75rem", { lineHeight: "1.12" }],
      },
      spacing: {
        18: "4.5rem",
        112: "28rem",
        120: "30rem",
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "fade-out": "fade-out 0.5s ease-in",
        "slide-up": "slide-up 0.3s ease-out",
        "slide-down": "slide-down 0.3s ease-in",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "slide-up": {
          "0%": { transform: "translateY(0.5rem)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-0.5rem)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      boxShadow: {
        "soft-xs": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "soft-sm":
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
        soft: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        "soft-md":
          "0 6px 10px -1px rgba(0, 0, 0, 0.1), 0 2px 6px -2px rgba(0, 0, 0, 0.1)",
        "soft-lg":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        "soft-xl":
          "0 15px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        xl: "1rem", // increased from 0.75rem
        "2xl": "1.5rem", // increased from 1rem
        "3xl": "2rem", // increased from 1.5rem
        "4xl": "2.5rem", // increased from 2rem
      },
    },
  },
  plugins: [
    forms({ strategy: "class" }),
    typography,
  ],
};