import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Animated } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Inter_300Light, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';

interface SecondOnboardingScreenProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function SecondOnboardingScreen({ onNext, onBack }: SecondOnboardingScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Inter_300Light,
    Inter_500Medium,
    Inter_700Bold,
  });

  // Animation values
  const mainTextOpacity = useRef(new Animated.Value(0)).current;
  const mainTextTranslateY = useRef(new Animated.Value(30)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(30)).current;
  const signInOpacity = useRef(new Animated.Value(0)).current;
  const signInTranslateY = useRef(new Animated.Value(30)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (fontsLoaded) {
      // Staggered animations
      Animated.sequence([
        // Main text
        Animated.parallel([
          Animated.timing(mainTextOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(mainTextTranslateY, {
            toValue: 0,
            duration: 500,
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
        // Sign in text
        Animated.parallel([
          Animated.timing(signInOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(signInTranslateY, {
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
        <View style={styles.content}>
          <Text style={{ fontSize: 24, color: '#000000', textAlign: 'center', marginBottom: 48 }}>
            No doomscroll.{'\n'}Just the{'\n'}headlines you want.
          </Text>
          <TouchableOpacity style={styles.getStartedButton}>
            <Text style={{ fontSize: 16, color: '#ffffff' }}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signInContainer}>
            <Text style={{ fontSize: 13, color: '#000000', textAlign: 'center' }}>
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Language Selector Button - Top Right */}
      <View style={styles.languageSelectorContainer}>
        <TouchableOpacity style={styles.languageSelector}>
          <View style={styles.flagContainer}>
            {/* Flag icon placeholder - you can replace with actual flag image */}
            <View style={styles.flagIcon} />
          </View>
          <Text style={styles.languageText}>En</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Main Text with animation */}
        <Animated.Text
          style={[
            styles.mainText,
            {
              opacity: mainTextOpacity,
              transform: [{ translateY: mainTextTranslateY }],
            },
          ]}
        >
          No doomscroll.{'\n'}Just the{'\n'}headlines you want.
        </Animated.Text>

        {/* Get Started Button with animation */}
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
            style={styles.getStartedButton}
            onPress={onNext}
            onPressIn={handleButtonPressIn}
            onPressOut={handleButtonPressOut}
            activeOpacity={1}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Already have an account text with animation */}
        <Animated.View
          style={{
            opacity: signInOpacity,
            transform: [{ translateY: signInTranslateY }],
          }}
        >
          <TouchableOpacity style={styles.signInContainer} onPress={onNext}>
            <Text style={styles.signInText}>
              <Text style={styles.signInRegular}>Already have an account? </Text>
              <Text style={styles.signInBold}>Sign in</Text>
            </Text>
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
  languageSelectorContainer: {
    position: 'absolute',
    top: 80, // Adjusted to account for progress bar
    right: 16,
    zIndex: 10,
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 217, 0.4)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  flagContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3,
  },
  flagIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#1a1a1a', // Placeholder for flag - replace with actual image
    borderRadius: 2,
    // You can replace this with an Image component pointing to a flag asset
  },
  languageText: {
    fontSize: 13,
    fontFamily: 'Inter_300Light',
    color: '#000000',
    lineHeight: 22,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  mainText: {
    fontSize: 24,
    fontFamily: 'PlayfairDisplay_700Bold',
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 48,
  },
  getStartedButton: {
    backgroundColor: '#000000',
    borderRadius: 1000,
    paddingHorizontal: 20,
    paddingVertical: 12,
    minWidth: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  getStartedText: {
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
  signInContainer: {
    marginTop: 8,
  },
  signInText: {
    fontSize: 13,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  signInRegular: {
    fontFamily: 'Inter_500Medium',
  },
  signInBold: {
    fontFamily: 'Inter_700Bold',
  },
});

