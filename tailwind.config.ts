import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        bg2: "var(--color-bg2)",
        surface: "var(--color-surface)",
        surface2: "var(--color-surface2)",
        accent: "var(--color-accent)",
        accent2: "var(--color-accent2)",
        text: "var(--color-text)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
      },
    },
  },
  plugins: [],
};

export default config;