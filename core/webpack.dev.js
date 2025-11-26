const { merge } = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const { webpackCommonConfig } = require('./webpack.common.js');
const path = require('path');
const { DebuggerInjectionPlugin } = require('./plugins/DebuggerInjectionPlugin.js');
const { options } = require('./options.js');
const { mergeOptions } = require('./utils/mergeOptions.js');
const { buildDefines } = require('./utils/buildDefines.js');
const { logOptions } = require('./utils/logOptions.js');

/**
 * Creates webpack configuration for development
 * @param {Partial<import('./index').CLIOptions>} [customOptions] - Custom options to merge with default options
 * @param {Record<string, any>} [customDefines] - Additional defines for webpack.DefinePlugin
 * @param {import('webpack').Configuration} [webpackCustomConfig] - Custom webpack config to merge
 * @returns {import('webpack').Configuration} Final webpack development configuration
 */
function makeWebpackDevConfig(customOptions, customDefines, webpackCustomConfig) {
  const devOptions = mergeOptions(options, customOptions);
  logOptions(devOptions)
  customDefines = customDefines || {};
  webpackCustomConfig = webpackCustomConfig || {};

  const webpackConfig = merge(
    webpackCommonConfig,
    {
      mode: 'development',
      devtool: 'inline-source-map',
      devServer: {
        static: {
          directory: path.resolve('dist')
        },
        hot: true,
        // compress: true,
        port: devOptions['port'],
        allowedHosts: 'all',
        open: devOptions['open']
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve('src/index.html'),
          inlineSource: '.(js|css|png|jpg|webp|svg|xml|atlas|mp3|gif|glb|fbx|obj)$',
          meta: {
            viewport: 'width=device-width,initial-scale=1.0,viewport-fit=cover,maximum-scale=1.0,user-scalable=no'
          }
        }),

        new webpack.DefinePlugin({
          ...buildDefines(),
          ...devOptions.defines,
          __DEV__: JSON.stringify(devOptions['dev'] === undefined ? true : devOptions['dev']),
          ...customDefines
        })
      ]
    },
    webpackCustomConfig
  );

  if (devOptions['debugger']) {
    webpackConfig.plugins.push(new DebuggerInjectionPlugin(devOptions['debugger']));
  }

  return webpackConfig;
}

/**
 * Starts webpack development server
 * @param {import('webpack').Configuration} [webpackConfig] - Webpack configuration to use, creates default if not provided
 * @param {Partial<import('./index').CLIOptions>} [customOptions] - Custom options to merge with default options
 * @param {Record<string, any>} [customDefines] - Additional defines for webpack.DefinePlugin
 * @param {import('webpack').Configuration} [webpackCustomConfig] - Custom webpack config to merge
 */
function runDev(webpackConfig, customOptions, customDefines, webpackCustomConfig) {
  if (!webpackConfig) webpackConfig = makeWebpackDevConfig(customOptions, customDefines, webpackCustomConfig);

  const compiler = webpack(webpackConfig);
  const server = new WebpackDevServer(webpackConfig.devServer, compiler);
  server.start();
}

exports.makeWebpackDevConfig = makeWebpackDevConfig;
exports.runDev = runDev;
