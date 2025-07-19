export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthService {
  login(email: string, password: string): Promise<AuthResponse>;
  register(user: { email: string; password: string; name?: string }): Promise<AuthResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  isLoggedIn(): boolean;
}
