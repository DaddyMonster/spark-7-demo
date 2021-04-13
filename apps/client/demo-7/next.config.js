// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');

console.log(withPWA);

module.exports = withPlugins([
  [withPWA, { pwa: { dest: 'public' } }],
  [
    withNx,
    {
      webpack(config) {
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
]);
