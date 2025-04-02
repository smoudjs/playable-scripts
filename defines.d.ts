declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '*.glb';
declare module '*.gltf';
declare module '*.mp3';

declare const AD_NETWORK:
  | 'preview'
  | 'applovin'
  | 'unity'
  | 'google'
  | 'ironsource'
  | 'facebook'
  | 'moloco'
  | 'mintegral'
  | 'vungle'
  | 'adcolony'
  | 'tapjoy'
  | 'snapchat'
  | 'tiktok'
  | 'appreciate'
  | 'chartboost'
  | 'pangle'
  | 'mytarget'
  | 'liftoff';
declare const AD_PROTOCOL: 'mraid' | 'dapi' | 'nucleo' | 'none';
declare const GOOGLE_PLAY_URL: string;
declare const APP_STORE_URL: string;
declare const BUILD_APP: string;
declare const BUILD_NAME: string;
declare const BUILD_VERSION: string;
declare const BUILD_HASH: string;
declare const LANGUAGE: string;
declare const __DEV__: boolean;
