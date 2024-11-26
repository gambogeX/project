import React, { useState } from 'react';
import { Bell, Menu, Wallet } from 'lucide-react';
import { WithdrawalModal } from './WithdrawalModal';
import { useStore } from '../store/useStore';

export function Header() {
  const { user } = useStore();
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 text-gray-500 sm:hidden" />
              <h1 className="ml-3 text-xl font-bold text-indigo-600">SocialFi Rewards</h1>
            </div>
            
            <nav className="hidden sm:flex space-x-8">
              <a className="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium" href="#">
                Dashboard
              </a>
              <a className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium" href="#">
                Tasks
              </a>
              <a className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium" href="#">
                Learn
              </a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Bell className="h-6 w-6" />
              </button>
              <button 
                onClick={() => setIsWithdrawalModalOpen(true)}
                className="flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-100"
              >
                <Wallet className="h-5 w-5" />
                <span className="font-medium">${user?.balance?.toFixed(2) ?? '0.00'} USD</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {isWithdrawalModalOpen && (
        <WithdrawalModal onClose={() => setIsWithdrawalModalOpen(false)} />
      )}
    </>
  );
}