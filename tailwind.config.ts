import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  headerSize: "140px",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "128": "32rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {},
      themes: {
        alienware: {
          extend: "dark", // <- inherit default values from dark theme
          colors: {
            background: "#222",
            foreground: "#ffffff",
            default: {
              // DEFAULT: "#000fff",
              // foreground: "#111",
            },
            primary: {
              DEFAULT: "#888",
              foreground: "#ffffff",
              50: "#595959",
              100: "#666666",
              200: "#737373",
              300: "#808080",
              400: "#8c8c8c",
              500: "#999999",
              600: "#a6a6a6",
              700: "#b3b3b3",
              800: "#bfbfbf",
              900: "#cccccc",
            },
            focus: "#444",
          },
          layout: {
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
        "event-station": {
          extend: "dark", // <- inherit default values from dark theme
          colors: {
            background: "#0D001A",
            foreground: "#ddd",
            default: {
              DEFAULT: "#DD62ED",
              foreground: "#ffffff",
            },
            secondary: {
              DEFAULT: "#9450FF",
            },
            primary: {
              50: "#3B096C",
              100: "#520F83",
              200: "#7318A2",
              300: "#9823C2",
              400: "#c031e2",
              500: "#DD62ED",
              600: "#F182F6",
              700: "#FCADF9",
              800: "#FDD5F9",
              900: "#FEECFE",
              DEFAULT: "#DD62ED",
              foreground: "#ffffff",
            },
            focus: "#F182F6",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
        light: {},
        dark: {},
      },
    }),
  ],
};
export default config;
