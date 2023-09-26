import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-manrope)"]
    },
    screens: {
      /*
        Whenever you update this object make sure you check the literal values used in:
          - RootCategoryCard
          - CustomImage
      */
      tabAndUp: "45rem", // 720px 
      laptopAndUp: "69.375rem" // 1110px
    },
    extend: {
      borderRadius: {
        "2": "0.5rem",
        "inherit": "inherit"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // Format
        // <COLOR_NAME_ASSIGNED_BY_ME>: <COLOR_HEX_VALUE>[,] // <OFFICIAL_COLOR_NAME>
        "dark-orange": "#D87D4A", // seraphim sepia
        "chaos-black": "#101010", // chaos black
        "grayish-white": "#F1F1F1", // beluga
        "almost-white": "#FAFAFA", // dr. white
        "black-suede": "#434343", // black suede
        "light-orange": "#FBAF85", // slice pink
        "thamar-black": "#191919", // thamar black
        "white": "#FFFFFF", // white
        "black": "#000000", // black
        "argent": "#888888",  // argent
        "dark-red": "#CD2C2C", // hot lips
        "shady-character": "#4C4C4C", // shady character
        "american-silver": "#CFCFCF", // american silver
        "platinum-granite": "#7F7F7F" // platinum granite
      }
    },
  },
  plugins: [],
}
export default config
