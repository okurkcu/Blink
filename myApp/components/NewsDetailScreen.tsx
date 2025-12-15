import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useFonts, Inter_400Regular, Inter_700Bold, Inter_500Medium } from '@expo-google-fonts/inter';
import BackIcon from './BackIcon';
import BookmarkIcon from './BookmarkIcon';

interface NewsDetailScreenProps {
  newsItem?: {
    id: string;
    headline: string;
    category: string;
    snippet: string;
    timestamp: string;
  };
  onBack: () => void;
}

export default function NewsDetailScreen({ newsItem, onBack }: NewsDetailScreenProps) {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_500Medium,
  });

  // Default mock data if no newsItem is provided
  const article = newsItem || {
    id: '1',
    headline: 'Louvre Museum Got Robbed',
    category: 'Global',
    snippet: 'On 19 October 2025, thieves disguised as construction workers stole eight pieces of the French Crown Jewels, valued at approximately €88 million, from the Galeria d\'Apollon. The carefully orchestrated heist took place during routine maintenance hours, when workers were frequently seen moving equipment in and out of the gallery. According to investigators, the perpetrators entered the palace with forged documents, blended seamlessly with legitimate staff, and targeted only high-value pieces that could be removed quickly without triggering alarms.',
    timestamp: 'Tuesday, 23.11.2025 at 02.34',
  };

  const handleBookmark = () => {
    console.log('Bookmark pressed');
    // TODO: Implement bookmark functionality
  };

  // Show loading state while fonts load
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <View style={styles.backIconPlaceholder} />
          </TouchableOpacity>
          <Text style={styles.categoryTitle}>{article.category}</Text>
          <TouchableOpacity style={styles.bookmarkButton} onPress={handleBookmark}>
            <View style={styles.bookmarkIconPlaceholder} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.imageContainer}>
            <View style={styles.imagePlaceholder} />
          </View>
          <View style={styles.content}>
            <Text style={styles.headline}>{article.headline}</Text>
            <View style={styles.metadataRow}>
              <View style={styles.categoryRow}>
                <Text style={styles.categoryIcon}>📄</Text>
                <Text style={styles.categoryText}>{article.category}</Text>
              </View>
              <Text style={styles.timestamp}>{article.timestamp}</Text>
            </View>
            <Text style={styles.bodyText}>{article.snippet}</Text>
            <Text style={styles.sourceText}>Source: https://blabla.com</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <View style={styles.backIconContainer}>
            <BackIcon size={15} />
          </View>
        </TouchableOpacity>
        <Text style={styles.categoryTitle}>{article.category}</Text>
        <TouchableOpacity style={styles.bookmarkButton} onPress={handleBookmark}>
          <View style={styles.bookmarkIconContainer}>
            <BookmarkIcon size={15} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* News Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/louvre.jpg')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* News Content */}
        <View style={styles.content}>
          {/* Headline */}
          <Text style={styles.headline}>{article.headline}</Text>

          {/* Metadata Row */}
          <View style={styles.metadataRow}>
            <View style={styles.categoryRow}>
              <Text style={styles.categoryIcon}>📄</Text>
              <Text style={styles.categoryText}>{article.category}</Text>
            </View>
            <Text style={styles.timestamp}>{article.timestamp}</Text>
          </View>

          {/* Body Text */}
          <Text style={styles.bodyText}>{article.snippet}</Text>

          {/* Source */}
          <Text style={styles.sourceText}>
            <Text style={styles.sourceLabel}>Source: </Text>
            <Text style={styles.sourceLink}>https://blabla.com</Text>
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
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 217, 0.4)',
    borderRadius: 20,
  },
  backIconPlaceholder: {
    width: 15,
    height: 15,
    backgroundColor: '#1E1E1E',
    borderRadius: 7.5,
  },
  categoryTitle: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(30, 30, 30, 0.75)',
    lineHeight: 25,
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 217, 0.4)',
    borderRadius: 20,
  },
  bookmarkIconPlaceholder: {
    width: 15,
    height: 15,
    backgroundColor: '#1E1E1E',
    borderRadius: 7.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 9,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#d9d9d9',
    borderRadius: 9,
  },
  content: {
    paddingHorizontal: 16,
  },
  headline: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: '#000000',
    lineHeight: 25,
    marginBottom: 16,
  },
  metadataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  categoryText: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(30, 30, 30, 0.75)',
    lineHeight: 25,
  },
  timestamp: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    color: '#C0C0C0',
    lineHeight: 25,
  },
  bodyText: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
    lineHeight: 20,
    letterSpacing: 0.5,
    marginBottom: 24,
  },
  sourceText: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    color: '#C0C0C0',
    lineHeight: 25,
  },
  sourceLabel: {
    fontFamily: 'Inter_400Regular',
  },
  sourceLink: {
    fontFamily: 'Inter_500Medium',
    textDecorationLine: 'underline',
  },
});

