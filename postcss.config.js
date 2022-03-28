const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: [
    './app/**/*.html',
    './app/**/*.vue',
    './app/**/*.jsx',
    './app/**/*.js',
    // etc.
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  plugins: [
    // eslint-disable-next-line global-require
    require('tailwindcss'),
    // eslint-disable-next-line global-require
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'staging'
      ? [purgecss]
      : []),
  ],
};
