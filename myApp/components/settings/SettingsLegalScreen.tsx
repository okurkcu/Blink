import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Linking } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import BackIcon from '../BackIcon';

interface SettingsLegalScreenProps {
  onBack: () => void;
}

const legalLinks = [
  { id: 'terms', title: 'Terms of Service', url: 'https://example.com/terms' },
  { id: 'privacy', title: 'Privacy Policy', url: 'https://example.com/privacy' },
  { id: 'cookies', title: 'Cookie Policy', url: 'https://example.com/cookies' },
  { id: 'licenses', title: 'Open Source Licenses', url: 'https://example.com/licenses' },
];

export default function SettingsLegalScreen({ onBack }: SettingsLegalScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_700Bold,
  });

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <BackIcon size={15} />
          </TouchableOpacity>
          <Text style={styles.title}>Legal</Text>
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
        <Text style={styles.title}>Legal</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          {legalLinks.map((link, index) => (
            <React.Fragment key={link.id}>
              <TouchableOpacity
                style={styles.legalItem}
                onPress={() => handleLinkPress(link.url)}
              >
                <Text style={styles.legalTitle}>{link.title}</Text>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
              {index < legalLinks.length - 1 && <View style={styles.separator} />}
            </React.Fragment>
          ))}
        </View>
        <View style={styles.copyrightSection}>
          <Text style={styles.copyrightText}>
            © 2024 Blink. All rights reserved.
          </Text>
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
  legalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  legalTitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
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
  copyrightSection: {
    marginTop: 32,
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#808080',
  },
});






