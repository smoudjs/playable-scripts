# @smoud/playable-scripts

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
// Handle resize events
sdk.on('resize', (width, height) => {
  game.resize(width, height);
});

// Lifecycle events
sdk.on('pause', game.pause, game);
sdk.on('resume', game.resume, game);
sdk.on('volume', game.volume, game);
sdk.on('finish', game.finish, game);

// Track interactions
sdk.on('interaction', (count) => {
  console.log(`User interaction count: ${count}`);
});
```

#### 4. Playable Lifecycle

```javascript
// Start playable
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

| Option         | Description                              | Default         | Example                       |
| -------------- | ---------------------------------------- | --------------- | ----------------------------- |
| **Ad Network** | Target ad network                        | `preview`       | `applovin`                    |
| `--out-dir`    | Output directory for build files         | `dist`          | `--out-dir build`             |
| `--config`     | Path to build.json configuration file    | `build.json`    | `--config custom.json`        |
| `--ts-config`  | Path to tsconfig.json configuration file | `tsconfig.json` | `--config tsconfig.prod.json` |
| `--protocol`   | Ad protocol to use                       | `none`          | `--protocol mraid`            |
| `--port`       | Development server port number           | `3000`          | `--port 8080`                 |
| `--open`       | Open browser automatically               | `false`         | `--open`                      |
| `--dev`        | Enable development mode                  | `true`          | `--dev false`                 |
| `--debugger`   | URL of debugger script to inject         | -               | `--debugger http://...`       |

#### Target Ad Network

Specify the target network directly as a command argument:

```bash
playable-scripts build unity
```

#### Supported Networks

- `preview` - Development preview
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
- `tiktok` (TIKTOK) - TikTok
- `appreciate` (APPRECIATE) - Appreciate
- `chartboost` (CHARTBOOST) - Chartboost
- `pangle` (PANGLE) - Pangle
- `mytarget` (MYTARGET) - MyTarget
- `liftoff` (LIFTOFF) - Liftoff

#### Supported Protocols

- `none` - No specific ad protocol
- `mraid` - Mobile Rich Media Ad Interface Definitions
- `dapi` - Display Advertising Programming Interface

Note: MRAID protocol is automatically used for ironSource, AppLovin, Unity, Appreciate, Chartboost, MyTarget, Liftoff, and AdColony networks.

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

Build with DAPI protocol:

```bash
npx playable-scripts build ironsource --protocol dapi
```

```bash
npm run build ironsource -- --protocol dapi
```

## API Reference

The package provides a programmatic API for integration into your build tools:

### Default Options

```javascript
const options = {
  // CLI options
  outDir: 'dist', // Output directory for build files
  config: 'build.json', // Path to build.json configuration file
  tsConfig: 'tsconfig.json', // For TypeScript projects, path to tsconfig.json file
  port: 3000, // Development server port number
  open: false, // Whether to open browser automatically
  protocol: 'none', // Ad protocol to use (none, mraid, or dapi)
  network: 'preview', // Target Ad network
  dev: undefined, // Development mode flag
  debugger: undefined, // URL of debugger script to inject

  // Build options
  build: {
    filename: '{app}_{name}_{version}_{date}_{language}_{network}', // Template for output filename
    app: 'AppName', // Application name used in build output
    name: 'ConceptName', // Concept name used in build output
    version: '1', // Build version number
    language: 'EN', // Language code for localization
    google_play_url: 'https://play.google.com/store/games', // Google Play Store URL
    app_store_url: 'https://www.apple.com/app-store/' // App Store URL
  },

  // Defines options (automatically generated from CLI and Build options)
  defines: {
    __DEV__: false, // Development mode flag
    GOOGLE_PLAY_URL: '...', // Google Play Store URL constant
    APP_STORE_URL: '...', // App Store URL constant
    AD_NETWORK: '...', // Current advertising network identifier
    AD_PROTOCOL: '...', // Current advertising protocol
    BUILD_APP: '...', // Application name constant
    BUILD_NAME: '...', // Build name constant
    BUILD_VERSION: '...', // Build version constant
    BUILD_HASH: '...', // Unique build identifier
    LANGUAGE: '...' // Current language code
  }
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
newOptions.build.app = 'Example';
newOptions.build.version = 'v4';

// Change defines options
newOptions.defines['APP_STORE_URL'] = JSON.stringify('https://www.apple.com/app-store/');
newOptions.defines['__DEV__'] = JSON.stringify(false);

// merge new options with defaults
const finalOptions = mergeOptions(options, newOptions);
```

### Webpack Configuration

```javascript
const { 
  makeWebpackDevConfig,
  makeWebpackBuildConfig,
  webpackCommonConfig
} = require('@smoud/playable-scripts');
const { merge } = require('webpack-merge');

// Create development configuration
const devConfig = makeWebpackDevConfig(customOptions);

// Create production configuration
const buildConfig = makeWebpackBuildConfig();

// Create production configuration with custom definitions
const buildConfig = makeWebpackBuildConfig(customOptions, customDefinitions);

// Create production configuration with custom definitions and custom webpack config to merge
const buildConfig = makeWebpackBuildConfig(customOptions, customDefinitions, customWebpackConfig);

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
```

### Production Build

```javascript
const { runBuild } = require('@smoud/playable-scripts');

// Run production build with custom config
runBuild(webpackBuildConfig);

// Run production build with default config
runBuild();
```

### Plugins

The package includes several webpack plugins for ad network integration:

```javascript
const { 
  DAPIInjectorPlugin, 
  ExitAPIInjectorPlugin, 
  DebuggerInjectionPlugin 
} = require('@smoud/playable-scripts');

// DAPI integration
new DAPIInjectorPlugin();

// Google Ads ExitAPI integration
new ExitAPIInjectorPlugin();

// Custom debugger integration
new DebuggerInjectionPlugin('http://debugger-url');
```

## Issues

Report issues at [GitHub Issues](https://github.com/smoudjs/playable-scripts/issues)
