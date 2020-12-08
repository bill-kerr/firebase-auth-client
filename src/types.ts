export interface StatusMessage {
  disposition: 'negative' | 'positive';
  message: string;
}

export interface User {
  id: string;
  email: string;
  token: string;
  loggedIn: boolean;
}

export interface AccessToken {
  iat: number;
  exp: number;
  iss: string;
  aud: string;
  auth_time: number;
  user_id: string;
  sub: string;
  tokenString: string;
}

export interface Preferences {
  autoLogin: boolean;
}
