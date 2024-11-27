import React from 'react';
import { useStore } from './store/useStore';
import { Dashboard } from './components/Dashboard';
import { AuthScreen } from './components/auth/AuthScreen';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { Toaster } from 'react-hot-toast';

function App() {
  const { isAuthenticated } = useStore();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        {isAuthenticated ? <Dashboard /> : <AuthScreen />}
        <Toaster position="bottom-right" />
      </div>
    </ThemeProvider>
  );
}

export default App;