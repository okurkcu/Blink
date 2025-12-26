import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Inter_400Regular, Inter_700Bold, Inter_500Medium } from '@expo-google-fonts/inter';
import BackIcon from './BackIcon';

// Import all settings sub-screens
import SettingsProfileScreen from './settings/SettingsProfileScreen';
import SettingsNotificationsScreen from './settings/SettingsNotificationsScreen';
import SettingsLanguageScreen from './settings/SettingsLanguageScreen';
import SettingsFeedSizeScreen from './settings/SettingsFeedSizeScreen';
import SettingsStartTimeScreen from './settings/SettingsStartTimeScreen';
import SettingsEndTimeScreen from './settings/SettingsEndTimeScreen';
import SettingsCategoriesScreen from './settings/SettingsCategoriesScreen';
import SettingsPrivacyScreen from './settings/SettingsPrivacyScreen';
import SettingsDataUsageScreen from './settings/SettingsDataUsageScreen';
import SettingsAppearanceScreen from './settings/SettingsAppearanceScreen';
import SettingsAboutScreen from './settings/SettingsAboutScreen';
import SettingsHelpScreen from './settings/SettingsHelpScreen';
import SettingsAccountScreen from './settings/SettingsAccountScreen';
import SettingsSecurityScreen from './settings/SettingsSecurityScreen';
import SettingsContentScreen from './settings/SettingsContentScreen';
import SettingsReadingScreen from './settings/SettingsReadingScreen';
import SettingsSharingScreen from './settings/SettingsSharingScreen';
import SettingsStorageScreen from './settings/SettingsStorageScreen';
import SettingsBackupScreen from './settings/SettingsBackupScreen';
import SettingsAdvancedScreen from './settings/SettingsAdvancedScreen';
import SettingsFeedbackScreen from './settings/SettingsFeedbackScreen';
import SettingsLegalScreen from './settings/SettingsLegalScreen';
import SettingsVersionScreen from './settings/SettingsVersionScreen';
import SettingsDebugScreen from './settings/SettingsDebugScreen';

interface SettingsScreenProps {
  onBack: () => void;
}

type SettingsSubScreen = 
  | 'profile'
  | 'notifications'
  | 'language'
  | 'feedSize'
  | 'startTime'
  | 'endTime'
  | 'categories'
  | 'privacy'
  | 'dataUsage'
  | 'appearance'
  | 'about'
  | 'help'
  | 'account'
  | 'security'
  | 'content'
  | 'reading'
  | 'sharing'
  | 'storage'
  | 'backup'
  | 'advanced'
  | 'feedback'
  | 'legal'
  | 'version'
  | 'debug'
  | null;

