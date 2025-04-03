const { options } = require('../options');

/**
 * Build's default defines list for dev & prod builds
 */
exports.buildDefines = function buildDefines() {
  const defines = {
    __DEV__: JSON.stringify(options['dev'] === undefined ? false : options['dev']),
    GOOGLE_PLAY_URL: JSON.stringify(options.google_play_url),
    APP_STORE_URL: JSON.stringify(options.app_store_url),
    AD_NETWORK: JSON.stringify(options['network']),
    AD_PROTOCOL: JSON.stringify(options['protocol']),
    APP: JSON.stringify(options.app),
    NAME: JSON.stringify(options.name),
    VERSION: JSON.stringify(options.version),
    BUILD_HASH: JSON.stringify((+new Date()).toString(36)),
    LANGUAGE: JSON.stringify(options.language)
  };

  // For backward compatibility
  defines.BUILD_APP = defines.APP;
  defines.BUILD_NAME = defines.NAME;
  defines.BUILD_VERSION = defines.VERSION;

  /** @type {AD_NETWORK} */
  let adNetworkDefine = options['network'];

  if (adNetworkDefine === 'pangle') adNetworkDefine = 'tiktok';
  if (adNetworkDefine === 'mytarget' || adNetworkDefine === 'moloco') adNetworkDefine = 'facebook';

  defines['AD_NETWORK'] = JSON.stringify(adNetworkDefine);

  return defines;
};
