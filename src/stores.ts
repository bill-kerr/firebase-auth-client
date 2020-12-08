import { writable } from 'svelte/store';
import { getPreferences, savePreferences } from './storage';
import type { Preferences } from './types';

function createPreferences() {
  const { subscribe, update } = writable(getPreferences());

  return {
    subscribe,
    setAutoLogin: (autoLogin: boolean) => {
      update(prefs => {
        const updatedPrefs: Preferences = { ...prefs, autoLogin };
        savePreferences(updatedPrefs);
        return updatedPrefs;
      });
    },
  };
}

export const preferences = createPreferences();
