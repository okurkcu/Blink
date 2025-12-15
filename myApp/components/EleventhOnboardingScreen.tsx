import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Image } from 'expo-image';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import BackIcon from './BackIcon';

interface EleventhOnboardingScreenProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function EleventhOnboardingScreen({ onNext, onBack }: EleventhOnboardingScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
  });

  const handleSignInWithApple = () => {
    // Handle Apple sign in logic here
    onNext?.();
  };

  const handleSignInWithGoogle = () => {
    // Handle Google sign in logic here
    onNext?.();
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
          <Text style={styles.title}>Save your setup</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.appleButton} onPress={handleSignInWithApple}>
              <Image source={require('../assets/images/socials/apple-icon.svg')} style={styles.buttonIcon} />
              <Text style={styles.appleButtonText}>Sign in with Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleButton} onPress={handleSignInWithGoogle}>
              <Image source={require('../assets/images/socials/google-icon.svg')} style={styles.buttonIcon} />
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>
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
        <Text style={styles.title}>Save your setup</Text>

        {/* Sign In Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.appleButton} onPress={handleSignInWithApple}>
            <Image source={require('../assets/images/socials/apple-icon.svg')} style={styles.buttonIcon} />
            <Text style={styles.appleButtonText}>Sign in with Apple</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.googleButton} onPress={handleSignInWithGoogle}>
            <Image source={require('../assets/images/socials/google-icon.svg')} style={styles.buttonIcon} />
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>
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
  },
  title: {
    fontSize: 32,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#000000',
    lineHeight: 40,
    marginBottom: 0,
  },
  buttonsContainer: {
    position: 'absolute',
    top: '50%',
    left: 24,
    right: 24,
    transform: [{ translateY: -60 }],
    gap: 16,
  },
  appleButton: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    borderRadius: 1000,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 1000,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    resizeMode: 'contain',
  },
  appleButtonText: {
    fontSize: 16,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  googleButtonText: {
    fontSize: 16,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    fontWeight: '600',
    color: '#000000',
  },
});
