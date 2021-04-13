// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const withPWA = require('next-pwa');
module.exports = withNx({
  webpack(config) {
    // Prevent nx from adding an svg handler - stick to what is provided by
    // nextjs or that we have defined ourselves.
    config.module.rules.push = (...items) => {
      Array.prototype.push.call(
        config.module.rules,
        ...items.filter((item) => item.test.toString() !== '/\\.svg$/')
      );
    };

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return withPWA({ ...config, dest: 'public' });
  },
});
