const HtmlWebpackPlugin = require('html-webpack-plugin');

const mintegralSrc =
  'function gameStart() {window.mintGameStart && window.mintGameStart()}; function gameClose() {window.mintGameClose && window.mintGameClose()}';

/**
 * Webpack plugin that injects Mintegral required script into the HTML head.
 * Designed to use with @smoud/playable-sdk package
 * @implements {import('webpack').WebpackPluginInstance}
 */
class MintegralInjectorPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('MintegralInjectorPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('MintegralInjectorPlugin', (data, callback) => {
        data.headTags.splice(0, 0, {
          tagName: 'script',
          voidTag: false,
          meta: { plugin: 'html-inline-script-webpack-plugin' },
          innerHTML: mintegralSrc
        });

        callback(null, data);
      });
    });
  }
}

exports.MintegralInjectorPlugin = MintegralInjectorPlugin;
