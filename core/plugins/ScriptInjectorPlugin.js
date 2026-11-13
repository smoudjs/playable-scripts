const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Webpack plugin that injects an external script (e.g. a remote debugger) at the top of the HTML head
 * @implements {import('webpack').WebpackPluginInstance}
 */
class ScriptInjectorPlugin {
  /**
   * @param {string} src - URL of the script to inject
   */
  constructor(src) {
    this.src = src;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('ScriptInjectorPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('ScriptInjectorPlugin', (data, callback) => {
        data.headTags.splice(0, 0, {
          tagName: 'script',
          voidTag: false,
          meta: { plugin: 'html-inline-script-webpack-plugin' },
          attributes: {
            src: this.src,
            type: 'text/javascript'
          }
        });

        callback(null, data);
      });
    });
  }
}

exports.ScriptInjectorPlugin = ScriptInjectorPlugin;
