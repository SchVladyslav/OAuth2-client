import { User } from './user.interface';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
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
