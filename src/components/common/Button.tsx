import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

type CombinedButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & MotionProps;

interface ButtonProps extends CombinedButtonProps {
  variant?: 'primary' | 'secondary' | 'gradient';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const variants = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600',
  secondary: 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700',
  gradient: 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white hover:from-purple-500 hover:via-pink-600 hover:to-red-600'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((
  { variant = 'primary', isLoading, icon, children, disabled, className, ...props }: ButtonProps,
  ref
) => {
  return (
    <motion.button
      type="button"
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors',
        variants[variant],
        (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : icon}
      {children as React.ReactNode}
    </motion.button>
  );
});

Button.displayName = 'Button';
