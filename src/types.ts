export interface Task {
  id?: string;
  title: string;
  description: string;
  reward: number;
  timeRequired: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  platform: string;
  status?: 'available' | 'in_progress' | 'completed' | 'verified';
}

export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  completedTasks: number;
  onboardingComplete: boolean;
  paymentMethod?: {
    type: 'mtn' | 'flutterwave';
    phoneNumber: string;
  };
}