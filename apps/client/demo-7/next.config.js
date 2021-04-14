// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');
module.exports = withPlugins([
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
        config.plugins.push(
          new WorkboxPlugin.GenerateSW({
            swDest: '../public/sw.js',
            exclude: [
              ({ asset, compilation }) => {
                if (
                  asset.name.match(
                    /^(build-manifest\.json|react-loadable-manifest\.json)$/
                  )
                ) {
                  return true;
                }
                if (dev && !asset.name.startsWith('static/runtime/')) {
                  return true;
                }
                if (experimental.modern /* modern */) {
                  if (asset.name.endsWith('.module.js')) {
                    return false;
                  }
                  if (asset.name.endsWith('.js')) {
                    return true;
                  }
                }
                return false;
              },
            ],
            manifestTransforms: [
              async (manifestEntries, compilation) => {
                const manifest = manifestEntries.map((m) => {
                  m.url = m.url.replace(/\/\[/g, '/%5B').replace(/\]/g, '%5D');
                  m.revision = buildId;
                  return m;
                });
                return { manifest, warnings: [] };
              },
            ],
            modifyURLPrefix: {
              [prefix]: path.posix.join('/', '/_next/static/'),
            },
            runtimeCaching: [
              {
                // Match any request that ends with .png, .jpg, .jpeg or .svg.
                urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

                // Apply a cache-first strategy.
                handler: 'CacheFirst',

                options: {
                  // Use a custom cache name.
                  cacheName: 'start-url',
                  plugins: [
                    {
                      cacheWillUpdate: async ({
                        request,
                        response,
                        event,
                        state,
                      }) => {
                        if (response && response.type === 'opaqueredirect') {
                          return new Response(response.body, {
                            status: 200,
                            statusText: 'OK',
                            headers: response.headers,
                          });
                        }
                        return response;
                      },
                    },
                  ],
                },
              },
            ],
          })
        );

        return config;
      },
    },
  ],
]);
