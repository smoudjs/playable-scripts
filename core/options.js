const { parseArgvOptions, allowedAdProtocols, allowedAdNetworks } = require('./utils/parseArgvOptions');
const path = require('path');
const fs = require('fs');
var prettyjson = require('prettyjson');
const { name, version } = require('../package.json');

/** @type {import('./index').CLIOptions} */
const options = parseArgvOptions([
  {
    name: 'mode',
    defaultValue: process.env.NODE_ENV,
    hasValue: true,
    description: 'Just output current NODE_ENV mode'
  },
  {
    name: 'out-dir',
    alias: 'outDir',
    defaultValue: 'dist',
    hasValue: true,
    description: 'Output directory for build files'
  },
  {
    name: 'build-config',
    alias: "buildConfig",
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
    name: 'js-config',
    alias: 'jsConfig',
    defaultValue: 'jsconfig.json',
    hasValue: true,
    description: 'For JavaScript projects, path to jsconfig.json file'
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
    name: 'skip-recommended-meta',
    alias: 'skipRecommendedMeta',
    hasValue: false,
    description: "Don't inject recommended for playable ads META tags"
  },
  {
    name: 'debugger',
    hasValue: true,
    description: 'URL of debugger script to inject into code'
  }
]);

let logOptions = { ...options };
if (process.env.NODE_ENV === 'production') {
  delete logOptions.port;
  delete logOptions.open;
} else if (process.env.NODE_ENV === 'development') {
  delete logOptions.outDir;
}
if (logOptions.tsConfig === 'tsconfig.json') delete logOptions.tsConfig;
if (logOptions.jsConfig === 'jsconfig.json') delete logOptions.jsConfig;
if (logOptions.buildConfig === 'build.json') delete logOptions.buildConfig;

console.log(`${name} v${version}`)
console.log(prettyjson.render(logOptions, {}, 2));

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
  const fileData = fs.readFileSync(path.resolve(options['buildConfig']), 'utf8');
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

/** @type {AD_NETWORK} */
let adNetworkDefine = options['network'];

if (adNetworkDefine === 'pangle') adNetworkDefine = 'tiktok';
if (adNetworkDefine === 'mytarget' || adNetworkDefine === 'moloco') adNetworkDefine = 'facebook';

options.defines['AD_NETWORK'] = JSON.stringify(adNetworkDefine);

exports.options = options;
