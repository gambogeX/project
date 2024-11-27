import { Task } from '../types';

export const tasks: Task[] = [
  {
    id: '1',
    title: "Like and Engage with Brand Posts",
    description: "Help promote brand visibility by engaging with their latest posts through likes and favorites.",
    reward: 0.25,
    timeRequired: "2 mins",
    difficulty: "Basic",
    category: "Engagement",
    platform: "Twitter",
    status: 'available',
    requirements: [
      "Twitter account age > 1 month",
      "Minimum 50 followers",
      "Public account"
    ],
    successCriteria: [
      "Like specified posts",
      "Stay engaged for minimum 30 seconds"
    ],
    verificationMethod: "Automatic via Twitter API",
    skillsRequired: ["Basic Twitter Navigation"]
  },
  {
    id: '2',
    title: "Product Review Campaign",
    description: "Create an engaging tweet thread reviewing a new eco-friendly product. Share your authentic experience and insights.",
    reward: 2.0,
    timeRequired: "30 mins",
    difficulty: "Advanced",
    category: "Content Creation",
    platform: "Twitter",
    status: 'available',
    requirements: [
      "Twitter account age > 3 months",
      "Minimum 200 followers",
      "Previous content creation experience"
    ],
    successCriteria: [
      "Minimum 3 tweets in thread",
      "Include product photos",
      "Authentic review content",
      "Use specified hashtags"
    ],
    verificationMethod: "AI Content Quality Check",
    skillsRequired: ["Content Writing", "Photography", "Twitter Threading"]
  },
  {
    id: '3',
    title: "Community Feedback Survey",
    description: "Participate in a detailed survey about local banking needs and financial services accessibility.",
    reward: 1.0,
    timeRequired: "15 mins",
    difficulty: "Intermediate",
    category: "Survey & Feedback",
    platform: "Twitter",
    status: 'available',
    requirements: [
      "Located in target region",
      "Previous survey completion experience"
    ],
    successCriteria: [
      "Complete all questions",
      "Provide detailed responses",
      "Submit within time limit"
    ],
    verificationMethod: "Manual Review",
    skillsRequired: ["Written Communication", "Local Market Knowledge"]
  }
];