module.exports = {
  purge: ['./src/**/*.{vue,js}'],
  darkMode: false,

  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: {
        DEFAULT: '#F3F3F4',
      },
      red: {
        dark: '#ff344c',
        DEFAULT: '#FD445A',
      },
      gray: {
        darker: '#171717',
        dark: '#2F3131',
        DEFAULT: '#393A3C',
        light: '#45464A',
      },
      black: {
        DEFAULT: '#141414',
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
