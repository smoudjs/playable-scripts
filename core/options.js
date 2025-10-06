const {
  parseArgvOptions,
  allowedAdProtocols,
  allowedAdNetworks,
  allowedOrientations,
  allowedLanguages
} = require('./utils/parseArgvOptions');
const path = require('path');
const fs = require('fs');
const { name, version } = require('../package.json');

const possibleOptions = [
  {
    name: 'out-dir',
    alias: 'outDir',
    defaultValue: 'dist',
    hasValue: true,
    description: 'Output directory for build files'
  },
  {
    name: 'build-config',
    alias: 'buildConfig',
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
    name: 'zip',
    defaultValue: false,
    hasValue: false,
    description: 'Should the build be zipped? (only for some ad networks)'
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
    name: 'filename',
    defaultValue: '{app}_{name}_{version}_{date}_{language}_{network}',
    hasValue: true,
    description: 'Specifies the build filename template'
  },
  {
    name: 'app',
    defaultValue: 'AppName',
    hasValue: true,
    description: 'Specifies the application name used in build filename and APP define'
  },
  {
    name: 'name',
    defaultValue: 'ConceptName',
    hasValue: true,
    description: 'Specifies the concept name used in build filename and NAME define'
  },
  {
    name: 'version',
    defaultValue: 'v1',
    hasValue: true,
    description: 'Specifies the version name used in build filename and VERSION define'
  },
  {
    name: 'language',
    defaultValue: 'en',
    hasValue: true,
    description: 'Specifies the language of the build used in LANGUAGE define',
    parser: function (rawValue) {
      if (!allowedLanguages.includes(rawValue)) {
        throw new Error(`--platform should have one of the value: ${allowedLanguages.join(', ')}`);
      }
      return rawValue;
    }
  },
  {
    name: 'orientation',
    defaultValue: 'both',
    hasValue: true,
    description: 'Specifies the ad orientation used in ORIENTATION define and some network specific configurations',
    parser: function (rawValue) {
      if (!allowedOrientations.includes(rawValue)) {
        throw new Error(`--orientation should have one of the value: ${allowedOrientations.join(', ')}`);
      }
      return rawValue;
    }
  },
  {
    name: 'google-play-url',
    alias: 'googlePlayUrl',
    defaultValue: 'https://play.google.com/store/games',
    hasValue: true,
    description: 'Google Play Store URL for the app'
  },
  {
    name: 'app-store-url',
    alias: 'appStoreUrl',
    defaultValue: 'https://www.apple.com/app-store/',
    hasValue: true,
    description: 'App Store URL for the app'
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
];

/** @type {import('./index').CLIOptions} */
const options = parseArgvOptions(possibleOptions);

options.defines = {};
options.compilation = {};
options.adNetworkNames = {};

try {
  const fileData = fs.readFileSync(path.resolve(options['buildConfig']), 'utf8');
  try {
    const customOptions = JSON.parse(fileData);
    for (let key in customOptions) {
      if (key === 'defines') Object.assign(options.defines, customOptions[key]);
      else if (key === 'compilation') Object.assign(options.compilation, customOptions[key]);
      else if (key === 'adNetworkNames') Object.assign(options.adNetworkNames, customOptions[key]);
      else if (key === 'google_play_url') options.googlePlayUrl = customOptions.google_play_url;
      else if (key === 'app_store_url') options.appStoreUrl = customOptions.app_store_url;
      else {
        const possibleOption = possibleOptions.find((e) => e.alias === key || e.name === key);
        if (possibleOption && (options[key] === undefined || options[key] === possibleOption.defaultValue)) {
          options[key] = customOptions[key];
        }
      }
    }
  } catch (err) {
    console.log(chalk.red('Build config parsing error: ' + err.message));
  }
} catch (err) {}

console.log(`${name} v${version}`);

exports.options = options;
