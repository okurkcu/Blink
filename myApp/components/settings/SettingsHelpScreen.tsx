import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import BackIcon from '../BackIcon';

interface SettingsHelpScreenProps {
  onBack: () => void;
}

const helpTopics = [
  { id: 'getting-started', title: 'Getting Started', description: 'Learn the basics' },
  { id: 'feed', title: 'Managing Your Feed', description: 'Customize your news feed' },
  { id: 'notifications', title: 'Notifications', description: 'Configure notifications' },
  { id: 'bookmarks', title: 'Bookmarks', description: 'Save articles for later' },
  { id: 'troubleshooting', title: 'Troubleshooting', description: 'Common issues and solutions' },
  { id: 'faq', title: 'FAQ', description: 'Frequently asked questions' },
];

export default function SettingsHelpScreen({ onBack }: SettingsHelpScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <BackIcon size={15} />
          </TouchableOpacity>
          <Text style={styles.title}>Help & Support</Text>
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
        <Text style={styles.title}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          {helpTopics.map((topic, index) => (
            <React.Fragment key={topic.id}>
              <TouchableOpacity style={styles.helpItem}>
                <View style={styles.helpInfo}>
                  <Text style={styles.helpTitle}>{topic.title}</Text>
                  <Text style={styles.helpDescription}>{topic.description}</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
              {index < helpTopics.length - 1 && <View style={styles.separator} />}
            </React.Fragment>
          ))}
        </View>
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Need More Help?</Text>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact Support</Text>
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
  helpItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  helpInfo: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
    marginBottom: 4,
  },
  helpDescription: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#808080',
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
  contactSection: {
    marginTop: 32,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#000000',
    marginBottom: 16,
  },
  contactButton: {
    backgroundColor: '#000000',
    borderRadius: 1000,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  contactButtonText: {
    fontSize: 16,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    fontWeight: '600',
    color: '#ffffff',
  },
});


