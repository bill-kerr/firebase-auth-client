import firebase from 'firebase/app';
import 'firebase/auth';
import type { User } from './user';

interface FirebaseConfig {
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

export function initializeFirebase(config: FirebaseConfig) {
  firebase.initializeApp(config);
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
    ? { id: firebaseUser.uid, email: firebaseUser.email || '', token, loggedIn: false }
    : noUser;
}
