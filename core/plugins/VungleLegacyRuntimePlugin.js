const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Webpack plugin that injects an inline runtime shim script at the very top of the HTML head.
 * Ensures `window.globalThis` is defined for legacy Vungle runtimes that lack native `globalThis`.
 * @implements {import('webpack').WebpackPluginInstance}
 */
class VungleLegacyRuntimePlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('VungleLegacyRuntimePlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('VungleLegacyRuntimePlugin', (data, callback) => {
        data.headTags.splice(0, 0, {
          tagName: 'script',
          voidTag: false,
          meta: { plugin: 'html-inline-script-webpack-plugin' },
          attributes: {
            type: 'text/javascript'
          },
          innerHTML: 'window.globalThis=window.globalThis||window;'
        });
        callback(null, data);
      });
    });
  }
}

exports.VungleLegacyRuntimePlugin = VungleLegacyRuntimePlugin;
