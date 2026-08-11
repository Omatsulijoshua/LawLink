/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_ENABLE_AUDIT_LOGGING: string;
  readonly VITE_DEFAULT_COUNTRY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
