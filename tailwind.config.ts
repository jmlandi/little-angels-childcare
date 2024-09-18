import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"League Spartan"', 'sans-serif'],
        schoolbell: ['"Schoolbell"', 'cursive'],
      },
      backgroundImage: {
        'cloud-white': 'url("/cloud-header.png")',
        'cloud-blue': 'url("/bg-cloud-blue.jpg")',
      }
    },
    colors: {
      'white': '#FFF',
      'black': '#000',
      'baby-blue': '#81CAEA',
      'baby-yellow': '#FBD87C', 
      'baby-cyan': '#D2FFFE',
    }
  },
  plugins: [],
};
export default config;
