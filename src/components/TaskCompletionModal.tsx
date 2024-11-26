import React, { useState } from 'react';
import { X, Check, Loader2 } from 'lucide-react';
import { Task } from '../types';

interface TaskCompletionModalProps {
  task: Task;
  onClose: () => void;
  onSubmit: (link: string) => Promise<void>;
}

export function TaskCompletionModal({ task, onClose, onSubmit }: TaskCompletionModalProps) {
  const [tweetLink, setTweetLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tweetLink) return;

    try {
      setIsSubmitting(true);
      setError('');
      await onSubmit(tweetLink);
      onClose();
    } catch (err) {
      setError('Failed to submit task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold text-gray-900">Submit Task Completion</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
              disabled={isSubmitting}
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="tweetLink" className="block text-sm font-medium text-gray-700 mb-1">
                Tweet Link
              </label>
              <input
                type="url"
                id="tweetLink"
                placeholder="https://twitter.com/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={tweetLink}
                onChange={(e) => setTweetLink(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !tweetLink}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Submit Task</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}