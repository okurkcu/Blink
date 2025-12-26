import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Animated, Dimensions, PanResponder } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import BackIcon from './BackIcon';
import BookmarkIcon from './BookmarkIcon';
import NewsDetailScreen from './NewsDetailScreen';
import PageIndicator from './PageIndicator';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SavedNewsItem {
  id: string;
  headline: string;
  category: string;
  snippet: string;
  timestamp: string;
  savedDate: string;
}

const mockSavedNewsData: SavedNewsItem[] = [
  {
    id: 'saved-1',
    headline: 'Louvre Museum Got Robbed',
    category: 'Global',
    snippet: 'On 19 October 2025, thieves disguised as construction workers stole eight pieces of the French Crown Jewels valued at approximately €88 million from the Galeria d\'Apollon...',
    timestamp: 'Tue, 02.34',
    savedDate: 'Saved 2 days ago',
  },
  {
    id: 'saved-2',
    headline: 'Fall of Curry\'s UA Partnership',
    category: 'Global',
    snippet: 'Stephen Curry and Under Armour made their breakup official on Nov. 13, announcing that a decade-plus partnership had ended. Fans of the Golden State Warriors superstar...',
    timestamp: 'Tue, 00.12',
    savedDate: 'Saved 3 days ago',
  },
  {
    id: 'saved-3',
    headline: 'Tech Giants Announce New AI Initiative',
    category: 'Science & Tech',
    snippet: 'Major technology companies have joined forces to launch a groundbreaking artificial intelligence initiative aimed at advancing research and development...',
    timestamp: 'Mon, 21.45',
    savedDate: 'Saved 5 days ago',
  },
  {
    id: 'saved-4',
    headline: 'Climate Summit Reaches Historic Agreement',
    category: 'Global',
    snippet: 'World leaders have reached a historic agreement on climate action, committing to ambitious targets for reducing carbon emissions over the next decade...',
    timestamp: 'Mon, 20.30',
    savedDate: 'Saved 1 week ago',
  },
  {
    id: 'saved-5',
    headline: 'New Breakthrough in Medical Research',
    category: 'Science & Tech',
    snippet: 'Scientists have announced a major breakthrough in medical research that could revolutionize treatment for chronic diseases, offering new hope to millions...',
    timestamp: 'Mon, 19.15',
    savedDate: 'Saved 1 week ago',
  },
  {
    id: 'saved-6',
    headline: 'Revolutionary Space Mission Launched',
    category: 'Science & Tech',
    snippet: 'A groundbreaking space mission has been launched to explore the outer reaches of our solar system, marking a new era in space exploration and scientific discovery...',
    timestamp: 'Sun, 18.00',
    savedDate: 'Saved 2 weeks ago',
  },
  {
    id: 'saved-7',
    headline: 'Global Economic Forum Concludes',
    category: 'Global',
    snippet: 'World leaders and business executives gathered for the annual economic forum, discussing strategies for sustainable growth and international cooperation...',
    timestamp: 'Sun, 16.30',
    savedDate: 'Saved 2 weeks ago',
  },
  {
    id: 'saved-8',
    headline: 'Major Sports League Announces Expansion',
    category: 'Global',
    snippet: 'In a historic move, one of the world\'s premier sports leagues has announced plans for significant expansion, bringing the sport to new markets and audiences...',
    timestamp: 'Sat, 15.00',
    savedDate: 'Saved 3 weeks ago',
  },
];

interface SavedNewsScreenProps {
  onBack: () => void;
}

