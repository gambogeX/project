import React, { useState } from 'react';
import { BookOpen, BarChart, Wallet, Bell, Trophy, User } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { motion } from 'framer-motion';
import { LeaderboardModal } from '../leaderboard/LeaderboardModal';
import { StatsModal } from '../stats/StatsModal';
import { NotificationsModal } from '../notifications/NotificationsModal';
import { WalletModal } from '../wallet/WalletModal';
import { ThemeToggle } from '../theme/ThemeToggle';

interface NavBarProps {
  showLearning: boolean;
  onToggleLearning: () => void;
}

export function NavBar({ showLearning, onToggleLearning }: NavBarProps) {
  const { user } = useStore();
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWallet, setShowWallet] = useState(false);

  return (
    <>
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg"
              />
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                SocialFi Rewards
              </h1>
            </div>

            <div className="hidden sm:flex items-center space-x-1">
              <button
                onClick={onToggleLearning}
                className={`px-4 py-2 rounded-lg transition-all ${
                  showLearning
                    ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Learn
                </span>
              </button>
              
              <button
                onClick={() => setShowLeaderboard(true)}
                className="px-4 py-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <span className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Leaderboard
                </span>
              </button>

              <button
                onClick={() => setShowStats(true)}
                className="px-4 py-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <span className="flex items-center gap-2">
                  <BarChart className="w-4 h-4" />
                  Stats
                </span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              <button
                onClick={() => setShowNotifications(true)}
                className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full" />
              </button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowWallet(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg"
              >
                <Wallet className="h-4 w-4" />
                <span className="font-medium">${user?.balance?.toFixed(2) ?? '0.00'}</span>
              </motion.button>

              <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="relative">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center">
                    <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-indigo-50 dark:bg-indigo-900 flex items-center justify-center">
                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">{user?.level}</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {showLeaderboard && <LeaderboardModal onClose={() => setShowLeaderboard(false)} />}
      {showStats && <StatsModal onClose={() => setShowStats(false)} />}
      {showNotifications && <NotificationsModal onClose={() => setShowNotifications(false)} />}
      {showWallet && <WalletModal onClose={() => setShowWallet(false)} />}
    </>
  );
}