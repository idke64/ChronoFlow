import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: "8px",
      },
      colors: {
        surface: {
          100: "#0e0e10",
          200: "#2a2a2a",
          300: "#333333",
          400: "#3d3d3d",
          500: "#454545",
          600: "#4d4d4d",
          700: "#555555",
          800: "#1a1a1a",
          900: "#121212",
          950: "#0a0a0a",
        },
        text: {
          primary: "#f5f5f5" /* Main text color for the darkest surfaces */,
          secondary: "#cfcfcf" /* Slightly muted text for secondary content */,
          muted: "#a8a8a8" /* Muted gray for placeholder or subtle hints */,
          light: "#e0e0e0" /* Light text for surfaces like surface-100 */,
          accent:
            "#ff8a65" /* Accent text for interactive elements like links or buttons */,
          error: "#ff6b6b" /* Error text for validation */,
          warning: "#f4c542" /* Warning or caution text */,
          success: "#81c784" /* Success messages or highlights */,
          info: "#4fc3f7" /* Information or highlight text */,
        },
        palette: {
          100: "#8D05DD",
          200: "#5D59EC",
          300: "2EAAFA",
        },
      },
    },
  },
  plugins: [],
};
export default config;
