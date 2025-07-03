const path = require('path');
const fs = require('fs');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { options } = require('./options');

const tsConfigPath = path.resolve(options.tsConfig);
const jsConfigPath = path.resolve(options.jsConfig);
let jsTsConfigPath = null;
if (fs.existsSync(tsConfigPath)) {
  jsTsConfigPath = tsConfigPath;
} else if (fs.existsSync(jsConfigPath)) {
  jsTsConfigPath = jsConfigPath;
}

/** @type {string[]} List of file extensions that webpack will resolve */
const allowedExtensions = [
  '.ts',
  '.tsx',
  '.js',
  '.json',
  '.png',
  '.glb',
  '.fbx',
  '.obj',
  '.jpg',
  '.mp3',
  '.svg',
  '.css',
  '.gif',
  '.mp4',
  '.woff',
  '.woff2',
  '.ttf',
  '.otf'
];

/** @type {import('webpack').Configuration} Base webpack configuration used by both development and build configs */
const webpackConfig = {
  entry: path.resolve('src/index'),
  resolve: {
    extensions: allowedExtensions,
    alias: {
      assets: path.resolve('assets')
    },
    plugins: jsTsConfigPath
      ? [
          new TsconfigPathsPlugin({
            configFile: jsTsConfigPath,
            extensions: allowedExtensions
          })
        ]
      : []
  },
  output: {
    filename: 'build.js',
    path: path.resolve('dist')
  },
  module: {
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // presets: ['@babel/preset-env'],
              plugins:
                options.compilation.allowTemplateLiterals === false ? ['@babel/plugin-transform-template-literals'] : []
            }
          },

          {
            loader: 'esbuild-loader',
            options: {
              loader: 'ts',
              target: 'es2015'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(js|mjs)$/,
        // exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-env'],
            plugins: options.compilation.allowTemplateLiterals === false ? ['@babel/plugin-transform-template-literals'] : []
          }
        }
      },
      {
        test: /\.(gltf)$/,
        loader: path.join(__dirname, 'loaders/gltf-loader.js')
      },
      {
        test: /\.(gif|png|jpe?g|svg|mp3|m4a|ogg|wav|json|glb|fbx|obj$)$/i,
        type: 'asset/inline'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/inline'
      }
    ]
  },
  plugins: []
};

exports.allowedExtensions = allowedExtensions;
exports.webpackCommonConfig = webpackConfig;
