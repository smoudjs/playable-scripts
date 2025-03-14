const { parseArgvOptions, allowedAdProtocols, allowedAdNetworks } = require('./utils/parseArgvOptions');
const path = require('path');
const fs = require('fs');

/**
 * @typedef {Object} CLIOptions
 * @property {string} outDir - Output directory for build files (default: 'dist')
 * @property {string} config - Path to build.json configuration file (default: 'build.json')
 * @property {string} tsConfig - Path to tsconfig.json configuration file (default: 'tsconfig.json')
 * @property {number} port - Development server port number (default: 3000)
 * @property {boolean} open - Whether to open browser automatically (default: false)
 * @property {('none'|'mraid'|'dapi')} protocol - Ad protocol to use (default: 'none')
 * @property {string} network - Ad network identifier (default: 'preview')
 * @property {boolean} dev - Development mode flag
 * @property {string} [debugger] - URL of debugger script to inject
 */

/**
 * @typedef {Object} BuildOptions
 * @property {string} filename - Template for output filename using pattern {app}_{name}_{version}_{date}_{language}_{network}
 * @property {string} app - Application name used in build output
 * @property {string} name - Concept name used in build output
 * @property {string} version - Build version number
 * @property {string} language - Language code for localization
 * @property {string} google_play_url - Google Play Store URL for the app
 * @property {string} app_store_url - App Store URL for the app
 */

/**
 * @typedef {Object} DefinesOptions
 * @property {string} __DEV__ - Development mode flag for conditional code
 * @property {string} GOOGLE_PLAY_URL - Google Play Store URL constant
 * @property {string} APP_STORE_URL - App Store URL constant
 * @property {string} AD_NETWORK - Current advertising network identifier
 * @property {string} AD_PROTOCOL - Current advertising protocol
 * @property {string} BUILD_APP - Application name constant
 * @property {string} BUILD_NAME - Build name constant
 * @property {string} BUILD_VERSION - Build version constant
 * @property {string} BUILD_HASH - Unique build identifier generated from timestamp
 * @property {string} LANGUAGE - Current language code
 */

/**
 * Configuration options parsed from CLI arguments and build.json
 * @type {CLIOptions & {build: BuildOptions, defines: DefinesOptions}}
 */
const options = parseArgvOptions([
  {
    name: 'out-dir',
    alias: 'outDir',
    defaultValue: 'dist',
    hasValue: true,
    description: 'Output directory for build files'
  },
  {
    name: 'config',
    defaultValue: 'build.json',
    hasValue: true,
    description: 'Path to build.json configuration file'
  },
  {
    name: 'ts-config',
    alias: 'tsConfig',
    defaultValue: 'tsconfig.json',
    hasValue: true,
    description: 'For TypeScript projects, path to tsconfig.json file'
  },
  {
    name: 'port',
    hasValue: true,
    defaultValue: 3000,
    description: 'Development server port number',
    parser: function (rawValue) {
      const value = +rawValue;
      if (isNaN(value)) throw new Error('--port should be a number');
      return value;
    }
  },
  {
    name: 'open',
    defaultValue: false,
    hasValue: false,
    description: 'Open browser automatically when server starts'
  },
  {
    name: 'protocol',
    hasValue: true,
    defaultValue: 'none',
    description: 'Ad protocol to use (none, mraid, or dapi)',
    parser: function (rawValue) {
      if (!allowedAdProtocols.includes(rawValue)) {
        throw new Error(`--protocol should have one of the value: ${allowedAdProtocols.join(', ')}`);
      }
      return rawValue;
    }
  },
  {
    name: 'network',
    defaultValue: 'preview',
    hasValue: true,
    description: 'Target Ad network',
    parser: function (rawValue) {
      if (!allowedAdNetworks.includes(rawValue)) {
        throw new Error(`--network should have one of the value: ${allowedAdNetworks.join(', ')}`);
      }
      return rawValue;
    }
  },
  {
    name: 'dev',
    hasValue: true,
    description: 'Enable development mode (true/false)',
    parser: function (rawValue) {
      if (!(rawValue === 'true' || rawValue === 'false')) throw new Error('--dev should have either true or false value');
      return rawValue === 'true';
    }
  },
  {
    name: 'debugger',
    hasValue: true,
    description: 'URL of debugger script to inject into code'
  }
]);

/**
 * Building Build options
 */
options.build = {
  filename: '{app}_{name}_{version}_{date}_{language}_{network}',
  app: 'AppName',
  name: 'ConceptName',
  version: '1',
  language: 'EN',
  google_play_url: 'https://play.google.com/store/games',
  app_store_url: 'https://www.apple.com/app-store/'
};

try {
  const fileData = fs.readFileSync(path.resolve(options['config']), 'utf8');
  const json = JSON.parse(fileData);
  try {
    Object.assign(options.build, json);
  } catch (err) {
    console.log(chalk.red('Build config parsing error: ' + err.message));
  }
} catch (err) {}

/**
 * Building Defines options
 */
options.defines = {
  __DEV__: JSON.stringify(options['dev'] === undefined ? false : options['dev']),
  GOOGLE_PLAY_URL: JSON.stringify(options.build.google_play_url),
  APP_STORE_URL: JSON.stringify(options.build.app_store_url),
  AD_NETWORK: JSON.stringify(options['network']),
  AD_PROTOCOL: JSON.stringify(options['protocol']),
  BUILD_APP: JSON.stringify(options.build.app),
  BUILD_NAME: JSON.stringify(options.build.name),
  BUILD_VERSION: JSON.stringify(options.build.version),
  BUILD_HASH: JSON.stringify((+new Date()).toString(36)),
  LANGUAGE: JSON.stringify(options.build.language)
};

exports.options = options;
