import React from 'react';
import { Bell, Check, X, AlertCircle, Trophy, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { formatTimeAgo } from '../../utils/formatters';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'reward';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Task Verified',
    message: 'Your product review task has been verified. Reward: $2.00',
    time: '2 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'info',
    title: 'New Task Available',
    message: 'A new high-reward task matching your skills is available',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'reward',
    title: 'Level Up!',
    message: "Congratulations! You've reached Level 3",
    time: '2 hours ago',
    read: true,
  },
];

interface NotificationsModalProps {
  onClose: () => void;
}

export function NotificationsModal({ onClose }: NotificationsModalProps) {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'reward':
        return <Trophy className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationStyle = (type: Notification['type'], read: boolean) => {
    const baseStyle = read
      ? 'bg-gray-50 dark:bg-gray-700/50'
      : 'bg-indigo-50 dark:bg-indigo-900/20';
    
    return `p-4 rounded-xl ${baseStyle}`;
  };

  return (
    <Modal
      title="Notifications"
      description="Stay updated on your progress"
      onClose={onClose}
    >
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={getNotificationStyle(notification.type, notification.read)}
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {notification.title}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {notification.time}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {notification.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}