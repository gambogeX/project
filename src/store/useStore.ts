import { create } from 'zustand';
import { User } from '../types';

interface AuthCredentials {
  email?: string;
  password?: string;
  provider?: 'twitter';
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isOnboarding: boolean;
  currentOnboardingStep: number;
  login: (credentials: AuthCredentials) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setOnboardingComplete: () => void;
  nextOnboardingStep: () => void;
  previousOnboardingStep: () => void;
  updateBalance: (newBalance: number) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  isOnboarding: false,
  currentOnboardingStep: 0,
  login: (credentials) => {
    // Simulate authentication
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: credentials.email ?? 'john@example.com',
      balance: 2.50,
      completedTasks: 5,
      onboardingComplete: true,
      reputation: 100,
      level: '2',
      skills: ['Content Creation', 'Social Media'],
      paymentMethod: {
        type: 'mtn',
        phoneNumber: '+234 123 456 7890'
      }
    };
    set({ user: mockUser, isAuthenticated: true });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
  setUser: (user) => set({ user }),
  setOnboardingComplete: () => 
    set((state) => ({
      user: state.user ? { ...state.user, onboardingComplete: true } : null,
      isOnboarding: false,
    })),
  nextOnboardingStep: () =>
    set((state) => ({ currentOnboardingStep: state.currentOnboardingStep + 1 })),
  previousOnboardingStep: () =>
    set((state) => ({ currentOnboardingStep: state.currentOnboardingStep - 1 })),
  updateBalance: (newBalance) =>
    set((state) => ({
      user: state.user ? { ...state.user, balance: newBalance } : null
    })),
}));