// ./src/tailwind.config.js
const {
  colors,
  fontWeight,
  fontSize,
  borderWidth,
  // textColor,
} = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    borderWidth: {
      ...borderWidth,
      '2': '1px',
    },
    screens: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '2000px',
    },
    fontFamily: {
      body: ['Prompt', 'Helvetica', 'Arial', 'sans-serif'],
      display: ['Oswald', 'Helvetica', 'Arial', 'sans-serif']
    },
    fontWeight: {
      ...fontWeight,
      regular: 500,
      bold: 700,
    },
    fontSize: {
      ...fontSize,
      xs: '10px',
      sml: '12px',
      '4xl': '2.5rem',
      hyooge: '64px',
    },
    colors: {
      ...colors,
      'pale-grey': '#efeefe',
      'subtle-grey': '#d8d8d8',
      'grey': '#7b7b7b',
      'light-grey': '#f8f8f9',
      green: {
        ...colors.green,
        '400': '#2bab6e',
        '500': '#00bb75',
        'golf-green': '#2bb673',
        viridian: '#1f8252',
        'bright-green': '#09c47d',
      },
      purple: {
        '100': '#02001a',
        '200': '#02001a',
        '300': '#15122f',
        '400': '#26225d',
      },
      'dark-orange': '#fb923c',
      'dark-fuschia': '#d361ff',
      red: '#ff4059',
      'error-red': '#ff296e',
      cornflower: '#655bf5',
      blueberry: '#3a348f',
      'pale-blue': '#e7e6ff',
      'itas-lavender': '#4f47c2',
      'itas-dark-purple': '#26225d',
      'dark-indigo': '#3a338f',
      'ps-lavender': '#867eff',
      yellow: {
        'itas-cream-yellow': '#ffe296',
        'itas-dark-gold': '#ffc530',
        'itas-gold': '#ffd363',
      },
    },
  },
};
