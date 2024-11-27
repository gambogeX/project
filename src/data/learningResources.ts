import { LearningResource } from '../types';

export const learningResources: LearningResource[] = [
  {
    id: '1',
    title: "Getting Started with Social Tasks",
    description: "Learn the basics of completing social media tasks and earning rewards",
    category: "Fundamentals",
    difficulty: "Basic",
    content: `
# Introduction to Social Tasks

Learn how to earn rewards by completing social media tasks effectively.

## What You'll Learn
- Understanding task types and requirements
- Best practices for task completion
- How to maximize your earnings
- Account safety and security

## Key Tips
1. Always read task requirements carefully
2. Complete tasks authentically and thoroughly
3. Submit proof of completion promptly
4. Maintain consistent engagement
    `,
    estimatedTime: "10 mins",
    relatedTasks: ['1']
  },
  {
    id: '2',
    title: "Content Creation Masterclass",
    description: "Advanced techniques for creating engaging social media content",
    category: "Content Creation",
    difficulty: "Advanced",
    content: `
# Creating Engaging Social Content

Learn how to create high-quality content that stands out.

## Topics Covered
- Writing compelling tweets
- Creating engaging thread stories
- Photo and video best practices
- Using hashtags effectively
- Building your personal brand

## Pro Tips
1. Focus on authenticity
2. Use visuals when possible
3. Engage with your audience
4. Stay consistent with your style
    `,
    estimatedTime: "20 mins",
    relatedTasks: ['2']
  }
];