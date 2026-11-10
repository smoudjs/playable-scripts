const fs = require('fs');
const webpack = require('webpack');

/**
 * Minimal webpack plugin that copies files into the build output.
 * Lightweight replacement for copy-webpack-plugin (single files only, no globs).
 * @implements {import('webpack').WebpackPluginInstance}
 */
class CopyFilePlugin {
  /**
   * @param {{ from: string, to: string }[]} patterns - Absolute source paths and output-relative target names
   */
  constructor(patterns) {
    this.patterns = patterns;
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap('CopyFilePlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        { name: 'CopyFilePlugin', stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL },
        () => {
          for (const { from, to } of this.patterns) {
            compilation.fileDependencies.add(from);
            compilation.emitAsset(to, new webpack.sources.RawSource(fs.readFileSync(from)));
          }
        }
      );
    });
  }
}

exports.CopyFilePlugin = CopyFilePlugin;
