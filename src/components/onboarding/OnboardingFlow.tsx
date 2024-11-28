import React, { useState } from 'react';
import { userOnboarding } from '../../services/onboarding';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MobileMoneyStep } from './Steps/MobileMoneyStep';
import { SkillAssessmentStep } from './Steps/SkillAssessmentStep';
import { VerificationStep } from './Steps/VerificationStep';
import axios from 'axios';
import { AES, enc } from 'crypto-js';
import { logger } from '../../services/logger';

const phoneSchema = z.object({
  phoneNumber: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
});

const api = axios.create({
  baseURL: process.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const onboardingApi = {
  verifyPhone: async (phoneNumber: string) => {
    return api.post('/onboarding/verify-phone', { phoneNumber });
  },
  
  verifyCode: async (phoneNumber: string, code: string) => {
    return api.post('/onboarding/verify-code', { phoneNumber, code });
  },
  
  linkMobileMoney: async (provider: string, phoneNumber: string) => {
    return api.post('/onboarding/link-mobile-money', { provider, phoneNumber });
  },
  
  submitSkillAssessment: async (answers: Record<string, any>) => {
    return api.post('/onboarding/skill-assessment', { answers });
  },
};

export const security = {
  // Encrypt sensitive data
  encrypt: (text: string): string => {
    return AES.encrypt(text, process.env.VITE_ENCRYPTION_KEY!).toString();
  },

  // Decrypt sensitive data
  decrypt: (ciphertext: string): string => {
    const bytes = AES.decrypt(ciphertext, process.env.VITE_ENCRYPTION_KEY!);
    return bytes.toString(enc.Utf8);
  },

  // Rate limiting for verification attempts
  verificationAttempts: new Map<string, number>(),

  checkRateLimit: (phoneNumber: string): boolean => {
    const attempts = security.verificationAttempts.get(phoneNumber) || 0;
    if (attempts >= 3) return false;
    security.verificationAttempts.set(phoneNumber, attempts + 1);
    return true;
  },
};

export const OnboardingFlow = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(phoneSchema)
  });

  const onSubmit = async (data: { phoneNumber: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      await userOnboarding(data.phoneNumber);
      setStep(2);
    } catch (err) {
      setError(err.message);
      logger.error('Onboarding Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg">
          {error}
        </div>
      )}

      {step === 1 && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              {...register('phoneNumber')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="+1234567890"
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full"
          >
            {isLoading ? 'Sending...' : 'Continue'}
          </button>
        </form>
      )}

      {step === 2 && <MobileMoneyStep />}
      {step === 3 && <SkillAssessmentStep />}
      {step === 4 && <VerificationStep />}
    </div>
  );
};

export const MobileMoneyStep = () => {
  const providers = [
    'M-Pesa',
    'MTN Mobile Money',
    'Airtel Money',
    'Orange Money'
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Link Mobile Money</h2>
      <div className="grid gap-3">
        {providers.map(provider => (
          <button
            key={provider}
            className="btn-secondary text-left flex items-center"
          >
            <span className="flex-1">{provider}</span>
            <span className="text-gray-400">→</span>
          </button>
        ))}
      </div>
    </div>
  );
};