const fs = require('fs');
const path = require('path');

const InMobiPlaceholders = `<script>
  var INMOBI_DSPMACROS = {
    "Ad_Load_Start": ["$P_AD_LOAD_START"],
    "Ad_Viewable": ["$P_AD_READY"],
    "First_Engagement": ["$P_FIRST_ENGAGEMENT"],
    "Gameplay_Complete": ["$P_GAMEPLAY_DONE"],
    "DSP_Click": ["$HTML_ESC_CLICK_URL"],
    "LandingPage_URL": [/android/i.test(navigator.userAgent) ? "{GOOGLE_PLAY_URL}" : "{APP_STORE_URL}"],
    "Spent_5_Seconds": ["$P_TIMESPENT_5"],
    "Spent_10_Seconds": ["$P_TIMESPENT_10"],
    "Spent_15_Seconds": ["$P_TIMESPENT_15"],
    "Spent_20_Seconds": ["$P_TIMESPENT_20"],
    "Spent_25_Seconds": ["$P_TIMESPENT_25"],
    "Spent_30_Seconds": ["$P_TIMESPENT_30"],
  };
</script>
<script src="mraid.js"></script>`;

exports.generateInMobiHtmlWebpackPluginConfig = function generateInMobiHtmlWebpackPluginConfig(
  originalHtmlContentPath,
  buildOptions
) {
  originalHtmlContentPath = originalHtmlContentPath || 'src/index.html';
  let originalBody = '';
  const placeholder = InMobiPlaceholders.replaceAll('{GOOGLE_PLAY_URL}', buildOptions.googlePlayUrl).replaceAll(
    '{APP_STORE_URL}',
    buildOptions.appStoreUrl
  );

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
      return [placeholder, htmlWebpackPlugin.tags.headTags, originalBody].join('\n');
    }
  };
};
