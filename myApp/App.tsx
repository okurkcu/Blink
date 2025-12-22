import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import OnboardingFlow from './components/OnboardingFlow';
import MainScreen from './components/MainScreen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [showMainScreen, setShowMainScreen] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // For now, we'll just simulate a brief loading time
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (isReady) {
      // Hide the splash screen with animation
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  if (showMainScreen) {
    // Show main screen
    return (
      <>
        <MainScreen onReset={() => setShowMainScreen(false)} />
        <StatusBar style="auto" />
      </>
    );
  }

  return (
    <>
      <OnboardingFlow onComplete={() => setShowMainScreen(true)} />
      <StatusBar style="auto" />
    </>
  );
}

