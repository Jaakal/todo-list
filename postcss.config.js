// It is handy to not have those transformations while we developing
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    plugins: [
      autoprefixer,
      cssnano,
      // More postCSS modules here if needed
    ],
  };
}