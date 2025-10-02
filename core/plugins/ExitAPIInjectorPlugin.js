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
  /**
   * @param {ORIENTATION} orientation - device orientation
   */
  constructor(orientation) {
    this.orientation = orientation;
  }

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

        let width = 320;
        let height = 480;

        if (this.orientation === 'square') width = 480;
        else if (this.orientation === 'landscape') {
          width = 480;
          height = 320;
        }

        data.headTags.splice(0, 0, {
          tagName: 'meta',
          voidTag: true,
          meta: { plugin: 'html-webpack-plugin' },
          attributes: { name: 'ad.size', content: `width=${width},height=${height}` }
        });

        data.headTags.splice(0, 0, {
          tagName: 'meta',
          voidTag: true,
          meta: { plugin: 'html-webpack-plugin' },
          attributes: {
            name: 'ad.orientation',
            content: this.orientation === 'both' || this.orientation === 'square' ? 'portrait,landscape' : this.orientation
          }
        });

        callback(null, data);
      });
    });
  }
}

exports.ExitAPIInjectorPlugin = ExitAPIInjectorPlugin;
