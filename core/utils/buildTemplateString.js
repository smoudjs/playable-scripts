const { options } = require('../options');
const { getCurrentDateFormatted } = require('./date');

/** @type {Record<string, string>} Mapping of ad network identifiers to their display names in filenames */
const adNetworkFileNameMap = {
  preview: 'Preview',
  applovin: 'AL',
  unity: 'UNITY',
  google: 'GOOGLE',
  ironsource: 'IS',
  facebook: 'FB',
  moloco: 'MOLOCO',
  adcolony: 'ADCOLONY',
  mintegral: 'MINTEGRAL',
  vungle: 'VUNGLE',
  tapjoy: 'TAPJOY',
  snapchat: 'SNAPCHAT',
  tiktok: 'TIKTOK',
  appreciate: 'APPRECIATE',
  chartboost: 'CHARTBOOST',
  pangle: 'PANGLE',
  mytarget: 'MYTARGET',
  liftoff: 'LIFTOFF',
  smadex: 'SMADEX',
  adikteev: 'ADIKTEEV'
};

/**
 * Build's result string from template. Used for outDir or filename
 */
exports.buildTemplateString = function buildTemplateString(template, customOptions) {
  customOptions = customOptions || options;

  /** @type {AD_NETWORK} */
  const adNetwork = customOptions['network'];

  /** @type {AD_PROTOCOL} */
  const adProtocol = customOptions['protocol'];

  let networkName = customOptions.adNetworkNames[adNetwork] || adNetworkFileNameMap[adNetwork] || adNetwork;
  if (adProtocol === 'dapi') networkName += '_DAPI';

  template = template.replaceAll('{app}', customOptions.app);
  template = template.replaceAll('{name}', customOptions.name);
  template = template.replaceAll('{version}', customOptions.version);
  template = template.replaceAll('{date}', getCurrentDateFormatted());
  template = template.replaceAll('{language}', customOptions.language);
  template = template.replaceAll('{network}', networkName);
  template = template.replaceAll('{hash}', '[fullhash:6]');

  return template;
};
