const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Webpack plugin that injects TikTok Playable SDK script into the HTML head.
 * @implements {import('webpack').WebpackPluginInstance}
 */
class TikTokInjectorPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('TikTokInjectorPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('TikTokInjectorPlugin', (data, callback) => {
        data.headTags.splice(0, 0, {
          tagName: 'script',
          voidTag: false,
          meta: { plugin: 'html-inline-script-webpack-plugin' },
          attributes: {
            src: 'https://sf1-ttcdn-tos.pstatp.com/obj/ttfe/union/playable/sdk/index.b5662ec443f458c8a87e.js',
            type: 'text/javascript'
          }
        });
        callback(null, data);
      });
    });
  }
}

exports.TikTokInjectorPlugin = TikTokInjectorPlugin;
