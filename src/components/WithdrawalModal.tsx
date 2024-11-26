import React, { useState } from 'react';
import { X, Loader2, DollarSign, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

interface WithdrawalModalProps {
  onClose: () => void;
}

export function WithdrawalModal({ onClose }: WithdrawalModalProps) {
  const { user } = useStore();
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    try {
      setIsSubmitting(true);
      setError('');
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onClose();
    } catch (err) {
      setError('Failed to process withdrawal. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const paymentMethod = user?.paymentMethod;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold text-gray-900">Withdraw Rewards</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
              disabled={isSubmitting}
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Available Balance</span>
              <span className="text-xl font-semibold text-gray-900">
                ${user?.balance.toFixed(2)} USD
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Withdrawal Amount (USD)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="number"
                  id="amount"
                  min="0.5"
                  step="0.1"
                  max={user?.balance}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">Minimum withdrawal: $0.50 USD</p>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Payment Method</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {paymentMethod?.type === 'mtn' ? '🌟' : '💳'}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">
                      {paymentMethod?.type === 'mtn' ? 'MTN Mobile Money' : 'Flutterwave'}
                    </p>
                    <p className="text-sm text-gray-600">{paymentMethod?.phoneNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                <p>{error}</p>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > (user?.balance ?? 0)}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Withdraw Funds</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}