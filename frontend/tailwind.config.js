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
        darker: '#1B1B1D',
        dark: '#27282b',
        DEFAULT: '#3A3C40',
        light: '#525151',
      },
      black: {
        dark: '#121415',
        DEFAULT: '#151719',
      },
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      screens: {
        '3xl': '2000px',
      },
    },
  },
  variants: {
    backgroundColor: ({ after }) => after(['disabled']),
    textColor: ({ after }) => after(['disabled']),
  },
  plugins: [],
};
