import { TaskCard } from './TaskCard';

type TaskDifficulty = 'Basic' | 'Intermediate' | 'Advanced' | 'Expert';

interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: TaskDifficulty;
  reward: number;
  timeRequired: string;
  skillsRequired: string[];
  category: 'Content Creation' | 'Survey & Feedback' | 'Other';
}

interface TaskGridProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
}

export function TaskGrid({ tasks, onSelectTask }: TaskGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onClick={() => onSelectTask(task)}
        />
      ))}
    </div>
  );
}
