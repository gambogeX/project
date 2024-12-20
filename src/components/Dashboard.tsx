import { tasks as originalTasks } from '../data/tasks';
import { CustomTask, TaskDifficulty, TaskCategory, TaskStatus } from '../types/TaskTypes'; // Update this import path
import { TaskDetailModal } from './TaskDetailModal';
import { TaskCompletionModal } from './TaskCompletionModal';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import { LearningSection } from './learning/LearningSection';
import { NavBar } from './navigation/NavBar';
import { TaskGrid } from './tasks/TaskGrid';
import { TaskFilters } from './tasks/TaskFilters';
import { useState } from 'react';

export function Dashboard() {
  const { user } = useStore();
  const [selectedTask, setSelectedTask] = useState<CustomTask | null>(null);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [showLearning, setShowLearning] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<TaskDifficulty | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Explicitly type the tasks with the new Task interface
  const tasks: CustomTask[] = originalTasks.map(task => ({
    ...task,
    difficulty: task.difficulty as TaskDifficulty,
    category: (task.category || 'Other') as TaskCategory,
    status: (task.status || 'Available') as TaskStatus,
    platform: task.platform || '',
    requirements: task.requirements || [],
    successCriteria: task.successCriteria || []
  }));

  const filteredTasks = tasks.filter(task => {
    const matchesDifficulty = selectedDifficulty === 'All' || task.difficulty === selectedDifficulty;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  const handleStartTask = () => {
    if (selectedTask) {
      window.open('https://twitter.com/compose/tweet', '_blank');
      setSelectedTask(null);
      setIsCompletionModalOpen(true);
    }
  };

  const handleTaskSubmit = async (_taskLink: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success('Task submitted successfully! Our team will verify it shortly.');
    setIsCompletionModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar
        showLearning={showLearning}
        onToggleLearning={() => setShowLearning(!showLearning)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome Back, {user?.name ?? 'User'}! 👋
          </h2>
          <p className="text-gray-600">
            {showLearning
              ? 'Explore our learning resources to improve your skills.'
              : 'Ready to earn rewards by completing tasks?'}
          </p>
        </div>

        {showLearning ? (
          <LearningSection />
        ) : (
          <>
            <TaskFilters
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={setSelectedDifficulty}
              onSearchChange={setSearchQuery}
            />

            <TaskGrid
              tasks={filteredTasks}
              onSelectTask={setSelectedTask}
            />

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
          </>
        )}
      </main>
    </div>
  );
}
