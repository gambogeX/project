import { TaskInterface } from '../data/tasks';

export type TaskDifficulty = 'Basic' | 'Intermediate' | 'Advanced' | 'Expert';
export type TaskCategory = 'Content Creation' | 'Survey & Feedback' | 'Other';
export type TaskStatus = 'Available' | 'In Progress' | 'Completed' | 'Expired';

export interface Task extends TaskInterface {
  difficulty: TaskDifficulty;
  category: TaskCategory;
  status: TaskStatus;
  platform: string;
  requirements: string[];
  successCriteria: string[];
}

export type CustomTask = Task;
