import { StatusBar } from 'expo-status-bar';
import React from 'react';
import OnboardingFlow from './components/OnboardingFlow';

export default function App() {
  return (
    <>
      <OnboardingFlow />
      <StatusBar style="auto" />
    </>
  );
}

