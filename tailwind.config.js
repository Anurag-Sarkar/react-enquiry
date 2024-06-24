/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        neue: ["NeueMachina", "sans-serif"], // Add your custom font here
      },
      colors: {
        brand: {
          DEFAULT: '#24CFA6',
        },
        // Add more custom colors as needed
      },
      backgroundColor: {
        'brand':'#24CFA6'
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
};
