import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import Slider from '@react-native-community/slider';
import BackIcon from '../BackIcon';

interface SettingsFeedSizeScreenProps {
  onBack: () => void;
}

const sliderValues = [3, 6, 9, 12, 15];

export default function SettingsFeedSizeScreen({ onBack }: SettingsFeedSizeScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_500Medium,
  });

  const [sliderIndex, setSliderIndex] = useState(0);
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
    const index = Math.round(value);
    const clampedIndex = Math.max(0, Math.min(4, index));
    setSliderIndex(clampedIndex);
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <BackIcon size={15} />
          </TouchableOpacity>
          <Text style={styles.title}>Feed Size</Text>
          <View style={styles.placeholder} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <View style={styles.backButtonContainer}>
            <BackIcon size={15} />
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>Feed Size</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.subtitle}>
            Select how many headlines you'd like each time.
          </Text>

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

          <Text style={styles.headlineLabel}>
            {headlineCount} Headlines: {getHeadlineLabel(headlineCount)}
          </Text>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 217, 0.4)',
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#000000',
    lineHeight: 22,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  content: {
    marginTop: 24,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
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
  },
});




