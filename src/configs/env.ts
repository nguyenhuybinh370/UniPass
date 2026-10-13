export const ENV = {
  APP_NAME: import.meta.env.VITE_APP_NAME || 'UniPass',
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  USE_MOCK: import.meta.env.VITE_USE_MOCK === 'true' || import.meta.env.VITE_USE_MOCK === true,
  FIREBASE: {
    API_KEY: import.meta.env.VITE_FIREBASE_API_KEY || '',
    AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    APP_ID: import.meta.env.VITE_FIREBASE_APP_ID || '',
  },
} as const;
