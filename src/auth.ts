import firebase from 'firebase/app';
import 'firebase/auth';
import type { User } from './user';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export const noUser: User = {
  id: '',
  email: '',
  token: '',
  loggedIn: false,
};

export async function initializeFirebase(config: FirebaseConfig): Promise<boolean> {
  if (firebase.apps.length > 0) {
    await firebase.app().delete();
  }
  firebase.initializeApp(config);
  const valid = await apiKeyValid(config.apiKey);
  return valid;
}

type AuthUnsubscribe = () => void;
export function setAuthStateListener(
  onAuthStateChanged: (user: User) => void,
  autoLogin = true
): AuthUnsubscribe {
  return firebase.auth().onAuthStateChanged(async firebaseUser => {
    const token = firebaseUser ? await firebaseUser.getIdToken() : '';
    const user = mapUser(firebaseUser, token);
    user.loggedIn = autoLogin;
    onAuthStateChanged(user);
  });
}

export function logout() {
  return firebase.auth().signOut();
}

export function getNewToken() {
  return firebase.auth().currentUser.getIdToken(true);
}

function mapUser(firebaseUser: firebase.User, token: string): User {
  return firebaseUser
    ? {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        token,
        loggedIn: false,
      }
    : noUser;
}

async function apiKeyValid(key: string): Promise<boolean> {
  const baseUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  const res = await fetch(`${baseUrl}/getAccountInfo?key=${key}`, {
    method: 'POST',
    credentials: 'same-origin',
  });
  const data = await res.json();
  return data.error?.message === 'MISSING_ID_TOKEN';
}
