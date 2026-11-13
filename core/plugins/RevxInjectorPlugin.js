const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * RevX CTA integration ("New" method), verbatim from RevX playable requirements:
 * https://docs.revx.io/General-Information/playable_requirements_1741786018893.md
 * RevX replaces the placeholders with its tracker at serve time; @smoud/playable-sdk calls `redirect()` on install.
 */
const REVX_SNIPPET =
  'window.trkLink="|CLICK|NOENCODING|";' +
  'window.ctaLink="|CLICK_URL|";' +
  'function redirect(){var img=new Image();img.src=window.trkLink+encodeURIComponent(window.ctaLink);window.open(window.ctaLink,"_blank")}';

/**
 * Webpack plugin that injects RevX tracker/CTA variables and the `redirect()` function at the top of the HTML head.
 * @implements {import('webpack').WebpackPluginInstance}
 */
class RevxInjectorPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('RevxInjectorPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('RevxInjectorPlugin', (data, callback) => {
        data.headTags.splice(0, 0, {
          tagName: 'script',
          voidTag: false,
          meta: { plugin: 'html-inline-script-webpack-plugin' },
          attributes: {
            type: 'text/javascript'
          },
          innerHTML: REVX_SNIPPET
        });
        callback(null, data);
      });
    });
  }
}

exports.RevxInjectorPlugin = RevxInjectorPlugin;
