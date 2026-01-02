import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import BackIcon from '../BackIcon';

interface SettingsStorageScreenProps {
  onBack: () => void;
}

export default function SettingsStorageScreen({ onBack }: SettingsStorageScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_700Bold,
  });

  const storageInfo = {
    total: '256 MB',
    used: '128 MB',
    available: '128 MB',
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <BackIcon size={15} />
          </TouchableOpacity>
          <Text style={styles.title}>Storage</Text>
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
        <Text style={styles.title}>Storage</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <View style={styles.storageInfo}>
            <Text style={styles.storageLabel}>Total Storage</Text>
            <Text style={styles.storageValue}>{storageInfo.total}</Text>
          </View>
          <View style={styles.storageInfo}>
            <Text style={styles.storageLabel}>Used</Text>
            <Text style={styles.storageValue}>{storageInfo.used}</Text>
          </View>
          <View style={styles.storageInfo}>
            <Text style={styles.storageLabel}>Available</Text>
            <Text style={styles.storageValue}>{storageInfo.available}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionLabel}>Clear Cache</Text>
            <Text style={styles.actionValue}>Clear cached data</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionLabel}>Clear Downloads</Text>
            <Text style={styles.actionValue}>Remove downloaded articles</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionLabel}>Clear Bookmarks</Text>
            <Text style={styles.actionValue}>Remove all bookmarks</Text>
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
  storageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  storageLabel: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
  },
  storageValue: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#808080',
  },
  actionItem: {
    paddingVertical: 16,
  },
  actionLabel: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
    marginBottom: 4,
  },
  actionValue: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#808080',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
});


