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
<script src="mraid.js"></script>
<script>
  function _trackURL(url) {
    if (url) { const trackingPixel = new Image(); trackingPixel.src = url; }
  }

  function trackInMobiEvent(event) {
    if (window.INMOBI_DSPMACROS && window.INMOBI_DSPMACROS[event]) _trackURL(window.INMOBI_DSPMACROS[event]);
  }

  function initEventsForInMobi(sdk) {
    sdk.once('boot', function () { trackInMobiEvent('Ad_Load_Start')});
    sdk.once('start', function () {trackInMobiEvent('Ad_Viewable')});
    sdk.once('interaction', function () {trackInMobiEvent('First_Engagement')});
    sdk.once('finish',  function () {trackInMobiEvent('Gameplay_Complete')});
    sdk.once('install', function () {trackInMobiEvent('DSP_Click')});
    sdk.once('start', function () {
      setTimeout(function() {trackInMobiEvent('Spent_5_Seconds')}, 5000)
      setTimeout(function() {trackInMobiEvent('Spent_10_Seconds')}, 10000)
      setTimeout(function() {trackInMobiEvent('Spent_15_Seconds')}, 15000)
      setTimeout(function() {trackInMobiEvent('Spent_20_Seconds')}, 20000)
      setTimeout(function() {trackInMobiEvent('Spent_25_Seconds')}, 25000)
      setTimeout(function() {trackInMobiEvent('Spent_30_Seconds')}, 30000)
    });
  }
  var sdkReadyInterval = setInterval(function() {
    if (window.PlayableSDK) { initEventsForInMobi(window.PlayableSDK); clearInterval(sdkReadyInterval) }
  }, 10)
</script>`;

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
