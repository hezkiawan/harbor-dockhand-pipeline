import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        kouventa: {
          bg: "#18181b",
          sidebar: "#09090b",
          card: "#27272a",
          green: "#22c55e",
          textMuted: "#a1a1aa",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;