/// <reference types="vite/client" />

interface ImportMetaEnv {
    // Define your environment variables here
    NODE_ENV: 'development' | 'production' | 'test';
    API_BASE_URL: string;
    // Add more variables as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }