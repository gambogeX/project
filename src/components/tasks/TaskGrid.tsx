import React from 'react';
import { TaskCard } from './TaskCard';
import { Task, TaskDifficulty } from '../../types';

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