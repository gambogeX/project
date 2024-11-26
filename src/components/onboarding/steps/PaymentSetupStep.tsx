import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useStore } from '../../../store/useStore';

export function PaymentSetupStep() {
  const { previousOnboardingStep, setOnboardingComplete } = useStore();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOnboardingComplete();
  };

  const paymentMethods = [
    {
      id: 'mtn',
      name: 'MTN Mobile Money',
      description: 'Fast and secure mobile money transfers',
      logo: '🌟',
    },
    {
      id: 'flutterwave',
      name: 'Flutterwave',
      description: 'Send money to your bank account',
      logo: '💳',
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Set Up Payment Method
        </h3>
        <p className="text-gray-600">
          Choose how you want to receive your rewards
        </p>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              paymentMethod === method.id
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-200'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={paymentMethod === method.id}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="sr-only"
            />
            <div className="flex-1 flex items-center space-x-4">
              <span className="text-2xl">{method.logo}</span>
              <div>
                <p className="font-medium text-gray-900">{method.name}</p>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </div>
            {paymentMethod === method.id && (
              <Check className="h-5 w-5 text-indigo-600" />
            )}
          </label>
        ))}
      </div>

      {paymentMethod && (
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Mobile Money Number
          </label>
          <input
            type="tel"
            id="phone"
            required
            placeholder="Enter your mobile money number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      )}

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={previousOnboardingStep}
          className="flex-1 btn-secondary flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          type="submit"
          disabled={!paymentMethod || !phoneNumber}
          className={`flex-1 btn-primary flex items-center justify-center space-x-2 ${
            (!paymentMethod || !phoneNumber) && 'opacity-50 cursor-not-allowed'
          }`}
        >
          <span>Complete Setup</span>
          <Check className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}