/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {}
  },
  safelist: [{pattern: /^line-clamp-(\d+)$/}],
  plugins: [require('daisyui')]
}
