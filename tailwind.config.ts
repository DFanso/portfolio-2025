import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        yellow: "var(--yellow)",
        green: "var(--green)",
        blue: "var(--blue)",
        purple: "var(--purple)",
        pink: "var(--pink)",
        accent: "var(--accent)",
        'card-bg': "var(--card-bg)",
      },
    },
  },
  plugins: [],
} satisfies Config;