export default function SavedNewsScreen({ onBack }: SavedNewsScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_700Bold,
  });

  const [selectedNews, setSelectedNews] = useState<SavedNewsItem | null>(null);
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(
    new Set(mockSavedNewsData.map(item => item.id))
  );

  const slideAnim = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only capture if swiping right and movement is more horizontal than vertical
        return gestureState.dx > 8 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderGrant: () => {
        // We can add feedback here if needed
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0) {
          // Swiping right - go back to main screen
          const translateX = Math.min(gestureState.dx, SCREEN_WIDTH);
          slideAnim.setValue(translateX);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 100 || gestureState.vx > 0.5) {
          // Swipe right completed - go back
          Animated.timing(slideAnim, {
            toValue: SCREEN_WIDTH,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            onBack();
            slideAnim.setValue(0);
          });
        } else {
          // Swipe not far enough - snap back
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 4,
            speed: 12,
          }).start();
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  const handleNewsPress = (newsItem: SavedNewsItem) => {
    setSelectedNews(newsItem);
  };

  const handleBack = () => {
    setSelectedNews(null);
  };

  const handleBookmarkPress = (itemId: string) => {
    setBookmarkedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // Show NewsDetailScreen if a news item is selected
  if (selectedNews) {
    return <NewsDetailScreen newsItem={selectedNews} onBack={handleBack} />;
  }

  // Show loading state while fonts load
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <BackIcon size={15} />
          </TouchableOpacity>
          <Text style={styles.title}>Saved</Text>
          <View style={styles.placeholder} />
        </View>
        <ScrollView style={styles.scrollView}>
          {mockSavedNewsData.map((item) => (
            <TouchableOpacity key={item.id} style={styles.newsItem}>
              <View style={styles.newsItemContent}>
                <Text style={styles.headline}>{item.headline}</Text>
                <View style={styles.categoryRow}>
                  <Text style={styles.categoryIcon}>📄</Text>
                  <Text style={styles.categoryText}>{item.category}</Text>
                </View>
                <Text style={styles.snippet}>{item.snippet}</Text>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          transform: [{ translateX: slideAnim }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <View style={styles.backButtonContainer}>
            <BackIcon size={15} />
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>Saved</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Saved News List */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {mockSavedNewsData.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📚</Text>
            <Text style={styles.emptyStateTitle}>No Saved Articles</Text>
            <Text style={styles.emptyStateText}>
              Articles you bookmark will appear here
            </Text>
          </View>
        ) : (
          mockSavedNewsData.map((item, index) => (
            <React.Fragment key={item.id}>
              <TouchableOpacity 
                style={styles.newsItem} 
                onPress={() => handleNewsPress(item)}
                activeOpacity={0.7}
              >
                <View style={styles.newsItemContent}>
                  <View style={styles.headlineRow}>
                    <Text style={styles.headline} numberOfLines={2}>{item.headline}</Text>
                    <TouchableOpacity
                      style={styles.bookmarkButton}
                      onPress={(e) => {
                        e.stopPropagation();
                        handleBookmarkPress(item.id);
                      }}
                      activeOpacity={0.7}
                    >
                      <BookmarkIcon size={18} filled={bookmarkedItems.has(item.id)} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.metadataRow}>
                    <View style={styles.categoryRow}>
                      <Text style={styles.categoryIcon}>📄</Text>
                      <Text style={styles.categoryText}>{item.category}</Text>
                    </View>
                    <Text style={styles.savedDate}>{item.savedDate}</Text>
                  </View>
                  <Text style={styles.snippet} numberOfLines={3}>{item.snippet}</Text>
                  <View style={styles.timestampRow}>
                    <Text style={styles.timestamp}>{item.timestamp}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              {index < mockSavedNewsData.length - 1 && <View style={styles.separator} />}
            </React.Fragment>
          ))
        )}
      </ScrollView>
      {/* Page Indicator - Fixed at bottom */}
      <View style={styles.indicatorContainer}>
        <PageIndicator totalPages={2} currentPage={1} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f6',
    justifyContent: 'space-between',
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
    paddingBottom: 80,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: '#000000',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#808080',
    textAlign: 'center',
  },
  newsItem: {
    paddingVertical: 16,
  },
  newsItemContent: {
    width: '100%',
  },
  headlineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  headline: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: '#000000',
    lineHeight: 25,
    flex: 1,
    marginRight: 12,
  },
  bookmarkButton: {
    padding: 4,
  },
  metadataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
    color: '#808080',
    lineHeight: 12,
  },
  savedDate: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    color: '#C0C0C0',
    lineHeight: 12,
  },
  snippet: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
    lineHeight: 12,
    marginTop: 4,
    marginBottom: 8,
  },
  timestampRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  timestamp: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    color: '#C0C0C0',
    lineHeight: 25,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%',
  },
});