export default function SettingsScreen({ onBack }: SettingsScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_700Bold,
    Inter_500Medium,
  });

  const [activeSubScreen, setActiveSubScreen] = useState<SettingsSubScreen>(null);

  const settingsMenuItems = [
    { id: 'profile' as SettingsSubScreen, title: 'Profile', icon: '👤' },
    { id: 'account' as SettingsSubScreen, title: 'Account', icon: '🔐' },
    { id: 'notifications' as SettingsSubScreen, title: 'Notifications', icon: '🔔' },
    { id: 'language' as SettingsSubScreen, title: 'Language', icon: '🌐' },
    { id: 'feedSize' as SettingsSubScreen, title: 'Feed Size', icon: '📊' },
    { id: 'startTime' as SettingsSubScreen, title: 'Start Time', icon: '⏰' },
    { id: 'endTime' as SettingsSubScreen, title: 'End Time', icon: '⏱️' },
    { id: 'categories' as SettingsSubScreen, title: 'Categories', icon: '📁' },
    { id: 'content' as SettingsSubScreen, title: 'Content Preferences', icon: '📰' },
    { id: 'reading' as SettingsSubScreen, title: 'Reading Settings', icon: '📖' },
    { id: 'appearance' as SettingsSubScreen, title: 'Appearance', icon: '🎨' },
    { id: 'privacy' as SettingsSubScreen, title: 'Privacy', icon: '🔒' },
    { id: 'security' as SettingsSubScreen, title: 'Security', icon: '🛡️' },
    { id: 'dataUsage' as SettingsSubScreen, title: 'Data Usage', icon: '📶' },
    { id: 'sharing' as SettingsSubScreen, title: 'Sharing', icon: '🔗' },
    { id: 'storage' as SettingsSubScreen, title: 'Storage', icon: '💾' },
    { id: 'backup' as SettingsSubScreen, title: 'Backup & Sync', icon: '☁️' },
    { id: 'advanced' as SettingsSubScreen, title: 'Advanced', icon: '⚙️' },
    { id: 'help' as SettingsSubScreen, title: 'Help & Support', icon: '❓' },
    { id: 'feedback' as SettingsSubScreen, title: 'Send Feedback', icon: '💬' },
    { id: 'about' as SettingsSubScreen, title: 'About', icon: 'ℹ️' },
    { id: 'legal' as SettingsSubScreen, title: 'Legal', icon: '📜' },
    { id: 'version' as SettingsSubScreen, title: 'Version Info', icon: '🔢' },
    { id: 'debug' as SettingsSubScreen, title: 'Debug', icon: '🐛' },
  ];

  const handleSubScreenBack = () => {
    setActiveSubScreen(null);
  };

  // Render sub-screens
  if (activeSubScreen === 'profile') {
    return <SettingsProfileScreen onBack={handleSubScreenBack} />;
  }
  if (activeSubScreen === 'notifications') {
    return <SettingsNotificationsScreen onBack={handleSubScreenBack} />;
  }
  if (activeSubScreen === 'language') {
    return <SettingsLanguageScreen onBack={handleSubScreenBack} />;
  }
  if (activeSubScreen === 'feedSize') {
    return <SettingsFeedSizeScreen onBack={handleSubScreenBack} />;
  }
  if (activeSubScreen === 'startTime') {
    return <SettingsStartTimeScreen onBack={handleSubScreenBack} />;
  }
  if (activeSubScreen === 'endTime') {
    return <SettingsEndTimeScreen onBack={handleSubScreenBack} />;
  }
  if (activeSubScreen === 'categories') {
    return <SettingsCategoriesScreen onBack={handleSubScreenBack} />;
  }
  if (activeSubScreen === 'privacy') {
    return <SettingsPrivacyScreen onBack={handleSubScreenBack} />;
  }
  if (activeSubScreen === 'dataUsage') {
    return <SettingsDataUsageScreen onBack={handleSubScreenBack} />;
  }
  if (activeSubScreen === 'appearance') {
    return <SettingsAppearanceScreen onBack={handleSubScreenBack} />;
  }
  if (activeSubScreen === 'about') {
    return <SettingsAboutScreen onBack={handleSubScreenBack} />;
  }
  if (activeSubScreen === 'help') {
    return <SettingsHelpScreen onBack={handleSubScreenBack} />;
  }
  if (activeSubScreen === 'account') {
    return <SettingsAccountScreen onBack={handleSubScreenBack} />;
  }
  if (activeSubScreen === 'security') {
    return <SettingsSecurityScreen onBack={handleSubScreenBack} />;
  }
  if (activeSubScreen === 'content') {
    return <SettingsContentScreen onBack={handleSubScreenBack} />;
  }
  if (activeSubScreen === 'reading') {
    return <SettingsReadingScreen onBack={handleSubScreenBack} />;
  }
  if (activeSubScreen === 'sharing') {
    return <SettingsSharingScreen onBack={handleSubScreenBack} />;
  }
  if (activeSubScreen === 'storage') {
    return <SettingsStorageScreen onBack={handleSubScreenBack} />;
  }
  if (activeSubScreen === 'backup') {
    return <SettingsBackupScreen onBack={handleSubScreenBack} />;
  }
  if (activeSubScreen === 'advanced') {
    return <SettingsAdvancedScreen onBack={handleSubScreenBack} />;
  }
  if (activeSubScreen === 'feedback') {
    return <SettingsFeedbackScreen onBack={handleSubScreenBack} />;
  }
  if (activeSubScreen === 'legal') {
    return <SettingsLegalScreen onBack={handleSubScreenBack} />;
  }
  if (activeSubScreen === 'version') {
    return <SettingsVersionScreen onBack={handleSubScreenBack} />;
  }
  if (activeSubScreen === 'debug') {
    return <SettingsDebugScreen onBack={handleSubScreenBack} />;
  }

  // Show loading state while fonts load
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <BackIcon size={15} />
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.placeholder} />
        </View>
        <ScrollView style={styles.scrollView}>
          {settingsMenuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <View style={styles.backButtonContainer}>
            <BackIcon size={15} />
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Settings Menu */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {settingsMenuItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => setActiveSubScreen(item.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuText}>{item.title}</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
            {index < settingsMenuItems.length - 1 && <View style={styles.separator} />}
          </React.Fragment>
        ))}
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 28,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
    lineHeight: 22,
  },
  chevron: {
    fontSize: 24,
    color: '#C0C0C0',
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginLeft: 44,
  },
});

