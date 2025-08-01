/** @type {string[]} List of supported advertising networks */
const allowedAdNetworks = [
  'preview',
  'applovin',
  'unity',
  'google',
  'ironsource',
  'facebook',
  'moloco',
  'adcolony',
  'mintegral',
  'vungle',
  'tapjoy',
  'snapchat',
  'tiktok',
  'appreciate',
  'chartboost',
  'pangle',
  'mytarget',
  'liftoff',
  'smadex',
  'adikteev'
];
/** @type {AD_PROTOCOL[]} List of supported advertising protocols */
const allowedAdProtocols = ['none', 'mraid', 'dapi'];

/** @type {AD_NETWORK[]} List of advertising partners that support MRAID protocol */
const mraidPartners = [
  'ironsource',
  'applovin',
  'unity',
  'appreciate',
  'snapchat',
  'chartboost',
  'mytarget',
  'liftoff',
  'adcolony',
  'adikteev'
];

/** @type {LANGUAGE[]} */
const allowedLanguages = ['auto', 'en', 'es', 'zh', 'hi', 'ar', 'fr', 'de', 'ja', 'pt'];

/**
 * Parses command line arguments based on provided options configuration
 * @param {import('../index').CLIOptionConfig[]} posiibleOptions - Array of possible options to parse
 * @returns {Record<string, any>} Parsed options object with values from command line arguments
 */
exports.parseArgvOptions = function parseArgvOptions(posiibleOptions) {
  const argvOptions = {};

  for (let possibleOption of posiibleOptions) {
    if (possibleOption.defaultValue !== undefined)
      argvOptions[possibleOption.alias || possibleOption.name] = possibleOption.defaultValue;
  }

  let adNetwork = null;

  for (let i = 2; i < process.argv.length; i++) {
    let key = process.argv[i];

    const allowedOption = posiibleOptions.find((e) => '--' + e.name === key);

    if (allowedOption) {
      let value = true;
      if (allowedOption.hasValue) {
        value = process.argv[i + 1];
        if (allowedOption.parser) value = allowedOption.parser(value);
        i++;
      }
      argvOptions[allowedOption.alias || allowedOption.name] = value;
    } else if (!adNetwork) adNetwork = key;
  }

  if (posiibleOptions.find((e) => e.name === 'network')) {
    if (adNetwork && allowedAdNetworks.includes(adNetwork)) {
      argvOptions['network'] = adNetwork;
    }
    if (posiibleOptions.find((e) => e.name === 'protocol')) {
      if (mraidPartners.includes(argvOptions['network']) && argvOptions['protocol'] === 'none') {
        argvOptions['protocol'] = 'mraid';
      }
    }
  }

  return argvOptions;
};

exports.allowedAdNetworks = allowedAdNetworks;
exports.allowedAdProtocols = allowedAdProtocols;
exports.mraidPartners = mraidPartners;
exports.allowedLanguages = allowedLanguages;
