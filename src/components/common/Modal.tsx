import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ModalProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

export function Modal({ title, description, children, onClose, className }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn(
          'bg-white dark:bg-gray-800 rounded-xl',
          'max-w-2xl w-full max-h-[90vh] overflow-y-auto',
          className
        )}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
              {description && (
                <p className="text-gray-500 dark:text-gray-400">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          {children}
        </div>
      </motion.div>
    </div>
  );
}