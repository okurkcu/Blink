import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import BackIcon from '../BackIcon';

interface SettingsVersionScreenProps {
  onBack: () => void;
}

export default function SettingsVersionScreen({ onBack }: SettingsVersionScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_700Bold,
  });

  const versionInfo = {
    version: '1.0.0',
    build: '2024.12.26',
    platform: Platform.OS,
    osVersion: Platform.Version,
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <BackIcon size={15} />
          </TouchableOpacity>
          <Text style={styles.title}>Version Info</Text>
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
        <Text style={styles.title}>Version Info</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.versionSection}>
            <Text style={styles.versionLabel}>App Version</Text>
            <Text style={styles.versionValue}>{versionInfo.version}</Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Build Number</Text>
            <Text style={styles.infoValue}>{versionInfo.build}</Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Platform</Text>
            <Text style={styles.infoValue}>{versionInfo.platform}</Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>OS Version</Text>
            <Text style={styles.infoValue}>{versionInfo.osVersion}</Text>
          </View>
          <TouchableOpacity style={styles.checkButton}>
            <Text style={styles.checkButtonText}>Check for Updates</Text>
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
  content: {
    marginTop: 24,
  },
  versionSection: {
    alignItems: 'center',
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 24,
  },
  versionLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#808080',
    marginBottom: 8,
  },
  versionValue: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#000000',
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  infoLabel: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#808080',
  },
  checkButton: {
    backgroundColor: '#000000',
    borderRadius: 1000,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 32,
  },
  checkButtonText: {
    fontSize: 16,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    fontWeight: '600',
    color: '#ffffff',
  },
});




