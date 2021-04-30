// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const withPlugins = require('next-compose-plugins');
const nextTranslate = require('next-translate');

/* const withPWA = require('next-pwa'); */
/* const WorkboxPlugin = require('workbox-webpack-plugin');
 */

module.exports = withPlugins([
  [
    withNx,
    {
      nx: {
        // Set this to false if you do not want to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: true,
      },
    },
  ],
  nextTranslate,
]);


// 아래는 워크박스 PWA 셋업임... 몇가지 추가 작업 해야함... 추후 적용

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
