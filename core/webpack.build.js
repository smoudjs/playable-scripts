const { merge } = require('webpack-merge');
const { webpackCommonConfig } = require('./webpack.common.js');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ExitAPIInjectorPlugin } = require('./plugins/ExitAPIInjectorPlugin.js');
const { DAPIInjectorPlugin } = require('./plugins/DAPIInjectorPlugin.js');
const ZipPlugin = require('zip-webpack-plugin');
const { getCurrentDateFormatted } = require('./utils/date');
const path = require('path');
const { mergeOptions } = require('./utils/mergeOptions.js');
const { options } = require('./options.js');

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
 * Creates webpack configuration for production build
 * @param {Object} [customOptions] - Custom options to merge with default options
 * @param {Object} [customDefines] - Additional defines for webpack.DefinePlugin
 * @param {import('webpack').Configuration} [webpackCustomConfig] - Custom webpack config to merge
 * @returns {import('webpack').Configuration} Final webpack production configuration
 */
function makeWebpackBuildConfig(customOptions, customDefines, webpackCustomConfig) {
  const buildOptions = mergeOptions(options, customOptions);
  customDefines = customDefines || {};
  webpackCustomConfig = webpackCustomConfig || {};

  const adNetwork = buildOptions['network'];
  const adProtocol = buildOptions['protocol'];
  const build = buildOptions.build;

  function getFileName() {
    let networkName = adNetworkFileNameMap[adNetwork] || adNetwork;
    if (adProtocol === 'dapi') networkName += '-DAPI';

    let filename = build.filename;

    filename = filename.replaceAll('{app}', build.app);
    filename = filename.replaceAll('{name}', build.name);
    filename = filename.replaceAll('{version}', build.version);
    filename = filename.replaceAll('{date}', getCurrentDateFormatted());
    filename = filename.replaceAll('{language}', build.language);
    filename = filename.replaceAll('{network}', networkName);
    filename = filename.replaceAll('{hash}', '[hash]');

    return filename;
  }

  const webpackConfig = merge(
    webpackCommonConfig,
    {
      mode: 'production',
      stats: 'errors-only',
      optimization: {
        usedExports: true,
        minimize: true,
        minimizer: [
          new TerserPlugin({
            extractComments: false,
            terserOptions: {
              safari10: true,
              compress: {
                drop_console: true,
                arrows: false
              },
              output: {
                comments: false,
                quote_style: 3
              }
            }
          })
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve('src/index.html'),
          filename: adNetwork === 'google' ? './index.html' : `${getFileName()}.html`,
          title: `${build.name}-${build.app}`,
          inlineSource: '.(js|css|png|jpg|svg|mp3|gif|glb|fbx)$'
        }),

        new HtmlInlineScriptPlugin(),

        new webpack.DefinePlugin({
          ...buildOptions.defines,
          ...customDefines
        }),

        // For some reason needed for PIXI v8
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1
        })
      ]
    },
    webpackCustomConfig
  );

  if ('dapi' === adProtocol) {
    webpackConfig.plugins.push(new DAPIInjectorPlugin());
  } else if ('google' === adNetwork) {
    webpackConfig.plugins.push(
      new ZipPlugin({
        filename: `${getFileName()}.zip`,
        path: path.resolve(buildOptions['outDir'])
      })
    );

    webpackConfig.plugins.push(new ExitAPIInjectorPlugin());

    webpackConfig.output = {
      filename: 'build.js',
      path: path.resolve(buildOptions['outDir'], 'google')
    };
  }

  return webpackConfig;
}

/**
 * Runs webpack production build
 * @param {import('webpack').Configuration} [webpackConfig] - Webpack configuration to use, creates default if not provided
 */
function runBuild(webpackConfig) {
  if (!webpackConfig) webpackConfig = makeWebpackBuildConfig();

  const compiler = webpack(webpackConfig);
  compiler.run((err, stats) => {
    if (err) {
      console.error('Build failed:', err.stack || err);
      if (err.details) {
        console.error('Error details:', err.details);
      }
      return;
    }

    if (stats.hasErrors()) {
      console.log(stats);
      console.error(`Build [${adNetwork}] finished with errors.`);
    } else {
      console.log(`Build [${adNetwork}] successful!`);
    }
  });
}

exports.makeWebpackBuildConfig = makeWebpackBuildConfig;
exports.runBuild = runBuild;
