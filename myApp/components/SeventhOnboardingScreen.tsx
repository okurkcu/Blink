import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, Image, Animated } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import BackIcon from './BackIcon';

interface SeventhOnboardingScreenProps {
  onNext?: () => void;
  onBack?: () => void;
}

interface Category {
  id: string;
  name: string;
  icon?: any; // Image source or emoji
}

const categories: Category[] = [
  { id: 'business', name: 'Business' },
  { id: 'science-tech', name: 'Science & Tech' },
  { id: 'music', name: 'Music' },
  { id: 'film-media', name: 'Film & Media' },
  { id: 'breaking-news', name: 'Breaking News' },
  { id: 'art', name: 'Art' },
  { id: 'fashion', name: 'Fashion' },
];

export default function SeventhOnboardingScreen({ onNext, onBack }: SeventhOnboardingScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_400Regular,
    Inter_400Regular,
  });

  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const categoryScales = useRef<{ [key: string]: Animated.Value }>({}).current;

  // Initialize animation values for each category
  categories.forEach((category) => {
    if (!categoryScales[category.id]) {
      categoryScales[category.id] = new Animated.Value(1);
    }
  });

  const toggleCategory = (categoryId: string) => {
    const newSelected = new Set(selectedCategories);
    const isSelecting = !newSelected.has(categoryId);
    
    if (isSelecting) {
      newSelected.add(categoryId);
      // Spring animation when selecting
      Animated.sequence([
        Animated.spring(categoryScales[categoryId], {
          toValue: 0.9,
          useNativeDriver: true,
        }),
        Animated.spring(categoryScales[categoryId], {
          toValue: 1,
          tension: 100,
          friction: 3,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      newSelected.delete(categoryId);
      // Quick scale down when deselecting
      Animated.timing(categoryScales[categoryId], {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
    setSelectedCategories(newSelected);
  };

  const getCategoryIcon = (categoryId: string) => {
    // For now, using emoji as placeholders - you can replace with actual icons
    const iconMap: { [key: string]: string } = {
      'business': '📉',
      'science-tech': '💻',
      'music': '🎹',
      'film-media': '📺',
      'breaking-news': '❗',
      'art': '🎨',
      'fashion': '🛍️',
    };
    return iconMap[categoryId] || '📰';
  };

  // Show loading state while fonts load
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <BackIcon size={15} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Tell us what you follow</Text>
          <Text style={styles.subtitle}>
            Pick a few categories and we'll send only what matters to you.
          </Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => {
              const isSelected = selectedCategories.has(category.id);
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    isSelected ? styles.categoryButtonSelected : styles.categoryButtonUnselected,
                  ]}
                  onPress={() => toggleCategory(category.id)}
                >
                  <Text style={styles.categoryIcon}>{getCategoryIcon(category.id)}</Text>
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity style={styles.continueButton} onPress={onNext}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <BackIcon size={15} />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.title}>Tell us what you follow</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Pick a few categories and we'll send only what matters to you.
        </Text>

        {/* Categories Grid */}
        <View style={styles.categoriesGrid}>
          {categories.map((category) => {
            const isSelected = selectedCategories.has(category.id);
            const scale = categoryScales[category.id] || new Animated.Value(1);
            return (
              <Animated.View
                key={category.id}
                style={{
                  transform: [{ scale }],
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    isSelected ? styles.categoryButtonSelected : styles.categoryButtonUnselected,
                  ]}
                  onPress={() => toggleCategory(category.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.categoryIcon}>{getCategoryIcon(category.id)}</Text>
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={onNext}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
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
    paddingTop: 80, // Adjusted to account for progress bar
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 217, 0.4)',
    borderRadius: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#000000',
    lineHeight: 40,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'PlayfairDisplay_400Regular',
    fontWeight: '500',
    color: '#000000',
    lineHeight: 20,
    marginBottom: 32,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 32,
    marginHorizontal: -6, // Negative margin to offset button margins
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 15,
    marginHorizontal: 6,
    marginBottom: 12,
    minHeight: 48,
  },
  categoryButtonUnselected: {
    backgroundColor: 'rgba(217, 217, 217, 0.4)',
  },
  categoryButtonSelected: {
    backgroundColor: 'rgba(217, 217, 217, 0.6)',
  },
  categoryIcon: {
    fontSize: 20,
    width: 20,
    height: 20,
    marginRight: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
    lineHeight: 22,
  },
  continueButton: {
    backgroundColor: '#000000',
    borderRadius: 1000,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  continueText: {
    fontSize: 16,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 21,
    letterSpacing: -0.31,
  },
});

