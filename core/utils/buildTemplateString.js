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
  liftoff: 'LIFTOFF'
};

/**
 * Build's result string from template. Used for outDir or filename
 */
exports.buildTemplateString = function buildTemplateString(template) {
  /** @type {AD_NETWORK} */
  const adNetwork = options['network'];

  /** @type {AD_PROTOCOL} */
  const adProtocol = options['protocol'];

  let networkName = adNetworkFileNameMap[adNetwork] || adNetwork;
  if (adProtocol === 'dapi') networkName += '_DAPI';

  template = template.replaceAll('{app}', options.app);
  template = template.replaceAll('{name}', options.name);
  template = template.replaceAll('{version}', options.version);
  template = template.replaceAll('{date}', getCurrentDateFormatted());
  template = template.replaceAll('{language}', options.language);
  template = template.replaceAll('{network}', networkName);
  template = template.replaceAll('{hash}', '[fullhash:6]');

  return template;
};
