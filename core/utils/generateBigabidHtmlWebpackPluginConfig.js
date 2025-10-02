const fs = require('fs');
const path = require('path');

const BigabidPlaceholders = `<script src="mraid.js"></script>
<script>window.BIGABID_BIDTIMEMACROS = {  
  mraid_viewable: unescape("#IMP_TRACE_MRAID_VIEWABLE_ESC#"),  
  game_viewable: unescape("#IMP_TRACE_GAME_VIEWABLE_ESC#"),  
  engagement: unescape("#IMP_TRACE_ENGAGEMENT_ESC#"),  
  complete: unescape("#IMP_TRACE_COMPLETE_ESC#"),  
  click: unescape("#CLICK_TEMPLATE_ESC#"),  
  final_url: unescape("#FINAL_LANDING_URL_ESC#")  
}</script>  
<script src="#BIGABID_PLAYABLE_CDN_URL#"></script>  
%{IMP_BEACON}`;

exports.generateBigabidHtmlWebpackPluginConfig = function generateBigabidHtmlWebpackPluginConfig(originalHtmlContentPath) {
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
      return [BigabidPlaceholders, htmlWebpackPlugin.tags.headTags, originalBody].join('\n');
    }
  };
};
