var prettyjson = require('prettyjson');

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
  'liftoff'
];
/** @type {string[]} List of supported advertising protocols */
const allowedAdProtocols = ['none', 'mraid', 'dapi'];
/** @type {string[]} List of advertising partners that support MRAID protocol */
const mraidPartners = ['ironsource', 'applovin', 'unity', 'appreciate', 'chartboost', 'mytarget', 'liftoff', 'adcolony'];

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

  console.log(process.env.NODE_ENV);
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
      if (mraidPartners.includes(argvOptions['network']) && argvOptions['protocol'] !== 'none') {
        argvOptions['protocol'] = 'mraid';
      }
    }
  }

  let output = argvOptions;
  if (process.env.NODE_ENV === 'production') output = { ...argvOptions, port: undefined, open: undefined };
  else if (process.env.NODE_ENV === 'development') output = { ...argvOptions, outDir: undefined };

  console.log(prettyjson.render(output, {}, 2));

  return argvOptions;
};

exports.allowedAdNetworks = allowedAdNetworks;
exports.allowedAdProtocols = allowedAdProtocols;
exports.mraidPartners = mraidPartners;
