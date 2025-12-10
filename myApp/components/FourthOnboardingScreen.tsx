import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import DateTimePicker from '@react-native-community/datetimepicker';
import BackIcon from './BackIcon';

interface FourthOnboardingScreenProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function FourthOnboardingScreen({ onNext, onBack }: FourthOnboardingScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_400Regular,
  });

  const [selectedTime, setSelectedTime] = useState(new Date(2024, 0, 1, 9, 41, 0)); // Default: 9:41 AM
  const [showPicker, setShowPicker] = useState(false);

  const handleTimeChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (date) {
      setSelectedTime(date);
    }
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes} ${ampm}`;
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
          <Text style={styles.title}>Start Time:</Text>
          <Text style={styles.subtitle}>
            Choose when you want your daily news window to begin. From this moment onward, we will collect the latest news for you.
          </Text>
          <View style={styles.timePickerContainer}>
            <Text style={styles.timeDisplay}>{formatTime(selectedTime)}</Text>
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
        <Text style={styles.title}>Start Time:</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Choose when you want your daily news window to begin. From this moment onward, we will collect the latest news for you.
        </Text>

        {/* Time Picker */}
        <View style={styles.timePickerContainer}>
          {Platform.OS === 'ios' ? (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display="spinner"
              onChange={handleTimeChange}
              textColor="#16191C"
              style={styles.timePicker}
            />
          ) : (
            <>
              <TouchableOpacity 
                style={styles.timePickerButton}
                onPress={() => setShowPicker(true)}
              >
                <Text style={styles.timeDisplay}>{formatTime(selectedTime)}</Text>
              </TouchableOpacity>
              {showPicker && (
                <DateTimePicker
                  value={selectedTime}
                  mode="time"
                  display="default"
                  onChange={handleTimeChange}
                />
              )}
            </>
          )}
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
    fontSize: 24,
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
    marginBottom: 32,
  },
  timePickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  timePicker: {
    width: '100%',
    height: 200,
  },
  timePickerButton: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  timeDisplay: {
    fontSize: 24,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    color: '#16191C',
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

