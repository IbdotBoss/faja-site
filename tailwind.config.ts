import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        foreground: "var(--color-text)",
        accent: "var(--color-accent)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
      },
      transitionTimingFunction: {
        snap: "cubic-bezier(0.85, 0, 0.15, 1)",
      },
    },
  },
  plugins: [],
}
export default config
