import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions, StyleSheet } from 'react-native';

import SecondOnboardingScreen from './SecondOnboardingScreen';
import ThirdOnboardingScreen from './ThirdOnboardingScreen';
import FourthOnboardingScreen from './FourthOnboardingScreen';
import FifthOnboardingScreen from './FifthOnboardingScreen';
import SixthOnboardingScreen from './SixthOnboardingScreen';
import SeventhOnboardingScreen from './SeventhOnboardingScreen';
import EighthOnboardingScreen from './EighthOnboardingScreen';
import NinthOnboardingScreen from './NinthOnboardingScreen';
import TenthOnboardingScreen from './TenthOnboardingScreen';
import EleventhOnboardingScreen from './EleventhOnboardingScreen';
import TwelfthOnboardingScreen from './TwelfthOnboardingScreen';
import ThirteenthOnboardingScreen from './ThirteenthOnboardingScreen';
import FourteenthOnboardingScreen from './FourteenthOnboardingScreen';
import ProgressBar from './ProgressBar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Array of onboarding screens - add new screens here one by one
const onboardingScreens = [

  SecondOnboardingScreen, // Second onboarding screen: main text, Get Started button, and sign in link
  ThirdOnboardingScreen, // Third onboarding screen: suggestion screen with image and Continue button
  FourthOnboardingScreen, // Fourth onboarding screen: time picker screen
  SixthOnboardingScreen, // Sixth onboarding screen: feed size slider (5, 10, 15, 20, 25 headlines)
  FifthOnboardingScreen, // Fifth onboarding screen
  SeventhOnboardingScreen, // Seventh onboarding screen: category selection
  EighthOnboardingScreen, // Eighth onboarding screen: "Where did you hear about us?" social media options
  NinthOnboardingScreen, // Ninth onboarding screen: "Get news you want, exactly when you want" with image
  TenthOnboardingScreen, // Tenth onboarding screen: Enable notifications popup
  EleventhOnboardingScreen, // Eleventh onboarding screen: Save your setup with Apple/Google sign in
  TwelfthOnboardingScreen, // Twelfth onboarding screen: Unlock headlines with payment info
  ThirteenthOnboardingScreen, // Thirteenth onboarding screen: Review screen with iOS review popup
  FourteenthOnboardingScreen, // Fourteenth onboarding screen: Reclaim your attention with stats
  // Add more onboarding screens here as you create them
];

interface OnboardingFlowProps {
  onComplete?: () => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [screenIndex, setScreenIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Determine direction based on index change
    const isForward = screenIndex > prevIndex;
    
    // Set initial position based on direction
    slideAnim.setValue(isForward ? SCREEN_WIDTH : -SCREEN_WIDTH);
    fadeAnim.setValue(0);
    
    // Animate screen transition in
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    
    setPrevIndex(screenIndex);
  }, [screenIndex]);

  const handleNext = () => {
    if (screenIndex < onboardingScreens.length - 1) {
      // Animate out to left
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -SCREEN_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setScreenIndex(screenIndex + 1);
      });
    }
  };

  const handleBack = () => {
    if (screenIndex > 0) {
      // Animate out to right
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SCREEN_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setScreenIndex(screenIndex - 1);
      });
    }
  };

  const CurrentScreen = onboardingScreens[screenIndex] as any;
  const progress = (screenIndex + 1) / onboardingScreens.length;

  return (
    <View style={styles.container}>
      {/* Progress Bar - Fixed at top */}
      <ProgressBar progress={progress} />
      
      <Animated.View
        style={[
          styles.screenContainer,
          {
            transform: [{ translateX: slideAnim }],
            opacity: fadeAnim,
          },
        ]}
      >
        <CurrentScreen onNext={handleNext} onBack={handleBack} onSkip={onComplete} />
      </Animated.View>
      {/* Debug indicator - remove in production */}
      {__DEV__ && (
        <View style={styles.debugIndicator}>
          <Text style={{ color: 'white', fontSize: 12 }}>Screen: {screenIndex + 1}/{onboardingScreens.length}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#faf9f6',
  },
  screenContainer: {
    flex: 1,
  },
  debugIndicator: {
    position: 'absolute',
    top: 100,
    left: 16,
    backgroundColor: 'rgba(255,0,0,0.5)',
    padding: 8,
    borderRadius: 4,
  },
});

