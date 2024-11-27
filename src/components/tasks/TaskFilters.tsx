import React from 'react';
import { Search, Filter, Star, BarChart } from 'lucide-react';
import { TaskDifficulty } from '../../types';
import { motion } from 'framer-motion';

interface TaskFiltersProps {
  selectedDifficulty: TaskDifficulty | 'All';
  onDifficultyChange: (difficulty: TaskDifficulty | 'All') => void;
  onSearchChange: (search: string) => void;
}

export function TaskFilters({
  selectedDifficulty,
  onDifficultyChange,
  onSearchChange,
}: TaskFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search tasks..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={selectedDifficulty}
          onChange={(e) => onDifficultyChange(e.target.value as TaskDifficulty | 'All')}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="All">All Levels</option>
          <option value="Basic">Basic</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg"
        >
          <Filter className="h-5 w-5" />
          <span>Filters</span>
        </motion.button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">
          <Star className="w-4 h-4" />
          <span>Popular</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">
          <BarChart className="w-4 h-4" />
          <span>Trending</span>
        </button>
        <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">
          Content Creation
        </button>
        <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">
          Survey & Feedback
        </button>
        <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">
          Community Management
        </button>
      </div>
    </div>
  );
}