import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ColorPalette
        // https://colorhunt.co/palette/1d16168e1616d84040eeeeee
        // https://colorhunt.co/palette/fef9e1e5d0aca31d1d6d2323
        SC_Black: "#1D1616",
        SC_Red1: "#8E1616",
        SC_Red2: "#D84040",
        SC_Red3: "#A31D1D",
        SC_Red4: "#6D2323",
        SC_White: "#FEF9E1",
        SC_Cream1: "#E5D0AC",
        SC_Cream2: "#EEEEEE",
      },
    },
  },
  plugins: [],
} satisfies Config;
