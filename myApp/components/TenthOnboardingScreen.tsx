import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import BackIcon from './BackIcon';

interface TenthOnboardingScreenProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function TenthOnboardingScreen({ onNext, onBack }: TenthOnboardingScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_400Regular,
  });

  const handleAllow = () => {
    // Handle allow notification logic here
    onNext?.();
  };

  const handleDontAllow = () => {
    // Handle don't allow logic here
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
          <Text style={styles.title}>Enable Notifications</Text>
          <View style={styles.popup}>
            <Text style={styles.popupText}>
              Blink would like to send you notifications
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.dontAllowButton} onPress={handleDontAllow}>
                <Text style={styles.dontAllowText}>Don't Allow</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.allowButton} onPress={handleAllow}>
                <Text style={styles.allowText}>Allow</Text>
              </TouchableOpacity>
            </View>
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
        <Text style={styles.title}>Enable Notifications</Text>

        {/* Notification Popup */}
        <View style={styles.popup}>
          <Text style={styles.popupText}>
            Blink would like to send you notifications
          </Text>
          
          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.dontAllowButton} onPress={handleDontAllow}>
              <Text style={styles.dontAllowText}>Don't Allow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.allowButton} onPress={handleAllow}>
              <Text style={styles.allowText}>Allow</Text>
            </TouchableOpacity>
          </View>
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
  },
  title: {
    fontSize: 32,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#000000',
    lineHeight: 40,
    marginBottom: 0,
  },
  popup: {
    position: 'absolute',
    top: '50%',
    left: 24,
    right: 24,
    transform: [{ translateY: -100 }],
    backgroundColor: '#E8E8E8',
    borderRadius: 20,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  popupText: {
    fontSize: 20,
    fontFamily: 'PlayfairDisplay_400Regular',
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 32,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  dontAllowButton: {
    flex: 1,
    backgroundColor: '#E8E8E8',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dontAllowText: {
    fontSize: 16,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    fontWeight: '600',
    color: '#000000',
  },
  allowButton: {
    flex: 1,
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  allowText: {
    fontSize: 16,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
