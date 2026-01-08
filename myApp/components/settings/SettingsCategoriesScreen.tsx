import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import BackIcon from '../BackIcon';

interface SettingsCategoriesScreenProps {
  onBack: () => void;
}

const categories = [
  { id: 'global', name: 'Global', enabled: true },
  { id: 'tech', name: 'Science & Tech', enabled: true },
  { id: 'sports', name: 'Sports', enabled: false },
  { id: 'business', name: 'Business', enabled: true },
  { id: 'entertainment', name: 'Entertainment', enabled: false },
  { id: 'health', name: 'Health', enabled: true },
  { id: 'politics', name: 'Politics', enabled: false },
  { id: 'culture', name: 'Culture', enabled: true },
];

export default function SettingsCategoriesScreen({ onBack }: SettingsCategoriesScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_700Bold,
  });

  const [categoryStates, setCategoryStates] = useState(
    categories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.enabled }), {} as Record<string, boolean>)
  );

  const toggleCategory = (id: string) => {
    setCategoryStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <BackIcon size={15} />
          </TouchableOpacity>
          <Text style={styles.title}>Categories</Text>
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
        <Text style={styles.title}>Categories</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionDescription}>
            Select the categories you want to see in your feed.
          </Text>
          {categories.map((category, index) => (
            <React.Fragment key={category.id}>
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => toggleCategory(category.id)}
              >
                <Text style={styles.categoryName}>{category.name}</Text>
                <Switch
                  value={categoryStates[category.id]}
                  onValueChange={() => toggleCategory(category.id)}
                  trackColor={{ false: '#E6E6E6', true: '#000000' }}
                  thumbColor="#FFFFFF"
                />
              </TouchableOpacity>
              {index < categories.length - 1 && <View style={styles.separator} />}
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
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  categoryName: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
});






