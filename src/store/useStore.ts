import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  completedTasks: number;
  onboardingComplete: boolean;
  paymentMethod?: {
    type: 'mtn' | 'flutterwave';
    phoneNumber: string;
  };
}

interface AppState {
  user: User | null;
  isOnboarding: boolean;
  currentOnboardingStep: number;
  setUser: (user: User) => void;
  setOnboardingComplete: () => void;
  nextOnboardingStep: () => void;
  previousOnboardingStep: () => void;
  updateBalance: (newBalance: number) => void;
}

export const useStore = create<AppState>((set) => ({
  user: {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    balance: 2.50,
    completedTasks: 5,
    onboardingComplete: true,
    paymentMethod: {
      type: 'mtn',
      phoneNumber: '+234 123 456 7890'
    }
  },
  isOnboarding: false,
  currentOnboardingStep: 0,
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