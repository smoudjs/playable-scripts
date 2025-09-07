/**
 * Merges two option objects with deep merge for 'defines' and 'build' properties
 * @param {import('../index').CLIOptions} options1 - First options object
 * @param {Partial<import('../index').CLIOptions>} [options2] - Second options object
 * @returns {import('../index').CLIOptions} Merged options object with combined defines and build properties
 */
exports.mergeOptions = function mergeOptions(options1, options2) {
  if (!options1) return {};
  if (!options2) return options1;

  const defines = Object.assign({}, options1.defines, options2.defines);
  const build = Object.assign({}, options1.build, options2.build);
  const compilation = Object.assign({}, options1.compilation, options2.compilation);
  const adNetworkNames = Object.assign({}, options1.adNetworkNames, options2.adNetworkNames);
  const options = Object.assign({}, options1, options2);

  options.defines = defines;
  options.compilation = compilation;
  options.adNetworkNames = adNetworkNames;
  options.build = build;

  return options;
};
