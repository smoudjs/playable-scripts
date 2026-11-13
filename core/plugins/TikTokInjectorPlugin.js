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
            // https://ads.tiktok.com/help/article/playable-ads (lowercase path, the capitalized one returns 404)
            src: 'https://sf16-muse-va.ibytedtos.com/obj/union-fe-nc-i18n/playable/sdk/playable-sdk.js',
            type: 'text/javascript'
          }
        });
        callback(null, data);
      });
    });
  }
}

exports.TikTokInjectorPlugin = TikTokInjectorPlugin;
