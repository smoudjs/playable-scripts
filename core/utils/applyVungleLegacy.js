/**
 * Switches a webpack config to the legacy (ES5) builder for old Vungle runtimes that can't run ES2015+.
 * Webpack's own runtime is emitted as ES5, and every babel-loader gets @babel/preset-env targeting IE 11.
 * Syntax only - no polyfills are added.
 * @param {import('webpack').Configuration} webpackConfig - Webpack configuration to modify
 */
exports.applyVungleLegacy = function applyVungleLegacy(webpackConfig) {
  const preset = [require.resolve('@babel/preset-env'), { targets: { ie: '11' }, modules: false, bugfixes: true }];

  const toES5 = (use) =>
    use && use.loader === 'babel-loader'
      ? { ...use, options: { ...use.options, presets: [...((use.options && use.options.presets) || []), preset] } }
      : use;

  webpackConfig.target = ['web', 'es5'];
  webpackConfig.module.rules = webpackConfig.module.rules.map((rule) =>
    rule.use ? { ...rule, use: Array.isArray(rule.use) ? rule.use.map(toES5) : toES5(rule.use) } : rule
  );
};
