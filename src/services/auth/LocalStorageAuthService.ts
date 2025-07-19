import { AuthService, User, AuthResponse } from './types';

const STORAGE_KEY = 'auth-user';

export class LocalStorageAuthService implements AuthService {
  async login(email: string, password: string): Promise<AuthResponse> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user: User = {
      id: '1', // In real app, this would come from backend
      email,
      name: email.split('@')[0],
    };

    const response: AuthResponse = {
      user,
      token: 'mock-token', // In real app, this would come from backend
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(response));
    return response;
  }

  async register(user: { email: string; password: string; name?: string }): Promise<AuthResponse> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newUser: User = {
      id: '1', // In real app, this would come from backend
      email: user.email,
      name: user.name,
    };

    const response: AuthResponse = {
      user: newUser,
      token: 'mock-token', // In real app, this would come from backend
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(response));
    return response;
  }

  async logout(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
  }

  async getCurrentUser(): Promise<User | null> {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    
    const { user } = JSON.parse(data) as AuthResponse;
    return user;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(STORAGE_KEY) !== null;
  }
}
