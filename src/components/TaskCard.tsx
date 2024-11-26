import React from 'react';
import { Clock, DollarSign, Star, Twitter } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps extends Task {
  onClick: () => void;
}

export function TaskCard({
  title,
  description,
  reward,
  timeRequired,
  difficulty,
  platform,
  status,
  onClick,
}: TaskCardProps) {
  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800',
  }[difficulty];

  const statusBadge = status && {
    available: '',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    verified: 'bg-purple-100 text-purple-800',
  }[status];

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 cursor-pointer border border-gray-100"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex gap-2">
          {statusBadge && (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge}`}>
              {status?.replace('_', ' ')}
            </span>
          )}
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColor}`}>
            {difficulty}
          </span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
      
      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4" />
          <span>{reward} USD</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{timeRequired}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Twitter className="w-4 h-4" />
          <span>{platform}</span>
        </div>
      </div>
    </div>
  );
}