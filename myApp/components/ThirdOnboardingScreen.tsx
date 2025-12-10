import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import BackIcon from './BackIcon';

interface ThirdOnboardingScreenProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function ThirdOnboardingScreen({ onNext, onBack }: ThirdOnboardingScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_400Regular,
  });

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
          <Text style={styles.title}>Want a suggestion?</Text>
          <Text style={styles.subtitle}>
            Most users choose 7:00–9:00 AM for a focused start.
          </Text>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/images/onb3.png')} 
              style={styles.image}
              resizeMode="cover"
            />
          </View>
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
        <Text style={styles.title}>Want a suggestion?</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Most users choose 7:00–9:00 AM for a focused start.
        </Text>

        {/* Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={require('../assets/images/onb3.png')} 
            style={styles.image}
            resizeMode="cover"
          />
        </View>

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
    lineHeight: 25,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'PlayfairDisplay_400Regular',
    fontWeight: '500',
    color: '#000000',
    lineHeight: 20,
    letterSpacing: 0.5,
    marginBottom: 24,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
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

