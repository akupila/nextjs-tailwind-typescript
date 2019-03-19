const path = require('path');

const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

module.exports = withTypescript(
  withCSS({
    webpack: (config, options) => {
      const { dev } = options;

      if (dev) {
        return config;
      }

      config.plugins.push(
        new PurgecssPlugin({
          paths: glob.sync(
            [
              path.join(config.context, 'pages/**/*.tsx'),
              path.join(config.context, 'components/**/*.tsx'),
            ],
            { nodir: true },
          ),
          // keep global styles
          whitelist: ['html', 'body'],
          // https://tailwindcss.com/docs/controlling-file-size#removing-unused-css-with-purgecss
          extractors: [{ extractor: TailwindExtractor, extensions: ['tsx'] }],
        }),
      );

      return config;
    },
  }),
);
