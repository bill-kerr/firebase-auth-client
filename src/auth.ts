import firebase from 'firebase/app';
import 'firebase/auth';
import type { User } from './types';
import { FIREBASE_CHECK_URL } from './constants';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

interface FirebaseLoginError {
  code: string;
  message: string;
}

interface LoginError {
  id: string;
  message: string;
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

export type AuthUnsubscribe = () => void;
export function setAuthStateListener(
  onAuthStateChanged: (user: User) => void,
  autoLogin = true
): AuthUnsubscribe {
  if (firebase.apps.length !== 1) {
    return () => null;
  }

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
  const res = await fetch(`${FIREBASE_CHECK_URL}?key=${key}`, {
    method: 'POST',
    credentials: 'same-origin',
  });
  const data = await res.json();
  return data.error?.message === 'MISSING_ID_TOKEN';
}

export function isNoUser(user: User): boolean {
  return user.email === '' && user.id === '' && user.token === '';
}

export async function login(
  email: string,
  password: string,
  setLoggedIn = false
): Promise<User | LoginError> {
  try {
    const userRecord = await firebase.auth().signInWithEmailAndPassword(email, password);
    const token = await userRecord.user.getIdToken();
    const user = mapUser(userRecord.user, token);
    user.loggedIn === setLoggedIn;
    return user;
  } catch (error) {
    return handleLoginError({ ...error, id: 'error' } as FirebaseLoginError);
  }
}

function handleLoginError(error: FirebaseLoginError) {
  console.log(error);
  switch (error.message) {
    case 'auth/user-not-found':
      return { message: 'Incorrect email or password', id: 'error' };
    default:
      return { message: 'Incorrect email or password', id: 'error' };
  }
}

export function isLoginError(error: LoginError | User): error is LoginError {
  if (error.id === 'error') {
    return true;
  }
  return false;
}

export function getCurrentUser() {
  return firebase.auth().currentUser;
}
