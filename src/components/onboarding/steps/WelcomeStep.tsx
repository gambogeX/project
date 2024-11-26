import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../../../store/useStore';

export function WelcomeStep() {
  const { nextOnboardingStep } = useStore();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">👋</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Welcome to SocialFi Rewards
        </h3>
        <p className="text-gray-600">
          Start earning rewards by completing social media tasks. We'll help you get
          started in just a few steps.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
          <div className="flex-shrink-0">🎯</div>
          <div>
            <h4 className="font-medium text-gray-900">Complete Tasks</h4>
            <p className="text-sm text-gray-600">
              Engage with brands through social media tasks
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
          <div className="flex-shrink-0">💰</div>
          <div>
            <h4 className="font-medium text-gray-900">Earn Rewards</h4>
            <p className="text-sm text-gray-600">
              Get paid directly to your mobile money account
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
          <div className="flex-shrink-0">📱</div>
          <div>
            <h4 className="font-medium text-gray-900">Easy Withdrawals</h4>
            <p className="text-sm text-gray-600">
              Withdraw earnings to your preferred payment method
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={nextOnboardingStep}
        className="w-full btn-primary flex items-center justify-center space-x-2"
      >
        <span>Get Started</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}