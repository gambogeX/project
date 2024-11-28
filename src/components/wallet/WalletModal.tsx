import React, { useState } from 'react';
import { Wallet, ArrowUpRight, History, DollarSign, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';

interface Transaction {
  id: string;
  type: 'reward' | 'withdrawal';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const transactions: Transaction[] = [
  {
    id: '1',
    type: 'reward',
    amount: 2.00,
    description: 'Product Review Task Reward',
    date: '2024-02-20',
    status: 'completed',
  },
  {
    id: '2',
    type: 'withdrawal',
    amount: -5.00,
    description: 'Withdrawal to MTN Mobile Money',
    date: '2024-02-19',
    status: 'completed',
  },
];

interface WalletModalProps {
  onClose: () => void;
}

export function WalletModal({ onClose }: WalletModalProps) {
  const { user } = useStore();
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleWithdraw = () => {
    // Implement withdrawal logic
    console.log('Withdrawing:', withdrawAmount);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full max-h-[90vh] overflow-hidden"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Wallet</h2>
              <p className="text-gray-500 dark:text-gray-400">Manage your earnings</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-xl text-white mb-6">
            <div className="flex items-center justify-between mb-4">
              <Wallet className="w-8 h-8" />
              <span className="text-sm opacity-75">Available Balance</span>
            </div>
            <div className="text-3xl font-bold mb-2">
              ${user?.balance.toFixed(2)}
            </div>
            <div className="text-sm opacity-75">
              {user?.paymentMethod?.type === 'mtn' ? 'MTN Mobile Money' : 'Flutterwave'}
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Withdraw Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="0.00"
                />
              </div>
            </div>

            <button
              onClick={handleWithdraw}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowUpRight className="w-5 h-5" />
              Withdraw to Mobile Money
            </button>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <History className="w-5 h-5 text-gray-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Recent Transactions
              </h3>
            </div>

            <div className="space-y-3">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {tx.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(tx.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`font-medium ${
                    tx.type === 'reward' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {tx.type === 'reward' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}