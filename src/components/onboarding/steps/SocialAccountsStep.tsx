import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Twitter } from 'lucide-react';
import { useStore } from '../../../store/useStore';

export function SocialAccountsStep() {
  const { nextOnboardingStep, previousOnboardingStep } = useStore();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate Twitter connection
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Connect Your Social Accounts
        </h3>
        <p className="text-gray-600">
          Link your social media accounts to start earning rewards
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Twitter className="h-6 w-6 text-[#1DA1F2]" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Twitter</h4>
                <p className="text-sm text-gray-500">Connect your Twitter account</p>
              </div>
            </div>
            <button
              onClick={handleConnect}
              disabled={isConnecting || isConnected}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                isConnected
                  ? 'bg-green-50 text-green-700'
                  : 'bg-[#1DA1F2] text-white hover:bg-[#1a8cd8]'
              }`}
            >
              {isConnecting
                ? 'Connecting...'
                : isConnected
                ? 'Connected'
                : 'Connect'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mt-8">
        <button
          onClick={previousOnboardingStep}
          className="flex-1 btn-secondary flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          onClick={nextOnboardingStep}
          disabled={!isConnected}
          className={`flex-1 btn-primary flex items-center justify-center space-x-2 ${
            !isConnected && 'opacity-50 cursor-not-allowed'
          }`}
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}