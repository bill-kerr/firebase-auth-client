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
