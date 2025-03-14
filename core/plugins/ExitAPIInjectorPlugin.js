const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Webpack plugin that injects Google's ExitAPI script and required meta tags for Google Ads.
 * Adds:
 * - ExitAPI script for handling ad exits
 * - Meta tag for ad size configuration
 * - Meta tag for ad orientation support
 * @implements {import('webpack').WebpackPluginInstance}
 */
class ExitAPIInjectorPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('ExitAPIInjectorPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('ExitAPIInjectorPlugin', (data, callback) => {
        data.headTags.splice(0, 0, {
          tagName: 'script',
          voidTag: false,
          meta: { plugin: 'html-inline-script-webpack-plugin' },
          attributes: {
            src: 'https://tpc.googlesyndication.com/pagead/gadgets/html5/api/exitapi.js',
            type: 'text/javascript'
          }
        });

        data.headTags.splice(0, 0, {
          tagName: 'meta',
          voidTag: true,
          meta: { plugin: 'html-webpack-plugin' },
          attributes: { name: 'ad.size', content: 'width=320,height=480' }
        });

        data.headTags.splice(0, 0, {
          tagName: 'meta',
          voidTag: true,
          meta: { plugin: 'html-webpack-plugin' },
          attributes: { name: 'ad.orientation', content: 'portrait,landscape' }
        });

        callback(null, data);
      });
    });
  }
}

exports.ExitAPIInjectorPlugin = ExitAPIInjectorPlugin;
