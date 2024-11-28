import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Card({ children, onClick, className }: CardProps) {
  const Component = onClick ? motion.div : 'div';
  
  return (
    <Component
      whileHover={onClick ? { scale: 1.02 } : undefined}
      onClick={onClick}
      className={cn(
        'bg-white dark:bg-gray-800 rounded-xl shadow-sm',
        'border border-gray-100 dark:border-gray-700',
        'p-6',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </Component>
  );
}