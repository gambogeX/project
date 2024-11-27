import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Twitter } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function AuthScreen() {
  const { login } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-auto w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to SocialFi
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Start earning rewards through social engagement
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-lg text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => login({ provider: 'twitter' })}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-gray-700 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Twitter className="h-5 w-5 text-[#1DA1F2]" />
              <span>Sign in with Twitter</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}