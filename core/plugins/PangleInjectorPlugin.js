const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Webpack plugin that injects Pangle Playable SDK script into the HTML head.
 * @implements {import('webpack').WebpackPluginInstance}
 */
class PangleInjectorPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('PangleInjectorPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('PangleInjectorPlugin', (data, callback) => {
        data.headTags.splice(0, 0, {
          tagName: 'script',
          voidTag: false,
          meta: { plugin: 'html-inline-script-webpack-plugin' },
          attributes: {
            src: 'https://sf3-ttcdn-tos.pstatp.com/obj/union-fe-nc/playable/sdk/playable-sdk.js',
            type: 'text/javascript'
          }
        });
        callback(null, data);
      });
    });
  }
}

exports.PangleInjectorPlugin = PangleInjectorPlugin;
