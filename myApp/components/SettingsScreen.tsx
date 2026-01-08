import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert, Animated, Dimensions } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Inter_400Regular, Inter_700Bold, Inter_500Medium } from '@expo-google-fonts/inter';
import BackIcon from './BackIcon';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Import settings sub-screens
import SettingsAccountScreen from './settings/SettingsAccountScreen';
import SettingsNotificationsScreen from './settings/SettingsNotificationsScreen';
import SettingsLanguageScreen from './settings/SettingsLanguageScreen';
import SettingsTimeIntervalScreen from './settings/SettingsTimeIntervalScreen';
import SettingsPrivacyDataScreen from './settings/SettingsPrivacyDataScreen';

interface SettingsScreenProps {
  onBack: () => void;
}

type SettingsSubScreen = 
  | 'account'
  | 'notifications'
  | 'language'
  | 'timeInterval'
  | 'privacyData'
  | null;

export default function SettingsScreen({ onBack }: SettingsScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_700Bold,
    Inter_500Medium,
  });

  const [activeSubScreen, setActiveSubScreen] = useState<SettingsSubScreen>(null);
  const subScreenSlideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;

  // Animate sub-screen when it changes
  useEffect(() => {
    if (activeSubScreen) {
      // Slide in from right
      Animated.timing(subScreenSlideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Reset position when no sub-screen
      subScreenSlideAnim.setValue(SCREEN_WIDTH);
    }
  }, [activeSubScreen]);

  const handleSubScreenBack = () => {
    // Animate slide out to right
    Animated.timing(subScreenSlideAnim, {
      toValue: SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setActiveSubScreen(null);
    });
  };

  const handleSubScreenSelect = (screen: SettingsSubScreen) => {
    setActiveSubScreen(screen);
  };

  const settingsMenuItems = [
    { id: 'account' as SettingsSubScreen, title: 'Account', description: 'Manage your account settings' },
    { id: 'notifications' as SettingsSubScreen, title: 'Notifications', description: 'Configure notification preferences' },
    { id: 'language' as SettingsSubScreen, title: 'Language', description: 'Change app language' },
    { id: 'timeInterval' as SettingsSubScreen, title: 'Set News Time Interval', description: 'Set your news delivery schedule' },
    // Privacy & Data - will be added in next increment
    // { id: 'privacyData' as SettingsSubScreen, title: 'Privacy & Data', description: 'Privacy and data settings' },
  ];


  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {
          // TODO: Implement logout functionality
          console.log('Logout pressed');
        }},
      ]
    );
  };

  // Render sub-screens with animation
  const renderSubScreen = () => {
    if (!activeSubScreen) return null;

    let SubScreenComponent;
    switch (activeSubScreen) {
      case 'account':
        SubScreenComponent = SettingsAccountScreen;
        break;
      case 'notifications':
        SubScreenComponent = SettingsNotificationsScreen;
        break;
      case 'language':
        SubScreenComponent = SettingsLanguageScreen;
        break;
      case 'timeInterval':
        SubScreenComponent = SettingsTimeIntervalScreen;
        break;
      case 'privacyData':
        SubScreenComponent = SettingsPrivacyDataScreen;
        break;
      default:
        return null;
    }

    return (
      <Animated.View
        style={[
          styles.subScreenContainer,
          {
            transform: [{ translateX: subScreenSlideAnim }],
          },
        ]}
      >
        <SubScreenComponent onBack={handleSubScreenBack} />
      </Animated.View>
    );
  };

  // Show loading state while fonts load
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <BackIcon size={15} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity> */}
          <View style={styles.logoutButtonPlaceholder} />
        </View>
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
        <Text style={styles.headerTitle}>Settings</Text>
        {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity> */}
        <View style={styles.logoutButtonPlaceholder} />
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarInitials}>JD</Text>
          </View>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>johndoe@example.com</Text>
        </View>

        {/* Settings Menu */}
        <View style={styles.menuSection}>
          {settingsMenuItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => handleSubScreenSelect(item.id)}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemDescription}>{item.description}</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
              {index < settingsMenuItems.length - 1 && <View style={styles.separator} />}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>

      {/* Animated Sub-Screens Overlay */}
      {renderSubScreen()}
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
  headerTitle: {
    fontSize: 20,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#000000',
    lineHeight: 28,
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  logoutText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#FF3B30',
  },
  logoutButtonPlaceholder: {
    width: 60,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarInitials: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#000000',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#808080',
  },
  menuSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  menuItemContent: {
    flex: 1,
    marginRight: 12,
  },
  menuItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#000000',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#808080',
    lineHeight: 16,
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
  },
  subScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#faf9f6',
    zIndex: 10,
  },
});


