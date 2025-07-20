'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'vendor' | 'ngo' | 'consumer';
  isVerified: boolean;
  createdAt: string;
  lastLogin: string;
}

interface AuthError {
  code: string;
  message: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: AuthError | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<User>;
  register: (email: string, password: string, role: User['role'], name: string, additionalData?: any) => Promise<User>;
  logout: () => Promise<void>;
  clearError: () => void;
  checkEmailExists: (email: string) => Promise<boolean>;
  resendVerification: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated user database - In real app, this would be your backend API
const MOCK_USERS = [
  {
    id: '1',
    email: 'vendor@example.com',
    password: 'password123',
    name: 'Green Grocery Store',
    role: 'vendor' as const,
    isVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    email: 'ngo@example.com',
    password: 'password123',
    name: 'Community Food Bank',
    role: 'ngo' as const,
    isVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-14T15:20:00Z'
  },
  {
    id: '3',
    email: 'consumer@example.com',
    password: 'password123',
    name: 'John Doe',
    role: 'consumer' as const,
    isVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-16T09:45:00Z'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = () => {
      try {
        // Check for remember me preference
        const rememberMe = localStorage.getItem('surplus_connect_remember') === 'true';
        const savedUser = localStorage.getItem('surplus_connect_user');
        
        if (savedUser && rememberMe) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          
          // Set cookie for middleware
          document.cookie = `surplus_connect_user=${savedUser}; path=/; max-age=${30 * 24 * 60 * 60}`; // 30 days for remember me
        } else if (savedUser && !rememberMe) {
          // Check if session is still valid (24 hours for non-remember me)
          const sessionData = JSON.parse(savedUser);
          const lastLogin = new Date(sessionData.lastLogin);
          const now = new Date();
          const hoursDiff = (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60);
          
          if (hoursDiff < 24) {
            setUser(sessionData);
            // Set short-term cookie
            document.cookie = `surplus_connect_user=${savedUser}; path=/; max-age=${24 * 60 * 60}`; // 24 hours
          } else {
            // Session expired, clear everything
            clearSession();
          }
        }
      } catch (error) {
        clearSession();
      } finally {
        setLoading(false);
      }
    };

    checkExistingSession();
  }, []);

  const clearSession = () => {
    localStorage.removeItem('surplus_connect_user');
    localStorage.removeItem('surplus_connect_remember');
    document.cookie = 'surplus_connect_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setUser(null);
    setError(null);
  };

  const clearError = () => setError(null);

  const checkEmailExists = async (email: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_USERS.some(user => user.email.toLowerCase() === email.toLowerCase());
  };

  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<User> => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Find user in mock database
      const foundUser = MOCK_USERS.find(
        user => user.email.toLowerCase() === email.toLowerCase()
      );

      if (!foundUser) {
        throw new AuthError('USER_NOT_FOUND', 'No account found with this email address.');
      }

      if (foundUser.password !== password) {
        throw new AuthError('INVALID_CREDENTIALS', 'Invalid email or password.');
      }

      if (!foundUser.isVerified) {
        throw new AuthError('EMAIL_NOT_VERIFIED', 'Please verify your email address before logging in.');
      }

      // Create user session
      const userSession: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
        isVerified: foundUser.isVerified,
        createdAt: foundUser.createdAt,
        lastLogin: new Date().toISOString()
      };

      // Save session based on remember me preference
      const userSessionString = JSON.stringify(userSession);
      localStorage.setItem('surplus_connect_user', userSessionString);
      
      if (rememberMe) {
        localStorage.setItem('surplus_connect_remember', 'true');
        // Set long-term cookie (30 days)
        document.cookie = `surplus_connect_user=${userSessionString}; path=/; max-age=${30 * 24 * 60 * 60}`;
      } else {
        localStorage.removeItem('surplus_connect_remember');
        // Set short-term cookie (24 hours)
        document.cookie = `surplus_connect_user=${userSessionString}; path=/; max-age=${24 * 60 * 60}`;
      }
      
      setUser(userSession);
      return userSession;
    } catch (error) {
      if (error instanceof AuthError) {
        setError(error);
        throw error;
      }
      const authError = new AuthError('LOGIN_FAILED', 'Login failed. Please try again.');
      setError(authError);
      throw authError;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    email: string, 
    password: string, 
    role: User['role'], 
    name: string,
    additionalData?: any
  ): Promise<User> => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check if email already exists
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        throw new AuthError('EMAIL_EXISTS', 'An account with this email address already exists.');
      }

      // Validate password strength
      if (password.length < 8) {
        throw new AuthError('WEAK_PASSWORD', 'Password must be at least 8 characters long.');
      }

      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        throw new AuthError('WEAK_PASSWORD', 'Password must contain at least one uppercase letter, one lowercase letter, and one number.');
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: email.toLowerCase(),
        name,
        role,
        isVerified: true, // Auto-verify for demo
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      // Save session (default to non-remember for registration)
      const userSessionString = JSON.stringify(newUser);
      localStorage.setItem('surplus_connect_user', userSessionString);
      localStorage.removeItem('surplus_connect_remember');
      document.cookie = `surplus_connect_user=${userSessionString}; path=/; max-age=${24 * 60 * 60}`;
      
      setUser(newUser);
      return newUser;
    } catch (error) {
      if (error instanceof AuthError) {
        setError(error);
        throw error;
      }
      const authError = new AuthError('REGISTRATION_FAILED', 'Registration failed. Please try again.');
      setError(authError);
      throw authError;
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async (email: string): Promise<void> => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real app, send verification email
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      clearSession();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      login, 
      register, 
      logout, 
      clearError,
      checkEmailExists,
      resendVerification
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Custom AuthError class
class AuthError extends Error {
  code: string;
  
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = 'AuthError';
  }
}