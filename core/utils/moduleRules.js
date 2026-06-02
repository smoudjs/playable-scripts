/**
 * Webpack asset rules that embed all assets directly into the JS bundle.
 * Use for dev builds and single-file HTML ad networks.
 * @type {import('webpack').RuleSetRule[]}
 */
const inlineAssetRules = [
  {
    test: /\.(gif|png|jpe?g|webp|mp3|mp4|m4a|ogg|wav|glb|fbx|obj|skel)$/i,
    type: 'asset/inline'
  },
  {
    test: /\.(svg|xml|json|atlas)$/i,
    type: 'asset/source'
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/inline'
  }
];

/**
 * Webpack asset rules that emit assets as separate files on disk.
 * Use for zip-output ad networks where assets live alongside the HTML.
 * @type {import('webpack').RuleSetRule[]}
 */
const fileAssetRules = [
  {
    test: /\.(mp3|mp4|m4a|ogg|wav|glb|fbx|obj|skel)$/i,
    type: 'asset/inline'
  },
  {
    test: /\.(gif|png|jpe?g|webp)$/i,
    type: 'asset/resource'
  },
  {
    test: /\.(svg|xml|json|atlas)$/i,
    type: 'asset/source'
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource'
  }
];

/**
 * Webpack asset rules that inline everything except fonts.
 * Fonts are emitted as separate files because WebKit (iOS Safari/WKWebView)
 * fails to decode base64 data-URI fonts when rendering into a canvas — which
 * is exactly how PixiJS draws text. Liftoff rejects builds with inlined fonts
 * for this reason, so they must be referenced by url() from a real file.
 */
const inlineExceptFontsAssetRules = [
  {
    test: /\.(gif|png|jpe?g|webp|mp3|mp4|m4a|ogg|wav|glb|fbx|obj|skel)$/i,
    type: 'asset/inline'
  },
  {
    test: /\.(svg|xml|json|atlas)$/i,
    type: 'asset/source'
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource'
  }
];
exports.inlineExceptFontsAssetRules = inlineExceptFontsAssetRules;

exports.inlineAssetRules = inlineAssetRules;
exports.fileAssetRules = fileAssetRules;
