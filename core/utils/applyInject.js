const path = require('path');
const { ScriptInjectorPlugin } = require('../plugins/ScriptInjectorPlugin.js');

/**
 * Applies the `inject` option to a webpack config.
 * A http(s) URL is added as a `<script src>` tag before the bundle, a local path is bundled before the main entry.
 * @param {import('webpack').Configuration} webpackConfig - Webpack configuration to modify
 * @param {string} [inject] - URL or local file path to inject
 */
exports.applyInject = function applyInject(webpackConfig, inject) {
  if (!inject) return;

  if (/^https?:\/\//i.test(inject)) webpackConfig.plugins.push(new ScriptInjectorPlugin(inject));
  else webpackConfig.entry = [path.resolve(inject)].concat(webpackConfig.entry);
};
