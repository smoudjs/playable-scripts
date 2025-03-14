/**
 * Merges two option objects with deep merge for 'defines' and 'build' properties
 * @param {Object} options1 - First options object
 * @param {Object} options2 - Second options object
 * @returns {Object} Merged options object with combined defines and build properties
 */
exports.mergeOptions = function mergeOptions(options1, options2) {
  options1 = options1 || {};
  options2 = options2 || {};

  const defines = Object.assign({}, options1.defines, options2.defines);
  const build = Object.assign({}, options1.build, options2.build);
  const options = Object.assign({}, options1, options2);

  options.defines = defines;
  options.build = build;

  return options;
};
