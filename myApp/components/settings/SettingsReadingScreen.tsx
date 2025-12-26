import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import BackIcon from '../BackIcon';

interface SettingsReadingScreenProps {
  onBack: () => void;
}

export default function SettingsReadingScreen({ onBack }: SettingsReadingScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_700Bold,
  });

  const [autoScroll, setAutoScroll] = useState(false);
  const [readingMode, setReadingMode] = useState(true);
  const [textToSpeech, setTextToSpeech] = useState(false);

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <BackIcon size={15} />
          </TouchableOpacity>
          <Text style={styles.title}>Reading Settings</Text>
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
        <Text style={styles.title}>Reading Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Auto Scroll</Text>
              <Text style={styles.settingDescription}>Automatically scroll articles</Text>
            </View>
            <Switch
              value={autoScroll}
              onValueChange={setAutoScroll}
              trackColor={{ false: '#E6E6E6', true: '#000000' }}
              thumbColor="#FFFFFF"
            />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Reading Mode</Text>
              <Text style={styles.settingDescription}>Distraction-free reading</Text>
            </View>
            <Switch
              value={readingMode}
              onValueChange={setReadingMode}
              trackColor={{ false: '#E6E6E6', true: '#000000' }}
              thumbColor="#FFFFFF"
            />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Text to Speech</Text>
              <Text style={styles.settingDescription}>Read articles aloud</Text>
            </View>
            <Switch
              value={textToSpeech}
              onValueChange={setTextToSpeech}
              trackColor={{ false: '#E6E6E6', true: '#000000' }}
              thumbColor="#FFFFFF"
            />
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
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  section: {
    marginTop: 24,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#808080',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
});

