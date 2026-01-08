import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import BackIcon from '../BackIcon';

interface SettingsAppearanceScreenProps {
  onBack: () => void;
}

const themes = [
  { id: 'light', name: 'Light' },
  { id: 'dark', name: 'Dark' },
  { id: 'auto', name: 'Auto' },
];

const fontSizes = [
  { id: 'small', name: 'Small', size: 12 },
  { id: 'medium', name: 'Medium', size: 14 },
  { id: 'large', name: 'Large', size: 16 },
];

export default function SettingsAppearanceScreen({ onBack }: SettingsAppearanceScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_700Bold,
  });

  const [selectedTheme, setSelectedTheme] = useState('light');
  const [selectedFontSize, setSelectedFontSize] = useState('medium');

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <BackIcon size={15} />
          </TouchableOpacity>
          <Text style={styles.title}>Appearance</Text>
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
        <Text style={styles.title}>Appearance</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Theme</Text>
          {themes.map((theme, index) => (
            <React.Fragment key={theme.id}>
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => setSelectedTheme(theme.id)}
              >
                <Text style={styles.optionName}>{theme.name}</Text>
                {selectedTheme === theme.id && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
              {index < themes.length - 1 && <View style={styles.separator} />}
            </React.Fragment>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Font Size</Text>
          {fontSizes.map((size, index) => (
            <React.Fragment key={size.id}>
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => setSelectedFontSize(size.id)}
              >
                <Text style={styles.optionName}>{size.name}</Text>
                {selectedFontSize === size.id && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
              {index < fontSizes.length - 1 && <View style={styles.separator} />}
            </React.Fragment>
          ))}
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
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: '#000000',
    marginBottom: 16,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  optionName: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
  },
  checkmark: {
    fontSize: 18,
    color: '#000000',
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
});






