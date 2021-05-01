module.exports = {
  plugins: [
    require('tailwindcss')({
      config: './global/tailwind/seven/tailwind.config.js',
    }),
    require('autoprefixer'),
  ],
};
