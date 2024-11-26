import React from 'react';
import { Header } from './components/Header';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { useStore } from './store/useStore';
import { Dashboard } from './components/Dashboard';

function App() {
  const { isOnboarding } = useStore();

  if (isOnboarding) {
    return <OnboardingFlow />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;