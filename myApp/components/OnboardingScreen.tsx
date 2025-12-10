import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import LogoIcon from './LogoIcon';

export default function OnboardingScreen() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
  });

  // Show loading state while fonts load
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <LogoIcon size={120} />
          </View>
          <Text style={{ fontSize: 48, color: '#000000', textAlign: 'center' }}>Blink</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo icon */}
        <View style={styles.iconContainer}>
          <LogoIcon size={120} />
        </View>
        
        {/* Blink text */}
        <Text style={styles.blinkText}>Blink</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 30,
  },
  blinkText: {
    fontSize: 48,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#000000',
    textAlign: 'center',
  },
});

