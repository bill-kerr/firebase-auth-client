import type { FirebaseConfig } from './auth';
import {
  LS_KEY_PREFERENCES,
  DEFAULT_PREFERENCES,
  LS_KEY_FIREBASE_CONFIG,
  DEFAULT_FIREBASE_CONFIG,
} from './constants';
import type { Preferences } from './types';

export function getPreferences(): Preferences {
  const storedValues = localStorage.getItem(LS_KEY_PREFERENCES);
  return storedValues ? (JSON.parse(storedValues) as Preferences) : DEFAULT_PREFERENCES;
}

export function savePreferences(prefs: Preferences) {
  localStorage.setItem(LS_KEY_PREFERENCES, JSON.stringify(prefs));
}

export function getFirebaseConfig(): FirebaseConfig {
  const storedValues = localStorage.getItem(LS_KEY_FIREBASE_CONFIG);
  return storedValues ? (JSON.parse(storedValues) as FirebaseConfig) : DEFAULT_FIREBASE_CONFIG;
}

export function saveFirebaseConfig(config: FirebaseConfig) {
  localStorage.setItem(LS_KEY_FIREBASE_CONFIG, JSON.stringify(config));
}
