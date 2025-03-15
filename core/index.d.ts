import { Configuration as WebpackConfig } from 'webpack';
import { WebpackPluginInstance } from 'webpack';

/** Supported file extensions for webpack resolution */
export declare const allowedExtensions: string[];

/** Base webpack configuration used by both development and build configs */
export declare const webpackCommonConfig: WebpackConfig;

/** Options for CLI arguments */
export interface CLIOptionConfig {
  name: string;
  alias?: string;
  hasValue?: boolean;
  defaultValue?: any;
  description: string;
  parser?: (value: string) => any;
}

/** Parse command line arguments based on configuration */
export declare function parseArgvOptions(possibleOptions: CLIOptionConfig[]): Record<string, any>;

/** Deep merge configuration options */
export declare function mergeOptions<T>(target: T, source?: Partial<T>): T;

/** Configuration options for the build process */
export interface BuildOptions {
  /** Template for output filename using pattern {app}_{name}_{version}_{date}_{language}_{network} */
  filename: string;
  /** Application name used in build output */
  app: string;
  /** Concept name used in build output */
  name: string;
  /** Build version number */
  version: string;
  /** Language code for localization */
  language: string;
  /** Google Play Store URL for the app */
  google_play_url: string;
  /** App Store URL for the app */
  app_store_url: string;
}

/** Configuration for webpack defines */
export interface DefinesOptions {
  /** Development mode flag for conditional code */
  __DEV__: string;
  /** Google Play Store URL constant */
  GOOGLE_PLAY_URL: string;
  /** App Store URL constant */
  APP_STORE_URL: string;
  /** Current advertising network identifier */
  AD_NETWORK: string;
  /** Current advertising protocol */
  AD_PROTOCOL: string;
  /** Application name constant */
  BUILD_APP: string;
  /** Build name constant */
  BUILD_NAME: string;
  /** Build version constant */
  BUILD_VERSION: string;
  /** Unique build identifier generated from timestamp */
  BUILD_HASH: string;
  /** Current language code */
  LANGUAGE: string;
}

/** CLI configuration options */
export interface CLIOptions {
  /** Just for output current NODE_ENV mode */
  mode?: string;
  /** Output directory for build files (default: 'dist') */
  outDir: string;
  /** Path to build.json configuration file (default: 'build.json') */
  config: string;
  /** Path to tsconfig.json configuration file (default: 'tsconfig.json') */
  tsConfig: string;
  /** Path to jsconfig.json configuration file (default: 'jsconfig.json') */
  jsConfig: string;
  /** Development server port number (default: 3000) */
  port: number;
  /** Whether to open browser automatically (default: false) */
  open: boolean;
  /** Ad protocol to use (default: 'none') */
  protocol: 'none' | 'mraid' | 'dapi';
  /** Ad network identifier (default: 'preview') */
  network: string;
  /** Development mode flag */
  dev: boolean;
  /** Skip recommended meta tags injection */
  skipRecommendedMeta?: boolean;
  /** URL of debugger script to inject */
  debugger?: string;
  /** Build configuration options */
  build: BuildOptions;
  /** Webpack define plugin configuration */
  defines: DefinesOptions;
}

/** Global options object */
export declare const options: CLIOptions;

/** Create webpack config for development */
export declare function makeWebpackDevConfig(
  customOptions?: Partial<CLIOptions>,
  customDefines?: Record<string, any>,
  webpackCustomConfig?: Partial<WebpackConfig>
): WebpackConfig;

/** Create webpack config for production build */
export declare function makeWebpackBuildConfig(
  customOptions?: Partial<CLIOptions>,
  customDefines?: Record<string, any>,
  webpackCustomConfig?: Partial<WebpackConfig>
): WebpackConfig;

/** Start webpack development server */
export declare function runDev(
  webpackConfig?: WebpackConfig,
  customOptions?: Partial<CLIOptions>,
  customDefines?: Record<string, any>,
  webpackCustomConfig?: Partial<WebpackConfig>
): void;

/** Run webpack production build */
export declare function runBuild(
  webpackConfig?: WebpackConfig,
  customOptions?: Partial<CLIOptions>,
  customDefines?: Record<string, any>,
  webpackCustomConfig?: Partial<WebpackConfig>
): void;

/** Plugin for injecting DAPI script */
export declare class DAPIInjectorPlugin implements WebpackPluginInstance {
  apply(compiler: any): void;
}

/** Plugin for injecting debugger script */
export declare class DebuggerInjectionPlugin implements WebpackPluginInstance {
  constructor(debuggerSrc: string);
  apply(compiler: any): void;
}

/** Plugin for injecting Google's ExitAPI and meta tags */
export declare class ExitAPIInjectorPlugin implements WebpackPluginInstance {
  apply(compiler: any): void;
}
