const { options } = require('../options');

/**
 * Build's default defines list for dev & prod builds
 */
exports.buildDefines = function buildDefines() {
  const defines = {
    __DEV__: JSON.stringify(options['dev'] === undefined ? false : options['dev']),
    GOOGLE_PLAY_URL: JSON.stringify(options.googlePlayUrl),
    APP_STORE_URL: JSON.stringify(options.appStoreUrl),
    AD_NETWORK: JSON.stringify(options['network']),
    AD_PROTOCOL: JSON.stringify(options['protocol']),
    APP: JSON.stringify(options.app),
    NAME: JSON.stringify(options.name),
    VERSION: JSON.stringify(options.version),
    BUILD_HASH: JSON.stringify((+new Date()).toString(36)),
    LANGUAGE: JSON.stringify(options.language)
  };

  /** @type {AD_NETWORK} */
  let adNetworkDefine = options['network'];

  if (adNetworkDefine === 'pangle') adNetworkDefine = 'tiktok';
  if (adNetworkDefine === 'mytarget' || adNetworkDefine === 'moloco') adNetworkDefine = 'facebook';

  defines['AD_NETWORK'] = JSON.stringify(adNetworkDefine);

  return defines;
};
