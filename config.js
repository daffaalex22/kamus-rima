const config = {
  apiKey: import.meta.env.VITE_FIREBASE_PUBLIC_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_PUBLIC_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_PUBLIC_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PUBLIC_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_PUBLIC_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_PUBLIC_APP_ID,
};

export default config;