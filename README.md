# @smoud/playable-scripts

[![npm version](https://img.shields.io/npm/v/@smoud/playable-scripts)](https://www.npmjs.com/package/@smoud/playable-scripts)
[![Downloads](https://img.shields.io/npm/dw/@smoud/playable-scripts)](https://www.npmjs.com/package/@smoud/playable-scripts)
[![DeepScan grade](https://deepscan.io/api/teams/19616/projects/29071/branches/935562/badge/grade.svg)](https://github.com/smoudjs/playable-scripts)
[![License](https://img.shields.io/npm/l/@smoud/playable-scripts)](https://github.com/smoudjs/playable-scripts/blob/master/LICENSE)

**The Ultimate Build Tool for HTML5 Playable Ads**

`@smoud/playable-scripts` is a powerful CLI and API tool designed to streamline the development, optimization, and packaging of HTML5 playable ads for multiple ad networks. Whether you're building playables for **Google Ads, Meta (Facebook), AppLovin, Unity, IronSource, Vungle, Mintegral, and more**, this tool provides a one-command solution to handle network-specific requirements, asset optimization, and build automation.

## Features

- 🚀 **One-Command Build Process** – Easily generate builds for different ad networks.
- ⚡ **Automatic Optimizations** – Includes minification, tree-shaking, and dead code elimination.
- 🎯 **Pre-configured for Major Ad Networks** – Works out of the box with **Google Ads, Meta (Facebook), AppLovin, Unity, IronSource, Vungle, Mintegral, and many more**.
- 🛠️ **Customizable** – Extend the default build pipeline as needed.

## Installation

```bash
npm install --save-dev @smoud/playable-scripts
```

## Quick Start

1. Install the package
2. Create a basic project structure:

```
your-playable/
  ├── src/
  │   ├── index.html
  │   └── index.ts
  ├── package.json
  └── build.json (optional)
```

3. Add scripts to your package.json:

```json
{
  "scripts": {
    "dev": "playable-scripts dev",
    "build": "playable-scripts build"
  }
}
```

4. Start development:

```bash
npm run dev
```

5. Build for google:

```bash
npm run build google
```

## 🎮 Playable SDK

While `@smoud/playable-scripts` handles the build process, you'll need additional functionality to make your playable ads fully compatible across different ad networks. This is where [`@smoud/playable-sdk`](https://www.npmjs.com/package/@smoud/playable-sdk) comes in.

### ✨ Why Use Playable SDK?

`@smoud/playable-sdk` is a powerful, unified SDK that:

- 🔄 Seamlessly integrates with multiple ad network SDKs (MRAID, Google, Facebook, Vungle, etc.)
- 🎯 Provides a standardized interface for all networks
- 🚀 Ensures cross-platform compatibility and optimization
- 🛠️ Handles ad network-specific requirements automatically
- 💪 Lets you focus on creating engaging interactive ads

### 🔧 Implementation Guide

#### 1. Installation

```sh
npm install @smoud/playable-sdk
```

#### 2. Basic Setup

```javascript
import { sdk } from '@smoud/playable-sdk';

// Initialize SDK with container dimensions
sdk.init((width, height) => {
  new Game(width, height);
});
```

#### 3. Event Handling

```javascript
sdk.on('resize', game.resize, game);
sdk.on('pause', game.pause, game);
sdk.on('resume', game.resume, game);
sdk.on('volume', game.volume, game);
sdk.on('finish', game.finish, game);
```

#### 4. Playable Lifecycle

```javascript
// Mark as resources loaded and gameplay started
sdk.start();

// Mark as complete
sdk.finish();

// Handle CTA clicks
installButton.onclick = () => sdk.install();
```

### 🔍 Alternative Approach

If you choose not to use `@smoud/playable-sdk`, you'll need to:

- Implement network-specific requirements manually
- Handle compatibility issues across different platforms
- Manage SDK integrations individually

For detailed implementation guidelines, visit our [GitHub repository](https://github.com/smoudjs/playable-sdk).

## CLI Arguments

| Option                    | Description                               | Default                                                   | Example                          |
| ------------------------- | ----------------------------------------- | --------------------------------------------------------- | -------------------------------- |
| **Ad Network**            | Target ad network                         | `preview`                                                 | `applovin`                       |
| `--out-dir`               | Output directory template for build files | `dist`                                                    | `--out-dir build/{version}`      |
| `--build-config`          | Path to build.json configuration file     | `build.json`                                              | `--build-config custom.json`     |
| `--ts-config`             | Path to tsconfig.json configuration file  | `tsconfig.json`                                           | `--ts-config tsconfig.prod.json` |
| `--js-config`             | Path to jsconfig.json configuration file  | `jsconfig.json`                                           | `--js-config jsconfig.prod.json` |
| `--protocol`              | Ad protocol to use                        | `none`                                                    | `--protocol mraid`               |
| `--zip`                   | ZIP output result                         | `false`                                                   | `--zip`                          |
| `--port`                  | Development server port number            | `3000`                                                    | `--port 8080`                    |
| `--open`                  | Open browser automatically                | `false`                                                   | `--open`                         |
| `--dev`                   | Enable development mode                   | `true` for dev<br>`false` for build                       | `--dev false`                    |
| `--filename`              | Template for output filename              | [See Build Configuration](#build-configuration-buildjson) | `--filename {app}-{version}`     |
| `--app`                   | Application name                          | [See Build Configuration](#build-configuration-buildjson) | `--app MyGame`                   |
| `--name`                  | Concept name                              | [See Build Configuration](#build-configuration-buildjson) | `--name Concept1`                |
| `--version`               | Build version                             | [See Build Configuration](#build-configuration-buildjson) | `--version v2.1`                 |
| `--language`              | Language code                             | [See Build Configuration](#build-configuration-buildjson) | `--language fr`                  |
| `--skip-recommended-meta` | Skip recommended meta tags injection      | -                                                         | `--skip-recommended-meta`        |
| `--debugger`              | URL of debugger script to inject          | -                                                         | `--debugger http://...`          |

#### Target Ad Network

Specify the target network directly as a command argument:

```bash
playable-scripts build unity
```

#### Supported Networks

- `preview` (Preview) - Browser preview
- `applovin` (AL) - AppLovin
- `unity` (UNITY) - Unity Ads
- `google` (GOOGLE) - Google Ads
- `ironsource` (IS) - ironSource
- `facebook` (FB) - Facebook
- `moloco` (MOLOCO) - Moloco
- `adcolony` (ADCOLONY) - AdColony
- `mintegral` (MINTEGRAL) - Mintegral
- `vungle` (VUNGLE) - Vungle
- `tapjoy` (TAPJOY) - Tapjoy
- `snapchat` (SNAPCHAT) - Snapchat
- `tiktok` (TIKTOK) - TikTok / Toutiao
- `appreciate` (APPRECIATE) - Appreciate
- `chartboost` (CHARTBOOST) - Chartboost
- `pangle` (PANGLE) - Pangle
- `mytarget` (MYTARGET) - MyTarget
- `liftoff` (LIFTOFF) - Liftoff

#### Supported Protocols

- `none` - No specific ad protocol
- `mraid` - Mobile Rich Media Ad Interface Definitions
- `dapi` - Display Advertising Programming Interface

Note: MRAID protocol is automatically used for ironSource, AppLovin, Unity, Appreciate, Snapchat, Chartboost, MyTarget, Liftoff, and AdColony networks.

## Build Configuration (build.json)

The `build.json` file allows you to customize build options. Here's the format:

```json
{
  "filename": "{app}_{name}_{version}_{date}_{language}_{network}",
  "app": "AppName",
  "name": "ConceptName",
  "version": "v1",
  "language": "en",
  "googlePlayUrl": "https://play.google.com/store/games",
  "appStoreUrl": "https://www.apple.com/app-store/"
}
```

All fields are optional and will use the default values shown [here](#default-options) if not specified.

Check [Default options](#default-options) to see full list of available options.

## Output directory and filename template

The `outDir` and `filename` templates supports the following variables:

- `{app}` - Application name
- `{name}` - Concept name
- `{version}` - Build version
- `{date}` - Current date
- `{language}` - Language code
- `{network}` - Target ad network
- `{hash}` - Unique build identifier

## Defines

The following global defines are automatically available in your code during development and build:

| Define            | Description                              | Example Value                        |
| ----------------- | ---------------------------------------- | ------------------------------------ |
| `__DEV__`         | Boolean flag indicating development mode | `true` or `false`                    |
| `GOOGLE_PLAY_URL` | Google Play Store URL constant           | `"https://play.google.com/store/"`   |
| `APP_STORE_URL`   | App Store URL constant                   | `"https://www.apple.com/app-store/"` |
| `AD_NETWORK`      | Current advertising network identifier   | `"google"`, `"facebook"`, etc.       |
| `AD_PROTOCOL`     | Current advertising protocol             | `"none"`, `"mraid"`, `"dapi"`        |
| `APP`             | Application name constant                | `"AppName"`                          |
| `NAME`            | Build name constant                      | `"ConceptName"`                      |
| `VERSION`         | Build version constant                   | `"v1"`                               |
| `LANGUAGE`        | Current language code                    | `"en"`, `"es"`, etc.                 |
| `BUILD_HASH`      | Unique build hash                        | `"a1b2c3d4"`                         |

These defines can be used in your code for conditional logic:

```javascript
if (__DEV__) {
  console.log('Dev mode is active');
}

if (AD_NETWORK === 'google') {
  // google network specific code
}

console.log(`Current language: ${LANGUAGE}`);
```

You can also add custom defines by modifying the `defines` property in your build.json file:

```json
{
  "defines": {
    "CUSTOM_DEFINE": "'custom value'",
    "FEATURE_FLAG": "true"
  }
}
```

## Meta Tags

`@smoud/playable-scripts` automatically manages viewport meta tags for optimal display across devices.

**Do not specify your own `viewport` meta tag** as it will be handled and injected into your HTML automatically:

- `<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover,maximum-scale=1.0,user-scalable=no">`

> For Mintegral network, a special viewport configuration is used:
> `<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">`

Additionally, unless `--skip-recommended-meta` is provided, the following recommended meta tags are automatically injected:

```html
<meta name="HandheldFriendly" content="True" />
<meta name="cleartype" http-equiv="cleartype" content="on" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="mobile-web-app-capable" content="yes" />
<meta http-equiv="X-UA-Compatible" content="IE=10" />
```

## Examples

### Development

Start development server:

```bash
playable-scripts dev --port 3000 --open
```

### Building

Build for AppLovin:

```bash
npx playable-scripts build applovin
```

```bash
npm run build applovin
```

Build with DAPI protocol with specific version:

```bash
npx playable-scripts build ironsource --protocol dapi --version endcard_2
```

```bash
npm run build ironsource -- --protocol dapi --version endcard_2
```

## API Reference

The package provides a programmatic API for integration into your build tools:

### Default Options

```javascript
const options = {
  outDir: 'dist', // Output directory for build files
  buildConfig: 'build.json', // Path to build.json configuration file
  tsConfig: 'tsconfig.json', // For TypeScript projects, path to tsconfig.json file
  jsConfig: 'jsconfig.json', // For JavaScript projects, path to jsconfig.json file
  port: 3000, // Development server port number
  open: false, // Whether to open browser automatically
  protocol: 'none', // Ad protocol to use (none, mraid, or dapi)
  network: 'preview', // Target Ad network
  zip: false, // Should the build be zipped? Works only for Ad networks which allows both .zip and .html
  filename: '{app}_{name}_{version}_{date}_{language}_{network}', // Template for output filename
  app: 'AppName', // Application name used in build filename and BUILD_APP define
  name: 'ConceptName', // Concept name used in build filename and BUILD_NAME define
  version: 'v1', // Version name used in build filename and BUILD_VERSION define
  language: 'en', // Language code for localization
  googlePlayUrl: 'https://play.google.com/store/games', // Google Play Store URL
  appStoreUrl: 'https://www.apple.com/app-store/', // App Store URL
  dev: undefined, // Development mode flag
  skipRecommendedMeta: undefined, // Skip recommended meta tags injection
  debugger: undefined, // URL of debugger script to inject
  defines: {}, // Defines options
  compilation: {} // Compilation options
};
```

### Configuration

```javascript
const { options, mergeOptions, parseArgvOptions } = require('@smoud/playable-scripts');

// Merge custom options with defaults
const customOptions = mergeOptions(options, {
  outDir: 'custom-dist',
  network: 'applovin'
});

// Parse CLI arguments
const newOptions = parseArgvOptions([
  {
    name: 'custom-option',
    hasValue: true,
    defaultValue: 'default'
  }
]);

// Change build options
newOptions.app = 'Example';
newOptions.version = 'v4';

// Change defines options
newOptions.defines = {
  APP_STORE_URL: JSON.stringify('https://www.apple.com/app-store/');
  __DEV__: JSON.stringify(false);
}

// Merge new options with defaults
const finalOptions = mergeOptions(options, newOptions);
```

### Webpack Configuration

```javascript
const { makeWebpackDevConfig, makeWebpackBuildConfig } = require('@smoud/playable-scripts');
const { webpackCommonConfig } = require('@smoud/playable-scripts');
const { merge } = require('webpack-merge');

// Create development configuration
const devConfig = makeWebpackDevConfig(customOptions);

// Create production configuration
const buildConfig = makeWebpackBuildConfig();

// Create production configuration with custom definitions
const buildConfig2 = makeWebpackBuildConfig(customOptions, customDefinitions);

// Create production configuration with custom definitions and custom webpack config to merge
const buildConfig3 = makeWebpackBuildConfig(customOptions, customDefinitions, customWebpackConfig);

// Create your own webpack config, based on webpackCommonConfig
const customConfig = merge(webpackCommonConfig, {
  // ...
});
```

### Development Server

```javascript
const { runDev } = require('@smoud/playable-scripts');

// Start development server with custom config
runDev(webpackDevConfig);

// Start development server with default config
runDev();

// Start development server with custom definitions
runDev(null, null, customDefines);
```

### Production Build

```javascript
const { runBuild } = require('@smoud/playable-scripts');

// Run production build with custom config
runBuild(webpackBuildConfig);

// Run production build with default config
runBuild();

// Run production build with custom options
runBuild(null, customOptions);
```

### Plugins

The package includes several webpack plugins for ad network integration:

```javascript
const { ExitAPIInjectorPlugin, DebuggerInjectionPlugin } = require('@smoud/playable-scripts');

// Google Ads ExitAPI integration
new ExitAPIInjectorPlugin();

// Custom debugger integration
new DebuggerInjectionPlugin('http://debugger-url');
```

## Demo Projects

Get started quickly with our template projects:

- [playable-template-base](https://github.com/smoudjs/playable-template-base) - Clean TypeScript starter with minimal dependencies
- [playable-template-base-js](https://github.com/smoudjs/playable-template-base-js) - Clean JavaScript starter with minimal dependencies
- [playable-template-pixi](https://github.com/smoudjs/playable-template-pixi) - PixiJS template for 2D playable ads
- [playable-template-three](https://github.com/smoudjs/playable-template-three) - Three.js template for 3D playable ads
- [playable-template-phaser](https://github.com/smoudjs/playable-template-phaser) - Phaser template for 2D playable ads

## Issues

Report issues at [GitHub Issues](https://github.com/smoudjs/playable-scripts/issues)
