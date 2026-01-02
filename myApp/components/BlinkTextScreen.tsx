import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';

export default function BlinkTextScreen() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.blinkText}>Blink</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blinkText: {
    fontSize: 48,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 22,
  },
});



