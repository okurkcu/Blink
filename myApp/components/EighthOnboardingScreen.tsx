import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import BackIcon from './BackIcon';

interface EighthOnboardingScreenProps {
  onNext?: () => void;
  onBack?: () => void;
}

interface SocialOption {
  id: string;
  name: string;
  icon: any;
}

const socialOptions: SocialOption[] = [
  { id: 'app-store', name: 'App Store', icon: require('../assets/images/socials/app-store-icon.svg') },
  { id: 'tiktok', name: 'TikTok', icon: require('../assets/images/socials/tiktok-icon.svg') },
  { id: 'instagram', name: 'Instagram', icon: require('../assets/images/socials/instagram-icon.svg') },
  { id: 'x', name: 'X', icon: require('../assets/images/socials/x-icon.svg') },
  { id: 'youtube', name: 'YouTube', icon: require('../assets/images/socials/youtube-icon.svg') },
  { id: 'google', name: 'Google', icon: require('../assets/images/socials/google-icon.svg') },
];

export default function EighthOnboardingScreen({ onNext, onBack }: EighthOnboardingScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_400Regular,
    Inter_400Regular,
  });

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const selectOption = (optionId: string) => {
    setSelectedOption(optionId);
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
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Where did you hear about us?</Text>
          <View style={styles.optionsContainer}>
            {socialOptions.map((option) => {
              const isSelected = selectedOption === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionButton,
                    isSelected ? styles.optionButtonSelected : styles.optionButtonUnselected,
                  ]}
                  onPress={() => selectOption(option.id)}
                >
                  <Image source={option.icon} style={styles.optionIcon} />
                  <Text style={styles.optionText}>{option.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity style={styles.continueButton} onPress={onNext}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
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

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.title}>Where did you hear about us?</Text>

        {/* Social Options */}
        <View style={styles.optionsContainer}>
          {socialOptions.map((option) => {
            const isSelected = selectedOption === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionButton,
                  isSelected ? styles.optionButtonSelected : styles.optionButtonUnselected,
                ]}
                onPress={() => selectOption(option.id)}
              >
                <Image source={option.icon} style={styles.optionIcon} />
                <Text style={styles.optionText}>{option.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={onNext}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f6',
  },
  header: {
    paddingTop: 80, // Adjusted to account for progress bar
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#000000',
    lineHeight: 40,
    marginBottom: 32,
  },
  optionsContainer: {
    marginBottom: 32,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 15,
    marginBottom: 12,
    minHeight: 48,
    width: '100%',
  },
  optionButtonUnselected: {
    backgroundColor: 'rgba(217, 217, 217, 0.4)',
  },
  optionButtonSelected: {
    backgroundColor: 'rgba(217, 217, 217, 0.6)',
  },
  optionIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    resizeMode: 'contain',
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
    lineHeight: 22,
  },
  continueButton: {
    backgroundColor: '#000000',
    borderRadius: 1000,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
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
