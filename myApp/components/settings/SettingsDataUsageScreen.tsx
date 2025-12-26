import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import BackIcon from '../BackIcon';

interface SettingsDataUsageScreenProps {
  onBack: () => void;
}

const dataOptions = [
  { id: 'wifi', name: 'Wi-Fi Only', description: 'Download content only on Wi-Fi' },
  { id: 'cellular', name: 'Cellular Allowed', description: 'Allow downloads on cellular' },
  { id: 'auto', name: 'Auto', description: 'Smart data management' },
];

export default function SettingsDataUsageScreen({ onBack }: SettingsDataUsageScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_700Bold,
  });

  const [selectedOption, setSelectedOption] = useState('wifi');

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <BackIcon size={15} />
          </TouchableOpacity>
          <Text style={styles.title}>Data Usage</Text>
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
        <Text style={styles.title}>Data Usage</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionDescription}>
            Control how the app uses your mobile data.
          </Text>
          {dataOptions.map((option, index) => (
            <React.Fragment key={option.id}>
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => setSelectedOption(option.id)}
              >
                <View style={styles.optionInfo}>
                  <Text style={styles.optionName}>{option.name}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
                {selectedOption === option.id && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
              {index < dataOptions.length - 1 && <View style={styles.separator} />}
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
  sectionDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#808080',
    marginBottom: 16,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  optionInfo: {
    flex: 1,
  },
  optionName: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#808080',
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

