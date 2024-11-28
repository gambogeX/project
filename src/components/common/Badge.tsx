import React from 'react';

interface BadgeProps {
  variant: 'success' | 'warning' | 'info' | 'danger';
  children: React.ReactNode;
}

const variants = {
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  info: 'bg-blue-100 text-blue-800 border-blue-200',
  danger: 'bg-red-100 text-red-800 border-red-200',
};

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span className={`px-2 py-0.5 text-xs rounded-full border ${variants[variant]}`}>
      {children}
    </span>
  );
}