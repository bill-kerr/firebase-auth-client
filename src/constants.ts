import type { FirebaseConfig } from './auth';
import type { Preferences } from './types';

const APP_PREFIX = 'fb-auth-client:';

export const LS_KEY_FIREBASE_CONFIG = APP_PREFIX + 'firebase-config';
export const LS_KEY_PREFERENCES = APP_PREFIX + 'preferences';

export const FIREBASE_CHECK_URL =
  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo';

export const DEFAULT_PREFERENCES: Preferences = {
  autoLogin: false,
};

export const DEFAULT_FIREBASE_CONFIG: FirebaseConfig = {
  apiKey: '',
  appId: '',
  authDomain: '',
  databaseURL: '',
  messagingSenderId: '',
  projectId: '',
  storageBucket: '',
};
