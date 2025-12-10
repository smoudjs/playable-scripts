declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '*.webp';
declare module '*.xml';
declare module '*.atlas';
declare module '*.glb';
declare module '*.gltf';
declare module '*.fbx';
declare module '*.obj';
declare module '*.mp3';
declare module '*.mp4';
declare module '*.otf';
declare module '*.ttf';
declare module '*.woff';
declare module '*.woff2';
 
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
  | 'liftoff'
  | 'smadex'
  | 'adikteev'
  | 'bigabid'
  | 'inmobi';

declare const AD_PROTOCOL: 'mraid' | 'dapi' | 'nucleo' | 'none';

declare const GOOGLE_PLAY_URL: string;
declare const APP_STORE_URL: string;
declare const APP: string;
declare const NAME: string;
declare const VERSION: string;
declare const LANGUAGE: 'auto' | 'en' | 'es' | 'zh' | 'hi' | 'ar' | 'fr' | 'de' | 'ja' | 'pt';
declare const ORIENTATION: 'both' | 'portrait' | 'landscape' | 'square';
declare const BUILD_HASH: string;

declare const __DEV__: boolean;
