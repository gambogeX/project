import React from 'react';
import { BarChart, TrendingUp, Target, Award, Clock, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';

interface StatsModalProps {
  onClose: () => void;
}

export function StatsModal({ onClose }: StatsModalProps) {
  const { user } = useStore();

  const stats = [
    {
      label: "Tasks Completed",
      value: user?.completedTasks ?? 0,
      icon: Target,
      change: "+12% from last week",
    },
    {
      label: "Current Level",
      value: user?.level ?? "1",
      icon: Award,
      change: "2 tasks until next level",
    },
    {
      label: "Total Earnings",
      value: `$${user?.balance.toFixed(2)}`,
      icon: TrendingUp,
      change: "+$1.50 this week",
    },
    {
      label: "Average Time/Task",
      value: "15 mins",
      icon: Clock,
      change: "-2 mins from average",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Stats</h2>
              <p className="text-gray-500 dark:text-gray-400">Track your progress and earnings</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className="w-5 h-5 text-indigo-500" />
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{stat.change}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-xl">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Performance Insights
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                You're in the top 20% of active users this week
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                Complete 3 more tasks to reach the next level
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                Your engagement rate is above average
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}