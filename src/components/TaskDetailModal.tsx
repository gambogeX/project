import React from 'react';
import { X, Twitter, Clock, DollarSign, ExternalLink } from 'lucide-react';
import { Task } from '../types';

interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
  onStartTask: () => void;
}

export function TaskDetailModal({ task, onClose, onStartTask }: TaskDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1 text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span>{task.reward} USD</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{task.timeRequired}</span>
            </div>
            <div className="flex items-center gap-1 text-twitter">
              <Twitter className="w-4 h-4" />
              <span>Twitter Task</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{task.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Twitter account must be at least 3 months old</li>
                <li>Must have at least 100 followers</li>
                <li>Account must be public</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Steps to Complete</h3>
              <ol className="list-decimal list-inside text-gray-600 space-y-2">
                <li>Click the "Start Task" button below</li>
                <li>You'll be redirected to Twitter</li>
                <li>Follow the specific instructions for engagement</li>
                <li>Submit the link to your engagement for verification</li>
              </ol>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <button onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button
              onClick={onStartTask}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <span>Start Task</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}