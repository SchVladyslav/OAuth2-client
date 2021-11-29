import { User } from './user.interface';

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface AuthData {
  email: string;
  password: string;
}

export interface ProjectData {
  name: string;
  redirectURL: string;
}
