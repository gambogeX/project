/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        twitter: '#1DA1F2',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};