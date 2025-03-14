const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Webpack plugin that injects a custom debugger script into the HTML head
 * @implements {import('webpack').WebpackPluginInstance}
 */
class DebuggerInjectionPlugin {
  /**
   * @param {string} debuggerSrc - URL of the debugger script to inject
   */
  constructor(debuggerSrc) {
    this.debuggerSrc = debuggerSrc;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('DebuggerInjectionPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('DebuggerInjectionPlugin', (data, callback) => {
        data.headTags.splice(0, 0, {
          tagName: 'script',
          voidTag: false,
          meta: { plugin: 'html-inline-script-webpack-plugin' },
          attributes: {
            src: this.debuggerSrc,
            type: 'text/javascript'
          }
        });

        callback(null, data);
      });
    });
  }
}

exports.DebuggerInjectionPlugin = DebuggerInjectionPlugin;
