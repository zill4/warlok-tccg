/// <reference types="vite/client" />
/// <reference types="@webspatial/react-sdk" />

interface ImportMetaEnv {
  readonly XR_ENV: string;
  readonly XR_DEV_SERVER: string;
  readonly XR_PRE_SERVER: string;
  readonly XR_PROD_SERVER: string;
  readonly XR_BUNDLE_ID: string;
  readonly XR_TEAM_ID: string;
  readonly XR_VERSION: string;
  readonly XR_DEV_NAME: string;
  readonly XR_DEV_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __XR_ENV_BASE__: string;
