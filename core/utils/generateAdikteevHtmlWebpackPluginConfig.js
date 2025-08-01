const fs = require('fs');
const path = require('path');

const AdikteevPlaceholders = `<script type="application/javascript">
  var AK_CLICK_DESTINATION_URL = "PLACEHOLDER_CLICK_REDIRECT";
  var AK_CLICK_PIXEL_URL = "PLACEHOLDER_CLICK_PIXEL";
</script>`;

exports.generateAdikteevHtmlWebpackPluginConfig = function generateAdikteevHtmlWebpackPluginConfig(originalHtmlContentPath) {
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
      return [AdikteevPlaceholders, htmlWebpackPlugin.tags.headTags, originalBody].join('\n');
    }
  };
};
