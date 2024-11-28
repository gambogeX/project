import { AuthUser, LoginCredentials, SignupCredentials } from '../types/auth';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class AuthService {
  private static instance: AuthService;
  private readonly storageKey = 'auth_token';

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginCredentials): Promise<AuthUser> {
    await delay(1000); // Simulate API call

    // In a real app, this would make an API request
    if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
      const user: AuthUser = {
        id: '1',
        email: credentials.email,
        name: 'Demo User',
        emailVerified: true,
        provider: 'email',
        balance: 0
      };
      
      localStorage.setItem(this.storageKey, 'demo_token');
      return user;
    }

    throw new Error('Invalid credentials');
  }

  async signup(credentials: SignupCredentials): Promise<AuthUser> {
    await delay(1000); // Simulate API call

    const user: AuthUser = {
      id: Date.now().toString(),
      email: credentials.email,
      name: credentials.name,
      emailVerified: false,
      provider: 'email',
      balance: 0
    };

    localStorage.setItem(this.storageKey, 'demo_token');
    return user;
  }

  async logout(): Promise<void> {
    await delay(500); // Simulate API call
    localStorage.removeItem(this.storageKey);
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    const token = localStorage.getItem(this.storageKey);
    if (!token) return null;

    // In a real app, this would validate the token with the backend
    return {
      id: '1',
      email: 'demo@example.com',
      name: 'Demo User',
      emailVerified: true,
      provider: 'email',
      balance: 0
    };
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }
}

export const authService = AuthService.getInstance();
