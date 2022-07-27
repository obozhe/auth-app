/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ba68c8',
        secondary: '#94a3b8',
        textPrimary: '#475569',
        error: '#d32f2f',
      },
    },
  },
  important: true,
  plugins: [],
};
