const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Webpack plugin that injects Pangle Playable SDK script into the HTML head.
 * @implements {import('webpack').WebpackPluginInstance}
 */
class MRAIDInjectorPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('MRAIDInjectorPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('MRAIDInjectorPlugin', (data, callback) => {
        data.headTags.splice(0, 0, {
          tagName: 'script',
          voidTag: false,
          meta: { plugin: 'html-inline-script-webpack-plugin' },
          attributes: {
            src: 'mraid.js',
            type: 'text/javascript'
          }
        });
        callback(null, data);
      });
    });
  }
}

exports.MRAIDInjectorPlugin = MRAIDInjectorPlugin;
