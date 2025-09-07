var prettyjson = require('prettyjson');

/**
 * Log provided options into console output
 */
exports.logOptions = function logOptions(options) {
  let logOptions = { mode: process.env.NODE_ENV, ...options };
  let isProduction = false;
  if (process.env.NODE_ENV === 'production') {
    isProduction = true;
    delete logOptions.port;
    delete logOptions.open;
  } else if (process.env.NODE_ENV === 'development') {
    delete logOptions.outDir;
  }

  if (Object.keys(logOptions.compilation).length === 0 || !isProduction) delete logOptions.compilation;
  if (Object.keys(logOptions.adNetworkNames).length === 0 || !isProduction) delete logOptions.adNetworkNames;
  if (Object.keys(logOptions.defines).length === 0) delete logOptions.defines;
  if (logOptions.zip === false || !isProduction) delete logOptions.zip;
  if (logOptions.tsConfig === 'tsconfig.json') delete logOptions.tsConfig;
  if (logOptions.jsConfig === 'jsconfig.json') delete logOptions.jsConfig;
  if (logOptions.buildConfig === 'build.json') delete logOptions.buildConfig;
  if (logOptions.language === 'en') delete logOptions.language;
  delete logOptions.filename;
  delete logOptions.app;
  delete logOptions.name;
  delete logOptions.googlePlayUrl;
  delete logOptions.appStoreUrl;

  console.log(prettyjson.render(logOptions, {}, 2));
};
