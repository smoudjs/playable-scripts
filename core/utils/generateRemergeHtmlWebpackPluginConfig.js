const fs = require('fs');
const path = require('path');

const RemergePlaceholders = `<script src="mraid.js"></script>
<script>window.$environment = Object.assign({}, window.$environment, { baseUrl: "{base_url}", targetPlatform: "remerge" });
window.REMERGE_BIDTIMEMACROS = {
  ready: "{ready_url}",
  error: "{error_url}",
  click: "{{ClickUrl.WithParams TargetUrl:TargetUrl}}",
  impression: "{ad_loaded_url}",
  engagement: "{ad_touch_url}"
};</script>`;

/**
 * Rewrites every local `src`/`href` of the generated tags to be loaded from Remerge's `{base_url}`
 * placeholder, keeping the original relative path in `data-relative-src`/`data-relative-href`
 * as a fallback for when the creative is served from the zip itself.
 * @param {string} tags - Stringified html-webpack-plugin tags
 * @returns {string} Tags with `{base_url}` prefixed sources
 */
function applyBaseUrl(tags) {
  return String(tags).replace(/(<(?:script|link)\b[^>]*?\s)(src|href)="([^"]+)"/g, (match, head, attribute, value) => {
    // Leave absolute urls and already processed placeholders untouched
    if (/^(?:[a-z]+:)?\/\//i.test(value) || value.startsWith('{')) return match;

    const relativeValue = value.replace(/^\.?\//, '');
    return `${head}${attribute}="{base_url}/${relativeValue}" data-relative-${attribute}="${relativeValue}"`;
  });
}

exports.generateRemergeHtmlWebpackPluginConfig = function generateRemergeHtmlWebpackPluginConfig(originalHtmlContentPath) {
  originalHtmlContentPath = originalHtmlContentPath || 'src/index.html';
  let originalBody = '';

  try {
    const content = fs.readFileSync(path.resolve(originalHtmlContentPath), 'utf8');
    const match = content.match(/<body>([\s\S]*?)<\/body>/);

    if (match) {
      originalBody = match[1].trim();
      // Remove tabs for a better look
      originalBody = originalBody.replaceAll('    ', '').replaceAll('\t', '');
    }
  } catch (e) {}

  return {
    filename: 'index.html',
    inject: false,
    minify: false,
    templateContent: ({ htmlWebpackPlugin }) => {
      return [RemergePlaceholders, applyBaseUrl(htmlWebpackPlugin.tags.headTags), originalBody].join('\n');
    }
  };
};

exports.applyRemergeBaseUrl = applyBaseUrl;
