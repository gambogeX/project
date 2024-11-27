export type TaskDifficulty = 'Basic' | 'Intermediate' | 'Advanced' | 'Expert';
export type TaskCategory = 
  | 'Engagement' 
  | 'Content Creation' 
  | 'Survey & Feedback' 
  | 'Community Management'
  | 'Campaign Management';

export type TaskStatus = 'available' | 'in_progress' | 'completed' | 'verified';

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  timeRequired: string;
  difficulty: TaskDifficulty;
  category: TaskCategory;
  platform: string;
  status?: TaskStatus;
  requirements: string[];
  successCriteria: string[];
  verificationMethod: string;
  skillsRequired: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  completedTasks: number;
  onboardingComplete: boolean;
  reputation: number;
  level: string;
  skills: string[];
  paymentMethod?: {
    type: 'mtn' | 'flutterwave';
    phoneNumber: string;
  };
}

export interface LearningResource {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: TaskDifficulty;
  content: string;
  estimatedTime: string;
  relatedTasks: string[];
}