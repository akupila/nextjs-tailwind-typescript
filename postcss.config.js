const tailwind = require('tailwindcss');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const plugins = [postcssImport, tailwind('./tailwind.config.js')];

if (process.env.NODE_ENV !== 'development') {
  plugins.push(autoprefixer, cssnano);
}

module.exports = {
  plugins,
};
