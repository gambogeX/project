import React from 'react';
import { useStore } from '../../store/useStore';
import { WelcomeStep } from './steps/WelcomeStep';
import { ProfileStep } from './steps/ProfileStep';
import { SocialAccountsStep } from './steps/SocialAccountsStep';
import { PaymentSetupStep } from './steps/PaymentSetupStep';

const steps = [
  { component: WelcomeStep, title: 'Welcome to SocialFi' },
  { component: ProfileStep, title: 'Create Your Profile' },
  { component: SocialAccountsStep, title: 'Connect Social Accounts' },
  { component: PaymentSetupStep, title: 'Setup Payment Method' },
];

export function OnboardingFlow() {
  const { currentOnboardingStep } = useStore();
  const CurrentStep = steps[currentOnboardingStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {steps[currentOnboardingStep].title}
            </h2>
            <span className="text-sm text-gray-500">
              Step {currentOnboardingStep + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 h-1 rounded-full">
            <div
              className="bg-indigo-600 h-1 rounded-full transition-all duration-300"
              style={{
                width: `${((currentOnboardingStep + 1) / steps.length) * 100}%`,
              }}
            />
          </div>
        </div>
        <CurrentStep />
      </div>
    </div>
  );
}