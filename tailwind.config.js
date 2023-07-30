/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // extend: {
    //   backgroundImage: {
    //     'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    //     'gradient-conic':
    //       'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    //   },
    // },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake", {
      // #94c42c
      // #2ca3dc
      // #fbbc14
      // #98b040
      // #ccb07c
      // #64b0a8
      // #2cb0e0
      sobrian: {

        "primary": "#94c42c",
        "primary-focus": "#98b040",
        "secondary": "#2ca3dc",
        "secondary-focus": "#2cb0e0",

        "accent": "#fbbc14",
        "accent-focus": "#ccb07c",

        "neutral": "#262438",

        "base-100": "#2e3038",

        "info": "#728fe3",

        "success": "#51e6a3",

        "warning": "#e78e08",

        "error": "#fc5a62",
      },
    },],
  },
  plugins: [require("daisyui")],
}
