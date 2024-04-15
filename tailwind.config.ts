import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ['selector', '[data-joy-color-scheme="dark"]'],
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
      }
    }
  },
  plugins: [],
};
export default config;
