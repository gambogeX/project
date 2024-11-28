import { create } from 'zustand';
import { AuthUser, AuthError } from '../types/auth';

interface AppState {
  user: AuthUser | null;
  loading: boolean;
  error: AuthError | null;
  isOnboarding: boolean;
  currentOnboardingStep: number;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: AuthError | null) => void;
  setOnboardingComplete: () => void;
  nextOnboardingStep: () => void;
  previousOnboardingStep: () => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  loading: false,
  error: null,
  isOnboarding: false,
  currentOnboardingStep: 0,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setOnboardingComplete: () => 
    set((state) => ({
      user: state.user ? { ...state.user, onboardingComplete: true } : null,
      isOnboarding: false,
    })),
  nextOnboardingStep: () =>
    set((state) => ({ currentOnboardingStep: state.currentOnboardingStep + 1 })),
  previousOnboardingStep: () =>
    set((state) => ({ currentOnboardingStep: state.currentOnboardingStep - 1 })),
}));