import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import { Inter_500Medium } from '@expo-google-fonts/inter';
import Slider from '@react-native-community/slider';
import BackIcon from './BackIcon';

interface SixthOnboardingScreenProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function SixthOnboardingScreen({ onNext, onBack }: SixthOnboardingScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_400Regular,
    Inter_500Medium,
  });

  // Slider values: 5, 10, 15, 20, 25
  const sliderValues = [3, 6, 9, 12, 15];
  const [sliderIndex, setSliderIndex] = useState(0); // Start at index 0 (value 5)
  const headlineCount = sliderValues[sliderIndex];

  const getHeadlineLabel = (count: number) => {
    if (count === 3) return 'Balanced';
    if (count === 6) return 'Moderate';
    if (count === 9) return 'Detailed';
    if (count === 12) return 'Comprehensive';
    if (count === 15) return 'Extensive';
    return 'Balanced';
  };

  const handleSliderChange = (value: number) => {
    // Round to nearest index
    const index = Math.round(value);
    const clampedIndex = Math.max(0, Math.min(4, index));
    setSliderIndex(clampedIndex);
  };

  // Show loading state while fonts load
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <BackIcon size={15} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Choose your feed size</Text>
          <Text style={styles.subtitle}>
            Select how many headlines you'd like each time.
          </Text>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={4}
              value={0}
              step={1}
              onValueChange={handleSliderChange}
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#E6E6E6"
              thumbTintColor="#FFFFFF"
            />
            <View style={styles.ticksContainer}>
              {sliderValues.map((_, index) => (
                <View key={index} style={styles.tick} />
              ))}
            </View>
          </View>
          <Text style={styles.headlineLabel}>
            {headlineCount} Headlines: {getHeadlineLabel(headlineCount)}
          </Text>
          <TouchableOpacity style={styles.continueButton} onPress={onNext}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <BackIcon size={15} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Choose your feed size</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Select how many headlines you'd like each time.
        </Text>

        {/* Slider */}
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={4}
            value={sliderIndex}
            step={1}
            onValueChange={handleSliderChange}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#E6E6E6"
            thumbTintColor="#FFFFFF"
          />
          <View style={styles.ticksContainer}>
            {sliderValues.map((_, index) => (
              <View key={index} style={styles.tick} />
            ))}
          </View>
        </View>

        {/* Headline Count Display */}
        <Text style={styles.headlineLabel}>
          {headlineCount} Headlines: {getHeadlineLabel(headlineCount)}
        </Text>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={onNext}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f6',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 217, 0.4)',
    borderRadius: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#000000',
    lineHeight: 40,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'PlayfairDisplay_400Regular',
    fontWeight: '500',
    color: '#000000',
    lineHeight: 22,
    marginBottom: 48,
  },
  sliderContainer: {
    marginBottom: 48,
    paddingHorizontal: 16,
    position: 'relative',
    height: 50,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  ticksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 0,
    paddingHorizontal: 0,
  },
  tick: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#000000',
  },
  headlineLabel: {
    fontSize: 20,
    fontFamily: 'Inter_500Medium',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  continueButton: {
    backgroundColor: '#000000',
    borderRadius: 1000,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: {
    fontSize: 16,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 21,
    letterSpacing: -0.31,
  },
});

