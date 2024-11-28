import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { userOnboarding } from '../../services/onboarding'; // Add this import
import { logger } from '../../services/logger'; // Add this import if you have a logger service

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const onboardingApi = {
  linkMobileMoney: async (provider: string, phoneNumber: string) => {
    return api.post('/onboarding/link-mobile-money', { provider, phoneNumber });
  },
};

export const OnboardingFlow = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const phoneSchema = z.object({
    phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters long')
  });

  type PhoneFormData = z.infer<typeof phoneSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema)
  });

  const onSubmit = async (data: PhoneFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await userOnboarding(data.phoneNumber);
      setPhoneNumber(data.phoneNumber);
      setStep(2);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      logger.error('Onboarding Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const linkMobileMoney = async (provider: string) => {
    try {
      await onboardingApi.linkMobileMoney(provider, phoneNumber);
      setStep(3);
    } catch (error) {
      logger.error('Link Mobile Money Error:', error);
      setError('Failed to link mobile money');
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

      {step === 2 && <MobileMoneyStep onLinkMobileMoney={linkMobileMoney} />}
    </div>
  );
};

interface MobileMoneyStepProps {
  onLinkMobileMoney: (provider: string) => void;
}

export const MobileMoneyStep = ({ onLinkMobileMoney }: MobileMoneyStepProps) => {
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
            onClick={() => onLinkMobileMoney(provider)}
          >
            <span className="flex-1">{provider}</span>
            <span className="text-gray-400">→</span>
          </button>
        ))}
      </div>
    </div>
  );
};
