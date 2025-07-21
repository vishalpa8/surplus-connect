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
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        secondary: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
          950: "#422006",
        },
        accent: {
          DEFAULT: "#fafaf9",
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
          950: "#0c0a09",
        },
        // Keep standard UI colors
        success: colors.green,
        warning: colors.yellow,
        error: colors.red,
        gray: colors.gray,
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "system-ui",
          "-apple-system", 
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ],
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