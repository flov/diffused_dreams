import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
        light: {},
        dark: {
          layout: {},
          colors: {
            primary: {
              DEFAULT: process.env.PRIMARY_COLOR || "#fff",
              foreground: process.env.BACKGROUND_COLOR || "#000",
            },
            secondary: {
              DEFAULT: "#000",
              foreground: "#fff",
            },
            focus: "#1499ff",
            background: "#222",
          },
        },
      },
    }),
  ],
};
export default config;
