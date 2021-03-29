module.exports = {
  purge: ['./src/**/*.{vue,js}'],
  darkMode: false,

  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: {
        DEFAULT: '#ffffff',
      },
      red: {
        dark: '#ff344c',
        DEFAULT: '#fd4e63',
      },
      gray: {
        dark: '#1D1E20',
        DEFAULT: '#484B4E',
        light: '#62676b',
      },
      black: {
        dark: '#121415',
        DEFAULT: '#151719',
      },
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
