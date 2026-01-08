import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Inter_400Regular, Inter_700Bold, Inter_500Medium } from '@expo-google-fonts/inter';
import BackIcon from '../BackIcon';

interface SettingsNotificationsScreenProps {
  onBack: () => void;
}

export default function SettingsNotificationsScreen({ onBack }: SettingsNotificationsScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_700Bold,
    Inter_500Medium,
  });

  const [pushNotifications, setPushNotifications] = useState(true);
  // const [emailNotifications, setEmailNotifications] = useState(false);
  // const [dailyDigest, setDailyDigest] = useState(true);
  // const [breakingNews, setBreakingNews] = useState(true);
  // const [categoryUpdates, setCategoryUpdates] = useState(false);

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <BackIcon size={15} />
          </TouchableOpacity>
          <Text style={styles.title}>Notifications</Text>
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
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              You'll receive news headlines at your selected time interval. Make sure push notifications are enabled to stay updated.
            </Text>
          </View>
          
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: '#E6E6E6', true: '#000000' }}
              thumbColor="#FFFFFF"
            />
          </TouchableOpacity>
          
          {/* Commented out notification options */}
          {/* <View style={styles.separator} />
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Email Notifications</Text>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              trackColor={{ false: '#E6E6E6', true: '#000000' }}
              thumbColor="#FFFFFF"
            />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Daily Digest</Text>
            <Switch
              value={dailyDigest}
              onValueChange={setDailyDigest}
              trackColor={{ false: '#E6E6E6', true: '#000000' }}
              thumbColor="#FFFFFF"
            />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Breaking News</Text>
            <Switch
              value={breakingNews}
              onValueChange={setBreakingNews}
              trackColor={{ false: '#E6E6E6', true: '#000000' }}
              thumbColor="#FFFFFF"
            />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Category Updates</Text>
            <Switch
              value={categoryUpdates}
              onValueChange={setCategoryUpdates}
              trackColor={{ false: '#E6E6E6', true: '#000000' }}
              thumbColor="#FFFFFF"
            />
          </TouchableOpacity> */}
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
    paddingTop: 70,
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
    lineHeight: 30,
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
  infoContainer: {
    backgroundColor: '#F5F5F7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#808080',
    lineHeight: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
});




