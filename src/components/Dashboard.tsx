import React, { useState } from 'react';
import { TaskCard } from './TaskCard';
import { TaskDetailModal } from './TaskDetailModal';
import { TaskCompletionModal } from './TaskCompletionModal';
import { Search, Filter } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Task } from '../types';
import toast from 'react-hot-toast';

const tasks: Task[] = [
  {
    id: '1',
    title: "Share Product Launch Tweet",
    description: "Help promote a new eco-friendly product launch by retweeting and adding your thoughts about sustainable living.",
    reward: 0.5,
    timeRequired: "5 mins",
    difficulty: "Easy",
    platform: "Twitter",
    status: 'available'
  },
  {
    id: '2',
    title: "Local Business Survey",
    description: "Complete a brief survey about shopping habits in your area. Your feedback helps local businesses improve their services.",
    reward: 1.0,
    timeRequired: "10 mins",
    difficulty: "Medium",
    platform: "Twitter",
    status: 'available'
  },
  {
    id: '3',
    title: "Content Creation Challenge",
    description: "Create a short video showcasing how you use mobile money in your daily life. Best submissions earn bonus rewards!",
    reward: 2.0,
    timeRequired: "30 mins",
    difficulty: "Hard",
    platform: "Twitter",
    status: 'available'
  }
];

export function Dashboard() {
  const { user } = useStore();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);

  const handleStartTask = () => {
    if (selectedTask) {
      // Here you would typically redirect to Twitter or open the task in a new tab
      window.open('https://twitter.com/compose/tweet', '_blank');
      setSelectedTask(null);
      setIsCompletionModalOpen(true);
    }
  };

  const handleTaskSubmit = async (link: string) => {
    // Simulate API call to verify task
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success('Task submitted successfully! Our team will verify it shortly.');
    setIsCompletionModalOpen(false);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome Back, {user?.name ?? 'User'}! 👋
        </h2>
        <p className="text-gray-600">Ready to earn rewards by completing tasks?</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
          <Filter className="h-5 w-5 text-gray-500" />
          <span>Filters</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            {...task}
            onClick={() => setSelectedTask(task)}
          />
        ))}
      </div>

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onStartTask={handleStartTask}
        />
      )}

      {isCompletionModalOpen && selectedTask && (
        <TaskCompletionModal
          task={selectedTask}
          onClose={() => setIsCompletionModalOpen(false)}
          onSubmit={handleTaskSubmit}
        />
      )}
    </main>
  );
}