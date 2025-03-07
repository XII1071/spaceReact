/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark', 'cupcake']
  }
}

/* 
import daisyui from "daisyui"
export default {
  //...
  plugins: [
    daisyui,
  ],
}
*/

// module.exports = {
//   content: [
//     './src/**/*.{html,js,jsx,ts,tsx}', // 프로젝트에 맞게 경로를 설정하세요
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('daisyui'),
//   ],
//   daisyui: {
//     themes: ['light', 'dark'], // 원하는 테마를 설정하세요
//   },
// };
