import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import BackIcon from '../BackIcon';

interface SettingsBackupScreenProps {
  onBack: () => void;
}

export default function SettingsBackupScreen({ onBack }: SettingsBackupScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_700Bold,
  });

  const [autoBackup, setAutoBackup] = useState(true);
  const [cloudSync, setCloudSync] = useState(true);
  const [lastBackup] = useState('2 hours ago');

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <BackIcon size={15} />
          </TouchableOpacity>
          <Text style={styles.title}>Backup & Sync</Text>
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
        <Text style={styles.title}>Backup & Sync</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <View style={styles.backupInfo}>
            <Text style={styles.backupLabel}>Last Backup</Text>
            <Text style={styles.backupValue}>{lastBackup}</Text>
          </View>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Auto Backup</Text>
              <Text style={styles.settingDescription}>Automatically backup your data</Text>
            </View>
            <Switch
              value={autoBackup}
              onValueChange={setAutoBackup}
              trackColor={{ false: '#E6E6E6', true: '#000000' }}
              thumbColor="#FFFFFF"
            />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Cloud Sync</Text>
              <Text style={styles.settingDescription}>Sync across devices</Text>
            </View>
            <Switch
              value={cloudSync}
              onValueChange={setCloudSync}
              trackColor={{ false: '#E6E6E6', true: '#000000' }}
              thumbColor="#FFFFFF"
            />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Backup Now</Text>
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
  backupInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  backupLabel: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
  },
  backupValue: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#808080',
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
  actionButton: {
    backgroundColor: '#000000',
    borderRadius: 1000,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    fontWeight: '600',
    color: '#ffffff',
  },
});

