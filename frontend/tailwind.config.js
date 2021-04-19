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
      primary: {
        dark: '#ff813b',
        DEFAULT: '#FF6E3D',
      },
      gray: {
        darker: '#1A1A19',
        dark: '#666361',
        DEFAULT: '#837f7e',
        light: '#837f7e',
      },
      black: {
        DEFAULT: '#151414',
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
