/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2023-12-26 21:16:11
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2023-12-30 15:23:42
 * @FilePath: /experience-book/tailwind.config.js
 * @Description:
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,vue,js}'],
  theme: {
    spacing: Array.from({ length: 1000 }).reduce((map, _, index) => {
      map[index] = `${index}px`;
      return map;
    }, {}),
    colors: {
      blue: 'rgba(24 ,144 ,255,1)',
      black: 'rgba(31,51,73,1)',
      'black-85': 'rgba(31,51,73,0.85)',
      'black-65': 'rgba(31,51,73,0.65)',
      'black-45': 'rgba(31,51,73,0.45)',
      'black-25': 'rgba(31,51,73,0.25)',
      white: '#ffffff'
    },
    extend: {
      fontSize: [12, 14, 16, 18, 20, 24, 26, 28, 30, 32, 34, 36, 38, 40].reduce((acc, cur, index) => {
        acc[`size-${cur}`] = `${cur}px`;
        return acc;
      }, {}),
      // Array(5).fill(0).map((e,i)=>i+1)
      borderRadius: Array.from({ length: 20 }, (e, i) => i + 1).reduce((acc, cur, index) => {
        acc[`radius-${cur}`] = `${cur}px`;
        return acc;
      }, {})
    }
  },
  plugins: []
};
