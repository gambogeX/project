import { Clock, DollarSign, Twitter, Star, Trophy } from 'lucide-react';

interface LocalTask {
  title: string;
  description: string;
  reward: number;
  timeRequired: string;
  skillsRequired: string[];
  difficulty: 'Basic' | 'Intermediate' | 'Advanced' | 'Expert';
  status?: 'Available' | 'In Progress' | 'Completed' | 'Expired';
  category: 'Content Creation' | 'Survey & Feedback' | 'Other';
}
import { motion } from 'framer-motion';

interface TaskCardProps {
  task: LocalTask;
  onClick: () => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const difficultyColor = {
    Basic: 'bg-green-100 text-green-800 border-green-200',
    Intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Advanced: 'bg-red-100 text-red-800 border-red-200',
    Expert: 'bg-purple-100 text-purple-800 border-purple-200',
  }[task.difficulty as 'Basic' | 'Intermediate' | 'Advanced' | 'Expert'];

  const statusBadge = task.status && {
    available: '',
    in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    verified: 'bg-purple-100 text-purple-800 border-purple-200',
  }[task.status.toLowerCase() as 'available' | 'in_progress' | 'completed' | 'verified'];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 cursor-pointer border border-gray-100 hover:border-indigo-100"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
            {task.category === 'Content Creation' ? (
              <Star className="w-5 h-5 text-indigo-600" />
            ) : task.category === 'Survey & Feedback' ? (
              <Trophy className="w-5 h-5 text-indigo-600" />
            ) : (
              <Twitter className="w-5 h-5 text-indigo-600" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
              {task.title}
            </h3>
            <div className="flex gap-2 mt-1">
              {statusBadge && (
                <span className={`px-2 py-0.5 text-xs rounded-full border ${statusBadge}`}>
                  {task.status?.replace('_', ' ')}
                </span>
              )}
              <span className={`px-2 py-0.5 text-xs rounded-full border ${difficultyColor}`}>
                {task.difficulty}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{task.description}</p>
      
      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4" />
          <span>{task.reward} USD</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{task.timeRequired}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          {task.skillsRequired.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-700 rounded-lg text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
