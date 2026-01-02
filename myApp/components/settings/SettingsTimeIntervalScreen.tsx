import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import { Inter_600SemiBold } from '@expo-google-fonts/inter';
import DateTimePicker from '@react-native-community/datetimepicker';
import BackIcon from '../BackIcon';

interface SettingsTimeIntervalScreenProps {
  onBack: () => void;
}

export default function SettingsTimeIntervalScreen({ onBack }: SettingsTimeIntervalScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_400Regular,
    Inter_600SemiBold,
  });

  const [startTime, setStartTime] = useState(new Date(2024, 0, 1, 9, 0, 0));
  const [endTime, setEndTime] = useState(new Date(2024, 0, 1, 18, 0, 0));
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleStartTimeChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowStartPicker(false);
    }
    if (date) {
      setStartTime(date);
    }
  };

  const handleEndTimeChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowEndPicker(false);
    }
    if (date) {
      setEndTime(date);
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

  const handleSave = () => {
    // TODO: Save times to persistent storage or API
    Alert.alert(
      'Saved!',
      `Your news will be collected from ${formatTime(startTime)} to ${formatTime(endTime)}.`,
      [{ text: 'OK', onPress: onBack }]
    );
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <BackIcon size={15} />
          </TouchableOpacity>
          <Text style={styles.title}>News Time Interval</Text>
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
        <Text style={styles.title}>News Time Interval</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.description}>
            Set the time interval when you want to receive news updates.
          </Text>

          {/* Start Time */}
          <View style={styles.timeSection}>
            <Text style={styles.sectionTitle}>Start Time</Text>
            <Text style={styles.sectionDescription}>
              When should we start collecting news for you?
            </Text>
            <View style={styles.timePickerContainer}>
              {Platform.OS === 'ios' ? (
                <DateTimePicker
                  value={startTime}
                  mode="time"
                  display="spinner"
                  onChange={handleStartTimeChange}
                  textColor="#16191C"
                  style={styles.timePicker}
                />
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.timePickerButton}
                    onPress={() => setShowStartPicker(true)}
                  >
                    <Text style={styles.timeDisplay}>{formatTime(startTime)}</Text>
                  </TouchableOpacity>
                  {showStartPicker && (
                    <DateTimePicker
                      value={startTime}
                      mode="time"
                      display="default"
                      onChange={handleStartTimeChange}
                    />
                  )}
                </>
              )}
            </View>
          </View>

          {/* End Time */}
          <View style={styles.timeSection}>
            <Text style={styles.sectionTitle}>End Time</Text>
            <Text style={styles.sectionDescription}>
              When should we deliver your curated news?
            </Text>
            <View style={styles.timePickerContainer}>
              {Platform.OS === 'ios' ? (
                <DateTimePicker
                  value={endTime}
                  mode="time"
                  display="spinner"
                  onChange={handleEndTimeChange}
                  textColor="#16191C"
                  style={styles.timePicker}
                />
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.timePickerButton}
                    onPress={() => setShowEndPicker(true)}
                  >
                    <Text style={styles.timeDisplay}>{formatTime(endTime)}</Text>
                  </TouchableOpacity>
                  {showEndPicker && (
                    <DateTimePicker
                      value={endTime}
                      mode="time"
                      display="default"
                      onChange={handleEndTimeChange}
                    />
                  )}
                </>
              )}
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
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
    fontSize: 20,
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
  description: {
    fontSize: 15,
    fontFamily: 'PlayfairDisplay_400Regular',
    color: '#000000',
    lineHeight: 22,
    marginBottom: 32,
  },
  timeSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#000000',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    fontFamily: 'PlayfairDisplay_400Regular',
    color: '#808080',
    marginBottom: 16,
  },
  timePickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
  },
  timePicker: {
    width: '100%',
    height: 150,
  },
  timePickerButton: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    minWidth: 200,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  timeDisplay: {
    fontSize: 24,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    color: '#16191C',
  },
  saveButton: {
    backgroundColor: '#000000',
    borderRadius: 1000,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
    lineHeight: 21,
    letterSpacing: -0.31,
  },
});

