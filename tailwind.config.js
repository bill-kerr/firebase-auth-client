const production = !process.env.ROLLUP_WATCH;

module.exports = {
  purge: {
    content: ['./src/**/*.svelte', './public/**/*.html'],
    enabled: production,
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ['Nunito', 'sans-serif'],
      mono: ['Source Code Pro', 'monospaced'],
    },
    extend: {
      animation: {
        '-spin': '-spin 1s linear infinite',
      },
      keyframes: {
        '-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
