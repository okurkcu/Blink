import React, { useState } from 'react';
import { View, Text } from 'react-native';

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

// Array of onboarding screens - add new screens here one by one
const onboardingScreens = [

  SecondOnboardingScreen, // Second onboarding screen: main text, Get Started button, and sign in link
  ThirdOnboardingScreen, // Third onboarding screen: suggestion screen with image and Continue button
  FourthOnboardingScreen, // Fourth onboarding screen: time picker screen
  FifthOnboardingScreen, // Fifth onboarding screen
  SixthOnboardingScreen, // Sixth onboarding screen: feed size slider (5, 10, 15, 20, 25 headlines)
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

export default function OnboardingFlow() {
  const [screenIndex, setScreenIndex] = useState(0);



  const handleNext = () => {
    if (screenIndex < onboardingScreens.length - 1) {
      setScreenIndex(screenIndex + 1);
    }
  };

  const handleBack = () => {
    if (screenIndex > 0) {
      setScreenIndex(screenIndex - 1);
    }
  };

  const CurrentScreen = onboardingScreens[screenIndex];

  return (
    <View style={{ flex: 1 }}>
      <CurrentScreen onNext={handleNext} onBack={handleBack} />
      {/* Debug indicator - remove in production */}
      {__DEV__ && (
        <View style={{ position: 'absolute', top: 100, left: 16, backgroundColor: 'rgba(255,0,0,0.5)', padding: 8, borderRadius: 4 }}>
          <Text style={{ color: 'white', fontSize: 12 }}>Screen: {screenIndex + 1}/{onboardingScreens.length}</Text>
        </View>
      )}
    </View>
  );
}

