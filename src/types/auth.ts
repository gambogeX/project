export interface AuthUser {
  id: string;
  email: string;
  name: string;
  level: number;
  avatar?: string;
  emailVerified?: boolean;
  provider?: 'email' | 'twitter';
  balance: number;
  paymentMethod?: {
    type: 'mtn' | 'flutterwave';
    phoneNumber: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  name: string;
}

export interface AuthError {
  code: string;
  message: string;
}

export type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  error: AuthError | null;
};
