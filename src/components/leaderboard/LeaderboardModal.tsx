import React from 'react';
import { Trophy, Star, Medal, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface LeaderboardEntry {
  rank: number;
  user: string;
  points: number;
  tasksCompleted: number;
  level: string;
}

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, user: "Sarah K.", points: 2500, tasksCompleted: 45, level: "12" },
  { rank: 2, user: "Michael R.", points: 2350, tasksCompleted: 42, level: "11" },
  { rank: 3, user: "David M.", points: 2200, tasksCompleted: 40, level: "10" },
  // Add more entries as needed
];

interface LeaderboardModalProps {
  onClose: () => void;
}

export function LeaderboardModal({ onClose }: LeaderboardModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Leaderboard</h2>
              <p className="text-gray-500 dark:text-gray-400">Top performers this week</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4">
            {leaderboardData.map((entry) => (
              <div
                key={entry.rank}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
              >
                <div className="flex-shrink-0 w-10 text-center">
                  {entry.rank === 1 ? (
                    <Trophy className="w-6 h-6 mx-auto text-yellow-500" />
                  ) : entry.rank === 2 ? (
                    <Medal className="w-6 h-6 mx-auto text-gray-400" />
                  ) : entry.rank === 3 ? (
                    <Medal className="w-6 h-6 mx-auto text-amber-600" />
                  ) : (
                    <span className="text-lg font-semibold text-gray-500">
                      {entry.rank}
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {entry.user}
                    </span>
                    <span className="px-2 py-0.5 text-xs bg-indigo-100 text-indigo-700 rounded-full">
                      Level {entry.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {entry.points} points
                    </span>
                    <span>{entry.tasksCompleted} tasks completed</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}