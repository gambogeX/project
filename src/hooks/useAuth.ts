import { useCallback } from 'react';
import { useStore } from '../store/useStore';
import { authService } from '../services/auth';
import { LoginCredentials, SignupCredentials } from '../types/auth';
import { useToast } from './useToast';

export function useAuth() {
  const { setUser, setLoading, setError } = useStore();
  const toast = useToast();

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const user = await authService.login(credentials);
      setUser(user);
      toast.success('Successfully logged in!');
      return user;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to login';
      setError({ code: 'auth/login-failed', message });
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setUser, setLoading, setError, toast]);

  const signup = useCallback(async (credentials: SignupCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const user = await authService.signup(credentials);
      setUser(user);
      toast.success('Account created successfully!');
      return user;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create account';
      setError({ code: 'auth/signup-failed', message });
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setUser, setLoading, setError, toast]);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      toast.success('Successfully logged out');
    } catch (error) {
      const message = 'Failed to logout';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setUser, setLoading, toast]);

  return {
    login,
    signup,
    logout,
    isAuthenticated: authService.isAuthenticated(),
  };
}