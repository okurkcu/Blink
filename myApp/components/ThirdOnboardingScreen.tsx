import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, Animated } from 'react-native';
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

  // Animation values
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleTranslateY = useRef(new Animated.Value(20)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(0.95)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(20)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (fontsLoaded) {
      // Staggered animations
      Animated.sequence([
        // Title
        Animated.parallel([
          Animated.timing(titleOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(titleTranslateY, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        // Subtitle
        Animated.parallel([
          Animated.timing(subtitleOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(subtitleTranslateY, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        // Image
        Animated.parallel([
          Animated.timing(imageOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.spring(imageScale, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }),
        ]),
        // Button
        Animated.parallel([
          Animated.timing(buttonOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(buttonTranslateY, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  }, [fontsLoaded]);

  const handleButtonPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
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
        {/* Title with animation */}
        <Animated.Text
          style={[
            styles.title,
            {
              opacity: titleOpacity,
              transform: [{ translateY: titleTranslateY }],
            },
          ]}
        >
          Want a suggestion?
        </Animated.Text>

        {/* Subtitle with animation */}
        <Animated.Text
          style={[
            styles.subtitle,
            {
              opacity: subtitleOpacity,
              transform: [{ translateY: subtitleTranslateY }],
            },
          ]}
        >
          Most users choose 7:00–9:00 AM for a focused start.
        </Animated.Text>

        {/* Image with animation */}
        <Animated.View
          style={[
            styles.imageContainer,
            {
              opacity: imageOpacity,
              transform: [{ scale: imageScale }],
            },
          ]}
        >
          <Image 
            source={require('../assets/images/onb3.png')} 
            style={styles.image}
            resizeMode="cover"
          />
        </Animated.View>

        {/* Continue Button with animation */}
        <Animated.View
          style={{
            opacity: buttonOpacity,
            transform: [
              { translateY: buttonTranslateY },
              { scale: buttonScale },
            ],
          }}
        >
          <TouchableOpacity
            style={styles.continueButton}
            onPress={onNext}
            onPressIn={handleButtonPressIn}
            onPressOut={handleButtonPressOut}
            activeOpacity={1}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </Animated.View>
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

