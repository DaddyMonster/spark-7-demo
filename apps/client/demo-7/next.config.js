// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const withPlugins = require('next-compose-plugins');
const nextTranslate = require('next-translate');
const path = require('path');
/* const withPWA = require('next-pwa'); */
/* const WorkboxPlugin = require('workbox-webpack-plugin');
 */

module.exports = withPlugins([withNx, nextTranslate]);

/* [
  [withPWA, { pwa: { dest: 'public' } }],
  [
    withNx,
    {
      webpack(config, options) {
         const {
          webpack,
          buildId,
          dev,
          config: { distDir = '.next', pwa = {}, experimental = {} },
        } = options;
        const prefix = 'static/';
        config.module.rules.push = (...items) => {
          Array.prototype.push.call(
            config.module.rules,
            ...items.filter((item) => item.test.toString() !== '/\\.svg$/')
          );
        };

        return config;
      },
    },
  ],
] */
