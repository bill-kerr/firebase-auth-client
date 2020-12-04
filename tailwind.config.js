const production = !process.env.ROLLUP_WATCH;

module.exports = {
  purge: {
    content: ['./src/**/*.svelte', './public/**/*.html'],
    enabled: production,
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
