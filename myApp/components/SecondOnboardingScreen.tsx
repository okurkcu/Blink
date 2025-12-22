import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, Animated, Dimensions } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Inter_300Light, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import LanguageSelector from './LanguageSelector';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SecondOnboardingScreenProps {
  onNext?: () => void;
  onBack?: () => void;
  onSkip?: () => void;
}

export default function SecondOnboardingScreen({ onNext, onBack, onSkip }: SecondOnboardingScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Inter_300Light,
    Inter_500Medium,
    Inter_700Bold,
  });

  // Animation values
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(0.9)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(20)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (fontsLoaded) {
      // Staggered animations
      Animated.sequence([
        // Image
        Animated.parallel([
          Animated.timing(imageOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.spring(imageScale, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }),
        ]),
        // Text
        Animated.parallel([
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(textTranslateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        // Button
        Animated.parallel([
          Animated.timing(buttonOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(buttonTranslateY, {
            toValue: 0,
            duration: 200,
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
            No doomscroll.{'\n'}Just the headlines you want.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Language Selector Button - Top Right */}
      <View style={styles.languageSelectorContainer}>
        <LanguageSelector />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Phone Mockup Image with animation */}
        <Animated.View 
          style={[
            styles.imageContainer, 
            { 
              opacity: imageOpacity,
              transform: [{ scale: imageScale }]
            }
          ]}
        >
          <Image 
            source={require('../assets/images/onb3.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Text and Buttons Container - Bottom Aligned */}
        <View style={styles.bottomContainer}>
          {/* Main Text with animation */}
          <Animated.Text 
            style={[
              styles.mainText,
              {
                opacity: textOpacity,
                transform: [{ translateY: textTranslateY }]
              }
            ]}
          >
            No doomscroll.{'\n'}Just the headlines{'\n'}you want.
          </Animated.Text>

          {/* Get Started Button with animation */}
          <Animated.View
            style={{
              opacity: buttonOpacity,
              transform: [
                { translateY: buttonTranslateY },
                { scale: buttonScale }
              ],
              width: '100%',
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

            {/* Temporary Dev Button */}
            <TouchableOpacity
              style={{ marginTop: 20, padding: 10 }}
              onPress={onSkip}
            >
              <Text style={{ color: 'red', fontFamily: 'Inter_500Medium' }}>[DEV] Skip to Main Screen</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  languageSelectorContainer: {
    position: 'absolute',
    top: 60,
    right: 16,
    zIndex: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 100,
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: SCREEN_WIDTH * 0.85,
    height: '100%',
  },
  bottomContainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 50,
    alignItems: 'center',
  },
  mainText: {
    fontSize: 32,
    fontFamily: 'PlayfairDisplay_700Bold',
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 48,
    marginBottom: 16,
  },
  getStartedButton: {
    backgroundColor: '#000000',
    borderRadius: 100,
    paddingVertical: 18,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  getStartedText: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    fontWeight: '700',
    color: '#ffffff',
  },
});